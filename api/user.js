const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./userModel");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const router = express.Router();

// Enable file upload
router.use(fileUpload({
    createParentPath: true, // Automatically create parent directories if they don't exist
}));

// Middleware to check if a user is authenticated before accessing certain routes
function isAuthorized(req, res, next) {
    if (req.session.isAuthenticated) {
        return next(); // If authenticated, proceed to the next middleware
    } else {
        res.status(401).json({error: "Unauthorized"}); // If not authenticated, return error
    }
}


router.get("/check",(req,res)=>{
    try{
        if(req.session.username){
            return res.status(200).json({user:{username:req.session.username}});
        }
    }catch(error){
        return res.status(404).json({Error:error})
    }
})


// User signup endpoint
router.post("/signup", async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const existingUser = await User.findOne({$or: [{email}, {username}]});
        if (existingUser) {
            return res.status(400).json({error: "Username or Email already exists."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userEntry = new User({
            username,
            email,
            password: hashedPassword,
        });

        await userEntry.save();
        return res.status(201).json({msg: `Successfully added ${username}`});
    } catch (error) {
        console.error("Error during signup:", error.message);
        return res.status(500).json({error: "Internal server error"});
    }
});

// User login endpoint
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({error: "Invalid Username or Password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: "Invalid Username or Password"});
        }

        req.session.username = username;
        req.session.userId = user._id;
        req.session.isAuthenticated = true;

        return res.status(200).json({
            msg: "Login successful.",
            user: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({error: "Internal server error"});
    }
});

// Main endpoint accessible only to logged-in users
router.post("/main", isAuthorized, (req, res) => {
    return res.status(200).json({
        msg: "Good user to login.",
        username: req.session.username,
    });
});

// User logout endpoint
router.post("/logout", isAuthorized, (req, res) => {
    if (req.session.username) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({error: "Failed to logout."});
            }
            res.clearCookie("connect.sid");
            return res.status(200).json({msg: "Logout successful."});
        });
    } else {
        return res.status(400).json({msg: "No user to log out."});
    }
});

module.exports = router;