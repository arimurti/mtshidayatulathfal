'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { Search, Download, Eye, Calendar, Users, FileText, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Navigation } from '@/components/navigation'

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
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPendidikan, setFilterPendidikan] = useState('all')
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  useEffect(() => {
    filterSubmissions()
  }, [submissions, searchTerm, filterPendidikan])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/form')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.data)
      } else {
        throw new Error('Gagal mengambil data')
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Gagal mengambil data formulir",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterSubmissions = () => {
    let filtered = submissions

    if (searchTerm) {
      filtered = filtered.filter(submission =>
        submission.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.telepon?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterPendidikan !== 'all') {
      filtered = filtered.filter(submission => submission.pendidikan === filterPendidikan)
    }

    setFilteredSubmissions(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return

    try {
      const response = await fetch(`/api/form/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Data berhasil dihapus",
        })
        fetchSubmissions()
      } else {
        throw new Error('Gagal menghapus data')
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Gagal menghapus data",
        variant: "destructive",
      })
    }
  }

  const handleExport = () => {
    const csvContent = [
      ['Nama Lengkap', 'Email', 'Telepon', 'Alamat', 'Pendidikan', 'Pekerjaan', 'Pesan', 'Tanggal'],
      ...filteredSubmissions.map(submission => [
        submission.namaLengkap,
        submission.email,
        submission.telepon || '',
        submission.alamat || '',
        submission.pendidikan || '',
        submission.pekerjaan || '',
        submission.pesan || '',
        format(new Date(submission.createdAt), 'dd/MM/yyyy HH:mm', { locale: id })
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `formulir_${format(new Date(), 'dd-MM-yyyy')}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getPendidikanBadge = (pendidikan?: string) => {
    const colors: Record<string, string> = {
      sd: 'bg-gray-100 text-gray-800',
      smp: 'bg-blue-100 text-blue-800',
      sma: 'bg-green-100 text-green-800',
      d3: 'bg-yellow-100 text-yellow-800',
      s1: 'bg-purple-100 text-purple-800',
      s2: 'bg-pink-100 text-pink-800',
      s3: 'bg-red-100 text-red-800',
      lainnya: 'bg-orange-100 text-orange-800'
    }
    return colors[pendidikan || ''] || 'bg-gray-100 text-gray-800'
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
        <Navigation />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600 mt-2">Kelola data formulir pendaftaran</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hari Ini</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => 
                  format(new Date(s.createdAt), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                ).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Formulir Aktif</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredSubmissions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Export Data</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button onClick={handleExport} size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Data Pendaftar</CardTitle>
            <CardDescription>
              Daftar semua formulir yang telah dikirim
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari nama, email, atau telepon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterPendidikan} onValueChange={setFilterPendidikan}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter Pendidikan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Pendidikan</SelectItem>
                  <SelectItem value="sd">SD</SelectItem>
                  <SelectItem value="smp">SMP</SelectItem>
                  <SelectItem value="sma">SMA</SelectItem>
                  <SelectItem value="d3">D3</SelectItem>
                  <SelectItem value="s1">S1</SelectItem>
                  <SelectItem value="s2">S2</SelectItem>
                  <SelectItem value="s3">S3</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telepon</TableHead>
                    <TableHead>Pendidikan</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        Tidak ada data yang ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.namaLengkap}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.telepon || '-'}</TableCell>
                        <TableCell>
                          {submission.pendidikan && (
                            <Badge className={getPendidikanBadge(submission.pendidikan)}>
                              {submission.pendidikan.toUpperCase()}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {format(new Date(submission.createdAt), 'dd/MM/yyyy HH:mm', { locale: id })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedSubmission(submission)
                                setShowDetailModal(true)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(submission.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {showDetailModal && selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Detail Pendaftar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Nama Lengkap</Label>
                    <p className="mt-1">{selectedSubmission.namaLengkap}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p className="mt-1">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Telepon</Label>
                    <p className="mt-1">{selectedSubmission.telepon || '-'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Pendidikan</Label>
                    <p className="mt-1">
                      {selectedSubmission.pendidikan ? (
                        <Badge className={getPendidikanBadge(selectedSubmission.pendidikan)}>
                          {selectedSubmission.pendidikan.toUpperCase()}
                        </Badge>
                      ) : '-'}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-500">Alamat</Label>
                    <p className="mt-1">{selectedSubmission.alamat || '-'}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-500">Pekerjaan</Label>
                    <p className="mt-1">{selectedSubmission.pekerjaan || '-'}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-500">Pesan</Label>
                    <p className="mt-1 whitespace-pre-wrap">{selectedSubmission.pesan || '-'}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-500">Tanggal Daftar</Label>
                    <p className="mt-1">
                      {format(new Date(selectedSubmission.createdAt), 'dd MMMM yyyy HH:mm:ss', { locale: id })}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                    Tutup
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDelete(selectedSubmission.id)
                      setShowDetailModal(false)
                    }}
                  >
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}