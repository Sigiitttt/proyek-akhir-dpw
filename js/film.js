// film.js - Logika untuk halaman daftar film dan detail film

// Variabel global untuk menyimpan data film saat ini, filter, dan urutan
let daftarFilmSaatIni = [];
let filterAktif = 'semua';
let urutanAktif = 'judul';

// === Variabel Elemen DOM untuk Halaman Daftar Film ===
const kisiFilm = document.getElementById('kisiFilm');
const statusMemuatDaftar = document.getElementById('statusMemuatDaftar');
const tidakAdaHasil = document.getElementById('tidakAdaHasil');
const inputPencarianFilm = document.getElementById('inputPencarianFilm');
const tombolCari = document.getElementById('tombolCari');
const pilihanUrutan = document.getElementById('pilihanUrutan');
const tombolTabFilter = document.querySelectorAll('.tombol-tab'); // Pastikan kelas ini sesuai dengan HTML

// === Variabel Elemen DOM untuk Halaman Detail Film ===
const statusMemuatDetail = document.getElementById('statusMemuatDetail');
const kontenDetailFilm = document.getElementById('kontenDetailFilm');
const filmTidakDitemukan = document.getElementById('filmTidakDitemukan');
const posterFilmDetail = document.getElementById('posterFilmDetail');
const judulFilmDetail = document.getElementById('judulFilmDetail');
const ratingFilmDetail = document.getElementById('ratingFilmDetail');
const tahunFilmDetail = document.getElementById('tahunFilmDetail');
const durasiFilmDetail = document.getElementById('durasiFilmDetail');
const genreFilmDetail = document.getElementById('genreFilmDetail');
const sutradaraFilmDetail = document.getElementById('sutradaraFilmDetail');
const pemeranFilmDetail = document.getElementById('pemeranFilmDetail');
const sinopsisFilmDetail = document.getElementById('sinopsisFilmDetail');
const wadahJadwalTayang = document.getElementById('wadahJadwalTayang');
const kisiFilmTerkait = document.getElementById('kisiFilmTerkait');
const tombolTontonTrailer = document.getElementById('tombolTontonTrailer');
const tombolTambahFavorit = document.getElementById('tombolTambahFavorit');
const modalTrailer = document.getElementById('modalTrailer'); // ID dari HTML detail-film.html
const videoTrailerIframe = document.getElementById('videoTrailerIframe');
const videoTrailer = document.getElementById('videoTrailer');

// === Fungsi Utilitas ===

// Fungsi dapatkanPathDasar (jika main.js tidak dimuat atau AplikasiTix tidak tersedia)
// Jika Anda yakin main.js dan AplikasiTix selalu ada, Anda bisa menggunakan AplikasiTix.dapatkanPathDasar()
// Jika tidak, atau untuk membuat film.js lebih mandiri untuk path aset:
function dapatkanPathDasarLokal() { // Nama berbeda untuk menghindari konflik jika main.js juga dimuat
    // Karena film.js dipanggil dari film/list-film.html atau film/detail-film.html
    // dan aset seperti img ada di root/img, maka path dasarnya adalah '../'
    // Untuk komponen (jika dipanggil dari main.js yang ada di js/), pathnya beda.
    // Fungsi ini spesifik untuk kebutuhan path aset dari film.js yang dipanggil di dalam folder /film/
    const pathHalaman = window.location.pathname;
    if (pathHalaman.includes('/film/')) { // Jika halaman ada di dalam folder /film/
        return '../'; // Untuk naik satu level ke root proyek
    }
    return './'; // Jika halaman ada di root (misal index.html yang memuat film.js)
}

function dapatkanParameterUrl(namaParameter) {
    const parameterUrl = new URLSearchParams(window.location.search);
    return parameterUrl.get(namaParameter);
}

function tampilkanStatusMemuat(apakahDetail = false) {
    if (apakahDetail) {
        if (statusMemuatDetail) statusMemuatDetail.style.display = 'flex';
        if (kontenDetailFilm) kontenDetailFilm.style.display = 'none';
        if (filmTidakDitemukan) filmTidakDitemukan.style.display = 'none';
    } else {
        if (statusMemuatDaftar) statusMemuatDaftar.style.display = 'flex';
        if (kisiFilm) kisiFilm.style.display = 'none';
        if (tidakAdaHasil) tidakAdaHasil.style.display = 'none';
    }
}

function sembunyikanStatusMemuat(apakahDetail = false) {
    if (apakahDetail) {
        if (statusMemuatDetail) statusMemuatDetail.style.display = 'none';
    } else {
        if (statusMemuatDaftar) statusMemuatDaftar.style.display = 'none';
        if (kisiFilm) kisiFilm.style.display = 'grid';
    }
}

function tampilkanTidakAdaHasil() {
    if (kisiFilm) kisiFilm.style.display = 'none';
    if (tidakAdaHasil) tidakAdaHasil.style.display = 'block';
}

function tampilkanFilmTidakDitemukan() {
    if (statusMemuatDetail) statusMemuatDetail.style.display = 'none';
    if (kontenDetailFilm) kontenDetailFilm.style.display = 'none';
    if (filmTidakDitemukan) filmTidakDitemukan.style.display = 'block';
}

