const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./userModel');
const router = express.Router();

// Middleware to check if a user is authenticated before accessing certain routes
function isAuthorized(req, res, next) {
    if (req.session.isAuthenticated) {
        return next(); // If authenticated, proceed to the next middleware
    } else {
        res.redirect("/"); // If not authenticated, redirect to homepage or login page
    }
}

// User signup endpoint
router.post("/signup", async (req, res) => {
    const {username, email, password} = req.body;

    try {
        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({$or: [{email}, {username}]});
        if (existingUser) {
            return res.status(400).json({error: "Username or Email already exists."}); // Return error if user exists
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const userEntry = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await userEntry.save();

        // Respond with a success message
        return res.status(201).json({msg: `Successfully added ${username}`});
    } catch (error) {
        console.error("Error during signup:", error.message); // Log any errors
        return res.status(500).json({error: "Internal server error"}); // Return a server error
    }
});

// User login endpoint
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    try {
        // Check if the user exists by username
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({error: "Invalid Username or Password"}); // Return error if user doesn't exist
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: "Invalid Username or Password"}); // Return error if passwords don't match
        }

        // Store user info in the session
        req.session.username = username;
        req.session.userId = user._id;
        req.session.isAuthenticated = true;

        console.log("req.id", req.session.userId); // Log user ID
        console.log("req.session: ", req.session); // Log session details

        // Respond with a success message and user details
        return res.status(200).json({
            msg: "Login successful.",
            user: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error during login:", error.message); // Log any errors
        return res.status(500).json({error: "Internal server error"}); // Return a server error
    }
});

// Main endpoint accessible only to logged-in users
router.post("/main", isAuthorized, (req, res) => {
    console.log("Main"); // Log access to main route
    return res.status(200).json({
        msg: "Good user to login.",
        username: req.session.username // Return the username from the session
    });
});

// User logout endpoint
router.post("/logout", isAuthorized, (req, res) => {

    console.log(req.msg); // Log request message
    console.log("req.session: logout:", req.session); // Log session details during logout

    if (req.session.username) {
        // Destroy the session if the user is logged in
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({error: "Failed to logout."}); // Return error if logout fails
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            console.log("session after logout: ", req.session); // Log session after logout
            return res.status(200).json({msg: "Logout successful."}); // Return a success message
        });
    } else {
        console.log("No user logged in."); // Log if no user is logged in
        return res.status(400).json({msg: "No user to log out."}); // Return error if no user is logged in
    }
});

module.exports = router; // Export the router for use in other files
