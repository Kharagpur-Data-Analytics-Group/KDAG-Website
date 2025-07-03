# PROCESS 
# get the userid from acces token search in resources page for that user id and get
# the resources 
from flask import request, jsonify, Blueprint
from dotenv import load_dotenv
from flask import make_response
from flask_jwt_extended import ( 
    jwt_required,
    get_jwt_identity,
    decode_token,
)
from bson import ObjectId 
from datetime import timedelta
from pymongo import MongoClient
import jwt
import os
import json

load_dotenv()
MONGO_URI=os.getenv("MONGO_URI")
resources= Blueprint("resources", __name__)

@resources.route("/", methods=["GET"])
@jwt_required()
def get_resource_data():
    try:

        from app import mongo
        identity = get_jwt_identity()
        user_id = identity.get("user_id")


        if not user_id or not ObjectId.is_valid(user_id):
            return jsonify({"message": "Invalid or missing user_id"}), 400

        # getting  resources by user_id from resources page collection 
        user_resources = list(mongo.cx["KDAG-BACKEND"].resources_page.find(
            {"user_id": user_id}, {"_id": 0}
        ))

        return jsonify(user_resources), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500
