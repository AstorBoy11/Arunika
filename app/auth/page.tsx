"use client";

import { useState } from "react";
import { Work_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Coffee } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export default function Auth() {
  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("REGISTER");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`relative h-screen w-full flex items-center justify-center p-4 overflow-hidden ${workSans.className} transition-colors duration-300 ${isDark ? "text-[#fcfaf8]" : "text-[#1b130d]"
        }`}
    >
      {/* Background */}
      <div className={`absolute inset-0 z-0 transition-colors ${isDark ? "bg-[#120d0a]" : "bg-[#f5f0eb]"
        }`}>
        <img
          src="/stacked-waves-haikei.svg"
          alt="Background Waves"
          className={`w-full h-full object-cover ${isDark ? "opacity-100" : "opacity-30"}`}
        />
      </div>

      {/* Auth Card */}
      <div className={`relative z-10 w-full max-w-[480px] max-h-full rounded-xl shadow-2xl flex flex-col border transition-colors ${isDark
        ? "bg-[#2c241b] border-[#3e342b]"
        : "bg-white border-[#e5ddd5]"
        }`}>
        <div className="overflow-y-auto overflow-x-hidden w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* Back Button */}
          <div className="px-8 pt-8 flex items-center justify-between">
            <Link href="/">
              <button className="flex items-center gap-2 text-sm font-medium text-[#ec6d13] hover:text-[#d65c0b] transition-colors">
                <ArrowLeft size={18} /> Kembali
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#ec6d13] rounded-md">
                <Coffee className="text-white" size={16} />
              </div>
              <span className={`text-sm font-bold ${isDark ? "text-white" : "text-[#1b130d]"}`}>Arunika</span>
            </div>
          </div>

          {/* Header Section */}
          <div className="px-8 pt-6 pb-6 text-center">
            <div className={`grid grid-cols-2 p-1.5 rounded-lg mb-6 border ${isDark
              ? "bg-[#1a140e] border-[#3e342b]"
              : "bg-[#f5f0eb] border-[#e5ddd5]"
              }`}>
              <button
                onClick={() => setVariant("LOGIN")}
                className={`font-medium py-2.5 rounded-md transition-all duration-200 focus:outline-none ${variant === "LOGIN"
                  ? "bg-[#ec6d13] text-white shadow-sm font-bold"
                  : isDark
                    ? "text-[#b49484] hover:text-[#ec6d13]"
                    : "text-[#8b7355] hover:text-[#ec6d13]"
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => setVariant("REGISTER")}
                className={`font-medium py-2.5 rounded-md transition-all duration-200 focus:outline-none ${variant === "REGISTER"
                  ? "bg-[#ec6d13] text-white shadow-sm font-bold"
                  : isDark
                    ? "text-[#b49484] hover:text-[#ec6d13]"
                    : "text-[#8b7355] hover:text-[#ec6d13]"
                  }`}
              >
                Register
              </button>
            </div>

            <h1 className={`text-3xl font-black tracking-tight ${isDark ? "text-[#fcfaf8]" : "text-[#1b130d]"
              }`}>
              {variant === "REGISTER" ? "Create Account" : "Welcome Back"}
            </h1>
            <p className={isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}>
              {variant === "REGISTER"
                ? "Enter your details to join the community."
                : "Please enter your details to sign in."}
            </p>
          </div>

          {/* Form Section */}
          <div className="px-8 pb-10">
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Full Name */}
              {variant === "REGISTER" && (
                <label className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <span className={`text-sm font-bold leading-normal ${isDark ? "text-white" : "text-[#1b130d]"
                    }`}>
                    Full Name
                  </span>
                  <div className={`relative flex w-full items-center rounded-lg border focus-within:ring-1 focus-within:ring-[#ec6d13] transition-all ${isDark
                    ? "border-[#55432f] bg-[#1a140e]"
                    : "border-[#e5ddd5] bg-[#f5f0eb]"
                    }`}>
                    <div className={`absolute left-4 pointer-events-none ${isDark ? "text-[#b49484]" : "text-[#8b7355]"
                      }`}>
                      <User size={20} />
                    </div>
                    <input
                      className={`flex w-full bg-transparent border-none h-12 pl-12 pr-4 placeholder:text-[#b49484] focus:ring-0 text-base font-normal leading-normal focus:outline-none ${isDark ? "text-white" : "text-[#1b130d]"
                        }`}
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                </label>
              )}

              {/* Email Address */}
              <label className="flex flex-col gap-2">
                <span className={`text-sm font-bold leading-normal ${isDark ? "text-white" : "text-[#1b130d]"
                  }`}>
                  Email Address
                </span>
                <div className={`relative flex w-full items-center rounded-lg border focus-within:ring-1 focus-within:ring-[#ec6d13] transition-all ${isDark
                  ? "border-[#55432f] bg-[#1a140e]"
                  : "border-[#e5ddd5] bg-[#f5f0eb]"
                  }`}>
                  <div className={`absolute left-4 pointer-events-none ${isDark ? "text-[#b49484]" : "text-[#8b7355]"
                    }`}>
                    <Mail size={20} />
                  </div>
                  <input
                    className={`flex w-full bg-transparent border-none h-12 pl-12 pr-4 placeholder:text-[#b49484] focus:ring-0 text-base font-normal leading-normal focus:outline-none ${isDark ? "text-white" : "text-[#1b130d]"
                      }`}
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>
              </label>

              {/* Password */}
              <label className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-bold leading-normal ${isDark ? "text-white" : "text-[#1b130d]"
                    }`}>
                    Password
                  </span>
                </div>
                <div className={`relative flex w-full items-center rounded-lg border focus-within:ring-1 focus-within:ring-[#ec6d13] transition-all ${isDark
                  ? "border-[#55432f] bg-[#1a140e]"
                  : "border-[#e5ddd5] bg-[#f5f0eb]"
                  }`}>
                  <div className={`absolute left-4 pointer-events-none ${isDark ? "text-[#b49484]" : "text-[#8b7355]"
                    }`}>
                    <Lock size={20} />
                  </div>
                  <input
                    className={`flex w-full bg-transparent border-none h-12 pl-12 pr-12 placeholder:text-[#b49484] focus:ring-0 text-base font-normal leading-normal focus:outline-none ${isDark ? "text-white" : "text-[#1b130d]"
                      }`}
                    placeholder={
                      variant === "REGISTER"
                        ? "Create a password"
                        : "Enter your password"
                    }
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 hover:text-[#ec6d13] transition-colors focus:outline-none cursor-pointer ${isDark ? "text-[#b49484]" : "text-[#8b7355]"
                      }`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>

              {/* Confirm Password - Only for Register */}
              {variant === "REGISTER" && (
                <label className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <span className={`text-sm font-bold leading-normal ${isDark ? "text-white" : "text-[#1b130d]"
                    }`}>
                    Confirm Password
                  </span>
                  <div className={`relative flex w-full items-center rounded-lg border focus-within:ring-1 focus-within:ring-[#ec6d13] transition-all ${isDark
                      ? "border-[#55432f] bg-[#1a140e]"
                      : "border-[#e5ddd5] bg-[#f5f0eb]"
                    }`}>
                    <div className={`absolute left-4 pointer-events-none ${isDark ? "text-[#b49484]" : "text-[#8b7355]"
                      }`}>
                      <Lock size={20} />
                    </div>
                    <input
                      className={`flex w-full bg-transparent border-none h-12 pl-12 pr-12 placeholder:text-[#b49484] focus:ring-0 text-base font-normal leading-normal focus:outline-none ${isDark ? "text-white" : "text-[#1b130d]"
                        }`}
                      placeholder="Confirm your password"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute right-4 hover:text-[#ec6d13] transition-colors focus:outline-none cursor-pointer ${isDark ? "text-[#b49484]" : "text-[#8b7355]"
                        }`}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </label>
              )}

              {/* Submit Button */}
              <Link href="/user/dashboard">
                <button className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-[#ec6d13] hover:bg-[#d65c0b] active:scale-95 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-md transition-all duration-200">
                  <span className="truncate">
                    {variant === "REGISTER" ? "Sign Up" : "Sign In"}
                  </span>
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}