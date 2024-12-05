import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Own imports for additional functionality
from image_processing import process_image_with_model  # Function to process images using a model
from processing import clean_up_orphaned_files  # Function to clean up unused files

# Initialize Flask app and enable Cross-Origin Resource Sharing (CORS)
app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {"origins": "http://localhost:3000"}})  # Allow access from a React app running on localhost:3000

# Base folder paths for storing uploaded and processed images
UPLOAD_FOLDER = './uploads'
PROCESSED_FOLDER = './processed'

# Ensure the base folders exist at startup
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)


def get_next_filename(folder_path, username):
    """
    Generate the next filename for a user by counting existing files.
    Ensures sequential numbering for filenames within a user's folder.
    """
    user_files = [f for f in os.listdir(folder_path) if f.startswith(username)]  # List files starting with the username
    next_number = len(user_files) + 1  # Determine the next number in sequence
    return f"{username}{next_number:03d}"  # Return filename with zero-padded numbering (e.g., user001)


# API route to upload an image
@app.route('/api/upload', methods=['POST'])
def upload_image():
    """
    Handle image upload, process it using the model, and return the processed image's path.
    """
    # Validate that 'username' and 'image' are included in the request
    if 'username' not in request.form or 'image' not in request.files:
        return jsonify({'error': 'Username or image file missing'}), 400

    username = request.form['username']  # Extract the username
    image_file = request.files['image']  # Extract the uploaded image file

    if image_file.filename == '':
        return jsonify({'error': 'No image selected'}), 400  # Error if no file is selected

    # Create user-specific directories if they don't exist
    user_upload_folder = os.path.join(UPLOAD_FOLDER, username)
    user_processed_folder = os.path.join(PROCESSED_FOLDER, username)
    os.makedirs(user_upload_folder, exist_ok=True)
    os.makedirs(user_processed_folder, exist_ok=True)

    # Generate a unique filename with sequential numbering
    filename = get_next_filename(user_upload_folder, username) + os.path.splitext(image_file.filename)[1]
    image_path = os.path.join(user_upload_folder, filename)  # Full path for the uploaded image
    image_file.save(image_path)  # Save the uploaded file

    # Process the image and save the processed version
    processed_filename = 'processed_' + filename
    processed_image_path = os.path.join(user_processed_folder, processed_filename)
    process_image_with_model(image_path, processed_image_path)  # Call the image processing function

    # Return the path to the processed image
    return jsonify({'processedImage': f"{username}/{processed_filename}"})


# API route to serve a processed image
@app.route('/processed/<username>/<filename>', methods=['GET'])
def get_processed_image(username, filename):
    """
    Serve a processed image to the client.
    """
    return send_from_directory(os.path.join(PROCESSED_FOLDER, username),
                               filename)  # Serve the file from the user's processed folder


# Run the Flask app
if __name__ == '__main__':
    clean_up_orphaned_files()  # Clean up orphaned files before starting the server
    print("Starting Flask app on port 5000")
    app.run(debug=True, port=5000)  # Start the Flask app in debug mode on port 5000
