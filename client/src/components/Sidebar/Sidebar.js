import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {
    AiOutlinePicture,
    AiOutlineFontSize,
    AiOutlineStar,
    AiOutlineUser,
    AiOutlineAppstore,
    AiOutlineHome,
} from "react-icons/ai";
import {FaGem} from "react-icons/fa"; // Diamond logo
import "./Sidebar.css";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [username, setUsername] = useState("");

    // Fetch username from the backend and store it in sessionStorage
    useEffect(() => {
        const fetchUsername = async () => {
            const storedUsername = sessionStorage.getItem("username");
            if (storedUsername) {
                setUsername(storedUsername); // Use stored username
            } else {
                try {
                    const response = await fetch("http://localhost:8001/user/details", {
                        method: "GET",
                        credentials: "include",
                    });
                    if (!response.ok) {
                        throw new Error("Failed to fetch username");
                    }
                    const data = await response.json();
                    setUsername(data.username);
                    sessionStorage.setItem("username", data.username); // Save to sessionStorage
                } catch (error) {
                    console.error("Error fetching username:", error);
                    setUsername("Guest"); // Fallback if fetching fails
                }
            }
        };

        fetchUsername();
    }, []);

    // Handle sidebar collapse
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header" onClick={toggleSidebar}>
                <FaGem className="diamond-icon"/>
                {!isCollapsed && <span className="logo-text">ProjectJ</span>}
            </div>
            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/account/main/home" activeClassName="active-link">
                        <AiOutlineHome className="sidebar-icon"/>
                        {!isCollapsed && <span>Home</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/account/main/image-to-image" activeClassName="active-link">
                        <AiOutlinePicture className="sidebar-icon"/>
                        {!isCollapsed && <span>Image to Image</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/account/main/text-to-image" activeClassName="active-link">
                        <AiOutlineFontSize className="sidebar-icon"/>
                        {!isCollapsed && <span>Text to Image</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/account/main/collections" activeClassName="active-link">
                        <AiOutlineAppstore className="sidebar-icon"/>
                        {!isCollapsed && <span>Collections</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/account/main/favourites" activeClassName="active-link">
                        <AiOutlineStar className="sidebar-icon"/>
                        {!isCollapsed && <span>Favorites</span>}
                    </NavLink>
                </li>
            </ul>
            <div className="sidebar-footer">
                <button
                    className="profile-button"
                    onClick={() => setShowProfilePopup(!showProfilePopup)}
                >
                    <AiOutlineUser className="sidebar-icon"/>
                    {!isCollapsed && <span>Profile</span>}
                </button>

                {/* Profile Popup */}
                {showProfilePopup && (
                    <div className="profile-popup">
                        <div className="popup-content">
                            <h3>Profile</h3>
                            <p>Username: {username || "Guest"}</p>
                            <button className="popup-button logout-button">Logout</button>
                            <button
                                className="popup-button close-popup-button"
                                onClick={() => setShowProfilePopup(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
