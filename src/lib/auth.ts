// Authentication configuration (untuk masa development, ini hanya placeholder)
// Nanti akan dikonfigurasi dengan NextAuth atau JWT

export const auth = {
  // Placeholder untuk fungsi auth
  getSession: () => {
    return null;
  },
  
  signIn: (credentials: any) => {
    console.log('Sign in (development mode)', credentials);
    return { success: true };
  },
  
  signOut: () => {
    console.log('Sign out (development mode)');
  },
};

// Konfigurasi NextAuth akan ditambahkan di sini
// export { auth } from '@/auth';
