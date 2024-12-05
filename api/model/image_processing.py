import tensorflow as tf
import numpy as np
from tensorflow import keras
from tensorflow.keras.layers import LeakyReLU
from PIL import Image, ImageEnhance
import cv2


# Define a custom Conv2DTranspose layer without 'groups' argument
class CustomConv2DTranspose(keras.layers.Conv2DTranspose):
    def __init__(self, *args, **kwargs):
        # Remove 'groups' from kwargs if present
        kwargs.pop('groups', None)
        super().__init__(*args, **kwargs)


# Load the generator model with custom objects
model_path = r"generator.h5"
generator = tf.keras.models.load_model(model_path, custom_objects={'LeakyReLU': LeakyReLU,
                                                                   'Conv2DTranspose': CustomConv2DTranspose})
print("Model loaded successfully")


# Function to convert an image to a sketch using OpenCV
def convert_to_sketch(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    invert = cv2.bitwise_not(gray)
    blur = cv2.GaussianBlur(invert, (111, 111), 0)
    inverted_blur = cv2.bitwise_not(blur)
    sketch = cv2.divide(gray, inverted_blur, scale=256)
    return sketch


# Function to preprocess the input sketch for the model
def load_and_preprocess_sketch(sketch, target_size=(1280, 1280)):
    img = Image.fromarray(sketch).convert("RGB")
    original_size = img.size
    original_ratio = original_size[0] / original_size[1]

    # Maintain aspect ratio
    if original_ratio > 1:
        new_width = target_size[0]
        new_height = int(target_size[0] / original_ratio)
    else:
        new_height = target_size[1]
        new_width = int(target_size[1] * original_ratio)

    img = img.resize((new_width, new_height), Image.LANCZOS)

    # Add white padding to make it square
    new_img = Image.new("RGB", target_size, (255, 255, 255))
    new_img.paste(img, ((target_size[0] - new_width) // 2, (target_size[1] - new_height) // 2))

    img_array = np.array(new_img) / 127.5 - 1  # Normalize to [-1, 1]
    return tf.convert_to_tensor(img_array, dtype=tf.float32)


# Function to upscale and brighten the output
def upscale_and_brighten_output(prediction, max_length=2560, brightness_factor=1.5):
    # Remove batch dimension and rescale to [0, 255] for PIL
    output_image = np.clip((prediction[0].numpy() + 1) * 127.5, 0, 255).astype(np.uint8)
    output_img = Image.fromarray(output_image)

    # Calculate scaling factor to ensure max dimension is 2560
    scale_factor = min(max_length / output_img.width, max_length / output_img.height)

    # Calculate new dimensions
    new_width = int(output_img.width * scale_factor)
    new_height = int(output_img.height * scale_factor)

    # Resize the image
    output_img = output_img.resize((new_width, new_height), Image.LANCZOS)

    # Brighten the image
    enhancer = ImageEnhance.Brightness(output_img)
    return enhancer.enhance(brightness_factor)


# Main function to process the image
def process_image_with_model(image_path, output_path):
    # Convert the image to a sketch
    sketch = convert_to_sketch(image_path)

    # Preprocess the sketch
    input_sketch = load_and_preprocess_sketch(sketch)
    input_sketch = tf.expand_dims(input_sketch, axis=0)  # Add batch dimension

    # Generate predictions
    predictions = generator(input_sketch, training=False)

    # Upscale and brighten the result
    brightened_output = upscale_and_brighten_output(predictions)

    # Save the output
    brightened_output.save(output_path)
    print(f"Processed and saved: {output_path}")


if __name__ == "__main__":
    # Path to the input image (replace with your image path)
    input_image_path = r"C:\Users\rites\OneDrive\Desktop\testImages2\gs16.jpg"

    # Path to save the output image (replace with your desired output path)
    output_image_path = r"C:\Users\rites\OneDrive\Desktop\g16.jpg"

    try:
        # Process the input image with the generator model
        process_image_with_model(input_image_path, output_image_path)
        print("Image processing completed successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")
