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
        card.innerHTML = `<h3>${artist.strArtist}</h3>
                          <p>Label: ${artist.strLabel}</p>
                          <p>Genre: ${artist.strGenre}</p>
                          <p>Formed Year: ${artist.intFormedYear}</p>
                          <p>${artist.strBiographyEN}</p>`;
        resultsDiv.appendChild(card);
    });
}