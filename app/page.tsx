"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Work_Sans } from "next/font/google";
import {
  Coffee,
  ShoppingBag,
  User,
  Truck,
  Award,
  Leaf,
  Moon,
  Sun,
  Star,
  MapPin,
  Phone,
  Mail,
  Instagram,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const bestSellers = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    price: "Rp 85.000",
    rating: 4.9,
    reviews: 128,
    tag: "Best Seller",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB06jAOy0e6VpbUp6hOlshceiORePg0Pvs54Ms1qza9ov8vm15VJSj1Eb1JC77MblwiNTKnzB2nPHoFeAxeU4MGM3NBLBP4BJ4p5wWGyqGo9VhyUJcfiLe3UPyu62xbnZ9gDf5Ix_8i4XZzJiO02V51N2DdLf8Lcz0fsub86I5w_CooD2yzLy7W74c0gRgMhXPmyYyVdk6RpoGm__Oobfw8F6ajbFBcleBXcQcupgr37UVMWcWnGKD-LTNbV06oSBM2fWSHaKEwlvEs",
  },
  {
    id: 2,
    name: "Sumatra Mandheling",
    price: "Rp 72.000",
    rating: 4.8,
    reviews: 96,
    tag: "Populer",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMFtMAcIKaVPvQYctBLheaTsf6inh5kusmEPv8dAtt5CAkGFWWo3JLMGqvsOnwsKqi028amHlsFfvdsDauUTrhZ4p9KHwImj23Z7D-WDj4SCW4iWt1Wr9Y5Jph1l-Zl1w9ADQaiC2qomr4HoWL21tPCxi1pECQY05QzaoGHraPUvMxPeGzCw9nIA5jlZmDT3WWLtVLtfDZd7rx7UZfDdyOoTFOdZU8CPjMVmrN7-uhc7Sb4fPLXQYgmJ3XVPIw9U61Dcm6pKtOeFUe",
  },
  {
    id: 3,
    name: "Colombia Supremo",
    price: "Rp 68.000",
    rating: 4.7,
    reviews: 84,
    tag: "Baru",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6Rtnqc0knxLE0r6zNwSbxxLmdh0ae94THdw8aYmdqKQHlmXJ92jN4e8Vvv43VKMHu22zHUS2K2ZayLP-iNNcbihw9FoQssku8mEx5G5C53iEWRK0DvM7Z__UYBi5gi57IQfSIZcq51AzlbLhXSOnGSWPMX-D63RhH6tFjUNPe5FMuFy-MoRKJeORdOS_kZ_vwFOBhkxgi1CsVfLoFRxFog7gF6LgsiDFT7-gnY98VwJ5DrXITR2F4rE7qMC_K48Ul714wdJLlFi7X",
  },
];

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "#hero" },
    { name: "Produk", href: "#products" },
    { name: "Tentang", href: "#about" },
    { name: "Kontak", href: "#contact" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${workSans.className} ${isDark ? "bg-[#120d0a] text-[#fcfaf8]" : "bg-[#faf7f4] text-[#1a140e]"
        }`}
    >
      {/* ---------------- NAVBAR ---------------- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? isDark
            ? "bg-[#1a140e]/95 backdrop-blur-md shadow-lg py-3 border-b border-[#3e3025]"
            : "bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-[#e5ddd5]"
          : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo_header.png"
              alt="Arunika Logo"
              width={665}
              height={484}
              className="h-16 w-auto object-contain transform group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-[#ec6d13] ${isScrolled
                  ? isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                  : "text-white/80 hover:text-white"
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg border transition-all ${isScrolled
                ? isDark
                  ? "border-[#3e3025] bg-[#1a140e] hover:bg-[#221810] text-[#b9a89d] hover:text-white"
                  : "border-[#e5ddd5] bg-white hover:bg-[#f5f0eb] text-[#8b7355] hover:text-[#1a140e]"
                : "border-white/20 bg-white/10 hover:bg-white/20 text-white"
                }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Login Button - Desktop */}
            <Link href="/auth" className="hidden md:block">
              <button className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all group ${isScrolled
                ? isDark
                  ? "border-[#3e3025] hover:border-[#ec6d13] bg-[#1a140e] hover:bg-[#221810]"
                  : "border-[#e5ddd5] hover:border-[#ec6d13] bg-white hover:bg-[#f5f0eb]"
                : "border-white/30 hover:border-[#ec6d13] bg-white/10 hover:bg-white/20 text-white"
                }`}>
                <User size={18} className="text-[#ec6d13]" />
                <span className="text-sm font-bold">Login</span>
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-lg transition-all ${isScrolled
                ? isDark
                  ? "text-white hover:bg-[#221810]"
                  : "text-[#1a140e] hover:bg-[#f5f0eb]"
                : "text-white hover:bg-white/10"
                }`}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 border-b shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 ${isDark
            ? "bg-[#1a140e] border-[#3e3025]"
            : "bg-white border-[#e5ddd5]"
            }`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${isDark
                    ? "text-[#b9a89d] hover:text-white hover:bg-[#221810]"
                    : "text-[#8b7355] hover:text-[#1a140e] hover:bg-[#f5f0eb]"
                    }`}
                >
                  {link.name}
                </a>
              ))}
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-[#ec6d13] text-white font-bold rounded-lg"
              >
                <User size={18} />
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop"
            alt="Coffee Hero"
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${isDark
            ? "bg-gradient-to-b from-black/70 via-black/50 to-[#120d0a]"
            : "bg-gradient-to-b from-black/50 via-black/30 to-[#faf7f4]"
            }`}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Coffee size={16} className="text-[#ec6d13]" />
            <span className="text-white/90 text-sm font-medium">Premium Coffee dari Nusantara</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black leading-tight mb-6 text-white drop-shadow-lg">
            <span className="text-[#ec6d13]">Arunika</span> <br />
            <span className="text-3xl md:text-5xl">Arabica Robusta Untuk Dinikmati Bersama</span>
          </h1>
          <p className="text-lg md:text-xl text-[#dcdcdc] mb-10 max-w-2xl mx-auto leading-relaxed">
            Setiap cangkir adalah fajar baru. Membawa hangatnya harapan dan
            semangat untuk memulai hari, tepat seperti makna &lsquo;Arunika&rsquo; dalam
            bahasa Sansekerta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth">
              <button className="px-8 py-4 bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold rounded-xl shadow-lg shadow-[#ec6d13]/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#ec6d13]/40 flex items-center gap-2">
                <ShoppingBag size={20} />
                Belanja Sekarang
              </button>
            </Link>
            <a href="#about">
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2">
                Tentang Kami
                <ArrowRight size={18} />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className={`py-20 transition-colors ${isDark ? "bg-[#120d0a]" : "bg-[#faf7f4]"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#ec6d13] text-sm font-bold uppercase tracking-widest">Mengapa Arunika?</span>
            <h2 className={`text-3xl md:text-4xl font-black mt-3 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
              Kopi Terbaik, Langsung ke Tanganmu
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "100% Organik",
                desc: "Biji kopi dipetik tanpa pestisida berbahaya, menjaga kemurnian rasa alami dari kebun.",
              },
              {
                icon: Award,
                title: "Premium Quality",
                desc: "Dipilih melalui proses kurasi ketat oleh ahli Q-Grader bersertifikat internasional.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Dikirim dalam 24 jam setelah roasting untuk kesegaran maksimal di setiap cangkir.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border transition-all duration-300 group hover:shadow-lg ${isDark
                  ? "bg-[#1a140e] border-[#2c241b] hover:border-[#ec6d13]/50 hover:shadow-[#ec6d13]/5"
                  : "bg-white border-[#e5ddd5] hover:border-[#ec6d13]/50 hover:shadow-[#ec6d13]/5"
                  }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#ec6d13] group-hover:shadow-lg group-hover:shadow-[#ec6d13]/20 transition-all duration-300 ${isDark ? "bg-[#221810]" : "bg-[#fef5ee]"
                  }`}>
                  <feature.icon
                    size={28}
                    className="text-[#ec6d13] group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- BEST SELLERS SECTION ---------------- */}
      <section id="products" className={`py-20 transition-colors ${isDark ? "bg-[#0f0b08]" : "bg-[#f5f0eb]"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-[#ec6d13] text-sm font-bold uppercase tracking-widest">Koleksi Kami</span>
              <h2 className={`text-3xl md:text-4xl font-black mt-3 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                Produk Terlaris
              </h2>
              <p className={`mt-2 max-w-lg ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                Pilihan favorit para pencinta kopi, dipilih langsung dari perkebunan terbaik.
              </p>
            </div>
            <Link href="/auth">
              <button className={`flex items-center gap-2 text-sm font-bold hover:text-[#ec6d13] transition-colors group ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                Lihat Semua Produk
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${isDark
                  ? "bg-[#1a140e] border-[#2c241b] hover:border-[#ec6d13]/40 hover:shadow-[#ec6d13]/5"
                  : "bg-white border-[#e5ddd5] hover:border-[#ec6d13]/40 hover:shadow-[#ec6d13]/10"
                  }`}
              >
                <div className={`relative aspect-[4/3] overflow-hidden ${isDark ? "bg-[#221810]" : "bg-[#f5f0eb]"}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-[#ec6d13] text-white text-xs font-bold rounded-full shadow-lg">
                      {product.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? "fill-[#ec6d13] text-[#ec6d13]" : isDark ? "text-[#3e3025]" : "text-[#e5ddd5]"}
                      />
                    ))}
                    <span className={`text-xs ml-1 ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold mb-1 group-hover:text-[#ec6d13] transition-colors ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                    {product.name}
                  </h3>
                  <p className="text-[#ec6d13] font-black text-xl">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section id="about" className={`py-20 transition-colors ${isDark ? "bg-[#120d0a]" : "bg-[#faf7f4]"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop"
                  alt="Arunika Coffee Story"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className={`absolute -bottom-6 -right-6 p-6 rounded-2xl shadow-xl border ${isDark
                ? "bg-[#1a140e] border-[#3e3025]"
                : "bg-white border-[#e5ddd5]"
                }`}>
                <div className="text-center">
                  <span className="text-[#ec6d13] text-4xl font-black block">5+</span>
                  <span className={`text-sm font-medium ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>Tahun<br />Pengalaman</span>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <span className="text-[#ec6d13] text-sm font-bold uppercase tracking-widest">Cerita Kami</span>
              <h2 className={`text-3xl md:text-4xl font-black mt-3 mb-6 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                Dari Kebun ke Cangkir, Dengan Cinta
              </h2>
              <div className={`space-y-4 text-base leading-relaxed ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                <p>
                  Arunika lahir dari kecintaan terhadap kopi nusantara. Kami percaya bahwa secangkir
                  kopi yang sempurna dimulai dari pemilihan biji terbaik, proses roasting yang tepat,
                  dan penyajian dengan penuh perhatian.
                </p>
                <p>
                  Bermitra langsung dengan petani kopi lokal di berbagai daerah penghasil kopi
                  terbaik Indonesia — dari dataran tinggi Gayo hingga lereng Ijen — kami memastikan
                  setiap biji kopi yang sampai di tangan Anda adalah yang terbaik.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-10">
                {[
                  { value: "15+", label: "Varian Kopi" },
                  { value: "2K+", label: "Pelanggan" },
                  { value: "100%", label: "Organik" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span className="text-[#ec6d13] text-2xl md:text-3xl font-black block">{stat.value}</span>
                    <span className={`text-xs font-medium ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA SECTION ---------------- */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop"
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Siap Merasakan Kopi Terbaik?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Bergabung bersama ribuan pencinta kopi dan nikmati pengalaman kopi premium langsung dari nusantara.
          </p>
          <Link href="/auth">
            <button className="px-10 py-4 bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold rounded-xl shadow-lg shadow-[#ec6d13]/30 transition-all hover:scale-105 hover:shadow-xl text-lg flex items-center gap-3 mx-auto">
              <ShoppingBag size={22} />
              Mulai Belanja
            </button>
          </Link>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer id="contact" className={`pt-20 pb-8 border-t transition-colors ${isDark
        ? "bg-[#0c0907] border-[#2c241b]"
        : "bg-[#f5f0eb] border-[#e5ddd5]"
        }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-[#ec6d13] rounded-md">
                  <Coffee className="text-white" size={20} />
                </div>
                <span className={`text-lg font-black ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Arunika
                </span>
              </div>
              <p className={`leading-relaxed mb-6 ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                Menghubungkan pecinta kopi dengan biji kopi terbaik dari seluruh
                nusantara.
              </p>
              <div className="flex gap-3">
                {[Instagram, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`p-2.5 rounded-lg border transition-all hover:border-[#ec6d13] hover:text-[#ec6d13] ${isDark
                      ? "border-[#3e3025] text-[#9a6c4c] hover:bg-[#221810]"
                      : "border-[#e5ddd5] text-[#8b7355] hover:bg-[#fef5ee]"
                      }`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={`font-bold mb-6 uppercase tracking-wider text-sm ${isDark ? "text-white" : "text-[#1a140e]"
                }`}>
                Menu
              </h4>
              <ul className={`space-y-3 ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                {["Beranda", "Produk", "Tentang Kami", "Login"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#ec6d13] transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bantuan */}
            <div>
              <h4 className={`font-bold mb-6 uppercase tracking-wider text-sm ${isDark ? "text-white" : "text-[#1a140e]"
                }`}>
                Bantuan
              </h4>
              <ul className={`space-y-3 ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                {[
                  "Konfirmasi Pembayaran",
                  "Lacak Pesanan",
                  "Syarat & Ketentuan",
                  "Kebijakan Privasi",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#ec6d13] transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className={`font-bold mb-6 uppercase tracking-wider text-sm ${isDark ? "text-white" : "text-[#1a140e]"
                }`}>
                Kontak
              </h4>
              <ul className={`space-y-4 ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#ec6d13] mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Jl. Kopi Nusantara No. 12,<br />Jember, Jawa Timur</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#ec6d13] flex-shrink-0" />
                  <span className="text-sm">+62 812 3456 7890</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-[#ec6d13] flex-shrink-0" />
                  <span className="text-sm">hello@arunika.id</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className={`pt-8 border-t text-center ${isDark ? "border-[#2c241b]" : "border-[#e5ddd5]"}`}>
            <p className={`text-sm ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
              &copy; {new Date().getFullYear()} Arunika Coffee. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
