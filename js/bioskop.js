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
        this.selectedCity = document.getElementById('selectedCity'); // Untuk menampilkan nama kota terpilih
        this.cinemaListTitle = document.getElementById('cinemaListTitle'); // Judul kontainer daftar bioskop

        // Initialize
        // Pastikan elemen-elemen penting ada sebelum init
        if (!this.citySelect || !this.cinemaList || !this.cinemaItems || !this.selectedCity) {
            console.error("Satu atau lebih elemen DOM penting untuk BioskopList tidak ditemukan.");
            return;
        }
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
        // Pastikan data daftarKotaTersedia ada dari data.js
        if (typeof daftarKotaTersedia === 'undefined') {
            console.error("Variabel 'daftarKotaTersedia' tidak ditemukan. Pastikan data.js sudah dimuat.");
            this.citySelect.innerHTML = '<option value="">Gagal memuat kota</option>';
            return;
        }

        this.citySelect.innerHTML = '<option value="">-- Pilih Kota --</option>';
        
        Object.keys(daftarKotaTersedia).forEach(cityKey => { // Menggunakan daftarKotaTersedia
            const option = document.createElement('option');
            option.value = cityKey;
            option.textContent = daftarKotaTersedia[cityKey]; // Menggunakan daftarKotaTersedia
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
        // Pastikan data daftarKotaTersedia ada
        if (typeof daftarKotaTersedia === 'undefined') return;

        const urlParams = new URLSearchParams(window.location.search);
        const cityParam = urlParams.get('kota');
        
        if (cityParam && daftarKotaTersedia[cityParam]) { // Menggunakan daftarKotaTersedia
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
        // Pastikan data daftarKotaTersedia dan dataBioskopPerKota ada
        if (typeof daftarKotaTersedia === 'undefined' || typeof dataBioskopPerKota === 'undefined') {
            console.error("Data kota atau bioskop tidak ditemukan.");
            this.showNoCinemas("Kota Pilihan");
            return;
        }

        const cityName = daftarKotaTersedia[cityKey] || cityKey; // Menggunakan daftarKotaTersedia
        const cinemas = dataBioskopPerKota[cityKey] || []; // Menggunakan dataBioskopPerKota

        this.selectedCity.textContent = cityName; // Perbarui nama kota di judul
        
        this.showLoading();
        
        setTimeout(() => { // Simulasi delay
            if (cinemas.length > 0) {
                this.renderCinemas(cinemas);
            } else {
                this.showNoCinemas(cityName);
            }
            // Pastikan cinemaList ditampilkan setelah loading atau pesan
            this.cinemaList.style.display = 'block';
        }, 300); // Delay bisa disesuaikan atau dihapus jika data langsung tersedia
    }

    /**
     * Menampilkan loading state
     */
    showLoading() {
        this.cinemaItems.innerHTML = `
            <div class="loading-bioskop"> <i class="fas fa-spinner fa-spin"></i> <p>Memuat daftar bioskop...</p>
            </div>
        `;
        this.cinemaList.style.display = 'block'; // Tampilkan kontainer list saat loading
    }

    /**
     * Render daftar bioskop ke dalam DOM
     */
    renderCinemas(cinemas) {
        let html = '';
        cinemas.forEach(cinema => {
            // cinema.nama sudah sesuai dengan properti di dataBioskopPerKota versi Indonesia
            html += this.createCinemaItem(cinema);
        });
        this.cinemaItems.innerHTML = html;
        this.bindCinemaClickEvents();
    }

    /**
     * Membuat HTML untuk item bioskop
     */
    createCinemaItem(cinema) {
        // Properti 'nama' dan 'id' dari objek cinema diasumsikan sudah sesuai
        // dengan struktur di dataBioskopPerKota (versi Indonesia)
        return `
            <a href="detailbioskop.html?id=${cinema.id}" 
               class="item-bioskop" 
               data-cinema-id="${cinema.id}"
               data-cinema-name="${cinema.nama || 'Nama Tidak Diketahui'}">
                <div class="info-bioskop">
                    <h3 class="nama-bioskop">${cinema.nama || 'Nama Tidak Diketahui'}</h3>
                    ${cinema.alamat ? `<p class="alamat-bioskop">${cinema.alamat}</p>` : ''}
                </div>
                <div class="panah-bioskop">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </a>
        `;
        // Saya sedikit mengubah struktur HTML kartu bioskop agar lebih umum untuk styling
        // seperti .info-bioskop, .nama-bioskop, .alamat-bioskop, .panah-bioskop
    }

    /**
     * Bind event untuk click tracking pada item bioskop
     */
    bindCinemaClickEvents() {
        const cinemaItems = document.querySelectorAll('.item-bioskop'); // Kelas dari createCinemaItem
        cinemaItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // e.preventDefault(); // Hapus jika Anda ingin link default bekerja
                const cinemaId = item.dataset.cinemaId;
                const cinemaName = item.dataset.cinemaName;
                
                console.log(`Bioskop diklik: ${cinemaName} (ID: ${cinemaId})`);
                this.trackCinemaClick(cinemaId, cinemaName);

                // Jika tidak ingin link default bekerja dan ingin navigasi via JS:
                // window.location.href = `./bioskop/detailbioskop.html?id=${cinemaId}`;
            });
        });
    }

    /**
     * Track klik bioskop untuk analytics
     */
    trackCinemaClick(cinemaId, cinemaName) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'bioskop_diklik', { // Ubah nama event jika perlu
                'id_bioskop': cinemaId,
                'nama_bioskop': cinemaName
            });
        }
    }

    /**
     * Menampilkan pesan ketika tidak ada bioskop
     */
    showNoCinemas(cityName) {
        this.cinemaItems.innerHTML = `
            <div class="pesan-tidak-ada-bioskop"> <i class="fas fa-store-slash"></i> <p>Tidak ada bioskop yang terdaftar di ${cityName}</p>
                <p>Silakan pilih kota lain.</p>
            </div>
        `;
    }

    /**
     * Menyembunyikan daftar bioskop
     */
    hideCinemaList() {
        this.cinemaList.style.display = 'none';
        this.selectedCity.textContent = ''; // Kosongkan juga nama kota terpilih
    }

    /**
     * Mendapatkan bioskop berdasarkan ID dari dataBioskopPerKota
     * (Fungsi ini akan mencari di semua kota dalam dataBioskopPerKota)
     */
    getCinemaById(cinemaId) {
        // Pastikan dataBioskopPerKota ada
        if (typeof dataBioskopPerKota === 'undefined') return null;

        for (let cityKey in dataBioskopPerKota) { // Menggunakan dataBioskopPerKota
            if (dataBioskopPerKota.hasOwnProperty(cityKey)) {
                const cinema = dataBioskopPerKota[cityKey].find(c => String(c.id) === String(cinemaId)); // Bandingkan sebagai string untuk konsistensi
                if (cinema) return cinema;
            }
        }
        return null;
    }

    /**
     * Mendapatkan daftar bioskop berdasarkan kota
     */
    getCinemasByCity(cityKey) {
        // Pastikan dataBioskopPerKota ada
        if (typeof dataBioskopPerKota === 'undefined') return [];
        return dataBioskopPerKota[cityKey] || []; // Menggunakan dataBioskopPerKota
    }

    /**
     * Search bioskop berdasarkan nama
     */
    searchCinemas(query, cityKey = null) {
        // Pastikan dataBioskopPerKota ada
        if (typeof dataBioskopPerKota === 'undefined') return [];

        let results = [];
        const searchTerm = query.toLowerCase();
        
        if (cityKey) {
            const cinemas = dataBioskopPerKota[cityKey] || []; // Menggunakan dataBioskopPerKota
            results = cinemas.filter(cinema => 
                cinema.nama && cinema.nama.toLowerCase().includes(searchTerm)
            );
        } else {
            Object.keys(dataBioskopPerKota).forEach(city => { // Menggunakan dataBioskopPerKota
                const matches = (dataBioskopPerKota[city] || []).filter(cinema =>
                    cinema.nama && cinema.nama.toLowerCase().includes(searchTerm)
                );
                results = results.concat(matches);
            });
        }
        return results;
    }
}

