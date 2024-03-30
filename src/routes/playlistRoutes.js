// playlistRoutes.js

// Initialize variables
const express = require('express');
const router = express.Router();

// Controller variables
const playlistController = require('../controllers/playlistController');

// POST route for creating a new playlist
router.post('/', playlistController.createPlaylist);

// GET route for retrieving playlists from database
router.get('/:playlistName', playlistController.getPlaylistByName);

// PUT route for modifying playlists and saving to database
router.put('/:playlistName', playlistController.updatePlaylistByName); 

// DELETE route for deleting playlists
router.delete('/:playlistName', playlistController.deletePlaylistByName); 

// Additional Routes go here

module.exports = router;