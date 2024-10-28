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
        event.preventDefault();
        const imageInput = document.getElementById('imageInput').files[0];
        if (!imageInput) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('image', imageInput);
        formData.append('username', username);

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

    // Fetch user data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8001/user/main", {
                    method: "POST",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Unauthorized access");
                }
                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.error("Failed to fetch main page data:", error);
                navigate("/account/login");
            }
        };

        fetchData();
    }, [navigate]);

    // Handle user logout
    async function handleLogout() {
        const response = await fetch("http://localhost:8001/user/logout", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        alert(result.msg);

        if (response.status === 200) {
            window.location.href = "http://localhost:3000/account/login";
        } else {
            alert(result.error || "Logout failed.");
        }
    }

    return (
        <div className="container mt-5">
            <div className="logout-button">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            <h2 className="welcome-message">Welcome, {username}!</h2>
            <div className="grid-container">
                <div className="section-box collection">
                    <h2 className="section-heading">Collection</h2>
                    <button className="btn btn-primary" onClick={() => alert("Still in development!")}>Browse</button>
                </div>
                <div className="section-box upload">
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
                                <input className="form-control" type="file" id="imageInput" accept="image/*" />
                            </div>
                            <button type="submit" className="btn btn-success">Upload and Process</button>
                        </form>
                        <div className="image-preview-container mt-4">
                            <div className="image-preview-section">
                                {originalImageURL && (
                                    <>
                                        <p className="image-title">Original Image</p>
                                        <img className="img-thumbnail image-resize" src={originalImageURL} alt="Original" />
                                    </>
                                )}
                            </div>
                            <div className="image-preview-section">
                                {processedImageSrc && (
                                    <>
                                        <p className="image-title">Processed Image</p>
                                        <img className="img-thumbnail image-resize" src={processedImageSrc} alt="Processed" />
                                    </>
                                )}
                            </div>
                        </div>
                        <button className="btn btn-danger mt-3" onClick={() => setShowUploadPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
