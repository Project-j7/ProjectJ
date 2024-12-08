import React, { useState, useEffect } from "react";
import "./style.css";

export default function Favourite() {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Track selected image index

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch user session
                const userResponse = await fetch("http://localhost:8001/user/check", {
                    credentials: "include",
                });

                if (!userResponse.ok) {
                    throw new Error(`User API returned status: ${userResponse.status}`);
                }

                const { user } = await userResponse.json();
                if (!user?.username) {
                    throw new Error("Username is missing in the user data");
                }

                setUsername(user.username);

                // Fetch list of processed image URLs
                const imageResponse = await fetch(
                    `http://localhost:5000/collection/${user.username}`
                );

                if (!imageResponse.ok) {
                    throw new Error(`Images API returned status: ${imageResponse.status}`);
                }

                const imageList = await imageResponse.json();

                if (!Array.isArray(imageList)) {
                    throw new Error("Images API did not return a valid array");
                }

                setImages(imageList);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="collection-container">Loading user data....{username}</div>;
    }

    if (error) {
        return <div className="collection-container">Error: {error}</div>;
    }

    function pop(event, index) {
        const clickedImage = event.target;
        const popImage = document.querySelector(".popup img");
        const popup = document.querySelector(".popup");
        popImage.src = clickedImage.src;
        popup.classList.add("show-popup"); // Add class to show popup
        document.querySelector(".image-gallery").classList.add("blurred");
        setSelectedImageIndex(index); // Set selected image index
    }

    function close() {
        const popup = document.querySelector(".popup");
        popup.classList.remove("show-popup"); // Remove class to hide popup
        document.querySelector(".image-gallery").classList.remove("blurred");
    }

    async function likeImage() {
        if (selectedImageIndex === null) return;

        const popupImage = document.querySelector(".popup img");
        const imageSrc = popupImage.src;

        // Rename the full path to include `f_{index}`
        const newFilename = `liked_${selectedImageIndex}_${imageSrc.split("/").pop()}`;
        const newSrc = imageSrc.replace(imageSrc.split("/").pop(), newFilename);

        try {
            const response = await fetch("http://localhost:5000/api/like-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, oldSrc: imageSrc, newSrc }),
            });

            if (!response.ok) {
                throw new Error(`Failed to like image: ${response.statusText}`);
            }

            // Update the image source in state
            setImages((prevImages) =>
                prevImages.map((img, idx) => (idx === selectedImageIndex ? newSrc : img))
            );

            alert("Image liked successfully.");
        } catch (error) {
            console.error("Error liking image:", error);
            alert("Failed to like the image.");
        }
    }

    async function deleteImage() {
        const popup = document.querySelector(".popup");
        const imageSrc = popup.querySelector("img").src; // Retrieve the full image URL

        // Extract the filename from the full URL
        const filename = imageSrc.split("/").pop(); // Example: "image.jpg"

        try {
            const response = await fetch("http://localhost:5000/api/delete-image", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, filename }), // Send username and filename
            });

            if (!response.ok) {
                throw new Error(`Failed to delete image: ${response.statusText}`);
            }

            // Remove the deleted image from the state
            setImages((prevImages) => prevImages.filter((img) => img !== imageSrc));
            close(); // Close the popup
            alert("Image deleted successfully.");
        } catch (error) {
            console.error("Error deleting image:", error);
            alert("Failed to delete the image.");
        }
    }

    return (
        <div className="collection-container">
            {username ? (
                <>
                    <div className="welcome">
                        <h1>Welcome, {username}!</h1>
                        <p className="description">Explore your beautifully processed images below.</p>
                    </div>

                    <div id="image-gallery" className="image-gallery">
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                image.includes("liked") ? (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Processed ${image}`}
                                        className="image-item"
                                        width={200}
                                        height={210}
                                        onClick={(event) => pop(event, index)}
                                    />
                                ) : null
                            ))
                        ) : (
                            <p>No images found in your collection.</p>
                        )}
                    </div>

                    <div className="popup">
                        <div className="popup-incontainer">
                            <div className="d-flex">
                                <span className="ml-auto like-button" onClick={likeImage}>
                                    <i className="fas fa-heart"></i>
                                </span>
                                <span className="ml-auto delete-button" onClick={deleteImage}>
                                    <i className="fas fa-trash"></i>
                                </span>
                                <span
                                    className="ml-auto close-button"
                                    onClick={close}
                                >
                                    Close
                                </span>
                            </div>
                            <img src="" alt="Full Size View" />
                        </div>
                    </div>
                </>
            ) : (
                <div className="not-found">
                    <h1 className="status">404</h1>
                    <h2>Not Found</h2>
                </div>
            )}
        </div>
    );
}
