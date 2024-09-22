const express = require('express');
const bcrypt = require('bcrypt'); // For hashing passwords
const User = require('./userModel'); // User model

const router = express.Router();

// User login endpoint
router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: "Invalid Email or Password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: "Invalid Email or Password"});
        }

        res.json({msg: "User validation Success."});
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({error: "Internal server error"});
    }
});

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
        res.status(201).json({msg: `Successfully added ${username}`});
    } catch (error) {
        console.error("Error during signup:", error.message);
        res.status(500).json({error: "Internal server error"});
    }
});

module.exports = router;
