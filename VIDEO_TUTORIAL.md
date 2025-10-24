# 🎥 **SCRIPT VIDEO TUTORIAL DEPLOY**

## 📹 **Video 1: Setup GitHub (5 Menit)**

```
🎤 "Halo teman-teman, hari ini kita akan deploy aplikasi pendaftaran online MTs Salafiyah Hidayatul Athfal ke internet. 
Mari kita mulai dengan setup GitHub!"

🖥️ **Visual:**
- Buka github.com
- Click "Sign up"
- Isi form registrasi
- Verifikasi email

🎤 "Setelah punya akun GitHub, kita buat repository baru."

🖥️ **Visual:**
- Click "New" 
- Repository name: "mtshidayatulathfal"
- Description: "Sistem Pendaftaran Online"
- Public
- Click "Create repository"

🎤 "Sekarang kita connect project kita ke GitHub menggunakan terminal."

🖥️ **Visual:**
- Buka terminal
- cd /home/z/my-project
- git remote add origin [URL]
- git push -u origin main
- Refresh GitHub, files muncul
```

## 📹 **Video 2: Deploy ke Vercel (10 Menit)**

```
🎤 "Langkah selanjutnya, kita deploy ke Vercel. Vercel adalah platform hosting gratis untuk aplikasi web."

🖥️ **Visual:**
- Buka vercel.com
- Click "Continue with GitHub"
- Authorize GitHub
- Dashboard Vercel muncul

🎤 "Sekarang kita import project kita."

🖥️ **Visual:**
- Click "Add New" → "Project"
- Cari "mtshidayatulathfal"
- Click "Import"
- Framework: Next.js (auto)
- Click "Next"

🎤 "Kita perlu setup environment variables untuk keamanan."

🖥️ **Visual:**
- Add DATABASE_URL = file:./dev.db
- Add JWT_SECRET = mtshidayatulathfal-secret-key-2024-very-secure
- Add NODE_ENV = production
- Click "Next"
- Click "Deploy"

🎤 "Tunggu proses build selesai..."

🖥️ **Visual:**
- Progress bar
- Building steps
- Success! Congratulations!
- URL muncul: https://mtshidayatulathfal.vercel.app
- Click "Visit"
- Aplikasi terbuka di browser
```

## 📹 **Video 3: Setup Admin Account (5 Menit)**

```
🎤 "Aplikasi sudah live! Sekarang kita perlu buat admin account untuk mengelola data."

🖥️ **Visual:**
- Kembali ke vercel.com/dashboard
- Click project "mtshidayatulathfal"
- Click "Functions" → "Logs"
- Scroll ke console

🎤 "Kita jalankan command untuk create admin account."

🖥️ **Visual:**
- Ketik: npx tsx scripts/reset-admin-password.ts
- Output muncul
- Username: admin, Password: admin123

🎤 "Sekarang kita test login."

🖥️ **Visual:**
- Buka https://mtshidayatulathfal.vercel.app/login
- Username: admin, Password: admin123
- Login berhasil
- Dashboard muncul dengan data
```

## 📹 **Video 4: Testing & Go Live (5 Menit)**

```
🎤 "Mari kita test semua fitur sebelum announce ke public."

🖥️ **Visual:**
- Buka homepage
- Isi form pendaftaran
- Click "Daftar"
- Success notification

🎤 "Check data di admin dashboard."

🖥️ **Visual:**
- Login admin
- Data baru muncul
- Click view detail
- Test export CSV
- Test change password

🎤 "Test di mobile juga."

🖥️ **Visual:**
- Buka di smartphone
- Responsive design
- Form bisa diisi

🎤 "Aplikasi siap digunakan!"

🖥️ **Visual:**
- Share URL
- QR code
- Admin credentials
```

---

## 🎬 **Tips untuk Recording:**

### **Equipment:**
- Screen recording software (OBS Studio, Camtasia)
- Microphone untuk audio
- Good lighting
- Quiet environment

### **Recording Style:**
- Speak clearly and slowly
- Show each step clearly
- Highlight important areas
- Add text overlays for key points
- Include background music (optional)

### **Editing:**
- Add intro/outro
- Include captions
- Add zoom effects for important parts
- Include progress indicators
- Add call-to-action at end

---

## 📱 **Visual Guide Screenshots**

### **Screenshot 1: GitHub Repository**
- GitHub dashboard dengan repository "mtshidayatulathfal"
- Files list terlihat

### **Screenshot 2: Vercel Import**
- Vercel import page
- Repository selection
- Framework detection

### **Screenshot 3: Environment Variables**
- 3 variables terisi
- DATABASE_URL, JWT_SECRET, NODE_ENV

### **Screenshot 4: Deploy Success**
- Congratulations page
- URL production
- Ready status

### **Screenshot 5: Admin Dashboard**
- Login screen
- Dashboard dengan data
- Admin features

### **Screenshot 6: Mobile View**
- Smartphone dengan aplikasi
- Responsive design
- Form submission

---

## 🎯 **Key Messages untuk Video:**

1. **"Deploy tidak sesulit yang dibayangkan"**
2. **"Gratis dan professional"**
3. **"Siapa saja bisa melakukannya"**
4. **"Aplikasi langsung bisa digunakan"**
5. **"Support 24/7 oleh Vercel"**

---

## 📞 **Call to Action:**

"Jika mengalami kesulitan, jangan ragu untuk:
1. Pause video dan ikuti langkah perlahan
2. Check documentation di README
3. Contact support team
4. Join Discord community

Selamat mencoba dan semoga berhasil!"