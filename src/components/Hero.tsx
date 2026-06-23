"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src="/assets/getting_funky_loop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Readability and Contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-green/70 via-brand-green/50 to-brand-green/85"></div>

      {/* Foreground Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        {/* Logo Container with Framer Motion hover and entrance animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 md:mb-8 mt-4 md:mt-12"
        >
          <div className="relative w-48 h-48 md:w-72 md:h-72 rounded-full border border-brand-gold/30 bg-brand-green/10 backdrop-blur-md p-2 flex items-center justify-center shadow-2xl overflow-hidden">
            <Image
              src="/assets/getting_funky_logo_yellow_2027.png"
              alt="Getting Funky Logo"
              width={288}
              height={288}
              className="w-[95%] h-[95%] object-contain opacity-90"
              priority
            />
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-white font-extrabold tracking-tight leading-tight mb-4 md:mb-6"
        >
          Getting Funky <br className="hidden sm:block" />
          <span className="text-tropical-gradient">in Jamaica</span>
        </motion.h1>

        {/* Event Specs (Dates & Location) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-brand-white/90 text-sm sm:text-base md:text-lg font-sans tracking-[0.25em] uppercase font-bold mb-8 md:mb-12"
        >
          <span className="text-brand-gold">January 14-18, 2027</span>
          <span className="hidden sm:inline text-brand-white/40">|</span>
          <span>Kingston, Jamaica</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#story-impact"
            className="px-8 py-4 rounded-full bg-brand-green/60 text-brand-white border border-brand-white/20 backdrop-blur-sm text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-brand-white hover:text-brand-green hover:border-transparent text-center"
          >
            Explore Experience
          </a>
          <a
            href="#register"
            className="px-8 py-4 rounded-full bg-accent-gradient text-brand-green text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,156,130,0.5)] hover:scale-105 text-center shadow-lg"
          >
            Register Now
          </a>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-brand-white/40 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full bg-brand-gold"
        ></motion.div>
      </motion.div>
    </section>
  );
}
