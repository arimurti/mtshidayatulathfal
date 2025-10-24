'use client'

import { useState } from 'react'

export default function FormPage() {
  const [formData, setFormData] = useState({
    // Biodata Murid
    nisn: '',
    namaPesertaDidik: '',
    jenisKelamin: '',
    nik: '',
    noKK: '',
    tempatLahir: '',
    tanggalLahir: '',
    statusDalamKeluarga: '',
    anakKe: '',
    jumlahSaudara: '',
    noHpWa: '',
    alamatTinggal: '',
    desaKelurahan: '',
    kecamatan: '',
    kotaKabupaten: '',
    provinsi: '',
    tinggalDi: '',
    transportasiKeSekolah: '',
    namaSekolahAsal: '',
    alamatSekolahAsal: '',
    tpqTpaJilid: '',
    tpqTpaLulus: '',
    madinUla: '',
    madinWustha: '',
    madinUlya: '',
    madinLulus: '',
    
    // Informasi Prestasi
    prestasiAkademik: '',
    prestasiNonAkademik: '',
    
    // Identitas Ayah/Wali
    namaAyahWali: '',
    nikAyahWali: '',
    noHpWaAyahWali: '',
    pendidikanTerakhirAyahWali: '',
    pekerjaanAyahWali: '',
    rerataPenghasilanAyahWali: '',
    
    // Identitas Ibu/Wali
    namaIbuWali: '',
    nikIbuWali: '',
    noHpWaIbuWali: '',
    pendidikanTerakhirIbuWali: '',
    pekerjaanIbuWali: '',
    rerataPenghasilanIbuWali: '',
    
    // Keterangan Tambahan
    namaWali: '',
    pekerjaanWali: '',
    nomorKIP: '',
    nomorKKS: '',
    nomorPKH: '',
    diterimaDiKelas: '',
    tanggalDiterima: '',
    
    // Pemilihan Program Unggulan
    programTahfidz: false,
    programBilingualSains: false,
    programQiroatulKutub: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Formulir berhasil dikirim!')
        // Reset form
        setFormData({
          nisn: '',
          namaPesertaDidik: '',
          jenisKelamin: '',
          nik: '',
          noKK: '',
          tempatLahir: '',
          tanggalLahir: '',
          statusDalamKeluarga: '',
          anakKe: '',
          jumlahSaudara: '',
          noHpWa: '',
          alamatTinggal: '',
          desaKelurahan: '',
          kecamatan: '',
          kotaKabupaten: '',
          provinsi: '',
          tinggalDi: '',
          transportasiKeSekolah: '',
          namaSekolahAsal: '',
          alamatSekolahAsal: '',
          tpqTpaJilid: '',
          tpqTpaLulus: '',
          madinUla: '',
          madinWustha: '',
          madinUlya: '',
          madinLulus: '',
          prestasiAkademik: '',
          prestasiNonAkademik: '',
          namaAyahWali: '',
          nikAyahWali: '',
          noHpWaAyahWali: '',
          pendidikanTerakhirAyahWali: '',
          pekerjaanAyahWali: '',
          rerataPenghasilanAyahWali: '',
          namaIbuWali: '',
          nikIbuWali: '',
          noHpWaIbuWali: '',
          pendidikanTerakhirIbuWali: '',
          pekerjaanIbuWali: '',
          rerataPenghasilanIbuWali: '',
          namaWali: '',
          pekerjaanWali: '',
          nomorKIP: '',
          nomorKKS: '',
          nomorPKH: '',
          diterimaDiKelas: '',
          tanggalDiterima: '',
          programTahfidz: false,
          programBilingualSains: false,
          programQiroatulKutub: false
        })
      } else {
        throw new Error('Gagal mengirim formulir')
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              FORMULIR PENDAFTARAN PESERTA DIDIK BARU
            </h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              MTs SALAFIYAH HIDAYATUL ATHFAL
            </h2>
            <p className="text-gray-600">Tahun Pelajaran 2024/2025</p>
            <p className="text-sm text-gray-500 mt-2">
              Jl. Gatot Subroto Gg 2A Banyuurip Kota Pekalongan
            </p>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">📋 Formulir Online</span>
            </div>
            <nav className="flex items-center gap-2">
              <a 
                href="/" 
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Formulir
              </a>
              <a 
                href="/admin" 
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Admin
              </a>
            </nav>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Biodata Murid */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              👤 Biodata Murid
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">NISN</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan NISN"
                  value={formData.nisn}
                  onChange={(e) => handleInputChange('nisn', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nama Peserta Didik *</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama lengkap"
                  value={formData.namaPesertaDidik}
                  onChange={(e) => handleInputChange('namaPesertaDidik', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Jenis Kelamin</label>
                <select 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.jenisKelamin}
                  onChange={(e) => handleInputChange('jenisKelamin', e.target.value)}
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">NIK</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan NIK"
                  value={formData.nik}
                  onChange={(e) => handleInputChange('nik', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">No. KK</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nomor KK"
                  value={formData.noKK}
                  onChange={(e) => handleInputChange('noKK', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">No. HP / WA</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+62 812-3456-7890"
                  value={formData.noHpWa}
                  onChange={(e) => handleInputChange('noHpWa', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tempat Lahir</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan tempat lahir"
                  value={formData.tempatLahir}
                  onChange={(e) => handleInputChange('tempatLahir', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.tanggalLahir}
                  onChange={(e) => handleInputChange('tanggalLahir', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status dalam keluarga</label>
                <select 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.statusDalamKeluarga}
                  onChange={(e) => handleInputChange('statusDalamKeluarga', e.target.value)}
                >
                  <option value="">Pilih status</option>
                  <option value="Anak kandung">Anak kandung</option>
                  <option value="Anak angkat">Anak angkat</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Anak ke-</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1"
                  value={formData.anakKe}
                  onChange={(e) => handleInputChange('anakKe', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Jumlah Saudara</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2"
                  value={formData.jumlahSaudara}
                  onChange={(e) => handleInputChange('jumlahSaudara', e.target.value)}
                />
              </div>
            </div>
            
            {/* Alamat */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Alamat Tinggal</label>
              <textarea
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan alamat lengkap"
                rows={3}
                value={formData.alamatTinggal}
                onChange={(e) => handleInputChange('alamatTinggal', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Desa / Kelurahan</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan desa/kelurahan"
                  value={formData.desaKelurahan}
                  onChange={(e) => handleInputChange('desaKelurahan', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Kecamatan</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan kecamatan"
                  value={formData.kecamatan}
                  onChange={(e) => handleInputChange('kecamatan', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Kota / Kabupaten</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan kota/kabupaten"
                  value={formData.kotaKabupaten}
                  onChange={(e) => handleInputChange('kotaKabupaten', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Provinsi</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan provinsi"
                  value={formData.provinsi}
                  onChange={(e) => handleInputChange('provinsi', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tinggal di</label>
                <select 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.tinggalDi}
                  onChange={(e) => handleInputChange('tinggalDi', e.target.value)}
                >
                  <option value="">Pilih tempat tinggal</option>
                  <option value="Rumah orang tua">Rumah orang tua</option>
                  <option value="Rumah kontrak">Rumah kontrak</option>
                  <option value="Rumah kerabat">Rumah kerabat</option>
                  <option value="Asrama pesantren">Asrama pesantren</option>
                  <option value="Panti asuhan">Panti asuhan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Transportasi ke sekolah</label>
                <select 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.transportasiKeSekolah}
                  onChange={(e) => handleInputChange('transportasiKeSekolah', e.target.value)}
                >
                  <option value="">Pilih transportasi</option>
                  <option value="Jalan kaki">Jalan kaki</option>
                  <option value="Sepeda">Sepeda</option>
                  <option value="Sepeda motor">Sepeda motor</option>
                  <option value="Angkutan umum">Angkutan umum</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama sekolah asal</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama sekolah asal"
                  value={formData.namaSekolahAsal}
                  onChange={(e) => handleInputChange('namaSekolahAsal', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Alamat sekolah asal</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan alamat sekolah asal"
                  value={formData.alamatSekolahAsal}
                  onChange={(e) => handleInputChange('alamatSekolahAsal', e.target.value)}
                />
              </div>
            </div>
            
            {/* TPQ/TPA */}
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="font-medium mb-2">TPQ/TPA</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Jilid</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan jilid"
                    value={formData.tpqTpaJilid}
                    onChange={(e) => handleInputChange('tpqTpaJilid', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Lulus</label>
                  <select 
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.tpqTpaLulus}
                    onChange={(e) => handleInputChange('tpqTpaLulus', e.target.value)}
                  >
                    <option value="">Pilih status</option>
                    <option value="Ya">Ya</option>
                    <option value="Tidak">Tidak</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Madin */}
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="font-medium mb-2">Madin</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ula</label>
                  <select 
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.madinUla}
                    onChange={(e) => handleInputChange('madinUla', e.target.value)}
                  >
                    <option value="">Pilih status</option>
                    <option value="Ya">Ya</option>
                    <option value="Tidak">Tidak</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Wustha</label>
                  <select 
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.madinWustha}
                    onChange={(e) => handleInputChange('madinWustha', e.target.value)}
                  >
                    <option value="">Pilih status</option>
                    <option value="Ya">Ya</option>
                    <option value="Tidak">Tidak</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Ulya</label>
                  <select 
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.madinUlya}
                    onChange={(e) => handleInputChange('madinUlya', e.target.value)}
                  >
                    <option value="">Pilih status</option>
                    <option value="Ya">Ya</option>
                    <option value="Tidak">Tidak</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Lulus</label>
                  <select 
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.madinLulus}
                    onChange={(e) => handleInputChange('madinLulus', e.target.value)}
                  >
                    <option value="">Pilih status</option>
                    <option value="Ya">Ya</option>
                    <option value="Tidak">Tidak</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Prestasi */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🏆 Informasi Prestasi
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prestasi Akademik</label>
                <textarea
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Sebutkan prestasi akademik yang pernah diraih"
                  rows={3}
                  value={formData.prestasiAkademik}
                  onChange={(e) => handleInputChange('prestasiAkademik', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Prestasi Non-Akademik</label>
                <textarea
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Sebutkan prestasi non-akademik yang pernah diraih"
                  rows={3}
                  value={formData.prestasiNonAkademik}
                  onChange={(e) => handleInputChange('prestasiNonAkademik', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Identitas Ayah/Wali */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              👨‍👩‍👧‍👦 Identitas Ayah / Wali
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama ayah/wali"
                  value={formData.namaAyahWali}
                  onChange={(e) => handleInputChange('namaAyahWali', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">No. NIK</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan NIK ayah/wali"
                  value={formData.nikAyahWali}
                  onChange={(e) => handleInputChange('nikAyahWali', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">No. HP / WA</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+62 812-3456-7890"
                  value={formData.noHpWaAyahWali}
                  onChange={(e) => handleInputChange('noHpWaAyahWali', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Pendidikan Terakhir</label>
                <select 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.pendidikanTerakhirAyahWali}
                  onChange={(e) => handleInputChange('pendidikanTerakhirAyahWali', e.target.value)}
                >
                  <option value="">Pilih pendidikan</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Pekerjaan</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan pekerjaan ayah/wali"
                  value={formData.pekerjaanAyahWali}
                  onChange={(e) => handleInputChange('pekerjaanAyahWali', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Rerata Penghasilan per Bulan</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan rerata penghasilan"
                  value={formData.rerataPenghasilanAyahWali}
                  onChange={(e) => handleInputChange('rerataPenghasilanAyahWali', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Identitas Ibu/Wali */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              👩‍👧‍👦 Identitas Ibu / Wali
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama ibu/wali"
                  value={formData.namaIbuWali}
                  onChange={(e) => handleInputChange('namaIbuWali', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">No. NIK</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan NIK ibu/wali"
                  value={formData.nikIbuWali}
                  onChange={(e) => handleInputChange('nikIbuWali', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">No. HP / WA</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+62 812-3456-7890"
                  value={formData.noHpWaIbuWali}
                  onChange={(e) => handleInputChange('noHpWaIbuWali', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Pendidikan Terakhir</label>
                <select 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.pendidikanTerakhirIbuWali}
                  onChange={(e) => handleInputChange('pendidikanTerakhirIbuWali', e.target.value)}
                >
                  <option value="">Pilih pendidikan</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Pekerjaan</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan pekerjaan ibu/wali"
                  value={formData.pekerjaanIbuWali}
                  onChange={(e) => handleInputChange('pekerjaanIbuWali', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Rerata Penghasilan per Bulan</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan rerata penghasilan"
                  value={formData.rerataPenghasilanIbuWali}
                  onChange={(e) => handleInputChange('rerataPenghasilanIbuWali', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Keterangan Tambahan */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📝 Keterangan Tambahan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Wali</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama wali"
                  value={formData.namaWali}
                  onChange={(e) => handleInputChange('namaWali', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Pekerjaan Wali</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan pekerjaan wali"
                  value={formData.pekerjaanWali}
                  onChange={(e) => handleInputChange('pekerjaanWali', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nomor KIP</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nomor KIP"
                  value={formData.nomorKIP}
                  onChange={(e) => handleInputChange('nomorKIP', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nomor KKS</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nomor KKS"
                  value={formData.nomorKKS}
                  onChange={(e) => handleInputChange('nomorKKS', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nomor PKH</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nomor PKH"
                  value={formData.nomorPKH}
                  onChange={(e) => handleInputChange('nomorPKH', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Diterima di kelas</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan kelas"
                  value={formData.diterimaDiKelas}
                  onChange={(e) => handleInputChange('diterimaDiKelas', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tanggal diterima</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.tanggalDiterima}
                  onChange={(e) => handleInputChange('tanggalDiterima', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Pemilihan Program Unggulan */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              ⭐ Pemilihan Program Unggulan
            </h2>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={formData.programTahfidz}
                  onChange={(e) => handleInputChange('programTahfidz', e.target.checked)}
                />
                <span className="text-sm font-medium">Tahfidz</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={formData.programBilingualSains}
                  onChange={(e) => handleInputChange('programBilingualSains', e.target.checked)}
                />
                <span className="text-sm font-medium">Bilingual – Sains</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={formData.programQiroatulKutub}
                  onChange={(e) => handleInputChange('programQiroatulKutub', e.target.checked)}
                />
                <span className="text-sm font-medium">Qiro'atul – Kutub</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? '⏳ Mengirim...' : '📤 Kirim Formulir'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 MTs Salafiyah Hidayatul Athfal. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </div>
  )
}