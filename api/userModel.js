const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: false,
        default: null,
    },
    imagePairs: [{
        artImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'fs.files', // Reference to GridFS collection
            required: true,
        },
        realImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'fs.files', // Reference to GridFS collection
            required: true,
        }
    }],
    pairCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

// Export the user model
module.exports = mongoose.model('test_user', userSchema);