// === Pembuatan Kartu Film ===
// Di PROYEK-AKHIR-DPW2/js/film.js
function buatKartuFilm(film) {
    // Pastikan nilai status di data.js adalah "sedang_tayang" atau "segera_tayang"
    const labelStatus = film.status === 'now_snowing' ? 'Sedang Tayang' :
        (film.status === 'coming_soon' ? 'Akan Tayang' : ''); // Kosongkan jika status tidak diketahui

    // Kelas badge status yang spesifik
    const kelasStatusBadge = film.status === 'now_snowing' ? 'status-sedang-tayang-badge' :
        (film.status === 'coming_soon' ? 'status-akan-datang-badge' : '');

    const pathDasarAplikasi = typeof AplikasiTix !== 'undefined' && typeof AplikasiTix.dapatkanPathDasar === 'function' ? AplikasiTix.dapatkanPathDasar() : dapatkanPathDasarLokal();
    // Pastikan film.poster di data.js adalah path relatif dari root proyek, misal "img/assets/nama.jpg"
    const posterSumber = film.poster ? (film.poster.startsWith('http') ? film.poster : pathDasarAplikasi + film.poster.replace(/^\.?\//, '')) : `${pathDasarAplikasi}img/assets/poster-fallback.svg`;
    const posterFallbackOnError = `${pathDasarAplikasi}img/assets/poster-fallback.svg`;

    return `
        <div class="kartu-film" onclick="navigasiKeDetailFilm(${film.id})">
            <div class="poster-film">
                <img src="${posterSumber}" alt="Poster ${film.judul || 'Tanpa Judul'}" loading="lazy" onerror="this.onerror=null; this.src='${posterFallbackOnError}';">
                <div class="overlay-film">
                    ${labelStatus ? `<div class="status-film-kartu ${kelasStatusBadge}">${labelStatus}</div>` : ''}
                    <div class="rating-film-kartu">
                        <span class="bintang-rating">⭐</span>
                        <span>${film.rating ? film.rating + '/10' : 'N/A'}
                    </div>
                </div>
            </div>
            <div class="info-film-kartu">
                <h3 class="judul-film-kartu">${film.judul || 'Judul Tidak Tersedia'}</h3>
                <p class="genre-film-kartu">${Array.isArray(film.genre) ? film.genre.join(', ') : 'Genre tidak diketahui'}</p>
                <p class="meta-film-kartu">
                    <span>${film.tahun || 'N/A'}</span> •
                    <span>${film.durasi ? BantuanData.formatDurasi(film.durasi) : 'N/A'}</span>
                </p>
                <div class="aksi-film-kartu">
                    <button class="tombol tombol-utama tombol-kecil" onclick="event.stopPropagation(); navigasiKeDetailFilm(${film.id})">
                        Detail
                    </button>
                    <button class="tombol tombol-kerangka tombol-kecil" onclick="event.stopPropagation(); toggleFilmFavorit(${film.id}, this)">
                        <span class="simbol-favorit">❤️</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// === Fungsi Navigasi ===
function navigasiKeDetailFilm(idFilm) {
    // Path relatif dari film/list-film.html ke film/detail-film.html adalah 'detail-film.html'
    // Jika dipanggil dari root/index.html, pathnya akan 'film/detail-film.html'
    // Kita buat path absolut dari root proyek jika memungkinkan
    const pathDasarAplikasi = typeof AplikasiTix !== 'undefined' && typeof AplikasiTix.dapatkanPathDasar === 'function' ? AplikasiTix.dapatkanPathDasar() : dapatkanPathDasarLokal();
    // Jika dapatkanPathDasarLokal mengembalikan '../' dari /film/, maka pathDasarAplikasi + 'film/detail...' akan salah
    // Jadi, kita asumsikan navigasi selalu ke path relatif dari root proyek
    // Untuk film.js yang mungkin dipanggil dari /film/ atau dari /, kita butuh path yang konsisten ke /film/detail-film.html

    // Solusi lebih aman: Jika AplikasiTix ada, gunakan pathnya. Jika tidak, bangun path dari root.
    let targetUrl = '';
    if (typeof AplikasiTix !== 'undefined' && typeof AplikasiTix.dapatkanPathDasar === 'function') {
        targetUrl = `${AplikasiTix.dapatkanPathDasar()}film/detail-film.html?id=${idFilm}`;
    } else {
        // Jika film.js ada di js/, dan dipanggil dari film/list-film.html (yang ../js/film.js)
        // maka kita sudah di level film/, jadi path ke detail-film.html cukup 'detail-film.html'
        // Namun jika film.js dipanggil dari index.html (js/film.js), pathnya 'film/detail-film.html'
        // Ini jadi rumit jika tidak ada path dasar global yang konsisten.
        // Untuk sementara, asumsikan halaman film ada di folder /film/
        const currentPath = window.location.pathname;
        if (currentPath.includes('/film/')) {
            targetUrl = `detail-film.html?id=${idFilm}`; // Jika sudah di dalam folder /film/
        } else {
            targetUrl = `film/detail-film.html?id=${idFilm}`; // Jika dari root
        }
    }
    window.location.href = targetUrl;
}




// Pastikan fungsi ini ada di file film.js Anda, di luar fungsi lain (scope global file)

function tampilkanNotifikasi(pesan) {
    const notifikasiSudahAda = document.querySelector('.notifikasi-pengguna-tix'); // Cek apakah sudah ada notifikasi
    if (notifikasiSudahAda) {
        notifikasiSudahAda.remove(); // Hapus notifikasi lama jika ada, agar tidak tumpuk
    }

    const notifikasi = document.createElement('div');
    notifikasi.className = 'notifikasi-pengguna-tix'; // Beri kelas unik
    notifikasi.textContent = pesan;
    
    // Style dasar, bisa juga dipindahkan ke file CSS Anda
    notifikasi.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745; /* Warna sukses, atau sesuaikan */
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 20000; /* Pastikan di atas segalanya */
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        opacity: 0;
        transform: translateX(100%);
        transition: opacity 0.4s ease, transform 0.4s ease;
    `;

    document.body.appendChild(notifikasi);

    // Trigger animasi masuk
    setTimeout(() => {
        notifikasi.style.opacity = '1';
        notifikasi.style.transform = 'translateX(0)';
    }, 10); // Delay kecil untuk memastikan elemen sudah di DOM sebelum animasi

    // Hapus notifikasi setelah beberapa detik
    setTimeout(() => {
        notifikasi.style.opacity = '0';
        notifikasi.style.transform = 'translateX(100%)';
        notifikasi.addEventListener('transitionend', () => {
            if (notifikasi.parentNode) { // Pastikan masih ada di DOM sebelum remove
                notifikasi.remove();
            }
        });
    }, 3500); // Notifikasi hilang setelah 3.5 detik
}



// === Fungsi Favorit ===
function toggleFilmFavorit(idFilm, elemenTombol) {
    let daftarFavorit = JSON.parse(localStorage.getItem('filmFavorit') || '[]');
    const indexFavorit = daftarFavorit.indexOf(idFilm);

    if (indexFavorit > -1) {
        daftarFavorit.splice(indexFavorit, 1);
        tampilkanNotifikasi('Film dihapus dari favorit');
        if (elemenTombol) elemenTombol.querySelector('.simbol-favorit').textContent = '❤️';
    } else {
        daftarFavorit.push(idFilm);
        tampilkanNotifikasi('Film ditambahkan ke favorit');
        if (elemenTombol) elemenTombol.querySelector('.simbol-favorit').textContent = '💔';
    }

    localStorage.setItem('filmFavorit', JSON.stringify(daftarFavorit));
    perbaruiTombolFavorit();
}

function perbaruiTombolFavorit() {
    const daftarFavorit = JSON.parse(localStorage.getItem('filmFavorit') || '[]');
    if (tombolTambahFavorit) { // Hanya jika elemen tombol favorit di halaman detail ada
        const idFilmPadaHalaman = parseInt(dapatkanParameterUrl('id'));
        if (!isNaN(idFilmPadaHalaman)) {
            if (daftarFavorit.includes(idFilmPadaHalaman)) {
                tombolTambahFavorit.innerHTML = '💔 Hapus dari Favorit';
                tombolTambahFavorit.classList.add('aktif');
            } else {
                tombolTambahFavorit.innerHTML = '❤️ Tambah ke Favorit';
                tombolTambahFavorit.classList.remove('aktif');
            }
        }
    }
    // Update juga tombol di kartu film (jika ada di halaman yang sama, misal halaman daftar)
    document.querySelectorAll('.kartu-film').forEach(kartu => {
        const onclickAttr = kartu.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/navigasiKeDetailFilm\((\d+)\)/);
            if (match && match[1]) {
                const idFilmKartu = parseInt(match[1]);
                const tombolFavoritKartu = kartu.querySelector('.simbol-favorit');
                if (tombolFavoritKartu) {
                    if (daftarFavorit.includes(idFilmKartu)) {
                        tombolFavoritKartu.textContent = '💔';
                    } else {
                        tombolFavoritKartu.textContent = '❤️';
                    }
                }
            }
        }
    });
}



