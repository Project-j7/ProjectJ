const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },

    email:{
        type: String,
        unique: true,
        required: true
    },
    role:{
        type:String,
        required: true,
        default: 'GENERAL'
    }
}, {timestamps: true})

GoogleUser = mongoose.model("google_user" ,googleUserSchema);

module.exports = GoogleUser;