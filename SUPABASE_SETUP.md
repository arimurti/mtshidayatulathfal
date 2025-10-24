# Supabase Setup Guide

## 🚀 Setup Supabase untuk MTs Hidayatul Athfal

### 1. Buat Project Supabase
1. Buka [supabase.com](https://supabase.com)
2. Sign up dengan GitHub
3. Klik "New Project"
4. Pilih organization
5. Project name: `mtshidayatulathfal`
6. Database password: Buat password yang kuat
7. Pilih region terdekat (Singapore)
8. Klik "Create new project"

### 2. Dapatkan Kredensial
Setelah project jadi, dapatkan:

**Project Settings → API**
- Project URL: `https://xxxx.supabase.co`
- Anon Public Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Service Role Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Project Settings → Database**
- Connection string: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### 3. Setup Environment Variables

Buat file `.env.local`:
```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[SERVICE-ROLE-KEY]"

# JWT Secret
JWT_SECRET="mtshidayatulathfal-secret-key-2024-very-secure"

# Environment
NODE_ENV="production"
```

### 4. Setup Database Schema

Jalankan script setup:
```bash
npm run setup-supabase
```

Atau manual di Supabase SQL Editor:
```sql
-- Copy paste SQL dari scripts/setup-supabase.ts
```

### 5. Deploy ke Vercel

1. Push ke GitHub:
```bash
git add .
git commit -m "Migrate to Supabase"
git push origin main
```

2. Di Vercel:
- Environment Variables → Add semua variabel di atas
- Redeploy

### 6. Test System

- **Formulir**: [URL-Vercel]/
- **Admin**: [URL-Vercel]/login
- Username: `admin`
- Password: `admin123`

## 🔧 Troubleshooting

### Error: Connection refused
- Pastikan DATABASE_URL benar
- Cek password database

### Error: Invalid API key
- Pastikan API keys benar
- Cek project settings

### Error: Table doesn't exist
- Jalankan setup script
- Cek SQL di Supabase Dashboard

## 📱 Keuntungan Supabase

✅ Real-time database  
✅ Auto backup  
✅ Better performance  
✅ Easy scaling  
✅ Built-in auth  
✅ RESTful API