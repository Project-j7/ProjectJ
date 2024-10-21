const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//local imports
const {MONGO_URL} = require('./config.js');
const staticRoutes = require('./routes/static.js');
const userRoutes = require('./routes/user.js');

mongoose.connect(MONGO_URL)
.then(()=> console.log("Successfully Established connection to DataBase."))
.catch((error) => console.log(error));

const app = express();
const PORT = 8000;

// middleware
app.use(cors({
    origin: ["http://localhost:8000","http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type',"Cookie"],
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser());


//API routes
app.use('/', staticRoutes);
app.use('/user', userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT: ${PORT}.`);
});