// === Fungsi Filter dan Urutan ===
function filterDaftarFilm(status = 'semua') {
    filterAktif = status;
    let daftarFilmsDariHelper; // Ganti nama variabel agar tidak konflik

    // Pastikan BantuanData dan metodenya sudah terdefinisi
    if (typeof BantuanData === 'undefined' || typeof BantuanData.dapatkanSemuaFilm !== 'function' || typeof BantuanData.dapatkanFilmBerdasarkanStatus !== 'function') {
        console.error("BantuanData atau metodenya tidak terdefinisi!");
        if (kisiFilm) kisiFilm.innerHTML = "<p style='text-align:center;'>Gagal memuat fungsi data film.</p>";
        return;
    }

    if (status === 'semua') {
        daftarFilmsDariHelper = BantuanData.dapatkanSemuaFilm();
    } else {
        // Pastikan status yang dikirim ke helper adalah yang sudah diterjemahkan jika perlu
        // Di data.js, status sudah "sedang_tayang" atau "segera_tayang"
        daftarFilmsDariHelper = BantuanData.dapatkanFilmBerdasarkanStatus(status);
    }

    // Pastikan hasil dari helper adalah array
    if (!Array.isArray(daftarFilmsDariHelper)) {
        console.error("Hasil filter film bukan array:", daftarFilmsDariHelper);
        daftarFilmSaatIni = []; // Set ke array kosong jika data tidak valid
    } else {
        daftarFilmSaatIni = daftarFilmsDariHelper;
    }
    urutkanDaftarFilm(urutanAktif);
}

function urutkanDaftarFilm(berdasarkan) {
    urutanAktif = berdasarkan;

    if (!Array.isArray(daftarFilmSaatIni)) {
        console.error("Tidak bisa mengurutkan, daftarFilmSaatIni bukan array.");
        if (kisiFilm) kisiFilm.innerHTML = "<p style='text-align:center;'>Gagal memuat data untuk diurutkan.</p>";
        return;
    }

    // Salin array sebelum diurutkan
    const daftarFilmTerurut = [...daftarFilmSaatIni].sort((a, b) => {
        // Penanganan jika properti tidak ada atau bukan angka (untuk rating, tahun, durasi)
        const valA_rating = parseFloat(a.rating);
        const valB_rating = parseFloat(b.rating);
        const valA_tahun = parseInt(a.tahun);
        const valB_tahun = parseInt(b.tahun);
        const valA_durasi = parseInt(a.durasi);
        const valB_durasi = parseInt(b.durasi);

        switch (berdasarkan) {
            case 'rating':
                return (isNaN(valB_rating) ? 0 : valB_rating) - (isNaN(valA_rating) ? 0 : valA_rating);
            case 'tahun':
                return (isNaN(valB_tahun) ? 0 : valB_tahun) - (isNaN(valA_tahun) ? 0 : valA_tahun);
            case 'durasi':
                return (isNaN(valB_durasi) ? 0 : valB_durasi) - (isNaN(valA_durasi) ? 0 : valA_durasi);
            case 'judul':
            default:
                return (a.judul || "").localeCompare(b.judul || "");
        }
    });

    renderSemuaFilm(daftarFilmTerurut);
}


// === Fungsi Render ===
function renderSemuaFilm(daftarFilmsUntukRender) { // Ganti nama parameter
    if (!kisiFilm) {
        // console.warn("Elemen kisiFilm tidak ditemukan saat renderSemuaFilm.");
        return;
    }

    sembunyikanStatusMemuat();

    if (!Array.isArray(daftarFilmsUntukRender) || daftarFilmsUntukRender.length === 0) {
        tampilkanTidakAdaHasil();
        return;
    }

    const htmlSemuaFilm = daftarFilmsUntukRender.map(film => buatKartuFilm(film)).join('');
    kisiFilm.innerHTML = htmlSemuaFilm;
    kisiFilm.style.display = 'grid';

    if (tidakAdaHasil) tidakAdaHasil.style.display = 'none';
    perbaruiTombolFavorit(); // Panggil di sini untuk update status favorit pada kartu yang baru dirender
}

