"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Work_Sans } from "next/font/google";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Coffee } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import { useTheme } from "@/context/ThemeContext";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export default function Auth() {
  const router = useRouter();
  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("REGISTER");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setIsSubmitting(false);
  };

  const handleLogin = async (loginEmail: string, loginPassword: string) => {
    const result = await signIn("credentials", {
      email: loginEmail,
      password: loginPassword,
      redirect: false,
    });

    if (result?.error) {
      if (
        result.error.includes("Terlalu banyak percobaan login") ||
        result.error === "Configuration"
      ) {
        setError("Terlalu banyak percobaan login. Coba lagi dalam 15 menit.");
        return;
      }

      setError("Email atau password yang kamu masukkan salah.");
      return;
    }

    const session = await getSession();
    const role = session?.user?.role;
    router.push(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
  };

  const handleRegister = async (
    registerName: string,
    registerEmail: string,
    registerPassword: string
  ) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      }),
    });

    const data = (await response.json()) as { success: boolean; message?: string };

    if (!response.ok || !data.success) {
      setError(data.message ?? "Registrasi gagal");
      return;
    }

    const loginResult = await signIn("credentials", {
      email: registerEmail,
      password: registerPassword,
      redirect: false,
    });

    if (loginResult?.error) {
      setError("Registrasi berhasil, tetapi auto-login gagal. Silakan login manual.");
      setVariant("LOGIN");
      return;
    }

    router.push("/user/dashboard");
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    setError("");

    if (!email.trim() || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    if (variant === "REGISTER") {
      if (!name.trim()) {
        setError("Nama lengkap wajib diisi");
        return;
      }

      if (password.length < 8) {
        setError("Password minimal 8 karakter");
        return;
      }

      if (password !== confirmPassword) {
        setError("Konfirmasi password tidak sama");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (variant === "LOGIN") {
        await handleLogin(email.trim(), password);
      } else {
        await handleRegister(name.trim(), email.trim(), password);
      }
    } catch {
      if (variant === "LOGIN") {
        setError("Email atau password yang kamu masukkan salah.");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
                onClick={() => {
                  setVariant("LOGIN");
                  resetForm();
                }}
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
                onClick={() => {
                  setVariant("REGISTER");
                  resetForm();
                }}
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
              onSubmit={onSubmit}
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
                      value={name}
                      onChange={(event) => setName(event.target.value)}
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
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
                {variant === "REGISTER" && (
                  <p className={`text-xs ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                    Min. 8 karakter, mengandung huruf kapital dan angka
                  </p>
                )}
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
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
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

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-[#ec6d13] hover:bg-[#d65c0b] active:scale-95 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-md transition-all duration-200 disabled:opacity-60"
              >
                <span className="truncate">
                  {isSubmitting
                    ? "Memproses..."
                    : variant === "REGISTER"
                    ? "Sign Up"
                    : "Sign In"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}