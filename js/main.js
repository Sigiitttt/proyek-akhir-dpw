
function dapatkanPathDasar() {
    const pathHalaman = window.location.pathname;
    const segmenPath = pathHalaman.substring(1).split('/'); 

    if (segmenPath.length === 1 || (segmenPath.length === 0 && pathHalaman === "/")) {
        return './';
    }

    let kedalaman = 0;
    if (segmenPath[segmenPath.length - 1].includes('.')) {
        kedalaman = segmenPath.length - 1;
    } else {
        kedalaman = segmenPath.length;
    }

    return kedalaman > 0 ? '../'.repeat(kedalaman) : './';
}

// Fungsi asinkron untuk memuat konten HTML dari file eksternal ke dalam elemen kontainer tertentu.
async function muatKontenHTML(urlFileHTML, idKontainer) {
    try {
        const respons = await fetch(urlFileHTML); 
        if (!respons.ok) { 
            throw new Error(`Kesalahan HTTP! status: ${respons.status} saat mencoba memuat ${urlFileHTML}`);
        }
        const kontenHtml = await respons.text(); 
        const kontainerTarget = document.getElementById(idKontainer);
        if (kontainerTarget) {
            kontainerTarget.innerHTML = kontenHtml; 
            kontainerTarget.dispatchEvent(new CustomEvent('kontenTelahDimuat', { bubbles: true }));
        } else {
            console.error(`Error: Kontainer dengan ID '${idKontainer}' tidak ditemukan di DOM.`);
        }
    } catch (kesalahan) {
        console.error(`Gagal memuat ${urlFileHTML}:`, kesalahan);
        if (idKontainer === 'wadah-navbar') {
            muatNavbarFallback(); 
        } else if (idKontainer === 'wadah-footer') {
            muatFooterFallback(); 
        }
    }
}

// Fungsi untuk memuat HTML navbar jika navbar utama gagal dimuat.
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

// Fungsi untuk memuat HTML footer jika footer utama gagal dimuat.
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

// Fungsi utama untuk menginisialisasi halaman memuat komponen 
function inisialisasiHalaman() {
    const pathDasar = dapatkanPathDasar();

    muatKontenHTML(`${pathDasar}components/navbar.html`, 'wadah-navbar');
    muatKontenHTML(`${pathDasar}components/footer.html`, 'wadah-footer');
}

// Fungsi untuk event listener pada navbar utama (setelah dimuat).
function inisialisasiEventNavbar() {
    const tombolToggleMenuMobile = document.getElementById('toggleMenuMobile'); 
    const menuNavigasi = document.getElementById('menuNavigasiUtama'); 

    if (tombolToggleMenuMobile && menuNavigasi) {
        tombolToggleMenuMobile.addEventListener('click', () => {
            menuNavigasi.classList.toggle('aktif'); 
            tombolToggleMenuMobile.classList.toggle('aktif'); 
        });
    } else {

       }
}

// Fungsi untuk menginisialisasi fungsionalitas smooth scrolling 
function inisialisasiScrollHalus() {
    const semuaTautanAnchor = document.querySelectorAll('a[href^="#"]');

    semuaTautanAnchor.forEach(tautan => {
        tautan.addEventListener('click', (event) => {
            const idTarget = tautan.getAttribute('href').substring(1); 
            const elemenTarget = document.getElementById(idTarget);

            if (elemenTarget) {
                event.preventDefault(); 
                elemenTarget.scrollIntoView({
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
}

// Fungsi untuk menampilkan indikator loading 
function tampilkanIndikatorLoading(idKontainer) {
    const kontainer = document.getElementById(idKontainer);
    if (kontainer) {
        kontainer.innerHTML = '<div class="memuat" style="text-align:center; padding: 20px; font-style: italic;">Sedang memuat data...</div>';
    }
}

// Event listener yang dijalankan setelah seluruh struktur DOM halaman selesai dimuat.
document.addEventListener('DOMContentLoaded', () => {
    inisialisasiHalaman(); 

    setTimeout(() => {
        inisialisasiEventNavbar();
        inisialisasiScrollHalus();

        if (document.querySelector('.sedang-tayang .kisi-film')) {
            if (typeof dataSemuaFilm !== 'undefined') {
                renderFilmSedangTayang(dataSemuaFilm);
            } else {
                console.warn("Variabel 'dataSemuaFilm' tidak ditemukan. Tidak dapat merender film.");
                const wadahFilm = document.querySelector('.sedang-tayang .kisi-film');
                if (wadahFilm) wadahFilm.innerHTML = "<p style='text-align:center;'>Gagal memuat data film.</p>";
            }
        }

        const wadahBerita = document.getElementById('kisi-berita');
        if (wadahBerita && typeof dataSemuaBerita !== 'undefined') {
            // Pastikan fungsi renderBeritaDashboard sudah didefinisikan di main.js atau diimpor dengan benar
            if (typeof renderBeritaDashboard === 'function') {
                renderBeritaDashboard(dataSemuaBerita, 3); // Menggunakan renderBeritaDashboard, 3 adalah contoh jumlah item
            } else {
                console.warn("Fungsi 'renderBeritaDashboard' tidak ditemukan. Pastikan sudah didefinisikan atau diimpor ke main.js.");
            }
        }


    }, 700); 
});

window.AplikasiTix = {
    dapatkanPathDasar,
    muatKontenHTML,
    inisialisasiHalaman,
    inisialisasiEventNavbar,
    renderFilmSedangTayang, 
    navigasiKeDetailBerita,
    navigasiKeSemuaBerita
};

function renderFilmSedangTayang(dataFilm) {
    const wadahGridFilm = document.querySelector('.sedang-tayang .kisi-film');
    if (!wadahGridFilm) {
        return;
    }

    const filmSedangTayang = dataFilm 
        .filter(film => film.status === "sedang_tayang")
        .slice(0, 4);

    const filmUntukDitampilkan = filmSedangTayang.length > 0 ? filmSedangTayang : dataFilm.slice(0, 4);

    if (filmUntukDitampilkan.length === 0) {
        wadahGridFilm.innerHTML = "<p style='text-align:center;'>Saat ini tidak ada film yang ditampilkan.</p>";
        return;
    }

    let htmlUntukGridFilm = '';
    filmUntukDitampilkan.forEach(film => {
        const stringGenre = Array.isArray(film.genre) ? film.genre.join(', ') : 'Genre tidak tersedia';
        const tampilanRating = `⭐ ${film.rating || 'N/A'}/10`;
        const pathPosterFallback = `${dapatkanPathDasar()}img/assets/poster-fallback.svg`;
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

// Fungsi untuk mengarahkan pengguna ke halaman detail berita 
function navigasiKeDetailBerita(idBerita) {
    window.location.href = `${dapatkanPathDasar()}news/news-detail.html?id=${idBerita}`;
}

// Fungsi untuk mengarahkan pengguna ke halaman daftar semua berita.
function navigasiKeSemuaBerita() {
    window.location.href = `${dapatkanPathDasar()}news/news.html`;
}