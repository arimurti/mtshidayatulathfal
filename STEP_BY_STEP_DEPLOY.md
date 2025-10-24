# 📋 **PANDUAN DEPLOY DETAIL - LANGKAH DEMI LANGKAH**

## 🎯 **Target: Deploy Aplikasi ke Internet agar bisa diakses siapa saja**

### **📋 Yang akan kita dapatkan:**
- URL public: `https://mtshidayatulathfal.vercel.app`
- Form pendaftaran online yang bisa diakses 24/7
- Admin dashboard untuk mengelola data
- Tidak perlu hosting server sendiri (gratis!)

---

## 🗂️ **LANGKAH 1: SIAPKAN GITHUB REPOSITORY**

### **1.1 Buat Akun GitHub (Jika belum punya)**
1. Buka https://github.com
2. Click "Sign up"
3. Isi data (email, password, username)
4. Verifikasi email

### **1.2 Buat Repository Baru**
1. Login ke GitHub
2. Click tombol hijau **"New"** di kanan atas
3. Isi form:
   - **Repository name:** `mtshidayatulathfal`
   - **Description:** `Sistem Pendaftaran Online MTs Salafiyah Hidayatul Athfal`
   - **Public/Private:** Pilih **Public** (gratis)
4. Click **"Create repository"**

### **1.3 Connect Project ke GitHub**
Buka terminal/command prompt, lalu jalankan:

```bash
# Masuk ke folder project
cd /home/z/my-project

# Ganti USERNAME dengan GitHub username Anda
git remote add origin https://github.com/USERNAME/mtshidayatulathfal.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Contoh:** Jika username GitHub Anda `johndoe`:
```bash
git remote add origin https://github.com/johndoe/mtshidayatulathfal.git
```

### **1.4 Verify di GitHub**
1. Refresh halaman repository GitHub Anda
2. Anda harus melihat semua file project sudah muncul
3. Jika berhasil, lanjut ke langkah 2

---

## 🚀 **LANGKAH 2: DEPLOY KE VERCEL**

### **2.1 Buat Akun Vercel**
1. Buka https://vercel.com
2. Click **"Continue with GitHub"**
3. Login dengan akun GitHub yang sama
4. Authorize Vercel untuk akses repository
5. Isi data profil (nama, email)
6. Click **"Continue"**

### **2.2 Import Project ke Vercel**
1. Di Vercel Dashboard, click **"Add New..."** → **"Project"**
2. Cari repository `mtshidayatulathfal`
3. Click **"Import"**

### **2.3 Configure Project**
Vercel akan otomatis mendeteksi Next.js. Periksa setting:

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

Jika sudah benar, click **"Next"**

### **2.4 Add Environment Variables**
Di halaman "Environment Variables", tambahkan 3 variables:

1. **Variable 1:**
   - Name: `DATABASE_URL`
   - Value: `file:./dev.db`
   - Click **"Add"**

2. **Variable 2:**
   - Name: `JWT_SECRET`
   - Value: `mtshidayatulathfal-secret-key-2024-very-secure`
   - Click **"Add"**

3. **Variable 3:**
   - Name: `NODE_ENV`
   - Value: `production`
   - Click **"Add"**

Pastikan semua 3 variables sudah terdaftar, lalu click **"Next"**

### **2.5 Deploy!**
1. Review konfigurasi sekali lagi
2. Click **"Deploy"**
3. Tunggu proses build (sekitar 2-5 menit)

### **2.6 Success!**
Jika berhasil, Anda akan melihat:
- 🎉 **"Congratulations!"**
- URL: `https://mtshidayatulathfal.vercel.app`
- Status: **Ready**

Click **"Visit"** untuk melihat aplikasi Anda!

---

## 🔧 **LANGKAH 3: SETUP ADMIN ACCOUNT**

### **3.1 Buka Vercel Dashboard**
1. Kembali ke https://vercel.com/dashboard
2. Click project `mtshidayatulathfal`

### **3.2 Buka Functions Logs**
1. Di menu kiri, click **"Functions"**
2. Click tab **"Logs"**
3. Scroll ke bawah, cari kotak **"Console"**

### **3.3 Create Admin Account**
Di console, ketik dan enter:
```bash
npx tsx scripts/reset-admin-password.ts
```

