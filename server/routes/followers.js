const express = require('express');
const followersController = require("../controllers/followersController");
const router = express.Router();
const validateUserId = require('../middleware/validateID');

// Zwraca followersów użytkownika o podanym id
router.get('/:userID', validateUserId, followersController.getUserFollowers);

// Zwraca osoby obserwowane przez uzytownika o podanym id
router.get('/following/:userID', validateUserId, followersController.getUserFollowing);

// Obserwuj osobe o podanym id
router.post('/:userID', validateUserId,  followersController.createFollow);

// Przestań obserwować osobe o podanym id
router.delete('/:userID', validateUserId, followersController.deleteFollow);

module.exports = router;