import React from "react"
import "./style.css"


function Signup() {
    return (
        <div id="signup">
            <div >
                <h1 className="logo">Logo</h1>
                <h3 className="logo">ProjectJ</h3>
            </div>
            <form id="signup-form">
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

            <div className="signup-input-fields  ">
                <h3>captcha</h3>
                    <div id="g-recaptcha" data-sitekey = "6LcCHzcqAAAAAAez5cUpVSSXDXubtlvwQM5zgAlb"></div>
            </div>

            <div className="signup-input-fields  ">
                    <input id="signup-field-submit" className="signup-input-field" type="submit" value="Sign up" />
            </div>
            <div>
                <div className="acc_signin">
                {/* <p>Have an account? </p><a>Sign In</a> */}
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