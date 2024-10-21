import React, { useEffect } from "react";
import "./style.css";
import { getAuth, signOut } from "firebase/auth";
import { useFirebaseUser } from "../../contextStore/firebaseUserContext";
import { useServerUser } from "../../contextStore/serverUserContext";
import { useNavigate } from "react-router-dom"; 

export function Logout() {
    const { firebaseUser, googleLogOut } = useFirebaseUser();
    const serverUser = useServerUser();

    const navigate = useNavigate();

    async function handleGoogleSignOut() {
        await googleLogOut();
        navigate('/account/login');
    }

    async function handleServerSignOut() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/account/login');
    }

    function setSignOut() {
        if (firebaseUser) {
            handleGoogleSignOut();
        } else if (serverUser) {

            handleServerSignOut();
        }
    }

    return (
        <button className="logout-button" onClick={setSignOut}>Logout</button>
    );
}
