//artistController.js
const Artist = require('../models/artist');

// Get all artists from local db.json file
exports.getAllArtists = (req, res) => {
    try {
        const artists = Artist.findAll();
        res.json(artists);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get a specific artist by name
exports.getArtistByName = (req, res) => {
    try {
        const artists = Artist.findByName(req.params.strArtist); 
        if (!artists.length) {
            return res.status(404).send("Artist not found");
        }
        res.json(artists); 
    } catch (error) {
        res.status(500).send(error.message);
    }
};