function renderDetailSebuahFilm(film) {
    if (!film) {
        tampilkanFilmTidakDitemukan();
        return;
    }
    const pathDasarUntukAset = typeof AplikasiTix !== 'undefined' && typeof AplikasiTix.dapatkanPathDasar === 'function' ? AplikasiTix.dapatkanPathDasar() : dapatkanPathDasarLokal();
    const posterFilm = film.poster ? (film.poster.startsWith('http') ? film.poster : pathDasarUntukAset + film.poster.replace(/^\.?\//, '')) : `${pathDasarUntukAset}img/assets/poster-fallback.svg`;

    if (posterFilmDetail) {
        posterFilmDetail.src = posterFilm;
        posterFilmDetail.alt = `Poster ${film.judul || 'Tanpa Judul'}`;
    }
    if (judulFilmDetail) judulFilmDetail.textContent = film.judul || 'Judul Tidak Tersedia';
    if (ratingFilmDetail) ratingFilmDetail.textContent = film.rating || 'N/A';
    if (tahunFilmDetail) tahunFilmDetail.textContent = film.tahun || 'N/A';
    if (durasiFilmDetail) durasiFilmDetail.textContent = BantuanData.formatDurasi(film.durasi); // DIPERBAIKI
    if (genreFilmDetail) genreFilmDetail.textContent = Array.isArray(film.genre) ? film.genre.join(', ') : 'Genre tidak diketahui';
    if (sutradaraFilmDetail) sutradaraFilmDetail.textContent = film.sutradara || 'N/A';
    if (pemeranFilmDetail) pemeranFilmDetail.textContent = Array.isArray(film.pemeran) ? film.pemeran.slice(0, 3).join(', ') : 'Pemeran tidak diketahui';
    if (sinopsisFilmDetail) sinopsisFilmDetail.textContent = film.sinopsis || 'Sinopsis tidak tersedia.';

    const bagianHero = document.querySelector('.hero-film-detail');
    if (bagianHero) {
        const bgHero = bagianHero.querySelector('.bg-hero-film-detail');
        if (bgHero) {
            bgHero.style.backgroundImage = `url(${posterFilm})`;
        }
    }

    if (film.jadwal && Array.isArray(film.jadwal)) {
        renderJadwalTayang(film.jadwal);
    } else {
        if (wadahJadwalTayang) wadahJadwalTayang.innerHTML = "<p>Jadwal tayang tidak tersedia.</p>";
    }
    renderFilmSerupa(film);
    perbaruiTombolFavorit();

    sembunyikanStatusMemuat(true);
    if (kontenDetailFilm) kontenDetailFilm.style.display = 'block';
}

function renderJadwalTayang(jadwal) {
    if (!wadahJadwalTayang) return;
    if (!Array.isArray(jadwal) || jadwal.length === 0) {
        wadahJadwalTayang.innerHTML = "<p>Jadwal tayang tidak tersedia untuk film ini.</p>";
        return;
    }


    const htmlJadwalTayang = jadwal.map(itemJadwal => `
        <div class="item-jadwal">
            <div class="header-jadwal">
                <h4>${itemJadwal.bioskop}</h4>
                <p class="tanggal-jadwal">${BantuanData.formatTanggal(itemJadwal.tanggal)}</p> 
            </div>
            <div class="slot-waktu-jadwal">
                ${Array.isArray(itemJadwal.jam) ? itemJadwal.jam.map(jam => `
                    <button class="slot-waktu" onclick="pilihJadwalTayang('${itemJadwal.bioskop}', '${itemJadwal.tanggal}', '${jam}', event)">
    ${jam}
</button>
                `).join('') : '<p>Jam tidak tersedia</p>'}
            </div>
        </div>
    `).join('');

    wadahJadwalTayang.innerHTML = htmlJadwalTayang;
}

function renderFilmSerupa(filmSaatIni) {
    if (!kisiFilmTerkait) return;
    if (typeof BantuanData === 'undefined' || typeof BantuanData.dapatkanSemuaFilm !== 'function') {
        console.error("BantuanData.dapatkanSemuaFilm tidak terdefinisi untuk film serupa!");
        kisiFilmTerkait.innerHTML = "<p>Gagal memuat film serupa.</p>";
        return;
    }

    const daftarFilmSerupa = BantuanData.dapatkanSemuaFilm() // DIPERBAIKI
        .filter(film =>
            film.id !== filmSaatIni.id &&
            Array.isArray(film.genre) && Array.isArray(filmSaatIni.genre) && // Pastikan keduanya array
            film.genre.some(genre => filmSaatIni.genre.includes(genre))
        )
        .slice(0, 4);

    if (daftarFilmSerupa.length > 0) {
        const htmlFilmSerupa = daftarFilmSerupa.map(film => buatKartuFilm(film)).join('');
        kisiFilmTerkait.innerHTML = htmlFilmSerupa;
    } else {
        kisiFilmTerkait.innerHTML = "<p>Tidak ada film serupa yang ditemukan.</p>";
    }
}



// === Event Handlers ===
function pilihJadwalTayang(bioskop, tanggal, jam, eventObj) {
    const idFilm = dapatkanParameterUrl('id'); // Mengambil ID film dari URL halaman detail
    

    // Pastikan idFilm didapatkan sebelum melanjutkan
    if (!idFilm) {
        console.error("ID Film tidak ditemukan di URL untuk booking.");
        tampilkanNotifikasi("Gagal melanjutkan pemesanan, ID film tidak ditemukan.");
        return; // Hentikan eksekusi jika idFilm tidak ada
    }

    const dataJadwalTerpilih = {
        idFilm: idFilm,
        bioskop: bioskop,
        tanggal: tanggal,
        jam: jam
    };

    // Simpan jadwal yang dipilih ke sessionStorage
    sessionStorage.setItem('jadwalTerpilih', JSON.stringify(dataJadwalTerpilih));

    // Tampilkan notifikasi bahwa jadwal telah dipilih
    tampilkanNotifikasi(`Jadwal dipilih: ${bioskop} - ${BantuanData.formatTanggal(tanggal)} ${jam}`);

    // Hapus kelas 'terpilih' dari semua slot waktu sebelumnya
    document.querySelectorAll('.slot-waktu.terpilih').forEach(slot => {
        slot.classList.remove('terpilih');
    });

    // Tambahkan kelas 'terpilih' ke slot waktu yang baru diklik
    if (eventObj && eventObj.target) {
        eventObj.target.classList.add('terpilih');
    }

    // Tentukan path ke halaman booking.
    // Asumsi: detail-film.html ada di dalam folder (misal /film/), dan folder booking sejajar.
    const pathKeBooking = `../booking/seat.html`; // Sesuaikan path ini jika struktur folder Anda berbeda

    // Buat URL untuk halaman booking dengan parameter yang diperlukan
    const urlBooking = `${pathKeBooking}?filmId=${idFilm}&bioskop=${encodeURIComponent(bioskop)}&tanggal=${tanggal}&jam=${encodeURIComponent(jam)}`;

    // (Untuk Debugging) Tampilkan URL yang akan dituju di konsol
    console.log("Mengarahkan ke:", urlBooking);

    // Arahkan pengguna ke halaman booking
    window.location.href = urlBooking;
}
function bukaModalTrailer(urlTrailer) {
    console.log("Fungsi bukaModalTrailer dipanggil dengan URL:", urlTrailer);

    // Pastikan ini adalah variabel yang benar merujuk ke elemen modal dan iframe Anda
    // const modalTrailer = document.getElementById('modalTrailer');
    // const videoTrailerIframe = document.getElementById('videoTrailerIframe');

    console.log("Elemen modalTrailer yang ditemukan:", modalTrailer);
    console.log("Elemen videoTrailerIframe yang ditemukan:", videoTrailerIframe);


    if (!modalTrailer || !videoTrailerIframe) { // Menggunakan videoTrailerIframe
        console.error("Elemen modalTrailer atau videoTrailerIframe TIDAK ditemukan di DOM saat fungsi dijalankan!");
        return;
    }

    let idVideo = '';
    try {
        const urlObj = new URL(urlTrailer);
        if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
            idVideo = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
        }
    } catch (e) {
        console.error("URL Trailer tidak valid atau gagal diproses:", e, "URL Asli:", urlTrailer);
    }

    console.log("ID Video YouTube yang diekstrak:", idVideo);

    if (idVideo) {
        const urlEmbed = `https://www.youtube-nocookie.com/embed/${idVideo}?autoplay=1&rel=0&modestbranding=1`;
        console.log("URL Embed yang akan diset:", urlEmbed);
        videoTrailerIframe.src = urlEmbed; // Menggunakan videoTrailerIframe
        modalTrailer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log("Modal trailer seharusnya sudah tampil sekarang.");
    } else {
        tampilkanNotifikasi('Format URL trailer tidak valid atau tidak didukung.');
        console.warn("Tidak ada ID video yang bisa diekstrak dari URL atau idVideo kosong:", urlTrailer);
    }
}
// di film.js
function tutupModalTrailer() {
    console.log("Tombol tutup modal trailer DIKLIK! atau Escape ditekan."); // DEBUG
    if (!modalTrailer || !videoTrailerIframe) {
        console.error("Elemen modalTrailer atau videoTrailerIframe tidak ditemukan saat tutupModalTrailer.");
        return;
    }
    videoTrailerIframe.src = ''; // Hentikan video
    
    // Karena CSS Anda saat ini untuk .modal sepertinya mengandalkan JS untuk display:
    modalTrailer.style.display = 'none'; 
    // Jika Anda sudah menerapkan CSS dengan kelas .aktif untuk show/hide modal, gunakan baris ini:
    // modalTrailer.classList.remove('aktif');

    document.body.style.overflow = 'auto';
    console.log("Modal trailer seharusnya tersembunyi sekarang.");
}


// === Fungsi Inisialisasi ===
function inisialisasiHalamanDaftarFilm() {
    if (tombolTabFilter && tombolTabFilter.length > 0) {
        tombolTabFilter.forEach(tombol => {
            tombol.addEventListener('click', () => {
                tombolTabFilter.forEach(tab => tab.classList.remove('aktif'));
                tombol.classList.add('aktif');
                const statusFilter = tombol.dataset.status || 'semua';
                filterDaftarFilm(statusFilter);
            });
        });
    }

    if (tombolCari && inputPencarianFilm) {
        tombolCari.addEventListener('click', () => {
            const keyword = inputPencarianFilm.value;
            cariJudulFilm(keyword);
        });
        inputPencarianFilm.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const keyword = inputPencarianFilm.value;
                cariJudulFilm(keyword);
            }
        });
        let timeoutPencarian;
        inputPencarianFilm.addEventListener('input', (e) => {
            clearTimeout(timeoutPencarian);
            timeoutPencarian = setTimeout(() => {
                const keyword = e.target.value;
                cariJudulFilm(keyword);
            }, 500);
        });
    }

    if (pilihanUrutan) {
        pilihanUrutan.addEventListener('change', (e) => {
            urutkanDaftarFilm(e.target.value);
        });
    }

    tampilkanStatusMemuat();
    // Pastikan data film sudah tersedia sebelum memfilter
    // Ini lebih baik jika data film dimuat secara asinkron atau ada penundaan
    if (typeof BantuanData !== 'undefined' && typeof BantuanData.dapatkanSemuaFilm === 'function') {
        filterDaftarFilm('semua'); // Muat semua film secara default
    } else {
        // console.error("BantuanData atau BantuanData.dapatkanSemuaFilm belum siap saat inisialisasi.");
        // Tampilkan pesan error atau coba lagi nanti
        setTimeout(() => { // Coba lagi setelah delay, sebagai fallback
            if (typeof BantuanData !== 'undefined' && typeof BantuanData.dapatkanSemuaFilm === 'function') {
                filterDaftarFilm('semua');
            } else if (kisiFilm) {
                kisiFilm.innerHTML = "<p style='text-align:center;'>Gagal memuat data film awal.</p>";
                sembunyikanStatusMemuat();
            }
        }, 500);
    }
}

