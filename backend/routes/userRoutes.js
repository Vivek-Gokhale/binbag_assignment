const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');
const saveProfileImages = require('../utils/saveProfileImages');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/BinBag/backend/uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueFileName = saveProfileImages(file.originalname); 
        req.body.profilePicture = uniqueFileName; 
        cb(null, uniqueFileName);
    }
});

const upload = multer({ storage });

router.post('/create', upload.single('profilePicture'), async (req, res, next) => {
    try {
        await userController.createUser(req, res, next);
    } catch (error) {
        console.error("Error:", error);
        next(error);
    }
});

router.get('/get/:email', userController.authenticateUser, userController.getUser);

router.put('/edit', upload.single('profilePicture'), userController.authenticateUser, async (req, res, next) => {
    try {
        await userController.editUser(req, res, next);
    } catch (error) {
        console.error("Error:", error);
        next(error);
    }
});

module.exports = router;
