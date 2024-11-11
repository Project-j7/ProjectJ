import os

# Base folder paths
UPLOAD_FOLDER = './uploads'
PROCESSED_FOLDER = './processed'

# Ensure the base folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

def clean_up_orphaned_files():
    for username in os.listdir(UPLOAD_FOLDER):
        user_upload_folder = os.path.join(UPLOAD_FOLDER, username)
        user_processed_folder = os.path.join(PROCESSED_FOLDER, username)

        if not os.path.isdir(user_upload_folder):
            continue

        # Get all uploaded and processed files for the user
        uploaded_files = set(os.listdir(user_upload_folder))
        processed_files = set(os.listdir(user_processed_folder))

        for uploaded_file in uploaded_files:
            # Check for the corresponding processed file
            processed_file = 'processed_' + uploaded_file
            if processed_file not in processed_files:
                # If processed file is missing, delete the uploaded file
                os.remove(os.path.join(user_upload_folder, uploaded_file))

        for processed_file in processed_files:
            # Check for the corresponding uploaded file
            uploaded_file = processed_file.replace('processed_', '')
            if uploaded_file not in uploaded_files:
                # If uploaded file is missing, delete the processed file
                os.remove(os.path.join(user_processed_folder, processed_file))
