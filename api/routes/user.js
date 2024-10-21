const express = require('express');
const {getUserDetails, saveGoogleUser} = require('../controllers/user');
const router = express.Router();

router.get('/', getUserDetails);
router.post('/google', saveGoogleUser);
module.exports = router; 