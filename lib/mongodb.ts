import mongoose from "mongoose";

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

function isSrvDnsError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return error.message.includes("querySrv") || error.message.includes("ECONNREFUSED");
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI!;
  const MONGODB_URI_FALLBACK = process.env.MONGODB_URI_FALLBACK;
  if (!MONGODB_URI) {
    throw new Error("Tolong masukkan MONGODB_URI di dalam file .env (Periksa .env.example sebagai referensi).");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("⏳ Menghubungkan ke MongoDB Atlas...");
    cached.promise = (async () => {
      try {
        const mongooseInstance = await mongoose.connect(MONGODB_URI, opts);
        console.log("✅ Berhasil terhubung ke MongoDB Atlas!");
        return mongooseInstance;
      } catch (primaryError: unknown) {
        if (MONGODB_URI_FALLBACK && isSrvDnsError(primaryError)) {
          console.warn("⚠️ Koneksi SRV gagal, mencoba fallback non-SRV...");
          const mongooseInstance = await mongoose.connect(MONGODB_URI_FALLBACK, opts);
          console.log("✅ Berhasil terhubung ke MongoDB Atlas (fallback non-SRV)!");
          return mongooseInstance;
        }

        throw primaryError;
      }
    })();
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
