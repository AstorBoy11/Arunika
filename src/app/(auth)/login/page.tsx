'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('customer');

  const handleLogin = () => {
    // Untuk development: langsung redirect tanpa validasi
    if (role === 'admin') {
      router.push('/admin/products');
    } else if (role === 'owner') {
      router.push('/owner');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Login - Coffee Shop
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            (Development Mode - No Password Required)
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pilih Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <button
            onClick={handleLogin}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}
