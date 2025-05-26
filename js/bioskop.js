/**
 * BioskopList Class
 * Mengelola halaman daftar bioskop berdasarkan kota
 */
class BioskopList {
    constructor() {
        // DOM Elements
        this.citySelect = document.getElementById('citySelect');
        this.cinemaList = document.getElementById('cinemaList');
        this.cinemaItems = document.getElementById('cinemaItems');
        this.selectedCity = document.getElementById('selectedCity');
        this.cinemaListTitle = document.getElementById('cinemaListTitle');
        
        // Initialize
        this.init();
    }

    /**
     * Inisialisasi aplikasi
     */
    init() {
        this.populateCityDropdown();
        this.bindEvents();
        this.checkUrlParams();
    }

    /**
     * Mengisi dropdown dengan daftar kota
     */
    populateCityDropdown() {
        // Kosongkan dropdown terlebih dahulu
        this.citySelect.innerHTML = '<option value="">-- Pilih Kota --</option>';
        
        // Tambahkan option untuk setiap kota
        Object.keys(kotaList).forEach(cityKey => {
            const option = document.createElement('option');
            option.value = cityKey;
            option.textContent = kotaList[cityKey];
            this.citySelect.appendChild(option);
        });
    }

    /**
     * Mengikat event listeners
     */
    bindEvents() {
        this.citySelect.addEventListener('change', (e) => {
            const selectedCityKey = e.target.value;
            if (selectedCityKey) {
                this.displayCinemas(selectedCityKey);
                this.updateUrl(selectedCityKey);
            } else {
                this.hideCinemaList();
                this.clearUrl();
            }
        });
    }

    /**
     * Cek parameter URL untuk auto-select kota
     */
    checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const cityParam = urlParams.get('kota');
        
