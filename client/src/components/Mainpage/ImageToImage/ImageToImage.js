import React, { useState, useEffect, useRef } from "react";
import "./ImageToImage.css";

export default function ImageToImage() {
    const [inputImage, setInputImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showOptionsPopup, setShowOptionsPopup] = useState(false);
    const [showWebcamPopup, setShowWebcamPopup] = useState(false);
    const [username, setUsername] = useState(sessionStorage.getItem("username") || "");
    const [fileToProcess, setFileToProcess] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchUsername = async () => {
            if (!username) {
                try {
                    const response = await fetch("http://localhost:8001/user/details", {
                        method: "GET",
                        credentials: "include",
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setUsername(data.username);
                        sessionStorage.setItem("username", data.username);
                    } else {
                        console.error("Failed to fetch username:", data.error);
                    }
                } catch (error) {
                    console.error("Error fetching username:", error);
                }
            }
        };

        fetchUsername();
    }, [username]);

    const handleUpload = (imageFile) => {
        if (imageFile) {
            setInputImage(URL.createObjectURL(imageFile)); // Show the preview
            setFileToProcess(imageFile); // Store the file to be processed later
        }
    };

    const handleProcess = async () => {
        if (!fileToProcess) {
            alert("Please upload or capture an image before generating.");
            return;
        }

        const formData = new FormData();
        formData.append("image", fileToProcess);
        formData.append("username", username || "default_user");

        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                const processedImageUrl = `http://localhost:5000/processed/${result.processedImage}`;
                setProcessedImage(processedImageUrl);
            } else {
                alert(result.error || "Error processing image.");
            }
        } catch (error) {
            console.error("Processing failed", error);
            alert("An error occurred while processing the image.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleUpload(file);
        }
        setShowOptionsPopup(false);
    };

    const startWebcam = async () => {
        setShowOptionsPopup(false);
        setShowWebcamPopup(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
            tracks.forEach((track) => track.stop());
        }
        setShowWebcamPopup(false);
    };

    const captureImage = async () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/png");

            const blob = await fetch(imageData).then((res) => res.blob());
            const file = new File([blob], "webcam-image.png", { type: "image/png" });

            handleUpload(file);
            stopWebcam();
        }
    };

    return (
        <div className="image-to-image-container">
            <h2 className="page-title">Image to Image Processing</h2>
            <p>Welcome, {username || "Guest"}</p>
            <div className="image-boxes">
                <div className="image-box">
                    <h3>Input Image</h3>
                    <div className="image-preview">
                        {inputImage ? (
                            <img src={inputImage} alt="Input" className="image" />
                        ) : (
                            <p className="placeholder-text">Upload or capture an image</p>
                        )}
                        <button className="plus-button" onClick={() => setShowOptionsPopup(true)}>
                            +
                        </button>
                    </div>
                </div>
                <div className="image-box">
                    <h3>Processed Image</h3>
                    <div className="image-preview">
                        {processedImage ? (
                            <img src={processedImage} alt="Processed" className="image" />
                        ) : (
                            <p className="placeholder-text">No processed image</p>
                        )}
                    </div>
                </div>
            </div>
            <button
                className="generate-button"
                onClick={handleProcess}
                disabled={!fileToProcess || loading}
            >
                {loading ? "Processing..." : "Generate"}
            </button>
            {showOptionsPopup && (
                <div className="options-popup">
                    <div className="popup-content">
                        <h3>Select Input Option</h3>
                        <button
                            className="popup-option-button"
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            Upload File
                        </button>
                        <button className="popup-option-button" onClick={startWebcam}>
                            Use Webcam
                        </button>
                        <button
                            className="close-popup-button"
                            onClick={() => setShowOptionsPopup(false)}
                        >
                            Close
                        </button>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleFileUpload}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            )}
            {showWebcamPopup && (
                <div className="webcam-popup">
                    <div className="popup-content">
                        <h3>Capture Image from Webcam</h3>
                        <video ref={videoRef} autoPlay className="webcam-video" />
                        <canvas ref={canvasRef} style={{ display: "none" }} />
                        <div className="popup-actions">
                            <button onClick={captureImage} className="capture-button">
                                Capture
                            </button>
                            <button onClick={stopWebcam} className="close-button">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
