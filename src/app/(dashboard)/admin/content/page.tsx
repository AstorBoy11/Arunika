export default function AdminContentPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Kelola Konten</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Banner Utama</h2>
          <div className="bg-gray-200 h-40 rounded mb-4"></div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Upload Banner
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Promo</h2>
          <div className="space-y-2 mb-4">
            <p className="text-gray-600">• Diskon 20% untuk pembelian 5 cup</p>
            <p className="text-gray-600">• Gratis ongkir min. pembelian 100k</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Tambah Promo
          </button>
        </div>
      </div>
    </div>
  );
}
