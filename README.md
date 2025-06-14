
# 🎟️ TIX.ID Web - Native Version

Proyek ini merupakan versi website dari aplikasi TIX.ID yang dibuat menggunakan **HTML**, **CSS**, dan **JavaScript murni (native)** tanpa framework. Website ini mensimulasikan fitur-fitur utama dari aplikasi TIX.ID seperti pemesanan tiket bioskop, pemilihan makanan, pembayaran, hingga riwayat transaksi.

## 🚀 Fitur Utama

✅ Pemesanan tiket film  
✅ Pilih kursi bioskop  
✅ Pilih makanan & minuman  
✅ Ringkasan dan pembayaran  
✅ Cetak tiket (barcode/QR simulasi)  
✅ Riwayat pemesanan  
✅ Halaman profil & pengaturan  
✅ Dashboard admin untuk kelola film & makanan  
✅ Data tersimpan via `localStorage`  

---

## 🗂️ Struktur Folder

```

/tix-id-web/
├── index.html
├── login.html
├── register.html
├── film/                # Daftar dan detail film
├── booking/             # Proses pesan tiket
├── food/                # Menu makanan
├── user/                # Profil, history, dll
├── admin/               # Dashboard & kelola konten
├── info/                # FAQ, kontak, berita
├── components/          # Navbar, footer
├── css/                 # Styling
├── js/                  # Script utama
├── img/                 # Gambar poster/ikon
└── assets/              # Font, icon, statis lainnya

````

---

## 📦 Teknologi yang Digunakan

- HTML5 & CSS3
- JavaScript (Native, tanpa framework)
- LocalStorage API
- Modular folder structure
- Responsive Web Design (RWD)

---

## 🛠️ Cara Menjalankan

1. Clone repositori:
   ```bash
   git clone https://github.com/username/tix-id-web.git
   cd tix-id-web
````

2. Buka `index.html` di browser (cukup klik 2x atau drag ke browser):

   > Tidak perlu backend/server, karena proyek ini **100% statis dan berbasis client-side**.

---

## 📌 Catatan

* Semua data (film, user, transaksi, makanan) disimpan di **localStorage**, cocok untuk simulasi/mockup.
* Belum menggunakan database atau server backend.
* Ideal untuk **pembelajaran, tugas kuliah**, atau simulasi UI/UX.
* Admin bisa menambahkan/menghapus film dan makanan dari dashboard admin.

---

## 📸 Screenshot

> Tambahkan tangkapan layar nanti untuk halaman:

* Home
* Detail Film
* Booking Kursi
* Pemesanan Makanan
* Pembayaran
* Riwayat
* Admin Dashboard

---

## ✍️ Kontribusi

Kontribusi sangat terbuka! Jika ingin menambahkan fitur baru, refactor kode, atau memperbaiki bug, silakan buat pull request.

---

## 🧑‍💻 Dibuat oleh

> \[saya] - Mahasiswa Teknik Informatika 🌱
> Tugas Akhir - Pemrograman Web Dasar

---

## 📄 License

MIT License

```