/**
 * Utility Functions (BioskopUtils)
 */
const BioskopUtils = {
    formatCinemaSlug(cinemaName) {
        if (!cinemaName) return '';
        return cinemaName.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    },

    isValidCinemaId(cinemaId) {
        // Akses metode dari instance yang sudah ada jika tersedia, atau buat instance sementara
        // Namun, ini tidak ideal. Lebih baik jika getCinemaById adalah static atau di luar kelas.
        // Untuk sementara, kita asumsikan window.bioskopList ada, atau kita tidak bisa memvalidasi dengan cara ini.
        if (window.bioskopList && typeof window.bioskopList.getCinemaById === 'function') {
            return window.bioskopList.getCinemaById(cinemaId) !== null;
        }
        // Fallback: Coba cari manual jika instance tidak ada (kurang efisien)
        if (typeof dataBioskopPerKota !== 'undefined') {
             for (let cityKey in dataBioskopPerKota) {
                if (dataBioskopPerKota.hasOwnProperty(cityKey)) {
                    if (dataBioskopPerKota[cityKey].find(c => String(c.id) === String(cinemaId))) return true;
                }
            }
        }
        return false;
    },

    getRandomCinemas(count = 3) {
        // Pastikan dataBioskopPerKota ada
        if (typeof dataBioskopPerKota === 'undefined') return [];

        const allCinemas = [];
        Object.keys(dataBioskopPerKota).forEach(city => { // Menggunakan dataBioskopPerKota
            allCinemas.push(...(dataBioskopPerKota[city] || []));
        });
        
        if (allCinemas.length === 0) return [];
        const shuffled = allCinemas.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
};

/**
 * Initialize aplikasi ketika DOM sudah ready
 */
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('citySelect')) { // Cek elemen utama
        window.bioskopList = new BioskopList();
    } else {
        console.warn("Elemen #citySelect tidak ditemukan, BioskopList tidak diinisialisasi.");
    }
});

/**
 * Handle browser back/forward button
 */
window.addEventListener('popstate', (event) => {
    if (window.bioskopList && event.state) {
        if (event.state.city && typeof daftarKotaTersedia !== 'undefined' && daftarKotaTersedia[event.state.city]) {
            window.bioskopList.citySelect.value = event.state.city;
            window.bioskopList.displayCinemas(event.state.city);
        } else if (!event.state.city) { // Jika state kota kosong (misalnya, halaman awal)
            window.bioskopList.citySelect.value = "";
            window.bioskopList.hideCinemaList();
        }
    } else if (window.bioskopList && !event.state) { // Jika kembali ke state awal (tanpa state object)
         window.bioskopList.citySelect.value = "";
         window.bioskopList.hideCinemaList();
         window.bioskopList.clearUrl(); // Bersihkan URL juga
    }
});