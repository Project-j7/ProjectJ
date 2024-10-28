const Image = require('../models/image'); 
const multer = require('multer');
const path = require('path');
const User = require('../models/user');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './UserUploads'); 
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage }).single('file');

function handleFabricate(req, res) {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error uploading the file' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log('Uploaded file:', req.file);
        
        let file;
        let userData;

        if (req.body.user) {
            try {
                userData = JSON.parse(req.body.user); // Parse the user data sent as a JSON string
                file = req.file;
                console.log('User data:', userData);
            } catch (err) {
                console.error('Error parsing user data:', err);
                return res.status(400).json({ error: 'Invalid user data' });
            }
        } else {
            return res.status(400).json({ error: 'User data is missing' });
        }

        const newImage = new Image({
            user: userData._id,
            uploaded_image_path: file.path, 
        });

        newImage.save()
            .then(() => {
                return res.json({ 
                    msg: "Successfully received and stored image", 
                    file: req.file 
                });
            })
            .catch((error) => {
                console.error('Error saving image to the database:', error);
                return res.status(500).json({ error: 'Error saving image metadata' });
            });
    });
}


async function sendImages(req, res) {
    try {
        const username = JSON.parse(req.headers['user-info']).username;
        console.log("Username from header:", username);

        // Find the user based on the provided username
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Fetch images associated with the user
        const images = await Image.find({ user: user._id });

        // Return images in the response
        return res.json({
            msg: "User images retrieved successfully",
            images: images
        });
    } catch (error) {
        console.error("Error retrieving images:", error);
        return res.status(500).json({ error: "Server error while retrieving images" });
    }
}

async function handleLikeImage(req, res){
    try {
        const { imageId } = req.body;
        console.log("recevied on liked Image.");
        // Find the image by ID and toggle the `liked` field
        const image = await Image.findById(imageId);
        if (!image) return res.status(404).json({ msg: "Image not found" });

        image.favourite = !image.favourite;
        await image.save();

        res.json({ msg: "Image like status updated", favourite: image.favourite });
    } catch (error) {
        console.error("Error updating like status:", error);
        res.status(500).json({ error: "Server error while updating like status" });
    }
}

async function handlePinImage(req, res){
    try {
        const { imageId } = req.body;

        // Find the image by ID and toggle the `pinned` field
        const image = await Image.findById(imageId);
        if (!image) return res.status(404).json({ msg: "Image not found" });

        image.pinned = !image.pinned;
        await image.save();

        res.json({ msg: "Image pin status updated", pinned: image.pinned });
    } catch (error) {
        console.error("Error updating pin status:", error);
        res.status(500).json({ error: "Server error while updating pin status" });
    }
}

module.exports = {
    handleFabricate,
    sendImages,
    handleLikeImage,
    handlePinImage
};