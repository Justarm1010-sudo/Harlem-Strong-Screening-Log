import json
import boto3
import requests
from datetime import datetime
import os

# REDCap connection string
REDCAP_API_TOKEN = os.environ["REDCAP_API_TOKEN"]
REDCAP_URL = 'https://redcap.sph.cuny.edu/api/'

# Cognito User Pool Information
COGNITO_USER_POOL_ID = os.environ["COGNITO_USER_POOL_ID"]
COGNITO_APP_CLIENT_ID = os.environ["COGNITO_APP_CLIENT_ID"]

# Function to get the number of records in REDCap
def get_record_count():
    payload = {
        'token': REDCAP_API_TOKEN,
        'content': 'record',
        'format': 'json',
        'type': 'flat',
        'fields': 'participant_id',
        'returnFormat': 'json'
    }

    response = requests.post(REDCAP_URL, data=payload)
    
    if response.status_code == 200:
        records = response.json()
        return len(records)  # Return the total number of records
    else:
        raise Exception(f"Error fetching record count: {response.text}")

# Function to generate a new participant ID
def generate_participant_id():
    record_count = get_record_count()  
    generated_id_number = record_count + 1
    return f"EandRP3number{generated_id_number}" 

# Function to submit event to REDCap
def redcap_event_upload(data, context):
    # Generate the participant ID if not provided
    if "participant_id" not in data or not data["participant_id"]:
        data["participant_id"] = generate_participant_id()

    payload = {
        'token': REDCAP_API_TOKEN,
        'content': 'record',
        'format': 'json',
        'type': 'flat',
        'data': json.dumps([{
            'participant_id': data.get("participant_id", ""),
            'phq4_complete': data.get("phq4_complete", ""),
            'organization': data.get("organization", ""),
            'mcc': data.get("mcc", ""),
            'cluster': data.get("cluster", ""),
            'address': data.get("address", ""),
            'provider_name': data.get("provider_name", ""),
            'screen_date': data.get("screen_date", ""),
            'screening_id': data.get("screening_id", ""),
            'consumer_name': data.get("consumer_name", ""),
            'gender': data.get("gender", ""),
            'dob': data.get("dob", ""),
            'race': data.get("race", ""),
            'ethnicity': data.get("ethnicity", ""),
            'email': data.get("email", ""),
            'contact_info': data.get("contact_info", ""),
            'preferred_contact_method_time': data.get("preferred_contact_method_time", ""),
            'phq_4_score': data.get("phq_4_score", ""),
            'suicide_self_harm': data.get("suicide_self_harm", ""),
            'smi_risk': data.get("smi_risk", ""),
            'eligible_for_study': data.get("eligible_for_study", ""),
            'interest_in_study': data.get("interest_in_study", ""),
            'date_of_1st_contact': data.get("date_of_1st_contact", ""),
            'date_of_2nd_contact': data.get("date_of_2nd_contact", ""),
            'date_of_3rd_contact': data.get("date_of_3rd_contact", ""),
            'survey_follow_up_notes': data.get("survey_follow_up_notes", ""),
            'image_upload': data.get("image_upload", ""),
            'zip_code': data.get('zip_code', ""),
            'hear_about_us' : data.get('hear_about_us', ""),
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }]),
        'returnContent': 'count',
        'returnFormat': 'json'
    }

    response = requests.post(REDCAP_URL, data=payload)
    
    if response.status_code == 200:
        return {
            "statusCode": 200,
            "body": json.dumps("Screening data successfully uploaded to REDCap!")
        }
    else:
        return {
            "statusCode": 500,
            "body": json.dumps(f"Error uploading data to REDCap: {response.text}")
        }

# Lambda handler function
def lambda_handler(event, context):
    try:
        data = json.loads(event["body"])

        if "action" in data:
            action = data["action"]

            if action == "log_screening":
                return redcap_event_upload(data, context)
            else:
                return {
                    "statusCode": 400,
                    "body": json.dumps("Invalid action specified.")
                }
        else:
            return {
                "statusCode": 400,
                "body": json.dumps("No action specified.")
            }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"Logging Error": str(e)})
        }
