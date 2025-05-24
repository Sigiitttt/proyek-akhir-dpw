// Data dummy untuk aplikasi TIX.ID
const filmsData = [
    {
        id: 1,
        judul: "Avengers: Endgame",
        genre: ["Action", "Adventure", "Drama"],
        durasi: 181,
        rating: 8.4,
        tahun: 2019,
        sutradara: "Anthony Russo, Joe Russo",
        pemeran: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"],
        sinopsis: "Setelah peristiwa dahsyat Avengers: Infinity War, alam semesta berada dalam reruntuhan karena ulah Thanos yang telah memusnahkan setengah dari semua kehidupan. Dengan bantuan dari sekutu yang tersisa, Avengers berkumpul sekali lagi untuk membalikkan tindakan Thanos dan memulihkan keseimbangan alam semesta sekali dan untuk selamanya.",
        poster: "../img/assets/ave.jpg",
        trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        status: "coming_soon",
        jadwal: [
            {
                bioskop: "XXI Grand Indonesia",
                tanggal: "2024-05-25",
                jam: ["10:00", "13:30", "17:00", "20:30"]
            },
            {
                bioskop: "CGV Pacific Place",
                tanggal: "2024-05-25",
                jam: ["11:00", "14:30", "18:00", "21:30"]
            },
            {
                bioskop: "Cinépolis Plaza Senayan",
                tanggal: "2024-05-26",
                jam: ["09:30", "13:00", "16:30", "20:00"]
            }
        ]
    },
    {
        id: 2,
        judul: "Spider-Man: No Way Home",
        genre: ["Action", "Adventure", "Sci-Fi"],
        durasi: 148,
        rating: 8.2,
        tahun: 2021,
        sutradara: "Jon Watts",
        pemeran: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Willem Dafoe", "Alfred Molina"],
        sinopsis: "Peter Parker menghadapi konsekuensi ketika identitasnya sebagai Spider-Man terungkap. Tidak bisa lagi memisahkan kehidupan normalnya dengan taruhan tinggi menjadi superhero, Peter meminta bantuan Doctor Strange. Namun, ketika mantra salah, musuh berbahaya dari dunia lain mulai muncul, memaksa Peter untuk menemukan apa artinya menjadi Spider-Man yang sesungguhnya.",
        poster: "../img/assets/spider.jpeg",
        trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
        status: "now_showing",
        jadwal: [
            {
                bioskop: "XXI Grand Indonesia",
                tanggal: "2024-05-25",
                jam: ["10:30", "14:00", "17:30", "21:00"]
            },
            {
                bioskop: "CGV Pacific Place",
                tanggal: "2024-05-25",
                jam: ["12:00", "15:30", "19:00", "22:30"]
            },
            {
                bioskop: "XXI Senayan City",
                tanggal: "2024-05-26",
                jam: ["11:30", "15:00", "18:30", "22:00"]
            }
        ]
    },
    {
        id: 6,
        judul: "Oppenheimer",
        genre: ["Biography", "Drama", "History"],
        durasi: 180,
        rating: 8.6,
        tahun: 2023,
        sutradara: "Christopher Nolan",
        pemeran: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr.", "Matt Damon", "Florence Pugh"],
        sinopsis: "Kisah ilmuwan jenius J. Robert Oppenheimer dan perannya dalam pengembangan bom atom selama Proyek Manhattan. Film ini mengeksplorasi dilema moral, tekanan politik, dan dampak psikologis yang dialami Oppenheimer sebagai 'bapak bom atom'.",
        poster: "../img/assets/2.jpeg",
        trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
        status: "coming_soon",
        jadwal: [
            {
                bioskop: "XXI Kota Kasablanka",
                tanggal: "2024-06-07",
                jam: ["13:00", "16:30", "20:00"]
            },
            {
                bioskop: "CGV Grand Indonesia",
                tanggal: "2024-06-07",
                jam: ["11:00", "14:30", "18:00", "21:30"]
            }
        ]
    },
    {
        id: 3,
        judul: "The Batman",
        genre: ["Action", "Crime", "Drama"],
        durasi: 176,
        rating: 7.8,
        tahun: 2022,
        sutradara: "Matt Reeves",
        pemeran: ["Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright", "Colin Farrell", "Paul Dano"],
        sinopsis: "Dalam tahun kedua melawan kejahatan, Batman mengungkap korupsi di Gotham City yang menghubungkannya dengan keluarganya sendiri sementara menghadapi pembunuh berantai yang dikenal sebagai Riddler. Batman harus menjalin aliansi baru, menangkap Riddler, dan membawa keadilan pada penyalahgunaan kekuasaan dan korupsi yang telah lama mengganggu Gotham.",
        poster: "../img/assets/batman.jpg",
        trailer: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
        status: "now_showing",
        jadwal: [
            {
                bioskop: "Cinépolis Plaza Senayan",
                tanggal: "2024-05-25",
                jam: ["13:00", "16:30", "20:00"]
            },
            {
                bioskop: "XXI Grand Indonesia",
                tanggal: "2024-05-26",
                jam: ["14:00", "17:30", "21:00"]
            },
            {
                bioskop: "CGV Pacific Place",
                tanggal: "2024-05-26",
                jam: ["12:30", "16:00", "19:30"]
            }
        ]
    },
    {
        id: 4,
        judul: "Doctor Strange in the Multiverse of Madness",
        genre: ["Action", "Adventure", "Fantasy"],
        durasi: 126,
        rating: 6.9,
        tahun: 2022,
        sutradara: "Sam Raimi",
        pemeran: ["Benedict Cumberbatch", "Elizabeth Olsen", "Chiwetel Ejiofor", "Benedict Wong", "Xochitl Gomez"],
        sinopsis: "Dr. Stephen Strange melanjutkan penelitiannya tentang Time Stone. Namun, seorang teman lama yang berubah menjadi musuh menempatkan rencana untuk menghancurkan setiap penyihir di Bumi. Strange harus menjelajahi Multiverse untuk menghadapi versi alternatif dirinya sendiri dan menghadapi ancaman misterius yang baru muncul.",
        poster: "../img/assets/dr.jpg",
        trailer: "https://www.youtube.com/watch?v=aWzlQ2N6qqg",
        status: "now_showing",
        jadwal: [
            {
                bioskop: "XXI Grand Indonesia",
                tanggal: "2024-06-01",
                jam: ["11:00", "14:30", "18:00", "21:30"]
            },
            {
                bioskop: "CGV Pacific Place",
                tanggal: "2024-06-01",
                jam: ["10:30", "14:00", "17:30", "21:00"]
            },
            {
                bioskop: "Cinépolis Plaza Senayan",
                tanggal: "2024-06-02",
                jam: ["12:00", "15:30", "19:00", "22:30"]
            }
        ]
    },
    {
        id: 5,
        judul: "Top Gun: Maverick",
        genre: ["Action", "Drama"],
        durasi: 130,
        rating: 8.3,
        tahun: 2022,
        sutradara: "Joseph Kosinski",
        pemeran: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm", "Glen Powell"],
        sinopsis: "Setelah lebih dari tiga puluh tahun bertugas sebagai salah satu penerbang angkatan laut terbaik, Pete 'Maverick' Mitchell berada di tempat yang tepat, mendorong amplop sebagai pilot uji coba yang berani dan menghindari kemajuan pangkat yang akan membuatnya darat. Ketika dia menemukan dirinya melatih detasemen lulusan TOP GUN untuk misi khusus tidak seperti yang pernah dilihat pilot hidup, Maverick menghadapi masa lalu yang tidak pasti dan ketakutan terdalamnya.",
        poster: "../img/assets/1.jpg",
        trailer: "https://www.youtube.com/watch?v=qSqVVswa420",
        status: "coming_soon",
        jadwal: [
            {
                bioskop: "XXI Senayan City",
                tanggal: "2024-06-05",
                jam: ["13:30", "16:30", "19:30", "22:30"]
            },
            {
                bioskop: "CGV Pacific Place",
                tanggal: "2024-06-05",
                jam: ["12:00", "15:00", "18:00", "21:00"]
            },
            {
                bioskop: "Cinépolis Plaza Senayan",
                tanggal: "2024-06-06",
                jam: ["11:30", "14:30", "17:30", "20:30"]
            }
        ]
    },
    {
        id: 6,
        judul: "Oppenheimer",
        genre: ["Biography", "Drama", "History"],
        durasi: 180,
        rating: 8.6,
        tahun: 2023,
        sutradara: "Christopher Nolan",
        pemeran: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr.", "Matt Damon", "Florence Pugh"],
        sinopsis: "Kisah ilmuwan jenius J. Robert Oppenheimer dan perannya dalam pengembangan bom atom selama Proyek Manhattan. Film ini mengeksplorasi dilema moral, tekanan politik, dan dampak psikologis yang dialami Oppenheimer sebagai 'bapak bom atom'.",
        // poster: "https://via.placeholder.com/300x450/000000/fff?text=Oppenheimer",
        poster: "../img/assets/2.jpeg",
        trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
        status: "coming_soon",
        jadwal: [
            {
                bioskop: "XXI Kota Kasablanka",
                tanggal: "2024-06-07",
                jam: ["13:00", "16:30", "20:00"]
            },
            {
                bioskop: "CGV Grand Indonesia",
                tanggal: "2024-06-07",
                jam: ["11:00", "14:30", "18:00", "21:30"]
            }
        ]
    },
    {
        id: 7,
        judul: "Dune: Part Two",
        genre: ["Adventure", "Drama", "Sci-Fi"],
        durasi: 166,
        rating: 8.8,
        tahun: 2024,
        sutradara: "Denis Villeneuve",
        pemeran: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler", "Florence Pugh"],
        sinopsis: "Paul Atreides bersatu dengan kaum Fremen untuk membalas dendam atas kehancuran keluarganya. Ia harus memilih antara cinta dan takdir sebagai penyelamat umat manusia sembari menghadapi peperangan antargalaksi.",
        // poster: "https://via.placeholder.com/300x450/2e7d32/fff?text=Dune+Part+Two",
        poster: "../img/assets/1.jpg",
        trailer: "https://www.youtube.com/watch?v=Way9Dexny3w",
        status: "coming_soon",
        jadwal: [
            {
                bioskop: "Cinépolis FX Sudirman",
                tanggal: "2024-06-08",
                jam: ["12:00", "15:30", "19:00"]
            },
            {
                bioskop: "CGV AEON Mall BSD City",
                tanggal: "2024-06-08",
                jam: ["13:30", "17:00", "20:30"]
            }
        ]
    },
    {
        id: 8,
        judul: "Spider-Man: No Way Home",
        genre: ["Action", "Adventure", "Fantasy"],
        durasi: 148,
        rating: 8.2,
        tahun: 2021,
        sutradara: "Jon Watts",
        pemeran: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Willem Dafoe", "Alfred Molina"],
        sinopsis: "Setelah identitasnya terbongkar, Peter Parker meminta bantuan Doctor Strange. Namun sihir yang digunakan malah membuka multiverse, menghadirkan musuh-musuh dari dunia lain.",
        // poster: "https://via.placeholder.com/300x450/1565c0/fff?text=Spider-Man+No+Way+Home",
        poster: "../img/assets/2.jpeg",
        trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
        status: "coming_soon",
        jadwal: [
            {
                bioskop: "XXI Plaza Indonesia",
                tanggal: "2024-06-09",
                jam: ["11:00", "14:00", "17:00", "20:00"]
            },
            {
                bioskop: "CGV Central Park",
                tanggal: "2024-06-09",
                jam: ["10:30", "13:30", "16:30", "19:30"]
            }
        ]
    }
];

