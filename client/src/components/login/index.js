import React, {useState} from "react";
import "./style.css";
import {account} from "../../appwrite/appwrite-config";
import Lottie from "react-lottie-player";
import loginAnimation from "./loginanimation.json";

const loadRecaptcha = () => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
};

function Login() {
    const [error, setError] = useState(null);

    React.useEffect(() => {
        loadRecaptcha();
    }, []);

    async function handleGoogleLogin() {
        account.createOAuth2Session(
            "google",
            "http://localhost:3000",
            "http://localhost:3000/account/failed"
        );
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        const username = document.querySelector("#login-field-username").value;
        const password = document.querySelector("#login-field-password").value;
        const captchaResponse = document.querySelector(".g-recaptcha-response").value;

        if (!captchaResponse) {
            alert("Please complete the reCAPTCHA.");
        } else {
            try {
                const captchaVerify = await fetch("http://localhost:8001/api/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        response: captchaResponse,
                    }),
                });

                const captchaData = await captchaVerify.json();
                if (captchaData.success) {
                    const response = await fetch("http://localhost:8001/user/login", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({username, password}),
                    });

                    if (response.ok) {
                        // Store the username in sessionStorage
                        sessionStorage.setItem("username", username);
                        window.location.href = "./main";
                    } else {
                        const errorResponse = await response.json();
                        throw new Error(errorResponse.error || "Login failed");
                    }
                }
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
                setError(error.message);
            }
        }
    };

    return (
        <div className="login-container d-flex">
            <div className="animation col-6">
                <Lottie
                    loop
                    animationData={loginAnimation}
                    play
                    style={{width: "100%", height: "100%"}}
                />
            </div>
            <div className="d-flex justify-content-center col-6">
                <div className="login-box">
                    <h5>Welcome Back!</h5>
                    <h2 className="login-title">Login</h2>
                    <form className="login-form" onSubmit={handleLogin}>
                        <input
                            type="text"
                            id="login-field-username"
                            className="input-field"
                            placeholder="Username or E-mail"
                            required
                        />
                        <input
                            type="password"
                            id="login-field-password"
                            className="input-field"
                            placeholder="Password"
                            required
                        />
                        {error && <div className="error-message">{error}</div>}
                        <div
                            className="g-recaptcha d-flex justify-content-center"
                            data-sitekey="6LcyqWsqAAAAAP0Ru9J_G_gEzYU0fXMIfiwdUHpE"
                        ></div>
                        <button type="submit" className="login-btn">
                            Login
                        </button>
                        <div className="password_signup">
                            <a href="/reset/forgotpassword" className="forgot-password">
                                Forgot Password?
                            </a>
                            <a href="/account/signup" className="sign-up">
                                Sign Up
                            </a>
                        </div>
                    </form>
                    <p className="alternative-signin">or you can sign in with</p>
                    <div>
                        <a
                            id="social-icon-google"
                            href="#"
                            className="social-icon"
                            onClick={handleGoogleLogin}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-google"
                                viewBox="0 0 16 16"
                            >
                                <path d="..."/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
