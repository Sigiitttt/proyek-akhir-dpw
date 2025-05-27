// // storage.js - localStorage helper functions for TIX.ID

// const Storage = {
//     // Keys for localStorage
//     KEYS: {
//         USERS: 'tix_users',
//         FILMS: 'tix_films',
//         FOODS: 'tix_foods',
//         NEWS: 'tix_news',
//         CINEMAS: 'tix_cinemas',
//         BOOKINGS: 'tix_bookings',
//         FAVORITES: 'tix_favorites',
//         CURRENT_USER: 'tix_current_user',
//         CART: 'tix_cart',
//         BOOKING_TEMP: 'tix_booking_temp'
//     },

//     // Generic get/set functions
//     get: (key, defaultValue = null) => {
//         try {
//             const item = localStorage.getItem(key);
//             return item ? JSON.parse(item) : defaultValue;
//         } catch (error) {
//             console.error('Error getting from storage:', error);
//             return defaultValue;
//         }
//     },

//     set: (key, value) => {
//         try {
//             localStorage.setItem(key, JSON.stringify(value));
//             return true;
//         } catch (error) {
//             console.error('Error setting to storage:', error);
//             return false;
//         }
//     },

//     remove: (key) => {
//         try {
//             localStorage.removeItem(key);
//             return true;
//         } catch (error) {
//             console.error('Error removing from storage:', error);
//             return false;
//         }
//     },

//     clear: () => {
//         try {
//             localStorage.clear();
//             return true;
//         } catch (error) {
//             console.error('Error clearing storage:', error);
//             return false;
//         }
//     },

//     // User-related storage functions
//     getCurrentUser: () => {
//         return Storage.get(Storage.KEYS.CURRENT_USER);
//     },

//     setCurrentUser: (user) => {
//         return Storage.set(Storage.KEYS.CURRENT_USER, user);
//     },

//     clearCurrentUser: () => {
//         return Storage.remove(Storage.KEYS.CURRENT_USER);
//     },

//     isLoggedIn: () => {
//         return Storage.getCurrentUser() !== null;
//     },

//     // Cart functions
//     getCart: () => {
//         return Storage.get(Storage.KEYS.CART, []);
//     },

//     setCart: (cart) => {
//         return Storage.set(Storage.KEYS.CART, cart);
//     },

//     addToCart: (item) => {
//         const cart = Storage.getCart();
//         const existingIndex = cart.findIndex(cartItem => 
//             cartItem.id === item.id && cartItem.type === item.type
//         );

//         if (existingIndex >= 0) {
//             cart[existingIndex].quantity += item.quantity || 1;
//         } else {
//             cart.push({
//                 ...item,
//                 quantity: item.quantity || 1,
//                 addedAt: new Date()
//             });
//         }

//         return Storage.setCart(cart);
//     },

//     removeFromCart: (itemId, type) => {
//         const cart = Storage.getCart();
//         const filtered = cart.filter(item => 
//             !(item.id === itemId && item.type === type)
//         );
//         return Storage.setCart(filtered);
//     },

//     updateCartQuantity: (itemId, type, quantity) => {
//         const cart = Storage.getCart();
//         const itemIndex = cart.findIndex(item => 
//             item.id === itemId && item.type === type
//         );

//         if (itemIndex >= 0) {
//             if (quantity <= 0) {
//                 cart.splice(itemIndex, 1);
//             } else {
//                 cart[itemIndex].quantity = quantity;
//             }
//             return Storage.setCart(cart);
//         }
//         return false;
//     },

//     clearCart: () => {
//         return Storage.set(Storage.KEYS.CART, []);
//     },

//     getCartTotal: () => {
//         const cart = Storage.getCart();
//         return cart.reduce((total, item) => {
//             return total + (item.price * item.quantity);
//         }, 0);
//     },

//     getCartCount: () => {
//         const cart = Storage.getCart();
//         return cart.reduce((count, item) => count + item.quantity, 0);
//     },

//     // Temporary booking data functions
//     getBookingTemp: () => {
//         return Storage.get(Storage.KEYS.BOOKING_TEMP, {});
//     },

//     setBookingTemp: (data) => {
//         const current = Storage.getBookingTemp();
//         const updated = { ...current, ...data };
//         return Storage.set(Storage.KEYS.BOOKING_TEMP, updated);
//     },

