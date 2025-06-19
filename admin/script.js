document.addEventListener('DOMContentLoaded', () => {
    let films = [ { id: 1, title: "Agak Laen", synopsis: "Empat sekawan penjaga rumah hantu...", posterUrl: "https://upload.wikimedia.org/wikipedia/id/1/15/Agak_Laen_poster.jpg", duration: 119, status: "Sedang Tayang" } ];
    let makanan = [ { id: 1, nama: "Popcorn Caramel", kategori: "Makanan", harga: 50000, imgUrl: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2021/10/27042528/Ini-Resep-Popcorn-Caramel-ala-Bioskop-yang-Bisa-Dicoba-di-Rumah.jpg" } ];
    let berita = [ { id: 1, judul: "Promo Beli 1 Gratis 1 Tiket!", konten: "Nikmati promo spesial...", tanggal: "2025-06-12" } ];

    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;

            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            contentSections.forEach(section => {
                if (section.id === `${targetId}-section`) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    function openModal(modalId) { document.getElementById(modalId).classList.add('show'); }
    function closeModal(modalId) { document.getElementById(modalId).classList.remove('show'); }

    closeButtons.forEach(btn => btn.addEventListener('click', () => closeModal(btn.dataset.modal)));
    window.addEventListener('click', (e) => { modals.forEach(modal => { if (e.target == modal) { closeModal(modal.id); } }); });

    const filmTableBody = document.getElementById('film-table-body');
    const addFilmBtn = document.getElementById('add-film-btn');
    const filmForm = document.getElementById('film-form');
    
    function renderFilmTable() {
        filmTableBody.innerHTML = '';
        films.forEach((film, index) => {
            filmTableBody.innerHTML += `<tr><td>${index+1}</td><td><img src="${film.posterUrl}"></td><td>${film.title}</td><td>${film.duration} min</td><td>${film.status}</td><td><button class="action-btn edit-btn" data-id="${film.id}" data-type="film">Edit</button><button class="action-btn delete-btn" data-id="${film.id}" data-type="film">Hapus</button></td></tr>`;
        });
    }

    addFilmBtn.addEventListener('click', () => {
        document.getElementById('film-modal-title').textContent = "Tambah Film Baru";
        filmForm.reset();
        document.getElementById('film-id').value = '';
        openModal('film-modal');
    });

    filmForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('film-id').value;
        const data = { title: document.getElementById('film-title').value, synopsis: document.getElementById('film-synopsis').value, posterUrl: document.getElementById('film-posterUrl').value, duration: parseInt(document.getElementById('film-duration').value), status: document.getElementById('film-status').value };
        if (id) {
            const index = films.findIndex(f => f.id == id);
            films[index] = { id: parseInt(id), ...data };
        } else {
            const newId = films.length > 0 ? Math.max(...films.map(f => f.id)) + 1 : 1;
            films.push({ id: newId, ...data });
        }
        alert('Data film berhasil disimpan!');
        closeModal('film-modal');
        renderFilmTable();
    });

    const makananTableBody = document.getElementById('makanan-table-body');
    const addMakananBtn = document.getElementById('add-makanan-btn');
    const makananForm = document.getElementById('makanan-form');

    function renderMakananTable() {
        makananTableBody.innerHTML = '';
        makanan.forEach((item, index) => {
            makananTableBody.innerHTML += `<tr><td>${index+1}</td><td><img src="${item.imgUrl}" style="height:50px; width:50px;"></td><td>${item.nama}</td><td>${item.kategori}</td><td>Rp ${item.harga.toLocaleString('id-ID')}</td><td><button class="action-btn edit-btn" data-id="${item.id}" data-type="makanan">Edit</button><button class="action-btn delete-btn" data-id="${item.id}" data-type="makanan">Hapus</button></td></tr>`;
        });
    }
    
    addMakananBtn.addEventListener('click', () => {
        document.getElementById('makanan-modal-title').textContent = "Tambah Makanan Baru";
        makananForm.reset();
        document.getElementById('makanan-id').value = '';
        openModal('makanan-modal');
    });
    
    makananForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('makanan-id').value;
        const data = { nama: document.getElementById('makanan-nama').value, kategori: document.getElementById('makanan-kategori').value, harga: parseInt(document.getElementById('makanan-harga').value), imgUrl: document.getElementById('makanan-imgUrl').value };
        if (id) {
            const index = makanan.findIndex(m => m.id == id);
            makanan[index] = { id: parseInt(id), ...data };
        } else {
            const newId = makanan.length > 0 ? Math.max(...makanan.map(m => m.id)) + 1 : 1;
            makanan.push({ id: newId, ...data });
        }
        alert('Data makanan berhasil disimpan!');
        closeModal('makanan-modal');
        renderMakananTable();
    });

    const beritaTableBody = document.getElementById('berita-table-body');
    const addBeritaBtn = document.getElementById('add-berita-btn');
    const beritaForm = document.getElementById('berita-form');

    function renderBeritaTable() {
        beritaTableBody.innerHTML = '';
        berita.forEach((item, index) => {
            beritaTableBody.innerHTML += `<tr><td>${index+1}</td><td>${item.judul}</td><td>${item.tanggal}</td><td><button class="action-btn edit-btn" data-id="${item.id}" data-type="berita">Edit</button><button class="action-btn delete-btn" data-id="${item.id}" data-type="berita">Hapus</button></td></tr>`;
        });
    }

    addBeritaBtn.addEventListener('click', () => {
        document.getElementById('berita-modal-title').textContent = "Tulis Berita Baru";
        beritaForm.reset();
        document.getElementById('berita-id').value = '';
        openModal('berita-modal');
    });

    beritaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('berita-id').value;
        const data = { judul: document.getElementById('berita-judul').value, konten: document.getElementById('berita-konten').value, tanggal: new Date().toISOString().split('T')[0] }; // Tanggal hari ini
        if (id) {
            const index = berita.findIndex(b => b.id == id);
            berita[index] = { id: parseInt(id), ...data };
        } else {
            const newId = berita.length > 0 ? Math.max(...berita.map(b => b.id)) + 1 : 1;
            berita.push({ id: newId, ...data });
        }
        alert('Berita berhasil disimpan!');
        closeModal('berita-modal');
        renderBeritaTable();
    });


    document.querySelector('.main-content').addEventListener('click', (e) => {
        const target = e.target;
        const id = target.dataset.id;
        const type = target.dataset.type;

        if (!id) return; 

        if (target.classList.contains('edit-btn')) {
            if (type === 'film') {
                const item = films.find(f => f.id == id);
                document.getElementById('film-modal-title').textContent = "Edit Film";
                document.getElementById('film-id').value = item.id;
                document.getElementById('film-title').value = item.title;
                document.getElementById('film-synopsis').value = item.synopsis;
                document.getElementById('film-posterUrl').value = item.posterUrl;
                document.getElementById('film-duration').value = item.duration;
                document.getElementById('film-status').value = item.status;
                openModal('film-modal');
            } else if (type === 'makanan') {
                const item = makanan.find(m => m.id == id);
                document.getElementById('makanan-modal-title').textContent = "Edit Makanan";
                document.getElementById('makanan-id').value = item.id;
                document.getElementById('makanan-nama').value = item.nama;
                document.getElementById('makanan-kategori').value = item.kategori;
                document.getElementById('makanan-harga').value = item.harga;
                document.getElementById('makanan-imgUrl').value = item.imgUrl;
                openModal('makanan-modal');
            } else if (type === 'berita') {
                const item = berita.find(b => b.id == id);
                document.getElementById('berita-modal-title').textContent = "Edit Berita";
                document.getElementById('berita-id').value = item.id;
                document.getElementById('berita-judul').value = item.judul;
                document.getElementById('berita-konten').value = item.konten;
                openModal('berita-modal');
            }
        }
        
        if (target.classList.contains('delete-btn')) {
            if (confirm('Anda yakin ingin menghapus data ini?')) {
                if (type === 'film') {
                    films = films.filter(f => f.id != id);
                    renderFilmTable();
                } else if (type === 'makanan') {
                    makanan = makanan.filter(m => m.id != id);
                    renderMakananTable();
                } else if (type === 'berita') {
                    berita = berita.filter(b => b.id != id);
                    renderBeritaTable();
                }
            }
        }
    });

    renderFilmTable();
    renderMakananTable();
    renderBeritaTable();
});