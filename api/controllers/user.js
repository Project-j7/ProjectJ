const User = require('../models/user');
const {setToken, validateToken} = require('../services/auth');
const GoogleUser = require('../models/googleuser');

async function handleLogin(req, res) {
    const { username, password } = req.body;
    // Use 'findOne' to get a single user instead of 'find', which returns an array
    const user = await User.findOne({
        username: username,
        
        password: password
    });
    
    console.log(user);
    
    if (!user) {
            return res.json({
            msg: "Invalid credentials",
            authenticatedUser: "False"
        });
    }

    const token = setToken(user);
    res.cookie("token", token);
    res.user = user;

    return res.json({
        msg: "success",
        authenticatedUser: "True"
    });
}


async function handleSignUp(req, res){
    const {username, email, password } = req.body;
    const user = await User.findOne({
        username: username,
        email: email
    });

    if(user) return res.json({
        msg: "User already exists."
    });

    User.create({
        username: username,
        email:email,
        password: password
    });

    return res.json({
        msg:"sucessfully signed up.",
    });
}

function getUserDetails(req, res){
    const token = req.cookies.token;
    const user = validateToken(token);

    console.log(user);
    
    return res.json(user);
}

async function saveGoogleUser(req, res){
    const username = req.body.username;
    const email = req.body.email;
    console.log(username);
    console.log(email); 
    console.log("User with Google info requested.");

    const user = await GoogleUser.findOne({
        username: username,
        email: email
    });
    console.log(user);

    if(user){
        return res.json({msg: "User Google Info already exists."});
    }

    GoogleUser.create({
        username: username,
        email: email
    });

    return res.json({msg: "Succesfully stored use in database."});
}

module.exports= {
    handleLogin,
    handleSignUp,
    getUserDetails,
    saveGoogleUser
}