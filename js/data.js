// Data Film
const dataSemuaFilm = [ 
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
        poster: "../img/assets/spider.jpg",
        trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
        status: "now_snowing",
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
        judul: "The Hunger Games: Sunrise on the Reaping",
        genre: ["Action", "Drama", "Sci-Fi"],
        durasi: 137,
        rating: 8.1,
        tahun: 2025,
        sutradara: "Francis Lawrence",
        pemeran: ["Tom Blyth", "Rachel Zegler", "Hunter Schafer", "Josh Andrés Rivera", "Peter Dinklage"],
        sinopsis: "Prequel yang mengisahkan Hunger Games ke-50 (Second Quarter Quell) di mana Haymitch Abernathy menjadi pemenang. Film ini mengeksplorasi bagaimana permainan yang brutal ini membentuk masa depan Panem.",
        poster: "../img/assets/hunger.jpg",
        trailer: "https://www.youtube.com/watch?v=example15",
        status: "coming_soon",
        jadwal: [
            {
                bioskop: "XXI Grand Indonesia",
                tanggal: "2025-06-15",
                jam: ["12:30", "15:45", "19:00"]
            },
            {
                bioskop: "CGV Pacific Place",
                tanggal: "2025-06-15",
                jam: ["13:00", "16:15", "19:30"]
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
        status: "now_snowing",
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
        status: "now_snowing",
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
        poster: "../img/assets/top.jpg",
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
        poster: "../img/assets/oppen.jpg",
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
    }
];

// Data Detail Bioskop 
const detailSemuaBioskop = { 
    1: {
        id: 1,
        name: "GRAND GALAXY PARK XXI",
        address: "Grand Galaxy Park, Surabaya",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.1!2d112.7521!3d-7.3094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb91b8c8c8c8%3A0x1!2sGrand%20Galaxy%20Park!5e0!3m2!1sen!2sid!4v1234567890",
        schedule: {
            "Senin": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Selasa": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Rabu": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Kamis": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Jumat": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Sabtu": ["09:00", "12:00", "15:00", "18:00", "21:00"],
            "Minggu": ["09:00", "12:00", "15:00", "18:00", "21:00"]
        },
        filmIds: [1, 2, 3]
    },
    2: {
        id: 2,
        name: "TUNJUNGAN PLAZA XXI",
        address: "Tunjungan Plaza, Surabaya",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2!2d112.7380!3d-7.2574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb91b8c8c8c8%3A0x2!2sTunjungan%20Plaza!5e0!3m2!1sen!2sid!4v1234567891",
        schedule: {
            "Senin": ["11:00", "14:00", "17:00", "20:00"],
            "Selasa": ["11:00", "14:00", "17:00", "20:00"],
            "Rabu": ["11:00", "14:00", "17:00", "20:00"],
            "Kamis": ["11:00", "14:00", "17:00", "20:00"],
            "Jumat": ["11:00", "14:00", "17:00", "20:00", "23:00"],
            "Sabtu": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Minggu": ["10:00", "13:00", "16:00", "19:00", "22:00"]
        },
        filmIds: [1, 3, 4]
    },
    3: {
        id: 3,
        name: "PAKUWON MALL XXI",
        address: "Pakuwon Mall, Surabaya",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.3!2d112.6890!3d-7.2891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb91b8c8c8c8%3A0x3!2sPakuwon%20Mall!5e0!3m2!1sen!2sid!4v1234567892",
        schedule: {
            "Senin": ["10:30", "13:30", "16:30", "19:30"],
            "Selasa": ["10:30", "13:30", "16:30", "19:30"],
            "Rabu": ["10:30", "13:30", "16:30", "19:30"],
            "Kamis": ["10:30", "13:30", "16:30", "19:30"],
            "Jumat": ["10:30", "13:30", "16:30", "19:30", "22:30"],
            "Sabtu": ["09:30", "12:30", "15:30", "18:30", "21:30"],
            "Minggu": ["09:30", "12:30", "15:30", "18:30", "21:30"]
        },
        filmIds: [2, 3, 5]
    },
    4: {
        id: 4,
        name: "LENMARC MALL XXI",
        address: "Lenmarc Mall, Surabaya",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4!2d112.7245!3d-7.2456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb91b8c8c8c8%3A0x4!2sLenmarc%20Mall!5e0!3m2!1sen!2sid!4v1234567893",
        schedule: {
            "Senin": ["11:15", "14:15", "17:15", "20:15"],
            "Selasa": ["11:15", "14:15", "17:15", "20:15"],
            "Rabu": ["11:15", "14:15", "17:15", "20:15"],
            "Kamis": ["11:15", "14:15", "17:15", "20:15"],
            "Jumat": ["11:15", "14:15", "17:15", "20:15", "23:15"],
            "Sabtu": ["10:15", "13:15", "16:15", "19:15", "22:15"],
            "Minggu": ["10:15", "13:15", "16:15", "19:15", "22:15"]
        },
        filmIds: [1, 4, 5]
    },
    5: {
        id: 5,
        name: "ROYAL PLAZA XXI",
        address: "Royal Plaza, Surabaya",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5!2d112.7456!3d-7.2789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb91b8c8c8c8%3A0x5!2sRoyal%20Plaza!5e0!3m2!1sen!2sid!4v1234567894",
        schedule: {
            "Senin": ["10:45", "13:45", "16:45", "19:45"],
            "Selasa": ["10:45", "13:45", "16:45", "19:45"],
            "Rabu": ["10:45", "13:45", "16:45", "19:45"],
            "Kamis": ["10:45", "13:45", "16:45", "19:45"],
            "Jumat": ["10:45", "13:45", "16:45", "19:45", "22:45"],
            "Sabtu": ["09:45", "12:45", "15:45", "18:45", "21:45"],
            "Minggu": ["09:45", "12:45", "15:45", "18:45", "21:45"]
        },
        filmIds: [2, 4, 6]
    },
    6: {
        id: 6,
        name: "XXI Grand Indonesia",
        address: "Grand Indonesia Shopping Town, Jakarta Pusat",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666666666667!2d106.8219444!3d-6.1944444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e8b8b8b8%3A0x6!2sGrand%20Indonesia!5e0!3m2!1sen!2sid!4v1234567895",
        schedule: {
            "Senin": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Selasa": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Rabu": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Kamis": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Jumat": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Sabtu": ["09:00", "12:00", "15:00", "18:00", "21:00"],
            "Minggu": ["09:00", "12:00", "15:00", "18:00", "21:00"]
        },
        filmIds: [1, 2, 3]
    },
    7: {
        id: 7,
        name: "CGV Pacific Place",
        address: "Pacific Place Mall, Jakarta Selatan",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.777!2d106.8000000!3d-6.2222222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e8b8b8b8%3A0x7!2sPacific%20Place!5e0!3m2!1sen!2sid!4v1234567896",
        schedule: {
            "Senin": ["11:00", "14:00", "17:00", "20:00"],
            "Selasa": ["11:00", "14:00", "17:00", "20:00"],
            "Rabu": ["11:00", "14:00", "17:00", "20:00"],
            "Kamis": ["11:00", "14:00", "17:00", "20:00"],
            "Jumat": ["11:00", "14:00", "17:00", "20:00", "23:00"],
            "Sabtu": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Minggu": ["10:00", "13:00", "16:00", "19:00", "22:00"]
        },
        filmIds: [1, 3, 4]
    },
    8: {
        id: 8,
        name: "Cinépolis Plaza Senayan",
        address: "Plaza Senayan, Jakarta Pusat",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.888!2d106.7950000!3d-6.2350000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e8b8b8b8%3A0x8!2sPlaza%20Senayan!5e0!3m2!1sen!2sid!4v1234567897",
        schedule: {
            "Senin": ["10:30", "13:30", "16:30", "19:30"],
            "Selasa": ["10:30", "13:30", "16:30", "19:30"],
            "Rabu": ["10:30", "13:30", "16:30", "19:30"],
            "Kamis": ["10:30", "13:30", "16:30", "19:30"],
            "Jumat": ["10:30", "13:30", "16:30", "19:30", "22:30"],
            "Sabtu": ["09:30", "12:30", "15:30", "18:30", "21:30"],
            "Minggu": ["09:30", "12:30", "15:30", "18:30", "21:30"]
        },
        filmIds: [2, 3, 5]
    },
    9: {
        id: 9,
        name: "XXI Senayan City",
        address: "Senayan City Mall, Jakarta Selatan",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.555555555556!2d106.8000000!3d-6.2000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e8b8b8b8%3A0x9!2sSenayan%20City!5e0!3m2!1sen!2sid!4v1234567898",
        schedule: {
            "Senin": ["11:00", "14:00", "17:00", "20:00"],
            "Selasa": ["11:00", "14:00", "17:00", "20:00"],
            "Rabu": ["11:00", "14:00", "17:00", "20:00"],
            "Kamis": ["11:00", "14:00", "17:00", "20:00"],
            "Jumat": ["11:00", "14:00", "17:00", "20:00", "23:00"],
            "Sabtu": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Minggu": ["10:00", "13:00", "16:00", "19:00", "22:00"]
        },
        filmIds: [1, 3, 4]
    },
    10: {
        id: 10,
        name: "XXI Kota Kasablanka",
        address: "Kota Kasablanka Mall, Jakarta Selatan",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.999!2d106.8456789!3d-6.2456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e8b8b8b8%3A0x10!2sKota%20Kasablanka!5e0!3m2!1sen!2sid!4v1234567899",
        schedule: {
            "Senin": ["11:15", "14:15", "17:15", "20:15"],
            "Selasa": ["11:15", "14:15", "17:15", "20:15"],
            "Rabu": ["11:15", "14:15", "17:15", "20:15"],
            "Kamis": ["11:15", "14:15", "17:15", "20:15"],
            "Jumat": ["11:15", "14:15", "17:15", "20:15", "23:15"],
            "Sabtu": ["10:15", "13:15", "16:15", "19:15", "22:15"],
            "Minggu": ["10:15", "13:15", "16:15", "19:15", "22:15"]
        },
        filmIds: [1, 4, 5]
    },
    11: {
        id: 11,
        name: "CGV Grand Indonesia",
        address: "Grand Indonesia Shopping Town, Jakarta Pusat",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666666666667!2d106.8219444!3d-6.1944444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e8b8b8b8%3A0x11!2sGrand%20Indonesia!5e0!3m2!1sen!2sid!4v1234567900",
        schedule: {
            "Senin": ["10:45", "13:45", "16:45", "19:45"],
            "Selasa": ["10:45", "13:45", "16:45", "19:45"],
            "Rabu": ["10:45", "13:45", "16:45", "19:45"],
            "Kamis": ["10:45", "13:45", "16:45", "19:45"],
            "Jumat": ["10:45", "13:45", "16:45", "19:45", "22:45"],
            "Sabtu": ["09:45", "12:45", "15:45", "18:45", "21:45"],
            "Minggu": ["09:45", "12:45", "15:45", "18:45", "21:45"]
        },
        filmIds: [2, 4, 6]
    },
    12: {
        id: 12,
        name: "Cinépolis FX Sudirman",
        address: "FX Sudirman Mall, Jakarta Pusat",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.777!2d106.8111111!3d-6.2111111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e8b8b8b8%3A0x12!2sFX%20Sudirman!5e0!3m2!1sen!2sid!4v1234567901",
        schedule: {
            "Senin": ["12:00", "15:00", "18:00", "21:00"],
            "Selasa": ["12:00", "15:00", "18:00", "21:00"],
            "Rabu": ["12:00", "15:00", "18:00", "21:00"],
            "Kamis": ["12:00", "15:00", "18:00", "21:00"],
            "Jumat": ["12:00", "15:00", "18:00", "21:00", "24:00"],
            "Sabtu": ["11:00", "14:00", "17:00", "20:00", "23:00"],
            "Minggu": ["11:00", "14:00", "17:00", "20:00", "23:00"]
        },
        filmIds: [3, 5, 6]
    },
    13: {
        id: 13,
        name: "XXI Plaza Indonesia",
        address: "Plaza Indonesia, Jakarta Pusat",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.555!2d106.8222222!3d-6.1888888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e8b8b8b8%3A0x13!2sPlaza%20Indonesia!5e0!3m2!1sen!2sid!4v1234567902",
        schedule: {
            "Senin": ["10:20", "13:20", "16:20", "19:20"],
            "Selasa": ["10:20", "13:20", "16:20", "19:20"],
            "Rabu": ["10:20", "13:20", "16:20", "19:20"],
            "Kamis": ["10:20", "13:20", "16:20", "19:20"],
            "Jumat": ["10:20", "13:20", "16:20", "19:20", "22:20"],
            "Sabtu": ["09:20", "12:20", "15:20", "18:20", "21:20"],
            "Minggu": ["09:20", "12:20", "15:20", "18:20", "21:20"]
        },
        filmIds: [1, 2, 4]
    },
    14: {
        id: 14,
        name: "CGV Central Park",
        address: "Central Park Mall, Jakarta Barat",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.444!2d106.7888888!3d-6.1777777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e8b8b8b8%3A0x14!2sCentral%20Park!5e0!3m2!1sen!2sid!4v1234567903",
        schedule: {
            "Senin": ["11:30", "14:30", "17:30", "20:30"],
            "Selasa": ["11:30", "14:30", "17:30", "20:30"],
            "Rabu": ["11:30", "14:30", "17:30", "20:30"],
            "Kamis": ["11:30", "14:30", "17:30", "20:30"],
            "Jumat": ["11:30", "14:30", "17:30", "20:30", "23:30"],
            "Sabtu": ["10:30", "13:30", "16:30", "19:30", "22:30"],
            "Minggu": ["10:30", "13:30", "16:30", "19:30", "22:30"]
        },
        filmIds: [2, 3, 6]
    },
    15: {
        id: 15,
        name: "BANDUNG ELECTRONIC CENTER XXI",
        address: "Bandung Electronic Center, Bandung",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1!2d107.6098!3d-6.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7a8e8e8e8e8%3A0x15!2sBEC%20Bandung!5e0!3m2!1sen!2sid!4v1234567904",
        schedule: {
            "Senin": ["10:00", "13:00", "16:00", "19:00"],
            "Selasa": ["10:00", "13:00", "16:00", "19:00"],
            "Rabu": ["10:00", "13:00", "16:00", "19:00"],
            "Kamis": ["10:00", "13:00", "16:00", "19:00"],
            "Jumat": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Sabtu": ["09:00", "12:00", "15:00", "18:00", "21:00"],
            "Minggu": ["09:00", "12:00", "15:00", "18:00", "21:00"]
        },
        filmIds: [1, 3, 5]
    },
    16: {
        id: 16,
        name: "PARIS VAN JAVA XXI",
        address: "Paris Van Java Mall, Bandung",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.2!2d107.6234!3d-6.8945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7a8e8e8e8e8%3A0x16!2sParis%20Van%20Java!5e0!3m2!1sen!2sid!4v1234567905",
        schedule: {
            "Senin": ["11:00", "14:00", "17:00", "20:00"],
            "Selasa": ["11:00", "14:00", "17:00", "20:00"],
            "Rabu": ["11:00", "14:00", "17:00", "20:00"],
            "Kamis": ["11:00", "14:00", "17:00", "20:00"],
            "Jumat": ["11:00", "14:00", "17:00", "20:00", "23:00"],
            "Sabtu": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Minggu": ["10:00", "13:00", "16:00", "19:00", "22:00"]
        },
        filmIds: [2, 4, 6]
    },
    17: {
        id: 17,
        name: "CIHAMPELAS WALK XXI",
        address: "Cihampelas Walk, Bandung",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3!2d107.5967!3d-6.8967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7a8e8e8e8e8%3A0x17!2sCihampelas%20Walk!5e0!3m2!1sen!2sid!4v1234567906",
        schedule: {
            "Senin": ["10:30", "13:30", "16:30", "19:30"],
            "Selasa": ["10:30", "13:30", "16:30", "19:30"],
            "Rabu": ["10:30", "13:30", "16:30", "19:30"],
            "Kamis": ["10:30", "13:30", "16:30", "19:30"],
            "Jumat": ["10:30", "13:30", "16:30", "19:30", "22:30"],
            "Sabtu": ["09:30", "12:30", "15:30", "18:30", "21:30"],
            "Minggu": ["09:30", "12:30", "15:30", "18:30", "21:30"]
        },
        filmIds: [1, 2, 4]
    },
    18: {
        id: 18,
        name: "TRANS STUDIO MALL XXI",
        address: "Trans Studio Mall, Bandung",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.4!2d107.6456!3d-6.9234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7a8e8e8e8e8%3A0x18!2sTrans%20Studio%20Mall!5e0!3m2!1sen!2sid!4v1234567907",
        schedule: {
            "Senin": ["11:15", "14:15", "17:15", "20:15"],
            "Selasa": ["11:15", "14:15", "17:15", "20:15"],
            "Rabu": ["11:15", "14:15", "17:15", "20:15"],
            "Kamis": ["11:15", "14:15", "17:15", "20:15"],
            "Jumat": ["11:15", "14:15", "17:15", "20:15", "23:15"],
            "Sabtu": ["10:15", "13:15", "16:15", "19:15", "22:15"],
            "Minggu": ["10:15", "13:15", "16:15", "19:15", "22:15"]
        },
        filmIds: [3, 5, 6]
    },
    19: {
        id: 19,
        name: "Bioskop saya (misalnya)",
        address: "bumi",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.4!2d107.6456!3d-6.9234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7a8e8e8e8e8%3A0x18!2sTrans%20Studio%20Mall!5e0!3m2!1sen!2sid!4v1234567907",
        schedule: {
            "Senin": ["11:15", "14:15", "17:15", "20:15"],
            "Selasa": ["11:15", "14:15", "17:15", "20:15"],
            "Rabu": ["11:15", "14:15", "17:15", "20:15"],
            "Kamis": ["11:15", "14:15", "17:15", "20:15"],
            "Jumat": ["11:15", "14:15", "17:15", "20:15", "23:15"],
            "Sabtu": ["10:15", "13:15", "16:15", "19:15", "22:15"],
            "Minggu": ["10:15", "13:15", "16:15", "19:15", "22:15"]
        },
        filmIds: [3, 5, 6]
    },
     20: {
        id: 20,
        name: "JOGJA CITY MALL XXI",
        address: "Jogja City Mall, Yogyakarta",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.9!2d110.4012!3d-7.7234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787a8a8a8a8%3A0x20!2sJogja%20City%20Mall!5e0!3m2!1sen!2sid!4v1234567909",
        schedule: {
            "Senin": ["11:00", "14:00", "17:00", "20:00"],
            "Selasa": ["11:00", "14:00", "17:00", "20:00"],
            "Rabu": ["11:00", "14:00", "17:00", "20:00"],
            "Kamis": ["11:00", "14:00", "17:00", "20:00"],
            "Jumat": ["11:00", "14:00", "17:00", "20:00", "23:00"],
            "Sabtu": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Minggu": ["10:00", "13:00", "16:00", "19:00", "22:00"]
        },
        filmIds: [2, 4, 6]
    },
    21: {
        id: 21,
        name: "GALERIA MALL XXI",
        address: "Galeria Mall, Yogyakarta",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0!2d110.3678!3d-7.7345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787a8a8a8a8%3A0x21!2sGaleria%20Mall!5e0!3m2!1sen!2sid!4v1234567910",
        schedule: {
            "Senin": ["10:30", "13:30", "16:30", "19:30"],
            "Selasa": ["10:30", "13:30", "16:30", "19:30"],
            "Rabu": ["10:30", "13:30", "16:30", "19:30"],
            "Kamis": ["10:30", "13:30", "16:30", "19:30"],
            "Jumat": ["10:30", "13:30", "16:30", "19:30", "22:30"],
            "Sabtu": ["09:30", "12:30", "15:30", "18:30", "21:30"],
            "Minggu": ["09:30", "12:30", "15:30", "18:30", "21:30"]
        },
        filmIds: [1, 2, 4]
    },
    25: {
        id: 25,
        name: "CGV AEON Mall BSD City",
        address: "AEON Mall BSD City, Tangerang",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5!2d106.6456!3d-6.3012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e8a8a8a8a8a8%3A0x25!2sAEON%20Mall%20BSD!5e0!3m2!1sen!2sid!4v1234567911",
        schedule: {
            "Senin": ["10:00", "13:00", "16:00", "19:00"],
            "Selasa": ["10:00", "13:00", "16:00", "19:00"],
            "Rabu": ["10:00", "13:00", "16:00", "19:00"],
            "Kamis": ["10:00", "13:00", "16:00", "19:00"],
            "Jumat": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Sabtu": ["09:00", "12:00", "15:00", "18:00", "21:00"],
            "Minggu": ["09:00", "12:00", "15:00", "18:00", "21:00"]
        },
        filmIds: [3, 5, 6]
    },
    26: {
        id: 26,
        name: "BOTANI SQUARE XXI",
        address: "Botani Square, Bogor",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2!2d106.7890!3d-6.5934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c8c8c8c8c8c8%3A0x26!2sBotani%20Square!5e0!3m2!1sen!2sid!4v1234567912",
        schedule: {
            "Senin": ["11:00", "14:00", "17:00", "20:00"],
            "Selasa": ["11:00", "14:00", "17:00", "20:00"],
            "Rabu": ["11:00", "14:00", "17:00", "20:00"],
            "Kamis": ["11:00", "14:00", "17:00", "20:00"],
            "Jumat": ["11:00", "14:00", "17:00", "20:00", "23:00"],
            "Sabtu": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Minggu": ["10:00", "13:00", "16:00", "19:00", "22:00"]
        },
        filmIds: [1, 2, 4]
    },
    27: {
        id: 27,
        name: "CGV VIVO MALL",
        address: "VIVO Mall, Bogor",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3!2d106.8012!3d-6.5678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c8c8c8c8c8c8%3A0x27!2sVIVO%20Mall!5e0!3m2!1sen!2sid!4v1234567913",
        schedule: {
            "Senin": ["10:30", "13:30", "16:30", "19:30"],
            "Selasa": ["10:30", "13:30", "16:30", "19:30"],
            "Rabu": ["10:30", "13:30", "16:30", "19:30"],
            "Kamis": ["10:30", "13:30", "16:30", "19:30"],
            "Jumat": ["10:30", "13:30", "16:30", "19:30", "22:30"],
            "Sabtu": ["09:30", "12:30", "15:30", "18:30", "21:30"],
            "Minggu": ["09:30", "12:30", "15:30", "18:30", "21:30"]
        },
        filmIds: [2, 3, 5]
    },
    28: {
        id: 28,
        name: "MARGO CITY XXI",
        address: "Margo City Mall, Depok",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.8!2d106.8234!3d-6.4012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e9e9e9e9e9e9%3A0x28!2sMargo%20City!5e0!3m2!1sen!2sid!4v1234567914",
        schedule: {
            "Senin": ["11:15", "14:15", "17:15", "20:15"],
            "Selasa": ["11:15", "14:15", "17:15", "20:15"],
            "Rabu": ["11:15", "14:15", "17:15", "20:15"],
            "Kamis": ["11:15", "14:15", "17:15", "20:15"],
            "Jumat": ["11:15", "14:15", "17:15", "20:15", "23:15"],
            "Sabtu": ["10:15", "13:15", "16:15", "19:15", "22:15"],
            "Minggu": ["10:15", "13:15", "16:15", "19:15", "22:15"]
        },
        filmIds: [1, 4, 6]
    },
    29: {
        id: 29,
        name: "DEPOK TOWN SQUARE XXI",
        address: "Depok Town Square, Depok",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.9!2d106.8345!3d-6.3789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e9e9e9e9e9e9%3A0x29!2sDepok%20Town%20Square!5e0!3m2!1sen!2sid!4v1234567915",
        schedule: {
            "Senin": ["10:45", "13:45", "16:45", "19:45"],
            "Selasa": ["10:45", "13:45", "16:45", "19:45"],
            "Rabu": ["10:45", "13:45", "16:45", "19:45"],
            "Kamis": ["10:45", "13:45", "16:45", "19:45"],
            "Jumat": ["10:45", "13:45", "16:45", "19:45", "22:45"],
            "Sabtu": ["09:45", "12:45", "15:45", "18:45", "21:45"],
            "Minggu": ["09:45", "12:45", "15:45", "18:45", "21:45"]
        },
        filmIds: [2, 3, 6]
    },
    30: {
        id: 30,
        name: "SUMMARECON MALL BEKASI XXI",
        address: "Summarecon Mall Bekasi, Bekasi",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7!2d107.0012!3d-6.2345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698a8a8a8a8a8a%3A0x30!2sSummarecon%20Mall%20Bekasi!5e0!3m2!1sen!2sid!4v1234567916",
        schedule: {
            "Senin": ["12:00", "15:00", "18:00", "21:00"],
            "Selasa": ["12:00", "15:00", "18:00", "21:00"],
            "Rabu": ["12:00", "15:00", "18:00", "21:00"],
            "Kamis": ["12:00", "15:00", "18:00", "21:00"],
            "Jumat": ["12:00", "15:00", "18:00", "21:00", "24:00"],
            "Sabtu": ["11:00", "14:00", "17:00", "20:00", "23:00"],
            "Minggu": ["11:00", "14:00", "17:00", "20:00", "23:00"]
        },
        filmIds: [1, 3, 5]
    },
    31: {
        id: 31,
        name: "GRAND GALAXY PARK XXI",
        address: "Grand Galaxy Park, Bekasi",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8!2d107.0234!3d-6.2678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698a8a8a8a8a8a%3A0x31!2sGrand%20Galaxy%20Park%20Bekasi!5e0!3m2!1sen!2sid!4v1234567917",
        schedule: {
            "Senin": ["10:20", "13:20", "16:20", "19:20"],
            "Selasa": ["10:20", "13:20", "16:20", "19:20"],
            "Rabu": ["10:20", "13:20", "16:20", "19:20"],
            "Kamis": ["10:20", "13:20", "16:20", "19:20"],
            "Jumat": ["10:20", "13:20", "16:20", "19:20", "22:20"],
            "Sabtu": ["09:20", "12:20", "15:20", "18:20", "21:20"],
            "Minggu": ["09:20", "12:20", "15:20", "18:20", "21:20"]
        },
        filmIds: [2, 4, 6]
    },
    32: {
        id: 32,
        name: "CIMAHI MALL XXI",
        address: "Cimahi Mall, Cimahi",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6!2d107.5456!3d-6.8723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7b7b7b7b7b7%3A0x32!2sCimahi%20Mall!5e0!3m2!1sen!2sid!4v1234567918",
        schedule: {
            "Senin": ["11:30", "14:30", "17:30", "20:30"],
            "Selasa": ["11:30", "14:30", "17:30", "20:30"],
            "Rabu": ["11:30", "14:30", "17:30", "20:30"],
            "Kamis": ["11:30", "14:30", "17:30", "20:30"],
            "Jumat": ["11:30", "14:30", "17:30", "20:30", "23:30"],
            "Sabtu": ["10:30", "13:30", "16:30", "19:30", "22:30"],
            "Minggu": ["10:30", "13:30", "16:30", "19:30", "22:30"]
        },
        filmIds: [1, 3, 4]
    },
    33: {
        id: 33,
        name: "CSB MALL XXI",
        address: "CSB Mall, Cirebon",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2!2d108.5567!3d-6.7345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1e1e1e1e1e1e%3A0x33!2sCSB%20Mall!5e0!3m2!1sen!2sid!4v1234567919",
        schedule: {
            "Senin": ["10:00", "13:00", "16:00", "19:00"],
            "Selasa": ["10:00", "13:00", "16:00", "19:00"],
            "Rabu": ["10:00", "13:00", "16:00", "19:00"],
            "Kamis": ["10:00", "13:00", "16:00", "19:00"],
            "Jumat": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Sabtu": ["09:00", "12:00", "15:00", "18:00", "21:00"],
            "Minggu": ["09:00", "12:00", "15:00", "18:00", "21:00"]
        },
        filmIds: [2, 5, 6]
    },
    34: {
        id: 34,
        name: "GRAGE MALL XXI",
        address: "Grage Mall, Cirebon",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.3!2d108.5678!3d-6.7456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1e1e1e1e1e1e%3A0x34!2sGrage%20Mall!5e0!3m2!1sen!2sid!4v1234567920",
        schedule: {
            "Senin": ["11:00", "14:00", "17:00", "20:00"],
            "Selasa": ["11:00", "14:00", "17:00", "20:00"],
            "Rabu": ["11:00", "14:00", "17:00", "20:00"],
            "Kamis": ["11:00", "14:00", "17:00", "20:00"],
            "Jumat": ["11:00", "14:00", "17:00", "20:00", "23:00"],
            "Sabtu": ["10:00", "13:00", "16:00", "19:00", "22:00"],
            "Minggu": ["10:00", "13:00", "16:00", "19:00", "22:00"]
        },
        filmIds: [1, 3, 4]
    },
    35: {
        id: 35,
        name: "PLAZA ASIA XXI",
        address: "Plaza Asia, Tasikmalaya",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4!2d108.2012!3d-7.3234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e659f9f9f9f9f9f%3A0x35!2sPlaza%20Asia!5e0!3m2!1sen!2sid!4v1234567921",
        schedule: {
            "Senin": ["10:30", "13:30", "16:30", "19:30"],
            "Selasa": ["10:30", "13:30", "16:30", "19:30"],
            "Rabu": ["10:30", "13:30", "16:30", "19:30"],
            "Kamis": ["10:30", "13:30", "16:30", "19:30"],
            "Jumat": ["10:30", "13:30", "16:30", "19:30", "22:30"],
            "Sabtu": ["09:30", "12:30", "15:30", "18:30", "21:30"],
            "Minggu": ["09:30", "12:30", "15:30", "18:30", "21:30"]
        },
        filmIds: [2, 4, 5]
    },
    36: {
        id: 36,
        name: "PARAGON XXI",
        address: "Paragon Mall, Semarang",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9!2d110.4123!3d-6.9834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b8b8b8b8b8b%3A0x36!2sParagon%20Semarang!5e0!3m2!1sen!2sid!4v1234567922",
        schedule: {
            "Senin": ["11:15", "14:15", "17:15", "20:15"],
            "Selasa": ["11:15", "14:15", "17:15", "20:15"],
            "Rabu": ["11:15", "14:15", "17:15", "20:15"],
            "Kamis": ["11:15", "14:15", "17:15", "20:15"],
            "Jumat": ["11:15", "14:15", "17:15", "20:15", "23:15"],
            "Sabtu": ["10:15", "13:15", "16:15", "19:15", "22:15"],
            "Minggu": ["10:15", "13:15", "16:15", "19:15", "22:15"]
        },
        filmIds: [1, 3, 6]
    },
    37: {
        id: 37,
        name: "DP MALL XXI",
        address: "DP Mall, Semarang",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.0!2d110.4234!3d-6.9945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b8b8b8b8b8b%3A0x37!2sDP%20Mall!5e0!3m2!1sen!2sid!4v1234567923",
        schedule: {
            "Senin": ["10:45", "13:45", "16:45", "19:45"],
            "Selasa": ["10:45", "13:45", "16:45", "19:45"],
            "Rabu": ["10:45", "13:45", "16:45", "19:45"],
            "Kamis": ["10:45", "13:45", "16:45", "19:45"],
            "Jumat": ["10:45", "13:45", "16:45", "19:45", "22:45"],
            "Sabtu": ["09:45", "12:45", "15:45", "18:45", "21:45"],
            "Minggu": ["09:45", "12:45", "15:45", "18:45", "21:45"]
        },
        filmIds: [2, 4, 5]
    },
    38: {
        id: 38,
        name: "SOLO PARAGON XXI",
        address: "Solo Paragon Mall, Solo",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.1!2d110.8123!3d-7.5612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1c1c1c1c1c1c%3A0x38!2sSolo%20Paragon!5e0!3m2!1sen!2sid!4v1234567924",
        schedule: {
            "Senin": ["12:00", "15:00", "18:00", "21:00"],
            "Selasa": ["12:00", "15:00", "18:00", "21:00"],
            "Rabu": ["12:00", "15:00", "18:00", "21:00"],
            "Kamis": ["12:00", "15:00", "18:00", "21:00"],
            "Jumat": ["12:00", "15:00", "18:00", "21:00", "24:00"],
            "Sabtu": ["11:00", "14:00", "17:00", "20:00", "23:00"],
            "Minggu": ["11:00", "14:00", "17:00", "20:00", "23:00"]
        },
        filmIds: [1, 2, 6]
    },
    39: {
        id: 39,
        name: "HARTONO MALL XXI",
        address: "Hartono Mall, Solo",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.2!2d110.8234!3d-7.5723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1c1c1c1c1c1c%3A0x39!2sHartono%20Mall!5e0!3m2!1sen!2sid!4v1234567925",
        schedule: {
            "Senin": ["10:20", "13:20", "16:20", "19:20"],
            "Selasa": ["10:20", "13:20", "16:20", "19:20"],
            "Rabu": ["10:20", "13:20", "16:20", "19:20"],
            "Kamis": ["10:20", "13:20", "16:20", "19:20"],
            "Jumat": ["10:20", "13:20", "16:20", "19:20", "22:20"],
            "Sabtu": ["09:20", "12:20", "15:20", "18:20", "21:20"],
            "Minggu": ["09:20", "12:20", "15:20", "18:20", "21:20"]
        },
        filmIds: [3, 4, 5]
    },
    40: {
        id: 40,
        name: "Cinépolis Salatiga",
        address: "Salatiga Mall, Salatiga",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.8!2d110.4934!3d-7.3312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1d1d1d1d1d1d%3A0x40!2sSalatiga%20Mall!5e0!3m2!1sen!2sid!4v1234567926",
        schedule: {
            "Senin": ["11:30", "14:30", "17:30", "20:30"],
            "Selasa": ["11:30", "14:30", "17:30", "20:30"],
            "Rabu": ["11:30", "14:30", "17:30", "20:30"],
            "Kamis": ["11:30", "14:30", "17:30", "20:30"],
            "Jumat": ["11:30", "14:30", "17:30", "20:30", "23:30"],
            "Sabtu": ["10:30", "13:30", "16:30", "19:30", "22:30"],
            "Minggu": ["10:30", "13:30", "16:30", "19:30", "22:30"]
        },
        filmIds: [1, 2, 3]
    }
}



const dataBioskopPerKota = { 
     "surabaya": [
        { id: 1, nama: "GRAND GALAXY PARK XXI", kota: "surabaya" },
        { id: 2, nama: "TUNJUNGAN PLAZA XXI", kota: "surabaya" },
        { id: 3, nama: "PAKUWON MALL XXI", kota: "surabaya" },
        { id: 4, nama: "LENMARC MALL XXI", kota: "surabaya" },
        { id: 5, nama: "ROYAL PLAZA XXI", kota: "surabaya" }
    ],
    "jakarta": [
        { id: 6, nama: "XXI Grand Indonesia", kota: "jakarta" },
        { id: 7, nama: "CGV Pacific Place", kota: "jakarta" },
        { id: 8, nama: "Cinépolis Plaza Senayan", kota: "jakarta" },
        { id: 9, nama: "XXI Senayan City", kota: "jakarta" },
        { id: 10, nama: "XXI Kota Kasablanka", kota: "jakarta" },
        { id: 11, nama: "CGV Grand Indonesia", kota: "jakarta" },
        { id: 12, nama: "Cinépolis FX Sudirman", kota: "jakarta" },
        { id: 13, nama: "XXI Plaza Indonesia", kota: "jakarta" },
        { id: 14, nama: "CGV Central Park", kota: "jakarta" }
    ],
    "bandung": [
        { id: 15, nama: "BANDUNG ELECTRONIC CENTER XXI", kota: "bandung" },
        { id: 16, nama: "PARIS VAN JAVA XXI", kota: "bandung" },
        { id: 17, nama: "CIHAMPELAS WALK XXI", kota: "bandung" },
        { id: 18, nama: "TRANS STUDIO MALL XXI", kota: "bandung" }
    ],
    "yogyakarta": [
        { id: 19, nama: "MALIOBORO MALL XXI", kota: "yogyakarta" },
        { id: 20, nama: "JOGJA CITY MALL XXI", kota: "yogyakarta" },
        { id: 21, nama: "GALERIA MALL XXI", kota: "yogyakarta" }
    ],
    "tangerang": [
        { id: 25, nama: "CGV AEON Mall BSD City", kota: "tangerang" }
    ],
    "bogor": [
        { id: 26, nama: "BOTANI SQUARE XXI", kota: "bogor" },
        { id: 27, nama: "CGV VIVO MALL", kota: "bogor" }
    ],
    "depok": [
        { id: 28, nama: "MARGO CITY XXI", kota: "depok" },
        { id: 29, nama: "DEPOK TOWN SQUARE XXI", kota: "depok" }
    ],
    "bekasi": [
        { id: 30, nama: "SUMMARECON MALL BEKASI XXI", kota: "bekasi" },
        { id: 31, nama: "GRAND GALAXY PARK XXI", kota: "bekasi" }
    ],
    "cimahi": [
        { id: 32, nama: "CIMAHI MALL XXI", kota: "cimahi" }
    ],
    "cirebon": [
        { id: 33, nama: "CSB MALL XXI", kota: "cirebon" },
        { id: 34, nama: "GRAGE MALL XXI", kota: "cirebon" }
    ],
    "tasikmalaya": [
        { id: 35, nama: "PLAZA ASIA XXI", kota: "tasikmalaya" }
    ],
    "semarang": [
        { id: 36, nama: "PARAGON XXI", kota: "semarang" },
        { id: 37, nama: "DP MALL XXI", kota: "semarang" }
    ],
    "solo": [
        { id: 38, nama: "SOLO PARAGON XXI", kota: "solo" },
        { id: 39, nama: "HARTONO MALL XXI", kota: "solo" }
    ],
    "salatiga": [
        { id: 40, nama: "Cinépolis Salatiga", kota: "salatiga" }
    ],
    "magelang": [
        { id: 41, nama: "ARTOS MALL XXI", kota: "magelang" }
    ],
    "purwokerto": [
        { id: 42, nama: "RITA SUPER MALL XXI", kota: "purwokerto" }
    ],
    "malang": [
        { id: 43, nama: "MALANG TOWN SQUARE XXI", kota: "malang" },
        { id: 44, nama: "TRANSMART MX XXI", kota: "malang" }
    ],
    "kediri": [
        { id: 45, nama: "KEDIRI MALL XXI", kota: "kediri" }
    ],
    "madiun": [
        { id: 46, nama: "PLAZA MADIUN XXI", kota: "madiun" }
    ],
    "blitar": [
        { id: 47, nama: "CGV BLITAR SQUARE", kota: "blitar" }
    ],
    "jember": [
        { id: 48, nama: "LIPPO PLAZA XXI", kota: "jember" }
    ],
    "probolinggo": [
        { id: 49, nama: "Cinépolis Probolinggo", kota: "probolinggo" }
    ],
    "pasuruan": [
        { id: 50, nama: "CGV PASURUAN", kota: "pasuruan" }
    ],
    "sidoarjo": [
        { id: 51, nama: "CIPUTRA WORLD XXI", kota: "sidoarjo" }
    ],
    "mojokerto": [
        { id: 52, nama: "SUNRISE MALL XXI", kota: "mojokerto" }
    ],
    "serang": [
        { id: 53, nama: "Cinépolis Serang Mall", kota: "serang" }
    ],
    "cilegon": [
        { id: 54, nama: "CGV CILEGON CENTER MALL", kota: "cilegon" }
    ]
};



// Daftar Kota 
const daftarKotaTersedia = {
    "jakarta": "Jakarta",
    "bogor": "Bogor",
    "depok": "Depok",
    "tangerang": "Tangerang",
    "bekasi": "Bekasi",
    "bandung": "Bandung",
    "cimahi": "Cimahi",
    "cirebon": "Cirebon",
    "tasikmalaya": "Tasikmalaya",
    "semarang": "Semarang",
    "solo": "Solo",
    "salatiga": "Salatiga",
    "yogyakarta": "Yogyakarta",
    "magelang": "Magelang",
    "purwokerto": "Purwokerto",
    "surabaya": "Surabaya",
    "malang": "Malang",
    "kediri": "Kediri",
    "madiun": "Madiun",
    "blitar": "Blitar",
    "jember": "Jember",
    "probolinggo": "Probolinggo",
    "pasuruan": "Pasuruan",
    "sidoarjo": "Sidoarjo",
    "mojokerto": "Mojokerto",
    "serang": "Serang",
    "cilegon": "Cilegon"
};

// Data Berita Film 
const dataSemuaBerita = [ 
    {
        id: 1,
        judul: "HALABALA, Horor Asal Thailand Yang Ngeri Abis!", 
        ringkasan: "Film horor Thailand terbaru yang memberikan pengalaman menakutkan bagi penonton dengan cerita yang menegangkan dan efek visual yang memukau.", // summary -> ringkasan
        konten: `Film horor Thailand "HALABALA" telah menjadi perbincangan hangat di kalangan pecinta film horor. Dengan cerita yang mengangkat legenda lokal Thailand, film ini berhasil menghadirkan ketakutan yang autentik.\n\nDisutradarai oleh Prachya Pinkaew, film ini mengisahkan tentang sekelompok mahasiswa yang terjebak dalam ritual kuno yang mengerikan. Dengan sinematografi yang apik dan akting yang meyakinkan, HALABALA memberikan pengalaman horor yang tak terlupakan.\n\nFilm ini telah mendapat rating tinggi dari berbagai platform review film internasional dan menjadi trending topic di media sosial. Para kritikus memuji kemampuan film ini dalam memadukan horor tradisional dengan teknologi modern.\n\nBagi pecinta film horor, HALABALA wajib masuk dalam daftar tontonan. Film ini tidak hanya mengandalkan jump scare, tetapi juga membangun atmosfer mencekam yang bertahan hingga akhir film.`, // content -> konten (paragraf dipisahkan \n\n)
        gambar: "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=HALABALA", 
        jumlahDilihat: "5K", 
        jumlahSuka: "8", 
        waktuUnggah: "1 hari lalu", 
        kategori: "Horor", 
        penulis: "Admin TIX", 
        tanggalPublikasi: "26 Mei 2025" 
    },
    {
        id: 2,
        judul: "Ketemu Lagi Sama Jackie Chan di Film Karate Kid: Legends!",
        ringkasan: "Jackie Chan kembali berperan sebagai Mr. Han dalam sekuel terbaru Karate Kid yang penuh dengan aksi martial arts spektakuler.",
        konten: `Jackie Chan kembali memikat penggemar dengan perannya sebagai Mr. Han dalam "Karate Kid: Legends". Film ini merupakan kelanjutan dari trilogi Karate Kid yang telah meraih kesuksesan besar di box office worldwide.\n\nDalam film terbaru ini, Jackie Chan tidak hanya berperan sebagai mentor, tetapi juga menampilkan aksi martial arts yang spektakuler meski di usianya yang tidak lagi muda. Dedikasi dan profesionalisme aktor legendaris ini patut diacungi jempol.\n\nSutradara Jonathan Entwistle berhasil menghadirkan cerita yang segar namun tetap mempertahankan esensi dari franchise Karate Kid. Film ini juga memperkenalkan generasi baru penerus tradisi karate dengan latar belakang yang lebih modern.\n\nProduksi film ini melibatkan koreografer aksi terbaik Hollywood dan menggunakan lokasi syuting di berbagai negara Asia, memberikan visual yang memukau dan autentik bagi penonton.`,
        gambar: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Karate+Kid",
        jumlahDilihat: "6K",
        jumlahSuka: "24",
        waktuUnggah: "3 hari lalu",
        kategori: "Aksi", 
        penulis: "Sarah Johnson",
        tanggalPublikasi: "24 Mei 2025"
    },
    {
        id: 3,
        judul: "Kembali Nostalgia di Live-Action Disney's Lilo & Stitch",
        ringkasan: "Disney menghadirkan versi live-action dari film animasi populer Lilo & Stitch dengan teknologi CGI terdepan dan cerita yang mengharukan.",
        konten: `Disney kembali menghadirkan nostalgia childhood dengan adaptasi live-action dari "Lilo & Stitch". Film yang disutradarai oleh Dean Fleischer Camp ini berhasil menangkap esensi dari film animasi aslinya yang dirilis pada tahun 2002.\n\nKarakter Stitch dibuat menggunakan teknologi CGI terdepan yang memberikan hasil visual yang sangat realistis namun tetap mempertahankan keunikan karakter alien biru yang menggemaskan. Interaksi antara Stitch dan Lilo terasa sangat natural dan menyentuh hati.\n\nFilm ini tidak hanya mengandalkan efek visual, tetapi juga menghadirkan pesan moral yang kuat tentang keluarga, persahabatan, dan penerimaan. Setting Hawaii yang indah menjadi latar belakang yang sempurna untuk cerita yang hangat ini.\n\nPara penggemar original film pasti akan tersentuh dengan berbagai easter egg dan referensi yang disertakan dalam film live-action ini. Disney sekali lagi membuktikan kemampuannya dalam mengadaptasi karya animasi ke format live-action.`,
        gambar: "https://via.placeholder.com/400x300/4169E1/ffffff?text=Lilo+Stitch",
        jumlahDilihat: "805",
        jumlahSuka: "6",
        waktuUnggah: "4 hari lalu",
        kategori: "Keluarga", 
        penulis: "Tim Disney", 
        tanggalPublikasi: "23 Mei 2025"
    },
    {
        id: 4,
        judul: "Diangkat Dari Game Horor, Home Sweet Home: Rebirth Segera Tayang!",
        ringkasan: "Adaptasi film dari game horor populer Thailand yang akan menghadirkan pengalaman menakutkan di layar lebar dengan cerita yang lebih mendalam.",
        konten: `Game horor populer "Home Sweet Home" akhirnya diadaptasi ke layar lebar dengan judul "Home Sweet Home: Rebirth". Film ini diharapkan dapat memberikan pengalaman horor yang tidak kalah menakutkan dari game aslinya.\n\nSutradara Poj Arnon yang terkenal dengan film-film horor Thailand berhasil menerjemahkan atmosfer mencekam dari game ke dalam format film. Cerita diperdalam dengan backstory yang lebih detail tentang asal-usul hantu dan kutukan yang menghantui rumah tersebut.\n\nFilm ini menggunakan practical effect dan makeup prostetik yang mengerikan untuk menciptakan sosok hantu yang realistis. Kombinasi dengan sound design yang mencekam membuat penonton akan merasakan ketegangan dari awal hingga akhir.\n\nPara gamer yang familiar dengan game aslinya akan menemukan berbagai referensi dan scene iconic yang diadaptasi dengan sempurna. Film ini menjadi bukti bahwa adaptasi game ke film bisa berhasil jika dilakukan dengan serius dan respect terhadap source material.`,
        gambar: "https://via.placeholder.com/400x300/8B0000/ffffff?text=Home+Sweet+Home",
        jumlahDilihat: "680",
        jumlahSuka: "1",
        waktuUnggah: "4 hari lalu",
        kategori: "Horor",
        penulis: "Berita Game", 
        tanggalPublikasi: "23 Mei 2025"
    },
    {
        id: 5,
        judul: "Sejak Kapan Emu Akan Berkolaborasi Untuk Anak Yang Hilang", 
        konten: `Film "Sejak Kapan" mengangkat isu sensitif tentang anak hilang dengan pendekatan yang sangat humanis dan penuh empati. Sutradara muda berbakat berhasil menghadirkan cerita yang menyentuh hati namun tidak eksploitatif.\n\nFilm ini bercerita tentang perjuangan seorang ibu dalam mencari anaknya yang hilang, serta dampak psikologis yang dialami oleh keluarga dan masyarakat sekitar. Akting yang natural dari seluruh cast membuat emosi penonton ikut terbawa.\n\nCinematography yang indah kontras dengan tema berat yang diangkat, menciptakan visual yang memukau namun tetap menghormati keseriusan topik. Film ini juga menghadirkan pesan tentang pentingnya kepedulian sosial dan kekuatan komunitas.\n\nDiharapkan film ini dapat meningkatkan awareness masyarakat tentang isu anak hilang dan mendorong partisipasi aktif dalam menjaga keamanan anak-anak di lingkungan sekitar.`,
        gambar: "https://via.placeholder.com/400x300/708090/ffffff?text=Sejak+Kapan",
        jumlahDilihat: "450",
        jumlahSuka: "12",
        waktuUnggah: "5 hari lalu",
        kategori: "Drama",
        penulis: "Pengamat Isu Sosial", 
        tanggalPublikasi: "22 Mei 2025"
    }
];
const BantuanData = {
    dapatkanSemuaFilm: () => dataSemuaFilm, 
    dapatkanFilmBerdasarkanId: (id) => dataSemuaFilm.find(film => film.id === parseInt(id)), 
    dapatkanFilmBerdasarkanStatus: (status) => dataSemuaFilm.filter(film => film.status === status),
    cariFilm: (keywordPencarian) => { 
        const kataKunci = keywordPencarian.toLowerCase(); 
        return dataSemuaFilm.filter(film =>
            film.judul.toLowerCase().includes(kataKunci) ||
            film.genre.some(g => g.toLowerCase().includes(kataKunci)) || 
            film.sutradara.toLowerCase().includes(kataKunci) ||
            film.pemeran.some(p => p.toLowerCase().includes(kataKunci))
        );
    },

    formatDurasi: (menit) => { 
        const jam = Math.floor(menit / 60); 
        const sisaMenit = menit % 60; 
        return `${jam}j ${sisaMenit}m`;
    },

    formatHarga: (harga) => { 
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(harga);
    },

    formatTanggal: (stringTanggal) => {
        const opsi = {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(stringTanggal).toLocaleDateString('id-ID', opsi);
    },

    dapatkanDetailBioskopBerdasarkanId: (idBioskop) => {
        return detailSemuaBioskop[idBioskop] || null;
    },

    dapatkanBioskopBerdasarkanKota: (kodeKota) => {
        return dataBioskopPerKota[kodeKota.toLowerCase()] || [];
    },

    dapatkanSemuaBerita: () => dataSemuaBerita,

    dapatkanBeritaBerdasarkanId: (idBerita) => {
        return dataSemuaBerita.find(berita => berita.id === parseInt(idBerita));
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        dataSemuaFilm,
        detailSemuaBioskop,
        dataBioskopPerKota,
        dataSemuaBerita,
        BantuanData,
        daftarKotaTersedia
    };
}