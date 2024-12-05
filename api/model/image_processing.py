# Import necessary libraries
import tensorflow as tf
import numpy as np
from tensorflow import keras
from tensorflow.keras.layers import LeakyReLU
from PIL import Image, ImageEnhance
import cv2


# Define a custom Conv2DTranspose layer without the 'groups' argument
# This ensures compatibility with models that might include 'groups' in Conv2DTranspose
class CustomConv2DTranspose(keras.layers.Conv2DTranspose):
    def __init__(self, *args, **kwargs):
        # Remove 'groups' from kwargs if present to avoid compatibility issues
        kwargs.pop('groups', None)
        super().__init__(*args, **kwargs)


# Load the generator model with custom objects (e.g., LeakyReLU and CustomConv2DTranspose)
# Replace 'generator.h5' with the path to your generator model file
model_path = r"generator.h5"
generator = tf.keras.models.load_model(model_path, custom_objects={'LeakyReLU': LeakyReLU,
                                                                   'Conv2DTranspose': CustomConv2DTranspose})
print("Model loaded successfully")


# Function to convert an image to a sketch using OpenCV
# This process includes grayscale conversion, inversion, Gaussian blur, and edge extraction
def convert_to_sketch(image_path):
    img = cv2.imread(image_path)  # Read the input image
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # Convert image to grayscale
    invert = cv2.bitwise_not(gray)  # Invert the grayscale image
    blur = cv2.GaussianBlur(invert, (111, 111), 0)  # Apply Gaussian blur
    inverted_blur = cv2.bitwise_not(blur)  # Invert the blurred image
    sketch = cv2.divide(gray, inverted_blur, scale=256)  # Create the sketch effect
    return sketch


# Function to preprocess the sketch for input to the model
# Ensures the input image matches the target size and normalizes pixel values
def load_and_preprocess_sketch(sketch, target_size=(1280, 1280)):
    # Convert sketch (NumPy array) to PIL image and ensure RGB format
    img = Image.fromarray(sketch).convert("RGB")
    original_size = img.size  # Get the original dimensions of the image
    original_ratio = original_size[0] / original_size[1]  # Calculate aspect ratio

    # Maintain aspect ratio while resizing to fit within target dimensions
    if original_ratio > 1:
        new_width = target_size[0]
        new_height = int(target_size[0] / original_ratio)
    else:
        new_height = target_size[1]
        new_width = int(target_size[1] * original_ratio)

    # Resize the image to maintain aspect ratio
    img = img.resize((new_width, new_height), Image.LANCZOS)

    # Add white padding to make the resized image square
    new_img = Image.new("RGB", target_size, (255, 255, 255))
    new_img.paste(img, ((target_size[0] - new_width) // 2, (target_size[1] - new_height) // 2))

    # Convert image to a NumPy array and normalize pixel values to [-1, 1]
    img_array = np.array(new_img) / 127.5 - 1
    return tf.convert_to_tensor(img_array, dtype=tf.float32)


# Function to upscale and brighten the model's output
# Ensures the final image meets the required size and improves visual appearance
def upscale_and_brighten_output(prediction, max_length=2560, brightness_factor=1.5):
    # Remove batch dimension and rescale pixel values to [0, 255]
    output_image = np.clip((prediction[0].numpy() + 1) * 127.5, 0, 255).astype(np.uint8)
    output_img = Image.fromarray(output_image)  # Convert NumPy array to PIL image

    # Calculate scaling factor to ensure the longest dimension matches max_length
    scale_factor = min(max_length / output_img.width, max_length / output_img.height)

    # Resize the image with the calculated dimensions
    new_width = int(output_img.width * scale_factor)
    new_height = int(output_img.height * scale_factor)
    output_img = output_img.resize((new_width, new_height), Image.LANCZOS)

    # Enhance brightness to improve visibility
    enhancer = ImageEnhance.Brightness(output_img)
    return enhancer.enhance(brightness_factor)


# Main function to process an image using the generator model
# Converts the input image to a sketch, processes it through the model, and saves the output
def process_image_with_model(image_path, output_path):
    # Convert the input image to a sketch
    sketch = convert_to_sketch(image_path)

    # Preprocess the sketch for input to the model
    input_sketch = load_and_preprocess_sketch(sketch)
    input_sketch = tf.expand_dims(input_sketch, axis=0)  # Add batch dimension for model input

    # Generate predictions using the pre-trained generator model
    predictions = generator(input_sketch, training=False)

    # Upscale and brighten the model's output
    brightened_output = upscale_and_brighten_output(predictions)

    # Save the processed image to the specified output path
    brightened_output.save(output_path)
    print(f"Processed and saved: {output_path}")
