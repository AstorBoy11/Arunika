import connectDB from "../mongodb";
import Order from "../models/Order";

export async function generateOrderNumber(): Promise<string> {
  await connectDB();

  const now = new Date();
  
  // Format DDMMYY
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // Bulan mulai dari 0
  const yy = String(now.getFullYear()).slice(-2);
  const dateStr = `${dd}${mm}${yy}`;

  // Tentukan batasan waktu untuk hari ini (Start & End of Day)
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  // Hitung jumlah order yang dibuat hari ini
  const countToday = await Order.countDocuments({
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  // Increment + 1 dan format ke 3 digit (contoh: 001, 002)
  const orderSequence = String(countToday + 1).padStart(3, "0");

  return `ORD-${dateStr}${orderSequence}`;
}
