from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity 
from flask import Blueprint
from bson import ObjectId
import base64

post_crud = Blueprint("post_crud", __name__)


@post_crud.route("/create_post/<string:sid>", methods=["POST"])
@jwt_required()
def add_post(sid):
    try:
        from app import mongo

        users = mongo.db.users
        if not users.find_one(ObjectId(sid)):
            return jsonify({"message": "Invalid student id"}), 401

        post_data = request.get_json()
        if not post_data:
            return jsonify({"message": "No JSON data received"}), 400
        
        post_data["replies"] = []

        post_data["author_id"] = sid
        img_file = request.files.get("img")

        if not img_file:
            post_data["image"] = None
        else:
            img_data = img_file.read()
            post_data["image"] = img_data

        posts = mongo.db.posts
        posts.insert_one(post_data)

        return jsonify({"message": "Post Created"}), 200
    except Exception as error:
        print("Error:", error)
        return jsonify({"message": "Error in posting"}), 500


@post_crud.route("/get_posts", methods=["GET"])
def get_posts():
    try:
        from app import mongo

        posts = mongo.db.posts
        users = mongo.db.users
        all_posts_list = []
        for post in posts.find():
            image_data = post["image"]
            if image_data:
                image_base64 = base64.b64encode(image_data).decode("utf-8")
            else:
                image_base64 = None
            all_posts_list.append(
                {
                    "message": post["message"],
                    "author_name": users.find_one(ObjectId(post["author_id"]))["f_name"]
                    + " "
                    + users.find_one(ObjectId(post["author_id"]))["l_name"],
                    "image": image_base64,
                    "replies": len(post["replies"]), 
                    "author_id": post["author_id"],
                    "post_id": str(post["_id"]),
                }
            )
        return jsonify({"message": "All posts fetched", "posts": all_posts_list}), 200
    except Exception as error:
        print("Error fetching posts:", error)
        return (
            jsonify({"message": "Error in fetching posts (backend error message)"}),
            500,
        )

@post_crud.route("/get_post/<string:pid>", methods=["GET"])
def get_post(pid):
    try:
        from app import mongo

        posts = mongo.db.posts
        users = mongo.db.users
        post = posts.find_one(ObjectId(pid))
        if not post:
            return jsonify({"message": "Invalid post id"}), 404

        image_data = post["image"]
        if image_data:
            image_base64 = base64.b64encode(image_data).decode("utf-8")
        else:
            image_base64 = None

        reqd_post = {
            "message": post["message"],
            "author_name": users.find_one(ObjectId(post["author_id"]))["f_name"]
            + " "
            + users.find_one(ObjectId(post["author_id"]))["l_name"],
            "author_id": post["author_id"],
            "image": image_base64,
            "replies": post["replies"],
        }

        return jsonify({"message": "Post fetched", "post": reqd_post}), 200
    except Exception as error:
        print("Error fetching post:", error)
        return jsonify({"message": "Error in fetching post"}), 500
    
    
@post_crud.route('/delete_post/<string:pid>/<string:uid>', methods=['DELETE'])
@jwt_required()
def delete_post(pid, uid):
    try:
        from app import mongo

        posts = mongo.db.posts
        user_id = ObjectId(uid)

        post = posts.find_one(ObjectId(pid))
        if not post:
            return jsonify({"message": "Invalid post id"}), 404

        post_user = ObjectId(post['author_id'])

        if user_id != post_user:
            return jsonify({"message": "You are not authorized to delete this post"}), 402

        posts.delete_one({'_id': ObjectId(pid)})
        return jsonify({'message': 'Post deleted successfully'}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in deleting posts"}), 500

