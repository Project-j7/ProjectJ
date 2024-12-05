# ProjectJ

## Overview

**ProjectJ** is an innovative application designed to transform artistic jewelry sketches into realistic gold jewelry
images. It also provides users with the ability to generate images using text prompts and view their generated images in
a personalized collection.

---

## Features

1. **Image-to-Jewelry Transformation**:  
   Upload an artistic jewelry sketch, and the system generates a realistic gold jewelry image.

2. **Text-to-Image Generation**:  
   Enter a text prompt to generate stunning jewelry images based on your imagination.

3. **Collections**:  
   View and manage all the images you have generated in one place.

---

## Installation Instructions

### Prerequisites:

- Node.js installed on your system.
- Python installed (for `app.py` backend functionality).

### Steps:

1. **Download the Model**:  
   Download the `.h5` model
   from [this link](https://drive.google.com/file/d/1FFodj1KsoHN1KyNaPr5T_0WbR3CCn1UL/view?usp=sharing).  
   Place the downloaded file in the `.../api/model` folder and rename it to **`generator.h5`**.

2. **Install Dependencies**:  
   Open a terminal and navigate to the project directory. Use the following command to install all required Node.js
   modules:
   ```bash
   npm install
   ```

3. **Start the Application**:  
   To run the entire application (backend, API, and client) simultaneously, use:
   ```bash
   npm start
   ```

4. **Alternative Startup**:  
   To run only the API and client together, use:
   ```bash
   npm run web
   ```

---

## Team Members

1. **Ritesh Reddy G (N1)**
2. **Varshith Reddy K (N2)**
3. **Sahasrika E**
4. **Rohan Rao G**
5. **Shobit Sai K**
6. **Karthikeya K**
7. **Srirama Manish K**

---

## Notes

- Ensure the `.h5` model is correctly placed in the `api/model` folder before starting the application.
- Use the specified commands for proper execution of the project.

Enjoy transforming your jewelry ideas into reality with **ProjectJ**! 🎨✨