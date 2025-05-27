// Fungsi untuk render film yang sedang tayang
function renderNowShowingMovies() {
    // Ambil container untuk movies grid
    const moviesGrid = document.querySelector('.now-showing .movies-grid');
    if (!moviesGrid) return;

    // Filter film dengan status "now_showing" dan ambil maksimal 4 film
    const nowShowingFilms = filmsData
        .filter(film => film.status === "now_showing")
        .slice(0, 4);

    // Jika tidak ada film now_showing, ambil 4 film pertama sebagai fallback
    const filmsToShow = nowShowingFilms.length > 0 ? nowShowingFilms : filmsData.slice(0, 4);

    // Generate HTML untuk setiap film
    let moviesHTML = '';
    filmsToShow.forEach(film => {
        // Format genre menjadi string
        const genreString = film.genre.join(', ');
        
        // Format rating
        const ratingDisplay = `⭐ ${film.rating}/10`;

        moviesHTML += `
            <div class="movie-card">
                <div class="movie-poster">
                    <img src="${film.poster}" alt="${film.judul}"
                        onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjU3Mzg1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPk1vdmllIFBvc3RlcjwvdGV4dD4KPC9zdmc+'">
                </div>
                <div class="movie-info">
                    <h3>${film.judul}</h3>
                    <p class="genre">${genreString}</p>
                    <p class="rating">${ratingDisplay}</p>
                    <a href="film/detail-film.html?id=${film.id}" class="btn btn-small">Detail</a>
                </div>
            </div>
        `;
    });

    // Update HTML
    moviesGrid.innerHTML = moviesHTML;
}

// Fungsi untuk inisialisasi ketika DOM sudah ready
function initializeDashboard() {
    // Render film yang sedang tayang
    renderNowShowingMovies();
}

// Jalankan ketika DOM sudah siap
document.addEventListener('DOMContentLoaded', initializeDashboard);

// Jika jQuery tersedia, gunakan sebagai alternatif
if (typeof $ !== 'undefined') {
    $(document).ready(initializeDashboard);
}