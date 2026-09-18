"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

// Custom HTML-based Equalizer Icon
function EqualizerIcon({ isPlaying, isMuted }: { isPlaying: boolean; isMuted: boolean }) {
  if (isMuted) {
    return (
      <svg 
        className="w-5 h-5 text-brand-gold transition-all duration-300 flex-shrink-0" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      >
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <line x1="22" y1="9" x2="16" y2="15" />
        <line x1="16" y1="9" x2="22" y2="15" />
      </svg>
    );
  }

  return (
    <div className="w-5 h-5 flex items-end justify-between px-[2px] py-[3px] flex-shrink-0 select-none">
      <motion.div
        className="w-[3px] bg-brand-gold rounded-full"
        animate={isPlaying ? { height: ["20%", "80%", "20%"] } : { height: "20%" }}
        transition={isPlaying ? { repeat: Infinity, duration: 1.0, ease: "easeInOut" } : {}}
      />
      <motion.div
        className="w-[3px] bg-brand-gold rounded-full"
        animate={isPlaying ? { height: ["30%", "100%", "30%"] } : { height: "20%" }}
        transition={isPlaying ? { repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 } : {}}
      />
      <motion.div
        className="w-[3px] bg-brand-gold rounded-full"
        animate={isPlaying ? { height: ["15%", "90%", "15%"] } : { height: "20%" }}
        transition={isPlaying ? { repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.4 } : {}}
      />
      <motion.div
        className="w-[3px] bg-brand-gold rounded-full"
        animate={isPlaying ? { height: ["25%", "75%", "25%"] } : { height: "20%" }}
        transition={isPlaying ? { repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.1 } : {}}
      />
    </div>
  );
}

export function GlobalAudioPlayer() {
  const {
    isPlaying,
    isMuted,
    activeDestination,
    activeTrack,
    toggleMute,
  } = useAudio();

  if (!activeDestination || !activeTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-[20px] right-[20px] z-[99999] font-sans selection:bg-transparent">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDestination}
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          className="flex items-center gap-3.5 p-3 px-5 rounded-full bg-brand-green/95 backdrop-blur-2xl border border-brand-gold/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-brand-white flex-shrink-0"
        >
          {/* Animated Equalizer or Muted Indicator */}
          <EqualizerIcon isPlaying={isPlaying} isMuted={isMuted} />

          {/* Destination & Song Metadata */}
          <div className="flex flex-col text-left overflow-hidden min-w-[120px] max-w-[180px] select-none">
            <span className="text-[11px] font-bold text-brand-white tracking-wide truncate leading-tight">
              {activeTrack.title}
            </span>
            <span className="text-[9px] text-brand-gold/90 font-semibold tracking-wider truncate uppercase leading-none mt-0.5">
              {activeTrack.artist}
            </span>
          </div>

          {/* Separator */}
          <div className="w-[1px] h-6 bg-brand-white/20 flex-shrink-0" />

          {/* Clear UNMUTE / MUTE Toggle Button */}
          <button
            onClick={toggleMute}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0 font-sans text-xs font-semibold tracking-wider uppercase border shadow-md ${
              isMuted
                ? "bg-brand-gold text-brand-green border-brand-gold hover:bg-brand-white hover:border-brand-white"
                : "bg-black/40 text-brand-gold border-brand-gold/40 hover:bg-black/60 hover:border-brand-gold"
            }`}
            aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isMuted ? "UNMUTE" : "MUTE"}</span>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
