class DaftarBioskop {
    constructor() {
        this.pilihKota = document.getElementById('citySelect');
        this.daftarBioskop = document.getElementById('cinemaList');
        this.itemBioskop = document.getElementById('cinemaItems');
        this.kotaTerpilih = document.getElementById('selectedCity'); 
        this.judulDaftarBioskop = document.getElementById('cinemaListTitle');

        if (!this.pilihKota || !this.daftarBioskop || !this.itemBioskop || !this.kotaTerpilih) {
            console.error("Satu atau lebih elemen DOM penting untuk DaftarBioskop tidak ditemukan.");
            return;
        }
        this.inisialisasi();
    }

    inisialisasi() {
        this.isiPilihanKota();
        this.kaitkanEvent();
        this.periksaParameterUrl();
    }

    isiPilihanKota() {
        // Pastikan data daftarKotaTersedia ada dari data.js
        if (typeof daftarKotaTersedia === 'undefined') {
            console.error("Variabel 'daftarKotaTersedia' tidak ditemukan. Pastikan data.js sudah dimuat.");
            this.pilihKota.innerHTML = '<option value="">Gagal memuat kota</option>';
            return;
        }

        this.pilihKota.innerHTML = '<option value="">-- Pilih Kota --</option>';
        
        Object.keys(daftarKotaTersedia).forEach(kunciKota => { 
            const opsi = document.createElement('option');
            opsi.value = kunciKota;
            opsi.textContent = daftarKotaTersedia[kunciKota]; 
            this.pilihKota.appendChild(opsi);
        });
    }

    kaitkanEvent() {
        this.pilihKota.addEventListener('change', (e) => {
            const kunciKotaTerpilih = e.target.value;
            if (kunciKotaTerpilih) {
                this.tampilkanBioskop(kunciKotaTerpilih);
                this.perbaruiUrl(kunciKotaTerpilih);
            } else {
                this.sembunyikanDaftarBioskop();
                this.hapusUrl();
            }
        });
    }

    periksaParameterUrl() {
        if (typeof daftarKotaTersedia === 'undefined') return;

        const parameterUrl = new URLSearchParams(window.location.search);
        const paramKota = parameterUrl.get('kota');
        
        if (paramKota && daftarKotaTersedia[paramKota]) { // Menggunakan daftarKotaTersedia
            this.pilihKota.value = paramKota;
            this.tampilkanBioskop(paramKota);
        }
    }

    perbaruiUrl(kunciKota) {
        const urlBaru = `${window.location.pathname}?kota=${kunciKota}`;
        window.history.pushState({ city: kunciKota }, '', urlBaru);
    }

    hapusUrl() {
        window.history.pushState({}, '', window.location.pathname);
    }

    tampilkanBioskop(kunciKota) {
        if (typeof daftarKotaTersedia === 'undefined' || typeof dataBioskopPerKota === 'undefined') {
            console.error("Data kota atau bioskop tidak ditemukan.");
            this.tampilkanTidakAdaBioskop("Kota Pilihan");
            return;
        }

        const namaKota = daftarKotaTersedia[kunciKota] || kunciKota; 
        const daftarBioskop = dataBioskopPerKota[kunciKota] || []; 

        this.kotaTerpilih.textContent = namaKota;         
        this.tampilkanMemuat();
                setTimeout(() => { 
            if (daftarBioskop.length > 0) {
                this.renderBioskop(daftarBioskop);
            } else {
                this.tampilkanTidakAdaBioskop(namaKota);
            }
            this.daftarBioskop.style.display = 'block';
        }, 300); 
    }

    tampilkanMemuat() {
        this.itemBioskop.innerHTML = `
            <div class="loading-bioskop"> <i class="fas fa-spinner fa-spin"></i> <p>Memuat daftar bioskop...</p>
            </div>
        `;
        this.daftarBioskop.style.display = 'block'; 
    }

    renderBioskop(daftarBioskop) {
        let html = '';
        daftarBioskop.forEach(bioskop => {
            html += this.buatItemBioskop(bioskop);
        });
        this.itemBioskop.innerHTML = html;
        this.kaitkanEventKlikBioskop();
    }

    buatItemBioskop(bioskop) {
        return `
            <a href="detailbioskop.html?id=${bioskop.id}" 
               class="item-bioskop" 
               data-cinema-id="${bioskop.id}"
               data-cinema-name="${bioskop.nama || 'Nama Tidak Diketahui'}">
                <div class="info-bioskop">
                    <h3 class="nama-bioskop">${bioskop.nama || 'Nama Tidak Diketahui'}</h3>
                    ${bioskop.alamat ? `<p class="alamat-bioskop">${bioskop.alamat}</p>` : ''}
                </div>
                <div class="panah-bioskop">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </a>
        `;
    }

