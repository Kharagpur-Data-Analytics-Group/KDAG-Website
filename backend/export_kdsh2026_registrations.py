"""
Export KDSH 2026 registrations from MongoDB to CSV format.

This script connects to MongoDB, fetches all participants and team data,
and exports it to a CSV file in the required format.
"""

import os
import csv
from datetime import datetime
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables
load_dotenv()

# MongoDB connection
MONGO_URI = os.environ.get("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI not found in environment variables")

# Connect to MongoDB with SSL certificate handling
# This handles the SSL certificate verification issue on macOS
try:
    import certifi
    client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
except ImportError:
    # If certifi is not available, use the connection without it
    client = MongoClient(MONGO_URI)

db = client["KDSH_2026"]

# Collections
teams_collection = db["kdsh2026_teams"]
participants_collection = db["kdsh2026_participants"]


def export_registrations_to_csv(output_filename="kdsh2026_registrations.csv"):
    """
    Export all KDSH 2026 registrations to CSV format.
    
    Args:
        output_filename (str): Name of the output CSV file
    """
    print("Fetching data from MongoDB...")
    
    # Fetch all participants
    participants = list(participants_collection.find())
    print(f"Found {len(participants)} participants")
    
    # Fetch all teams and create lookup dictionaries
    teams = list(teams_collection.find())
    print(f"Found {len(teams)} teams")
    
    # Filter only finalized teams
    finalized_teams = [team for team in teams if team.get("is_team_finalized", False)]
    print(f"Found {len(finalized_teams)} finalized teams")
    
    # Create team lookup by team leader's GitHub ID (for team leaders) - only finalized teams
    team_by_leader = {team["teamleader_github"].lower(): team for team in finalized_teams if team.get("teamleader_github")}
    
    # Create team lookup by members' GitHub IDs (for team members) - only finalized teams
    # Each member's GitHub ID maps to their team
    team_by_member = {}
    for team in finalized_teams:
        for member_github in team.get("members_github", []):
            team_by_member[member_github.lower()] = team
    
    # Prepare CSV data
    csv_data = []
    
    for participant in participants:
        github_id = participant.get("GitHubID", "").lower()
        is_leader = participant.get("isTeamLeader", False)
        
        # Find the correct team based on GitHub ID
        if is_leader:
            team_info = team_by_leader.get(github_id, {})
        else:
            team_info = team_by_member.get(github_id, {})
        
        # Skip participants whose teams are not finalized
        if not team_info:
            continue
        
        team_name = participant.get("teamName", "")
        
        # Format mobile number with +91 prefix
        mobile = participant.get("mobile", "")
        if mobile and not mobile.startswith("+"):
            mobile = f"+91{mobile}"
        
        # Convert gender to M, F, O format
        gender = participant.get("gender", "").lower()
        gender_map = {
            "male": "M",
            "female": "F",
            "other": "O"
        }
        gender_code = gender_map.get(gender, "")
        
        # Map MongoDB fields to CSV format
        row = {
            "team_comb_id": team_info.get("teamCode", ""),
            "team_name": team_name,
            "player_name": f"{participant.get('firstname', '')} {participant.get('lastname', '')}".strip(),
            "email": participant.get("mail", ""),
            "mobile": mobile,
            "organisation": participant.get("college", ""),
            "gender": gender_code,
            "location": "",  # Not available in the data
            "study_year": str(participant.get("YOS", "")),
            "domain": "",  # Not available in the data
            "work_experience": ""  # Not available in the data
        }
        
        csv_data.append(row)
    
    # Write to CSV
    if csv_data:
        fieldnames = [
            "team_comb_id", "team_name", "player_name", "email", "mobile",
            "organisation", "gender", "location", "study_year",
            "domain", "work_experience"
        ]
        
        with open(output_filename, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(csv_data)
        
        print(f"\n✅ Export completed successfully!")
        print(f"📁 File saved as: {output_filename}")
        print(f"📊 Total rows exported: {len(csv_data)}")
    else:
        print("⚠️  No data found to export")
    
    # Close MongoDB connection
    client.close()


if __name__ == "__main__":
    # Generate filename with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"kdsh2026_registrations_{timestamp}.csv"
    
    print("=" * 60)
    print("KDSH 2026 Registration Export")
    print("=" * 60)
    
    try:
        export_registrations_to_csv(output_file)
    except Exception as e:
        print(f"\n❌ Error occurred: {str(e)}")
        import traceback
        traceback.print_exc()
