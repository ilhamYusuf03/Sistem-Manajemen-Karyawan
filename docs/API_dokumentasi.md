Dokumentasi ini menjelaskan seluruh endpoint API pada Sistem Manajemen Karyawan.

API dibangun menggunakan Node.js + Express, dengan:

<Autentikasi JWT>

<Hashing password bcrypt>

<Role-based access (admin / user)>

<Validasi input (express-validator>)

<Middleware keamanan>


🔗 Base URL
http://localhost:5000/api


🔐 1. Autentikasi
POST /auth/login

Login untuk Admin & User.

Request Body
{
  "username": "admin",
  "password": "admin123"
}

Response
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": 1,
      "username": "admin",
      "nama_lengkap": "Admin Sistem",
      "role": "admin"
    }
  }
}

POST /auth/register (Admin Only)
Request Body
{
  "username": "user1",
  "password": "user123",
  "nama_lengkap": "User Satu",
  "role": "user"
}

GET /auth/profile

Mengambil data user yang sedang login.

Header
Authorization: Bearer <token>

Response
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "nama_lengkap": "Admin Sistem",
    "role": "admin"
  }
}


👥 2. Endpoint Karyawan

Semua endpoint membutuhkan token.
POST, PUT, DELETE → hanya admin.

GET /karyawan

Mengambil seluruh data karyawan.

Response
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nama": "Budi",
      "jabatan": "Staff",
      "gaji": 5000000,
      "tanggal_masuk": "2024-01-02"
    }
  ]
}

GET /karyawan/:id

Mengambil karyawan berdasarkan ID.

Response
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Budi",
    "jabatan": "Staff",
    "gaji": 5000000,
    "tanggal_masuk": "2024-01-02"
  }
}

POST /karyawan (Admin Only)
Request Body
{
  "nama": "Andi",
  "jabatan": "Manager",
  "gaji": 8000000,
  "tanggal_masuk": "2024-02-05"
}

PUT /karyawan/:id (Admin Only)
Request Body
{
  "nama": "Andi Updated",
  "jabatan": "Supervisor",
  "gaji": 9000000,
  "tanggal_masuk": "2024-02-05"
}

DELETE /karyawan/:id (Admin Only)
Response
{
  "success": true,
  "message": "Karyawan berhasil dihapus"
}


📊 3. Dashboard API
GET /dashboard/stats
Response
{
  "success": true,
  "data": {
    "total_karyawan": 20,
    "total_gaji": 85000000,
    "rata_rata_gaji": 4250000,
    "karyawan_by_jabatan": [
      { "jabatan": "Manager", "jumlah": 2 },
      { "jabatan": "Staff", "jumlah": 10 }
    ]
  }
}


⚠ 4. Format Error Response

Semua error menggunakan format:

{
  "success": false,
  "message": "Karyawan tidak ditemukan"
}


🔒 5. Keamanan API

Fitur	Penjelasan:

JWT Authentication	Token dikirim di setiap request
Password Hashing	Menggunakan bcrypt
Role-based Access	Middleware adminOnly
Token Validation	Middleware authMiddleware
Input Validation	express-validator


📦 6. Tools Pendukung

Postman Collection tersedia di:
docs/Postman_Collection.json