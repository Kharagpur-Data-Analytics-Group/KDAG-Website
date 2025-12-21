from github import Github
from dotenv import load_dotenv
import os, csv, json, requests, asyncio, aiohttp
from flask import Blueprint, jsonify, request, current_app
from datetime import datetime


kdsh = Blueprint("kdsh", __name__)

load_dotenv()


def serialize_document(doc):
    """Converts MongoDB documents to JSON-serializable format."""
    if not doc:
        return None
    doc["_id"] = str(doc["_id"])
    return doc


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


@kdsh.route("/check_register", methods=["POST"])
def check_multiple_stars():
    try:
        from app import mongo
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided."}), 400

        num_members = len(data)

        if num_members < 1:
            return (
                jsonify({"error": "There must be at least 1 member in the team."}),
                400,
            )
        elif num_members > 4:
            return (
                jsonify({"error": "There can be a maximum of 4 members in the team."}),
                400,
            )

        try:
            num_members_ = [member["numMembers"] for member in data]
        except KeyError as e:
            return (
                jsonify({"error": f"Missing key: {str(e)} in one or more members."}),
                400,
            )
        if len(set(num_members_)) != 1:
            return (
                jsonify(
                    {
                        "error": "There was some error in the server. Please try again later. If you face this issue again Contact us at kdag.kgp@gmail.com."
                    }
                ),
                400,
            )
        if not num_members == data[0]["numMembers"]:
            return (
                jsonify(
                    {
                        "error": "There was some error in the server. Please try again later. If you face this issue again Contact us at kdag.kgp@gmail.com."
                    }
                ),
                400,
            )

        try:
            team_names = [member["teamName"].strip().lower() for member in data]  
        except KeyError as e:
            return (
                jsonify({"error": f"Missing key: {str(e)} in one or more members."}),
                400,
            )
        if len(set(team_names)) != 1:
            return (
                jsonify(
                    {
                        "error": "There was some error in the server. Please try again. If you face this issue again Contact us at kdag.kgp@gmail.com."
                    }
                ),
                400,
            )

        try:
            gitHub_users = [member["GitHubID"].strip().lower() for member in data]  
        except KeyError as e:
            return (
                jsonify({"error": f"Missing key: {str(e)} in one or more members."}),
                400,
            )
        if len(gitHub_users) != len(set(gitHub_users)):
            return (
                jsonify(
                    {
                        "error": "GitHub ID must be unique across all members. Duplicate found."
                    }
                ),
                400,
            )

        if not gitHub_users:
            return jsonify({"error": "GitHub users are required."}), 400
        for member in data:
            if not member.get("GitHubID"):
                return (
                    jsonify(
                        {
                            "error": f"GitHub ID for {member.get('firstname')} is missing."
                        }
                    ),
                    400,
                )

        missing_repos_by_users = check_repositories(gitHub_users)
        starred_users = check_starred_repositories(missing_repos_by_users)

        if starred_users != "success":
            team_name = data[0]["teamName"].strip().lower()  
            num_members = data[0]["numMembers"]

            existing_participants = []
            for user in gitHub_users:
                existing_user = mongo.cx['KDSH_2026'].kdsh2026_failed_registrations.find_one(
                    {"GitHubID": user}
                )
                if existing_user:
                    existing_participants.append(user)

            participants_data = []
            for member in data:
                if member["GitHubID"].strip().lower() not in existing_participants: 
                    participants_data.append(
                        {
                            "isTeamLeader": member["isTeamLeader"],
                            "firstname": member["firstname"],
                            "lastname": member["lastname"],
                            "gender": member["gender"],
                            "mail": member["mail"],
                            "mobile": member["mobile"],
                            "college": member["college"],
                            "degree": member["degree"],
                            "YOS": member["YOS"],
                            "GitHubID": member["GitHubID"].strip().lower(),  
                            "teamName": team_name,
                            "numMembers": num_members,
                            "logs": starred_users,
                            "time": datetime.now(),
                        }
                    )
            try:
                if participants_data:
                    mongo.cx['KDSH_2026'].kdsh2026_failed_registrations.insert_many(participants_data)
            except Exception as e:
                print("failed to insert to failed registrations database -- ", gitHub_users)

            return (
                jsonify({"error": starred_users}),
                400,
            )
        else:
            team_name = data[0]["teamName"].strip().lower()  
            num_members = data[0]["numMembers"]

            existing_participants = []
            for user in gitHub_users:
                existing_user = mongo.cx['KDSH_2026'].kdsh2026_participants.find_one(
                    {"GitHubID": user}
                )
                if existing_user:
                    existing_participants.append(user)

            if existing_participants:
                existing_participants_message = ", ".join(existing_participants)
                return (
                    jsonify(
                        {
                            "error": f"GitHub user(s) {existing_participants_message} already have registered."
                        }
                    ),
                    400,
                )

            existing_team = mongo.cx['KDSH_2026'].kdsh2026_teams.find_one({"teamName": team_name})
            if existing_team:
                return (
                    jsonify({"error": f"Team with name {team_name} already exists."}),
                    400,
                )

            participants_data = []
            for member in data:
                participants_data.append(
                    {
                        "isTeamLeader": member["isTeamLeader"],
                        "firstname": member["firstname"],
                        "lastname": member["lastname"],
                        "gender": member["gender"],
                        "mail": member["mail"],
                        "mobile": member["mobile"],
                        "college": member["college"],
                        "degree": member["degree"],
                        "YOS": member["YOS"],
                        "GitHubID": member["GitHubID"].strip().lower(), 
                        "teamName": team_name,
                        "numMembers": num_members,
                    }
                )
            try:
                if participants_data:
                    mongo.cx['KDSH_2026'].kdsh2026_participants.insert_many(participants_data)
            except Exception as e:
                print("failed to insert to participants database -- ", gitHub_users)
                return (
                    jsonify({"error": "Failed to insert participants data: " + str(e)}),
                    500,
                )

            team_leader = next(member for member in data if member["isTeamLeader"])
            remaining_members = [member for member in data if not member["isTeamLeader"]]

            team_data = {
                "teamName": team_name,
                "numMembers": num_members,
                "teamleader_github": team_leader["GitHubID"].strip().lower(),  
                "teamleader_email": team_leader["mail"],
                "members_github": [member["GitHubID"].strip().lower() for member in remaining_members],  
                "members_email": [member["mail"] for member in remaining_members],
            }

            try:
                mongo.cx['KDSH_2026'].kdsh2026_teams.insert_one(team_data)
            except Exception as e:
                print("failed to insert to team database -- ", gitHub_users)
                return (
                    jsonify({"error": "Failed to insert team data: " + str(e)}),
                    500,
                )

            return (
                jsonify(
                    {
                        "message": "Successfully registered your team for KDSH 2025!",
                        "registration": "success",
                    }
                ),
                200,
            )

    except Exception as e:
        print(f"error: {e}")
        return jsonify({"error": str(e)}), 500


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
