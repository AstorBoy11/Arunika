import { NextResponse } from 'next/server';

// POST /api/auth/login - Dummy login (development only)
export async function POST(request: Request) {
  const body = await request.json();
  const { role } = body;

  // Simulasi login berhasil
  return NextResponse.json({
    success: true,
    data: {
      id: 1,
      name: 'User Demo',
      email: 'demo@example.com',
      role: role || 'customer',
      token: 'dummy-jwt-token',
    },
  });
}
