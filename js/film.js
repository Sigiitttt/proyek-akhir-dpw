// film.js - Menangani logika untuk list film dan detail film

// State management
let currentFilms = [];
let currentFilter = 'all';
let currentSort = 'judul';

// DOM Elements - List Film
const filmsGrid = document.getElementById('filmsGrid');
const loadingState = document.getElementById('loadingState');
const noResults = document.getElementById('noResults');
const filmSearch = document.getElementById('filmSearch');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const tabBtns = document.querySelectorAll('.tab-btn');

// DOM Elements - Detail Film
const loadingDetail = document.getElementById('loadingDetail');
const filmDetailContent = document.getElementById('filmDetailContent');
const filmNotFound = document.getElementById('filmNotFound');
const filmPoster = document.getElementById('filmPoster');
const filmTitle = document.getElementById('filmTitle');
const filmRating = document.getElementById('filmRating');
const filmYear = document.getElementById('filmYear');
const filmDuration = document.getElementById('filmDuration');
const filmGenres = document.getElementById('filmGenres');
const filmDirector = document.getElementById('filmDirector');
const filmCast = document.getElementById('filmCast');
const filmSynopsis = document.getElementById('filmSynopsis');
const showtimesContainer = document.getElementById('showtimesContainer');
const relatedFilmsGrid = document.getElementById('relatedFilmsGrid');
const watchTrailerBtn = document.getElementById('watchTrailerBtn');
const addToFavoriteBtn = document.getElementById('addToFavoriteBtn');
const trailerModal = document.getElementById('trailerModal');
const closeTrailerModal = document.getElementById('closeTrailerModal');
const trailerVideo = document.getElementById('trailerVideo');

// Utility Functions
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function showLoading(isDetail = false) {
    if (isDetail) {
        if (loadingDetail) loadingDetail.style.display = 'flex';
        if (filmDetailContent) filmDetailContent.style.display = 'none';
        if (filmNotFound) filmNotFound.style.display = 'none';
    } else {
        if (loadingState) loadingState.style.display = 'flex';
        if (filmsGrid) filmsGrid.style.display = 'none';
        if (noResults) noResults.style.display = 'none';
    }
}

function hideLoading(isDetail = false) {
    if (isDetail) {
        if (loadingDetail) loadingDetail.style.display = 'none';
    } else {
        if (loadingState) loadingState.style.display = 'none';
        if (filmsGrid) filmsGrid.style.display = 'grid';
    }
}

function showNoResults() {
    if (filmsGrid) filmsGrid.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
}

function showNotFound() {
    if (loadingDetail) loadingDetail.style.display = 'none';
    if (filmDetailContent) filmDetailContent.style.display = 'none';
    if (filmNotFound) filmNotFound.style.display = 'block';
}

