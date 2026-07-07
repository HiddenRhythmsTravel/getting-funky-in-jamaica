"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    if (password === "Kingston2027") {
      document.cookie = `site_access=Kingston2027; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Strict`;
      
      setTimeout(() => {
        router.push(from);
        router.refresh();
      }, 800);
    } else {
      setTimeout(() => {
        setError(true);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Access Code"
          className={`w-full bg-[#FFFDF9]/5 border ${
            error ? "border-red-500/50" : "border-[#FFFDF9]/10 group-hover:border-[#D4AF37]/30"
          } rounded-2xl px-6 py-4 text-[#FFFDF9] placeholder:text-[#FFFDF9]/30 outline-none transition-all duration-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50`}
          required
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-red-500/80 text-xs text-center font-medium"
        >
          Invalid access code. Please try again.
        </motion.p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-[#D4AF37] text-[#0A322C] font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#FFFDF9] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center gap-2">
          Unlock Site <ArrowRight size={16} />
        </span>
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0A322C] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/gallery/2026/MCW_8057.webp"
          alt="Background"
          fill
          className="object-cover opacity-30 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A322C]/80 via-[#0A322C]/90 to-[#0A322C]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
          >
            <Lock className="text-[#D4AF37]" size={32} />
          </motion.div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#FFFDF9] mb-3">
            Guest Access
          </h1>
          <p className="text-[#FFFDF9]/60 text-sm md:text-base font-medium tracking-wide">
            Please enter your access code to preview the rhythm.
          </p>
        </div>

        <Suspense fallback={<div className="text-[#FFFDF9]/50 text-center uppercase tracking-widest text-xs">Loading Security...</div>}>
          <LoginForm />
        </Suspense>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFDF9]/5 border border-[#FFFDF9]/10">
            <ShieldCheck size={14} className="text-[#D4AF37]" />
            <span className="text-[10px] text-[#FFFDF9]/40 font-bold uppercase tracking-[0.2em]">
              Secured Preview Environment
            </span>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px]" />
    </main>
  );
}
