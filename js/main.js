// main.js (Script Utama Aplikasi TIX.ID)

// Fungsi untuk mendapatkan path dasar (base path) relatif terhadap lokasi file HTML saat ini.
// Ini berguna untuk memuat aset seperti komponen HTML, CSS, atau gambar secara dinamis
// dari lokasi yang benar, terlepas dari seberapa dalam file HTML berada dalam struktur folder.
// Di main.js
function dapatkanPathDasar() {
    const pathHalaman = window.location.pathname; // Contoh: "/film/list-film.html" atau "/index.html"
    const segmenPath = pathHalaman.substring(1).split('/'); // Contoh: ["film", "list-film.html"] atau ["index.html"]

    // Jika path hanya berisi nama file (misal "index.html") atau kosong (untuk root "/"), kita ada di root.
    if (segmenPath.length === 1 || (segmenPath.length === 0 && pathHalaman === "/")) {
        return './';
    }

    // Hitung berapa banyak '../' yang dibutuhkan jika kita di subfolder.
    // segmenPath.length - 1 adalah jumlah folder jika path diakhiri nama file.
    let kedalaman = 0;
    // Cek apakah segmen terakhir adalah nama file (mengandung titik)
    if (segmenPath[segmenPath.length - 1].includes('.')) {
        kedalaman = segmenPath.length - 1;
    } else { // Jika path diakhiri dengan / (folder, jarang terjadi untuk halaman HTML langsung)
        kedalaman = segmenPath.length;
    }

    return kedalaman > 0 ? '../'.repeat(kedalaman) : './';
}

// Fungsi asinkron untuk memuat konten HTML dari file eksternal ke dalam elemen kontainer tertentu.
// Parameter:
// - urlFileHTML: String, path menuju file HTML yang akan dimuat.
// - idKontainer: String, ID dari elemen HTML tempat konten akan disisipkan.
async function muatKontenHTML(urlFileHTML, idKontainer) {
    try {
        const respons = await fetch(urlFileHTML); // Mengambil file HTML
        if (!respons.ok) { // Jika respons tidak berhasil (misal, file tidak ditemukan)
            throw new Error(`Kesalahan HTTP! status: ${respons.status} saat mencoba memuat ${urlFileHTML}`);
        }
        const kontenHtml = await respons.text(); // Mengambil konten sebagai teks
        const kontainerTarget = document.getElementById(idKontainer);
        if (kontainerTarget) {
            kontainerTarget.innerHTML = kontenHtml; // Memasukkan konten HTML ke dalam kontainer
            // Kirim event kustom setelah konten berhasil dimuat (opsional, untuk penanganan lanjutan)
            kontainerTarget.dispatchEvent(new CustomEvent('kontenTelahDimuat', { bubbles: true }));
        } else {
            console.error(`Error: Kontainer dengan ID '${idKontainer}' tidak ditemukan di DOM.`);
        }
    } catch (kesalahan) {
        console.error(`Gagal memuat ${urlFileHTML}:`, kesalahan);
        // Penanganan fallback jika komponen utama gagal dimuat
        if (idKontainer === 'wadah-navbar') {
            muatNavbarFallback(); // Memuat navbar alternatif jika navbar utama gagal
        } else if (idKontainer === 'wadah-footer') {
            muatFooterFallback(); // Memuat footer alternatif jika footer utama gagal
        }
    }
}

