import bcrypt from "bcryptjs";
import { loadEnvConfig } from "@next/env";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

loadEnvConfig(process.cwd());

async function seedAdmin() {
  const adminName = process.env.ADMIN_NAME ?? "Arunika Admin";
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@arunika.local").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin12345";

  if (adminPassword.length < 8) {
    throw new Error("ADMIN_PASSWORD minimal 8 karakter");
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const existing = await User.findOne({ email: adminEmail }).select("+passwordHash +role");

  if (existing) {
    existing.name = existing.name || adminName;
    existing.role = "admin";
    existing.passwordHash = passwordHash;
    if (!existing.phone) {
      existing.phone = "-";
    }
    await existing.save();

    console.log(`Admin diperbarui: ${adminEmail}`);
    return;
  }

  await User.create({
    name: adminName,
    email: adminEmail,
    phone: "-",
    role: "admin",
    passwordHash,
  });

  console.log(`Admin dibuat: ${adminEmail}`);
}

seedAdmin()
  .then(() => {
    console.log("Seed admin selesai");
    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error("Seed admin gagal:", error);
    process.exit(1);
  });
