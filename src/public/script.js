//script.js

let currentPlaylistName = null; // Global variable to keep track of the currently loaded playlist
//Event Listeners
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('searchBtn').addEventListener('click', function() {
        const artistName = document.getElementById('searchInput').value;
        fetch(`http://localhost:3000/api/artists/${artistName}`) // URL to API end point.
            .then(response => response.json())
            .then(data => displayResults(data))
            .catch(error => console.error('Error fetching data:', error));
    });

    document.getElementById('playlistSearchBtn').addEventListener('click', function() {
        const playlistName = document.getElementById('playlistSearchInput').value;
        loadPlaylistByName(playlistName); // Function to load and display the playlist by name
    });

    document.getElementById('savePlaylistBtn').addEventListener('click', savePlaylist);

    document.getElementById('updatePlaylistBtn').addEventListener('click', saveOrUpdatePlaylist);
});


//Diplays Results Function
function displayResults(artists) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    artists.forEach(artist => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${artist.strArtist}</h3>
            <p>Label: ${artist.strLabel}</p>
            <p>Genre: ${artist.strGenre}</p>
            <p>Formed Year: ${artist.intFormedYear}</p>
            <p>${artist.strBiographyEN}</p>
            <button class="addBtn">Add to Playlist</button>
        `;
        card.querySelector('.addBtn').addEventListener('click', () => addToPlaylist(artist));
        resultsDiv.appendChild(card);
    });
}

//Add to playlist function
function addToPlaylist(artist) {
    if (currentPlaylistName) {
        addArtistToCurrentPlaylist(artist);
    } else {
        const playlistDiv = document.getElementById('playlist');
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.artistName = artist.strArtist;
        card.dataset.label = artist.strLabel;
        card.dataset.genre = artist.strGenre;
        card.dataset.formedYear = artist.intFormedYear;
        card.dataset.biographyEN = artist.strBiographyEN;
        
        card.innerHTML = `
            <h3>${artist.strArtist}</h3>
            <p>Label: ${artist.strLabel}</p>
            <p>Genre: ${artist.strGenre}</p>
            <p>Formed Year: ${artist.intFormedYear}</p>
            <p>${artist.strBiographyEN}</p>
            <button class="removeBtn">Remove</button>
        `;
        
        card.querySelector('.removeBtn').addEventListener('click', function() {
            playlistDiv.removeChild(card);
        });
        playlistDiv.appendChild(card);
    }
};

//Function to add a searched artists to current playlist.
function addArtistToCurrentPlaylist(artist) {
    const playlistCard = document.querySelector(`[data-playlist-name="${currentPlaylistName}"]`);
    if (!playlistCard) {
        console.error("No playlist is currently loaded.");
        return;
    }

    const artistDiv = document.createElement('div');
    artistDiv.className = 'card';
    artistDiv.dataset.artistName = artist.strArtist;
    artistDiv.dataset.label = artist.strLabel;
    artistDiv.dataset.genre = artist.strGenre;
    artistDiv.dataset.formedYear = artist.intFormedYear;
    artistDiv.dataset.biographyEN = artist.strBiographyEN;

    artistDiv.innerHTML = `
        <h4>${artist.strArtist}</h4>
        <p>Label: ${artist.strLabel}</p>
        <p>Genre: ${artist.strGenre}</p>
        <p>Formed Year: ${artist.intFormedYear}</p>
        <p>${artist.strBiographyEN}</p>
        <button class="removeArtistBtn">Remove</button>
    `;
    artistDiv.querySelector('.removeArtistBtn').addEventListener('click', function() {
        artistDiv.remove();
    });

    playlistCard.appendChild(artistDiv);
}

//Save playlist to database function
function savePlaylist() {
    const playlistName = prompt("Please enter the name of your playlist:");
    if (!playlistName) {
        alert("Playlist name is required to save your playlist.");
        return;
    }

    const playlistCards = document.querySelectorAll('#playlist .card');
    const playlistArtists = Array.from(playlistCards).map(card => ({
        strArtist: card.dataset.artistName,
        strLabel: card.dataset.label,
        strGenre: card.dataset.genre,
        intFormedYear: card.dataset.formedYear,
        strBiographyEN: card.dataset.biographyEN
    }));

    const playlistData = {
        name: playlistName,
        artists: playlistArtists
    };

    fetch('http://localhost:3000/api/playlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlistData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Playlist saved:', data);
        alert('Playlist saved successfully.');
    })
    .catch(error => {
        console.error('Error saving playlist:', error);
        alert('Failed to save the playlist.');
    });
}

//Function that saves or updates the playlist based on currentPlaylist.
function saveOrUpdatePlaylist() {
    if (currentPlaylistName) {
        updatePlaylist(document.querySelector(`[data-playlist-name="${currentPlaylistName}"]`));
    } else {
        savePlaylist(); // This might never be called as "Update Playlist" implies an existing playlist
    }
}

//Load playlists from database function
function loadPlaylistByName(playlistName) {
    const encodedName = encodeURIComponent(playlistName);
    fetch(`http://localhost:3000/api/playlists/${encodedName}`)
        .then(response => response.json())
        .then(playlist => {
            displayPlaylistResults([playlist]);
        })
        .catch(error => console.error('Error loading playlist:', error));
}


