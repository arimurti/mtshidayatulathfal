import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { namaPesertaDidik } = body

    if (!namaPesertaDidik) {
      return NextResponse.json(
        { error: 'Nama peserta didik harus diisi' },
        { status: 400 }
      )
    }

    const submission = await db.formSubmission.create({
      data: {
        // Biodata Murid
        nisn: body.nisn || null,
        namaPesertaDidik: body.namaPesertaDidik,
        jenisKelamin: body.jenisKelamin || null,
        nik: body.nik || null,
        noKK: body.noKK || null,
        tempatLahir: body.tempatLahir || null,
        tanggalLahir: body.tanggalLahir || null,
        statusDalamKeluarga: body.statusDalamKeluarga || null,
        anakKe: body.anakKe ? parseInt(body.anakKe) : null,
        jumlahSaudara: body.jumlahSaudara ? parseInt(body.jumlahSaudara) : null,
        noHpWa: body.noHpWa || null,
        alamatTinggal: body.alamatTinggal || null,
        desaKelurahan: body.desaKelurahan || null,
        kecamatan: body.kecamatan || null,
        kotaKabupaten: body.kotaKabupaten || null,
        provinsi: body.provinsi || null,
        tinggalDi: body.tinggalDi || null,
        transportasiKeSekolah: body.transportasiKeSekolah || null,
        namaSekolahAsal: body.namaSekolahAsal || null,
        alamatSekolahAsal: body.alamatSekolahAsal || null,
        tpqTpaJilid: body.tpqTpaJilid || null,
        tpqTpaLulus: body.tpqTpaLulus || null,
        madinUla: body.madinUla || null,
        madinWustha: body.madinWustha || null,
        madinUlya: body.madinUlya || null,
        madinLulus: body.madinLulus || null,
        
        // Informasi Prestasi
        prestasiAkademik: body.prestasiAkademik || null,
        prestasiNonAkademik: body.prestasiNonAkademik || null,
        
        // Identitas Ayah/Wali
        namaAyahWali: body.namaAyahWali || null,
        nikAyahWali: body.nikAyahWali || null,
        noHpWaAyahWali: body.noHpWaAyahWali || null,
        pendidikanTerakhirAyahWali: body.pendidikanTerakhirAyahWali || null,
        pekerjaanAyahWali: body.pekerjaanAyahWali || null,
        rerataPenghasilanAyahWali: body.rerataPenghasilanAyahWali || null,
        
        // Identitas Ibu/Wali
        namaIbuWali: body.namaIbuWali || null,
        nikIbuWali: body.nikIbuWali || null,
        noHpWaIbuWali: body.noHpWaIbuWali || null,
        pendidikanTerakhirIbuWali: body.pendidikanTerakhirIbuWali || null,
        pekerjaanIbuWali: body.pekerjaanIbuWali || null,
        rerataPenghasilanIbuWali: body.rerataPenghasilanIbuWali || null,
        
        // Keterangan Tambahan
        namaWali: body.namaWali || null,
        pekerjaanWali: body.pekerjaanWali || null,
        nomorKIP: body.nomorKIP || null,
        nomorKKS: body.nomorKKS || null,
        nomorPKH: body.nomorPKH || null,
        diterimaDiKelas: body.diterimaDiKelas || null,
        tanggalDiterima: body.tanggalDiterima || null,
        
        // Pemilihan Program Unggulan
        programTahfidz: body.programTahfidz || false,
        programBilingualSains: body.programBilingualSains || false,
        programQiroatulKutub: body.programQiroatulKutub || false,
      },
    })

    return NextResponse.json(
      { 
        message: 'Formulir berhasil disimpan',
        data: submission 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving form submission:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menyimpan formulir' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const submissions = await db.formSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      message: 'Data formulir berhasil diambil',
      data: submissions
    })
  } catch (error) {
    console.error('Error fetching form submissions:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data formulir' },
      { status: 500 }
    )
  }
}