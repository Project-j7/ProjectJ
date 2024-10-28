import React, { useState } from "react";
import "./style.css";
import { account } from "../../appwrite/appwrite-config";
import { authentication } from "../../firebase/firebase-config";
import { TwitterAuthProvider, signInWithPopup, signInWithRedirect, FacebookAuthProvider } from "firebase/auth";
import Lottie from 'react-lottie-player';
import login from "./login.json";

// Load reCAPTCHA script globally
const loadRecaptcha = () => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
};

function Login() {
    const [error, setError] = useState(null); // State for error messages

    React.useEffect(() => {
        loadRecaptcha(); // Load reCAPTCHA on component mount
    }, []);

    async function handleGoogleLogin() {
        account.createOAuth2Session(
            'google',
            'http://localhost:3000',
            'http://localhost:3000/account/failed'
        );
    }

    async function handleTwitterLogin() {
        const provider = new TwitterAuthProvider();
        signInWithRedirect(authentication, provider)
            .then((request) => {
                console.log(request);
            })
            .catch((error) => {
                console.log(error);
                setError("Twitter login failed. Please try again.");
            });
    }

    async function handleFacebookLogin() {
        const fbProvider = new FacebookAuthProvider();
        signInWithPopup(authentication, fbProvider)
            .then((request) => {
                console.log(request);
            })
            .catch((error) => {
                console.log(error);
                setError("Facebook login failed. Please try again.");
            });
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        const username = document.querySelector("#login-field-username").value;
        const password = document.querySelector("#login-field-password").value;
        const captchaResponse = document.querySelector(".g-recaptcha-response").value; // Get reCAPTCHA response

        console.log(username, password);
        if (!captchaResponse) {
            alert("Please complete the reCAPTCHA.");
            return;
        }
        else{
            try {
                const captchaVerify = await fetch("http://localhost:8001/api/verify", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        response: captchaResponse // Send reCAPTCHA token to the backend
                    })
                })
                
                const captchaData = await captchaVerify.json();
                console.log(captchaData);
                if(captchaData.success){
                    alert("ReCaptcha Verified successfully");
                    const response = await fetch('http://localhost:8001/user/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password })
                })
                

                if (response.ok) {
                    window.location.href = 'http://localhost:3000/account/main';
                } else {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.error || 'Login failed');
                }
            }
            else{
                alert("Captcha failed.")
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setError(error.message);
        }
    }
};

    return (
       
    <div class="login-container">
        <div className="container">
                <Lottie
                    loop
                    animationData={login}
                    play
                    style={{ width: "80%", height: "70%" }}
                />
        </div>
        <div class="login-box">
            {/* <img src="logo.png" alt="Company Logo" class="login-logo" /> */}
            <h2 class="login-title">Login</h2>
            
            <form class="login-form" onSubmit={handleLogin}>
                <input type="text" id="login-field-username" class="input-field" placeholder="Username or E-mail" />
                <input type="password" id="login-field-password" class="input-field" placeholder="Password" />
                
                {/* reCAPTCHA */}
                <div className="g-recaptcha d-flex justify-content-center" data-sitekey="6LecGG4qAAAAALEL-sGYlFvjGrSZ4dMhLQBKXm7c"></div>

                <button type="submit" class="login-btn">Login</button>
                
                <div className="password_signup">
                    <a href="/reset/forgotpassword" class="forgot-password">Forgot Password?</a>
                    <a href="/account/signup" class="sign-up">Sign Up</a>
                </div>
            </form>
            
            <p class="alternative-signin">or sign in with</p>
            <div class="social-icons">
                <a class="social-icon" onClick={handleGoogleLogin}>Google</a>
                <a class="social-icon" onClick={handleFacebookLogin}>Facebook</a>
                <a class="social-icon" onClick={handleTwitterLogin}>Twitter</a>
            </div>
        </div>
    </div>
    
    );
}

export default Login;