import React, { useState, useEffect } from "react";
import "./style.css";

export default function Collection() {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);

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

    function pop(event) {
        const clickedImage = event.target;
        const popImage = document.querySelector(".popup img");
        const popup = document.querySelector(".popup");
        popImage.src = clickedImage.src;
        popup.classList.add("show-popup"); // Add class to show popup
        document.querySelector(".image-gallery").classList.add("blurred");
    }

    function close() {
        const popup = document.querySelector(".popup");
        popup.classList.remove("show-popup"); // Remove class to hide popup
        document.querySelector(".image-gallery").classList.remove("blurred");
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
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Processed ${image}`}
                                    className="image-item"
                                    width={200}
                                    height={210}
                                    onClick={pop}
                                />
                            ))
                        ) : (
                            <p>No images found in your collection.</p>
                        )}
                    </div>

                    <div className="popup">
                        <div className="popup-incontainer">
                            <div className="d-flex">
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
