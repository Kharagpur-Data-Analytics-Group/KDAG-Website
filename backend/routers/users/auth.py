from flask import request, jsonify
import bcrypt
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_header,
    get_jwt_identity,
)
from flask import Blueprint
from bson import ObjectId

user_auth = Blueprint("user_auth", __name__)


@user_auth.route("/signup", methods=["POST"])
def user_signup():
    try:
        from app import mongo

        data = request.get_json()
        user_data = {}
        reqd_fields = ["username", "f_name", "l_name", "email", "phone", "college"]
        for key in reqd_fields:
            user_data[key] = data[key]
        hashed_password = bcrypt.hashpw(
            data["password"].encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")
        user_data["password"] = hashed_password
        users = mongo.db.users
        if users.find_one({"username": data["username"]}):
            return jsonify({"message": "Please choose a different username"}), 500
        users.insert_one(user_data)
        return jsonify({"message": "Signup successful"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in signing up"}), 500


@user_auth.route("/login", methods=["POST"])
def user_login():
    try:
        from app import mongo

        data = request.get_json()
        users = mongo.db.users
        user = users.find_one({"username": data["username"]})
        if user and bcrypt.checkpw(
            data["password"].encode("utf-8"), user["password"].encode("utf-8")
        ):
            # access_token = create_access_token(identity=data['username'], expires_delta=False)
            access_token = create_access_token(
                identity={
                    "username": data["username"],
                    "user_id": str(user["_id"]) if user["_id"] else None,
                },
                expires_delta=False,
            )
            return (
                jsonify(
                    {"message": "Logged in successfully", "access_token": access_token}
                ),
                200,
            )
        else:
            return jsonify({"message": "Invalid credentials"}), 401
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in logging in"}), 500


@user_auth.route("/profile/<string:uid>", methods=["GET"])
def profile(uid):
    try:
        from app import mongo

        users = mongo.db.users
        user = users.find_one(ObjectId(uid))
        if not user:
            return jsonify({"message": "No such user exists"}), 401
        user_info = {
            key: value
            for key, value in user.items()
            if key != "_id" and key != "password" and key != "phone"
        }
        return jsonify(user_info), 200
    except Exception as error:
        print("Error in getting profile ", error)
        return jsonify({"message": "Error in fetching profile"}), 500


@user_auth.route("/profile_self/<string:uid>", methods=["GET"])
@jwt_required()
def profile_self(uid):
    try:
        from app import mongo

        users = mongo.db.users
        user = users.find_one(ObjectId(uid))
        if not user:
            return jsonify({"message": "No such user exists"}), 401
        user_info = {key: value for key, value in user.items() if key != "_id"}
        user_info["password"] = user["password"]

        return jsonify(user_info), 200
    except Exception as error:
        print("Error in getting profile ", error)
        return jsonify({"message": "Error in fetching profile"}), 500


    
@user_auth.route("/edit_profile/<string:uid>", methods=["PUT"])
@jwt_required()
def edit_profile(uid):
    try:
        from app import mongo

        users = mongo.db.users
        data = request.get_json()
        current_user = get_jwt_identity()
        user = users.find_one({"_id": ObjectId(uid)})
        if not user:
            return jsonify({"message": "No such user exists"}), 401

        reqd_fields = ["username", "f_name", "l_name", "email", "phone", "college"]

        updated_data = {key: user.get(key) for key in reqd_fields}

        for key in reqd_fields:
            if data.get(key) is not None:
                updated_data[key] = data[key]

        users.update_one({"_id": ObjectId(uid)}, {"$set": updated_data})

        updated_user = users.find_one({"_id": ObjectId(uid)})

        updated_user["_id"] = str(updated_user["_id"])

        return jsonify({"message": "Profile edited successfully", "user": updated_user}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in profile editing"}), 500