// Fungsi untuk memuat HTML navbar alternatif jika navbar utama gagal dimuat.
// Ini memastikan pengguna tetap memiliki navigasi dasar.
function muatNavbarFallback() {
    const htmlNavbarFallback = `
        <nav class="navbar">
            <div class="container">
                <div class="merek-nav">
                    <a href="${dapatkanPathDasar()}index.html" class="logo">
                        <span class="teks-logo">TIX.ID</span>
                    </a>
                </div>
                <div class="menu-nav" id="menuNavFallback">
                    <ul class="tautan-nav">
                        <li><a href="${dapatkanPathDasar()}index.html">Beranda</a></li>
                        <li><a href="${dapatkanPathDasar()}film/list-film.html">Film</a></li>
                        <li><a href="${dapatkanPathDasar()}food/menu.html">Makanan</a></li> {/* Ganti dengan path makanan yang benar */}
                    </ul>
                </div>
                <div class="aksi-nav">
                    <div class="tombol-autentikasi">
                        <a href="${dapatkanPathDasar()}login.html" class="tombol tombol-kerangka">Masuk</a>
                        <a href="${dapatkanPathDasar()}register.html" class="tombol tombol-utama">Daftar</a>
                    </div>
                </div>
                <button class="toggle-nav" id="mobileMenuToggleFallback" aria-label="Toggle navigasi">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </nav>
    `;
    const kontainerNavbar = document.getElementById('wadah-navbar');
    if (kontainerNavbar) {
        kontainerNavbar.innerHTML = htmlNavbarFallback;
        // Inisialisasi event untuk toggle menu pada navbar fallback
        const toggleFallback = document.getElementById('mobileMenuToggleFallback');
        const menuFallback = document.getElementById('menuNavFallback');
        if (toggleFallback && menuFallback) {
            toggleFallback.addEventListener('click', () => {
                menuFallback.classList.toggle('aktif');
                toggleFallback.classList.toggle('aktif');
            });
        }
    }
}

// Fungsi untuk memuat HTML footer alternatif jika footer utama gagal dimuat.
function muatFooterFallback() {
    const htmlFooterFallback = `
        <footer class="footer">
            <div class="container">
                <div class="konten-footer">
                    <div class="bagian-footer">
                        <h3>TIX.ID</h3>
                        <p>&copy; ${new Date().getFullYear()} TIX.ID. Semua hak cipta dilindungi.</p>
                    </div>
                </div>
            </div>
        </footer>
    `;
    const kontainerFooter = document.getElementById('wadah-footer');
    if (kontainerFooter) {
        kontainerFooter.innerHTML = htmlFooterFallback;
    }
}

// Fungsi utama untuk menginisialisasi halaman: memuat komponen dasar.
function inisialisasiHalaman() {
    const pathDasar = dapatkanPathDasar();

    muatKontenHTML(`${pathDasar}components/navbar.html`, 'wadah-navbar');
    muatKontenHTML(`${pathDasar}components/footer.html`, 'wadah-footer');
}

// Fungsi untuk menginisialisasi event listener pada navbar utama (setelah dimuat).
// Ini menangani interaksi pengguna seperti klik pada tombol menu mobile.
function inisialisasiEventNavbar() {
    // Pastikan ID 'toggleMenuMobile' dan 'menuNavigasiUtama' ada di file 'components/navbar.html' Anda.
    const tombolToggleMenuMobile = document.getElementById('toggleMenuMobile'); // ID untuk tombol burger
    const menuNavigasi = document.getElementById('menuNavigasiUtama'); // ID untuk elemen ul atau div menu

    if (tombolToggleMenuMobile && menuNavigasi) {
        tombolToggleMenuMobile.addEventListener('click', () => {
            menuNavigasi.classList.toggle('aktif'); // 'aktif' adalah kelas CSS untuk menampilkan menu
            tombolToggleMenuMobile.classList.toggle('aktif'); // Untuk mengubah tampilan tombol burger (misal, menjadi X)
        });
    } else {
        // console.warn("Peringatan: Tombol toggle menu mobile atau menu navigasi utama tidak ditemukan. Pastikan ID sudah benar di navbar.html.");
    }
}

