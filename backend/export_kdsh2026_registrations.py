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
    
    # Create team lookup by team leader's GitHub ID (for team leaders)
    team_by_leader = {team["teamleader_github"].lower(): team for team in teams if team.get("teamleader_github")}
    
    # Create team lookup by members' GitHub IDs (for team members)
    # Each member's GitHub ID maps to their team
    team_by_member = {}
    for team in teams:
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
        
        # Skip participants without a team
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
    
    # Sort by team_comb_id (teamCode)
    csv_data.sort(key=lambda x: x["team_comb_id"])
    
    # Write to CSV(s) - split into chunks, keeping teams together
    if csv_data:
        fieldnames = [
            "team_comb_id", "team_name", "player_name", "email", "mobile",
            "organisation", "gender", "location", "study_year",
            "domain", "work_experience"
        ]
        
        max_rows_per_file = 1000
        total_rows = len(csv_data)
        
        # Group rows by team_comb_id to keep teams together
        from itertools import groupby
        teams_grouped = [list(group) for key, group in groupby(csv_data, key=lambda x: x["team_comb_id"])]
        
        # Generate base filename without extension
        base_name = output_filename.rsplit('.', 1)[0]
        extension = output_filename.rsplit('.', 1)[1] if '.' in output_filename else 'csv'
        
        created_files = []
        current_chunk = []
        current_chunk_size = 0
        file_number = 1
        
        for team_members in teams_grouped:
            team_size = len(team_members)
            
            # Check if adding this team would exceed max_rows_per_file
            # If yes, save current chunk (which will be < 1000) and start new chunk
            # This ensures no CSV ever exceeds 1000 rows
            if current_chunk and (current_chunk_size + team_size > max_rows_per_file):
                # Save current chunk (will be less than 1000 rows)
                if len(created_files) == 0 and total_rows <= max_rows_per_file:
                    file_name = output_filename
                else:
                    file_name = f"{base_name}_part{file_number}.{extension}"
                
                with open(file_name, 'w', newline='', encoding='utf-8') as csvfile:
                    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                    writer.writeheader()
                    writer.writerows(current_chunk)
                
                created_files.append((file_name, current_chunk_size))
                file_number += 1
                
                # Start new chunk
                current_chunk = []
                current_chunk_size = 0
            
            # Add team to current chunk
            current_chunk.extend(team_members)
            current_chunk_size += team_size
        
        # Save the last chunk
        if current_chunk:
            if len(created_files) == 0:
                # Only one file needed
                file_name = output_filename
            else:
                file_name = f"{base_name}_part{file_number}.{extension}"
            
            with open(file_name, 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(current_chunk)
            
            created_files.append((file_name, current_chunk_size))
        
        print(f"\n✅ Export completed successfully!")
        print(f"📊 Total rows exported: {total_rows}")
        print(f"📁 Created {len(created_files)} file(s):")
        for file_name, row_count in created_files:
            print(f"   - {file_name} ({row_count} rows)")
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
