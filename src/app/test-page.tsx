export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Test Page</h1>
        <p className="text-gray-600">Ini adalah halaman test untuk memastikan aplikasi berjalan.</p>
        
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Form Test</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded"
                placeholder="Masukkan nama"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded"
                placeholder="Masukkan email"
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}