'use client';

export default function SalesChart() {
  // Komponen chart sederhana untuk development
  const data = [
    { month: 'Jan', sales: 5000000 },
    { month: 'Feb', sales: 7000000 },
    { month: 'Mar', sales: 6500000 },
    { month: 'Apr', sales: 8000000 },
    { month: 'May', sales: 9500000 },
    { month: 'Jun', sales: 11000000 },
  ];

  const maxSales = Math.max(...data.map(d => d.sales));

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.month} className="flex items-center gap-4">
          <div className="w-12 text-sm font-medium">{item.month}</div>
          <div className="flex-1 bg-gray-200 rounded-full h-8">
            <div
              className="bg-amber-600 h-8 rounded-full flex items-center justify-end px-3"
              style={{ width: `${(item.sales / maxSales) * 100}%` }}
            >
              <span className="text-white text-xs font-semibold">
                {(item.sales / 1000000).toFixed(1)}jt
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
