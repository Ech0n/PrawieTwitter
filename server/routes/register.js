const express = require('express');
const router = express.Router();
const validateRegister = require("../middleware/validateRegister");

const registerController = require('../controllers/registerController');

router.post('/', validateRegister, registerController.register);

module.exports = router;