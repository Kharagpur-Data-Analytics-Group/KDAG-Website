from google.auth.transport import requests as google_requests
from flask import request, jsonify, Blueprint
from google.oauth2 import id_token
from dotenv import load_dotenv
from flask import make_response
from flask_jwt_extended import ( 
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_header,
    get_jwt_identity,
    verify_jwt_in_request,
    decode_token,
)
from bson import ObjectId 
from datetime import timedelta
import requests
import bcrypt
from pymongo import MongoClient
import jwt
import os
import json

load_dotenv()
user_auth = Blueprint("user_auth", __name__)
MONGO_URI=os.getenv("MONGO_URI")

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
GOOGLE_TOKEN_URL = os.getenv("GOOGLE_TOKEN_URL")
GOOGLE_TOKEN_INFO_URL = os.getenv("GOOGLE_TOKEN_INFO_URL")
GOOGLE_TOKEN_INFO_URL_2 = os.getenv("GOOGLE_TOKEN_INFO_URL_2")

with open(os.path.join(os.path.dirname(__file__), "sections.json"), "r") as f:
    SECTIONS_TEMPLATE = json.load(f)


@user_auth.route("/auth/google/callback", methods=["POST"])
def google_callback():
    try:
        from app import mongo
 
        data = request.get_json()
        code = data.get("code")

        if not code:
            return jsonify({"error": "No authorization code provided"}), 400

        # Exchange the authorization code for an access token
        token_response = requests.post(
            GOOGLE_TOKEN_URL,
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": REDIRECT_URI,
                "grant_type": "authorization_code",
            },
        )

        if token_response.status_code != 200:
            return (
                jsonify(
                    {
                        "error": "Failed to obtain access token",
                    }
                ),
                400,
            )

        token_response_data = token_response.json()
        access_token = token_response_data.get("access_token")
        refresh_token = token_response_data.get("refresh_token")
        id_token_str = token_response_data.get("id_token")
        expires_in = token_response_data.get("expires_in")

        if expires_in:
            print(f"Access token expires in {expires_in} seconds.")
        else:
            print("Expiration time not provided in the token response.")

        users = mongo.cx["KDAG-BACKEND"].users
        user_data = {}
        user_data["is_admin"] = False
        user_data["active"] = False
        user_data["f_name"] = ""
        user_data["l_name"] = ""
        user_data["username"] = ""
        user_data["phone"] = ""
        user_data["college"] = ""
        user_data["picture"] = ""

        if id_token_str:
            try:
                id_info = id_token.verify_oauth2_token(
                    id_token_str, google_requests.Request(), GOOGLE_CLIENT_ID
                )
                email = id_info.get("email")
                
                # Extract profile information from Google
                given_name = id_info.get("given_name", "")
                family_name = id_info.get("family_name", "")
                picture = id_info.get("picture", "")
                
                # Extract username from email (part before @)
                username = email.split('@')[0] if email else ""

            except ValueError as e:
                print("Error during token validation:", str(e))
                return jsonify({"error": "Invalid ID token"}), 400

            print("User info from Google:", id_info)
            if not email:
                return jsonify({"error": "No email found in ID token"}), 400

            user = users.find_one({"email": email})

            if not user:
                # Create new user with Google profile data
                user_data["email"] = email
                user_data["f_name"] = given_name
                user_data["l_name"] = family_name
                user_data["username"] = username
                user_data["picture"] = picture
                users.insert_one(user_data)
                user = users.find_one({"email": email}) 

                resources = mongo.cx["KDAG-BACKEND"].resources_page
                default_sections = SECTIONS_TEMPLATE.copy() 

                for section in default_sections:
                    for item in section["items"]:
                        item["completed"] = False
                        item["revision"] = False

                resources.insert_one({
                    "user_id": str(user["_id"]),
                    "sections": default_sections
                })

                
                # Get the newly created user
                user = users.find_one({"email": email})
                is_admin = user.get("is_admin")
                uid = str(user.get("_id"))
                jwt_access_token = create_access_token(
                    identity={
                        "user_id": uid,
                        "google_access_token": access_token,
                        "is_admin": is_admin,
                    },
                    expires_delta=timedelta(hours=1),
                )
                users.update_one(
                    {"_id": ObjectId(uid)}, {"$set": {"refresh_token": refresh_token}}
                )
                response = make_response(
                    jsonify(
                        {
                            "message": "User account successfully activated. Please complete the remaining details.",
                            "uid": uid,
                            "user_info": id_info,
                            "redirect": "usual_redirect_page_",
                            "access_token": jwt_access_token,
                        }
                    )
                )
                return response, 200
            else:
                # Update existing user with latest Google profile data
                users.update_one(
                    {"email": email}, 
                    {"$set": {
                        "f_name": given_name,
                        "l_name": family_name,
                        "username": username,
                        "picture": picture,
                    }}
                )
                is_admin = user.get("is_admin")
                uid = str(user.get("_id"))
                jwt_access_token = create_access_token(
                    identity={
                        "user_id": uid,
                        "google_access_token": access_token,
                        "is_admin": is_admin,
                    },
                    expires_delta=timedelta(hours=1),
                )
                users.update_one(
                    {"_id": ObjectId(uid)}, {"$set": {"refresh_token": refresh_token}}
                )
                response = make_response(
                    jsonify(
                        {
                            "message": "You already have an account. Logging you in",
                            "uid": uid,
                            "user_info": id_info,
                            "redirect": "Forum_page_",
                            "access_token": jwt_access_token,
                        }
                    )
                )
                return response, 200
        else:
            return jsonify({"error": "Failed to obtain ID token"}), 400

    except Exception as e:
        print("Error in Google OAuth callback:", e)
        return (
            jsonify({"error": f"An error occurred during the authentication process -- {e}"}),
            500,
        )


