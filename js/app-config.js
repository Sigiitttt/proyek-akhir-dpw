// app-config.js - Konfigurasi global aplikasi TIX.ID

// Konfigurasi aplikasi
const AppConfig = {
    // API endpoints (untuk future development)
    api: {
        baseUrl: '/api',
        endpoints: {
            films: '/films',
            food: '/food',
            bookings: '/bookings'
        }
    },
    
    // Pengaturan UI
    ui: {
        itemsPerPage: 8,
        featuredMoviesCount: 4,
        relatedMoviesCount: 4,
        loadingDelay: 500, // ms
        notificationDuration: 3000 // ms
    },
    
    // Pengaturan localStorage keys
    storage: {
        favorites: 'favoriteFilms',
        cart: 'cartItems',
        user: 'currentUser',
        showtime: 'selectedShowtime'
    },
    
    // Status film
    filmStatuses: {
        NOW_SHOWING: 'now_showing',
        COMING_SOON: 'coming_soon'
    },
    
    // Kategori makanan
    foodCategories: {
        SNACK: 'snack',
        DRINK: 'minuman',
        COMBO: 'combo'
    }
};

// Utility functions global
const AppUtils = {
    // Format mata uang
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    },
    
    // Format durasi film
    formatDuration: (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}j ${mins}m`;
    },
    
    // Format tanggal
    formatDate: (dateString, options = {}) => {
        const defaultOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const finalOptions = { ...defaultOptions, ...options };
        return new Date(dateString).toLocaleDateString('id-ID', finalOptions);
    },
    
    // Generate placeholder poster URL
    generatePosterPlaceholder: (title, width = 300, height = 400) => {
        const encodedTitle = encodeURIComponent(title);
        return `https://via.placeholder.com/${width}x${height}/333/fff?text=${encodedTitle}`;
    },
    
    // Truncate text
    truncateText: (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Get URL parameter
    getUrlParameter: (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },
    
    // Show notification
    showNotification: (message, type = 'info', duration = AppConfig.ui.notificationDuration) => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const bgColor = {
            'info': '#2196F3',
            'success': '#4CAF50',
            'warning': '#FF9800',
            'error': '#f44336'
        }[type] || '#2196F3';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    },
    
    // Local storage helpers
    storage: {
        get: (key, defaultValue = null) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch {
                return defaultValue;
            }
        },
        
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch {
                return false;
            }
        },
        
        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch {
                return false;
            }
        }
    }
};

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    AppUtils.showNotification('Terjadi kesalahan. Silakan refresh halaman.', 'error');
});

// Export untuk compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AppConfig, AppUtils };
}