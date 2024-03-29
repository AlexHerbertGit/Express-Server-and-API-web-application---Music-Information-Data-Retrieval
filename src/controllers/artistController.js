const Artist = require('../models/artist');

//Get all artists from local db.json file
exports.getAllArtists = (req, res) => {
    try {
        const artists = Artist.findAll();
        res.json(artists);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Get a specific artist by ID
exports.getArtistByName = (req, res) => {
    try {
        const artist = Artist.findByName(req.params.strArtist)
        if (!artist.length) {
            return res.status(404).send("Artist not found");
        }
        res.json(artists);
    } catch (error) {
        res.status(500).send(error.message);
    }
};