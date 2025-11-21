📌 Struktur Folder Backend

backend/
│── config/
│   └── db.js               # Koneksi database
│
│── controllers/
│   ├── authController.js   # Login, register, profile
│   ├── karyawanController.js
│   └── dashboardController.js
│
│── middlewares/
│   ├── auth.js             # JWT auth + adminOnly
│   └── validation.js       # express-validator handler
│
│── models/
│   ├── User.js             # Query user
│   └── Karyawan.js         # Query karyawan
│
│── routes/
│   ├── auth.js             # /auth
│   ├── karyawan.js         # /karyawan
│   └── dashboard.js        # /dashboard
│
│── utils/
│   ├── bcrypt.js           # Hash & compare password
│   ├── jwt.js              # Generate & verify JWT
│   └── response.js         # Format response API
│
│── .env                    # Environment variables
│── server.js               # Main server entry point
│── package.json
📘 Penjelasan Folder
🟦 config/
Tempat untuk file konfigurasi, seperti koneksi database.

🟩 controllers/
Berisi logic utama dari setiap fitur (login, CRUD karyawan, dashboard).

🟧 middlewares/
Berisi middleware autentikasi & validasi.

authMiddleware → cek JWT

adminOnly → cek role admin

validation → handle express-validator

🟪 models/
Layer untuk query database (SELECT, INSERT, UPDATE, DELETE).

🟨 routes/
List endpoint API.
Di sini middleware dipasang.

🟫 utils/
Fungsi kecil pendukung:

hashing password

generate JWT

format response standar