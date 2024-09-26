import "./style.css";
import { useState } from "react";
//import { useHistory } from "react-router-dom"; // Assuming you're using react-router

export default function Upload() {
    const [originalImageURL, setOriginalImageURL] = useState(null);
    const [processedImageSrc, setProcessedImageSrc] = useState(null);
    //const history = useHistory(); // React router hook to redirect

    async function handleUpload(event) {
        event.preventDefault();

        const imageInput = document.getElementById('imageInput').files[0];
        if (!imageInput) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('image', imageInput);

        try {
            const res = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                const originalImageURL = URL.createObjectURL(imageInput);
                setOriginalImageURL(originalImageURL);
                setProcessedImageSrc(`http://localhost:5000/processed/${result.processedImage}`);
            } else {
                alert(result.error || "Error processing image.");
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("An error occurred while uploading the image.");
        }
    }

    function handleLogout() {
        //Code here
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <h1 className="mb-4">Image Upload & Processing</h1>
                    <form id="uploadForm" className="upload-form" onSubmit={handleUpload}>
                        <div className="mb-3">
                            <input className="form-control" type="file" id="imageInput" accept="image/*" />
                        </div>
                        <button type="submit" className="btn btn-custom">Upload and Process</button>
                    </form>

                    <div className="image-container mt-5" id="imageDisplay">
                        {originalImageURL && (
                            <div className="image-section">
                                <p className="image-title">Original Image</p>
                                <img id="originalImage" src={originalImageURL} alt="Original" />
                            </div>
                        )}
                        {processedImageSrc && (
                            <div className="image-section">
                                <p className="image-title">Processed Image</p>
                                <img id="processedImage" src={processedImageSrc} alt="Processed" />
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <div className="mt-4">
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
