import cv2
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array

# Load the model
model_path = "generator.h5" # ensure that you have downloaded this model and placed it
model = tf.keras.models.load_model(model_path)
print("Model loaded successfully")


# Function to process the image using the model
def process_image_with_model(image_path, output_path):
    # Load the original image
    image = cv2.imread(image_path)
    original_size = (image.shape[1], image.shape[0])  # Width, Height of original image

    # Resize the input image to 256x256
    image_resized = cv2.resize(image, (256, 256))

    # Convert the resized image to LAB and perform edge detection on L and B channels
    lab = cv2.cvtColor(image_resized, cv2.COLOR_BGR2LAB)
    L, A, B = cv2.split(lab)
    edges_luminance = cv2.Canny(L, threshold1=10, threshold2=60)
    edges_color_b = cv2.Canny(B, threshold1=10, threshold2=60)
    combined_edges = cv2.bitwise_or(edges_luminance, edges_color_b)
    edges_inv = cv2.bitwise_not(combined_edges)
    edges_inv_bgr = cv2.cvtColor(edges_inv, cv2.COLOR_GRAY2BGR)

    # Prepare the edge-detected image for the model input
    white_background = np.ones_like(edges_inv_bgr) * 255
    image_with_black_details = np.where(edges_inv_bgr == [0, 0, 0], [0, 0, 0], white_background).astype(np.uint8)

    # Load the processed image using Unet model
    input_array = img_to_array(cv2.cvtColor(image_with_black_details, cv2.COLOR_BGR2RGB))
    input_array = (input_array / 127.5) - 1.0
    input_array = np.expand_dims(input_array, axis=0)

    predicted_image = model.predict(input_array)
    predicted_image = (predicted_image[0] + 1) * 127.5
    predicted_image = np.clip(predicted_image, 0, 255).astype(np.uint8)

    # Convert the processed image to PIL format
    processed_img = Image.fromarray(predicted_image)

    # Resize the processed image back to the original size
    processed_img_resized = processed_img.resize(original_size)

    # Save the final processed image
    processed_img_resized.save(output_path)
    print(f"Processed and saved: {output_path}")
