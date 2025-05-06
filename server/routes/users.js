const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validateID = require("../middleware/validateID");
const {body, validationResult} = require("express-validator");

/* GET users listing. */
router.get('/', usersController.getAllUser);

// specific user routes
router.get('/:userID', validateID, usersController.getUser);

router.delete('/:userID', validateID, usersController.deleteUser);

router.put('/:userID', validateID, usersController.updateUser);

module.exports = router;
