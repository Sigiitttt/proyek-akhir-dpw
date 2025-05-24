// home.js - Script khusus untuk halaman home
document.addEventListener('DOMContentLoaded', function() {
    // Pastikan data sudah dimuat sebelum menampilkan film
    if (typeof DataHelper !== 'undefined') {
        loadFeaturedMovies();
    } else {
        // Tunggu sebentar jika data belum dimuat
        setTimeout(loadFeaturedMovies, 100);
    }
});

function loadFeaturedMovies() {
    const moviesContainer = document.querySelector('.movies-grid');
    if (!moviesContainer) return;

    try {
        // Ambil 4 film pertama yang sedang tayang (now_showing)
        const nowShowingFilms = DataHelper.getFilmsByStatus('now_showing').slice(0, 4);
        
        // Hapus loading placeholder
        moviesContainer.innerHTML = '';
        
        if (nowShowingFilms.length === 0) {
            moviesContainer.innerHTML = '<p class="no-movies">Tidak ada film yang sedang tayang.</p>';
            return;
        }
        
        // Generate movie cards secara dinamis
        nowShowingFilms.forEach(film => {
            const movieCard = createMovieCard(film);
            moviesContainer.appendChild(movieCard);
        });
        
    } catch (error) {
        console.error('Error loading featured movies:', error);
        moviesContainer.innerHTML = '<p class="error-message">Gagal memuat film. Silakan refresh halaman.</p>';
    }
}

function createMovieCard(film) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    
    // Default poster jika tidak ada
    const posterUrl = film.poster || `https://via.placeholder.com/300x400/333/fff?text=${encodeURIComponent(film.judul)}`;
    
    movieCard.innerHTML = `
        <img src="${posterUrl}" alt="${film.judul}"
             onerror="this.src='https://via.placeholder.com/300x400/333/fff?text=${encodeURIComponent(film.judul)}'">
        <div class="movie-info">
            <h3>${film.judul}</h3>
            <p class="genre">${film.genre.join(', ')}</p>
            <div class="rating">⭐ ${film.rating}</div>
            <a href="film/detail-film.html?id=${film.id}" class="btn btn-small">Detail</a>
        </div>
    `;
    
    // Add click handler untuk seluruh card
    movieCard.addEventListener('click', function(e) {
        // Jangan navigate jika yang diklik adalah tombol detail
        if (!e.target.closest('.btn')) {
            window.location.href = `film/detail-film.html?id=${film.id}`;
        }
    });
    
    return movieCard;
}

// Fungsi untuk menampilkan film berdasarkan status
function showMoviesByStatus(status, limit = 4) {
    const moviesContainer = document.querySelector('.movies-grid');
    if (!moviesContainer) return;
    
    try {
        let films;
        if (status === 'all') {
            films = DataHelper.getAllFilms().slice(0, limit);
        } else {
            films = DataHelper.getFilmsByStatus(status).slice(0, limit);
        }
        
        moviesContainer.innerHTML = '';
        
        if (films.length === 0) {
            moviesContainer.innerHTML = '<p class="no-movies">Tidak ada film ditemukan.</p>';
            return;
        }
        
        films.forEach(film => {
            const movieCard = createMovieCard(film);
            moviesContainer.appendChild(movieCard);
        });
        
    } catch (error) {
        console.error('Error showing movies by status:', error);
        moviesContainer.innerHTML = '<p class="error-message">Gagal memuat film.</p>';
    }
}

// Fungsi untuk mengupdate section title berdasarkan status
function updateSectionTitle(status) {
    const sectionTitle = document.querySelector('.featured-movies h2');
    if (sectionTitle) {
        switch(status) {
            case 'now_showing':
                sectionTitle.textContent = 'Film Sedang Tayang';
                break;
            case 'coming_soon':
                sectionTitle.textContent = 'Film Akan Datang';
                break;
            case 'all':
                sectionTitle.textContent = 'Semua Film';
                break;
            default:
                sectionTitle.textContent = 'Film Pilihan';
        }
    }
}

// Fungsi untuk menambahkan filter toggle (opsional)
function addMovieFilters() {
    const featuredSection = document.querySelector('.featured-movies .container');
    if (!featuredSection) return;
    
    // Cek apakah filter sudah ada
    if (featuredSection.querySelector('.movie-filters')) return;
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'movie-filters';
    filterContainer.style.marginBottom = '20px';
    
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-status="now_showing">Sedang Tayang</button>
            <button class="filter-btn" data-status="coming_soon">Akan Datang</button>
            <button class="filter-btn" data-status="all">Semua Film</button>
        </div>
    `;
    
    // Insert filter setelah h2
    const h2 = featuredSection.querySelector('h2');
    h2.insertAdjacentElement('afterend', filterContainer);
    
    // Add event listeners untuk filter buttons
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter movies
            const status = this.dataset.status;
            showMoviesByStatus(status, 4);
            updateSectionTitle(status);
        });
    });
}

// Fungsi untuk menampilkan notifikasi (konsisten dengan film.js)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling inline untuk memastikan tampil dengan benar
    const bgColor = type === 'error' ? '#f44336' : '#2196F3';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Fungsi helper untuk favorite (konsisten dengan film.js)
function toggleFavoriteFromHome(filmId, event) {
    event.preventDefault();
    event.stopPropagation();
    
    try {
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
        
        // Update button appearance if needed
        const btn = event.target;
        if (favorites.includes(filmId)) {
            btn.classList.add('favorited');
            btn.innerHTML = '💔';
        } else {
            btn.classList.remove('favorited');
            btn.innerHTML = '❤️';
        }
        
    } catch (error) {
        console.error('Error toggling favorite:', error);
        showNotification('Gagal menambah/hapus favorit', 'error');
    }
}

// Global functions untuk akses dari HTML
window.showMoviesByStatus = showMoviesByStatus;
window.updateSectionTitle = updateSectionTitle;
window.toggleFavoriteFromHome = toggleFavoriteFromHome;