function inisialisasiHalamanDetailFilm() {
    console.log("inisialisasiHalamanDetailFilm dijalankan."); // DEBUG

    const idFilmString = dapatkanParameterUrl('id');
    console.log("ID Film dari URL (string):", idFilmString); // DEBUG

    if (!idFilmString) {
        console.warn("ID Film tidak ditemukan di URL."); // DEBUG
        tampilkanFilmTidakDitemukan();
        return;
    }
    const idFilm = parseInt(idFilmString);
    console.log("ID Film dikonversi ke integer:", idFilm); // DEBUG

    if (isNaN(idFilm)) {
        console.warn("ID Film tidak valid (NaN)."); // DEBUG
        tampilkanFilmTidakDitemukan();
        return;
    }

    tampilkanStatusMemuat(true);

    // Simulasi delay untuk pengambilan data (atau proses asinkron lainnya)
    setTimeout(() => {
        console.log("Timeout untuk ambil data film dimulai."); // DEBUG
        if (typeof BantuanData === 'undefined' || typeof BantuanData.dapatkanFilmBerdasarkanId !== 'function') {
            console.error("BantuanData atau BantuanData.dapatkanFilmBerdasarkanId tidak terdefinisi!");
            tampilkanFilmTidakDitemukan();
            return;
        }
        const film = BantuanData.dapatkanFilmBerdasarkanId(idFilm);
        console.log("Data Film yang ditemukan oleh BantuanData:", film); // DEBUG
        renderDetailSebuahFilm(film); // Fungsi ini akan mengisi detail dan juga memanggil sembunyikanStatusMemuat(true)
        console.log("renderDetailSebuahFilm seharusnya sudah dipanggil."); // DEBUG
    }, 300);

    // Pastikan variabel tombolTontonTrailer, tombolTambahFavorit, tombolTutupModalTrailer, dan modalTrailer
    // sudah didefinisikan di scope global film.js dan mengambil elemen dari DOM, contoh:
    // const tombolTontonTrailer = document.getElementById('tombolTontonTrailer');
    // const modalTrailer = document.getElementById('modalTrailer');
    // dst.

    console.log("Mencoba mencari elemen tombolTontonTrailer:", tombolTontonTrailer); // DEBUG - Cek apakah variabel global ini ada isinya
    if (tombolTontonTrailer) {
        tombolTontonTrailer.addEventListener('click', () => {
            console.log("Tombol Tonton Trailer DIKLIK!"); // DEBUG
            if (typeof BantuanData === 'undefined' || typeof BantuanData.dapatkanFilmBerdasarkanId !== 'function') {
                console.error("BantuanData atau BantuanData.dapatkanFilmBerdasarkanId tidak terdefinisi saat tombol trailer diklik.");
                return;
            }
            // Ambil ulang data film berdasarkan idFilm yang sudah ada di scope fungsi ini
            const film = BantuanData.dapatkanFilmBerdasarkanId(idFilm);
            console.log("Data Film (saat tombol trailer diklik):", film); // DEBUG

            if (film && film.trailer) {
                console.log("URL Trailer yang akan dibuka:", film.trailer); // DEBUG
                bukaModalTrailer(film.trailer);
            } else {
                console.warn("Trailer tidak tersedia atau film tidak ditemukan saat tombol diklik."); // DEBUG
                tampilkanNotifikasi('Trailer tidak tersedia untuk film ini.');
            }
        });
    } else {
        console.warn("Elemen tombolTontonTrailer tidak ditemukan di DOM atau variabelnya null."); // DEBUG
    }

    console.log("Mencoba mencari elemen tombolTambahFavorit:", tombolTambahFavorit); // DEBUG
    if (tombolTambahFavorit) {
        tombolTambahFavorit.addEventListener('click', () => {
            console.log("Tombol Tambah Favorit diklik untuk film ID:", idFilm); // DEBUG
            toggleFilmFavorit(idFilm, tombolTambahFavorit);
        });
    } else {
        console.warn("Elemen tombolTambahFavorit tidak ditemukan di DOM atau variabelnya null."); // DEBUG
    }

    console.log("Mencoba mencari elemen tombolTutupModalTrailer:", tombolTutupModalTrailer); // DEBUG
    if (tombolTutupModalTrailer) {
        tombolTutupModalTrailer.addEventListener('click', () => {
            console.log("Tombol Tutup Modal Trailer diklik."); // DEBUG
            tutupModalTrailer();
        });
    } else {
        console.warn("Elemen tombolTutupModalTrailer tidak ditemukan di DOM atau variabelnya null."); // DEBUG
    }

    console.log("Mencoba mencari elemen modalTrailer:", modalTrailer); // DEBUG
    if (modalTrailer) {
        modalTrailer.addEventListener('click', (e) => {
            if (e.target === modalTrailer) { // Jika klik dilakukan pada area luar konten modal
                console.log("Area luar modal trailer diklik, modal ditutup."); // DEBUG
                tutupModalTrailer();
            }
        });
    } else {
        console.warn("Elemen modalTrailer tidak ditemukan di DOM atau variabelnya null."); // DEBUG
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalTrailer && modalTrailer.style.display === 'flex') {
            console.log("Tombol Escape ditekan, modal trailer ditutup."); // DEBUG
            tutupModalTrailer();
        }
    });

    console.log("inisialisasiHalamanDetailFilm selesai."); // DEBUG
}

