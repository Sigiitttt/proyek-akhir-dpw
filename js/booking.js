// booking.js - Logika untuk semua halaman booking film

class CinemaBooking {
    constructor() {
        this.selectedSeats = [];
        this.seatPrice = 50000;
        this.selectedPaymentMethod = null;
        this.bookingData = null;
        
        // Movie data
        this.movieData = {
            title: 'AVENGERS: ENDGAME',
            studio: 'Studio 1',
            date: '24 Mei 2025',
            time: '19:30 WIB',
            price: 50000
        };
        
        this.init();
    }

    init() {
        // Initialize based on current page
        const currentPage = this.getCurrentPage();
        
        switch(currentPage) {
            case 'seat':
                this.initSeatPage();
                break;
            case 'summary':
                this.loadSummaryPage();
                break;
            case 'payment':
                this.loadPaymentPage();
                break;
            case 'success':
                this.loadSuccessPage();
                break;
            case 'ticket':
                this.loadTicketPage();
                break;
        }
    }

    getCurrentPage() {
        const url = window.location.pathname;
        if (url.includes('seat.html') || url.endsWith('/')) return 'seat';
        if (url.includes('summary.html')) return 'summary';
        if (url.includes('payment.html')) return 'payment';
        if (url.includes('success.html')) return 'success';
        if (url.includes('ticket.html')) return 'ticket';
        return 'seat';
    }

    // SEAT PAGE FUNCTIONS
    initSeatPage() {
        this.createSeatMap();
        this.setupSeatListeners();
        this.loadBookingFromStorage();
    }

    createSeatMap() {
        const seatMap = document.getElementById('seatMap');
        if (!seatMap) return;

        const rows = ['A', 'B', 'C', 'D', 'E'];
        const cols = 8;
        
        // Simulasi kursi yang sudah terisi
        const occupiedSeats = ['A3', 'A4', 'B5', 'C2', 'C6', 'D1', 'D7', 'E4', 'E5'];
        
        seatMap.innerHTML = ''; // Clear existing seats
        
        for (let row of rows) {
            for (let col = 1; col <= cols; col++) {
                const seatId = `${row}${col}`;
                const seat = document.createElement('button');
                seat.className = 'seat';
                seat.textContent = seatId;
                seat.dataset.seatId = seatId;
                
                if (occupiedSeats.includes(seatId)) {
                    seat.classList.add('occupied');
                    seat.disabled = true;
                } else {
                    seat.classList.add('available');
                    seat.addEventListener('click', () => this.selectSeat(seatId));
                }
                
                seatMap.appendChild(seat);
            }
        }
    }

    setupSeatListeners() {
        const continueButton = document.getElementById('continueToSummary');
        if (continueButton) {
            continueButton.addEventListener('click', () => {
                this.saveBookingToStorage();
                window.location.href = 'summary.html';
            });
        }
    }

    selectSeat(seatId) {
        const seatElement = document.querySelector(`[data-seat-id="${seatId}"]`);
        
        if (this.selectedSeats.includes(seatId)) {
            // Deselect seat
            this.selectedSeats = this.selectedSeats.filter(id => id !== seatId);
            seatElement.classList.remove('selected');
            seatElement.classList.add('available');
        } else {
            // Select seat
            this.selectedSeats.push(seatId);
            seatElement.classList.remove('available');
            seatElement.classList.add('selected');
        }
        
        this.updateSeatInfo();
    }

    updateSeatInfo() {
        const selectedSeatsElement = document.getElementById('selectedSeats');
        const totalPriceElement = document.getElementById('totalPrice');
        const continueButton = document.getElementById('continueToSummary');
        
        if (selectedSeatsElement) {
            selectedSeatsElement.textContent = this.selectedSeats.length > 0 ? 
                this.selectedSeats.join(', ') : '-';
        }
        
        if (totalPriceElement) {
            totalPriceElement.textContent = `Rp ${(this.selectedSeats.length * this.seatPrice).toLocaleString('id-ID')}`;
        }
        
        if (continueButton) {
            continueButton.disabled = this.selectedSeats.length === 0;
        }
    }

    // SUMMARY PAGE FUNCTIONS
    loadSummaryPage() {
        this.loadBookingFromStorage();
        
        const summarySeats = document.getElementById('summarySeats');
        const ticketCount = document.getElementById('ticketCount');
        const summaryTotal = document.getElementById('summaryTotal');
        
        if (summarySeats) {
            summarySeats.textContent = this.selectedSeats.length > 0 ? 
                this.selectedSeats.join(', ') : '-';
        }
        
        if (ticketCount) {
            ticketCount.textContent = this.selectedSeats.length;
        }
        
        if (summaryTotal) {
            summaryTotal.textContent = `Rp ${(this.selectedSeats.length * this.seatPrice).toLocaleString('id-ID')}`;
        }
    }

    // PAYMENT PAGE FUNCTIONS
    loadPaymentPage() {
        this.loadBookingFromStorage();
        
        // Update payment total
        const paymentTotal = document.getElementById('paymentTotal');
        const orderSeats = document.getElementById('orderSeats');
        const orderTicketCount = document.getElementById('orderTicketCount');
        
        if (paymentTotal) {
            paymentTotal.textContent = `Rp ${(this.selectedSeats.length * this.seatPrice).toLocaleString('id-ID')}`;
        }
        
        if (orderSeats) {
            orderSeats.textContent = this.selectedSeats.length > 0 ? 
                this.selectedSeats.join(', ') : '-';
        }
        
        if (orderTicketCount) {
            orderTicketCount.textContent = this.selectedSeats.length;
        }
        
        this.setupPaymentListeners();
    }

