//playlistController.js

//Initialize Variables
const db = require('../services/firebaseConfig');

exports.createPlaylist = async (req, res) => {
    const { name, artists } = req.body
    if (!name || !artists || !Array.isArray(artists)) {
        return res.status(400).send('Invalid playlist data.')
    }
    try {
        const docRef = await db.collection('playlists').add({
            name,
            artists,
            createdAt: new Date()
        });
        res.status(201).send({ msg: "Playlist created successfully", id: docRef.id })
    } catch (error) {
        console.error("Error creating a new playlist:", error)
        res.status(500).send("Failed to create playlist")
    }
};