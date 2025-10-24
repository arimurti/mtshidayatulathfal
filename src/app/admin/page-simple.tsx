'use client'

import { useState, useEffect } from 'react'

interface FormSubmission {
  id: string
  namaLengkap: string
  email: string
  telepon?: string
  alamat?: string
  pendidikan?: string
  pekerjaan?: string
  pesan?: string
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

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
      ['Nama Lengkap', 'Email', 'Telepon', 'Alamat', 'Pendidikan', 'Pekerjaan', 'Pesan', 'Tanggal'],
      ...submissions.map(submission => [
        submission.namaLengkap,
        submission.email,
        submission.telepon || '',
        submission.alamat || '',
        submission.pendidikan || '',
        submission.pekerjaan || '',
        submission.pesan || '',
        new Date(submission.createdAt).toLocaleString('id-ID')
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `formulir_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredSubmissions = submissions.filter(submission =>
    submission.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.telepon?.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        {/* Simple Navigation */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">⚙️ Admin Dashboard</span>
            </div>
            <nav className="flex items-center gap-2">
              <a 
                href="/" 
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Formulir
              </a>
              <a 
                href="/admin" 
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Admin
              </a>
            </nav>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600 mt-2">Kelola data formulir pendaftaran</p>
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
                placeholder="🔍 Cari nama, email, atau telepon..."
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
            <h2 className="text-lg font-semibold text-gray-900">Data Pendaftar</h2>
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
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telepon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pendidikan
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
                        {submission.namaLengkap}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.telepon || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.pendidikan ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {submission.pendidikan.toUpperCase()}
                          </span>
                        ) : '-'}
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
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Detail Pendaftar</h3>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Nama Lengkap</p>
                      <p className="mt-1">{selectedSubmission.namaLengkap}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1">{selectedSubmission.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Telepon</p>
                      <p className="mt-1">{selectedSubmission.telepon || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pendidikan</p>
                      <p className="mt-1">
                        {selectedSubmission.pendidikan ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {selectedSubmission.pendidikan.toUpperCase()}
                          </span>
                        ) : '-'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Alamat</p>
                    <p className="mt-1">{selectedSubmission.alamat || '-'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pekerjaan</p>
                    <p className="mt-1">{selectedSubmission.pekerjaan || '-'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pesan</p>
                    <p className="mt-1 whitespace-pre-wrap">{selectedSubmission.pesan || '-'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tanggal Daftar</p>
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