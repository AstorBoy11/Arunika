"use client";

import { useState } from "react";
import { Work_Sans } from "next/font/google";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, Coffee, StepBack } from "lucide-react";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export default function Auth() {
  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("REGISTER");
  const [showPassword, setShowPassword] = useState(false);

  const toggleVariant = () => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  };

  return (
    <div
      className={`relative h-screen w-full flex items-center justify-center p-4 overflow-hidden ${workSans.className} text-[#1b130d] dark:text-[#fcfaf8]`}
    >
      {/* 🖼️ BACKGROUND IMAGE SECTION */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/stacked-waves-haikei.svg" 
          alt="Background Waves" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-[480px] max-h-full bg-white dark:bg-blue-950 rounded-xl shadow-2xl flex flex-col border border-[#f3ece7] dark:border-[#3e342b]">
        <div className="overflow-y-auto overflow-x-hidden w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* Back Button */}
          <div className="pl-10 mt-10 text-blue-400">
            <Link href="/">
              <button className="flex items-center text-l font-medium hover:underline mb-4">
                <StepBack className="mr-2" size={20} /> back
              </button>
            </Link>
          </div>

          {/* Header Section */}
          <div className="px-8 pt-3 pb-6 text-center">
            <div className="grid grid-cols-2 bg-[#221810]/10 dark:bg-[#365979] p-1.5 rounded-lg mb-6 border border-[#3e342b]/50">
              <button
                onClick={() => setVariant("LOGIN")}
                className={`font-medium py-2.5 rounded-md transition-all duration-200 focus:outline-none ${
                  variant === "LOGIN"
                    ? "bg-white dark:bg-[#092c47] text-blue-300 shadow-sm font-bold scale-[1.02]"
                    : "text-blue-300 hover:text-blue-600"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setVariant("REGISTER")}
                className={`font-medium py-2.5 rounded-md transition-all duration-200 focus:outline-none ${
                  variant === "REGISTER"
                    ? "bg-white dark:bg-[#092c47] text-blue-300 shadow-sm font-bold scale-[1.02]"
                    : "text-blue-300 hover:text-blue-600"
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
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Full Name */}
              {variant === "REGISTER" && (
                <label className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <span className="text-sm font-bold text-[#1b130d] dark:text-white leading-normal">
                    Full Name
                  </span>
                  {/* 🛠️ PERBAIKAN: Parent div menangani border & background */}
                  <div className="relative flex w-full items-center rounded-lg border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#092c47] focus-within:ring-1 focus-within:ring-blue-300 focus-within:border-blue-300 transition-all">
                    <div className="absolute left-4 text-blue-300 pointer-events-none">
                      <User size={20} />
                    </div>
                    {/* Input dibuat transparan & border-none */}
                    <input
                      className="flex w-full bg-transparent border-none h-12 pl-12 pr-4 text-blue-300 dark:text-white placeholder:text-blue-300 focus:ring-0 text-base font-normal leading-normal"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                </label>
              )}

              {/* Email Address */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1b130d] dark:text-white leading-normal">
                  Email Address
                </span>
                <div className="relative flex w-full items-center rounded-lg border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#092c47] focus-within:ring-1 focus-within:ring-blue-300 focus-within:border-blue-300 transition-all">
                  <div className="absolute left-4 text-blue-300 pointer-events-none">
                    <Mail size={20} />
                  </div>
                  <input
                    className="flex w-full bg-transparent border-none h-12 pl-12 pr-4 text-[#1b130d] dark:text-white placeholder:text-blue-300 focus:ring-0 text-base font-normal leading-normal"
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>
              </label>

              {/* Password */}
              <label className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[#1b130d] dark:text-white leading-normal">
                    Password
                  </span>
                </div>
                {/* 🛠️ PERBAIKAN */}
                <div className="relative flex w-full items-center rounded-lg border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#092c47] focus-within:ring-1 focus-within:ring-blue-300 focus-within:border-blue-300 transition-all">
                  <div className="absolute left-4 text-blue-300 pointer-events-none">
                    <Lock size={20} />
                  </div>
                  <input
                    className="flex w-full bg-transparent border-none h-12 pl-12 pr-12 text-[#1b130d] dark:text-white placeholder:text-blue-300 focus:ring-0 text-base font-normal leading-normal"
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
                    className="absolute right-4 text-blue-300 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>

              {/* Submit Button */}
              <button className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-blue-600 hover:bg-blue-900 active:scale-95 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-md transition-all duration-200">
                <span className="truncate">
                  {variant === "REGISTER" ? "Sign Up" : "Sign In"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}