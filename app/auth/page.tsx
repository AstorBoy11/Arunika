"use client";

import { useState } from "react";
import Link from "next/link";
import { Work_Sans } from "next/font/google";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Coffee 
} from "lucide-react";

// Mengatur font Work Sans
const workSans = Work_Sans({ 
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export default function Auth() {
  // State untuk toggle Login vs Register
  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("REGISTER");
  // State untuk toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const toggleVariant = () => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  };

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden ${workSans.className} bg-background-light dark:bg-background-dark text-[#1b130d] dark:text-[#fcfaf8]`}>
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"></div>
        {/* Disarankan mengganti <img> dengan <Image /> dari next/image di produksi */}
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbWqxgtxL4wiogDf2mgwJxiIYWpFqODNiObArWinLm6y0pVgEjwutfs5Kj4MWHhpyyPJKhiuWEzjuh4nc4iR06etjKewa8cXKszYZ803eTHMO799B2kY8zOMOwTZrE1gouJXY6jrr_HmEN0EbPhTHMpUGus0GA-nmwG39ILeAli4y7IWAKOMr1bHWLAOmxWXX_m97RiSgb2_UUTE8VThgrXQNyW2X4_MhcUXvcXduLN2HO0qI-A9DFF4r4U4K8MdGxnubvLmMh-Uwb" // Ganti dengan gambar kopi lokal Anda
          alt="Coffee Shop Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Auth Card */}
      <div className="relative z-20 w-full max-w-[480px] bg-white dark:bg-[#2c241b] rounded-xl shadow-2xl overflow-hidden flex flex-col border border-[#f3ece7] dark:border-[#3e342b]">
        
        {/* Header Section */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="flex justify-center mb-6 text-primary">
            <Coffee size={48} strokeWidth={1.5} />
          </div>

          {/* Toggle Button Group */}
          <div className="grid grid-cols-2 bg-[#221810] p-1 rounded-lg mb-6 border border-[#3e342b]">
            <button 
              onClick={() => setVariant("LOGIN")}
              className={`font-medium py-2 rounded-md transition-colors focus:outline-none ${
                variant === "LOGIN" 
                  ? "bg-primary text-white shadow-md" 
                  : "text-[#9a6c4c] hover:text-white"
              }`}
            >
              Login
            </button>
            <button 
              onClick={() => setVariant("REGISTER")}
              className={`font-medium py-2 rounded-md transition-colors focus:outline-none ${
                variant === "REGISTER" 
                  ? "bg-primary text-white shadow-md" 
                  : "text-[#9a6c4c] hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[#1b130d] dark:text-white mb-2">
            {variant === "REGISTER" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-[#9a6c4c] dark:text-gray-400 text-base font-normal">
            {variant === "REGISTER" 
              ? "Enter your details to join the community." 
              : "Please enter your details to sign in."}
          </p>
        </div>

        {/* Form Section */}
        <div className="px-8 pb-10">
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Full Name (Only visible in Register mode) */}
            {variant === "REGISTER" && (
              <label className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <span className="text-base font-medium text-[#1b130d] dark:text-white leading-normal">Full Name</span>
                <div className="relative flex w-full items-stretch rounded-lg group">
                  <div className="text-[#9a6c4c] flex border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] items-center justify-center pl-[15px] rounded-l-lg border-r-0 z-10">
                    <User size={20} />
                  </div>
                  <input 
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-l-none border-l-0 text-[#1b130d] dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] h-14 placeholder:text-[#9a6c4c] px-[15px] text-base font-normal leading-normal" 
                    placeholder="John Doe" 
                    type="text" 
                  />
                </div>
              </label>
            )}

            {/* Email Address */}
            <label className="flex flex-col gap-2">
              <span className="text-base font-medium text-[#1b130d] dark:text-white leading-normal">Email Address</span>
              <div className="relative flex w-full items-stretch rounded-lg">
                <div className="text-[#9a6c4c] flex border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] items-center justify-center pl-[15px] rounded-l-lg border-r-0 z-10">
                  <Mail size={20} />
                </div>
                <input 
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-l-none border-l-0 text-[#1b130d] dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] h-14 placeholder:text-[#9a6c4c] px-[15px] text-base font-normal leading-normal" 
                  placeholder="you@example.com" 
                  type="email" 
                />
              </div>
            </label>

            {/* Password */}
            <label className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#1b130d] dark:text-white leading-normal">Password</span>
              </div>
              <div className="relative flex w-full items-stretch rounded-lg">
                <div className="text-[#9a6c4c] flex border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] items-center justify-center pl-[15px] rounded-l-lg border-r-0 z-10">
                  <Lock size={20} />
                </div>
                <input 
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-x-none border-x-0 text-[#1b130d] dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] h-14 placeholder:text-[#9a6c4c] px-[15px] text-base font-normal leading-normal" 
                  placeholder={variant === "REGISTER" ? "Create a password" : "Enter your password"}
                  type={showPassword ? "text" : "password"}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#9a6c4c] flex border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] items-center justify-center pr-[15px] rounded-r-lg border-l-0 z-10 cursor-pointer hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>

            {/* Submit Button */}
            <button className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary hover:bg-orange-700 text-[#fcfaf8] text-base font-bold leading-normal tracking-[0.015em] shadow-md transition-all">
              <span className="truncate">
                {variant === "REGISTER" ? "Sign Up" : "Sign In"}
              </span>
            </button>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#e7d9cf] dark:border-gray-600"></div>
              <span className="flex-shrink-0 mx-4 text-[#9a6c4c] text-xs uppercase font-medium tracking-wider">
                Or {variant === "REGISTER" ? "register" : "login"} with
              </span>
              <div className="flex-grow border-t border-[#e7d9cf] dark:border-gray-600"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center h-12 border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] rounded-lg hover:bg-[#f3ece7] dark:hover:bg-[#3e342b] transition-colors gap-2" type="button">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="text-sm font-bold text-[#1b130d] dark:text-white">Google</span>
              </button>
              <button className="flex items-center justify-center h-12 border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] rounded-lg hover:bg-[#f3ece7] dark:hover:bg-[#3e342b] transition-colors gap-2" type="button">
                <svg className="w-5 h-5 text-[#1b130d] dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.75-1.32 1.29.18 2.7.92 3.46 1.89-3.02 1.68-2.52 6.55.6 7.72-.45 1.18-1.5 3.08-2.69 4.04l-.2.14zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"></path>
                </svg>
                <span className="text-sm font-bold text-[#1b130d] dark:text-white">Apple</span>
              </button>
            </div>

            {/* Footer Text */}
            <div className="text-center mt-2">
              <p className="text-sm text-[#1b130d] dark:text-gray-300">
                {variant === "REGISTER" ? "Already have an account? " : "New to Coffee Connect? "}
                <button 
                  type="button"
                  onClick={toggleVariant} 
                  className="font-bold text-primary hover:text-orange-700 hover:underline focus:outline-none"
                >
                  {variant === "REGISTER" ? "Sign In" : "Register"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}