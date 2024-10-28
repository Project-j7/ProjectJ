const express = require('express');
const {sendImages, handleFabricate, handleLikeImage, handlePinImage} = require('../controllers/dashboard');

const router = express.Router();

router.post('/fabricate', handleFabricate);
router.get('/getimages', sendImages);
router.patch('/like', handleLikeImage);
router.patch('/pin', handlePinImage);

module.exports = router;