Tunggu beberapa saat, Anda akan melihat output:
```
Admin password reset successfully:
Username: admin
Password: admin123
Admin ID: cmh465gpi0000of9q3uy3uyuw
Password verification: SUCCESS
```

### **3.4 Test Login**
1. Buka `https://mtshidayatulathfal.vercel.app/login`
2. Login dengan:
   - Username: `admin`
   - Password: `admin123`
3. Jika berhasil, Anda akan diarahkan ke admin dashboard

---

## 🧪 **LANGKAH 4: TESTING PRODUCTION**

### **4.1 Test Form Pendaftaran**
1. Buka `https://mtshidayatulathfal.vercel.app`
2. Isi form pendaftaran dengan data test
3. Click **"Daftar"**
4. Harus muncul notifikasi "Data berhasil disimpan"

### **4.2 Test Admin Dashboard**
1. Login ke admin: `https://mtshidayatulathfal.vercel.app/login`
2. Anda harus melihat data pendaftar yang baru diisi
3. Test fitur:
   - Search data
   - View detail
   - Export CSV
   - Ubah password

### **4.3 Test Mobile**
1. Buka aplikasi di smartphone
2. Test responsive design
3. Pastikan form bisa diisi dengan baik

---

## 🎉 **LANGKAH 5: GO LIVE!**

### **5.1 Share URL**
Bagikan URL berikut ke calon siswa:
- **Form Pendaftaran:** `https://mtshidayatulathfal.vercel.app`
- **Admin Login:** `https://mtshidayatulathfal.vercel.app/login`

### **5.2 Admin Credentials**
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **IMPORTANT:** Ubah password setelah login pertama!

### **5.3 Monitor Dashboard**
- Login ke admin dashboard secara berkala
- Check data pendaftar baru
- Export data untuk proses seleksi

---

## 🚨 **TROUBLESHOOTING**

### **Problem: "Build Failed"**
**Solution:**
1. Di Vercel Dashboard, click **"Functions"** → **"Logs"**
2. Cari error message
3. Pastikan environment variables sudah benar

### **Problem: "Login Failed"**
**Solution:**
1. Ulangi Langkah 3 untuk create admin account
2. Pastikan `JWT_SECRET` sudah di-set di environment variables

### **Problem: "Database Error"**
**Solution:**
1. Check `DATABASE_URL` di environment variables
2. Pastikan value: `file:./dev.db`

### **Problem: "404 Not Found"**
**Solution:**
1. Tunggu 1-2 menit setelah deploy
2. Refresh halaman
3. Clear browser cache

---

## 📱 **CUSTOM DOMAIN (Optional)**

Jika ingin domain sendiri (misal: `daftar.mtshidayatulathfal.sch.id`):

### **1. Setup di Vercel**
1. Di Vercel Dashboard → Settings → Domains
2. Add custom domain
3. Copy DNS records

### **2. Setup DNS**
1. Login ke domain provider
2. Add DNS records dari Vercel
3. Tunggu propagasi (1-24 jam)

---

## 📊 **MONITORING**

### **Vercel Analytics**
1. Di Vercel Dashboard → **"Analytics"**
2. Monitor page views, performance, errors

### **Database Backup**
1. Login ke Vercel Dashboard
2. Download database backup secara berkala

---

## 🎯 **CHECKLIST FINAL**

Sebelum announce ke public, pastikan:

- [ ] Form pendaftaran bisa diisi
- [ ] Admin login berhasil
- [ ] Data muncul di dashboard
- [ ] Export CSV berfungsi
- [ ] Mobile responsive
- [ ] Password sudah diubah dari default
- [ ] URL sudah di-test di multiple devices

---

## 📞 **SUPPORT**

Jika ada masalah:
1. Check Vercel logs
2. Verify environment variables
3. Re-deploy jika perlu
4. Contact developer team

---

## 🎉 **SELAMAT! APLIKASI SUDAH LIVE!**

Aplikasi pendaftaran online MTs Salafiyah Hidayatul Athfal sudah:
- ✅ **Accessible 24/7** di internet
- ✅ **Professional appearance**
- ✅ **Mobile friendly**
- ✅ **Admin ready**
- ✅ **Data secure**

**Next Steps:**
1. Share URL ke calon siswa
2. Monitor pendaftaran masuk
3. Process data untuk seleksi
4. Maintain system regularly

🚀 **Ready to accept online registrations!**