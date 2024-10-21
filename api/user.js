const express = require('express');
const bcrypt = require('bcrypt'); // For hashing passwords
const User = require('./models/user'); // User model
const router = express.Router();

function isAuthorized(req, res, next) {
    if (req.session.isAuthenticated) {
        return next(); // Proceed to the next middleware/route handler
    } else {
        console.log("Unauthorized access attempt.");
    
    }
}

// User signup endpoint
router.post("/signup", async (req, res) => {
    const {username, email, password} = req.body;

    try {
        // Check if user already exists by email or username
        const existingUser = await User.findOne({$or: [{email}, {username}]});
        if (existingUser) {
            return res.status(400).json({error: "Username or Email already exists."});
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user entry
        const userEntry = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await userEntry.save();

        // Respond with success
        return res.status(201).json({msg: `Successfully added ${username}`});
    } 
    catch (error) {
        console.error("Error during signup:", error.message);
        return res.status(500).json({error: "Internal server error"});
    }
});

// User login endpoint
router.post("/login",async (req, res) => {
    const {username, password} = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({error: "Invalid Username or Password"});
        }

        // Compare password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: "Invalid Username or Password"});
        }

        req.session.username = username;
        req.session.userId = user._id;
        req.session.isAuthenticated = true;

        console.log("req.id",req.session.userId);
        console.log("req.session: ",req.session);
        
        // If passwords match, respond with success
        return res.status(200).json({msg: "Login successful."});
    }
    catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({error: "Internal server error"});
    }
});

router.post("/main",isAuthorized,(req,res)=>{
    return res.status(200).json({msg:"Good user to login."});
});

router.post("/logout",isAuthorized,(req, res) => {

    console.log(req.msg);
    console.log("req.session: logout:", req.session);
    
    if (req.session.username) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to logout." });
            }
            res.clearCookie('connect.sid'); // Clear session cookie if needed
            console.log("session after logout: ",req.session);
            return res.status(200).json({ msg: "Logout successful." });
        });
    } 

    else {
        console.log("No user logged in.");
        return res.status(400).json({ msg: "No user to log out." });
    }
});



module.exports = router;