// Film Card Creation
function createFilmCard(film) {
    const statusBadge = film.status === 'now_showing' ? 'Sedang Tayang' : 'Akan Tayang';
    const statusClass = film.status === 'now_showing' ? 'status-now' : 'status-coming';
    
    return `
        <div class="film-card" onclick="goToDetail(${film.id})">
            <div class="film-poster">
                <img src="${film.poster}" alt="${film.judul}" loading="lazy">
                <div class="film-overlay">
                    <div class="film-rating">
                        <span class="rating-star">⭐</span>
                        <span>${film.rating}</span>
                    </div>
                    <div class="film-status ${statusClass}">
                        ${statusBadge}
                    </div>
                </div>
            </div>
            <div class="film-info">
                <h3 class="film-title">${film.judul}</h3>
                <p class="film-genre">${film.genre.join(', ')}</p>
                <p class="film-meta">
                    <span>${film.tahun}</span> • 
                    <span>${DataHelper.formatDuration(film.durasi)}</span>
                </p>
                <div class="film-actions">
                    <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); goToDetail(${film.id})">
                        Detail
                    </button>
                    <button class="btn btn-outline btn-small" onclick="event.stopPropagation(); toggleFavorite(${film.id})">
                        ❤️
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Navigation Functions
function goToDetail(filmId) {
    window.location.href = `detail-film.html?id=${filmId}`;
}

// Favorite Functions
function toggleFavorite(filmId) {
    let favorites = JSON.parse(localStorage.getItem('favoriteFilms') || '[]');
    const index = favorites.indexOf(filmId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Film dihapus dari favorit');
    } else {
        favorites.push(filmId);
        showNotification('Film ditambahkan ke favorit');
    }
    
    localStorage.setItem('favoriteFilms', JSON.stringify(favorites));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('favoriteFilms') || '[]');
    const favoriteBtn = document.getElementById('addToFavoriteBtn');
    
    if (favoriteBtn) {
        const filmId = parseInt(getUrlParameter('id'));
        if (favorites.includes(filmId)) {
            favoriteBtn.innerHTML = '💔 Hapus dari Favorit';
            favoriteBtn.classList.add('active');
        } else {
            favoriteBtn.innerHTML = '❤️ Tambah ke Favorit';
            favoriteBtn.classList.remove('active');
        }
    }
}

function showNotification(message) {
    // Simple notification - bisa dikembangkan lebih lanjut
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2196F3;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Filter and Sort Functions
function filterFilms(status = 'all') {
    currentFilter = status;
    let films;
    
    if (status === 'all') {
        films = DataHelper.getAllFilms();
    } else {
        films = DataHelper.getFilmsByStatus(status);
    }
    
    currentFilms = films;
    sortFilms(currentSort);
}

function sortFilms(sortBy) {
    currentSort = sortBy;
    
    const sortedFilms = [...currentFilms].sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'tahun':
                return b.tahun - a.tahun;
            case 'durasi':
                return b.durasi - a.durasi;
            case 'judul':
            default:
                return a.judul.localeCompare(b.judul);
        }
    });
    
    renderFilms(sortedFilms);
}

function searchFilms(query) {
    if (!query.trim()) {
        filterFilms(currentFilter);
        return;
    }
    
    const searchResults = DataHelper.searchFilms(query);
    renderFilms(searchResults);
}

// Render Functions
function renderFilms(films) {
    if (!filmsGrid) return;
    
    hideLoading();
    
    if (films.length === 0) {
        showNoResults();
        return;
    }
    
    const filmsHTML = films.map(film => createFilmCard(film)).join('');
    filmsGrid.innerHTML = filmsHTML;
    filmsGrid.style.display = 'grid';
    
    if (noResults) noResults.style.display = 'none';
}

function renderFilmDetail(film) {
    if (!film) {
        showNotFound();
        return;
    }
    
    // Update film info
    if (filmPoster) filmPoster.src = film.poster;
    if (filmPoster) filmPoster.alt = film.judul;
    if (filmTitle) filmTitle.textContent = film.judul;
    if (filmRating) filmRating.textContent = film.rating;
    if (filmYear) filmYear.textContent = film.tahun;
    if (filmDuration) filmDuration.textContent = DataHelper.formatDuration(film.durasi);
    if (filmGenres) filmGenres.textContent = film.genre.join(', ');
    if (filmDirector) filmDirector.textContent = film.sutradara;
    if (filmCast) filmCast.textContent = film.pemeran.slice(0, 3).join(', ');
    if (filmSynopsis) filmSynopsis.textContent = film.sinopsis;
    
    // Update hero background
    const heroSection = document.querySelector('.film-hero');
    if (heroSection) {
        const heroBg = heroSection.querySelector('.film-hero-bg');
        if (heroBg) {
            heroBg.style.backgroundImage = `url(${film.poster})`;
        }
    }
    
    // Render showtimes
    renderShowtimes(film.jadwal);
    
    // Render related films
    renderRelatedFilms(film);
    
    // Update favorite button
    updateFavoriteButtons();
    
    // Show content
    hideLoading(true);
    if (filmDetailContent) filmDetailContent.style.display = 'block';
}

function renderShowtimes(showtimes) {
    if (!showtimesContainer) return;
    
    const showtimesHTML = showtimes.map(showtime => `
        <div class="showtime-item">
            <div class="showtime-header">
                <h4>${showtime.bioskop}</h4>
                <p class="showtime-date">${DataHelper.formatDate(showtime.tanggal)}</p>
            </div>
            <div class="showtime-slots">
                ${showtime.jam.map(jam => `
                    <button class="time-slot" onclick="selectShowtime('${showtime.bioskop}', '${showtime.tanggal}', '${jam}')">
                        ${jam}
                    </button>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    showtimesContainer.innerHTML = showtimesHTML;
}

function renderRelatedFilms(currentFilm) {
    if (!relatedFilmsGrid) return;
    
    // Get films with similar genre (exclude current film)
    const relatedFilms = DataHelper.getAllFilms()
        .filter(film => 
            film.id !== currentFilm.id && 
            film.genre.some(genre => currentFilm.genre.includes(genre))
        )
        .slice(0, 4);
    
    const relatedHTML = relatedFilms.map(film => createFilmCard(film)).join('');
    relatedFilmsGrid.innerHTML = relatedHTML;
}

// Event Handlers
function selectShowtime(bioskop, tanggal, jam) {
    const filmId = getUrlParameter('id');
    const showtimeData = {
        filmId: filmId,
        bioskop: bioskop,
        tanggal: tanggal,
        jam: jam
    };
    
    // Store selected showtime
    sessionStorage.setItem('selectedShowtime', JSON.stringify(showtimeData));
    
    // Navigate to booking page (implement as needed)
    showNotification(`Jadwal dipilih: ${bioskop} - ${tanggal} ${jam}`);
    
    // Highlight selected time slot
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function openTrailer(trailerUrl) {
    if (!trailerModal || !trailerVideo) return;
    
    // Convert YouTube URL to embed format
    const videoId = trailerUrl.split('v=')[1]?.split('&')[0];
    if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        trailerVideo.src = embedUrl;
        trailerModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeTrailer() {
    if (!trailerModal || !trailerVideo) return;
    
    trailerVideo.src = '';
    trailerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize Functions
function initListFilm() {
    // Set up event listeners for list film page
    if (tabBtns) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active tab
                tabBtns.forEach(tab => tab.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter films
                const status = btn.dataset.status;
                filterFilms(status);
            });
        });
    }
    
    if (searchBtn && filmSearch) {
        searchBtn.addEventListener('click', () => {
            const query = filmSearch.value;
            searchFilms(query);
        });
        
        filmSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = filmSearch.value;
                searchFilms(query);
            }
        });
        
        // Real-time search (debounced)
        let searchTimeout;
        filmSearch.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = e.target.value;
                searchFilms(query);
            }, 500);
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortFilms(e.target.value);
        });
    }
    
    // Load initial films
    showLoading();
    setTimeout(() => {
        filterFilms('all');
    }, 500); // Simulate loading delay
}

function initDetailFilm() {
    const filmId = getUrlParameter('id');
    
    if (!filmId) {
        showNotFound();
        return;
    }
    
    showLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
        const film = DataHelper.getFilmById(filmId);
        renderFilmDetail(film);
    }, 800);
    
    // Set up event listeners for detail film page
    if (watchTrailerBtn) {
        watchTrailerBtn.addEventListener('click', () => {
            const film = DataHelper.getFilmById(filmId);
            if (film && film.trailer) {
                openTrailer(film.trailer);
            }
        });
    }
    
    if (addToFavoriteBtn) {
        addToFavoriteBtn.addEventListener('click', () => {
            toggleFavorite(parseInt(filmId));
        });
    }
    
    if (closeTrailerModal) {
        closeTrailerModal.addEventListener('click', closeTrailer);
    }
    
    if (trailerModal) {
        trailerModal.addEventListener('click', (e) => {
            if (e.target === trailerModal) {
                closeTrailer();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && trailerModal && trailerModal.style.display === 'flex') {
            closeTrailer();
        }
    });
}

// Page Detection and Initialization
function initPage() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('list-film.html') || currentPage.endsWith('/')) {
        initListFilm();
    } else if (currentPage.includes('detail-film.html')) {
        initDetailFilm();
    }
}

// Global Functions (accessible from HTML)
window.goToDetail = goToDetail;
window.toggleFavorite = toggleFavorite;
window.selectShowtime = selectShowtime;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);

// CSS untuk notification (inject ke head)
const notificationCSS = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        animation: slideIn 0.3s ease !important;
    }
`;

const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);