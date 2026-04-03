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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB06jAOy0e6VpbUp6hOlshceiORePg0Pvs54Ms1qza9ov8vm15VJSj1Eb1JC77MblwiNTKnzB2nPHoFeAxeU4MGM3NBLBP4BJ4p5wWGyqGo9VhyUJcfiLe3UPyu62xbnZ9gDf5Ix_8i4XZzJiO02V51N2DdLf8Lcz0fsub86I5w_CooD2yzLy7W74c0gRgMhXPmyYyVdk6RpoGm__Oobfw8F6ajbFBcleBXcQcupgr37UVMWcWnGKD-LTNbV06oSBM2fWSHaKEwlvEs",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMFtMAcIKaVPvQYctBLheaTsf6inh5kusmEPv8dAtt5CAkGFWWo3JLMGqvsOnwsKqi028amHlsFfvdsDauUTrhZ4p9KHwImj23Z7D-WDj4SCW4iWt1Wr9Y5Jph1l-Zl1w9ADQaiC2qomr4HoWL21tPCxi1pECQY05QzaoGHraPUvMxPeGzCw9nIA5jlZmDT3WWLtVLtfDZd7rx7UZfDdyOoTFOdZU8CPjMVmrN7-uhc7Sb4fPLXQYgmJ3XVPIw9U61Dcm6pKtOeFUe",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6Rtnqc0knxLE0r6zNwSbxxLmdh0ae94THdw8aYmdqKQHlmXJ92jN4e8Vvv43VKMHu22zHUS2K2ZayLP-iNNcbihw9FoQssku8mEx5G5C53iEWRK0DvM7Z__UYBi5gi57IQfSIZcq51AzlbLhXSOnGSWPMX-D63RhH6tFjUNPe5FMuFy-MoRKJeORdOS_kZ_vwFOBhkxgi1CsVfLoFRxFog7gF6LgsiDFT7-gnY98VwJ5DrXITR2F4rE7qMC_K48Ul714wdJLlFi7X",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDqGbCu-PjW8XJl7mlArgoi-f-vnEr1jU24YXaLBZy3GtN0Lpg58p-6XoCoqpy5_AGJSfQG9zMwACIs__tFEvH5DqvoOdJqpZh9TGgDYUVU7Ov0hzL4DFjymyw63rxvgXxfvW0W8yV6BlkRXmF7ehphhQ7ikj-ZRhDBaeOOeqoKncRZmcGf6fZFXo9cjZwnMjJIMuVONl1NXJEyg6Tch3KRqypH06M9t_xZMHsQrEUUt-XNBfLsduQ2W2yfM_itJUavmr_te7l5Kkk",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg8ODvWlvkdaCvcwj4ZDEyB-nN7KV-94P5awGyPN2gMvB3JGDpnsh0TO1gPLbdCx21TCitKds-hOq5hRVz6XQzCM-Etep_5yy1SY65yJxnRcoHD7ccQCe1XILPKbCA52qnIqTIsAwlyIarKkASw9peo8Gr9ZNXkbsOpedWJQ3nnUM7KBXojrR4JKeXrPqLb-wX7hQMaoT31wgpBKtZTdkIzCqvlpoJGmuERvsL--ezS3KvzkV2hwpVIIWUVErh1MssRTUs_xojG5Ct",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvGk1zhDtmMOqQ1x_HziqscnUUvGCn5mHFopvl78tlL12hsu3SzzsueoNdvOgF-eqL5RJG5woPgo4sXYgZtzAqAYKqKHicJF7QzwCDXoVAvz6hc3IuvOkdJ93PGBc7aRTxRT4Bk2FrnndhdIm3e8Y6bxlG8BAardAVERopssnsjru_0RbmwoIUEY4l1KFrTC4YBq721wzRMk5fWlvQIVKvFZ3rdRhneSC1r0AUiOXYy4wCWugITCovUwTCJlvFD2xDyYbqYWo5J84s",
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
    image: "https://images.unsplash.com/photo-1550937667-bbfaeffa49ab?q=80&w=2938&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1596647900609-b684cb40fb20?q=80&w=2487&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1518342417743-34e9e0ac1020?q=80&w=2934&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2942&auto=format&fit=crop",
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

    process.exit(0);
  } catch (err) {
    console.error("❌ Terjadi kesalahan saat proses seeding:", err);
    process.exit(1);
  }
}

// Eksekusi seed otomatis jika dipanggil langsung lewat command node/ts-node
runSeed();
