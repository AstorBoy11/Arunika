import SalesChart from '@/components/dashboard/sales-chart';

export default function OwnerDashboardPage() {
  // Data dummy untuk development
  const stats = [
    { title: 'Total Penjualan', value: 'Rp 15.500.000', change: '+12%' },
    { title: 'Total Pesanan', value: '342', change: '+8%' },
    { title: 'Produk Terjual', value: '1,250', change: '+15%' },
    { title: 'Pelanggan Baru', value: '89', change: '+5%' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Owner</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
            <p className="text-3xl font-bold mb-2">{stat.value}</p>
            <p className="text-green-600 text-sm">{stat.change} dari bulan lalu</p>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Grafik Penjualan</h2>
        <SalesChart />
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Pesanan Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Produk</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((item) => (
                <tr key={item} className="border-t">
                  <td className="px-4 py-3">#00{item}</td>
                  <td className="px-4 py-3">Customer {item}</td>
                  <td className="px-4 py-3">Espresso x2</td>
                  <td className="px-4 py-3">Rp 50.000</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      Selesai
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
