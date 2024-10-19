import "./style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
    const [originalImageURL, setOriginalImageURL] = useState(null);
    const [processedImageSrc, setProcessedImageSrc] = useState(null);
    const [username, setUsername] = useState("");
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const navigate = useNavigate();

    // Handle image upload
    async function handleUpload(event) {
        event.preventDefault(); // Prevent default form submission behavior

        const imageInput = document.getElementById('imageInput').files[0]; // Get the uploaded file
        if (!imageInput) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData(); // Create FormData object to hold the file and username
        formData.append('image', imageInput); // Append the selected image to the FormData
        formData.append('username', username); // Append the username to the FormData

        try {
            // Send a POST request to the server to upload the image
            const res = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json(); // Parse the JSON response

            if (res.ok) {
                // If the upload is successful, create an object URL for the original image
                const originalImageURL = URL.createObjectURL(imageInput);
                setOriginalImageURL(originalImageURL); // Set the original image URL state
                setProcessedImageSrc(`http://localhost:5000/processed/${result.processedImage}`); // Set the processed image URL
            } else {
                alert(result.error || "Error processing image."); // Show error message
            }
        } catch (error) {
            console.error("Upload failed", error); // Log any errors to the console
            alert("An error occurred while uploading the image."); // Show an alert for upload error
        }
    }

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send a POST request to fetch user information
                const response = await fetch("http://localhost:8001/user/main", {
                    method: "POST",
                    credentials: "include", // Include credentials (cookies) for session handling
                });

                if (!response.ok) {
                    throw new Error("Unauthorized access"); // Throw an error if response is not ok
                }
                const data = await response.json(); // Parse the response as JSON
                setUsername(data.username); // Set the username state
            } catch (error) {
                console.error("Failed to fetch main page data:", error); // Log errors to console
                navigate("/account/login"); // Redirect to login if fetching data fails
            }
        };

        fetchData(); // Call the fetch function
    }, [navigate]); // Rerun only if `navigate` changes

    // Handle user logout
    async function handleLogout() {
        const response = await fetch("http://localhost:8001/user/logout", {
            method: "POST",
            credentials: 'include', // Include credentials (cookies) for session handling
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json(); // Parse the JSON response
        alert(result.msg); // Display logout message

        if (response.status === 200) {
            window.location.href = "http://localhost:3000/account/login"; // Redirect to login page on successful logout
        } else {
            alert(result.error || "Logout failed."); // Display error message on failure
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="welcome-message">Welcome, {username}!</h2>
            <div className="row">
                <div className="col-md-6 section-box">
                    <h2 className="section-heading">Collection</h2>
                    <button className="btn btn-primary" onClick={() => alert("Still in development!")}>Browse</button>
                </div>
                <div className="col-md-6 section-box text-center">
                    <h2 className="section-heading">Upload an Image</h2>
                    <button className="btn btn-success" onClick={() => setShowUploadPopup(true)}>Upload Now</button>
                </div>
            </div>

            {showUploadPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3 className="popup-heading">Upload an Image</h3>
                        <form id="uploadForm" className="upload-form" onSubmit={handleUpload}>
                            <div className="mb-3">
                                <input className="form-control" type="file" id="imageInput" accept="image/*"/>
                            </div>
                            <button type="submit" className="btn btn-success">Upload and Process</button>
                        </form>
                        <div className="image-container mt-4 text-center">
                            <div className="image-section">
                                {originalImageURL && (
                                    <>
                                        <p className="image-title">Original Image</p>
                                        <img className="img-thumbnail image-resize" src={originalImageURL} alt="Original"/>
                                    </>
                                )}
                            </div>
                            <div className="image-section">
                                {processedImageSrc && (
                                    <>
                                        <p className="image-title">Processed Image</p>
                                        <img className="img-thumbnail image-resize" src={processedImageSrc} alt="Processed"/>
                                    </>
                                )}
                            </div>
                        </div>
                        <button className="btn btn-danger mt-3" onClick={() => setShowUploadPopup(false)}>Close</button>
                    </div>
                </div>
            )}

            <div className="mt-4 text-center">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}
