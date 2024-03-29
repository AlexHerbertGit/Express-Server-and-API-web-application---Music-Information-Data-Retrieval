//artistRoutes.js
//Route variables
const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

// Define routes
router.get('/artists', artistController.getAllArtists); // Corrected to getAllArtists
router.get('/artists/:strArtist', artistController.getArtistByName);

// Module Export
module.exports = router;