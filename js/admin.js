// js/admin.js
function loadMoviesToDashboard() {
    const movies = window.movieData; // Ambil data dari data.js
    
    // Filter berdasarkan kebutuhan
    const nowPlaying = movies.filter(movie => movie.status === 'now_playing');
    const comingSoon = movies.filter(movie => movie.status === 'coming_soon');
    
    // Tampilkan ke dashboard
    displayMovieStats(movies);
    displayRecentMovies(movies.slice(0, 5)); // 5 film terbaru
}

function displayMovieStats(movies) {
    document.getElementById('total-movies').textContent = movies.length;
    document.getElementById('now-playing').textContent = 
        movies.filter(m => m.status === 'now_playing').length;
    document.getElementById('coming-soon').textContent = 
        movies.filter(m => m.status === 'coming_soon').length;
}

function displayRecentMovies(movies) {
    const container = document.getElementById('recent-movies');
    container.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="../img/${movie.poster}" alt="${movie.title}">
            <h4>${movie.title}</h4>
            <p>Rating: ${movie.rating}/10</p>
            <span class="status ${movie.status}">${movie.status}</span>
        </div>
    `).join('');
}

// js/admin.js
document.addEventListener('DOMContentLoaded', function() {
    loadMoviesToDashboard();
});