import mongoose from "mongoose";
import { loadEnvConfig } from "@next/env";
import connectDB from "./mongodb";
import { Product } from "./models";

// Load environment variables dari root project
loadEnvConfig(process.cwd());

const productsData = [
  {
    name: "Ethiopian Yirgacheffe",
    category: "Coffee Beans",
    price: 280000,
    stock: 42,
    shortDescription: "Floral aroma with notes of jasmine and lemon. A bright, tea-like body.",
    longDescription: "Sourced from the highlands of Yirgacheffe, this single-origin bean is celebrated for its delicate floral notes of jasmine and bergamot, complemented by bright lemon citrus. The cup is light-to-medium bodied with a clean, tea-like finish that lingers beautifully.",
    badge: "Best Seller",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    roast: "Light Roast",
  },
  {
    name: "Sumatra Mandheling",
    category: "Coffee Beans",
    price: 195000,
    stock: 25,
    shortDescription: "Full body with an intense, earthy aroma and herbal nuances. Low acidity.",
    longDescription: "Grown at 1,500 m altitude in the volcanic soils of West Sumatra, Mandheling delivers a signature wet-hulled profile. Expect bold earthiness, dark chocolate undertones, and a syrupy body with remarkably low acidity — perfect for afternoon brewing.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800&q=80",
    roast: "Dark Roast",
  },
  {
    name: "Colombia Supremo",
    category: "Coffee Beans",
    price: 175000,
    stock: 50,
    shortDescription: "Smooth and sweet with notes of caramel and fruit. Perfectly balanced.",
    longDescription: "Hand-picked from Colombia's premier coffee estates, this Supremo grade bean strikes a perfect balance between sweetness and complexity. Notes of brown sugar, red apple, and milk chocolate make it ideal for any brewing method from pour-over to French press.",
    badge: "Baru",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    roast: "Medium Roast",
  },
  {
    name: "Espresso House Blend",
    category: "Coffee Beans",
    price: 210000,
    stock: 120,
    shortDescription: "Our signature blend crafted for the perfect crema. Bold, rich, and syrupy.",
    longDescription: "Our master blender's signature creation — a precise ratio of Brazilian Santos and Colombian Excelso, designed to pull a perfect espresso with a rich, hazelnut-hued crema. Equally exceptional as a lungo, flat white, or cold brew concentrate.",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=80",
    roast: "Espresso",
  },
  {
    name: "Kenya AA",
    category: "Coffee Beans",
    price: 320000,
    stock: 15,
    shortDescription: "Complex flavor profile with distinct blackcurrant notes and wine-like acidity.",
    longDescription: "Kenya AA is the country's highest screen size grade, sourced from the fertile red soil of the Central Province. Bold and wine-like with a pronounced blackcurrant acidity, it finishes with a lingering, grape-like sweetness that coffee connoisseurs treasure.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    roast: "Light Roast",
  },
  {
    name: "Costa Rica Tarrazu",
    category: "Coffee Beans",
    price: 240000,
    stock: 30,
    shortDescription: "Crisp and clean with hints of citrus and chocolate. High altitude grown.",
    longDescription: "From the renowned Tarrazu valley — one of Costa Rica's most celebrated micro-regions — this bean is solar-dried and precisely light-roasted to highlight bright grapefruit zest, smooth milk chocolate, and a lingering honey-sweet finish.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
    roast: "Medium Roast",
  },
  {
    name: "Vanilla Syrup",
    category: "Syrups",
    price: 95000,
    stock: 200,
    shortDescription: "Pemanis vanilla organik untuk ragam sajian kopi.",
    longDescription: "Sirup vanilla yang diekstrak murni dari biji vanilla Madagascar asli. Sangat cocok dipadukan dengan minuman latte basik, menciptakan keharmonisan rasa tanpa mematikan notes natural dari espresso base.",
    badge: "Terlaris",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
    roast: "-",
  },
  {
    name: "Oatly Barista Edition",
    category: "Dairy Alternative",
    price: 75000,
    stock: 58,
    shortDescription: "Susu oat pilihan barista profesional yang creamy and teksturnya pekat.",
    longDescription: "Oatly Barista dirancang khusus untuk menghasilkan micro-foam yang sempurna dan stabil untuk latte art harian Anda. Tidak menghilangkan rasa kopi melainkan memberi creamy finish yang memuaskan dan tentunya vegan-friendly.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=800&q=80",
    roast: "-",
  },
  {
    name: "Paper Cups (12oz)",
    category: "Paper Goods",
    price: 45000,
    stock: 500,
    shortDescription: "Gelas kertas cup ramah lingkungan kualitas ekspor (Isi 50 pcs).",
    longDescription: "Cup kertas bergelombang (corrugated triple wall) yang melindungi tangan pengguna tanpa perlu cup sleeve. Sangat kuat, tebal, dan terjamin food-grade, cocok untuk sajian panas take-away estetik.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&q=80",
    roast: "-",
  },
  {
    name: "V60 Dripper Copper",
    category: "Equipment",
    price: 650000,
    stock: 12,
    shortDescription: "Alat seduh manual ikonik berbalut material tembaga premium untuk konduktivitas tinggi.",
    longDescription: "Hario V60 Copper menawarkan desain estetika tingkat tinggi yang dibalut material tembaga, terkenal dengan penahanan panas dan konduktivitas termal yang efisien untuk mempercepat perlakuan blooming sehingga memperkuat ekstraksi manual-brew yang tak tertandingi.",
    badge: "Premium",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80",
    roast: "-",
  }
];

async function runSeed() {
  try {
    await connectDB();
    console.log("🔥 Terhubung ke MongoDB. Mulai menghapus data Products lama...");

    // Hapus seluruh produk sebelumnya agar clean slate
    await Product.deleteMany({});
    console.log("🧹 Data Product lama berhasil dihapus.");

    // Masukkan data baru
    await Product.insertMany(productsData);
    console.log(`✅ Berhasil menyisipkan ${productsData.length} data Product dummy!`);

    await mongoose.disconnect();
    console.log("🔌 Koneksi MongoDB ditutup.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Terjadi kesalahan saat proses seeding:", err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Eksekusi seed otomatis jika dipanggil langsung lewat command node/ts-node
runSeed();
