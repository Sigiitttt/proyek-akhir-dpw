// history.js - Logika untuk menampilkan riwayat booking

class BookingHistory {
    constructor() {
        this.historyContainer = document.getElementById('historyContainer');
        // Untuk simulasi, simpan data di variabel class
        this.simulatedData = null;
        this.init();
    }

    init() {
        this.loadBookingHistory();
    }

    // Fungsi untuk mengambil data dari localStorage
    getBookingData() {
        try {
            // Dalam lingkungan normal, gunakan localStorage
            // const bookingHistory = localStorage.getItem('bookingHistory');
            // return bookingHistory ? JSON.parse(bookingHistory) : [];
            
            // Untuk demonstrasi, gunakan data simulasi
            // Jika data sudah dihapus, return array kosong
            if (this.simulatedData === null) {
                this.simulatedData = this.getSimulatedData();
            }
            return this.simulatedData;
        } catch (error) {
            console.error('Error reading booking history:', error);
            return [];
        }
    }

    // Data simulasi untuk demonstrasi (ganti dengan localStorage di implementasi nyata)
    getSimulatedData() {
        return [
            {
                id: 'BOOK001',
                movieTitle: 'Spider-Man: No Way Home',
                showtime: '19:30',
                date: '2024-01-15',
                seats: ['C3', 'C4'],
                cinema: 'CGV Grand Indonesia',
                studio: 'Studio 1',
                totalPrice: 80000,
                bookingDate: '2024-01-10T14:30:00'
            },
            {
                id: 'BOOK002',
                movieTitle: 'Dune: Part Two',
                showtime: '21:00',
                date: '2024-01-20',
                seats: ['E5', 'E6', 'E7'],
                cinema: 'Cinepolis Plaza Indonesia',
                studio: 'Studio 3',
                totalPrice: 120000,
                bookingDate: '2024-01-18T16:45:00'
            },
            {
                id: 'BOOK003',
                movieTitle: 'The Batman',
                showtime: '16:45',
                date: '2024-01-25',
                seats: ['B2'],
                cinema: 'XXI Senayan City',
                studio: 'Studio 2',
                totalPrice: 40000,
                bookingDate: '2024-01-23T10:20:00'
            }
        ];
    }

    // Fungsi untuk memformat tanggal
    formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            locale: 'id-ID'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }

    // Fungsi untuk memformat waktu
    formatTime(timeString) {
        return timeString;
    }

    // Fungsi untuk memformat mata uang
    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    }

    // Fungsi untuk membuat card booking
    createBookingCard(booking) {
        const bookingDate = this.formatDate(booking.bookingDate);
        const showDate = this.formatDate(booking.date);
        
        return `
            <div class="booking-card">
                <div class="booking-header">
                    <h3 class="movie-title">${booking.movieTitle}</h3>
                    <span class="booking-date">${bookingDate}</span>
                </div>
                
                <div class="booking-details">
                    <div class="detail-item">
                        <div class="detail-icon">📅</div>
                        <div class="detail-info">
                            <h4>Tanggal Tayang</h4>
                            <p>${showDate}</p>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">🕐</div>
                        <div class="detail-info">
                            <h4>Jam Tayang</h4>
                            <p>${this.formatTime(booking.showtime)}</p>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">🎭</div>
                        <div class="detail-info">
                            <h4>Bioskop</h4>
                            <p>${booking.cinema}</p>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">🏛️</div>
                        <div class="detail-info">
                            <h4>Studio</h4>
                            <p>${booking.studio}</p>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">💰</div>
                        <div class="detail-info">
                            <h4>Total Harga</h4>
                            <p>${this.formatCurrency(booking.totalPrice)}</p>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">🪑</div>
                        <div class="detail-info">
                            <h4>Kursi</h4>
                            <div class="seats-list">
                                ${booking.seats.map(seat => `<span class="seat-badge">${seat}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Fungsi untuk menampilkan state kosong
    showEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-icon">🎬</div>
                <h2>Belum Ada Riwayat Booking</h2>
                <p>Anda belum pernah melakukan pemesanan tiket. Mulai booking sekarang untuk melihat riwayat di sini!</p>
                <a href="#" class="btn-primary" onclick="goToBooking()">Mulai Booking</a>
            </div>
        `;
    }

    // Fungsi utama untuk memuat dan menampilkan riwayat
    loadBookingHistory() {
        const bookingData = this.getBookingData();
        const clearButton = document.getElementById('clearHistoryBtn');
        
        if (!bookingData || bookingData.length === 0) {
            this.historyContainer.innerHTML = this.showEmptyState();
            // Sembunyikan tombol hapus jika tidak ada data
            if (clearButton) clearButton.style.display = 'none';
            return;
        }

        // Tampilkan tombol hapus jika ada data
        if (clearButton) clearButton.style.display = 'inline-flex';

        // Urutkan berdasarkan tanggal booking terbaru
        bookingData.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));

        // Buat HTML untuk semua booking
        const historyHTML = `
            <div class="history-list">
                ${bookingData.map(booking => this.createBookingCard(booking)).join('')}
            </div>
        `;

        this.historyContainer.innerHTML = historyHTML;
    }

    // Fungsi untuk menambah booking baru (dipanggil dari halaman booking)
    static addBooking(bookingData) {
        try {
            // Dalam implementasi nyata, gunakan localStorage
            // const existingHistory = localStorage.getItem('bookingHistory');
            // const history = existingHistory ? JSON.parse(existingHistory) : [];
            
            // Tambah booking baru
            // history.unshift({
            //     ...bookingData,
            //     id: 'BOOK' + Date.now(),
            //     bookingDate: new Date().toISOString()
            // });
            
            // Simpan kembali ke localStorage
            // localStorage.setItem('bookingHistory', JSON.stringify(history));
            
            console.log('Booking added:', bookingData);
            return true;
        } catch (error) {
            console.error('Error saving booking:', error);
            return false;
        }
    }

    // Fungsi untuk menghapus riwayat booking
    static clearHistory() {
        try {
            // Dalam implementasi nyata, gunakan localStorage
            // localStorage.removeItem('bookingHistory');
            
            // Untuk simulasi, hapus data dari instance yang aktif
            const historyInstance = window.bookingHistoryInstance;
            if (historyInstance) {
                historyInstance.simulatedData = [];
                historyInstance.loadBookingHistory();
            }
            
            console.log('History cleared successfully');
            return true;
        } catch (error) {
            console.error('Error clearing history:', error);
            alert('Terjadi kesalahan saat menghapus riwayat. Silakan coba lagi.');
            return false;
        }
    }
}

// Fungsi helper untuk navigasi
function goToBooking() {
    // Redirect ke halaman booking
    window.location.href = 'booking.html';
}

// Inisialisasi ketika DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    // Simpan instance global untuk bisa diakses dari fungsi clearHistory
    window.bookingHistoryInstance = new BookingHistory();
});

// Export untuk digunakan di file lain jika diperlukan
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BookingHistory;
}