//Display playist search results
function displayPlaylistResults(playlists) {
    const resultsDiv = document.getElementById('playlistResults');
    resultsDiv.innerHTML = '';
    playlists.forEach(playlist => {
        currentPlaylistName = playlist.name; // Update the global variable when a playlist is loaded
        const card = document.createElement('div');
        card.className = 'playlist-card';
        card.dataset.playlistName = playlist.name; // Store the playlist name for later
        card.innerHTML = `<h3>${playlist.name}</h3>`;
        
        playlist.artists.forEach((artist, index) => {
            const artistDiv = document.createElement('div');
            artistDiv.className = 'card';
            artistDiv.dataset.artistIndex = index; // Store index for identification
            artistDiv.innerHTML = `
                <h4>${artist.strArtist}</h4>
                <p>Label: ${artist.strLabel}</p>
                <p>Genre: ${artist.strGenre}</p>
                <p>Formed Year: ${artist.intFormedYear}</p>
                <p>${artist.strBiographyEN}</p>
                <button class="removeArtistBtn">Remove</button>
            `;
            artistDiv.querySelector('.removeArtistBtn').addEventListener('click', function() {
                artistDiv.remove(); // Remove the artist card from the DOM
            });
            card.appendChild(artistDiv);
        });
        // Add the "Delete Playlist" button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete Playlist';
        deleteBtn.addEventListener('click', () => deletePlaylist(playlist.name));
        card.appendChild(deleteBtn);

        resultsDiv.appendChild(card);
    });
}


//Update playlist function.
function updatePlaylist(playlistCard) {
    const playlistName = playlistCard.dataset.playlistName; // Retrieve the playlist name
    const artistCards = playlistCard.querySelectorAll('.card');
    const updatedArtists = Array.from(artistCards).map(card => ({
        strArtist: card.querySelector('h4').innerText,
        strLabel: card.querySelector('p:nth-child(2)').innerText,
        strGenre: card.querySelector('p:nth-child(3)').innerText,
        intFormedYear: card.querySelector('p:nth-child(4)').innerText,
        strBiographyEN: card.querySelector('p:nth-child(5)').innerText,
    }));

    const playlistData = {
        name: playlistName,
        artists: updatedArtists
    };

    fetch(`http://localhost:3000/api/playlists/${encodeURIComponent(playlistName)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlistData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Playlist updated:', data);
        alert('Playlist updated successfully.');
    })
    .catch(error => {
        console.error('Error updating playlist:', error);
        alert('Failed to update the playlist.');
    });
}

//Function to remove/delete a playlist
function deletePlaylist(playlistName) {
    if (!confirm(`Are you sure you want to delete the playlist "${playlistName}"?`)) {
        return; // User canceled the operation
    }

    fetch(`http://localhost:3000/api/playlists/${encodeURIComponent(playlistName)}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete the playlist');
        }
        return response.json();
    })
    .then(data => {
        console.log('Playlist deleted:', data);
        alert('Playlist deleted successfully.');
        // Optionally, refresh the list of playlists or clear the display
        document.getElementById('playlistResults').innerHTML = '';
        currentPlaylistName = null; // Reset the currentPlaylistName
    })
    .catch(error => {
        console.error('Error deleting playlist:', error);
        alert('Failed to delete the playlist.');
    });
}