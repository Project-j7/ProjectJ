import os
import uuid
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from image_processing import process_image_with_model  # Import the processing function

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow React app

# Folder paths
UPLOAD_FOLDER = './uploads'
PROCESSED_FOLDER = './processed'

# Ensure the folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# API route to upload image
@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No image selected'}), 400

    # Save the uploaded image
    filename = str(uuid.uuid4()) + os.path.splitext(image_file.filename)[1]
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    image_file.save(image_path)

    # Process the image using the model
    processed_filename = 'processed_' + filename
    processed_image_path = os.path.join(PROCESSED_FOLDER, processed_filename)
    process_image_with_model(image_path, processed_image_path)

    return jsonify({'processedImage': processed_filename})


# API route to serve the processed image
@app.route('/processed/<filename>', methods=['GET'])
def get_processed_image(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)


# Run the Flask app
if __name__ == '__main__':
    print("Starting Flask app on port 5000")
    app.run(debug=True, port=5000)
