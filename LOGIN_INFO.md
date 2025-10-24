# 📋 Sistem Login Administrator

## 🔐 Login Information

**Default Administrator Account:**
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **PENTING:** Harap ubah password default setelah login pertama kali!

## 🚀 Cara Akses

### 1. Login Administrator
- Buka: `http://localhost:3000/login`
- Masukkan username dan password
- Klik "Masuk"

### 2. Halaman Admin
- Setelah login berhasil, akan diarahkan ke: `http://localhost:3000/admin`
- Dashboard menampilkan data pendaftar dan statistik

### 3. Ubah Password
- Klik ikon ⚙️ (Settings) di pojok kanan atas
- Isi form ubah password:
  - Password saat ini: `admin123`
  - Password baru (minimal 6 karakter)
  - Konfirmasi password baru
- Klik "Ubah Password"

### 4. Logout
- Klik ikon 🚪 (Logout) di pojok kanan atas

## 🛡️ Fitur Keamanan

- **Password Hashing:** Menggunakan bcryptjs untuk enkripsi password
- **JWT Token:** Sesi login menggunakan token dengan expired 24 jam
- **HTTP-Only Cookies:** Token disimpan di cookie yang aman
- **Auto-Redirect:** Halaman admin otomatis redirect ke login jika belum authenticated

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - Login administrator
- `POST /api/auth/logout` - Logout administrator  
- `GET /api/auth/me` - Cek status authentication
- `POST /api/auth/change-password` - Ubah password administrator

## 🔧 Troubleshooting

### Jika Login Gagal
Jika mengalami masalah login, jalankan perintah berikut untuk reset password:

```bash
npx tsx scripts/reset-admin-password.ts
```

Ini akan mereset password admin ke default `admin123`.

### Cek Admin Account
Untuk melihat admin account yang tersedia:

```bash
npx tsx scripts/check-admin.ts
```

## 📝 Catatan

- Session berlaku 24 jam
- Password minimal 6 karakter
- Gunakan password yang kuat dan unik
- Jangan bagikan credentials kepada orang lain
- Sistem sudah melalui testing dan berfungsi dengan benar