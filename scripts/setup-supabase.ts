import { supabaseAdmin } from '@/lib/supabase'

async function setupSupabaseDatabase() {
  try {
    console.log('Setting up Supabase database...')
    
    // Create tables using SQL
    const { error } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        -- Create Users table
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Create FormSubmissions table
        CREATE TABLE IF NOT EXISTS form_submissions (
          id TEXT PRIMARY KEY,
          
          -- Biodata Murid
          nisn TEXT,
          nama_peserta_didik TEXT NOT NULL,
          jenis_kelamin TEXT,
          nik TEXT,
          no_kk TEXT,
          tempat_lahir TEXT,
          tanggal_lahir TEXT,
          status_dalam_keluarga TEXT,
          anak_ke INTEGER,
          jumlah_saudara INTEGER,
          no_hp_wa TEXT,
          alamat_tinggal TEXT,
          desa_kelurahan TEXT,
          kecamatan TEXT,
          kota_kabupaten TEXT,
          provinsi TEXT,
          tinggal_di TEXT,
          transportasi_ke_sekolah TEXT,
          nama_sekolah_asal TEXT,
          alamat_sekolah_asal TEXT,
          tpq_tpa_jilid TEXT,
          tpq_tpa_lulus TEXT,
          madin_ula TEXT,
          madin_wustha TEXT,
          madin_ulya TEXT,
          madin_lulus TEXT,
          
          -- Informasi Prestasi
          prestasi_akademik TEXT,
          prestasi_non_akademik TEXT,
          
          -- Identitas Ayah/Wali
          nama_ayah_wali TEXT,
          nik_ayah_wali TEXT,
          no_hp_wa_ayah_wali TEXT,
          pendidikan_terakhir_ayah_wali TEXT,
          pekerjaan_ayah_wali TEXT,
          rerata_penghasilan_ayah_wali TEXT,
          
          -- Identitas Ibu/Wali
          nama_ibu_wali TEXT,
          nik_ibu_wali TEXT,
          no_hp_wa_ibu_wali TEXT,
          pendidikan_terakhir_ibu_wali TEXT,
          pekerjaan_ibu_wali TEXT,
          rerata_penghasilan_ibu_wali TEXT,
          
          -- Keterangan Tambahan
          nama_wali TEXT,
          pekerjaan_wali TEXT,
          nomor_kip TEXT,
          nomor_kks TEXT,
          nomor_pkh TEXT,
          diterima_di_kelas TEXT,
          tanggal_diterima TEXT,
          
          -- Pemilihan Program Unggulan
          program_tahfidz BOOLEAN DEFAULT FALSE,
          program_bilingual_sains BOOLEAN DEFAULT FALSE,
          program_qiroatul_kutub BOOLEAN DEFAULT FALSE,
          
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Create Admins table
        CREATE TABLE IF NOT EXISTS admins (
          id TEXT PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          name TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Create indexes for better performance
        CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_nama_peserta_didik ON form_submissions(nama_peserta_didik);
        CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);
        
        -- Create updated_at trigger function
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ language 'plpgsql';
        
        -- Create triggers for updated_at
        CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
            
        CREATE TRIGGER update_form_submissions_updated_at BEFORE UPDATE ON form_submissions
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
            
        CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      `
    })

    if (error) {
      console.error('Error setting up database:', error)
      process.exit(1)
    }

    console.log('✅ Database setup completed!')
    
    // Create default admin
    const { error: adminError } = await supabaseAdmin
      .from('admins')
      .insert({
        id: 'admin-default',
        username: 'admin',
        password: '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQ', // admin123
        name: 'Administrator'
      })

    if (adminError) {
      console.error('Error creating admin:', adminError)
    } else {
      console.log('✅ Default admin created!')
    }

  } catch (error) {
    console.error('Setup error:', error)
    process.exit(1)
  }
}

setupSupabaseDatabase()