    setupPaymentListeners() {
        // Payment method selection
        const paymentMethods = document.querySelectorAll('.payment-method');
        const payButton = document.getElementById('payButton');
        
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                // Remove selected class from all methods
                paymentMethods.forEach(m => m.classList.remove('selected'));
                
                // Add selected class to clicked method
                method.classList.add('selected');
                this.selectedPaymentMethod = method.dataset.method;
                
                // Enable pay button
                if (payButton) {
                    payButton.disabled = false;
                }
            });
        });

        // Pay button click
        if (payButton) {
            payButton.addEventListener('click', () => {
                this.processPayment();
            });
        }
    }

    processPayment() {
        // Generate booking ID
        const bookingId = this.generateBookingId();
        
        // Create booking data
        this.bookingData = {
            id: bookingId,
            movie: this.movieData.title,
            studio: this.movieData.studio,
            date: this.movieData.date,
            time: this.movieData.time,
            seats: [...this.selectedSeats],
            total: this.selectedSeats.length * this.seatPrice,
            paymentMethod: this.selectedPaymentMethod,
            status: 'PAID',
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        this.saveBookingToStorage();

        // Redirect to success page
        window.location.href = 'success.html';
    }

    // SUCCESS PAGE FUNCTIONS
    loadSuccessPage() {
        this.loadBookingFromStorage();
        
        if (!this.bookingData) {
            // If no booking data, redirect to seat page
            window.location.href = 'seat.html';
            return;
        }
        
        const bookingId = document.getElementById('bookingId');
        const transactionTime = document.getElementById('transactionTime');
        const successSeats = document.getElementById('successSeats');
        const successTotal = document.getElementById('successTotal');
        
        if (bookingId) {
            bookingId.textContent = this.bookingData.id;
        }
        
        if (transactionTime) {
            const date = new Date(this.bookingData.timestamp);
            transactionTime.textContent = date.toLocaleString('id-ID');
        }
        
        if (successSeats) {
            successSeats.textContent = this.bookingData.seats.join(', ');
        }
        
        if (successTotal) {
            successTotal.textContent = `Rp ${this.bookingData.total.toLocaleString('id-ID')}`;
        }
    }

    // TICKET PAGE FUNCTIONS
    loadTicketPage() {
        this.loadBookingFromStorage();
        
        if (!this.bookingData) {
            // If no booking data, redirect to seat page
            window.location.href = 'seat.html';
            return;
        }
        
        const ticketSeats = document.getElementById('ticketSeats');
        const ticketBookingId = document.getElementById('ticketBookingId');
        const ticketTotal = document.getElementById('ticketTotal');
        const ticketMovie = document.getElementById('ticketMovie');
        
        if (ticketSeats) {
            ticketSeats.textContent = this.bookingData.seats.join(', ');
        }
        
        if (ticketBookingId) {
            ticketBookingId.textContent = this.bookingData.id;
        }
        
        if (ticketTotal) {
            ticketTotal.textContent = `Rp ${this.bookingData.total.toLocaleString('id-ID')}`;
        }
        
        if (ticketMovie) {
            ticketMovie.textContent = this.bookingData.movie;
        }
    }

    // UTILITY FUNCTIONS
    generateBookingId() {
        const now = new Date();
        const dateStr = now.getFullYear().toString().slice(-2) + 
                       (now.getMonth() + 1).toString().padStart(2, '0') + 
                       now.getDate().toString().padStart(2, '0');
        const timeStr = now.getHours().toString().padStart(2, '0') + 
                       now.getMinutes().toString().padStart(2, '0');
        const randomStr = Math.random().toString(36).substr(2, 4).toUpperCase();
        
        return `BK${dateStr}${timeStr}${randomStr}`;
    }

    saveBookingToStorage() {
        const bookingState = {
            selectedSeats: this.selectedSeats,
            selectedPaymentMethod: this.selectedPaymentMethod,
            bookingData: this.bookingData
        };
        
        localStorage.setItem('cinemaBooking', JSON.stringify(bookingState));
    }

    loadBookingFromStorage() {
        try {
            const saved = localStorage.getItem('cinemaBooking');
            if (saved) {
                const bookingState = JSON.parse(saved);
                this.selectedSeats = bookingState.selectedSeats || [];
                this.selectedPaymentMethod = bookingState.selectedPaymentMethod || null;
                this.bookingData = bookingState.bookingData || null;
            }
        } catch (error) {
            console.error('Error loading booking data:', error);
            // Reset to default state
            this.selectedSeats = [];
            this.selectedPaymentMethod = null;
            this.bookingData = null;
        }
    }

    clearBookingData() {
        localStorage.removeItem('cinemaBooking');
        this.selectedSeats = [];
        this.selectedPaymentMethod = null;
        this.bookingData = null;
    }
}

// Initialize booking system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global booking instance
    window.cinemaBooking = new CinemaBooking();
});

// Global utility functions
function formatCurrency(amount) {
    return `Rp ${amount.toLocaleString('id-ID')}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });
}