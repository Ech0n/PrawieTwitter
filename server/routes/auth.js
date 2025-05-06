const express = require('express');
const authController = require("../controllers/authController");
const { body, validationResult } = require('express-validator');
const router = express.Router();

const validateEmail = [
    body('email').isEmail().withMessage('Invalid email format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        next();
    }
];

router.post("/login", validateEmail, authController.login);

router.post("/logout", authController.logout);

module.exports = router;