// Fungsi untuk menginisialisasi fungsionalitas smooth scrolling untuk tautan anchor (link internal halaman).
function inisialisasiScrollHalus() {
    // Memilih semua tautan <a> yang atribut href-nya dimulai dengan '#'
    const semuaTautanAnchor = document.querySelectorAll('a[href^="#"]');

    semuaTautanAnchor.forEach(tautan => {
        tautan.addEventListener('click', (event) => {
            const idTarget = tautan.getAttribute('href').substring(1); // Dapatkan ID target tanpa '#'
            const elemenTarget = document.getElementById(idTarget);

            if (elemenTarget) {
                event.preventDefault(); // Mencegah perilaku default tautan anchor
                elemenTarget.scrollIntoView({
                    behavior: 'smooth', // Efek scroll halus
                    block: 'start' // Posisikan elemen target di bagian atas viewport
                });
            }
        });
    });
}

// Fungsi untuk menampilkan indikator loading di dalam kontainer tertentu.
// Parameter:
// - idKontainer: String, ID dari elemen HTML tempat indikator loading akan ditampilkan.
function tampilkanIndikatorLoading(idKontainer) {
    const kontainer = document.getElementById(idKontainer);
    if (kontainer) {
        // Menggunakan kelas '.memuat' yang telah didefinisikan di CSS,
        // atau gaya inline sederhana jika tidak ada kelas khusus.
        kontainer.innerHTML = '<div class="memuat" style="text-align:center; padding: 20px; font-style: italic;">Sedang memuat data...</div>';
    }
}

// Event listener yang dijalankan setelah seluruh struktur DOM halaman selesai dimuat.
document.addEventListener('DOMContentLoaded', () => {
    inisialisasiHalaman(); // Memuat komponen navbar dan footer

    // Memberi sedikit waktu tunda agar komponen HTML (navbar, footer) selesai dimuat
    // sebelum mencoba menginisialisasi event atau merender konten dinamis.
    // Pendekatan yang lebih baik: gunakan event 'kontenTelahDimuat' dari `muatKontenHTML`.
    setTimeout(() => {
        // Coba inisialisasi event navbar utama.
        // Event ini sebaiknya dipicu setelah navbar.html benar-benar dimuat dan dimasukkan ke DOM.
        // Contoh: document.getElementById('wadah-navbar').addEventListener('kontenTelahDimuat', inisialisasiEventNavbar);
        inisialisasiEventNavbar();

        // inisialisasiNavigasiAktif(); // Fungsi ini belum ada definisinya, perlu dibuat jika dibutuhkan.
        inisialisasiScrollHalus();

        // Merender daftar film yang sedang tayang jika elemen kontainernya ada di halaman ini.
        if (document.querySelector('.sedang-tayang .kisi-film')) {
            // Pastikan variabel 'dataSemuaFilm' tersedia secara global atau di-import.
            if (typeof dataSemuaFilm !== 'undefined') {
                renderFilmSedangTayang(dataSemuaFilm);
            } else {
                console.warn("Variabel 'dataSemuaFilm' tidak ditemukan. Tidak dapat merender film.");
                const wadahFilm = document.querySelector('.sedang-tayang .kisi-film');
                if (wadahFilm) wadahFilm.innerHTML = "<p style='text-align:center;'>Gagal memuat data film.</p>";
            }
        }

        // Contoh untuk merender berita (jika ada dan diperlukan di halaman ini)
        // ...
        const wadahBerita = document.getElementById('kisi-berita');
        if (wadahBerita && typeof dataSemuaBerita !== 'undefined') {
            // Pastikan fungsi renderBeritaDashboard sudah didefinisikan di main.js atau diimpor dengan benar
            if (typeof renderBeritaDashboard === 'function') {
                renderBeritaDashboard(dataSemuaBerita, 3); // Menggunakan renderBeritaDashboard, 3 adalah contoh jumlah item
            } else {
                console.warn("Fungsi 'renderBeritaDashboard' tidak ditemukan. Pastikan sudah didefinisikan atau diimpor ke main.js.");
            }
        }
        // ...

    }, 700); // Waktu tunda bisa disesuaikan, tergantung kecepatan load komponen.
});

