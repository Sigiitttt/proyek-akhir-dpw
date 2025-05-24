// Simulasi localStorage menggunakan variabel JavaScript
// Catatan: Dalam environment produksi, gunakan localStorage yang sesungguhnya
let mockStorage = {
    users: [],
    currentUser: null,
    userType: null // Tambahan untuk menyimpan tipe user
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
        } else if (key === 'userType') {
            mockStorage.userType = value;
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
        } else if (key === 'userType') {
            return mockStorage.userType;
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
        } else if (key === 'userType') {
            mockStorage.userType = null;
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
        return { success: false, message: 'Email sudah terdaftar' };
    }
    
    // Buat user baru
    const newUser = {
        id: Date.now(),
        fullName: fullName,
        email: email,
        phone: phone,
        password: password, // Dalam produksi, hash password ini
        role: 'user', // Default role
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, message: 'Registrasi berhasil' };
}

// Fungsi login yang sudah diperbaiki dengan support admin
function login(email, password) {
    // Cek login khusus admin
    if (email === 'admin' || email === 'admin@system.com') {
        if (password === 'admin' || password === 'admin123') {
            setStorageItem('currentUser', 'Administrator');
            setStorageItem('userType', 'admin');
            
            // Redirect ke dashboard admin jika di browser
            if (typeof window !== 'undefined' && window.location) {
                // Delay sedikit untuk memastikan storage tersimpan
                setTimeout(() => {
                    window.location.href = 'admin/dasboard.html';
                }, 100);
            }
            
            return { 
                success: true, 
                userType: 'admin', 
                userData: { 
                    fullName: 'Administrator', 
                    email: 'admin@system.com',
                    role: 'admin' 
                } 
            };
        }
    }

    // Cek login user biasa
    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        setStorageItem('currentUser', user.fullName);
        setStorageItem('userType', user.role || 'user');
        
        // Redirect ke halaman utama jika di browser
        if (typeof window !== 'undefined' && window.location) {
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 100);
        }
        
        return { 
            success: true, 
            userType: user.role || 'user', 
            userData: user 
        };
    }
    
    return { success: false, message: 'Email atau password salah' };
}

// Fungsi logout
function logout() {
    removeStorageItem('currentUser');
    removeStorageItem('userType');
    
    if (typeof window !== 'undefined' && window.location) {
        window.location.href = 'index.html';
    }
}

// Fungsi untuk mendapatkan user yang sedang login
function getCurrentUser() {
    return getStorageItem('currentUser');
}

// Fungsi untuk mendapatkan tipe user yang sedang login
function getCurrentUserType() {
    return getStorageItem('userType') || 'user';
}

// Fungsi untuk mengecek apakah user sudah login
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Fungsi untuk mengecek apakah user adalah admin
function isAdmin() {
    return getCurrentUserType() === 'admin';
}

// Fungsi untuk proteksi halaman admin
function requireAdmin() {
    if (!isLoggedIn()) {
        if (typeof window !== 'undefined') {
            alert('Anda harus login sebagai admin untuk mengakses halaman ini!');
            if (window.location) {
                window.location.href = 'login.html';
            }
        }
        return false;
    }
    
    if (!isAdmin()) {
        if (typeof window !== 'undefined') {
            alert('Akses ditolak! Halaman ini hanya untuk admin.');
            if (window.location) {
                window.location.href = 'index.html';
            }
        }
        return false;
    }
    
    return true;
}

// Fungsi untuk proteksi halaman (redirect ke login jika belum login)
function requireAuth() {
    if (!isLoggedIn()) {
        if (typeof window !== 'undefined') {
            alert('Anda harus login terlebih dahulu untuk mengakses fitur ini!');
            if (window.location) {
                window.location.href = 'login.html';
            }
        }
        return false;
    }
    return true;
}

