import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    AiOutlinePicture,
    AiOutlineFontSize,
    AiOutlineStar,
    AiOutlineAppstore,
} from "react-icons/ai";
import { FaGem } from "react-icons/fa"; // Diamond logo
import "./Sidebar.css";

export default function Sidebar({ username, handleLogout }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    return (
        <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
                <div className="logo" onClick={toggleSidebar}>
                    <FaGem className="diamond-icon" />
                    {!isCollapsed && <span className="logo-text">ProjectJ</span>}
                </div>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/account/main/image-to-image" activeClassName="active-link">
                        <AiOutlinePicture className="sidebar-icon" />
                        {!isCollapsed && <span>Image to Image</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/account/main/text-to-image" activeClassName="active-link">
                        <AiOutlineFontSize className="sidebar-icon" />
                        {!isCollapsed && <span>Text to Image</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/account/main/collections" activeClassName="active-link">
                        <AiOutlineAppstore className="sidebar-icon" />
                        {!isCollapsed && <span>Collections</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/account/main/favorites" activeClassName="active-link">
                        <AiOutlineStar className="sidebar-icon" />
                        {!isCollapsed && <span>Favorites</span>}
                    </NavLink>
                </li>
            </ul>
            <div className="sidebar-footer">
                <button onClick={toggleProfile} className="profile-button">
                    <AiOutlineAppstore className="sidebar-icon" />
                    {!isCollapsed && <span>Profile</span>}
                </button>
                {showProfile && (
                    <div className="profile-menu">
                        <p>{username}</p>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}