// Objek global AplikasiTix untuk mengelompokkan fungsi-fungsi yang mungkin perlu diakses
// dari script lain atau dari inline event handler di HTML (meskipun praktik terakhir kurang disarankan).
window.AplikasiTix = {
    dapatkanPathDasar,
    muatKontenHTML,
    // periksaStatusAutentikasi, // Fungsi ini belum ada, perlu dibuat jika ada sistem login
    // keluarSistem, // Fungsi ini belum ada, perlu dibuat
    // tanganiPencarian, // Fungsi ini belum ada, perlu dibuat
    inisialisasiHalaman,
    inisialisasiEventNavbar,
    renderFilmSedangTayang, // Ekspos jika ingin dipanggil dari tempat lain dengan data berbeda
    navigasiKeDetailBerita,
    navigasiKeSemuaBerita
};

// Fungsi untuk merender daftar film yang sedang tayang ke dalam DOM.
// Parameter:
// - dataFilm: Array of Objects, berisi data semua film yang tersedia.
function renderFilmSedangTayang(dataFilm) {
    const wadahGridFilm = document.querySelector('.sedang-tayang .kisi-film');
    if (!wadahGridFilm) {
        // console.warn("Peringatan: Elemen '.sedang-tayang .kisi-film' tidak ditemukan untuk merender film.");
        return;
    }

    // Filter film yang statusnya "now_showing" (sedang tayang) dan ambil 4 pertama.
    const filmSedangTayang = dataFilm // <--- DIUBAH DI SINI
        .filter(film => film.status === "sedang_tayang")
        .slice(0, 4);

    // Jika tidak ada film "now_showing", tampilkan 4 film pertama dari semua data sebagai fallback.
    const filmUntukDitampilkan = filmSedangTayang.length > 0 ? filmSedangTayang : dataFilm.slice(0, 4);

    if (filmUntukDitampilkan.length === 0) {
        wadahGridFilm.innerHTML = "<p style='text-align:center;'>Saat ini tidak ada film yang ditampilkan.</p>";
        return;
    }

    let htmlUntukGridFilm = '';
    filmUntukDitampilkan.forEach(film => {
        // Pastikan genre adalah array dan gabungkan, beri nilai default jika tidak ada.
        const stringGenre = Array.isArray(film.genre) ? film.genre.join(', ') : 'Genre tidak tersedia';
        // Tampilkan rating, beri nilai default jika tidak ada.
        const tampilanRating = `⭐ ${film.rating || 'N/A'}/10`;
        // Path gambar poster default jika poster film tidak tersedia.
        const pathPosterFallback = `${dapatkanPathDasar()}img/assets/poster-fallback.svg`; // Sediakan gambar fallback

        htmlUntukGridFilm += `
            <div class="kartu-film">
                <div class="poster-film">
                    <img src="${film.poster || pathPosterFallback}" alt="Poster film ${film.judul || 'Tanpa Judul'}"
                        onerror="this.onerror=null; this.src='${pathPosterFallback}';"> {/* Ganti dengan SVG base64 jika lebih disukai */}
                </div>
                <div class="info-film">
                    <h3>${film.judul || 'Judul Tidak Tersedia'}</h3>
                    <p class="genre">${stringGenre}</p>
                    <p class="rating">${tampilanRating}</p>
                    <a href="${dapatkanPathDasar()}film/detail-film.html?id=${film.id}" class="tombol tombol-kecil">Detail</a>
                </div>
            </div>
        `;
    });

    wadahGridFilm.innerHTML = htmlUntukGridFilm;
}

// Fungsi untuk mengarahkan pengguna ke halaman detail berita tertentu.
// Parameter:
// - idBerita: String atau Number, ID unik dari berita yang akan ditampilkan.
function navigasiKeDetailBerita(idBerita) {
    window.location.href = `${dapatkanPathDasar()}news/news-detail.html?id=${idBerita}`;
}

// Fungsi untuk mengarahkan pengguna ke halaman daftar semua berita.
function navigasiKeSemuaBerita() {
    window.location.href = `${dapatkanPathDasar()}news/news.html`;
}

