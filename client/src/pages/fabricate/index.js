import { useEffect, useState } from "react";
import "./style.css";
import { useServerUser } from "../../contextStore/serverUserContext";
import Navbar from "../../components/navbar";
import { Navigate, useNavigate } from "react-router-dom";

export function Fabricate() {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); 
    const serverUser = useServerUser();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (serverUser) {
            setUser(serverUser);
        }else{
            navigate('/');
        }
    }, [serverUser]);

    // Handle file drop
    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    // Handle file input change
    const handleFileChange = (event) => {
        const files = event.target.files;
        handleFiles(files);
    };

    // Process the selected/dropped files
    const handleFiles = (files) => {
        const fileArray = [...files];
        fileArray.forEach(file => {
            if (file.type.startsWith("image/")) {
                const imgSrc = URL.createObjectURL(file);
                setUploadedImage(imgSrc); // Preview image
                setSelectedFile(file); // Store the selected file
            }
        });
    };

    // Handle Generate button click
    const handleGenerate = () => {
        if (!selectedFile) {
            alert("Please upload an image first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("user", JSON.stringify(user));

        fetch("http://localhost:8000/dashboard/fabricate", {
            method: "POST",
            credentials: "include",
            body: formData
        })
            .then(response => response.json())
            .then(data =>{
                console.log("Success:", data);
                alert("Succesfully uploaded image.")
            })
            .catch(err => console.error("Error:", err));
    };

    return (
        <div className="container">
            <Navbar />
            <div className="display-area" id="display-area">
                <p>No image generated yet.</p>
            </div>
            <div className="image-upload">
                <h1>Upload Your Sketch Here</h1>
                <div 
                    className="upload-area" 
                    id="upload-area"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-input").click()}
                >
                    {uploadedImage ? (
                        <img src={uploadedImage} alt="Uploaded Preview" />
                    ) : (
                        <p>Drop file here or click to upload</p>
                    )}
                    <input 
                        type="file" 
                        id="file-input" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        style={{ display: "none" }} 
                    />
                </div>
                <button className="button" onClick={handleGenerate}>Generate</button>
            </div>
        </div>
    );
}
