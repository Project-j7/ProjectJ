import "./style.css";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Main() {
    // State variables to store image URLs and username
    const [originalImageURL, setOriginalImageURL] = useState(null);
    const [processedImageSrc, setProcessedImageSrc] = useState(null);
    const [username, setUsername] = useState("");
    const navigate = useNavigate(); // Hook for navigating between pages

    // Handle image upload
    async function handleUpload(event) {
        event.preventDefault();

        const imageInput = document.getElementById('imageInput').files[0]; // Get the uploaded file
        if (!imageInput) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData(); // Create form data for the file
        formData.append('image', imageInput); // Append image to the form data

        try {
            // Send a POST request to upload the image
            const res = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json(); // Parse the response as JSON

            if (res.ok) {
                // Set original and processed image URLs on successful response
                const originalImageURL = URL.createObjectURL(imageInput);
                setOriginalImageURL(originalImageURL);
                setProcessedImageSrc(`http://localhost:5000/processed/${result.processedImage}`);
            } else {
                alert(result.error || "Error processing image.");
            }
        } catch (error) {
            console.error("Upload failed", error); // Log any errors
            alert("An error occurred while uploading the image.");
        }
    }

    // Fetch main page data, including user info, when component is mounted
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user details from the backend
                const response = await fetch("http://localhost:8001/user/main", {
                    method: "POST",
                    credentials: "include", // Include credentials (cookies) for session handling
                });

                if (!response.ok) {
                    throw new Error("Unauthorized access"); // Redirect if unauthorized
                }
                const data = await response.json();
                setUsername(data.username); // Set the fetched username
            } catch (error) {
                console.error("Failed to fetch main page data:", error); // Log errors
                navigate("/account/login"); // Redirect to login on failure
            }
        };

        fetchData();
    }, [navigate]); // Dependency array: rerun only if `navigate` changes

    // Handle user logout
    async function handleLogout() {
        const response = await fetch("http://localhost:8001/user/logout", {
            method: "POST",
            credentials: 'include', // Include credentials (cookies) for session handling
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        alert(result.msg); // Display logout message

        if (response.status === 200) {
            window.location.href = "http://localhost:3000/account/login"; // Redirect to login on successful logout
        } else {
            alert(result.error || "Logout failed."); // Display error message on failure
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <h2 className="welcome-message">Welcome, {username}!</h2> {/* Display welcome message with username */}
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

                    <div className="mt-4">
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
