import React from "react";
import "./style.css";
import backgroundImage from "../../assets/background.jpeg";

function Signup() {

    function handleSignup(event) {
        event.preventDefault();

        const username = document.querySelector("#signup-field-username").value;
        const password = document.querySelector("#signup-field-password").value;
        const confirmPassword = document.querySelector("#signup-field-confirm-password").value;
        const email = document.querySelector("#signup-field-email").value;

        console.log(username, password, confirmPassword, email)

        if (confirmPassword === password) {
            fetch('http://localhost:8001/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
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
                    alert(msg.msg);  // Display the message returned by the server
                    window.location.href = '/account/login'; // To redirect to login page after successful sign in
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else {
            alert("The passwords you entered do not match.");
        }

    }

    return (
        <div className="container" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="form-box">
                <div className="logo-box">
                    <h1 className="brand-name">Sign Up</h1>
                </div>
                <form className="signup-form" onSubmit={handleSignup}>
                    <input type="text" id="signup-field-username" className="input-field" placeholder="Username"
                           required/>
                    <input type="email" id="signup-field-email" className="input-field" placeholder="E-mail address"
                           required/>
                    <input type="password" id="signup-field-password" className="input-field" placeholder="Password"
                           required/>
                    <input type="password" id="signup-field-confirm-password" className="input-field"
                           placeholder="Confirm password" required/>

                    <div className="captcha-box">
                    </div>
                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
                <p className="have-account">Have an account? <a href="/account/login" className="signin-link">Login</a>
                </p>
                <p className="sign-in-options">or you can sign in with</p>
                <div>
                    <a id="social-icon-google" href="#" className="social-icon" onClick={null}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-google" viewBox="0 0 16 16">
                            <path
                                d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Signup;
