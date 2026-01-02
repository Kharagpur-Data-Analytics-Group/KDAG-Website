"""
Extract emails from users who have NOT registered for KDSH 2026.

This script connects to MongoDB and finds all users from KDAG-BACKEND.users
who have not registered in KDSH_2026.kdsh2026_participants, then exports
those emails to a CSV file.
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
try:
    import certifi
    client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
except ImportError:
    client = MongoClient(MONGO_URI)


def extract_non_registered_emails(output_file=None):
    """
    Extract emails from KDAG-BACKEND.users that are NOT in KDSH_2026.kdsh2026_participants.
    
    Args:
        output_file (str): Path to the output CSV file (optional)
    """
    if output_file is None:
        output_file = f"non_registered_emails.csv"
    
    print("=" * 60)
    print("Extracting Non-Registered User Emails")
    print("=" * 60)
    
    try:
        # Get all emails from KDAG-BACKEND.users
        users_collection = client["KDAG-BACKEND"]["users"]
        all_users = list(users_collection.find({}, {"email": 1, "_id": 0}))
        user_emails = set()
        
        for user in all_users:
            email = user.get("email", "").strip().lower()
            if email:
                user_emails.add(email)
        
        print(f"Found {len(user_emails)} users in KDAG-BACKEND.users")
        
        # Get all emails from KDSH_2026.kdsh2026_participants
        participants_collection = client["KDSH_2026"]["kdsh2026_participants"]
        all_participants = list(participants_collection.find({}, {"mail": 1, "_id": 0}))
        participant_emails = set()
        
        for participant in all_participants:
            email = participant.get("mail", "").strip().lower()
            if email:
                participant_emails.add(email)
        
        print(f"Found {len(participant_emails)} participants in KDSH_2026.kdsh2026_participants")
        
        # Find emails that are in users but NOT in participants
        non_registered_emails = user_emails - participant_emails
        non_registered_emails_list = sorted(list(non_registered_emails))
        
        print(f"Found {len(non_registered_emails_list)} users who have NOT registered for KDSH 2026")
        
        # Write to output CSV
        with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['email'])  # Header
            for email in non_registered_emails_list:
                writer.writerow([email])
        
        print(f"\n✅ Export completed successfully!")
        print(f"📁 File saved as: {output_file}")
        print(f"📊 Total emails exported: {len(non_registered_emails_list)}")
        
    except Exception as e:
        print(f"\n❌ Error occurred: {str(e)}")
        import traceback
        traceback.print_exc()
    finally:
        # Close MongoDB connection
        client.close()


if __name__ == "__main__":
    extract_non_registered_emails()
