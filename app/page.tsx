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
} from "lucide-react";

// Font Setup
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efek Navbar berubah warna saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen bg-[#120d0a] text-[#fcfaf8] ${workSans.className}`}
    >
      {/* ---------------- NAVBAR ---------------- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#1a140e]/95 backdrop-blur-md shadow-lg py-4 border-b border-[#3e3025]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div>
              <Image
                src="/logo_header.png"
                alt="Arunika Logo"
                width={665}
                height={484}
                className="h-20 w-auto object-contain transform group-hover:scale-105 transition-transform"
              />
            </div>
          </Link>

          {/* Icons & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/auth">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#3e3025] hover:border-[#ec6d13] bg-[#1a140e] hover:bg-[#221810] transition-all group">
                <User size={18} className="text-[#ec6d13]" />
                <span className="text-sm font-bold">Login</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop"
            alt="Coffee Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#120d0a]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <h1 className="text-4xl md:text-7xl font-black leading-tight pt-10 mb-6 text-white drop-shadow-lg">
            <span className="text-[#ec6d13] text-5xl">Arunika </span> <br /> Arabica Robusta
            Untuk Dinikmati Bersama
          </h1>
          <p className="text-lg md:text-xl text-[#dcdcdc] mb-10 max-w-2xl mx-auto leading-relaxed">
            Setiap cangkir adalah fajar baru. Membawa hangatnya harapan dan
            semangat untuk memulai hari, tepat seperti makna 'Arunika' dalam
            bahasa Sansekerta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth">
              <button className="px-8 py-4 bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold rounded-xl shadow-lg shadow-[#ec6d13]/20 transition-all hover:scale-105 flex items-center gap-2">
                <ShoppingBag size={20} />
                Belanja Sekarang
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className="py-20 bg-[#120d0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "100% Organik",
                desc: "Biji kopi dipetik tanpa pestisida berbahaya, menjaga kemurnian rasa.",
              },
              {
                icon: Award,
                title: "Premium Quality",
                desc: "Dipilih melalui proses kurasi ketat oleh ahli Q-Grader bersertifikat.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Dikirim dalam 24 jam setelah roasting untuk kesegaran maksimal.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#1a140e] border border-[#2c241b] hover:border-[#ec6d13]/50 transition-colors group"
              >
                <div className="w-14 h-14 bg-[#221810] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#ec6d13] transition-colors">
                  <feature.icon
                    size={28}
                    className="text-[#ec6d13] group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#9a6c4c] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-[#0c0907] pt-20 pb-10 border-t border-[#2c241b]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-[#ec6d13] rounded-md">
                  <Coffee className="text-white" size={20} />
                </div>
                <span className="text-lg font-black text-white">Arunika </span>
              </div>
              <p className="text-[#9a6c4c] leading-relaxed mb-6">
                Menghubungkan pecinta kopi dengan biji kopi terbaik dari seluruh
                nusantara.
              </p>
            </div>

            <div className="">
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
                Bantuan
              </h4>
              <ul className="space-y-4 text-[#9a6c4c]">
                {[
                  "Konfirmasi Pembayaran",
                  "Lacak Pesanan",
                  "Syarat & Ketentuan",
                  "Hubungi Kami",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-[#ec6d13] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
