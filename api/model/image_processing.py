import numpy as np
from PIL import Image
import tensorflow as tf

# Load the pre-trained model
model_path = "jewelry_model.h5"
model = tf.keras.models.load_model(model_path)
print("Model loaded successfully")


# Function to process the image using the pre-trained model
def process_image_with_model(input_image_path, output_image_path):
    try:
        # Load and preprocess the image
        image = Image.open(input_image_path).convert('RGB')

        # Store the original resolution of the image
        original_size = image.size

        # Resize to match model input size (256x256)
        image_resized = image.resize((256, 256))
        image_array = np.array(image_resized) / 255.0  # Normalize the image
        image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

        # Use the model to predict the output
        prediction = model.predict(image_array)

        # Convert prediction to image and rescale pixel values
        predicted_image = (prediction[0] * 255).astype(np.uint8)
        predicted_image = Image.fromarray(predicted_image)

        # Resize the predicted image back to the original resolution
        predicted_image_resized = predicted_image.resize(original_size)

        # Save the output image
        predicted_image_resized.save(output_image_path)

        print(f"Processed image saved as {output_image_path}")

    except Exception as e:
        print(f"Error processing image: {e}")
