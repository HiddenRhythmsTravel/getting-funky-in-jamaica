"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Instagram } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleMute, playRegistrationOverride } = useAudio();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Story & Impact", href: "/#story-impact" },
    { name: "Artist Line Up", href: "/#artists" },
    { name: "VIP Program", href: "/#vip" },
    { name: "History", href: "/#gallery" },
    { name: "Gallery", href: "/gallery" },
    { name: "Register Now", href: "/#register" },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? "bg-brand-green/80 backdrop-blur-xl border-brand-white/10 shadow-lg" : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Stylized Hidden Rhythms Logo */}
          <a 
            href="https://hiddenrhythmstravel.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block relative w-10 h-10 md:w-11 md:h-11 transition-transform hover:scale-105"
          >
            <Image
              src="/assets/humingbird-logo.jpg"
              alt="Hidden Rhythms Website"
              fill
              className="object-contain rounded-sm mix-blend-lighten"
              priority
            />
          </a>

          {/* Standardized Instagram Glyph */}
          <a 
            href="https://www.instagram.com/hiddenrhythmstravel/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brand-white/80 hover:text-brand-gold transition-colors p-1.5 rounded-full hover:bg-brand-white/5" 
            aria-label="Hidden Rhythms Instagram"
          >
            <Instagram size={18} />
          </a>

          {/* Hosted by Hidden Rhythms Text Header */}
          <a 
            href="https://hiddenrhythmstravel.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col leading-[1.1] pt-0.5 group pl-1"
          >
            <span className="font-serif text-sm md:text-base text-brand-white font-semibold tracking-wide flex-shrink-0 group-hover:text-brand-gold transition-colors">
              hosted by
            </span>
            <span className="font-sans text-[9px] md:text-[10px] text-brand-gold font-bold tracking-[0.2em] uppercase flex-shrink-0 group-hover:text-brand-white transition-colors">
              Hidden Rhythms
            </span>
          </a>
        </div>

        {/* Desktop Links & Controls */}
        <div className="hidden md:flex items-center justify-end gap-6 lg:gap-8 text-brand-white/95 font-sans text-xs tracking-[0.15em] uppercase font-semibold">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => {
                if (link.name === "VIP Program" || link.name === "Register Now") {
                  playRegistrationOverride();
                }
              }}
              className={`relative group py-2 ${
                link.name === "Register Now" ? "text-brand-gold hover:text-brand-white" : "hover:text-brand-gold"
              }`}
            >
              <span className="transition-colors duration-300">
                {link.name}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 ease-out group-hover:w-full"></span>
            </Link>
          ))}

          {/* Global Mute Toggle Button */}
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full border border-brand-white/10 hover:border-brand-gold text-brand-white hover:text-brand-gold bg-brand-white/5 transition-all duration-300 flex items-center justify-center cursor-pointer ml-2"
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <Link
            href="/#register"
            onClick={() => {
              playRegistrationOverride();
            }}
            className="px-5 py-2.5 rounded-full border border-brand-gold text-brand-green bg-brand-gold font-bold tracking-widest text-[10px] hover:bg-brand-green hover:text-brand-gold hover:border-brand-gold transition-all duration-300 shadow-md"
          >
            REGISTER NOW
          </Link>
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Mute Toggle Button */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full border border-brand-white/10 text-brand-white bg-brand-white/5 flex items-center justify-center cursor-pointer"
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-brand-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-20 left-0 right-0 bottom-0 bg-brand-green/95 backdrop-blur-2xl overflow-y-auto border-t border-brand-white/10"
          >
            <div className="flex flex-col gap-8 p-8 text-brand-white font-sans text-sm tracking-[0.2em] uppercase font-semibold">
              {navLinks.filter(l => l.name !== "Register Now").map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.name === "VIP Program") {
                      playRegistrationOverride();
                    }
                  }}
                  className="hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#register"
                onClick={() => {
                  setMobileMenuOpen(false);
                  playRegistrationOverride();
                }}
                className="w-full text-center py-3.5 rounded-full border border-brand-gold text-brand-gold font-bold tracking-widest bg-brand-gold/5 hover:bg-brand-gold hover:text-brand-green transition-all"
              >
                REGISTER NOW
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
