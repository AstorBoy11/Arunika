import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Tolong masukkan MONGODB_URI di dalam file .env.local (Periksa .env.example sebagai referensi).");
}

// Global declaration caching untuk Next.js Development Environment Hot Reloading (HMR)
// Hal ini mencegah Next.js memakan semua connection slots MongoDB saat compiler merender ulang komponen.
declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("⏳ Menghubungkan ke MongoDB Atlas...");
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("✅ Berhasil terhubung ke MongoDB Atlas!");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("❌ Gagal terhubung ke MongoDB:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