// Deteksi halaman dan inisialisasi yang sesuai
function inisialisasiLogikaFilm() {
    const pathHalamanSaatIni = window.location.pathname;
    const namaFileHalaman = pathHalamanSaatIni.substring(pathHalamanSaatIni.lastIndexOf('/') + 1);

    // Penyesuaian path untuk `main.js` agar bisa memuat data berita jika ada di index.html
    // Di sini kita fokus pada logika film.js
    // Pastikan variabel data global (dataSemuaFilm, dataSemuaBerita) sudah tersedia dari data.js

    if (namaFileHalaman.includes('list-film.html')) {
        inisialisasiHalamanDaftarFilm();
    } else if (namaFileHalaman.includes('detail-film.html')) {
        inisialisasiHalamanDetailFilm();
    }

    // Logika berita dipindahkan atau dipastikan tidak dieksekusi jika tidak di halaman berita.
    // Jika `newsData` didefinisikan di `data.js`, maka variabel globalnya adalah `dataSemuaBerita`.
    // Dan fungsi render berita mungkin lebih baik ada di `news.js` atau `main.js` jika bersifat umum.

    if (namaFileHalaman.includes('news.html') || pathHalamanSaatIni.endsWith('/news/')) { // Contoh halaman daftar berita
        const wadahBeritaDaftar = document.getElementById('wadah-berita-daftar'); // ID dari HTML halaman daftar berita
        if (wadahBeritaDaftar && typeof dataSemuaBerita !== 'undefined') {
            renderDaftarBerita(dataSemuaBerita);
        } else if (wadahBeritaDaftar) {
            // console.warn("Variabel 'dataSemuaBerita' atau wadah tidak ditemukan untuk daftar berita.");
        }
    } else if (namaFileHalaman.includes('news-detail.html')) { // Contoh halaman detail berita
        const wadahDetailBerita = document.getElementById('wadah-detail-berita'); // ID dari HTML halaman detail berita
        if (wadahDetailBerita && typeof dataSemuaBerita !== 'undefined') {
            renderDetailBerita(dataSemuaBerita);
        } else if (wadahDetailBerita) {
            // console.warn("Variabel 'dataSemuaBerita' atau wadah tidak ditemukan untuk detail berita.");
        }
    }
    // Pemanggilan renderBeritaDashboard sebaiknya dilakukan di main.js atau dashboard.js
    // jika #kisi-berita ada di index.html yang dikontrol oleh main.js
}

