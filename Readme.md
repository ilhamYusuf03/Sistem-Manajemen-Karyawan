Aplikasi Sistem Manajemen Karyawan adalah aplikasi berbasis Node.js (Express) dan React.js (Vite) yang menyediakan fitur:

🔐 Login Admin & User (JWT Authentication)

👨‍💼 CRUD Data Karyawan (Admin Only)

📊 Dashboard Statistik

🛡️ Role-Based Access Control (RBAC)

📦 API terpisah & terdokumentasi (Postman + Markdown)

🎨 UI modern menggunakan TailwindCSS

🧩 Fitur Utama
🔑 Authentication

Login dengan JWT

Hashing password menggunakan bcrypt

Role: Admin & User

👨‍💼 Manajemen Karyawan

Admin bisa:

➕ Tambah karyawan

✏️ Edit data

🗑️ Hapus

User hanya bisa:

👀 Melihat daftar karyawan

📊 Dashboard

Total karyawan

Total gaji

Rata-rata gaji

Jumlah per jabatan

🔐 Keamanan

JWT-token protected routes

Role-based access middleware

Input validation menggunakan express-validator

Penyimpanan password terenkripsi (bcrypt)

🧩 Teknologi yang Digunakan
🔧 Backend

🟢 Node.js (Express.js)

🐬 MySQL Database

🔐 JWT Authentication

🔑 bcrypt (hash password)

🧹 express-validator

⚙️ dotenv (.env config)

💻 Frontend

⚛️ React.js (Vite)

🎨 TailwindCSS

🔗 Axios

🧵 Context API (AuthContext)

📁 Struktur Project
Sistem_Karyawan/
│
├── backend/
│   ├── Config/
│   ├── Controllers/
│   ├── Models/
│   ├── Middlewares/
│   ├── Routes/
│   ├── utils/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── vite.config.js
│
└── docs/
    ├── API_Dokumentasi.md
    ├── Postman_Collection.json
    └── ERD.png (opsional)

⚙️ Cara Instalasi & Menjalankan
📥 1. Clone Repository
git clone https://github.com/username/Sistem_Karyawan.git
cd Sistem_Karyawan

🛠 Backend Setup

Masuk ke folder backend:

cd backend
npm install


Buat file .env:

PORT=5000
JWT_SECRET=rahasia123
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=sistem_karyawan


Jalankan server:

npm run dev


Backend berjalan di:
👉 http://localhost:5000/api

💻 Frontend Setup

Masuk ke folder frontend:

cd frontend
npm install
npm run dev


Frontend berjalan di:
👉 http://localhost:3000

📝 API Endpoint Summary
🔐 Authentication
Method	Endpoint	Akses
POST	/auth/login	Public
GET	/auth/profile	Auth
POST	/auth/register	Admin
👨‍💼 Karyawan
Method	Endpoint	Akses
GET	/karyawan	Auth
GET	/karyawan/:id	Auth
POST	/karyawan	Admin
PUT	/karyawan/:id	Admin
DELETE	/karyawan/:id	Admin
📊 Dashboard
Method	Endpoint	Akses
GET	/dashboard/stats	Auth

Dokumentasi lengkap:
📄 /docs/API_Dokumentasi.md

🛡️ Keamanan Sistem

JWT Authentication

Role-Based Access (RBAC)

Password hashing (bcrypt)

Input validation (express-validator)

Protected routes dengan middleware

📜 Lisensi

MIT License — bebas digunakan untuk keperluan belajar atau pengembangan.

🙋‍♂️ Author

Dibuat oleh Ilham Yusuf
Jika ingin kontribusi atau perbaikan, silakan buat pull request.