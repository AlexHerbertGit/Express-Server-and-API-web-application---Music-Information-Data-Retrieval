//Route variables
const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

//Define routes
router.get('/artists', artistController.getArtists);
router.get('/artists/:strArtist', artistController.getArtistByName);

//Module Export
module.exports= router;