@user_auth.route("/auth/google/status", methods=["GET"])
def auth_status():
    verify_jwt_in_request()
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"loggedIn": False, "user": None}), 401

    if not auth_header.startswith("Bearer "):
        return jsonify({"loggedIn": False, "user": None}), 401

    access_token = auth_header.split(" ")[1]

    try:
        decoded_token = decode_token(access_token)
        google_access_token = decoded_token.get("sub", {}).get("google_access_token")

        if not google_access_token:
            return (
                jsonify(
                    {
                        "loggedIn": False,
                        "user": None,
                        "error": "No Google access token found in JWT",
                    }
                ),
                401,
            )

        response = requests.get(
            GOOGLE_TOKEN_INFO_URL_2, params={"access_token": google_access_token}
        )

        if response.status_code != 200:
            response_data = response.json()
            if response_data.get("error_description") == "Invalid Value":
                print("Access token expired")
                return (
                    jsonify(
                        {
                            "loggedIn": False,
                            "user": None,
                            "error": "Access token has expired",
                        }
                    ),
                    401,
                )
            return (
                jsonify(
                    {
                        "loggedIn": False,
                        "user": None,
                        "error": response_data.get(
                            "error_description", "Invalid access token"
                        ),
                    }
                ),
                401,
            )

        user_info = response.json()
        return jsonify({"loggedIn": True, "user": user_info})

    except jwt.InvalidTokenError:
        print(jwt.InvalidTokenError)
        return jsonify({"message": "Invalid token"}), 401
    except Exception as e:
        return jsonify({"message": f"Error occurred: {str(e)}"}), 500


