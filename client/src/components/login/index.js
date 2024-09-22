import React from "react"
import "./style.css"
import {account} from "../../appwrite/appwrite-config"
import {authentication} from "../../firebase/firebase-config"
import {TwitterAuthProvider, signInWithPopup, signInWithRedirect, FacebookAuthProvider} from "firebase/auth"

function Login() {

    async function handleGoogleLogin() {
        account.createOAuth2Session(
            'google',
            'http://localhost:3000',
            //url of falied login
            'http://localhost:3000/account/failed'
        );
    }

    async function handleTwitterLogin() {
        const Xprovider = new TwitterAuthProvider()
        signInWithRedirect(authentication, Xprovider)
            .then((request) => {
                    console.log(request);
                }
            )
            .catch((error) => {
                console.log(error);
            });

    }

    async function handleFacebookLogin() {
        const fbProvider = new FacebookAuthProvider();
        signInWithPopup(authentication, fbProvider)
            .then((request) => {
                    console.log(request);
                }
            )
            .catch((error) => {
                console.log(error);
            });
    }

    function handleLogin(event) {
        event.preventDefault();

        const username = document.querySelector("#login-field-username").value;
        const password = document.querySelector("#login-field-password").value;

        console.log(username, password);

        fetch('http://localhost:8001/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  // Parse JSON if the response was successful
            })
            .then(msg => {
                console.log(msg);
                // Display the message returned by the server
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    return (
        <div className="login-container">
            <div className="login-box">
                <img src="" alt="Welcome Back!" className="login-logo"/>
                <h2 className="login-title">Sign In</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <input type="text" id="login-field-username" className="input-field"
                           placeholder="Username or E-mail"/>
                    <input type="password" id="login-field-password" className="input-field" placeholder="Password"/>
                    <div className="captcha-box">
                        <img src="" alt="" className="login-logo"/>
                    </div>
                    <button type="submit" className="login-btn">Sign In</button>
                    <div className="password_signup">
                        <a href="/reset/forgotpassword" className="forgot-password">Forgot Password?</a>
                        <a href="/account/signup" className="sign-up">Sign Up</a>
                    </div>
                </form>
                <p className="alternative-signin">or you can sign in with</p>
                <div>
                    <a id="social-icon-google" href="#" className="social-icon" onClick={handleGoogleLogin}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-google" viewBox="0 0 16 16">
                            <path
                                d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                        </svg>
                    </a>
                    <a id="social-icon-facebook" href="#" className="social-icon" onClick={handleFacebookLogin}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-facebook" viewBox="0 0 16 16">
                            <path
                                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                        </svg>
                    </a>
                    <a id="social-icon-twitter" href="#" className="social-icon" onClick={handleTwitterLogin}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-twitter-x" viewBox="0 0 16 16">
                            <path
                                d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                        </svg>
                    </a></div>
            </div>
        </div>
    )
}


export default Login;