//playlistRoute.js

//Initialize varibles
const express = require('express');
const router = express.Router();

//Controller variables
const playlistController = require('../controllers/playlistController');

//POST route for creating a new playlist
router.post('/', playlistController.createPlaylist);

//GET rouite for retreiving playlists from database
router.get('/:playlistName', playlistController.getPlaylistByName);

//Additional Routes go here

module.exports = router;