//     clearBookingTemp: () => {
//         return Storage.remove(Storage.KEYS.BOOKING_TEMP);
//     },

//     // Search history
//     getSearchHistory: () => {
//         return Storage.get('tix_search_history', []);
//     },

//     addToSearchHistory: (query) => {
//         if (!query || query.trim() === '') return;
        
//         const history = Storage.getSearchHistory();
//         const filtered = history.filter(item => item !== query);
//         filtered.unshift(query);
        
//         // Keep only last 10 searches
//         const limited = filtered.slice(0, 10);
//         return Storage.set('tix_search_history', limited);
//     },

//     clearSearchHistory: () => {
//         return Storage.remove('tix_search_history');
//     },

//     // Recently viewed films
//     getRecentlyViewed: () => {
//         return Storage.get('tix_recently_viewed', []);
//     },

//     addToRecentlyViewed: (filmId) => {
//         const recent = Storage.getRecentlyViewed();
//         const filtered = recent.filter(id => id !== filmId);
//         filtered.unshift(filmId);
        
//         // Keep only last 20 items
//         const limited = filtered.slice(0, 20);
//         return Storage.set('tix_recently_viewed', limited);
//     },

//     // User preferences
//     getUserPreferences: () => {
//         return Storage.get('tix_user_preferences', {
//             theme: 'light',
//             notifications: true,
//             language: 'id',
//             autoplay: true
//         });
//     },

//     setUserPreferences: (preferences) => {
//         const current = Storage.getUserPreferences();
//         const updated = { ...current, ...preferences };
//         return Storage.set('tix_user_preferences', updated);
//     },

//     // Session data
//     setSessionData: (key, value) => {
//         try {
//             sessionStorage.setItem(key, JSON.stringify(value));
//             return true;
//         } catch (error) {
//             console.error('Error setting session data:', error);
//             return false;
//         }
//     },

//     getSessionData: (key, defaultValue = null) => {
//         try {
//             const item = sessionStorage.getItem(key);
//             return item ? JSON.parse(item) : defaultValue;
//         } catch (error) {
//             console.error('Error getting session data:', error);
//             return defaultValue;
//         }
//     },

//     removeSessionData: (key) => {
//         try {
//             sessionStorage.removeItem(key);
//             return true;
//         } catch (error) {
//             console.error('Error removing session data:', error);
//             return false;
//         }
//     },

//     // Data validation
//     validateData: (data, schema) => {
//         // Simple validation function
//         if (!data || typeof data !== 'object') return false;
        
//         for (const key in schema) {
//             if (schema[key].required && !data.hasOwnProperty(key)) {
//                 return false;
//             }
            
//             if (data[key] && schema[key].type) {
//                 const expectedType = schema[key].type;
//                 const actualType = typeof data[key];
                
//                 if (actualType !== expectedType) {
//                     return false;
//                 }
//             }
//         }
        
//         return true;
//     },

//     // Data migration (for future updates)
//     migrate: () => {
//         const version = Storage.get('tix_data_version', '1.0.0');
        
//         // Perform migrations based on version
//         switch (version) {
//             case '1.0.0':
//                 // Migration logic here
//                 Storage.set('tix_data_version', '1.1.0');
//                 break;
//             default:
//                 break;
//         }
//     },

//     // Backup and restore
//     exportData: () => {
//         const data = {};
//         Object.values(Storage.KEYS).forEach(key => {
//             data[key] = Storage.get(key);
//         });
        
//         return {
//             version: '1.0.0',
//             timestamp: new Date().toISOString(),
//             data: data
//         };
//     },

//     importData: (backup) => {
//         if (!backup || !backup.data) return false;
        
//         try {
//             Object.entries(backup.data).forEach(([key, value]) => {
//                 if (value !== null) {
//                     Storage.set(key, value);
//                 }
//             });
//             return true;
//         } catch (error) {
//             console.error('Error importing data:', error);
//             return false;
//         }
//     },

//     // Favorites management
//     getFavorites: () => {
//         return Storage.get(Storage.KEYS.FAVORITES, []);
//     },

//     addToFavorites: (filmId) => {
//         const favorites = Storage.getFavorites();
//         if (!favorites.includes(filmId)) {
//             favorites.push(filmId);
//             return Storage.set(Storage.KEYS.FAVORITES, favorites);
//         }
//         return true;
//     },

