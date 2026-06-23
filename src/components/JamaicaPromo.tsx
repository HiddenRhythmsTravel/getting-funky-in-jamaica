"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Sparkles, MapPin } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

export function JamaicaPromo() {
  const { isMuted, isPlaying, toggleMute } = useAudio();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay the video visually on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-brand-green border-t border-brand-white/5">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Blurb Text */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-brand-gold" />
              <span className="font-sans text-[10px] md:text-xs text-brand-gold font-bold tracking-[0.25em] uppercase">
                Kingston, Jamaica 2027
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-heading font-bold mb-6 leading-tight">
              An Unprecedented <br />
              Cultural Explosion
            </h2>
            <div className="font-sans text-brand-white/80 text-sm sm:text-base leading-relaxed space-y-6 mb-8">
              <p>
                <strong>Getting Funky in Jamaica 2027</strong> is a premium, high-impact cultural expedition that brings the legendary second-line brass of New Orleans and the rich syncopated rhythms of Havana to the historic streets of Kingston. 
              </p>
              <p>
                This exclusive event connects youth musicians with international mentors, funds schools with instruments, and explores the historic birthplaces of modern reggae. From tours of Trench Town to masterclasses at Tuff Gong Studios, every moment is curated for deep cultural connection.
              </p>
              <p className="border-l-2 border-brand-gold/50 pl-4 font-serif italic text-brand-heading/90">
                Experience the shared roots of Caribbean rhythms. Witness local jam sessions and celebrate under the stars with our custom promo video loop.
              </p>
            </div>

            {/* Quick Status indicators */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-brand-white/50">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                <span>Jan 14-18, 2027</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                <span>Tuff Gong Sessions</span>
              </div>
            </div>
          </div>

          {/* Right Column: Video Loop Player */}
          <div className="w-full lg:col-span-6 relative order-1 lg:order-2 flex flex-col items-center justify-center mx-auto">
            
            {/* Outer phone frame mockup */}
            <div className="relative w-full max-w-[220px] xs:max-w-[250px] sm:max-w-[280px] lg:max-w-[300px] xl:max-w-[320px] aspect-[9/16] rounded-[28px] sm:rounded-[36px] border-[8px] sm:border-[10px] border-brand-dark-accent bg-black shadow-2xl overflow-hidden group mx-auto">
              <video
                ref={videoRef}
                src="/assets/getting_funky_promo.mp4"
                autoPlay
                loop
                playsInline
                muted={true}
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none z-10"></div>

              {/* Promo Banner Stamp */}
              <div className="absolute top-4 left-4 bg-brand-gold text-brand-green border border-brand-gold/20 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase z-20">
                Promo Loop
              </div>

              {/* Floating Mute/Sound overlay on hover */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer"
              >
                <div className="p-3.5 rounded-full bg-brand-green/90 border border-brand-white/10 text-brand-gold shadow-lg">
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </div>
              </div>

              {/* Locked Backdrop Audio Notification */}
              {isPlaying && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md border border-brand-white/10 p-2.5 rounded-xl text-[9px] font-bold text-brand-white/95 z-20 flex items-center justify-between">
                  <span className="truncate">Theme: Carnival Horns</span>
                  <span className="text-brand-gold">Mista Savona</span>
                </div>
              )}
            </div>

            {/* Sub-label under player */}
            <span className="text-[10px] text-brand-white/40 mt-4 tracking-wider uppercase font-sans font-bold flex items-center gap-1.5">
              <Sparkles size={11} className="text-brand-gold" />
              Spliced from 2023 & 2025 history reels
            </span>

          </div>

        </div>
      </div>
    </section>
  );
}