// Ekspos fungsi ke global scope jika dipanggil dari HTML (onclick)
window.navigasiKeDetailFilm = navigasiKeDetailFilm;
window.toggleFilmFavorit = toggleFilmFavorit;
window.pilihJadwalTayang = pilihJadwalTayang;
// Fungsi berita diekspos jika memang dipanggil dari HTML yang dirender oleh film.js
window.navigasiKeDetailBerita = navigasiKeDetailBerita;
window.bagikanBerita = bagikanBerita;
window.sukaiBerita = sukaiBerita;
window.filterBeritaBerdasarkanKategori = filterBeritaBerdasarkanKategori;


document.addEventListener('DOMContentLoaded', () => {
    // Panggil perbaruiTombolFavorit sekali di awal untuk halaman daftar film
    // agar status favorit pada kartu film langsung terupdate saat halaman dimuat.
    const pathHalamanSaatIni = window.location.pathname;
    const namaFileHalaman = pathHalamanSaatIni.substring(pathHalamanSaatIni.lastIndexOf('/') + 1);
    if (namaFileHalaman.includes('list-film.html')) {
        perbaruiTombolFavorit();
    }

    inisialisasiLogikaFilm();
});


// === Fungsi-fungsi Berita ===
// (Sebaiknya dipindah ke news.js atau main.js jika umum, atau hanya ada jika halaman berita aktif)

function renderDaftarBerita(dataBerita) {
    const wadahBerita = document.getElementById('wadah-berita-daftar');
    if (!wadahBerita) return;
    let htmlBerita = '';
    dataBerita.forEach(berita => {
        htmlBerita += `
            <article class="item-berita" onclick="navigasiKeDetailBerita(${berita.id})">
                <div class="gambar-berita"><img src="${berita.gambar}" alt="${berita.judul}" loading="lazy"><span class="tag-kategori">${berita.kategori}</span></div>
                <div class="konten-berita">
                    <h3 class="judul-berita">${berita.judul}</h3><p class="ringkasan-berita">${berita.ringkasan}</p>
                    <div class="meta-berita"><div class="statistik-berita"><span class="dilihat">👁️ ${berita.jumlahDilihat}</span><span class="disukai">❤️ ${berita.jumlahSuka}</span></div><span class="waktu-unggah">${berita.waktuUnggah}</span></div>
                </div>
            </article>`;
    });
    wadahBerita.innerHTML = htmlBerita;
}

function renderDetailBerita(dataSeluruhBerita) { // Parameter diubah agar jelas
    const parameterUrl = new URLSearchParams(window.location.search);
    const idBeritaTarget = parseInt(parameterUrl.get('id'));
    if (isNaN(idBeritaTarget)) { document.body.innerHTML = '<h1>ID Berita tidak valid</h1>'; return; }

    const berita = dataSeluruhBerita.find(item => item.id === idBeritaTarget);

    if (!berita) { document.body.innerHTML = '<h1>Berita tidak ditemukan</h1>'; return; }
    document.title = `${berita.judul} - TIX Now`; // Asumsi nama portal berita

    const wadahDetail = document.getElementById('wadah-detail-berita');
    if (!wadahDetail) return;

    wadahDetail.innerHTML = `
        <article class="detail-berita">
            <div class="header-detail-berita">
                <div class="breadcrumb-berita"><a href="news.html">← Kembali ke Semua Berita</a></div>
                <span class="tag-kategori">${berita.kategori}</span>
                <h1 class="judul-detail-berita">${berita.judul}</h1>
                <div class="info-detail-berita">
                    <span class="penulis">Oleh ${berita.penulis}</span><span class="tanggal-publikasi">${berita.tanggalPublikasi}</span>
                    <div class="statistik-berita"><span class="dilihat">👁️ ${berita.jumlahDilihat}</span><span class="disukai">❤️ ${berita.jumlahSuka}</span></div>
                </div>
            </div>
            <div class="gambar-detail-berita"><img src="${berita.gambar}" alt="${berita.judul}"></div>
            <div class="konten-lengkap-berita">
                ${berita.konten.split('\n\n').map(paragraf => `<p>${paragraf.trim()}</p>`).join('')}
            </div>
            <div class="footer-detail-berita">
                <div class="tombol-aksi-berita">
                    <button onclick="bagikanBerita('${berita.judul}')">📤 Bagikan</button>
                    <button onclick="sukaiBerita(${berita.id})">❤️ Suka</button>
                </div>
            </div>
        </article>
        <section class="berita-terkait">
            <h3>Berita Terkait Lainnya</h3>
            <div id="wadah-berita-terkait"></div>
        </section>`;
    renderBeritaTerkait(berita.id, berita.kategori, dataSeluruhBerita);
}

