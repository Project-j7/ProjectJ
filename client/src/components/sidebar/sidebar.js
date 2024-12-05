import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    AiOutlinePicture,
    AiOutlineFontSize,
    AiOutlineStar,
    AiOutlineUser,
    AiOutlineAppstore,
    AiOutlineMenu,
} from "react-icons/ai";
import { FaGem } from "react-icons/fa"; // Diamond logo
import "./Sidebar.css";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
                <div className="logo">
                    <FaGem className="diamond-icon" />
                    {!isCollapsed && <span className="logo-text">ProjectJ</span>}
                </div>
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <AiOutlineMenu />
                </button>
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
                <NavLink to="/account/main/profile" activeClassName="active-link">
                    <AiOutlineUser className="sidebar-icon" />
                    {!isCollapsed && <span>Profile</span>}
                </NavLink>
            </div>
        </aside>
    );
}
