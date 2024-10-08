import os
import uuid
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from image_processing import process_image_with_model  # Import the processing function

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow React app

# Base folder paths
UPLOAD_FOLDER = './uploads'
PROCESSED_FOLDER = './processed'

# Ensure the base folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)


def get_next_filename(folder_path, username):
    """
    Generate the next sequential filename for a given user in the specified folder.
    """
    user_files = [f for f in os.listdir(folder_path) if f.startswith(username)]
    next_number = len(user_files) + 1
    return f"{username}{next_number:03d}"


# API route to upload image
@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'username' not in request.form or 'image' not in request.files:
        return jsonify({'error': 'Username or image file missing'}), 400

    username = request.form['username']
    image_file = request.files['image']

    if image_file.filename == '':
        return jsonify({'error': 'No image selected'}), 400

    # Create user directories if they don't exist
    user_upload_folder = os.path.join(UPLOAD_FOLDER, username)
    user_processed_folder = os.path.join(PROCESSED_FOLDER, username)
    os.makedirs(user_upload_folder, exist_ok=True)
    os.makedirs(user_processed_folder, exist_ok=True)

    # Generate the filename with sequential numbering
    filename = get_next_filename(user_upload_folder, username) + os.path.splitext(image_file.filename)[1]
    image_path = os.path.join(user_upload_folder, filename)
    image_file.save(image_path)

    # Process the image using the model
    processed_filename = 'processed_' + filename
    processed_image_path = os.path.join(user_processed_folder, processed_filename)
    process_image_with_model(image_path, processed_image_path)

    return jsonify({'processedImage': f"{username}/{processed_filename}"})


# API route to serve the processed image
@app.route('/processed/<username>/<filename>', methods=['GET'])
def get_processed_image(username, filename):
    return send_from_directory(os.path.join(PROCESSED_FOLDER, username), filename)


# Run the Flask app
if __name__ == '__main__':
    print("Starting Flask app on port 5000")
    app.run(debug=True, port=5000)