function renderBeritaTerkait(idBeritaSaatIni, kategori, dataSeluruhBerita) {
    const wadahTerkait = document.getElementById('wadah-berita-terkait');
    if (!wadahTerkait) return;
    const daftarBeritaTerkait = dataSeluruhBerita
        .filter(b => b.id !== idBeritaSaatIni && b.kategori === kategori)
        .slice(0, 3);
    let htmlTerkait = '';
    daftarBeritaTerkait.forEach(b => {
        htmlTerkait += `
            <div class="item-terkait" onclick="navigasiKeDetailBerita(${b.id})">
                <img src="${b.gambar}" alt="${b.judul}" class="gambar-terkait">
                <div class="konten-terkait"><h4>${b.judul}</h4><span class="waktu-unggah">${b.waktuUnggah}</span></div>
            </div>`;
    });
    wadahTerkait.innerHTML = htmlTerkait || '<p>Tidak ada berita terkait untuk kategori ini.</p>';
}

function navigasiKeDetailBerita(idBerita) { // Pastikan path ini benar dari lokasi film.js atau halaman yg memanggilnya
    // Jika news-detail.html ada di PROYEK-AKHIR-DPW2/news/news-detail.html
    // dan film.js ada di PROYEK-AKHIR-DPW2/js/film.js
    // Jika dipanggil dari PROYEK-AKHIR-DPW2/film/list-film.html, pathnya: ../news/news-detail.html
    // Jika dipanggil dari PROYEK-AKHIR-DPW2/index.html, pathnya: news/news-detail.html
    const pathDasarAplikasi = typeof AplikasiTix !== 'undefined' && typeof AplikasiTix.dapatkanPathDasar === 'function' ? AplikasiTix.dapatkanPathDasar() : dapatkanPathDasarLokal();
    window.location.href = `${pathDasarAplikasi}news/news-detail.html?id=${idBerita}`;
}

function bagikanBerita(judulBerita) {
    if (navigator.share) {
        navigator.share({ title: judulBerita, url: window.location.href })
            .catch(error => console.log('Gagal berbagi:', error));
    } else {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Tautan berhasil disalin ke clipboard!'))
            .catch(() => alert('Gagal menyalin tautan.'));
    }
}

function sukaiBerita(idBerita) {
    tampilkanNotifikasi('Terima kasih sudah menyukai berita ini!');
    // Logika update jumlah suka (misal, kirim ke server atau update localStorage)
}

function renderBeritaDashboard(dataSemuaBeritaGlobal, jumlahItem = 3) {
    const wadahGridBerita = document.getElementById('kisi-berita');
    if (!wadahGridBerita) return;
    if (!Array.isArray(dataSemuaBeritaGlobal)) {
        // console.error("Data berita untuk dashboard tidak valid.");
        wadahGridBerita.innerHTML = "<p>Gagal memuat data berita.</p>";
        return;
    }
    const beritaUntukDashboard = dataSemuaBeritaGlobal.slice(0, jumlahItem);
    let htmlBerita = '';
    const pathDasarAplikasi = typeof AplikasiTix !== 'undefined' && typeof AplikasiTix.dapatkanPathDasar === 'function' ? AplikasiTix.dapatkanPathDasar() : dapatkanPathDasarLokal();

    beritaUntukDashboard.forEach(berita => {
        const gambarBerita = berita.gambar ? (berita.gambar.startsWith('http') ? berita.gambar : pathDasarAplikasi + berita.gambar.replace(/^\.?\//, '')) : `${pathDasarAplikasi}img/assets/image-fallback.svg`;
        htmlBerita += `
            <div class="item-berita" onclick="navigasiKeDetailBerita(${berita.id})">
                <div class="gambar-berita">
                    <img src="${gambarBerita}" alt="${berita.judul || 'Tanpa Judul'}" loading="lazy" onerror="this.onerror=null; this.src='${pathDasarAplikasi}img/assets/image-fallback.svg';">
                    <span class="tag-kategori">${berita.kategori || ''}</span>
                </div>
                <div class="konten-berita">
                    <h3 class="judul-berita">${berita.judul || 'Judul Tidak Tersedia'}</h3>
                    <div class="meta-berita"><span class="waktu-unggah">${berita.waktuUnggah || ''}</span></div>
                </div>
            </div>`;
    });
    wadahGridBerita.innerHTML = htmlBerita;
}

function filterBeritaBerdasarkanKategori(kategori) {
    // Pastikan dataSemuaBerita tersedia (global dari data.js)
    if (typeof dataSemuaBerita === 'undefined') {
        console.error("dataSemuaBerita tidak terdefinisi untuk filter kategori.");
        return;
    }
    const beritaTerfilter = kategori === 'semua' ?
        dataSemuaBerita : dataSemuaBerita.filter(berita => berita.kategori === kategori);
    renderDaftarBerita(beritaTerfilter);

    const tombolKategori = document.querySelectorAll('.tombol-filter-kategori');
    tombolKategori.forEach(tombol => {
        tombol.classList.remove('aktif');
        if (tombol.dataset.kategori === kategori) {
            tombol.classList.add('aktif');
        }
    });
}