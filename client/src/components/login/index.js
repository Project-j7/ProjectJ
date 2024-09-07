import React from "react"
import "./style.css"


function Login(){
    return(
        <div id="login">
            <form id="login-form" method="post" action="#">
                <input type="text" name="email"/>
                <input type="text" name="password"/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}


export default Login;