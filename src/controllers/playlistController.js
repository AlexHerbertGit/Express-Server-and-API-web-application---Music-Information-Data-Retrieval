//playlistController.js

//Initialize Variables
const db = require('../services/firebaseConfig');

//Function to create a playlist and add it to the database.
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

//Function that gets a specific playlist from the database.
exports.getPlaylistByName = async (req, res) => {
    const { playlistName } = req.params

    try {
        const playlistSnapshot = await db.collection('playlists').where('name', '==', playlistName).get()

        if (playlistSnapshot.empty) {
            return res.status(404).send("Playlist not found!")
        }

        //Select the top match for the search request
        const playlistData = playlistSnapshot.docs[0].data()
        res.json({ id: playlistSnapshot.docs[0].id, ...playlistData })
    } catch (error) {
        console.error('Error fetching playlist by name:', error)
        res.status(500).send('Internal Server Error')
    }
};

//Update playlist function 
exports.updatePlaylistByName = async (req, res) => {
    const { playlistName } = req.params
    const updatedData = req.body; //Updated playlist data from frontend.

    try {
        const playlistRef = db.collection('playlists').where('name', '==', playlistName)
        const snapshot = await playlistRef.get();

        if (snapshot.empty) {
            return res.status(404).send("Playlist not found");
        }

        const doc = snapshot.docs[0];
        await doc.ref.update(updatedData)

        res.json({ msg: "Playlist Updated", id: doc.id });
    } catch (error) {
        console.error("Error updating playlist:", error)
        res.status(500).send("Internal Server Error")
    }
};

//Delete playlist by name function
exports.deletePlaylistByName = async (req, res) => {
    const { playlistName } = req.params;
    try {
        const playlistsRef = db.collection('playlists');
        const snapshot = await playlistsRef.where('name', '==', playlistName).get();

        if (snapshot.empty) {
            return res.status(404).send({ message: 'Playlist not found' });
        }

        // delete all matches (should typically be just one)
        snapshot.forEach(doc => doc.ref.delete());

        res.json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        console.error('Error deleting playlist:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};