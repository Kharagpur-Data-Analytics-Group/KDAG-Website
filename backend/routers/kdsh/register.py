from github import Github
from dotenv import load_dotenv
import os, csv, json, requests, asyncio, aiohttp
from flask import Blueprint, jsonify, request, current_app
from datetime import datetime
import secrets
import string
from flask_jwt_extended import jwt_required, decode_token, get_jwt_identity
from bson.objectid import ObjectId

kdsh = Blueprint("kdsh", __name__)

load_dotenv()

def generate_team_code(length=8):
    chars = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(chars) for _ in range(length))

def serialize_document(doc):
    if not doc:
        return None
    doc["_id"] = str(doc["_id"])
    return doc

def _extract_email_from_identity(mongo, identity):
    if not identity:
        return None
    if isinstance(identity, dict):
        email = identity.get("email")
        if email:
            return email.lower()
        user_id = identity.get("user_id")
        if user_id:
            try:
                user = mongo.cx["KDAG-BACKEND"]["users"].find_one({"_id": ObjectId(user_id)})
                if user and user.get("email"):
                    return user["email"].lower()
            except Exception:
                return None
        return None
    if isinstance(identity, str):
        return identity.lower()
    return None

async def fetch_page(session, url, headers):
    """Fetch a single page of starred repositories."""
    try:
        async with session.get(url, headers=headers) as response:
            if response.status == 404:
                print(f"Error -- 404 -- {url}")
                return {"error": "GitHub user not found."}
            elif response.status == 403:
                print("rate exceeded")
                return {"error1": "Rate limit exceeded. Please try again later."}
            elif response.status == 200:
                print(f"200 -- Fetched {url}")
                return await response.json()
            else:
                return {"error": f"GitHub API responded with status {response.status}"}
    except Exception as e:
        return {"error": f"Request failed for {url}: {str(e)}"}


def get_last_page_number(link_header):
    """Extract the last page number from the 'Link' header."""
    if not link_header:
        return 1  # If no pagination, there's only one page
    for link in link_header.split(","):
        if 'rel="last"' in link:
            last_url = link.split(";")[0].strip().strip("<>")
            return int(last_url.split("page=")[-1].split("&")[0])
    return 1