        if (cityParam && kotaList[cityParam]) {
            this.citySelect.value = cityParam;
            this.displayCinemas(cityParam);
        }
    }

    /**
     * Update URL dengan parameter kota
     */
    updateUrl(cityKey) {
        const newUrl = `${window.location.pathname}?kota=${cityKey}`;
        window.history.pushState({ city: cityKey }, '', newUrl);
    }

    /**
     * Hapus parameter dari URL
     */
    clearUrl() {
        window.history.pushState({}, '', window.location.pathname);
    }

    /**
     * Menampilkan daftar bioskop berdasarkan kota
     */
    displayCinemas(cityKey) {
        const cityName = kotaList[cityKey];
        const cinemas = bioskopData[cityKey] || [];

        // Update judul
        this.selectedCity.textContent = cityName;
        
        // Tampilkan loading terlebih dahulu
        this.showLoading();
        
        // Simulasi loading delay untuk UX yang lebih baik
        setTimeout(() => {
            if (cinemas.length > 0) {
                this.renderCinemas(cinemas);
            } else {
                this.showNoCinemas(cityName);
            }
        }, 300);
    }

    /**
     * Menampilkan loading state
     */
    showLoading() {
        this.cinemaItems.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner"></i>
                <p>Memuat daftar bioskop...</p>
            </div>
        `;
        this.cinemaList.style.display = 'block';
    }

    /**
     * Render daftar bioskop ke dalam DOM
     */
    renderCinemas(cinemas) {
        let html = '';
        
        cinemas.forEach(cinema => {
            html += this.createCinemaItem(cinema);
        });
        
        this.cinemaItems.innerHTML = html;
        
        // Bind click events untuk tracking
        this.bindCinemaClickEvents();
    }

    /**
     * Membuat HTML untuk item bioskop
     */
    createCinemaItem(cinema) {
        return `
            <a href="detail-bioskop.html?id=${cinema.id}" 
               class="cinema-item" 
               data-cinema-id="${cinema.id}"
               data-cinema-name="${cinema.nama}">
                <div class="cinema-icon">
                    <i class="fas fa-film"></i>
                </div>
                <div class="cinema-name">${cinema.nama}</div>
                <div class="cinema-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </a>
        `;
    }

    /**
     * Bind event untuk click tracking pada item bioskop
     */
    bindCinemaClickEvents() {
        const cinemaItems = document.querySelectorAll('.cinema-item');
        cinemaItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const cinemaId = item.dataset.cinemaId;
                const cinemaName = item.dataset.cinemaName;
                
                // Log untuk analytics (opsional)
                console.log(`Cinema clicked: ${cinemaName} (ID: ${cinemaId})`);
                
                // Bisa ditambahkan tracking analytics di sini
                this.trackCinemaClick(cinemaId, cinemaName);
            });
        });
    }

    /**
     * Track klik bioskop untuk analytics
     */
    trackCinemaClick(cinemaId, cinemaName) {
        // Placeholder untuk analytics tracking
        // Misalnya Google Analytics, Facebook Pixel, dll
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cinema_click', {
                'cinema_id': cinemaId,
                'cinema_name': cinemaName
            });
        }
    }

    /**
     * Menampilkan pesan ketika tidak ada bioskop
     */
    showNoCinemas(cityName) {
        this.cinemaItems.innerHTML = `
            <div class="no-cinemas">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Tidak ada bioskop ditemukan di ${cityName}</p>
                <p>Silakan pilih kota lain atau coba lagi nanti</p>
            </div>
        `;
    }

    /**
     * Menyembunyikan daftar bioskop
     */
    hideCinemaList() {
        this.cinemaList.style.display = 'none';
    }

    /**
     * Mendapatkan bioskop berdasarkan ID
     */
    getCinemaById(cinemaId) {
        for (let city in bioskopData) {
            const cinema = bioskopData[city].find(c => c.id == cinemaId);
            if (cinema) return cinema;
        }
        return null;
    }

    /**
     * Mendapatkan daftar bioskop berdasarkan kota
     */
    getCinemasByCity(cityKey) {
        return bioskopData[cityKey] || [];
    }

    /**
     * Search bioskop berdasarkan nama
     */
    searchCinemas(query, cityKey = null) {
        let results = [];
        const searchTerm = query.toLowerCase();
        
        if (cityKey) {
            // Search dalam kota tertentu
            const cinemas = bioskopData[cityKey] || [];
            results = cinemas.filter(cinema => 
                cinema.nama.toLowerCase().includes(searchTerm)
            );
        } else {
            // Search di semua kota
            Object.keys(bioskopData).forEach(city => {
                const matches = bioskopData[city].filter(cinema =>
                    cinema.nama.toLowerCase().includes(searchTerm)
                );
                results = results.concat(matches);
            });
        }
        
        return results;
    }
}

/**
 * Utility Functions
 */
const BioskopUtils = {
    /**
     * Format nama bioskop untuk URL
     */
    formatCinemaSlug(cinemaName) {
        return cinemaName.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    },

    /**
     * Validasi ID bioskop
     */
    isValidCinemaId(cinemaId) {
        return BioskopList.prototype.getCinemaById(cinemaId) !== null;
    },

    /**
     * Get random bioskop untuk recommendation
     */
    getRandomCinemas(count = 3) {
        const allCinemas = [];
        Object.keys(bioskopData).forEach(city => {
            allCinemas.push(...bioskopData[city]);
        });
        
        const shuffled = allCinemas.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
};

/**
 * Initialize aplikasi ketika DOM sudah ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Cek apakah element yang dibutuhkan ada
    if (document.getElementById('citySelect')) {
        window.bioskopList = new BioskopList();
    }
});

/**
 * Handle browser back/forward button
 */
window.addEventListener('popstate', (event) => {
    if (window.bioskopList && event.state) {
        if (event.state.city) {
            window.bioskopList.citySelect.value = event.state.city;
            window.bioskopList.displayCinemas(event.state.city);
        }
    }
});