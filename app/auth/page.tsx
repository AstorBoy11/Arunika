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
      className={`relative h-screen w-full flex items-center justify-center p-4 overflow-hidden ${workSans.className} bg-background-light dark:bg-background-dark text-[#1b130d] dark:text-[#fcfaf8]`}
    >
      {/* Auth Card */}
      <div className="relative z-20 w-full max-w-[480px] max-h-full bg-white dark:bg-[#2c241b] rounded-xl shadow-2xl flex flex-col border border-[#f3ece7] dark:border-[#3e342b]">
        <div className="overflow-y-auto overflow-x-hidden w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="pt-5 pl-5 mt-10 text-[#9a6c4c]">
            <Link href="/">
              <button className="className= flex items-center text-l font-medium hover:underline mb-4">
                <StepBack /> back
              </button>
            </Link>
          </div>

          {/* Header Section */}
          <div className="px-8 pt-5 pb-6 text-center">
            <div className="flex justify-center mb-6 text-[#ec6d13]">
              <Coffee size={48} strokeWidth={1.5} />
            </div>

            <div className="grid grid-cols-2 bg-[#221810]/10 dark:bg-[#1a140e] p-1.5 rounded-lg mb-6 border border-[#3e342b]/50">
              <button
                onClick={() => setVariant("LOGIN")}
                className={`font-medium py-2.5 rounded-md transition-all duration-200 focus:outline-none ${
                  variant === "LOGIN"
                    ? "bg-white dark:bg-[#3e342b] text-[#ec6d13] shadow-sm font-bold scale-[1.02]"
                    : "text-[#9a6c4c] hover:text-[#ec6d13]"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setVariant("REGISTER")}
                className={`font-medium py-2.5 rounded-md transition-all duration-200 focus:outline-none ${
                  variant === "REGISTER"
                    ? "bg-white dark:bg-[#3e342b] text-[#ec6d13] shadow-sm font-bold scale-[1.02]"
                    : "text-[#9a6c4c] hover:text-[#ec6d13]"
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
                  <div className="relative flex w-full items-stretch rounded-lg group">
                    <div className="text-[#9a6c4c] flex border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] items-center justify-center pl-[15px] rounded-l-lg border-r-0 z-10">
                      <User size={20} />
                    </div>
                    <input
                      className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-l-none border-l-0 text-[#1b130d] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] h-12 placeholder:text-[#9a6c4c]/50 px-[15px] text-base font-normal leading-normal transition-colors"
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
                <div className="relative flex w-full items-stretch rounded-lg">
                  <div className="text-[#9a6c4c] flex border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] items-center justify-center pl-[15px] rounded-l-lg border-r-0 z-10">
                    <Mail size={20} />
                  </div>
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-l-none border-l-0 text-[#1b130d] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] h-12 placeholder:text-[#9a6c4c]/50 px-[15px] text-base font-normal leading-normal transition-colors"
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
                <div className="relative flex w-full items-stretch rounded-lg">
                  <div className="text-[#9a6c4c] flex border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] items-center justify-center pl-[15px] rounded-l-lg border-r-0 z-10">
                    <Lock size={20} />
                  </div>
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-x-none border-x-0 text-[#1b130d] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] h-12 placeholder:text-[#9a6c4c]/50 px-[15px] text-base font-normal leading-normal transition-colors"
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
                    className="text-[#9a6c4c] flex border border-[#e7d9cf] dark:border-gray-600 bg-[#fcfaf8] dark:bg-[#221810] items-center justify-center pr-[15px] rounded-r-lg border-l-0 z-10 cursor-pointer hover:text-[#ec6d13] transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>

              {/* Submit Button */}
              <button className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-[#ec6d13] hover:bg-[#d65c0b] active:scale-95 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-md transition-all duration-200">
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

              {/* Footer Text */}
              <div className="text-center mt-2">
                <p className="text-sm text-[#1b130d] dark:text-gray-300">
                  {variant === "REGISTER"
                    ? "Already have an account? "
                    : "New to Coffee Connect? "}
                  <button
                    type="button"
                    onClick={toggleVariant}
                    className="font-bold text-[#ec6d13] hover:text-[#d65c0b] hover:underline focus:outline-none"
                  >
                    {variant === "REGISTER" ? "Sign In" : "Register"}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
