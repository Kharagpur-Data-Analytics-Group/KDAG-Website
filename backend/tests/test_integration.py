"""API integration checks without contacting production MongoDB or Google."""
import os
import sys
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
os.environ['MONGO_URI'] = 'mongodb://127.0.0.1:27017'
os.environ['JWT_SECRET_KEY'] = 'integration-test-secret-that-is-at-least-32-bytes'
from app import app, mongo
from flask_jwt_extended import create_access_token


class IntegrationTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.uid = '507f1f77bcf86cd799439011'
        with app.app_context():
            token = create_access_token(identity={'user_id': self.uid, 'is_admin': False})
        self.headers = {'Authorization': f'Bearer {token}'}

    def test_database_is_selected_even_without_uri_database(self):
        self.assertEqual(mongo.db.name, 'KDAG-BACKEND')

    def test_health(self):
        self.assertEqual(self.client.get('/health').json, {'status': 'ok'})

    def test_missing_auth_is_unauthorized(self):
        self.assertEqual(self.client.get('/user/auth/google/status').status_code, 401)
        self.assertEqual(self.client.post('/user/signup', json={}).status_code, 401)

    def test_signup_cannot_modify_another_user(self):
        response = self.client.post('/user/signup', headers=self.headers, json={'uid': '507f191e810c19729de860ea'})
        self.assertEqual(response.status_code, 403)

    def test_signup_uses_authenticated_identity(self):
        from bson import ObjectId
        fake_mongo = MagicMock()
        users = fake_mongo.cx.__getitem__.return_value.users
        users.find_one.side_effect = [
            {"_id": ObjectId(self.uid), "username": "test"},
            None,
            {"_id": ObjectId(self.uid), "username": "test", "active": True},
        ]
        with patch('app.mongo', fake_mongo):
            response = self.client.post('/user/signup', headers=self.headers, json={"username": "test"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(users.update_one.call_args.args[0], {"_id": ObjectId(self.uid)})
        self.assertTrue(response.json['user']['active'])

    def test_auth_status_matches_frontend_contract(self):
        fake_mongo = MagicMock()
        fake_mongo.cx.__getitem__.return_value.users.find_one.return_value = {
            'email': 'test@example.com', 'f_name': 'Test', 'l_name': 'User'
        }
        with patch('app.mongo', fake_mongo):
            response = self.client.get('/user/auth/google/status', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json['loggedIn'])
        self.assertEqual(response.json['user']['email'], 'test@example.com')

    def test_resources_returns_sections_for_authenticated_user(self):
        fake_mongo = MagicMock()
        collection = fake_mongo.cx.__getitem__.return_value.resources_page
        collection.find.return_value = [{'sections': [{'title': 'Intro', 'items': []}]}]
        with patch('app.mongo', fake_mongo):
            response = self.client.get('/resources/', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json[0]['sections'][0]['title'], 'Intro')
        self.assertEqual(collection.find.call_args.args[0], {'user_id': self.uid})

    def test_progress_update_is_idempotent_and_restricts_fields(self):
        fake_mongo = MagicMock()
        collection = fake_mongo.cx.__getitem__.return_value.resources_page
        collection.update_one.return_value.matched_count = 1
        collection.update_one.return_value.modified_count = 0
        payload = {'section_title': 'Intro', 'item_name': 'Regression', 'field': 'completed', 'value': True}
        with patch('app.mongo', fake_mongo):
            response = self.client.patch('/resources/update', headers=self.headers, json=payload)
            self.assertEqual(response.status_code, 200)
            for invalid in ({'field': 'name'}, {'value': 'true'}):
                response = self.client.patch('/resources/update', headers=self.headers, json={**payload, **invalid})
                self.assertEqual(response.status_code, 400)
        self.assertEqual(collection.update_one.call_count, 1)


if __name__ == '__main__':
    unittest.main()
