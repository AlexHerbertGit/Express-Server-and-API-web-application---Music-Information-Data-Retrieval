//script.js
document.getElementById('searchBtn').addEventListener('click', function() {
    const artistName = document.getElementById('searchInput').value;
    fetch(`http://localhost:3000/api/artists/${artistName}`) // URL to API end point.
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error fetching data:', error));
});

function displayResults(artists) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
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

        // Add event listener to the Add button
        card.querySelector('.addBtn').addEventListener('click', () => addToPlaylist(artist));

        resultsDiv.appendChild(card);
    });
}

// Function to handle adding an artist to the playlist
function addToPlaylist(artist) {
    const playlistDiv = document.getElementById('playlist');
    
    // Create the playlist card
    const card = document.createElement('div');
    card.className = 'card';

    //Store artist data in variables used for saving the playlist.
    card.dataset.artistName = artist.strArtist;
    card.dataset.label = artist.strLabel;
    card.dataset.genre = artist.strGenre;
    card.dataset.formedYear = artist.intFormedYear;
    card.dataset.biographyEN = artist.strBiographyEN;
    
    //Card for displaying the artists info in playlist section.
    card.innerHTML = `
        <h3>${artist.strArtist}</h3>
        <p>Label: ${artist.strLabel}</p>
        <p>Genre: ${artist.strGenre}</p>
        <p>Formed Year: ${artist.intFormedYear}</p>
        <p>${artist.strBiographyEN}</p>
        <button class="removeBtn">Remove</button>
    `;
    
    // Add event listener to the Remove button
    card.querySelector('.removeBtn').addEventListener('click', function() {
        playlistDiv.removeChild(card);
    });

    playlistDiv.appendChild(card);
}

//Function to create playlist and save it to backend.
document.getElementById('savePlaylistBtn').addEventListener('click', function savePlaylist() {
    const playlistName = prompt("Please enter the name of your playlist:");// Prompts user to enter name for the playlist.
    if (!playlistName) {
        alert("Playlist name is required to save your playlist.");
        return; // Exit if no name is provided
    }

    const playlistCards = document.querySelectorAll('#playlist .card');
    const playlistArtists = Array.from(playlistCards).map(card => {
        return {
            strArtist: card.dataset.artistName,
            strLabel: card.dataset.label,
            strGenre: card.dataset.genre,
            intFormedYear: card.dataset.formedYear,
            strBiographyEN: card.dataset.biographyEN
        };
    });

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
    .then(data => console.log('Playlist saved:', data))
    .catch(error => console.error('Error saving playlist:', error));
});