//     removeFromFavorites: (filmId) => {
//         const favorites = Storage.getFavorites();
//         const filtered = favorites.filter(id => id !== filmId);
//         return Storage.set(Storage.KEYS.FAVORITES, filtered);
//     },

//     isFavorite: (filmId) => {
//         const favorites = Storage.getFavorites();
//         return favorites.includes(filmId);
//     },

//     // Bookings management
//     getBookings: () => {
//         return Storage.get(Storage.KEYS.BOOKINGS, []);
//     },

//     addBooking: (booking) => {
//         const bookings = Storage.getBookings();
//         booking.id = booking.id || Date.now().toString();
//         booking.createdAt = booking.createdAt || new Date().toISOString();
//         bookings.push(booking);
//         return Storage.set(Storage.KEYS.BOOKINGS, bookings);
//     },

//     getBookingById: (bookingId) => {
//         const bookings = Storage.getBookings();
//         return bookings.find(booking => booking.id === bookingId);
//     },

//     updateBooking: (bookingId, updates) => {
//         const bookings = Storage.getBookings();
//         const index = bookings.findIndex(booking => booking.id === bookingId);
        
//         if (index >= 0) {
//             bookings[index] = { ...bookings[index], ...updates };
//             return Storage.set(Storage.KEYS.BOOKINGS, bookings);
//         }
//         return false;
//     },

//     // Cache management
//     setCache: (key, data, expirationMinutes = 60) => {
//         const cacheData = {
//             data: data,
//             timestamp: Date.now(),
//             expiration: Date.now() + (expirationMinutes * 60 * 1000)
//         };
//         return Storage.set(`tix_cache_${key}`, cacheData);
//     },

//     getCache: (key) => {
//         const cacheData = Storage.get(`tix_cache_${key}`);
        
//         if (!cacheData) return null;
        
//         if (Date.now() > cacheData.expiration) {
//             Storage.remove(`tix_cache_${key}`);
//             return null;
//         }
        
//         return cacheData.data;
//     },

//     clearCache: () => {
//         const keys = Object.keys(localStorage);
//         keys.forEach(key => {
//             if (key.startsWith('tix_cache_')) {
//                 localStorage.removeItem(key);
//             }
//         });
//     },

//     // Utility functions
//     getStorageSize: () => {
//         let total = 0;
//         for (let key in localStorage) {
//             if (localStorage.hasOwnProperty(key)) {
//                 total += localStorage[key].length + key.length;
//             }
//         }
//         return total;
//     },

//     getStorageSizeFormatted: () => {
//         const bytes = Storage.getStorageSize();
//         const kb = bytes / 1024;
//         const mb = kb / 1024;
        
//         if (mb >= 1) {
//             return `${mb.toFixed(2)} MB`;
//         } else if (kb >= 1) {
//             return `${kb.toFixed(2)} KB`;
//         } else {
//             return `${bytes} bytes`;
//         }
//     },

//     // Performance monitoring
//     measurePerformance: (operation, callback) => {
//         const start = performance.now();
//         const result = callback();
//         const end = performance.now();
        
//         console.log(`Storage operation '${operation}' took ${end - start} milliseconds`);
//         return result;
//     },

//     // Event system for storage changes
//     listeners: new Map(),

//     addEventListener: (key, callback) => {
//         if (!Storage.listeners.has(key)) {
//             Storage.listeners.set(key, []);
//         }
//         Storage.listeners.get(key).push(callback);
//     },

//     removeEventListener: (key, callback) => {
//         if (Storage.listeners.has(key)) {
//             const listeners = Storage.listeners.get(key);
//             const index = listeners.indexOf(callback);
//             if (index > -1) {
//                 listeners.splice(index, 1);
//             }
//         }
//     },

//     triggerEvent: (key, data) => {
//         if (Storage.listeners.has(key)) {
//             Storage.listeners.get(key).forEach(callback => {
//                 try {
//                     callback(data);
//                 } catch (error) {
//                     console.error('Error in storage event listener:', error);
//                 }
//             });
//         }
//     },

//     // Enhanced set function with events
//     setWithEvent: (key, value) => {
//         const success = Storage.set(key, value);
//         if (success) {
//             Storage.triggerEvent(key, value);
//         }
//         return success;
//     }
// };

// // Initialize storage system
// Storage.migrate();

// // Export for use in other modules
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = Storage;
// } else if (typeof window !== 'undefined') {
//     window.Storage = Storage;
// }