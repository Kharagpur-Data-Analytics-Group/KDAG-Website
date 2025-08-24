from flask import request, jsonify, Blueprint
from dotenv import load_dotenv
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
import os

load_dotenv()
resources = Blueprint("resources", __name__)

@resources.route("/", methods=["GET"])
@jwt_required()
def get_resource_data():
    try:
        from app import mongo
        identity = get_jwt_identity()
        user_id = identity.get("user_id")

        if not user_id or not ObjectId.is_valid(user_id):
            return jsonify({"message": "Invalid or missing user_id"}), 400

        user_resources = list(mongo.cx["KDAG-BACKEND"].resources_page.find(
            {"user_id": user_id}, {"_id": 0}
        ))

        return jsonify(user_resources), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

@resources.route("/update", methods=["PATCH"])
@jwt_required()
def update_resource_item():
    from app import mongo

    try:
        identity = get_jwt_identity()
        user_id = identity.get("user_id")
        data = request.get_json()

        section_title = data.get("section_title")
        item_name = data.get("item_name")  
        update_field = data.get("field")

        if not all([section_title, item_name, update_field]):
            return jsonify({"message": "Missing required fields"}), 400

        collection = mongo.cx["KDAG-BACKEND"].resources_page

        result = collection.update_one(
            {
                "user_id": user_id,
                "sections.title": section_title,
            },
            {
                "$set": {
                    f"sections.$[sec].items.$[itm].{update_field}": data["value"]
                }
            },
            array_filters=[
                {"sec.title": section_title},
                {"itm.name": item_name} 
            ]
        )

        if result.modified_count == 0:
            return jsonify({"message": "No document updated"}), 404

        return jsonify({"message": "Update successful"}), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500