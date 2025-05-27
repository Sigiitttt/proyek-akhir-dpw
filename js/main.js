// Main JavaScript file untuk TIX.ID
// Memuat navbar dan footer ke semua halaman

// Fungsi untuk mendapatkan base path relatif berdasarkan lokasi file
function getBasePath() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');

    // Cek apakah kita di root atau di subfolder
    if (currentPath.includes('/TIX-ID-WEB/')) {
        const tixIndex = pathParts.indexOf('tix-id-web');
        const depth = pathParts.length - tixIndex - 2; // -2 untuk tix-id-web dan file saat ini
        return depth > 0 ? '../'.repeat(depth) : './';
    }

    return './';
}


// Fungsi untuk memuat konten HTML
async function loadHTML(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${url}:`, error);
        // Fallback jika gagal memuat
        if (containerId === 'navbar-container') {
            loadFallbackNavbar();
        } else if (containerId === 'footer-container') {
            loadFallbackFooter();
        }
    }
}

// Fallback navbar jika gagal memuat
function loadFallbackNavbar() {
    const navbarHTML = `
        <nav class="navbar">
            <div class="container">
                <div class="nav-brand">
                    <a href="/index.html" class="logo">
                        <span class="logo-text">TIX.ID</span>
                    </a>
                </div>
                <div class="nav-menu">
                    <ul class="nav-links">
                        <li><a href="/index.html">Beranda</a></li>
                        <li><a href="/film/list-film.html">Film</a></li>
                        <li><a href="/food/menu.html">Makanan</a></li>
                    </ul>
                </div>
                <div class="nav-actions">
                    <div class="auth-buttons">
                        <a href="/login.html" class="btn btn-outline">Masuk</a>
                        <a href="/register.html" class="btn btn-primary">Daftar</a>
                    </div>
                </div>
            </div>
        </nav>
    `;
    document.getElementById('navbar-container').innerHTML = navbarHTML;
}

// Fallback footer jika gagal memuat
function loadFallbackFooter() {
    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>TIX.ID</h3>
                        <p>&copy; 2024 TIX.ID. Semua hak cipta dilindungi.</p>
                    </div>
                </div>
            </div>
        </footer>
    `;
    document.getElementById('footer-container').innerHTML = footerHTML;
}

// Fungsi untuk menginisialisasi halaman
function initializePage() {
    const basePath = getBasePath();

    // Load navbar dan footer
    loadHTML(`${basePath}components/navbar.html`, 'navbar-container');
    loadHTML(`${basePath}components/footer.html`, 'footer-container');

    // Tunggu navbar dimuat, lalu inisialisasi event listeners
    setTimeout(() => {
        initializeNavbarEvents();
        checkAuthStatus();
    }, 100);
}

// Event listeners untuk navbar
function initializeNavbarEvents() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
}

// Fungsi pencarian
function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();

    if (query) {
        // Redirect ke halaman pencarian atau filter film
        const basePath = getBasePath();
        window.location.href = `${basePath}film/list-film.html?search=${encodeURIComponent(query)}`;
    }
}

// Cek status autentikasi
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const usernameElement = document.getElementById('username');

    if (isLoggedIn && username && authButtons && userMenu) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'block';
        if (usernameElement) {
            usernameElement.textContent = username;
        }
    } else if (authButtons && userMenu) {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}

// Fungsi logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userData');

    // Redirect ke halaman utama
    const basePath = getBasePath();
    window.location.href = `${basePath}index.html`;
}

// Fungsi utility untuk menambahkan active class pada navigation
function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) || (currentPath.endsWith('/') && href.includes('index.html'))) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling untuk anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Fungsi untuk menampilkan loading
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '<div class="loading">Memuat...</div>';
    }
}

// Inisialisasi ketika DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initializePage();

    // Tunggu sebentar lalu jalankan fungsi tambahan
    setTimeout(() => {
        setActiveNavigation();
        initializeSmoothScrolling();
    }, 200);
});

// Export fungsi untuk digunakan di file lain
window.TixApp = {
    getBasePath,
    loadHTML,
    checkAuthStatus,
    logout,
    handleSearch,
    initializePage
};

// Fungsi untuk render film yang sedang tayang (dari dashboard.js yang sudah ada)
function renderNowShowingMovies() {
    const moviesGrid = document.querySelector('.now-showing .movies-grid');
    if (!moviesGrid || typeof filmsData === 'undefined') return;

    const nowShowingFilms = filmsData
        .filter(film => film.status === "now_showing")
        .slice(0, 4);

    const filmsToShow = nowShowingFilms.length > 0 ? nowShowingFilms : filmsData.slice(0, 4);

    let moviesHTML = '';
    filmsToShow.forEach(film => {
        const genreString = film.genre.join(', ');
        const ratingDisplay = `⭐ ${film.rating}/10`;

        moviesHTML += `
                    <div class="movie-card">
                        <div class="movie-poster">
                            <img src="${film.poster}" alt="${film.judul}"
                                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjNmNGY2Ci8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjU3Mzg1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPk1vdmllIFBvc3RlcjwvdGV4dD4KPC9zdmc+'">
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

    moviesGrid.innerHTML = moviesHTML;
}

// Fungsi untuk navigasi ke detail berita
function goToNewsDetail(newsId) {
    window.location.href = `news/news-detail.html?id=${newsId}`;
}

// Fungsi untuk navigasi ke halaman semua berita
function goToAllNews() {
    window.location.href = 'news/news.html';
}

// Fungsi untuk inisialisasi dashboard
function initializeDashboard() {
    renderNowShowingMovies();
    renderNews();
}

// Jalankan ketika DOM sudah siap
document.addEventListener('DOMContentLoaded', initializeDashboard);

// Jika jQuery tersedia, gunakan sebagai alternatif
if (typeof $ !== 'undefined') {
    $(document).ready(initializeDashboard);
}