    kaitkanEventKlikBioskop() {
        const itemBioskop = document.querySelectorAll('.item-bioskop'); 
        itemBioskop.forEach(item => {
            item.addEventListener('click', (e) => {
                const idBioskop = item.dataset.cinemaId;
                const namaBioskop = item.dataset.cinemaName;
                
                console.log(`Bioskop diklik: ${namaBioskop} (ID: ${idBioskop})`);
                this.lacakKlikBioskop(idBioskop, namaBioskop);
            });
        });
    }

    lacakKlikBioskop(idBioskop, namaBioskop) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'bioskop_diklik', { 
                'id_bioskop': idBioskop,
                'nama_bioskop': namaBioskop
            });
        }
    }

    tampilkanTidakAdaBioskop(namaKota) {
        this.itemBioskop.innerHTML = `
            <div class="pesan-tidak-ada-bioskop"> <i class="fas fa-store-slash"></i> <p>Tidak ada bioskop yang terdaftar di ${namaKota}</p>
                <p>Silakan pilih kota lain.</p>
            </div>
        `;
    }

    sembunyikanDaftarBioskop() {
        this.daftarBioskop.style.display = 'none';
        this.kotaTerpilih.textContent = ''; 
    }

    dapatkanBioskopBerdasarkanId(idBioskop) {
        if (typeof dataBioskopPerKota === 'undefined') return null;
        for (let kunciKota in dataBioskopPerKota) {
            if (dataBioskopPerKota.hasOwnProperty(kunciKota)) {
                const bioskop = dataBioskopPerKota[kunciKota].find(b => String(b.id) === String(idBioskop)); 
                if (bioskop) return bioskop;
            }
        }
        return null;
    }

    dapatkanBioskopBerdasarkanKota(kunciKota) {
        if (typeof dataBioskopPerKota === 'undefined') return [];
        return dataBioskopPerKota[kunciKota] || []; 
    }

    cariBioskop(kueri, kunciKota = null) {
        if (typeof dataBioskopPerKota === 'undefined') return [];

        let hasil = [];
        const istilahPencarian = kueri.toLowerCase();
        
        if (kunciKota) {
            const daftarBioskop = dataBioskopPerKota[kunciKota] || [];
            hasil = daftarBioskop.filter(bioskop => 
                bioskop.nama && bioskop.nama.toLowerCase().includes(istilahPencarian)
            );
        } else {
            Object.keys(dataBioskopPerKota).forEach(kota => { 
                const yangCocok = (dataBioskopPerKota[kota] || []).filter(bioskop =>
                    bioskop.nama && bioskop.nama.toLowerCase().includes(istilahPencarian)
                );
                hasil = hasil.concat(yangCocok);
            });
        }
        return hasil;
    }
}

const BantuanBioskop = {
    formatSlugBioskop(namaBioskop) {
        if (!namaBioskop) return '';
        return namaBioskop.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    },

    apakahIdBioskopValid(idBioskop) {
        if (window.daftarBioskop && typeof window.daftarBioskop.dapatkanBioskopBerdasarkanId === 'function') {
            return window.daftarBioskop.dapatkanBioskopBerdasarkanId(idBioskop) !== null;
        }
        if (typeof dataBioskopPerKota !== 'undefined') {
             for (let kunciKota in dataBioskopPerKota) {
                 if (dataBioskopPerKota.hasOwnProperty(kunciKota)) {
                     if (dataBioskopPerKota[kunciKota].find(b => String(b.id) === String(idBioskop))) return true;
                 }
             }
        }
        return false;
    },

    dapatkanBioskopAcak(jumlah = 3) {
        if (typeof dataBioskopPerKota === 'undefined') return [];
        const semuaBioskop = [];
        Object.keys(dataBioskopPerKota).forEach(kota => { 
            semuaBioskop.push(...(dataBioskopPerKota[kota] || []));
        });        
        if (semuaBioskop.length === 0) return [];
        const teracak = semuaBioskop.sort(() => 0.5 - Math.random());
        return teracak.slice(0, jumlah);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('citySelect')) { 
        window.daftarBioskop = new DaftarBioskop();
    } else {
        console.warn("Elemen #citySelect tidak ditemukan, DaftarBioskop tidak diinisialisasi.");
    }
});

window.addEventListener('popstate', (event) => {
    if (window.daftarBioskop && event.state) {
        if (event.state.city && typeof daftarKotaTersedia !== 'undefined' && daftarKotaTersedia[event.state.city]) {
            window.daftarBioskop.pilihKota.value = event.state.city;
            window.daftarBioskop.tampilkanBioskop(event.state.city);
        } else if (!event.state.city) { 
            window.daftarBioskop.pilihKota.value = "";
            window.daftarBioskop.sembunyikanDaftarBioskop();
        }
    } else if (window.daftarBioskop && !event.state) { 
       window.daftarBioskop.pilihKota.value = "";
       window.daftarBioskop.sembunyikanDaftarBioskop();
       window.daftarBioskop.hapusUrl(); 
    }
});