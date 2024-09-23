import tensorflow as tf
import numpy as np
from PIL import Image
import os
import uuid
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow React app

# Folder paths
UPLOAD_FOLDER = './uploads'
PROCESSED_FOLDER = './processed'

# Ensure the folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# Load the pre-trained model
model_path = "jewelry_model.h5"
model = tf.keras.models.load_model(model_path)
print("Model loaded successfully")


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


# Function to process the image using the pre-trained model
def process_image_with_model(input_image_path, output_image_path):
    try:
        # Load and preprocess the image
        image = Image.open(input_image_path).convert('RGB')
        image = image.resize((256, 256))  # Resize to match model input size
        image_array = np.array(image) / 255.0  # Normalize the image
        image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

        # Use the model to predict the output
        prediction = model.predict(image_array)

        # Convert prediction to image and save
        predicted_image = (prediction[0] * 255).astype(np.uint8)  # Rescale the pixel values
        predicted_image = Image.fromarray(predicted_image)
        predicted_image.save(output_image_path)
    except Exception as e:
        print(f"Error processing image: {e}")


# API route to serve the processed image
@app.route('/processed/<filename>', methods=['GET'])
def get_processed_image(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)


# Run the Flask app
if __name__ == '__main__':
    print("Starting Flask app on port 5000")
    app.run(debug=True, port=5000)
