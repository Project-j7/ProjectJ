import "./style.css";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

export default function Main() {
    const [originalImageURL, setOriginalImageURL] = useState(null);
    const [processedImageSrc, setProcessedImageSrc] = useState(null);
    const [username, setUsername] = useState("");
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [showWebcam, setShowWebcam] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
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

    // Capture image from webcam and upload
    const captureImage = async () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (!canvas || !video) {
            alert("Webcam not available.");
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0);

        const imageData = canvas.toDataURL('image/png');
        setOriginalImageURL(imageData);
        setShowWebcam(false);

        const blob = await fetch(imageData).then(res => res.blob());

        const formData = new FormData();
        formData.append('image', blob, 'captured_image.png');
        formData.append('username', username);

        try {
            const res = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                setProcessedImageSrc(`http://localhost:5000/processed/${result.processedImage}`);
            } else {
                alert(result.error || "Error processing image.");
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("An error occurred while uploading the captured image.");
        }

        stopWebcam();
    };

    const startWebcam = async () => {
        setShowWebcam(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } catch (error) {
            console.error("Error accessing webcam", error);
            alert("Could not access webcam. Please check your permissions.");
        }
    };

    const stopWebcam = () => {
        const videoElement = videoRef.current;

        if (videoElement && videoElement.srcObject) {
            const stream = videoElement.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }

        if (videoElement) {
            videoElement.srcObject = null;
        }
    };

    // Fetch user data when the component mounts
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

        return () => {
            stopWebcam(); // Cleanup when component unmounts
        };
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
                        <h3 className="popup-heading">Upload or Capture Image</h3>
                        <button className="btn btn-info mb-3" onClick={startWebcam}>Use Webcam</button>
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
                                        <img className="img-thumbnail image-resize" src={originalImageURL}
                                             alt="Original"/>
                                    </>
                                )}
                            </div>
                            <div className="image-section">
                                {processedImageSrc && (
                                    <>
                                        <p className="image-title">Processed Image</p>
                                        <img className="img-thumbnail image-resize" src={processedImageSrc}
                                             alt="Processed"/>
                                    </>
                                )}
                            </div>
                        </div>
                        <button className="btn btn-danger mt-3" onClick={() => setShowUploadPopup(false)}>Close</button>
                    </div>
                </div>
            )}

            {showWebcam && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3 className="popup-heading">Webcam Capture</h3>
                        <video ref={videoRef} autoPlay className="webcam-video"
                               style={{width: '100%', maxHeight: '400px'}}/>
                        <canvas ref={canvasRef} style={{display: 'none'}}/>
                        <button className="btn btn-success mt-2" onClick={captureImage}>Capture Image</button>
                        <button className="btn btn-danger mt-2" onClick={() => {
                            setShowWebcam(false);
                            stopWebcam();
                        }}>Close
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-4 text-center">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}
