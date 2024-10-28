import cv2
import numpy as np
from PIL import Image
from tqdm import tqdm
import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array

# Load models
model_a_path = "Ritu290.h5"
model_b_path = "Saha.h5"
model_a = tf.keras.models.load_model(model_a_path)
model_b = tf.keras.models.load_model(model_b_path)
print("Models loaded successfully")


# Function to detect edges in the input image
def detect_edges(image_path):
    # Initialize progress bar with 6 total steps
    progress = tqdm(total=6, desc="Processing Image")

    # Step 1: Load the image from the specified path
    image = cv2.imread(image_path)
    progress.update(1)  # Update progress bar

    # Step 2: Save the original size for later resizing
    original_size = (image.shape[1], image.shape[0])  # Width, Height of the original image
    progress.update(1)

    # Step 3: Resize the image to 256x256 for model processing
    image_resized = cv2.resize(image, (256, 256))
    progress.update(1)

    # Step 4: Convert the resized image to LAB color space to separate luminance and color channels
    lab = cv2.cvtColor(image_resized, cv2.COLOR_BGR2LAB)
    L, _, B = cv2.split(lab)  # Split LAB channels to get L (luminance) and B (color) channels
    progress.update(1)

    # Step 5: Detect edges on the L (luminance) and B (color) channels
    edges_luminance = cv2.Canny(L, threshold1=10, threshold2=60)
    edges_color_b = cv2.Canny(B, threshold1=10, threshold2=60)
    combined_edges = cv2.bitwise_or(edges_luminance, edges_color_b)
    progress.update(1)

    # Step 6: Invert the edges and prepare a white background with black edges
    edges_inv = cv2.bitwise_not(combined_edges)
    edges_inv_bgr = cv2.cvtColor(edges_inv, cv2.COLOR_GRAY2BGR)
    white_background = np.ones_like(edges_inv_bgr) * 255
    image_with_black_details = np.where(edges_inv_bgr == [0, 0, 0], [0, 0, 0], white_background).astype(np.uint8)
    progress.update(1)

    # Close the progress bar
    progress.close()

    return image_with_black_details, original_size  # Return edge-detected image and original size


# Function to process an image through a model
def process_image_with_model(model, input_image):
    # Convert image from BGR to RGB format and then to array
    input_array = img_to_array(cv2.cvtColor(input_image, cv2.COLOR_BGR2RGB))

    # Normalize the array to values between -1 and 1 for model input
    input_array = (input_array / 127.5) - 1.0
    input_array = np.expand_dims(input_array, axis=0)  # Add batch dimension

    # Get the model's prediction
    predicted_image = model.predict(input_array)

    # Convert the prediction back to 0-255 range and clip values
    predicted_image = (predicted_image[0] + 1) * 127.5
    predicted_image = np.clip(predicted_image, 0, 255).astype(np.uint8)

    return Image.fromarray(predicted_image)  # Return the processed image in PIL format


# Main function to process a single image
def process_single_image(image_path, output_path):
    print("Starting image processing...")
    # Detect edges and obtain the original size
    edge_detected_image, original_size = detect_edges(image_path)
    print("Stage - 1 Edge detection success")

    # Process the edge-detected image through the first model
    processed_img_model_a = process_image_with_model(model_a, edge_detected_image)
    print("Stage - 2 Colour Generation success")

    # Convert the processed image back to BGR format for the next model
    processed_img_model_a_np = np.array(processed_img_model_a)
    processed_img_model_a_bgr = cv2.cvtColor(processed_img_model_a_np, cv2.COLOR_RGB2BGR)

    # Process the image through the second model
    final_image = process_image_with_model(model_b, processed_img_model_a_bgr)
    print("Stage - 3 Realistic Modification success")

    # Resize the final processed image back to the original size
    final_image_resized = final_image.resize(original_size)

    # Save the final resized image to the specified output path
    final_image_resized.save(output_path)
    print(f"Final processed image saved at: {output_path}")
