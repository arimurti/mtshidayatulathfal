# 🚀 Deployment Guide - MTs Salafiyah Hidayatul Athfal

## 📋 Prasyarat

1. **Akun Vercel** - Daftar di [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket** - Untuk version control
3. **Database Production** - Supabase atau PlanetScale (recommended)

## 🗂️ Opsi 1: Deploy ke Vercel (Recommended)

### Langkah 1: Setup Repository

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit - MTs Salafiyah Hidayatul Athfal Registration System"

# Push to GitHub
git branch -M main
git remote add origin https://github.com/username/mtshidayatulathfal.git
git push -u origin main
```

### Langkah 2: Deploy ke Vercel

#### Cara A: Via Vercel CLI
```bash
# Install Vercel CLI (jika belum)
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy project
vercel

# Follow instruksi:
# 1. Link ke existing project atau create new
# 2. Setup team (individual)
# 3. Confirm project settings
```

#### Cara B: Via Vercel Dashboard (Lebih Mudah)
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Click "Add New..." → "Project"
4. Import repository GitHub Anda
5. Setup environment variables
6. Click "Deploy"

### Langkah 3: Setup Environment Variables di Vercel

Di Vercel Dashboard → Project Settings → Environment Variables:

```bash
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
JWT_SECRET="your-super-secret-jwt-key-for-production"
NODE_ENV="production"
```

### Langkah 4: Setup Production Database

#### Opsi A: Supabase (Free & Recommended)
1. Daftar di [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string dari Settings → Database
4. Update `DATABASE_URL` di Vercel environment variables

#### Opsi B: PlanetScale
1. Daftar di [planetscale.com](https://planetscale.com)
2. Create new database
3. Get connection string
4. Update environment variables

### Langkah 5: Update Prisma Schema untuk Production

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Ganti dari sqlite ke postgresql
  url      = env("DATABASE_URL")
}
```

### Langkah 6: Database Migration

```bash
# Generate Prisma Client
npx prisma generate

# Push schema ke production database
npx prisma db push
```

### Langkah 7: Create Admin Account Production

Setelah deploy, buat admin account:

```bash
# Jalankan script di production environment
npx tsx scripts/reset-admin-password.ts
```

Atau via Vercel Logs → Console.

## 🗂️ Opsi 2: Deploy ke Railway

### Langkah 1: Setup Railway
1. Daftar di [railway.app](https://railway.app)
2. Connect GitHub repository
3. Setup environment variables
4. Deploy

### Langkah 2: Railway Environment Variables
```bash
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-super-secret-jwt-key"
NODE_ENV="production"
PORT="3000"
```

## 🗂️ Opsi 3: Deploy ke Netlify

### Langkah 1: Setup Netlify
1. Daftar di [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Setup build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Setup environment variables

## 🔧 Konfigurasi Tambahan

### Custom Domain
1. Di Vercel Dashboard → Project Settings → Domains
2. Add custom domain
3. Update DNS records

### SSL Certificate
- Otomatis disediakan oleh Vercel
- Custom domain juga mendapat SSL gratis

### Analytics
- Vercel Analytics (built-in)
- Google Analytics (optional)

## 🧪 Testing Production

1. **Test Form Submission**
   - Submit form pendaftaran
   - Check data di admin dashboard

2. **Test Admin Login**
   - Login dengan credentials yang sudah dibuat
   - Test ubah password

3. **Test Responsive Design**
   - Test di mobile, tablet, desktop

## 📊 Monitoring

### Vercel Analytics
- Page views
- Web Vitals
- Error tracking

### Database Monitoring
- Supabase Dashboard
- PlanetScale Insights

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check `DATABASE_URL` environment variable
   - Ensure database is online
   - Check IP whitelist

2. **Build Error**
   - Check `package.json` scripts
   - Ensure all dependencies installed
   - Check TypeScript errors

3. **Login Issues**
   - Check `JWT_SECRET` environment variable
   - Ensure admin account exists
   - Check browser console for errors

### Reset Production Admin
```bash
# Via Vercel CLI
vercel env pull .env.production
npx tsx scripts/reset-admin-password.ts
```

## 📝 Checklist Sebelum Go-Live

- [ ] Repository sudah di-push ke GitHub
- [ ] Environment variables sudah di-setup
- [ ] Production database sudah siap
- [ ] Database migration sudah dijalankan
- [ ] Admin account sudah dibuat
- [ ] Semua fitur sudah di-test
- [ ] Mobile responsive sudah di-test
- [ ] Custom domain sudah di-setup (jika perlu)
- [ ] SSL certificate sudah aktif
- [ ] Monitoring sudah di-setup

## 🎉 Go-Live!

Setelah semua checklist selesai, aplikasi sudah siap digunakan oleh MTs Salafiyah Hidayatul Athfal!

**URL Production:** `https://your-app.vercel.app`
**Admin Login:** `https://your-app.vercel.app/login`
**Form Pendaftaran:** `https://your-app.vercel.app/`

---

📞 **Support:** Jika ada masalah, cek Vercel logs atau hubungi developer team.