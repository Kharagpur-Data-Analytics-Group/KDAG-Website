from google.auth.transport import requests as google_requests
from flask import request, jsonify, Blueprint
from google.oauth2 import id_token
from dotenv import load_dotenv
from flask import make_response
from flask_jwt_extended import ( 
    create_access_token,
    jwt_required,
    get_jwt_identity,
    verify_jwt_in_request,
)
from bson import ObjectId 
from datetime import timedelta
import requests
from pymongo import MongoClient
import jwt
import os
import json
import copy

load_dotenv()
user_auth = Blueprint("user_auth", __name__)
MONGO_URI=os.getenv("MONGO_URI")
DB_NAME = "KDAG-BACKEND"
JWT_EXPIRY_DAYS = int(os.getenv("JWT_EXPIRY_DAYS", "7")) 

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
        id_token_str = token_response_data.get("id_token")
        expires_in = token_response_data.get("expires_in")

        if expires_in:
            print(f"Access token expires in {expires_in} seconds.")
        else:
            print("Expiration time not provided in the token response.")

        users = mongo.cx[DB_NAME].users
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
                
                # Extract username from email with collision prevention
                base_username = email.split('@')[0] if email else ""
                username = base_username
                counter = 1
                while users.find_one({"username": username, "email": {"$ne": email}}):
                    username = f"{base_username}{counter}"
                    counter += 1

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

                resources = mongo.cx[DB_NAME].resources_page
                default_sections = copy.deepcopy(SECTIONS_TEMPLATE) 

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
                # Create JWT with only necessary data
                jwt_access_token = create_access_token(
                    identity={
                        "user_id": uid,
                        "is_admin": is_admin,
                    },
                    expires_delta=timedelta(days=JWT_EXPIRY_DAYS),
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

                # --- Sync resources_page with latest SECTIONS_TEMPLATE ---
                resources = mongo.cx[DB_NAME].resources_page
                existing_resource = resources.find_one({"user_id": uid})

                if existing_resource:
                    updated_sections = []

                    for new_section in SECTIONS_TEMPLATE:
                        # Try to find matching section in user’s resources
                        old_section = next(
                            (s for s in existing_resource.get("sections", []) if s["title"] == new_section["title"]),
                            None
                        )

                        if old_section:
                            merged_items = []
                            for new_item in new_section["items"]:
                                old_item = next((i for i in old_section["items"] if i["name"] == new_item["name"]), None)
                                merged_items.append({
                                    **new_item,
                                    "completed": old_item["completed"] if old_item else False,
                                    "revision": old_item["revision"] if old_item else False,
                                })
                            updated_sections.append({
                                "title": new_section["title"],
                                "items": merged_items
                            })
                        else:
                            # Entirely new section → initialize with defaults
                            for item in new_section["items"]:
                                item["completed"] = False
                                item["revision"] = False
                            updated_sections.append(new_section)

                    # Save merged result back
                    resources.update_one(
                        {"user_id": uid},
                        {"$set": {"sections": updated_sections}}
                    )
                else:
                    # If user somehow has no resources, create them fresh
                    default_sections = copy.deepcopy(SECTIONS_TEMPLATE)
                    for section in default_sections:
                        for item in section["items"]:
                            item["completed"] = False
                            item["revision"] = False
                    resources.insert_one({"user_id": uid, "sections": default_sections})
                # ---------------------------------------------------------

                # Create JWT with only necessary data
                jwt_access_token = create_access_token(
                    identity={
                        "user_id": uid,
                        "is_admin": is_admin,
                    },
                    expires_delta=timedelta(days=JWT_EXPIRY_DAYS),
                )
                user_info = {
                    **id_info,
                    "phone": user.get("phone", ""),
                    "college": user.get("college", "")
                }
                response = make_response(
                    jsonify(
                        {
                            "message": "You already have an account. Logging you in",
                            "uid": uid,
                            "user_info": user_info,
                            "redirect": "Forum_page_",
                            "user_exists": True,
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
            jsonify({"error": "Authentication failed. Please try again."}),
            500,
        )


@user_auth.route("/auth/google/status", methods=["GET"])
def auth_status():
    """
    Check if user is logged in based on JWT token validity.
    JWT is valid for 7 days, allowing persistent login without re-authentication.
    """
    try:
        verify_jwt_in_request()
        current_user = get_jwt_identity()
        
        # Get user info from JWT payload
        user_id = current_user.get("user_id")
        
        if not user_id:
            return jsonify({"loggedIn": False, "user": None, "error": "Invalid token payload"}), 401

        # Fetch user info from database
        from app import mongo
        users = mongo.cx[DB_NAME].users
        user = users.find_one({"_id": ObjectId(user_id)})
        
        if not user:
            return jsonify({"loggedIn": False, "user": None, "error": "User not found"}), 401

        # Return user info (JWT itself validates the session)
        user_info = {
            "email": user.get("email"),
            "name": f"{user.get('f_name', '')} {user.get('l_name', '')}".strip(),
            "given_name": user.get("f_name", ""),
            "family_name": user.get("l_name", ""),
            "picture": user.get("picture", ""),
        }
        
        return jsonify({"loggedIn": True, "user": user_info}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"loggedIn": False, "user": None, "error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"loggedIn": False, "user": None, "error": "Invalid token"}), 401
    except Exception as e:
        print(f"Error in auth_status: {str(e)}")
        return jsonify({"loggedIn": False, "user": None, "error": "Authentication failed"}), 500


@user_auth.route("/signup", methods=["POST"])
def user_signup():
    try:
        from app import mongo

        users = mongo.cx[DB_NAME].users
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


@user_auth.route("/profile/<string:uid>", methods=["GET"])
def profile(uid):
    try:
        from app import mongo

        users = mongo.cx[DB_NAME].users
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
    """
    Get user profile. JWT validation is sufficient for authentication.
    """
    try:
        from app import mongo

        current_user = get_jwt_identity()
        
        # Verify the requesting user matches the profile being accessed
        token_user_id = current_user.get("user_id")
        if token_user_id != uid:
            return jsonify({"message": "Unauthorized access"}), 403

        users = mongo.cx[DB_NAME].users
        user = users.find_one(ObjectId(uid))

        if not user:
            return jsonify({"message": "No such user exists"}), 401

        user_info = {key: value for key, value in user.items() if key != "_id"}

        return jsonify(user_info), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401
    except Exception as error:
        print("Error in getting profile ", error)
        return jsonify({"message": "Error in fetching profile"}), 500


@user_auth.route("/edit_profile/<string:uid>", methods=["PUT"])
@jwt_required()
def edit_profile(uid):
    try:
        from app import mongo

        users = mongo.cx[DB_NAME].users
        data = request.get_json()
        current_user = get_jwt_identity()
        if current_user["user_id"] != uid:
            return jsonify({"message": "Unauthorized access"}), 403

        user = users.find_one({"_id": ObjectId(uid)})
        if not user:
            return jsonify({"message": "No such user exists"}), 401

        reqd_fields = ["username", "f_name", "l_name", "email", "phone", "college"]
        updated_data = {key: user.get(key) for key in reqd_fields}
        

        for key in reqd_fields:
            if data.get(key) is not None:
                updated_data[key] = data[key]

        if users.find_one({"username": updated_data["username"], "_id": {"$ne": ObjectId(uid)}}):
            return jsonify({"message": "Please choose a different username"}), 400
        
        users.update_one({"_id": ObjectId(uid)}, {"$set": updated_data})


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
