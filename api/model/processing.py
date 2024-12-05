import os

# Base folder paths
UPLOAD_FOLDER = './uploads'  # Folder containing user-uploaded files
PROCESSED_FOLDER = './processed'  # Folder containing processed versions of uploaded files

# Ensure the base folders exist
# Creates the folders if they don't already exist, ensuring the script doesn't fail
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)


def clean_up_orphaned_files():
    """
    Cleans up orphaned files in the UPLOAD_FOLDER and PROCESSED_FOLDER.
    An orphaned file is an uploaded file without a corresponding processed file,
    or a processed file without a corresponding uploaded file.
    """
    for username in os.listdir(UPLOAD_FOLDER):
        # Full paths to the user's upload and processed folders
        user_upload_folder = os.path.join(UPLOAD_FOLDER, username)
        user_processed_folder = os.path.join(PROCESSED_FOLDER, username)

        # Skip if the folder is not a directory
        if not os.path.isdir(user_upload_folder):
            continue

        # Get lists of files for the user in both folders
        uploaded_files = set(os.listdir(user_upload_folder))  # All files uploaded by the user
        processed_files = set(os.listdir(user_processed_folder)) if os.path.isdir(
            user_processed_folder) else set()  # All files processed for the user

        # Loop through uploaded files and check for corresponding processed files
        for uploaded_file in uploaded_files:
            # Create the expected processed file name
            processed_file = 'processed_' + uploaded_file
            if processed_file not in processed_files:
                # If the corresponding processed file does not exist, delete the uploaded file
                os.remove(os.path.join(user_upload_folder, uploaded_file))

        # Loop through processed files and check for corresponding uploaded files
        for processed_file in processed_files:
            # Derive the expected uploaded file name
            uploaded_file = processed_file.replace('processed_', '')
            if uploaded_file not in uploaded_files:
                # If the corresponding uploaded file does not exist, delete the processed file
                os.remove(os.path.join(user_processed_folder, processed_file))