// Fungsi untuk update navbar berdasarkan status login
function updateNavbar() {
    if (typeof document === 'undefined') return; // Pastikan DOM tersedia
    
    const currentUser = getCurrentUser();
    const userType = getCurrentUserType();
    const authButtons = document.getElementById('auth-buttons');
    const userInfo = document.getElementById('user-info');
    
    if (currentUser && authButtons && userInfo) {
        // User sudah login
        authButtons.style.display = 'none';
        userInfo.style.display = 'flex';
        
        // Tampilan berbeda untuk admin
        const adminBadge = userType === 'admin' ? '<span class="admin-badge">ADMIN</span>' : '';
        const dashboardLink = userType === 'admin' ? '<a href="/admin/dashboard.html" class="admin-link">Dashboard</a>' : '';
        
        userInfo.innerHTML = `
            <span class="user-name">Halo, ${currentUser} ${adminBadge}</span>
            ${dashboardLink}
            <button onclick="logout()" class="btn-logout">Logout</button>
        `;
    } else if (authButtons && userInfo) {
        // User belum login
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
    }
}

// Fungsi untuk handle booking (dengan proteksi auth)
function handleBooking() {
    if (!requireAuth()) {
        return false;
    }
    
    // Lanjutkan proses booking
    return true;
}

// Fungsi untuk mendapatkan data user berdasarkan email
function getUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}

// Fungsi untuk update profile user
function updateUserProfile(email, updatedData) {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.email === email);
    
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        saveUsers(users);
        return true;
    }
    
    return false;
}

// Fungsi admin untuk mengelola users
function getAllUsersAdmin() {
    if (!isAdmin()) {
        return { success: false, message: 'Akses ditolak' };
    }
    
    return { success: true, data: getUsers() };
}

// Fungsi admin untuk menghapus user
function deleteUserAdmin(userId) {
    if (!isAdmin()) {
        return { success: false, message: 'Akses ditolak' };
    }
    
    const users = getUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    
    if (users.length === filteredUsers.length) {
        return { success: false, message: 'User tidak ditemukan' };
    }
    
    saveUsers(filteredUsers);
    return { success: true, message: 'User berhasil dihapus' };
}

// Fungsi admin untuk mengupdate role user
function updateUserRoleAdmin(userId, newRole) {
    if (!isAdmin()) {
        return { success: false, message: 'Akses ditolak' };
    }
    
    const users = getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
        return { success: false, message: 'User tidak ditemukan' };
    }
    
    users[userIndex].role = newRole;
    saveUsers(users);
    
    return { success: true, message: 'Role user berhasil diupdate' };
}

// Inisialisasi saat halaman dimuat
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        updateNavbar();
        
        // Tambahkan beberapa user demo jika belum ada
        const users = getUsers();
        if (users.length === 0) {
            const demoUsers = [
                {
                    id: 1,
                    fullName: 'Admin User',
                    email: 'admin@tiket.com',
                    phone: '081234567890',
                    password: 'admin123',
                    role: 'admin',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    fullName: 'John Doe',
                    email: 'john@example.com',
                    phone: '081234567891',
                    password: 'password',
                    role: 'user',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    fullName: 'Jane Smith',
                    email: 'jane@example.com',
                    phone: '081234567892',
                    password: 'password123',
                    role: 'user',
                    createdAt: new Date().toISOString()
                }
            ];
            saveUsers(demoUsers);
        }
        
        // Proteksi halaman admin
        if (window.location.pathname.includes('/admin/')) {
            requireAdmin();
        }
    });
}

// Export functions untuk penggunaan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        register,
        login,
        logout,
        getCurrentUser,
        getCurrentUserType,
        isLoggedIn,
        isAdmin,
        requireAuth,
        requireAdmin,
        updateNavbar,
        handleBooking,
        getUserByEmail,
        updateUserProfile,
        getUsers,
        saveUsers,
        getAllUsersAdmin,
        deleteUserAdmin,
        updateUserRoleAdmin
    };
}