@user_auth.route("/signup", methods=["POST"])
def user_signup():
    try:
        from app import mongo

        users = mongo.cx["KDAG-BACKEND"].users
        data = request.get_json()

        uid = data.get("uid")

        reqd_fields = ["username", "f_name", "l_name", "phone", "college"]

        user = users.find_one({"_id": ObjectId(uid)})
        if not user:
            return (
                jsonify(
                    {
                        "message": "Something is not right! Please try to signup again using google"
                    }
                ),
                400,
            )

        updated_data = {key: data.get(key, user.get(key)) for key in reqd_fields}
        updated_data["active"] = True
        print(uid)

        if users.find_one({"username": updated_data["username"], "_id": {"$ne": ObjectId(uid)}}):
            return jsonify({"message": "Please choose a different username"}), 400


        users.update_one({"_id": ObjectId(data.get("uid"))}, {"$set": updated_data})

        updated_user = users.find_one({"_id": ObjectId(data.get("uid"))})
        updated_user["_id"] = str(updated_user["_id"])

        return jsonify({"message": "Signup successful", "user": updated_user}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in signing up"}), 500


# /////////////////////////////////////////////////////////////////////////////////////////
# @user_auth.route("/add_fields_to_users", methods=["POST"])
# def add_fields_to_users():
#     try:
#         from app import mongo
#         mongo.cx.["KDAG-BACKEND"].users.update_many(
#             {},
#             {
#                 "$set": {
#                     "is_admin": False,  # Set default value for is_admin
#                     "active": True      # Set default value for active
#                 }
#             }
#         )
#         return jsonify({"message": "Fields added to all users successfully!"}), 200
#     except Exception as error:
#         print(f"Error updating users: {error}")
#         return jsonify({"message": "Error updating users"}), 500
# /////////////////////////////////////////////////////////////////////////////////////////


@user_auth.route("/login", methods=["POST"])
def user_login():
    try:
        from app import mongo

        data = request.get_json()
        users = mongo.cx["KDAG-BACKEND"].users
        user = users.find_one({"username": data["username"]})
        if user and bcrypt.checkpw(
            data["password"].encode("utf-8"), user["password"].encode("utf-8")
        ):
            if not user.get("active", False):
                return (
                    jsonify(
                        {
                            "message": "Account has not been activated. Please contact support."
                        }
                    ),
                    403,
                )
            token_identity = {
                "username": data["username"],
                "user_id": str(user["_id"]) if user["_id"] else None,
            }
            if user.get("is_admin", False):
                token_identity["is_admin"] = True

            access_token = create_access_token(
                identity=token_identity, expires_delta=False
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

        users = mongo.cx["KDAG-BACKEND"].users
        user = users.find_one(ObjectId(uid))
        if not user:
            user_info = {
                "username": "User does not exist",
                "f_name": "User does not exist",
                "l_name": "User does not exist",
                "email": "User does not exist",
                "college": "User does not exist",
            }
            return jsonify(user_info), 201

        user_info = {
            key: value
            for key, value in user.items()
            if key not in ["_id", "password", "phone"]
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

        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"loggedIn": False, "user": None}), 401

        if not auth_header.startswith("Bearer "):
            return jsonify({"loggedIn": False, "user": None}), 401

        access_token = auth_header.split(" ")[1]
        decoded_token = decode_token(access_token)
        google_access_token = decoded_token.get("sub", {}).get("google_access_token")

        token_info_response = requests.get(
            GOOGLE_TOKEN_INFO_URL_2, params={"access_token": google_access_token}
        )

        token_info = token_info_response.json()

        if "error" in token_info:
            return jsonify({"message": "Invalid access token"}), 401

        users = mongo.cx["KDAG-BACKEND"].users
        user = users.find_one(ObjectId(uid))

        if not user:
            return jsonify({"message": "No such user exists"}), 401

        user_info = {key: value for key, value in user.items() if key != "_id"}

        return jsonify(user_info), 200
    except Exception as error:
        print("Error in getting profile ", error)
        return jsonify({"message": "Error in fetching profile"}), 500


@user_auth.route("/edit_profile/<string:uid>", methods=["PUT"])
@jwt_required()
def edit_profile(uid):
    try:
        from app import mongo

        users = mongo.cx["KDAG-BACKEND"].users
        data = request.get_json()
        current_user = get_jwt_identity()
        if current_user["user_id"] != uid:
            return jsonify({"message": "Unauthorized access"}), 403

        user = users.find_one({"_id": ObjectId(uid)})
        if not user:
            return jsonify({"message": "No such user exists"}), 401

        reqd_fields = ["username", "f_name", "l_name", "email", "phone", "college"]
        updated_data = {key: user.get(key) for key in reqd_fields}
        
        if users.find_one({"username": updated_data["username"], "_id": {"$ne": ObjectId(uid)}}):
            return jsonify({"message": "Please choose a different username"}), 400

        for key in reqd_fields:
            if data.get(key) is not None:
                updated_data[key] = data[key]

        users.update_one({"_id": ObjectId(uid)}, {"$set": updated_data})

        updated_user = users.find_one({"_id": ObjectId(uid)})

        if (
            updated_data["username"]
            and updated_data["f_name"]
            and updated_data["college"]
        ):
            users.update_one({"_id": ObjectId(uid)}, {"$set": {"active": True}})

        updated_user = users.find_one({"_id": ObjectId(uid)})
        updated_user["_id"] = str(updated_user["_id"])

        return (
            jsonify({"message": "Profile edited successfully", "user": updated_user}),
            200,
        )
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in profile editing"}), 500


@user_auth.route("/auth/google/refresh_google_access_token", methods=["POST"])
@jwt_required()
def refresh_google_access_token():
    try:
        from app import mongo

        current_user = get_jwt_identity()
        uid = current_user["user_id"]
        google_access_token = current_user["google_access_token"]

        token_info_response = requests.get(
            GOOGLE_TOKEN_INFO_URL_2, params={"access_token": google_access_token}
        )
        token_info = token_info_response.json()

        user = mongo.cx["KDAG-BACKEND"].users.find_one({"_id": ObjectId(uid)})
        if not user or "refresh_token" not in user:
            return (
                jsonify({"message": "No refresh token found, please re-authenticate"}),
                401,
            )   

        refresh_token = user["refresh_token"]

        token_refresh_response = requests.post(
            GOOGLE_TOKEN_URL,
            data={
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "refresh_token": refresh_token,
                "grant_type": "refresh_token",
            },
        )

        token_data = token_refresh_response.json()

        if "access_token" not in token_data:
            return jsonify({"message": "Failed to refresh access token"}), 401

        new_access_token = token_data["access_token"]

        new_jwt_access_token = create_access_token(
            identity={
                "user_id": uid,
                "google_access_token": new_access_token,
                "is_admin": current_user["is_admin"],
            },
            expires_delta=timedelta(hours=1),
        )

        return (
            jsonify(
                {
                    "message": "Access token refreshed successfully",
                    "access_token": new_jwt_access_token,
                }
            ),
            200,
        )

    except Exception as error:
        print("Error refreshing Google access token:", error)
        return jsonify({"message": "Server error"}), 500