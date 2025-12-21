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
                "The server seems to be experiencing unexpected load. Please try again after some time. If the issue persists contact us at kdag.kgp@gmail.com"
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
def check_multiple_stars():
    try:
        import re
        from app import mongo

        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided."}), 400

        if not isinstance(data, list):
            return jsonify({"error": "Expected a JSON array of member objects."}), 400

        num_members = len(data)
        if num_members < 1:
            return jsonify({"error": "There must be at least 1 member in the team."}), 400
        if num_members > 4:
            return jsonify({"error": "There can be a maximum of 4 members in the team."}), 400

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
            "numMembers",
        ]

        validation_errors = []
        github_users = []
        team_names = []
        numMembers_values = []
        leader_count = 0

        for idx, member in enumerate(data, start=1):

            if not isinstance(member, dict):
                return jsonify({"error": f"Member {idx} must be an object."}), 400

            missing_fields = [f for f in required_fields if f not in member]
            if missing_fields:
                validation_errors.append(f"Member {idx} missing fields: {', '.join(missing_fields)}")
                continue

            # isTeamLeader must be boolean
            if not isinstance(member.get("isTeamLeader"), bool):
                validation_errors.append(f"Member {idx} field 'isTeamLeader' must be boolean.")
            if member.get("isTeamLeader") is True:
                leader_count += 1

            # firstname/lastname not empty
            firstname = str(member.get("firstname") or "").strip()
            lastname = str(member.get("lastname") or "").strip()
            if not firstname:
                validation_errors.append(f"Member {idx} 'firstname' must be a non-empty string.")
            if not lastname:
                validation_errors.append(f"Member {idx} 'lastname' must be a non-empty string.")

            # email validation
            email = str(member.get("mail") or "").strip()
            if not re.match(r"^[^@]+@[^@]+\.[^@]+$", email):
                validation_errors.append(f"Member {idx} has invalid email: '{email}'.")

            # mobile validation
            mobile = str(member.get("mobile") or "").strip()
            if not re.match(r"^\d{10}$", mobile):
                validation_errors.append(
                    f"Member {idx} has invalid mobile number: '{mobile}'. Expected 10 digits."
                )

            # YOS integer check
            yos = member.get("YOS")
            try:
                int(yos)
            except:
                validation_errors.append(f"Member {idx} 'YOS' must be an integer.")

            # GitHubID
            git = str(member.get("GitHubID") or "").strip().lower()
            if not git:
                validation_errors.append(f"Member {idx} GitHubID is missing or empty.")
            github_users.append(git)

            # capture teamName & numMembers
            team_names.append(str(member.get("teamName") or "").strip().lower())
            numMembers_values.append(member.get("numMembers"))

        # Leader must be exactly 1
        if leader_count != 1:
            return (
                jsonify({"error": f"There must be exactly one team leader. Found {leader_count}."}),
                400,
            )

        # If other validation errors exist
        if validation_errors:
            return jsonify({"error": "Validation failed.", "details": validation_errors}), 400

        # Team name consistency
        if len(set(team_names)) != 1:
            return jsonify({"error": "Team name mismatch across members."}), 400

        # Validate numMembers consistency
        if len(set(numMembers_values)) != 1:
            return jsonify({"error": "numMembers mismatch across members."}), 400

        try:
            reported_num = int(list(set(numMembers_values))[0])
        except:
            return jsonify({"error": "numMembers must be an integer."}), 400

        if reported_num != num_members:
            return jsonify(
                {"error": f"numMembers ({reported_num}) does not match actual count ({num_members})."}
            ), 400

        # Duplicate GitHub IDs
        duplicates = [g for g in set(github_users) if github_users.count(g) > 1 and g]
        if duplicates:
            return jsonify(
                {"error": "Duplicate GitHub IDs found across team members.", "duplicates": duplicates}
            ), 400

        # Now check GitHub starring rules
        missing_repos_by_users = check_repositories(github_users)
        starred_users = check_starred_repositories(missing_repos_by_users)
        team_name = team_names[0]

        if starred_users != "success":
            # Store in failed registrations
            participants_data = []
            for member in data:
                participants_data.append(
                    {
                        **member,
                        "GitHubID": str(member["GitHubID"]).strip().lower(),
                        "teamName": team_name,
                        "logs": starred_users,
                        "time": datetime.now(),
                    }
                )
            try:
                mongo.cx["KDSH_2026"].kdsh2026_failed_registrations.insert_many(participants_data)
            except:
                pass

            return jsonify({"error": starred_users}), 400

        # Check existing entries
        existing = mongo.cx["KDSH_2026"].kdsh2026_participants.find(
            {"GitHubID": {"$in": github_users}}
        )
        existing_list = [x["GitHubID"] for x in existing]
        if existing_list:
            return jsonify({"error": f"Already registered: {', '.join(existing_list)}"}), 400

        if mongo.cx["KDSH_2026"].kdsh2026_teams.find_one({"teamName": team_name}):
            return jsonify({"error": f"Team '{team_name}' already exists."}), 400

        # Insert participants
        participants_data = []
        for member in data:
            participants_data.append(
                {
                    **member,
                    "GitHubID": str(member["GitHubID"]).lower(),
                    "teamName": team_name,
                }
            )
        mongo.cx["KDSH_2026"].kdsh2026_participants.insert_many(participants_data)

        # Create team entry
        leader = next(m for m in data if m["isTeamLeader"])
        members = [m for m in data if not m["isTeamLeader"]]

        team_record = {
            "teamName": team_name,
            "numMembers": reported_num,
            "teamleader_github": leader["GitHubID"].lower(),
            "teamleader_email": leader["mail"],
            "members_github": [m["GitHubID"].lower() for m in members],
            "members_email": [m["mail"] for m in members],
        }
        mongo.cx["KDSH_2026"].kdsh2026_teams.insert_one(team_record)

        return jsonify({
            "message": "Successfully registered your team for KDSH 2025!",
            "registration": "success",
        }), 200

    except Exception as e:
        print(e)
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
