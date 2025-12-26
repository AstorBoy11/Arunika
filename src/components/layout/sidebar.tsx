'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  const adminMenus = [
    { label: 'Kelola Produk', href: '/admin/products', icon: '📦' },
    { label: 'Kelola Konten', href: '/admin/content', icon: '📝' },
  ];

  const ownerMenus = [
    { label: 'Dashboard', href: '/owner', icon: '📊' },
  ];

  const isAdminPage = pathname.startsWith('/admin');

  const menus = isAdminPage ? adminMenus : ownerMenus;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">☕ Coffee Shop</h1>
        <p className="text-sm text-gray-400 mt-2">
          {isAdminPage ? 'Admin Panel' : 'Owner Panel'}
        </p>
      </div>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive(menu.href)
                ? 'bg-amber-700 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <span className="text-xl">{menu.icon}</span>
            <span>{menu.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <Link
          href="/login"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
