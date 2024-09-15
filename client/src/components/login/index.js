import React from "react"
import "./style.css"

function handleLogin(event){
    event.preventDefault();
    
    const username= document.querySelector("#login-field-username").value;
    const password= document.querySelector("#login-field-password").value;

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
            alert(msg.msg);  // Display the message returned by the server
    })
    .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
    });
    
}

function Login(){
    return(
        <div id="login">
            <h3>LOGO</h3>
            <form id="login-form" onSubmit={handleLogin}>
                
                <div className="login-input-fields">
                    <input id="login-field-username" className="login-input-field" type="text" name="username" placeholder="Username or E-mail"/>
                </div>
                
                <div className="login-input-fields">
                    <input id="login-field-password" className="login-input-field" type="text" name="password" placeholder="Password"/>
                </div>
                <div>
                    <h3>Captcha</h3>
                </div>
                <div className="login-input-fields">
                    <input id="login-field-login" className="login-input-field" type="submit" value="Login"/>
                </div>
                <div className="login-input-fields">
                    <span id="forgot-password"><a>Forgot Password?</a></span>
                    <span><a> Sign Up</a></span>
                </div>

                <div className="login-input-fields">
                    <p>or you can sign in with</p>
                    <div>
                        <h3>Icons</h3>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default Login;