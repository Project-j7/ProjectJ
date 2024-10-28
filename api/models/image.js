const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refs:"users"
    },
    uploaded_image_path: {
        type: String,
        required: true
    },
    generated_image_path:{
        type: String,
        default: null
    },
    pinned:{
        type: Boolean,
        default: false 
    },
    favourite:{
        type: Boolean,
        default: false
    },
}, {timestamps:true});

const Image = mongoose.model('image', imageSchema);

module.exports = Image;