'use client';

import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = () => {
    // Untuk development: langsung redirect ke login
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Register - Coffee Shop
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            (Development Mode)
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nama Anda"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
}
