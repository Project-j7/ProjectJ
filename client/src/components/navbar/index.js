import { Link } from "react-router-dom";
import { useFirebaseUser } from "../../contextStore/firebaseUserContext";
import { useServerUser } from "../../contextStore/serverUserContext";
import "./styles.css";
import {useState, useEffect, } from 'react';

function Navbar(){    
    const firebaseUser = useFirebaseUser();
    const serverUser  = useServerUser();
    const [user, setUser] = useState(null);
    const [username, setUsername]= useState(null);

    useEffect(()=>{
        if (serverUser) {
            setUser(serverUser);
            setUsername(serverUser.username);
            console.log(serverUser);
        }
    },[]);


    return(
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">SKREMSI</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/dashboard">{username}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard/fabricate">Fabricate</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard/pinned">Pinned</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard/favourites">Favourites</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;