async def get_starred_repositories_async(github_id):
    github_id = github_id.strip().lower()  
    base_url = f"https://api.github.com/users/{github_id}/starred?per_page=100"
    all_starred_repositories = []

    access_token = os.getenv("GITHUB_TOKEN")
    if not access_token:
        return {"error": "GitHub token is missing."}

    headers = {
        "Authorization": f"token {access_token}",
        "Accept": "application/vnd.github+json",
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(base_url, headers=headers) as response:
            if response.status == 404:
                print("error -- 404 -- ", github_id)
                return {"error": "GitHub user not found."}

            elif response.status == 403:
                try:
                    print(await response.json())
                except Exception:
                    pass
                print("403 -- ")
                return {"error1": "Rate limit exceeded. Please try again later."}

            elif response.status == 200:
                print("200 -- proceeding with getting the rest of the urls")
                response_ = await response.json()
                all_starred_repositories.extend(response_)
                remaining = response.headers.get("X-RateLimit-Remaining")
                limit = response.headers.get("X-RateLimit-Limit")
                print("remaining : ", remaining)
                print("limit : ", limit)

                link_header = response.headers.get("Link", "")
                last_page = get_last_page_number(link_header)
                print(f"Total pages: {last_page}")

                if last_page > 9:
                    return {"error1": "Rate limit exceeded. Please try again later."}

                urls = [f"{base_url}&page={page}" for page in range(2, last_page + 1)]
                print(f"Fetching URLs: {urls}")

                tasks = [fetch_page(session, url, headers) for url in urls]
                results = await asyncio.gather(*tasks, return_exceptions=True)

                for result in results:
                    if isinstance(result, list):
                        all_starred_repositories.extend(result)
    return {"starred_repositories": all_starred_repositories}


def get_starred_repositories(github_id):
    """Wrapper function to run the async function."""
    github_id = github_id.strip().lower() 
    print(github_id)
    return asyncio.run(get_starred_repositories_async(github_id))


def check_required_repositories(starred_repos):
    required_repos = ["pathway", "llm-app"]
    starred_repo_names = [
        repo["name"] for repo in starred_repos["starred_repositories"]
    ]
    missing_repos = [repo for repo in required_repos if repo not in starred_repo_names]
    return missing_repos


def check_repositories(gitHub_users):
    gitHub_users = [u.strip().lower() for u in gitHub_users]  
    missing_repos_by_user = {}

    for github_id in gitHub_users:
        try:
            print("starting get_starred_repositories")
            starred_repos = get_starred_repositories(github_id)
            if "error" in starred_repos:
                missing_repos_by_user[github_id] = "error"
                continue

            if "error1" in starred_repos:
                missing_repos_by_user[github_id] = "error1"
                return missing_repos_by_user

            missing_repos = check_required_repositories(starred_repos)

            if not missing_repos:
                missing_repos_by_user[github_id] = "success"
            else:
                missing_repos_by_user[github_id] = missing_repos
        except Exception as e:
            print("check_repo : ", e)
            missing_repos_by_user[github_id] = "error"

    return missing_repos_by_user

def check_starred_repositories(missing_repos_by_users):
    all_starred = True
    missing_repos_messages = []
    for github_id, missing_repos in missing_repos_by_users.items():
        if missing_repos == "success":
            continue
        elif missing_repos == "error":
            all_starred = False
            missing_repos_messages.append(
                f""" You have entered incorrect GitHub Id --- {github_id} .Please check and enter the correct GitHub ID"""
            )
        elif missing_repos == "error1":
            all_starred = False
            missing_repos_messages = [
                "The server seems to be experiencing unexpected load. Please try again after some time. If the issue persists contact us at exec@kdagiitkgp.com"
            ]
        else:
            repo_messages = [f'GitHub user {github_id} has not starred the "']
            repo_messages.append('", "'.join(missing_repos))
            repo_messages.append('" repository(s).')
            all_starred = False
            missing_repos_messages.append("".join(repo_messages))
    if all_starred:
        print("All users have starred the required repositories.")
        return "success"
    else:
        message = " ".join(missing_repos_messages)
        return message


@kdsh.route("/check_register", methods=["POST"])
def check_register():
    try:
        from app import mongo
        import re

        data = request.get_json()

        if not data or not isinstance(data, dict):
            return jsonify({"error": "Invalid payload. Expected JSON object."}), 400

        required_fields = [
            "isTeamLeader",
            "firstname",
            "lastname",
            "gender",
            "mail",
            "mobile",
            "college",
            "degree",
            "YOS",
            "GitHubID",
            "teamName",
        ]

        missing = [f for f in required_fields if f not in data]
        if missing:
            return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

        # LEADER CHECK (CRITICAL)
        if data["isTeamLeader"] is not True:
            return jsonify({"error": "Only team leaders can create a team."}), 400

        # BASIC SANITIZATION
        firstname = data["firstname"].strip()
        lastname = data["lastname"].strip()
        email = data["mail"].strip().lower()
        mobile = str(data["mobile"]).strip()
        github_id = data["GitHubID"].strip().lower()    
        team_name = data["teamName"].strip().lower()

        if not firstname or not lastname:
            return jsonify({"error": "Firstname and lastname cannot be empty."}), 400

        if not re.match(r"^[^@]+@[^@]+\.[^@]+$", email):
            return jsonify({"error": "Invalid email format."}), 400

        if not re.match(r"^\d{10}$", mobile):
            return jsonify({"error": "Invalid mobile number. Must be 10 digits."}), 400

        try:
            yos = int(data["YOS"])
            if yos <= 0:
                raise ValueError
        except:
            return jsonify({"error": "YOS must be a valid positive integer."}), 400

        if not github_id:
            return jsonify({"error": "GitHubID is required."}), 400

        if not team_name:
            return jsonify({"error": "Team name cannot be empty."}), 400

        if mongo.cx["KDSH_2026"].kdsh2026_participants.find_one(
            {"GitHubID": github_id}
        ):
            return jsonify({"error": "GitHub ID already registered."}), 400

        if mongo.cx["KDSH_2026"].kdsh2026_teams.find_one(
            {"teamName": team_name}
        ):
            return jsonify({"error": "Team name already exists."}), 400

        starred_repos = get_starred_repositories(github_id)

        if not isinstance(starred_repos, dict) or "starred_repositories" not in starred_repos:
            return jsonify({"error": "GitHub validation failed. Try again later."}), 400

        missing_repos = check_required_repositories(starred_repos)
        if missing_repos:
            return jsonify({
                "error": f'Please star required repositories: {", ".join(missing_repos)}'
            }), 400

        while True:
            team_code = generate_team_code()
            if not mongo.cx["KDSH_2026"].kdsh2026_teams.find_one(
                {"teamCode": team_code}
            ):
                break

        mongo.cx["KDSH_2026"].kdsh2026_participants.insert_one({
            "isTeamLeader": True,
            "firstname": firstname,
            "lastname": lastname,
            "gender": data["gender"],
            "mail": email,
            "mobile": mobile,
            "college": data["college"],
            "degree": data["degree"],
            "YOS": yos,
            "GitHubID": github_id,
            "teamName": team_name,
            "registered_at": datetime.utcnow()
        })

        mongo.cx["KDSH_2026"].kdsh2026_teams.insert_one({
            "teamName": team_name,
            "teamCode": team_code,
            "teamleader_github": github_id,
            "teamleader_email": email,
            "members_github": [],
            "members_email": [],
            "numMembers": 1,
            "is_team_finalized": False,
            "created_at": datetime.utcnow()
        })

        return jsonify({
            "message": "Team created successfully. Share the team code with your teammates.",
            "teamCode": team_code,
            "teamName": team_name,
            "status": "PARTIAL_REGISTRATION"
        }), 200

    except Exception as e:
        print("check_register error:", e)
        return jsonify({"error": "Internal server error."}), 500



@kdsh.route("/get_participant_mod", methods=["POST"])
def check_participants():
    try:
        from app import mongo
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided."}), 400

        user = data.get("github_id")
        if user:
            user = user.strip().lower()  
        if not user:
            return jsonify({"error": "GitHub ID is required."}), 400
        existing_user = mongo.cx['KDSH_2026'].kdsh2026_participants.find_one({"GitHubID": user})
        if existing_user:
            serialized_user = serialize_document(existing_user)
            return jsonify({"message": f"{user} already exists in the database", "user": serialized_user}), 200
        else:
            return jsonify({"message": f"{user} DOES NOT exist in the database"}), 400

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@kdsh.route("/get_team_mod", methods=["POST"])
def check_team():
    try:
        from app import mongo
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided."}), 400

        team_name = data.get("team_name")
        if team_name:
            team_name = team_name.strip().lower() 
        if not team_name:
            return jsonify({"error": "Team name is required."}), 400
        existing_team = mongo.cx['KDSH_2026'].kdsh2026_teams.find_one({"teamName": team_name})
        if existing_team:
            serialized_team = serialize_document(existing_team)
            return jsonify({"message": f"{team_name} already EXISTS.", "team": serialized_team}), 200
        else:
            return jsonify({"message": f"{team_name} DOES NOT exist."}), 400

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@kdsh.route("/join_team", methods=["POST"])
def join_team():
    try:
        from app import mongo
        import re

        data = request.get_json()

        if not data or not isinstance(data, dict):
            return jsonify({"error": "Invalid payload. Expected JSON object."}), 400

        required_fields = [
            "firstname",
            "lastname",
            "gender",
            "mail",
            "mobile",
            "college",
            "degree",
            "YOS",
            "GitHubID",
            "teamCode",
        ]

        missing = [f for f in required_fields if f not in data]
        if missing:
            return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

        firstname = str(data["firstname"]).strip()
        lastname = str(data["lastname"]).strip()
        email = str(data["mail"]).strip().lower()
        mobile = str(data["mobile"]).strip()
        github_id = str(data["GitHubID"]).strip().lower()
        team_code = str(data["teamCode"]).strip().upper()

        if not firstname or not lastname:
            return jsonify({"error": "Firstname and lastname cannot be empty."}), 400

        if not re.match(r"^[^@]+@[^@]+\.[^@]+$", email):
            return jsonify({"error": "Invalid email format."}), 400

        if not re.match(r"^\d{10}$", mobile):
            return jsonify({"error": "Invalid mobile number. Must be 10 digits."}), 400

        try:
            yos = int(data["YOS"])
            if yos <= 0:
                raise ValueError
        except:
            return jsonify({"error": "YOS must be a valid positive integer."}), 400

        if not github_id:
            return jsonify({"error": "GitHubID is required."}), 400

        if not team_code:
            return jsonify({"error": "Team code is required."}), 400

        team = mongo.cx["KDSH_2026"].kdsh2026_teams.find_one({"teamCode": team_code})
        if not team:
            return jsonify({"error": "Invalid team code."}), 400

        if team["numMembers"] >= 4:
            return jsonify({"error": "Team is already full."}), 400

        if mongo.cx["KDSH_2026"].kdsh2026_participants.find_one(
            {"GitHubID": github_id}
        ):
            return jsonify({"error": "GitHub ID already registered."}), 400

        starred_repos = get_starred_repositories(github_id)

        if not isinstance(starred_repos, dict) or "starred_repositories" not in starred_repos:
            return jsonify({
                "error": "GitHub validation failed. Please try again later."
            }), 400

        missing_repos = check_required_repositories(starred_repos)
        if missing_repos:
            return jsonify({
                "error": f'Please star required repositories: {", ".join(missing_repos)}'
            }), 400

        update_result = mongo.cx["KDSH_2026"].kdsh2026_teams.update_one(
            {
                "_id": team["_id"],
                "numMembers": {"$lt": 4},
                "members_github": {"$ne": github_id}
            },
            {
                "$push": {
                    "members_github": github_id,
                    "members_email": email
                },
                "$inc": {"numMembers": 1}
            }
        )

        if update_result.modified_count == 0:
            return jsonify({"error": "Failed to join team. Try again."}), 400

        mongo.cx["KDSH_2026"].kdsh2026_participants.insert_one({
            "isTeamLeader": False,
            "firstname": firstname,
            "lastname": lastname,
            "gender": data["gender"],
            "mail": email,
            "mobile": mobile,
            "college": data["college"],
            "degree": data["degree"],
            "YOS": yos,
            "GitHubID": github_id,
            "teamName": team["teamName"],
            "joined_at": datetime.utcnow()
        })

        mongo.cx["KDSH_2026"].kdsh2026_teams.update_one(
            {
                "_id": team["_id"],
                "numMembers": {"$gte": 2}
            },
            {
                "$set": {}
            }
        )

        return jsonify({
            "message": "Successfully joined the team.",
            "teamName": team["teamName"],
            "teamStatus": "ACTIVE"
        }), 200

    except Exception as e:
        print("join_team error:", e)
        return jsonify({"error": "Internal server error."}), 500

from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity

@kdsh.route("/get_user_teams", methods=["GET"])
@jwt_required()
def get_user_teams():
    try:
        from app import mongo
        
        identity = get_jwt_identity()
        user_id = identity.get("user_id")

        user = mongo.cx["KDAG-BACKEND"]["users"].find_one(
            {"_id": ObjectId(user_id)}
        )

        if not user:
            return jsonify({"error": "User not found"}), 404

        email = user["email"].lower()

        participants_col = mongo.cx["KDSH_2026"]["kdsh2026_participants"]
        
        # Find user's participant record to get their GitHub ID
        user_participant = participants_col.find_one({"mail": email})
        user_github_id = None
        if user_participant:
            user_github_id = user_participant.get("GitHubID")

        # Find teams where user is leader (by email)
        leader_teams = list(
            mongo.cx["KDSH_2026"]["kdsh2026_teams"].find(
                {"teamleader_email": email}
            )
        )

        # Find teams where user is a member (by GitHub ID)
        member_teams = []
        if user_github_id:
            member_teams = list(
                mongo.cx["KDSH_2026"]["kdsh2026_teams"].find(
                    {"members_github": user_github_id}
                )
            )

        # Combine teams and remove duplicates (in case user is both leader and member somehow)
        all_teams = {}
        for t in leader_teams:
            all_teams[str(t["_id"])] = {"team": t, "isLeader": True}
        
        for t in member_teams:
            team_id = str(t["_id"])
            # Only add if not already added as leader team
            if team_id not in all_teams:
                all_teams[team_id] = {"team": t, "isLeader": False}

        if not all_teams:
            return jsonify({"teams": []}), 200

        enriched = []

        for team_id, team_data in all_teams.items():
            t = team_data["team"]
            is_leader = team_data["isLeader"]

            gh_ids = [t["teamleader_github"], *t["members_github"]]

            people = list(
                participants_col.find(
                    {"GitHubID": {"$in": gh_ids}},
                    {"_id": 0} 
                )
            )

            leader = next(
                (p for p in people if p["GitHubID"] == t["teamleader_github"]),
                None,
            )

            members = [
                p for p in people if p["GitHubID"] in t["members_github"]
            ]

            enriched.append({
                "_id": str(t["_id"]),
                "teamName": t["teamName"],
                "teamCode": t["teamCode"],
                "created_at": t["created_at"],
                "numMembers": t["numMembers"],
                "leader": leader,
                "members": members,
                "isLeader": is_leader,
                "is_team_finalized": t["is_team_finalized"]
            })

        return jsonify({"teams": enriched}), 200

    except Exception as e:
        print("get_user_teams error:", e)
        return jsonify({"error": "Internal server error"}), 500

@kdsh.route("/remove_member", methods=["POST"])
@jwt_required()
def remove_member():
    try:
        from app import mongo
        data = request.get_json()

        github_to_remove = data.get("GitHubID")
        team_code = data.get("teamCode")

        if not github_to_remove or not team_code:
            return jsonify({"error": "GitHubID and teamCode are required"}), 400

        identity = get_jwt_identity()
        user_id = identity.get("user_id")

        user = mongo.cx["KDAG-BACKEND"]["users"].find_one(
            {"_id": ObjectId(user_id)}
        )
        if not user:
            return jsonify({"error": "User not found"}), 404

        leader_email = user["email"].lower()

        team = mongo.cx["KDSH_2026"]["kdsh2026_teams"].find_one(
            {"teamCode": team_code}
        )

        if not team:
            return jsonify({"error": "Team not found"}), 404

        if team["teamleader_email"].lower() != leader_email:
            return jsonify({"error": "Only the team leader can remove members"}), 403

        if github_to_remove == team["teamleader_github"]:
            return jsonify({"error": "Leader cannot remove themselves"}), 400

        if github_to_remove not in team["members_github"]:
            return jsonify({"error": "Member not found in team"}), 404

        mongo.cx["KDSH_2026"]["kdsh2026_teams"].update_one(
            {"_id": team["_id"]},
            {
                "$pull": {
                    "members_github": github_to_remove,
                    "members_email": {"$in": [github_to_remove]}
                },
                "$inc": {"numMembers": -1},
                "$set": {
                    "is_active": team["numMembers"] - 1 >= 2
                }
            }
        )

        mongo.cx["KDSH_2026"]["kdsh2026_participants"].delete_one(
            {"GitHubID": github_to_remove}
        )

        return jsonify({"message": "Member removed successfully"}), 200

    except Exception as e:
        print("remove_member error:", e)
        return jsonify({"error": "Internal server error"}), 500

@kdsh.route("/leave_team", methods=["POST"])
@jwt_required()
def leave_team():
    try:
        from app import mongo
        
        identity = get_jwt_identity()
        user_id = identity.get("user_id")

        user = mongo.cx["KDAG-BACKEND"]["users"].find_one(
            {"_id": ObjectId(user_id)}
        )
        if not user:
            return jsonify({"error": "User not found"}), 404

        user_email = user["email"].lower()

        data = request.get_json()
        if not data or "teamCode" not in data:
            return jsonify({"error": "Team code is required"}), 400

        team_code = data.get("teamCode").strip().upper()

        team = mongo.cx["KDSH_2026"]["kdsh2026_teams"].find_one(
            {"teamCode": team_code}
        )

        if not team:
            return jsonify({"error": "Team not found"}), 404

        # Check if user is the team leader
        if team["teamleader_email"].lower() == user_email:
            return jsonify({"error": "Team leader cannot leave the team. Please delete the team or transfer leadership first."}), 403

        # Find user's participant record to get their GitHub ID
        participants_col = mongo.cx["KDSH_2026"]["kdsh2026_participants"]
        user_participant = participants_col.find_one({"mail": user_email})
        
        if not user_participant:
            return jsonify({"error": "Participant record not found"}), 404

        user_github_id = user_participant.get("GitHubID")
        
        if not user_github_id:
            return jsonify({"error": "GitHub ID not found"}), 404

        # Check if user is actually a member of this team
        if user_github_id not in team.get("members_github", []):
            return jsonify({"error": "You are not a member of this team"}), 403

        # Remove user from team
        mongo.cx["KDSH_2026"]["kdsh2026_teams"].update_one(
            {"_id": team["_id"]},
            {
                "$pull": {
                    "members_github": user_github_id,
                    "members_email": user_email
                },
                "$inc": {"numMembers": -1},
                "$set": {
                    "is_active": team["numMembers"] - 1 >= 2
                }
            }
        )

        # Delete user's participant record
        participants_col.delete_one({"GitHubID": user_github_id})

        return jsonify({"message": "You have successfully left the team"}), 200

    except Exception as e:
        print("leave_team error:", e)
        return jsonify({"error": "Internal server error"}), 500


@kdsh.route("/edit_team_details", methods=['PATCH'])
@jwt_required()
def edit_team_details():
    try:
        from app import mongo
        import re

        identity = get_jwt_identity()
        user_email = _extract_email_from_identity(mongo, identity)
        if not user_email:
            return jsonify({"error": "Unauthorized or invalid token."}), 401

        data = request.get_json()
        if not data or 'teamCode' not in data:
            return jsonify({"error": "Team code is required."}), 400

        team_code = data['teamCode'].strip().upper()

        team = mongo.cx["KDSH_2026"].kdsh2026_teams.find_one({"teamCode": team_code})
        if not team:
            return jsonify({"error": "Team not found."}), 404

        team_leader_email = (team.get("teamleader_email") or "").lower()
        if team_leader_email != user_email:
            return jsonify({"error": "Only team leader can edit team details."}), 403

        blocked_fields = {
            "teamCode", "teamleader_github", "teamleader_email",
            "members_github", "members_email", "numMembers", "_id"
        }

        # Only allow a safe set of editable fields
        allowed_fields = {"firstname", "lastname", "mobile", "college", "degree", "YOS", "teamName", "gender"}

        update_fields = {
            k: v for k, v in data.items()
            if k not in blocked_fields and k != "teamCode"
        }

        if not update_fields:
            return jsonify({"error": "No editable fields provided."}), 400

        # Reject any fields outside allowed set
        extra = set(update_fields.keys()) - allowed_fields
        if extra:
            return jsonify({"error": f"These fields cannot be edited: {', '.join(extra)}"}), 400

        # Basic validations
        if 'firstname' in update_fields:
            if not str(update_fields['firstname']).strip():
                return jsonify({"error": "Firstname cannot be empty."}), 400
            update_fields['firstname'] = str(update_fields['firstname']).strip()

        if 'lastname' in update_fields:
            if not str(update_fields['lastname']).strip():
                return jsonify({"error": "Lastname cannot be empty."}), 400
            update_fields['lastname'] = str(update_fields['lastname']).strip()

        if 'mobile' in update_fields:
            mobile = str(update_fields['mobile']).strip()
            if not re.match(r"^\d{10}$", mobile):
                return jsonify({"error": "Invalid mobile number. Must be 10 digits."}), 400
            update_fields['mobile'] = mobile

        if 'YOS' in update_fields:
            try:
                yos = int(update_fields['YOS'])
                if yos <= 0:
                    raise ValueError
                update_fields['YOS'] = yos
            except Exception:
                return jsonify({"error": "YOS must be a valid positive integer."}), 400

        if 'teamName' in update_fields:
            new_team_name = str(update_fields['teamName']).strip().lower()
            # ensure uniqueness (exclude current team)
            existing = mongo.cx["KDSH_2026"].kdsh2026_teams.find_one({"teamName": new_team_name, "teamCode": {"$ne": team_code}})
            if existing:
                return jsonify({"error": "Team name already exists."}), 400
            update_fields['teamName'] = new_team_name

        # All validations passed; perform update on team doc
        old_team_name = team.get("teamName")
        mongo.cx["KDSH_2026"].kdsh2026_teams.update_one(
            {"teamCode": team_code},
            {"$set": update_fields}
        )

        # Propagate changes to participant documents to keep consistency
        participants_col = mongo.cx["KDSH_2026"].kdsh2026_participants

        # Update leader's personal fields in participants collection
        leader_github = team.get("teamleader_github")
        personal_keys = {"firstname", "lastname", "mobile", "college", "degree", "YOS", "gender"}
        leader_update = {k: update_fields[k] for k in personal_keys if k in update_fields}
        if leader_update and leader_github:
            participants_col.update_one({"GitHubID": leader_github}, {"$set": leader_update})

        # If teamName changed, update all participants having the old teamName
        if "teamName" in update_fields and old_team_name:
            participants_col.update_many({"teamName": old_team_name}, {"$set": {"teamName": update_fields["teamName"]}})

        return jsonify({"message": "Team details updated successfully."}), 200

    except Exception as e:
        print("edit_team_details error:", e)
        return jsonify({"error": "Internal server error."}), 500


@kdsh.route("/finalize_team", methods=['PATCH'])
@jwt_required()
def finalize_team():
    try:
        from app import mongo

        identity = get_jwt_identity()
        user_email = _extract_email_from_identity(mongo, identity)
        if not user_email:
            return jsonify({"error": "Unauthorized or invalid token."}), 401

        data = request.get_json()
        if not data or 'teamCode' not in data:
            return jsonify({"error": "Team code is required."}), 400

        team_code = data['teamCode'].strip().upper()

        team = mongo.cx["KDSH_2026"].kdsh2026_teams.find_one({"teamCode": team_code})
        if not team:
            return jsonify({"error": "Team not found."}), 404

        team_leader_email = (team.get("teamleader_email") or "").lower()
        if team_leader_email != user_email:
            return jsonify({"error": "Only team leader can finalize the team."}), 403

        mongo.cx["KDSH_2026"].kdsh2026_teams.update_one(
    {"teamCode": team_code},
    {"$set": {"is_team_finalized": True}}
)

        return jsonify({"message": "Team finalized successfully."}), 200

    except Exception as e:
        print("finalize_team error:", e)
        return jsonify({"error": "Internal server error."}), 500

@kdsh.route("/delete_team", methods=['DELETE'])
@jwt_required()
def delete_team():
    try:
        from app import mongo
        identity = get_jwt_identity()
        user_email = _extract_email_from_identity(mongo, identity)

        if not user_email:
            return jsonify({"error": "Unauthorized or invalid token."}), 401

        data = request.get_json()
        if not data or 'teamCode' not in data:
            return jsonify({"error": "Team code is required."}), 400

        team_code = data['teamCode'].strip().upper()
        team = mongo.cx["KDSH_2026"].kdsh2026_teams.find_one({"teamCode": team_code})

        if not team:
            return jsonify({"error": "Team not found."}), 404

        team_leader_email = (team.get("teamleader_email") or "").lower()
        if team_leader_email != user_email:
            return jsonify({"error": "Only team leader can delete the team."}), 403

        gh_ids = [team.get("teamleader_github"), *team.get("members_github", [])]

        mongo.cx["KDSH_2026"].kdsh2026_teams.delete_one({"teamCode": team_code})

        mongo.cx["KDSH_2026"].kdsh2026_participants.delete_many(
            {"GitHubID": {"$in": [g for g in gh_ids if g]}}
        )
        return jsonify({"message": "Team deleted successfully."}), 200
    except Exception as e:
        print("delete_team error:", e)
        return jsonify({"error": "Internal server error."}), 500
