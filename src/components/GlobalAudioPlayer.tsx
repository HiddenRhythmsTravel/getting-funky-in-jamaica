"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, SkipForward, Minimize2, Maximize2, Music } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

export function GlobalAudioPlayer() {
  const {
    isPlaying,
    isMuted,
    isUnlocked,
    currentTrackIndex,
    toggleMute,
    playNextTrack,
    trackMetadata,
  } = useAudio();

  const [isMinimized, setIsMinimized] = useState(false);

  // If the audio hasn't been unlocked or no track is loaded, show a prompt or fallback
  const currentTrack = currentTrackIndex !== null ? trackMetadata[currentTrackIndex] : trackMetadata[0];

  return (
    <div className="fixed bottom-6 left-6 z-[99999] font-sans">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          // MINIMIZED STATE: Tiny glowing music pill/badge with direct mute toggle
          <motion.div
            key="minimized"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-brand-green/95 backdrop-blur-xl border border-brand-gold/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-brand-white"
          >
            {/* Direct Mute Toggle Button (1-Click Mute) */}
            <button
              onClick={toggleMute}
              className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 cursor-pointer ${
                isMuted
                  ? "bg-brand-gold/10 border-brand-gold/40 text-brand-gold hover:bg-brand-gold/25"
                  : "bg-brand-white/5 border-brand-white/10 text-brand-white hover:bg-brand-white/15"
              }`}
              aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>

            {/* Track Info & Equalizer */}
            <div className="flex items-center gap-2 max-w-[120px] sm:max-w-[160px] overflow-hidden">
              {isPlaying && !isMuted ? (
                // Tiny playing equalizer
                <div className="flex items-end gap-0.5 h-3 flex-shrink-0">
                  <span className="w-0.5 bg-brand-gold rounded-full animate-[equalizer_0.8s_ease-in-out_infinite_alternate] h-2"></span>
                  <span className="w-0.5 bg-brand-gold rounded-full animate-[equalizer_1.2s_ease-in-out_infinite_alternate_0.2s] h-3"></span>
                  <span className="w-0.5 bg-brand-gold rounded-full animate-[equalizer_0.9s_ease-in-out_infinite_alternate_0.4s] h-1.5"></span>
                </div>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-brand-white/30 flex-shrink-0" />
              )}

              <div className="flex flex-col text-left overflow-hidden select-none">
                <span className="text-[10px] text-brand-white font-bold truncate leading-tight">
                  {isMuted ? "Muted" : currentTrack.title}
                </span>
                <span className="text-[8px] text-brand-white/50 truncate leading-none mt-0.5">
                  {isMuted ? "Ambient Audio" : currentTrack.artist}
                </span>
              </div>
            </div>

            {/* Separator */}
            <div className="w-[1px] h-5 bg-brand-white/10" />

            {/* Maximize Button */}
            <button
              onClick={() => setIsMinimized(false)}
              className="flex items-center justify-center w-5 h-5 rounded-md text-brand-white/40 hover:text-brand-gold transition-colors cursor-pointer"
              aria-label="Maximize player"
              title="Expand Details"
            >
              <Maximize2 size={11} />
            </button>
          </motion.div>
        ) : (
          // MAXIMIZED STATE: Sleek glassmorphic card
          <motion.div
            key="maximized"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="w-72 rounded-2xl bg-brand-green/90 backdrop-blur-xl border border-brand-gold/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-4 flex flex-col gap-3"
          >
            {/* Header / Minimize control */}
            <div className="flex items-center justify-between border-b border-brand-white/10 pb-2">
              <span className="text-[9px] text-brand-gold font-bold tracking-[0.2em] uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping"></span>
                <span>Ambient Audio</span>
              </span>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-brand-white/50 hover:text-brand-gold p-1 rounded transition-colors cursor-pointer"
                title="Minimize Player"
              >
                <Minimize2 size={13} />
              </button>
            </div>

            {/* Song details */}
            <div className="flex gap-3 items-center">
              {/* Disc animation */}
              <div className={`w-10 h-10 rounded-full bg-brand-dark-accent border border-brand-gold/20 flex items-center justify-center flex-shrink-0 text-brand-gold ${
                isPlaying && !isMuted ? "animate-[spin_4s_linear_infinite]" : ""
              }`}>
                <Music size={14} />
              </div>
              
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs text-brand-white font-bold truncate">
                  {currentTrack.title}
                </span>
                <span className="text-[10px] text-brand-white/60 truncate">
                  {currentTrack.artist}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-1 pt-2 border-t border-brand-white/10">
              <button
                onClick={toggleMute}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] tracking-wider uppercase font-bold transition-all duration-300 border cursor-pointer ${
                  isMuted
                    ? "border-brand-gold/40 text-brand-gold bg-brand-gold/5 hover:bg-brand-gold/15"
                    : "border-brand-white/20 text-brand-white hover:bg-brand-white/10"
                }`}
              >
                {isMuted ? (
                  <>
                    <VolumeX size={12} />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={12} />
                    <span>Mute</span>
                  </>
                )}
              </button>

              <button
                onClick={playNextTrack}
                className="flex items-center gap-1.5 text-[10px] text-brand-white/70 hover:text-brand-gold font-bold uppercase tracking-wider transition-colors cursor-pointer"
                title="Next Track"
              >
                <span>Next</span>
                <SkipForward size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
