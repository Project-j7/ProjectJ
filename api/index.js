const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

// App start
const PORT = 8001;
const app = express();

// DB connection
mongoose.connect("mongodb+srv://projectj_jewellery:Jewellery%407@project-jewellery.fy10i.mongodb.net/Project-Jewellery?retryWrites=true&w=majority&appName=Project-Jewellery")
  .then(() => console.log("Connection to Database Established."))
  .catch((err) => console.log(err));

// Define user schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        unique: true,
    }
});

const User = mongoose.model('user', userSchema);
app.use(express.json());

// CORS middleware setup
app.use(cors({
    origin: ['http://192.168.29.231:8000', 'http://192.168.145.67:8000'], // List all allowed origins here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// User login endpoint
app.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.json({ error: "Invalid Username or Password" });
    }
    return res.json({ msg: "User validation Success." });
});

// User signup endpoint
app.post("/user/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const userEntry = {
        username: username,
        email: email,
        password: password
    };

    await User.create(userEntry);
    
    return res.json({ msg: `Successfully added ${username}` });
});

// Start server
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}.`));
