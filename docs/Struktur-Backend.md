
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
