const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.getAllUser);

// specific user routes
router.get('/:userId', usersController.getUser);

router.delete('/:userId', usersController.deleteUser);

router.put('/:userId', usersController.updateUser);

module.exports = router;
