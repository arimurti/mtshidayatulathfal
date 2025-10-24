# Aplikasi Formulir Online

Aplikasi formulir pendaftaran online yang dibangun dengan Next.js 15, TypeScript, dan Tailwind CSS. Aplikasi ini memiliki frontend untuk user mengisi formulir dan backend admin untuk mengelola data.

## Fitur

### Frontend (User)
- ✅ Formulir pendaftaran online yang responsif
- ✅ Validasi input real-time
- ✅ Notifikasi toast untuk feedback
- ✅ Desain modern dengan shadcn/ui
- ✅ Mobile-friendly

### Backend (Admin)
- ✅ Dashboard admin dengan statistik
- ✅ Tabel data pendaftar dengan filter dan search
- ✅ Detail view untuk setiap pendaftar
- ✅ Export data ke CSV
- ✅ Hapus data pendaftar
- ✅ Filter berdasarkan pendidikan

## Teknologi

- **Framework**: Next.js 15 dengan App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Database**: SQLite dengan Prisma ORM
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## Struktur Database

Tabel `FormSubmission` menyimpan data formulir dengan field:
- `id` (String) - Primary key
- `namaLengkap` (String) - Nama lengkap pendaftar
- `email` (String) - Email pendaftar
- `telepon` (String, optional) - Nomor telepon
- `alamat` (String, optional) - Alamat lengkap
- `pendidikan` (String, optional) - Tingkat pendidikan
- `pekerjaan` (String, optional) - Pekerjaan
- `pesan` (Text, optional) - Pesan tambahan
- `createdAt` (DateTime) - Tanggal dibuat
- `updatedAt` (DateTime) - Tanggal diupdate

## API Endpoints

### Formulir
- `POST /api/form` - Menyimpan data formulir baru
- `GET /api/form` - Mengambil semua data formulir
- `DELETE /api/form/[id]` - Menghapus data formulir berdasarkan ID

## Cara Menggunakan

### 1. Mengisi Formulir (User)
1. Buka aplikasi di browser (http://localhost:3000)
2. Isi formulir pendaftaran dengan data lengkap
3. Field wajib: Nama Lengkap dan Email
4. Klik "Kirim Formulir"
5. Notifikasi akan muncul jika berhasil

### 2. Mengakses Dashboard Admin
1. Klik tombol "Admin" di navigasi
2. Atau langsung buka http://localhost:3000/admin
3. Dashboard akan menampilkan:
   - Statistik total pendaftar
   - Pendaftar hari ini
   - Tabel data lengkap
   - Filter dan search functionality

### 3. Mengelola Data (Admin)
1. **Search**: Cari berdasarkan nama, email, atau telepon
2. **Filter**: Filter data berdasarkan tingkat pendidikan
3. **View Detail**: Klik icon mata untuk melihat detail lengkap
4. **Delete**: Klik icon trash untuk menghapus data
5. **Export**: Klik tombol CSV untuk export data

## Instalasi dan Development

```bash
# Install dependencies
npm install

# Setup database
npm run db:push

# Run development server
npm run dev

# Run linting
npm run lint
```

## Deployment

Aplikasi siap untuk deployment ke platform yang mendukung Next.js:
- Vercel (recommended)
- Netlify
- Railway
- Digital Ocean App Platform

## Kontribusi

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## License

MIT License - lihat file LICENSE untuk detail

## Support

Untuk pertanyaan atau issue, silakan buka GitHub Issues.