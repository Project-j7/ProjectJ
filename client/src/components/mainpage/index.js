import "./style.css";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"; // Import useNavigate

export default function Main() {
    const [originalImageURL, setOriginalImageURL] = useState(null);
    const [processedImageSrc, setProcessedImageSrc] = useState(null);
    const [message, setMessage] = useState(""); // Added state to hold message
    const navigate = useNavigate(); // Initialize useNavigate

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8001/user/main", {
                    method: "POST",
                    credentials: "include", // Include cookies in the request
                });

                if (!response.ok) {
                    throw new Error("Unauthorized access");
                }
                const data = await response.json();
                setMessage(data.msg); // Set the message state
            } catch (error) {
                console.error("Failed to fetch main page data:", error);
                navigate("/account/login"); // Redirect to the login page if not authenticated
            }
        };

        fetchData();
    }, [navigate]);

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
            window.location.href = "http://localhost:3000/"; // Redirect to login page on successful logout
        } else {
            alert(result.error || "Logout failed.");
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <h1 className="mb-4">Image Upload & Processing</h1>
                    <form id="uploadForm" className="upload-form" onSubmit={handleUpload}>
                        <div className="mb-3">
                            <input className="form-control" type="file" id="imageInput" accept="image/*"/>
                        </div>
                        <button type="submit" className="btn btn-custom">Upload and Process</button>
                    </form>

                    <div className="image-container mt-5" id="imageDisplay">
                        {originalImageURL && (
                            <div className="image-section">
                                <p className="image-title">Original Image</p>
                                <img id="originalImage" src={originalImageURL} alt="Original"/>
                            </div>
                        )}
                        {processedImageSrc && (
                            <div className="image-section">
                                <p className="image-title">Processed Image</p>
                                <img id="processedImage" src={processedImageSrc} alt="Processed"/>
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