// Data makanan dan minuman dummy
const foodData = [
    {
        id: 1,
        nama: "Popcorn Large",
        kategori: "snack",
        harga: 35000,
        deskripsi: "Popcorn rasa original ukuran large",
        // gambar: "https://via.placeholder.com/300x200/ffc107/000?text=Popcorn+Large"
    },
    {
        id: 2,
        nama: "Nachos Cheese",
        kategori: "snack",
        harga: 45000,
        deskripsi: "Nachos dengan keju leleh yang gurih",
        // gambar: "https://via.placeholder.com/300x200/ff9800/000?text=Nachos+Cheese"
    },
    {
        id: 3,
        nama: "Coca Cola Large",
        kategori: "minuman",
        harga: 25000,
        deskripsi: "Minuman soda segar ukuran large",
        // gambar: "https://via.placeholder.com/300x200/d32f2f/fff?text=Coca+Cola"
    },
    {
        id: 4,
        nama: "Combo Popcorn + Drink",
        kategori: "combo",
        harga: 55000,
        deskripsi: "Paket hemat popcorn medium + minuman large",
        // gambar: "https://via.placeholder.com/300x200/4caf50/fff?text=Combo+Deal"
    }
];

// Data bioskop
const cinemaData = [
    {
        id: 1,
        nama: "XXI Grand Indonesia",
        alamat: "Mall Grand Indonesia, Jakarta Pusat",
        fasilitas: ["Premium", "IMAX", "Dolby Atmos"]
    },
    {
        id: 2,
        nama: "CGV Pacific Place",
        alamat: "Pacific Place Mall, Jakarta Selatan",
        fasilitas: ["4DX", "Premium", "Gold Class"]
    },
    {
        id: 3,
        nama: "Cinépolis Plaza Senayan",
        alamat: "Plaza Senayan, Jakarta Pusat",
        fasilitas: ["Junior", "Premium", "VIP"]
    },
    {
        id: 4,
        nama: "XXI Senayan City",
        alamat: "Senayan City Mall, Jakarta Pusat",
        fasilitas: ["Premium", "IMAX", "21 Premiere"]
    }
];

