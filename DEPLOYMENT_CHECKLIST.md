# 🎯 **CHECKLIST DEPLOY - PRINT & TICK**

## 📋 **Sebelum Mulai**

- [ ] punya akun Gmail
- [ ] punya laptop/komputer
- [ ] koneksi internet stabil
- [ ] waktu 30 menit

---

## 🗂️ **LANGKAH 1: GITHUB (10 Menit)**

### **Buat Akun GitHub**
- [ ] Buka github.com
- [ ] Click "Sign up"
- [ ] Isi email, password, username
- [ ] Verifikasi email
- [ ] Login berhasil

### **Buat Repository**
- [ ] Click "New" (hijau)
- [ ] Repository name: `mtshidayatulathfal`
- [ ] Description: `Sistem Pendaftaran Online`
- [ ] Pilih "Public"
- [ ] Click "Create repository"

### **Push Code**
- [ ] Buka terminal/command prompt
- [ ] cd /home/z/my-project
- [ ] git remote add origin https://github.com/USERNAME/mtshidayatulathfal.git
- [ ] git push -u origin main
- [ ] Refresh GitHub, files muncul

**✅ GitHub selesai, lanjut ke Langkah 2**

---

## 🚀 **LANGKAH 2: VERCEL (15 Menit)**

### **Buat Akun Vercel**
- [ ] Buka vercel.com
- [ ] Click "Continue with GitHub"
- [ ] Authorize GitHub
- [ ] Login berhasil

### **Import Project**
- [ ] Click "Add New..." → "Project"
- [ ] Cari "mtshidayatulathfal"
- [ ] Click "Import"
- [ ] Framework: Next.js (auto)
- [ ] Click "Next"

### **Environment Variables**
- [ ] DATABASE_URL = `file:./dev.db`
- [ ] JWT_SECRET = `mtshidayatulathfal-secret-key-2024-very-secure`
- [ ] NODE_ENV = `production`
- [ ] Click "Next"

### **Deploy**
- [ ] Review configuration
- [ ] Click "Deploy"
- [ ] Tunggu build (2-5 menit)
- [ ] Success! URL muncul
- [ ] Click "Visit"

**✅ Vercel selesai, lanjut ke Langkah 3**

---

## 🔧 **LANGKAH 3: SETUP ADMIN (5 Menit)**

### **Create Admin Account**
- [ ] Kembali ke vercel.com/dashboard
- [ ] Click project "mtshidayatulathfal"
- [ ] Click "Functions" → "Logs"
- [ ] Scroll ke console
- [ ] Ketik: `npx tsx scripts/reset-admin-password.ts`
- [ ] Enter, tunggu output
- [ ] Username: admin, Password: admin123

### **Test Login**
- [ ] Buka URL/login
- [ ] Username: admin
- [ ] Password: admin123
- [ ] Login berhasil
- [ ] Dashboard muncul

**✅ Admin setup selesai, lanjut ke Langkah 4**

---

## 🧪 **LANGKAH 4: TESTING (5 Menit)**

### **Test Form**
- [ ] Buka homepage
- [ ] Isi form dengan data test
- [ ] Click "Daftar"
- [ ] Success notification muncul

### **Test Admin**
- [ ] Login ke dashboard
- [ ] Data baru muncul
- [ ] Click view detail
- [ ] Test export CSV
- [ ] Test change password

### **Test Mobile**
- [ ] Buka di smartphone
- [ ] Responsive design OK
- [ ] Form bisa diisi

**✅ Testing selesai, lanjut ke Langkah 5**

---

## 🎉 **LANGKAH 5: GO LIVE!**

### **Final Check**
- [ ] Semua fitur berfungsi
- [ ] URL accessible
- [ ] Mobile responsive
- [ ] Admin login OK
- [ ] Password sudah diubah

### **Share URL**
- [ ] URL Form: `https://mtshidayatulathfal.vercel.app`
- [ ] URL Admin: `https://mtshidayatulathfal.vercel.app/login`
- [ ] Username: admin
- [ ] Password: [password baru]

### **Announce**
- [ ] Share ke calon siswa
- [ ] Share ke admin team
- [ ] Create user guide
- [ ] Setup monitoring

**🎉 SELAMAT! APLIKASI LIVE!**

---

## 🚨 **TROUBLESHOOTING**

### **Jika Error Terjadi**

**Build Failed:**
- [ ] Check environment variables
- [ ] Re-deploy
- [ ] Check Vercel logs

**Login Failed:**
- [ ] Ulangi create admin account
- [ ] Check JWT_SECRET
- [ ] Clear browser cache

**Database Error:**
- [ ] Check DATABASE_URL
- [ ] Restart deployment
- [ ] Contact support

---

## 📞 **CONTACT SUPPORT**

Jika masih error:
1. Screenshot error message
2. Copy error log
3. Share ke developer team
4. Include: GitHub URL, Vercel URL, error details

---

## 🎯 **SUCCESS METRICS**

✅ **Success Criteria:**
- Form bisa diisi online
- Admin bisa login
- Data tersimpan dengan aman
- Bisa diakses 24/7
- Mobile friendly

🎯 **Target Achievement:**
- [ ] 100% uptime
- [ ] < 3 second load time
- [ ] Mobile responsive
- [ ] Data secure
- [ ] User friendly

---

## 📋 **FINAL CHECKLIST**

**Technical:**
- [ ] GitHub repository ready
- [ ] Vercel deployment success
- [ ] Environment variables set
- [ ] Admin account created
- [ ] All features tested

**User Experience:**
- [ ] URL easy to remember
- [ ] Form user friendly
- [ ] Mobile responsive
- [ ] Fast loading
- [ ] Clear instructions

**Admin:**
- [ ] Login credentials secure
- [ ] Dashboard functional
- [ ] Data export working
- [ ] Password changed
- [ ] Support ready

**🏆 DEPLOYMENT COMPLETE!**