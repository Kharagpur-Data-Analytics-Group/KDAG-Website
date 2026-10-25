import os
import sys
from pathlib import Path

# Routers import the shared mongo instance from app, including when run as a script.
if __name__ == "__main__":
    sys.modules["app"] = sys.modules[__name__]

from flask import Flask, jsonify
from flask_pymongo import PyMongo
from dotenv import load_dotenv

load_dotenv(Path(__file__).with_name(".env"))

from flask_jwt_extended import JWTManager
from flask_cors import CORS
from routers.users.auth import user_auth
from routers.users.resources import resources
from routers.posts.post_crud import post_crud
from routers.replies.handle_replies import reply_crud
from docx_viewer import docx_viewer
# from routers.kdsh2025.register import kdsh2025
# from routers.kdsh2025_mod.kdsh2025_mod import kdsh2025_mod
from routers.kdsh.register import kdsh

app = Flask(__name__)
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
mongo = PyMongo(app)
# Auth, resources and hackathon data already use this database explicitly.
mongo.db = mongo.cx["KDAG-BACKEND"]
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(user_auth, url_prefix="/user")
app.register_blueprint(post_crud, url_prefix="/")
app.register_blueprint(reply_crud, url_prefix="/reply")
app.register_blueprint(resources,url_prefix="/resources")
app.register_blueprint(docx_viewer, url_prefix="/docx")
# app.register_blueprint(kdsh2025, url_prefix="/kdsh2025")
# app.register_blueprint(kdsh2025_mod, url_prefix="/kdsh2025_mod")
app.register_blueprint(kdsh, url_prefix="/kdsh")



@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/", methods=["GET"])
def home():
    return "Hello World!!"


if __name__ == "__main__":
    app.run(debug=os.getenv("FLASK_DEBUG") == "1", host="0.0.0.0", port=int(os.getenv("PORT", "5001")))