// Fungsi helper untuk mengambil data
const DataHelper = {
    // Film functions
    getAllFilms: () => filmsData,

    getFilmById: (id) => filmsData.find(film => film.id === parseInt(id)),

    getFilmsByStatus: (status) => filmsData.filter(film => film.status === status),

    searchFilms: (query) => {
        const searchTerm = query.toLowerCase();
        return filmsData.filter(film =>
            film.judul.toLowerCase().includes(searchTerm) ||
            film.genre.some(g => g.toLowerCase().includes(searchTerm)) ||
            film.sutradara.toLowerCase().includes(searchTerm) ||
            film.pemeran.some(p => p.toLowerCase().includes(searchTerm))
        );
    },

    // Food functions
    getAllFood: () => foodData,

    getFoodById: (id) => foodData.find(food => food.id === parseInt(id)),

    getFoodByCategory: (category) => foodData.filter(food => food.kategori === category),

    // Cinema functions
    getAllCinemas: () => cinemaData,

    getCinemaById: (id) => cinemaData.find(cinema => cinema.id === parseInt(id)),

    // Utility functions
    formatDuration: (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}j ${mins}m`;
    },

    formatPrice: (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    },

    formatDate: (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }
};

// Export untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { filmsData, foodData, cinemaData, DataHelper };
}