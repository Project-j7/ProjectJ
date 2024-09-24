const express = require('express');
const bcrypt = require('bcrypt'); // For hashing passwords
const User = require('./userModel'); // User model

const router = express.Router();

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
    } catch (error) {
        console.error("Error during signup:", error.message);
        return res.status(500).json({error: "Internal server error"});
    }
});

// User login endpoint
router.post("/login", async (req, res) => {
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

        // If passwords match, respond with success
        return res.status(200).json({msg: "Login successful."});
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({error: "Internal server error"});
    }
});

module.exports = router;
