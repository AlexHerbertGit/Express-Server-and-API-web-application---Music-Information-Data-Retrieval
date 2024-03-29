//Import variable using dbUtils export modules

const { readDbFile, writeDbFile } = require('./dbUtils');

const findAll = () => {
    const db = readDbFile()
    return db.artists
};

const findByName = (strArtist) => {
    const db = readDbFile();
    return db.artists.filter(artist => artist.strArtist.toLowerCase().includes(strArtist.toLowerCase()));
};

//Add more functions here for creating, updating, and removing artists.


//Module export functions
module.exports = { findAll, findByName };