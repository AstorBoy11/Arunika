"use client";

import { useState } from "react";
import { 
  Shield, 
  Key, 
  Smartphone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Plus, 
  MoreVertical, 
  Trash2,
  Lock
} from "lucide-react";

export default function SettingsPage() {
  // State dummy untuk toggle (agar bisa diklik)
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="max-w-[1000px] w-full mx-auto flex flex-col gap-10 pb-20">
      
      {/* Header Halaman */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Pengaturan Akun</h2>
        <p className="text-[#b9a89d]">Kelola keamanan, preferensi notifikasi, dan alamat pengirimanmu.</p>
      </div>

      {/* --- SECTION 1: ACCOUNT SECURITY --- */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Shield className="text-[#ec6d13]" size={24} />
          Keamanan Akun
        </h3>
        
        <div className="bg-[#1a140e] rounded-2xl border border-[#3e342b] overflow-hidden">
          {/* Change Password */}
          <div className="p-6 border-b border-[#3e342b]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#2a221b] rounded-xl text-[#ec6d13]">
                  <Key size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Ganti Password</h4>
                  <p className="text-[#b9a89d] text-sm mt-1">Perbarui password secara berkala agar akun tetap aman.</p>
                </div>
              </div>
              <button className="px-5 py-2 rounded-xl bg-[#2a221b] border border-[#3e342b] text-white text-sm font-medium hover:bg-[#3e342b] hover:text-[#ec6d13] transition-all whitespace-nowrap">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: ALAMAT PENGIRIMAN (Replaces Payment) --- */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="text-[#ec6d13]" size={24} />
            Alamat Pengiriman
          </h3>
          <button className="flex items-center gap-2 text-[#ec6d13] hover:text-white transition-colors text-sm font-semibold">
            <Plus size={18} />
            Tambah Alamat
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Alamat 1 (Utama) */}
          <div className="bg-[#1a140e] border border-[#ec6d13]/50 rounded-2xl p-6 relative group hover:shadow-lg hover:shadow-[#ec6d13]/10 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ec6d13] text-white uppercase tracking-wider">Utama</span>
                <span className="text-white font-bold">Rumah</span>
              </div>
              <button className="text-[#b9a89d] hover:text-white transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-1">Alex Morgan</h4>
              <p className="text-[#b9a89d] text-sm leading-relaxed">
                Jl. Kopi Robusta No. 45, Blok C<br />
                Kecamatan Lowokwaru, Kota Malang<br />
                Jawa Timur, 65141
              </p>
              <p className="text-[#b9a89d] text-sm mt-2 flex items-center gap-2">
                <Smartphone size={14} /> (+62) 812-3456-7890
              </p>
            </div>
          </div>

          {/* Card Alamat 2 */}
          <div className="bg-[#1a140e] border border-[#3e342b] rounded-2xl p-6 relative group hover:border-[#ec6d13]/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2a221b] text-[#b9a89d] border border-[#3e342b] uppercase tracking-wider">Kantor</span>
                <span className="text-white font-bold">Kantor Pusat</span>
              </div>
              <button className="text-[#b9a89d] hover:text-white transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-1">Alex Morgan (Divisi IT)</h4>
              <p className="text-[#b9a89d] text-sm leading-relaxed">
                Gedung Cyber Coffee Lt. 3<br />
                Jl. Jendral Sudirman Kav. 10<br />
                Jakarta Selatan, 12190
              </p>
              <p className="text-[#b9a89d] text-sm mt-2 flex items-center gap-2">
                <Smartphone size={14} /> (+62) 812-3456-7890
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: DELETE ACCOUNT --- */}
      <section className="pt-8 border-t border-[#3e342b]">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-red-500 font-semibold mb-1 flex items-center gap-2">
              <Trash2 size={18} /> Hapus Akun
            </h4>
            <p className="text-[#b9a89d] text-sm">Menghapus akun secara permanen dan menghilangkan semua data riwayat pesanan.</p>
          </div>
          <button className="px-5 py-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors font-medium text-sm">
            Hapus Akun
          </button>
        </div>
      </section>

    </div>
  );
}