import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Login from "../../components/login/index";
import "./index.css";

export default function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    function loginRedirect() {
        console.log("navbar button");
        navigate('/account/login');  // Navigate to the /login page
    }

    function loginPopUp() {
        console.log("body button");
        setShowLogin(true);  // Show the login popup
    }

    return (
        <div>
            <h1>Home</h1>
            <div id="home-header">
                <button id="home-navbar-login-button" onClick={loginRedirect}>Login</button>
            </div>
            <div id="home-body">
                <button id="home-body-login-button" onClick={loginPopUp}>Finished Your First Attempt</button>
            </div>

            {/* Conditionally render the Login popup */}
            {showLogin && (
                <div className="login-popup">
                    <Login/>
                </div>
            )

            }
        </div>
    );
}
