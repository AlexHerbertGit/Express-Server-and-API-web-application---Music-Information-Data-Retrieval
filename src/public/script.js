//script.js

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
});
//Diplays Results Function
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

        card.querySelector('.addBtn').addEventListener('click', () => addToPlaylist(artist));
        resultsDiv.appendChild(card);
    });
}
//Add to playlist function
function addToPlaylist(artist) {
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
    .then(data => console.log('Playlist saved:', data))
    .catch(error => console.error('Error saving playlist:', error));
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
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${playlist.name}</h3>
            ${playlist.artists.map(artist => `
                <div>
                    <h4>${artist.strArtist}</h4>
                    <p>Label: ${artist.strLabel}</p>
                    <p>Genre: ${artist.strGenre}</p>
                    <p>Formed Year: ${artist.intFormedYear}</p>
                    <p>${artist.strBiographyEN}</p>
                </div>
            `).join('')}
        `;
        resultsDiv.appendChild(card);
    });
}
