# 🚀 **QUICK DEPLOYMENT GUIDE**

## 📋 **Cara Cepat Deploy ke Vercel (15 Menit)**

### **🔥 Langkah 1: Push ke GitHub (2 Menit)**

```bash
# 1. Buat repository baru di GitHub: https://github.com/new
# 2. Copy repository URL (contoh: https://github.com/username/mtshidayatulathfal.git)

# 3. Connect local repo ke GitHub
git remote add origin https://github.com/username/mtshidayatulathfal.git
git branch -M main
git push -u origin main
```

### **🔥 Langkah 2: Deploy ke Vercel (5 Menit)**

#### **Cara Paling Mudah - Via Web Browser:**

1. **Buka** [vercel.com](https://vercel.com)
2. **Login** dengan GitHub account
3. **Click** "Add New..." → "Project"
4. **Import** repository `mtshidayatulathfal`
5. **Configure** project:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```
6. **Add Environment Variables:**
   ```
   DATABASE_URL = file:./dev.db
   JWT_SECRET = mtshidayatulathfal-secret-key-2024-very-secure
   NODE_ENV = production
   ```
7. **Click** "Deploy"

### **🔥 Langkah 3: Setup Database (5 Menit)**

#### **Opsi A: Tetap Pakai SQLite (Gratis & Mudar)**
```bash
# Di Vercel, tambahkan environment variable:
DATABASE_URL = file:./dev.db
```

#### **Opsi B: Upgrade ke Supabase (Recommended)**
1. **Buka** [supabase.com](https://supabase.com)
2. **Sign up** dengan GitHub
3. **Create new project**
4. **Get connection string** dari Settings → Database
5. **Update** Vercel environment variable dengan Supabase URL

### **🔥 Langkah 4: Create Admin Account (3 Menit)**

Setelah deploy selesai:

1. **Buka** Vercel Functions tab
2. **Click** "Logs" → "Console"
3. **Run** command:
```bash
npx tsx scripts/reset-admin-password.ts
```

Atau tunggu beberapa saat dan jalankan via local terminal:
```bash
# Install Vercel CLI
npm i -g vercel

# Login dan link ke project
vercel login
vercel link

# Pull environment variables
vercel env pull .env.production

# Create admin account
npx tsx scripts/reset-admin-password.ts
```

## 🎯 **URL Setelah Deploy**

- **Form Pendaftaran:** `https://your-app.vercel.app/`
- **Admin Login:** `https://your-app.vercel.app/login`
- **Admin Dashboard:** `https://your-app.vercel.app/admin`

## 🔐 **Login Credentials**

- **Username:** `admin`
- **Password:** `admin123`

⚠️ **IMPORTANT:** Ubah password setelah login pertama!

## 🚨 **Troubleshooting Cepat**

### **Error: "Database Connection Failed"**
```bash
# Check environment variables di Vercel Dashboard
# Pastikan DATABASE_URL sudah benar
```

### **Error: "Login Failed"**
```bash
# Reset admin password
npx tsx scripts/reset-admin-password.ts
```

### **Error: "Build Failed"**
```bash
# Check logs di Vercel
# Pastikan semua dependencies sudah terinstall
```

## 📱 **Test Production**

1. **Buka** URL Vercel Anda
2. **Test** submit form pendaftaran
3. **Login** ke admin dashboard
4. **Check** data pendaftar
5. **Test** ubah password

## 🎉 **SELESAI!**

Aplikasi MTs Salafiyah Hidayatul Athfal sudah live dan siap digunakan!

---

## 📞 **Butuh Bantuan?**

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **GitHub Issues:** Report issues di repository

## 🔗 **Useful Links**

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Project Settings:** https://vercel.com/dashboard/your-project/settings
- **Environment Variables:** https://vercel.com/dashboard/your-project/settings/environment-variables