import React from "react";
import "./style.css";


function handleSignin(event){
    event.preventDefault();
    
    const username= document.querySelector("#signup-field-username").value;
    const password= document.querySelector("#signup-field-password").value;
    const confirmPassword= document.querySelector("#signup-field-confirm-password").value;  
    const email= document.querySelector("#signup-field-email").value;

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



function Signup() {
    return (
        <div id="signup">
            
            <div >
                <h1 className="logo">Logo</h1>
                <h3 className="logo">ProjectJ</h3>
            </div>

            <form id="signup-form" onSubmit={handleSignin}>
                <div className="signup-input-fields">
                    <input  id="signup-field-username" className="signup-input-field" type="text" name="username" placeholder="Username" />
                </div>
                <div className="signup-input-fields">
                    <input id="signup-field-password" className="signup-input-field" type="password" name="password" placeholder="password" />
                </div>
                <div className="signup-input-fields">
                    <input  className="signup-input-field" id="signup-field-confirm-password" type="password" name="confirm-password" placeholder="Confirm password" />
                </div>
                <div className="signup-input-fields">
                    <input id="signup-field-email"  className="signup-input-field" type="text" name="email" placeholder="E-mail address" />
                </div>
                <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            </form>

            <div className="signup-input-fields">
                <h3>captcha</h3>
                    <div id="g-recaptcha" data-sitekey = "6LcCHzcqAAAAAAez5cUpVSSXDXubtlvwQM5zgAlb"></div>
            </div>

            <div className="signup-input-fields">
                    <input id="signup-field-submit" className="signup-input-field" type="submit" value="Sign up" />
            </div>
            <div>
                <div className="acc_signin">
                    <pre><p>Have an account?   <a>Signin</a></p></pre>
                </div>
            </div>
            <div>
                <p>or you can sign in with</p>
                <div>
                    Icons
                </div>
            </div>
            
        </div>

    )
}

export default Signup;