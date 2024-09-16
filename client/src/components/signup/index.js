import React from "react";
import "./style.css";


function Signup() {

    function handleSignup(event){
        event.preventDefault();

        const username= document.querySelector("#signup-field-username").value;
        const password= document.querySelector("#signup-field-password").value;
        const confirmPassword= document.querySelector("#signup-field-confirm-password").value;  
        const email= document.querySelector("#signup-field-email").value;
        
        console.log(username, password, confirmPassword, email)
    
        if(confirmPassword === password){
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
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
        else{
            alert("The passwords you entered do not match.");
        }
    
    }

    
    return (
        <div>
            <div className="form-box">
                <div className="logo-box">
                    <img src="" alt="malla chuduvuley"className="logo"/>
                    <h1 className="brand-name">jai mumyyyyy</h1>
                </div>
                <form className="signup-form" onSubmit={handleSignup}>
                    <input type="text" id="signup-field-username" className="input-field" placeholder="Username" required/>
                    <input type="password" id="signup-field-password" className="input-field" placeholder="Password" required/>
                    <input type="password" id="signup-field-confirm-password" className="input-field" placeholder="Confirm password" required/>
                    <input type="email" id="signup-field-email" className="input-field" placeholder="E-mail address" required/>
                    <div className="captcha-box">
                        <img src="" alt="Captcha" className="captcha"/>
                    </div>
                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
                <p className="have-account">Have an account? <a href="/account/login" className="signin-link">Sign In</a></p>
                <p className="sign-in-options">or you can sign in with</p>
                <div>
                    <a href="#" className="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16"><path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/></svg></a>
                    <a href="#" className="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg></a>
                    <a href="#" className="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg></a>
                    <a href="#" className="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/></svg></a>
                </div>
            </div>
        </div>
    );
}

export default Signup;