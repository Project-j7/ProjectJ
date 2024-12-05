import React, {useState} from "react";
import "./TextToImage.css";

export default function TextToImage() {
    const [textPrompt, setTextPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [username, setUsername] = useState(sessionStorage.getItem("username") || "guest");
    const API_TOKEN = "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";
    const modelUrl = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2";

    // Handle text prompt submission
    const handleGenerateImage = async () => {
        if (!textPrompt.trim()) {
            alert("Please enter a text prompt!");
            return;
        }

        setLoading(true);
        setGeneratedImage(null); // Clear previous image

        try {
            const response = await fetch(modelUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: textPrompt,
                    options: {wait_for_model: true},
                }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setGeneratedImage(imageUrl); // Display the image
                await saveImage(blob); // Save the image on the server
            } else {
                const errorText = await response.text();
                alert(`Error: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error("Error generating image:", error);
            alert("An error occurred while generating the image.");
        } finally {
            setLoading(false);
        }
    };

    // Save the generated image to the server
    const saveImage = async (imageBlob) => {
        const formData = new FormData();
        formData.append("image", imageBlob, "generated_image.png");
        formData.append("username", username);

        try {
            const response = await fetch("http://localhost:8001/save-image", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Image saved successfully!");
            } else {
                const errorText = await response.text();
                console.error("Error saving image:", errorText);
                alert("Failed to save the image.");
            }
        } catch (error) {
            console.error("Error saving image:", error);
            alert("An error occurred while saving the image.");
        }
    };

    return (
        <div className="text-to-image-container">
            <h2 className="page-title">Text to Image Generation</h2>
            <textarea
                className="text-prompt"
                placeholder="Enter your text prompt here..."
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
            />
            <div className="button-container">
                <button className="generate-button" onClick={handleGenerateImage} disabled={loading}>
                    {loading ? "Generating..." : "Generate Image"}
                </button>
            </div>
            {generatedImage && (
                <div className="image-preview-container">
                    <h3>Generated Image</h3>
                    <img src={generatedImage} alt="Generated" className="generated-image"/>
                </div>
            )}
        </div>
    );
}
