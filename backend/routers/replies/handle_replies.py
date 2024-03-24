from flask import request, jsonify
from flask_jwt_extended import jwt_required
from flask import Blueprint
from bson import ObjectId

reply_crud = Blueprint("reply_crud", __name__)


@reply_crud.route("/create_reply/<string:pid>", methods=["POST"])
@jwt_required()
def add_post(pid):
    try:
        from app import mongo

        data = request.get_json()
        posts = mongo.db.posts
        post = posts.find_one(ObjectId(pid))
        if not post:
            return jsonify({"message": "Not a valid post id"}), 401
        if not "level" in data:
            return jsonify({"message": "Level field absent"}), 400
        if not "message" in data:
            return jsonify({"message": "Message field absent"}), 400
        if not "author_id" in data:
            return jsonify({"message": "Author id field absent"}), 400
        level_str = data["level"]
        org_post = post
        if level_str == "":
            post["replies"].append(
                {
                    "level": str(len(post["replies"]) + 1),
                    "message": data["message"],
                    "author_id": data["author_id"],
                    "show": True,
                    "replies": [],
                }
            )
        else:
            level_str = level_str.split("/")
            for level in level_str:
                post = post["replies"][int(level) - 1]
            post["replies"].append(
                {
                    "level": data["level"] + "/" + str(len(post["replies"]) + 1),
                    "message": data["message"],
                    "author_id": data["author_id"],
                    "show": True,
                    "replies": [],
                }
            )
        posts.replace_one({"_id": ObjectId(pid)}, org_post)
        return jsonify({"message": "Replied"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in replying"}), 500


@reply_crud.route("/get_replies/<string:pid>", methods=["POST"])
def get_replies(pid):
    try:
        from app import mongo

        data = request.get_json()
        posts = mongo.db.posts
        post = posts.find_one(ObjectId(pid))
        if not post:
            return jsonify({"message": "Not a valid post id"}), 401
        if not "level" in data:
            return jsonify({"message": "Level field absent"}), 400
        level_str = data["level"]
        level_str = level_str.split("/")
        for level in level_str:
            post = post["replies"][int(level) - 1]
        imm_replies = []
        for reply in post["replies"]:
            imm_replies.append(
                {
                    "message": reply["message"],
                    "author_id": reply["author_id"],
                    "show": reply["show"],
                    "replies": reply["replies"],
                }
            )
        return jsonify({"message": "Success", "replies": imm_replies}), 200
    except Exception as error:
        print("Error ", error)
        return jsonify({"message": "Error in getting the replies"}), 500
