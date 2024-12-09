import React, {useState, useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import "./Home.css";

export default function HomeSB() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

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

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome, {username || "Guest"}!</h1>
                <section className="about-project">
                    <h2>About Our Project</h2>
                    <p>
                        We specialize in transforming <strong>jewelry sketches</strong> into
                        <strong> realistic gold images</strong>. Our platform uses cutting-edge AI technology to
                        convert artistic sketches into lifelike visuals, empowering designers and enthusiasts.
                    </p>
                </section>
                <section className="project-features">
                    <h2>Key Features</h2>
                    <ul>
                        <li>
                            ✍️ <strong>Sketch to Gold:</strong> Upload your jewelry sketches and convert them into
                            stunning gold visuals.
                        </li>
                        <li>
                            📝 <strong>Text-to-Image:</strong> Describe your jewelry design in text and generate its
                            image.
                        </li>
                        <li>
                            🎨 <strong>High-Quality Output:</strong> Generate high-resolution, realistic visuals of
                            jewelry.
                        </li>
                        <li>
                            🚀 <strong>Fast & Accurate:</strong> Get results quickly with precision-driven AI models.
                        </li>
                        <li>
                            🌐 <strong>Webcam Integration:</strong> Capture sketches directly using your webcam.
                        </li>
                    </ul>
                </section>
                <section className="call-to-action">
                    <p>Start transforming your jewelry sketches into reality today!</p>
                    <button
                        className="explore-button"
                        onClick={() => navigate("/account/main/image-to-image")}
                    >
                        Try Sketch-to-Gold
                    </button>
                    <button
                        className="explore-button outline"
                        onClick={() => navigate("/account/main/text-to-image")}
                    >
                        Explore Text-to-Image
                    </button>
                </section>
                <Outlet/>
            </div>
        </div>
    );
}
