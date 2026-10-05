"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export interface TrackInfo {
  id: string;
  src: string;
  title: string;
  artist: string;
}

export const DESTINATION_TRACKS: Record<string, TrackInfo> = {
  colombia: { id: "colombia", src: "/colombia-rhythm.mp3?v=2", title: "Colombia Rhythm", artist: "Curated Soundscape" },
  neworleans: { id: "neworleans", src: "/new-orleans-rhythm.mp3?v=2", title: "New Orleans Rhythm", artist: "Vintage NOLA Brass" },
  mexicocity: { id: "mexicocity", src: "/mexico-city-rhythm.mp3?v=2", title: "Mexico City Rhythm", artist: "Curated Soundscape" },
  jamaica: { id: "jamaica", src: "/jamaica-rhythm.mp3?v=2", title: "Jamaica Rhythm", artist: "Reggae Lovers Rock Mix" },
  bespoke: { id: "bespoke", src: "/jamaica-meets-kingston.mp3?v=2", title: "Chan Chan", artist: "Havana Meets Kingston" },
};

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  isUnlocked: boolean;
  pause: () => void;
  resume: () => void;
  activeDestination: string | null;
  activeTrack: TrackInfo | null;
  toggleMute: () => void;
  setModalDestinationId: (id: string | null) => void;
  tracks: TrackInfo[];
  currentTrackIndex: number;
  isPlayerMinimized: boolean;
  setIsPlayerMinimized: (minimized: boolean) => void;
  unlockAndPlay: (targetIndex?: number) => void;
  playTrackById: (id: string, resetTime?: boolean) => void;
  playNextTrack: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default: muted on load (no autoplay)
  const [activeDestination, setActiveDestination] = useState<string | null>(null);
  const [modalDestinationId, setModalDestinationId] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Helper to clear any active fade-in interval
  const clearFadeInterval = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  // Smooth volume fade-in from 0.0 to target (0.25) over duration (2.5s)
  const startFadeIn = (targetVolume = 0.25, duration = 2500) => {
    clearFadeInterval();
    if (!audioRef.current) return;
    
    audioRef.current.volume = 0.0;
    const steps = 25;
    const stepDuration = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      if (audioRef.current) {
        const nextVol = Math.min(targetVolume, currentStep * volumeStep);
        audioRef.current.volume = nextVol;
        if (currentStep >= steps || nextVol >= targetVolume) {
          audioRef.current.volume = targetVolume;
          clearFadeInterval();
        }
      } else {
        clearFadeInterval();
      }
    }, stepDuration);
  };

  // Initialize single HTML5 Audio instance
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.0;
    audio.muted = true;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      clearFadeInterval();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, []);

  // Sync muted state & trigger click-to-play with smooth fade-in
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (isMuted) {
      clearFadeInterval();
      audio.volume = 0.0;
      audio.muted = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio.play().then(() => {
        setIsPlaying(true);
        startFadeIn(0.25, 2500);
      }).catch((err) => {
        console.log("Audio playback failed or blocked:", err);
      });
    }
  }, [isMuted]);

  // Destination tracking & audio URL sync (strictly silent on load)
  useEffect(() => {
    let currentDest: string | null = null;

    if (modalDestinationId) {
      currentDest = modalDestinationId;
    } else if (pathname.includes("colombia-experience")) {
      currentDest = "colombia";
    } else if (pathname.includes("new-orleans-experience")) {
      currentDest = "neworleans";
    } else if (pathname.includes("mexico-city-experience") || pathname.includes("mexican-music-experience")) {
      currentDest = "mexicocity";
    } else if (pathname.includes("jamaica-experience")) {
      currentDest = "jamaica";
    } else if (pathname.includes("bespoke-experience")) {
      currentDest = "bespoke";
    }

    setActiveDestination(currentDest);

    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (currentDest && DESTINATION_TRACKS[currentDest]) {
      const targetTrack = DESTINATION_TRACKS[currentDest];
      const targetUrl = new URL(targetTrack.src, window.location.href).href;
      
      if (audio.src !== targetUrl) {
        clearFadeInterval();
        audio.src = targetTrack.src;
        audio.currentTime = 0;
        audio.volume = 0.0;
        audio.muted = true;
        audio.pause();
        setIsPlaying(false);
        setIsMuted(true);
      }
    } else {
      clearFadeInterval();
      audio.volume = 0.0;
      audio.muted = true;
      audio.pause();
      setIsPlaying(false);
      setIsMuted(true);
    }
  }, [pathname, modalDestinationId]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const pause = () => {
    setIsMuted(true);
  };

  const resume = () => {
    setIsMuted(false);
  };

  const isUnlocked = !isMuted;

  const activeTrack = activeDestination ? DESTINATION_TRACKS[activeDestination] || null : null;

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        isUnlocked,
        pause,
        resume,
        activeDestination,
        activeTrack,
        toggleMute,
        setModalDestinationId,
        tracks: Object.values(DESTINATION_TRACKS),
        currentTrackIndex: 0,
        isPlayerMinimized: false,
        setIsPlayerMinimized: () => {},
        unlockAndPlay: () => {},
        playTrackById: () => {},
        playNextTrack: () => {},
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
