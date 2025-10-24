export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Formulir Pendaftaran Online</h1>
          <p className="text-gray-600">Silakan lengkapi formulir di bawah ini</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Informasi Pribadi</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded"
                  placeholder="+62 812-3456-7890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pendidikan</label>
                <select className="w-full p-2 border rounded">
                  <option value="">Pilih pendidikan</option>
                  <option value="sd">SD</option>
                  <option value="smp">SMP</option>
                  <option value="sma">SMA</option>
                  <option value="d3">D3</option>
                  <option value="s1">S1</option>
                  <option value="s2">S2</option>
                  <option value="s3">S3</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Alamat</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Masukkan alamat lengkap"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pekerjaan</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Masukkan pekerjaan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pesan Tambahan</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Tuliskan pesan atau informasi tambahan..."
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Kirim Formulir
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 Formulir Online. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </div>
  )
}