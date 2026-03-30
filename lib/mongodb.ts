import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Tolong masukkan MONGODB_URI di dalam file .env.local');
}

// Menggunakan global untuk menyimpan koneksi agar tidak terus-menerus 
// membuat koneksi baru saat Next.js melakukan Hot Reload di mode Development.
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Kalau sudah ada koneksi yang terbuka, pakai yang itu saja
  if (cached.conn) {
    return cached.conn;
  }

  // Kalau belum, buat koneksi baru
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Berhasil terhubung ke MongoDB Atlas!');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
