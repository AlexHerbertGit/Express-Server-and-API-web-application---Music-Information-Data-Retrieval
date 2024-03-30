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