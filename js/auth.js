// Simulasi localStorage menggunakan variabel JavaScript
// Catatan: Dalam environment produksi, gunakan localStorage yang sesungguhnya
let mockStorage = {
    users: [],
    currentUser: null
};

// Fungsi untuk menyimpan data (simulasi localStorage.setItem)
function setStorageItem(key, value) {
    if (typeof Storage !== "undefined") {
        localStorage.setItem(key, value);
    } else {
        // Fallback untuk environment yang tidak mendukung localStorage
        if (key === 'users') {
            mockStorage.users = JSON.parse(value);
        } else if (key === 'currentUser') {
            mockStorage.currentUser = value;
        }
    }
}

// Fungsi untuk mengambil data (simulasi localStorage.getItem)
function getStorageItem(key) {
    if (typeof Storage !== "undefined") {
        return localStorage.getItem(key);
    } else {
        // Fallback untuk environment yang tidak mendukung localStorage
        if (key === 'users') {
            return JSON.stringify(mockStorage.users);
        } else if (key === 'currentUser') {
            return mockStorage.currentUser;
        }
        return null;
    }
}

// Fungsi untuk menghapus data (simulasi localStorage.removeItem)
function removeStorageItem(key) {
    if (typeof Storage !== "undefined") {
        localStorage.removeItem(key);
    } else {
        // Fallback untuk environment yang tidak mendukung localStorage
        if (key === 'currentUser') {
            mockStorage.currentUser = null;
        }
    }
}

// Fungsi untuk mendapatkan semua users
function getUsers() {
    const users = getStorageItem('users');
    return users ? JSON.parse(users) : [];
}

// Fungsi untuk menyimpan users
function saveUsers(users) {
    setStorageItem('users', JSON.stringify(users));
}

// Fungsi registrasi
function register(fullName, email, phone, password) {
    const users = getUsers();
    
    // Cek apakah email sudah terdaftar
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return false; // Email sudah terdaftar
    }
    
    // Buat user baru
    const newUser = {
        id: Date.now(),
        fullName: fullName,
        email: email,
        phone: phone,
        password: password, // Dalam produksi, hash password ini
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return true; // Registrasi berhasil
}

// Fungsi login
function login(email, password) {
    const users = getUsers();
    
    // Cari user dengan email dan password yang sesuai
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        // Simpan info user yang sedang login
        setStorageItem('currentUser', user.fullName);
        return true; // Login berhasil
    }
    
    return false; // Login gagal
}

// Fungsi logout
function logout() {
    removeStorageItem('currentUser');
    window.location.href = 'index.html';
}

// Fungsi untuk mendapatkan user yang sedang login
function getCurrentUser() {
    return getStorageItem('currentUser');
}

// Fungsi untuk mengecek apakah user sudah login
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Fungsi untuk proteksi halaman (redirect ke login jika belum login)
function requireAuth() {
    if (!isLoggedIn()) {
        alert('Anda harus login terlebih dahulu untuk mengakses fitur ini!');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Fungsi untuk update navbar berdasarkan status login
function updateNavbar() {
    const currentUser = getCurrentUser();
    const authButtons = document.getElementById('auth-buttons');
    const userInfo = document.getElementById('user-info');
    
    if (currentUser && authButtons && userInfo) {
        // User sudah login
        authButtons.style.display = 'none';
        userInfo.style.display = 'flex';
        userInfo.innerHTML = `
            <span class="user-name">Halo, ${currentUser}</span>
            <button onclick="logout()" class="btn-logout">Logout</button>
        `;
    } else if (authButtons && userInfo) {
        // User belum login
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
    }
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    updateNavbar();
    
    // Tambahkan beberapa user demo jika belum ada
    const users = getUsers();
    if (users.length === 0) {
        const demoUsers = [
            {
                id: 1,
                fullName: 'Admin User',
                email: 'admin@rental.com',
                phone: '081234567890',
                password: 'admin123',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                fullName: 'John Doe',
                email: 'john@example.com',
                phone: '081234567891',
                password: 'password',
                createdAt: new Date().toISOString()
            }
        ];
        saveUsers(demoUsers);
    }
});

// Fungsi untuk handle booking (dengan proteksi auth)
function handleBooking() {
    if (!requireAuth()) {
        return false;
    }
    
    // Lanjutkan proses booking
    return true;
}

// Export functions untuk penggunaan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        register,
        login,
        logout,
        getCurrentUser,
        isLoggedIn,
        requireAuth,
        updateNavbar,
        handleBooking
    };
}