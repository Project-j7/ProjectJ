const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const session = require("express-session");

// Initialize Express app
const PORT = process.env.PORT || 8001;
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors({
    origin: ["http://localhost:5000","http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type',"Cookie"],
    credentials:true,
}));

// MongoDB's connection string
const MONGO_URI = "mongodb+srv://projectj_jewellery:jewellery07@project-jewellery.fy10i.mongodb.net/?retryWrites=true&w=majority&appName=Project-Jewellery";
 
// Connect to MongoDB Atlas database
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connection to Database Established."))
    .catch((err) => {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    });

app.use(session({
    secret: 'your-secret-key', // Use a secure secret key
    resave: false,
    saveUninitialized: false,
    
    cookie:{
        maxAge:60000,
        SameSite: "None", // Necessary for cross-origin requests
        secure: false,
    }
}));

// Importing Routes
const userRoutes = require('./user');

// Mount user routes
app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
