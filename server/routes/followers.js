const express = require('express');
const followersController = require("../controllers/followersController");
const router = express.Router();

// Zwraca followersów użytkownika o podanym id
router.get('/:userID', followersController.getUserFollowers);

// Zwraca osoby obserwowane przez uzytownika o podanym id
router.get('/following/:userID', followersController.getUserFollowing);

// Obserwuj osobe o podanym id
router.post('/:userID', followersController.createFollow);

// Przestań obserwować osobe o podanym id
router.delete('/:userID', followersController.deleteFollow);

module.exports = router;