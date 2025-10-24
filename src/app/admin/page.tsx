'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Loader2, Eye, EyeOff, Settings, LogOut, User } from 'lucide-react'

interface AdminUser {
  id: string
  username: string
  name: string | null
}

interface FormSubmission {
  id: string
  nisn?: string
  namaPesertaDidik: string
  jenisKelamin?: string
  nik?: string
  noKK?: string
  tempatLahir?: string
  tanggalLahir?: string
  statusDalamKeluarga?: string
  anakKe?: number
  jumlahSaudara?: number
  noHpWa?: string
  alamatTinggal?: string
  desaKelurahan?: string
  kecamatan?: string
  kotaKabupaten?: string
  provinsi?: string
  tinggalDi?: string
  transportasiKeSekolah?: string
  namaSekolahAsal?: string
  alamatSekolahAsal?: string
  tpqTpaJilid?: string
  tpqTpaLulus?: string
  madinUla?: string
  madinWustha?: string
  madinUlya?: string
  madinLulus?: string
  prestasiAkademik?: string
  prestasiNonAkademik?: string
  namaAyahWali?: string
  nikAyahWali?: string
  noHpWaAyahWali?: string
  pendidikanTerakhirAyahWali?: string
  pekerjaanAyahWali?: string
  rerataPenghasilanAyahWali?: string
  namaIbuWali?: string
  nikIbuWali?: string
  noHpWaIbuWali?: string
  pendidikanTerakhirIbuWali?: string
  pekerjaanIbuWali?: string
  rerataPenghasilanIbuWali?: string
  namaWali?: string
  pekerjaanWali?: string
  nomorKIP?: string
  nomorKKS?: string
  nomorPKH?: string
  diterimaDiKelas?: string
  tanggalDiterima?: string
  programTahfidz: boolean
  programBilingualSains: boolean
  programQiroatulKutub: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null)
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setAdmin(data.admin)
        fetchSubmissions()
      } else {
        router.push('/login')
      }
    } catch (error) {
      router.push('/login')
    } finally {
      setAuthLoading(false)
    }
  }

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/form')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.data)
      } else {
        alert('Gagal mengambil data')
      }
    } catch (error) {
      alert('Gagal mengambil data formulir')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      router.push('/login')
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordError('')

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordForm),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        alert('Password berhasil diubah')
        setShowPasswordDialog(false)
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        setPasswordError(data.error || 'Gagal mengubah password')
      }
    } catch (error) {
      setPasswordError('Terjadi kesalahan koneksi')
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return

    try {
      const response = await fetch(`/api/form/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Data berhasil dihapus')
        fetchSubmissions()
      } else {
        throw new Error('Gagal menghapus data')
      }
    } catch (error) {
      alert('Gagal menghapus data')
    }
  }

  const handleExport = () => {
    const csvContent = [
      [
        'Nama Peserta Didik', 'NISN', 'Jenis Kelamin', 'NIK', 'No. KK', 
        'Tempat Lahir', 'Tanggal Lahir', 'No. HP/WA', 'Alamat', 'Desa/Kelurahan',
        'Kecamatan', 'Kota/Kabupaten', 'Provinsi', 'Tinggal Di', 'Transportasi',
        'Sekolah Asal', 'Nama Ayah/Wali', 'No. HP Ayah/Wali', 'Nama Ibu/Wali', 
        'No. HP Ibu/Wali', 'Program Unggulan', 'Tanggal Daftar'
      ],
      ...submissions.map(submission => [
        submission.namaPesertaDidik,
        submission.nisn || '',
        submission.jenisKelamin || '',
        submission.nik || '',
        submission.noKK || '',
        submission.tempatLahir || '',
        submission.tanggalLahir || '',
        submission.noHpWa || '',
        submission.alamatTinggal || '',
        submission.desaKelurahan || '',
        submission.kecamatan || '',
        submission.kotaKabupaten || '',
        submission.provinsi || '',
        submission.tinggalDi || '',
        submission.transportasiKeSekolah || '',
        submission.namaSekolahAsal || '',
        submission.namaAyahWali || '',
        submission.noHpWaAyahWali || '',
        submission.namaIbuWali || '',
        submission.noHpWaIbuWali || '',
        [
          submission.programTahfidz ? 'Tahfidz' : '',
          submission.programBilingualSains ? 'Bilingual-Sains' : '',
          submission.programQiroatulKutub ? 'Qiroatul-Kutub' : ''
        ].filter(Boolean).join(', '),
        new Date(submission.createdAt).toLocaleString('id-ID')
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `formulir_mts_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredSubmissions = submissions.filter(submission =>
    submission.namaPesertaDidik.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.nisn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.noHpWa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.namaAyahWali?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.namaIbuWali?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memeriksa autentikasi...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">⚙️ Admin Dashboard - MTs Salafiyah Hidayatul Athfal</span>
            </div>
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-2">
                <a 
                  href="/" 
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  Formulir
                </a>
                <a 
                  href="/admin" 
                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  Admin
                </a>
              </nav>
              
              {/* User Menu */}
              <div className="flex items-center gap-3 border-l pl-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {admin?.name || admin?.username}
                  </span>
                </div>
                
                <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ubah Password</DialogTitle>
                      <DialogDescription>
                        Ubah password administrator Anda
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      {passwordError && (
                        <Alert variant="destructive">
                          <AlertDescription>{passwordError}</AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Password Saat Ini</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPasswords.current ? 'text' : 'password'}
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            required
                            disabled={passwordLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                            disabled={passwordLoading}
                          >
                            {showPasswords.current ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Password Baru</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPasswords.new ? 'text' : 'password'}
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            required
                            disabled={passwordLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                            disabled={passwordLoading}
                          >
                            {showPasswords.new ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showPasswords.confirm ? 'text' : 'password'}
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            required
                            disabled={passwordLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                            disabled={passwordLoading}
                          >
                            {showPasswords.confirm ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowPasswordDialog(false)}
                          disabled={passwordLoading}
                          className="flex-1"
                        >
                          Batal
                        </Button>
                        <Button
                          type="submit"
                          disabled={passwordLoading}
                          className="flex-1"
                        >
                          {passwordLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Menyimpan...
                            </>
                          ) : (
                            'Ubah Password'
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600 mt-2">Kelola data formulir pendaftaran peserta didik baru</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pendaftar</p>
                <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
              </div>
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hari Ini</p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => 
                    new Date(s.createdAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <span className="text-2xl">📅</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Formulir Aktif</p>
                <p className="text-2xl font-bold text-gray-900">{filteredSubmissions.length}</p>
              </div>
              <span className="text-2xl">📋</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Export Data</p>
                <button 
                  onClick={handleExport}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  📥 CSV
                </button>
              </div>
              <span className="text-2xl">💾</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Cari nama, NISN, telepon, atau nama orang tua..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button 
              onClick={fetchSubmissions}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Data Pendaftar Peserta Didik Baru</h2>
          </div>
          
          {filteredSubmissions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">📭</p>
              <p>Tidak ada data yang ditemukan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Peserta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NISN
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jenis Kelamin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No. HP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ayah/Wali
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {submission.namaPesertaDidik}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.nisn || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.jenisKelamin || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.noHpWa || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.namaAyahWali || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {submission.programTahfidz && (
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Tahfidz
                            </span>
                          )}
                          {submission.programBilingualSains && (
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              Bilingual
                            </span>
                          )}
                          {submission.programQiroatulKutub && (
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                              Qiro'atul
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(submission.createdAt).toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => handleDelete(submission.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Detail Pendaftar - {selectedSubmission.namaPesertaDidik}</h3>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Biodata Murid */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      👤 Biodata Murid
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-500">NISN</p>
                        <p className="mt-1">{selectedSubmission.nisn || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Nama Peserta Didik</p>
                        <p className="mt-1">{selectedSubmission.namaPesertaDidik}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Jenis Kelamin</p>
                        <p className="mt-1">{selectedSubmission.jenisKelamin || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">NIK</p>
                        <p className="mt-1">{selectedSubmission.nik || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">No. KK</p>
                        <p className="mt-1">{selectedSubmission.noKK || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">No. HP/WA</p>
                        <p className="mt-1">{selectedSubmission.noHpWa || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Tempat Lahir</p>
                        <p className="mt-1">{selectedSubmission.tempatLahir || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Tanggal Lahir</p>
                        <p className="mt-1">{selectedSubmission.tanggalLahir || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Status dalam Keluarga</p>
                        <p className="mt-1">{selectedSubmission.statusDalamKeluarga || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Anak Ke</p>
                        <p className="mt-1">{selectedSubmission.anakKe || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Jumlah Saudara</p>
                        <p className="mt-1">{selectedSubmission.jumlahSaudara || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Tinggal Di</p>
                        <p className="mt-1">{selectedSubmission.tinggalDi || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Transportasi ke Sekolah</p>
                        <p className="mt-1">{selectedSubmission.transportasiKeSekolah || '-'}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="font-medium text-gray-500">Alamat Lengkap</p>
                      <p className="mt-1 text-sm">
                        {selectedSubmission.alamatTinggal || '-'}
                        {selectedSubmission.desaKelurahan && `, ${selectedSubmission.desaKelurahan}`}
                        {selectedSubmission.kecamatan && `, ${selectedSubmission.kecamatan}`}
                        {selectedSubmission.kotaKabupaten && `, ${selectedSubmission.kotaKabupaten}`}
                        {selectedSubmission.provinsi && `, ${selectedSubmission.provinsi}`}
                      </p>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-gray-500">Nama Sekolah Asal</p>
                        <p className="mt-1">{selectedSubmission.namaSekolahAsal || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Alamat Sekolah Asal</p>
                        <p className="mt-1">{selectedSubmission.alamatSekolahAsal || '-'}</p>
                      </div>
                    </div>
                  </div>

                  {/* TPQ/TPA & Madin */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      📚 TPQ/TPA & Madin
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-500">TPQ/TPA - Jilid</p>
                        <p className="mt-1">{selectedSubmission.tpqTpaJilid || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">TPQ/TPA - Lulus</p>
                        <p className="mt-1">{selectedSubmission.tpqTpaLulus || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Madin - Ula</p>
                        <p className="mt-1">{selectedSubmission.madinUla || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Madin - Wustha</p>
                        <p className="mt-1">{selectedSubmission.madinWustha || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Madin - Ulya</p>
                        <p className="mt-1">{selectedSubmission.madinUlya || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Madin - Lulus</p>
                        <p className="mt-1">{selectedSubmission.madinLulus || '-'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Prestasi */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      🏆 Informasi Prestasi
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-500">Prestasi Akademik</p>
                        <p className="mt-1 whitespace-pre-wrap">{selectedSubmission.prestasiAkademik || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Prestasi Non-Akademik</p>
                        <p className="mt-1 whitespace-pre-wrap">{selectedSubmission.prestasiNonAkademik || '-'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Orang Tua */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      👨‍👩‍👧‍👦 Data Orang Tua/Wali
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-500">Nama Ayah/Wali</p>
                        <p className="mt-1">{selectedSubmission.namaAyahWali || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">No. HP Ayah/Wali</p>
                        <p className="mt-1">{selectedSubmission.noHpWaAyahWali || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Pekerjaan Ayah/Wali</p>
                        <p className="mt-1">{selectedSubmission.pekerjaanAyahWali || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Penghasilan Ayah/Wali</p>
                        <p className="mt-1">{selectedSubmission.rerataPenghasilanAyahWali || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Nama Ibu/Wali</p>
                        <p className="mt-1">{selectedSubmission.namaIbuWali || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">No. HP Ibu/Wali</p>
                        <p className="mt-1">{selectedSubmission.noHpWaIbuWali || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Pekerjaan Ibu/Wali</p>
                        <p className="mt-1">{selectedSubmission.pekerjaanIbuWali || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Penghasilan Ibu/Wali</p>
                        <p className="mt-1">{selectedSubmission.rerataPenghasilanIbuWali || '-'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Keterangan Tambahan */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      📝 Keterangan Tambahan
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-500">Nama Wali</p>
                        <p className="mt-1">{selectedSubmission.namaWali || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Pekerjaan Wali</p>
                        <p className="mt-1">{selectedSubmission.pekerjaanWali || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Nomor KIP</p>
                        <p className="mt-1">{selectedSubmission.nomorKIP || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Nomor KKS</p>
                        <p className="mt-1">{selectedSubmission.nomorKKS || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Nomor PKH</p>
                        <p className="mt-1">{selectedSubmission.nomorPKH || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Diterima di Kelas</p>
                        <p className="mt-1">{selectedSubmission.diterimaDiKelas || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Tanggal Diterima</p>
                        <p className="mt-1">{selectedSubmission.tanggalDiterima || '-'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Program Unggulan</p>
                        <p className="mt-1">
                          <div className="flex flex-wrap gap-1">
                            {selectedSubmission.programTahfidz && (
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                Tahfidz
                              </span>
                            )}
                            {selectedSubmission.programBilingualSains && (
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                Bilingual-Sains
                              </span>
                            )}
                            {selectedSubmission.programQiroatulKutub && (
                              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                                Qiro'atul-Kutub
                              </span>
                            )}
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-500">Tanggal Daftar</p>
                    <p className="mt-1">
                      {new Date(selectedSubmission.createdAt).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(selectedSubmission.id)
                      setSelectedSubmission(null)
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}