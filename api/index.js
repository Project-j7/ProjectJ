const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt'); // For hashing passwords

// Initialize Express app
const PORT = process.env.PORT || 8001; // Set port from environment variable or default to 8001
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing) to allow public access
app.use(cors({
    origin: '*', // Allow all domains to access this API
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Headers allowed in requests
}));

// MongoDB connection string
const MONGO_URI = "mongodb+srv://projectj_jewellery:jewellery07@project-jewellery.fy10i.mongodb.net/?retryWrites=true&w=majority&appName=Project-Jewellery";

// Connect to MongoDB Atlas database
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, // Use the new URL string parser
    useUnifiedTopology: true, // Ensure MongoDB connection is reliable
})
    .then(() => console.log("Connection to Database Established."))
    .catch((err) => {
        console.error("Database connection failed:", err.message);
        process.exit(1); // Exit process if database connection fails
    });

// Define user schema and model for MongoDB
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, // Ensure usernames are unique
        required: true, // Username is required
    },
    email: {
        type: String,
        unique: true, // Ensure emails are unique
        required: true, // Email is required
    },
    password: {
        type: String,
        required: true, // Password is required
    }
}, {timestamps: true}); // Auto-generate createdAt and updatedAt timestamps

// Define MongoDB model for the 'test_user' collection
const User = mongoose.model('test_user', userSchema);

// Ensure collection creation during app startup (no-op if already exists)
User.init()
    .then(() => console.log("Collection ensured."))
    .catch(err => console.error("Error ensuring collection:", err));

// User login endpoint
app.post("/user/login", async (req, res) => {
    const {email, password} = req.body; // Destructure email and password from request body

    try {
        // Find user by email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: "Invalid Email or Password"}); // Return error if user not found
        }

        // Compare input password with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: "Invalid Email or Password"}); // Return error if passwords do not match
        }

        res.json({msg: "User validation Success."}); // Send success message on valid login
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({error: "Internal server error"}); // Handle any server errors
    }
});

// User signup endpoint
app.post("/user/signup", async (req, res) => {
    const {username, email, password} = req.body; // Destructure signup data from request body

    try {
        // Check if the username or email already exists in the database
        const existingUser = await User.findOne({$or: [{email}, {username}]});
        if (existingUser) {
            return res.status(400).json({error: "Username or Email already exists."}); // Send error if user already exists
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user document and save it to the database
        const userEntry = new User({
            username,
            email,
            password: hashedPassword, // Store the hashed password
        });

        await userEntry.save(); // Save user to MongoDB

        res.status(201).json({msg: `Successfully added ${username}`}); // Send success message on successful signup
    } catch (error) {
        console.error("Error during signup:", error.message);
        res.status(500).json({error: "Internal server error"}); // Handle server errors
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
