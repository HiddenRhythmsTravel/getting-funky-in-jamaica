"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  isUnlocked: boolean;
  currentTrackIndex: number | null;
  toggleMute: () => void;
  unlockAndPlay: () => void;
  playReelOverride: () => void;
  playRegistrationOverride: () => void;
  pause: () => void;
  resume: () => void;
  playNextTrack: () => void;
  trackMetadata: { title: string; artist: string }[];
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const TRACK_LIST = [
  "/assets/audio/track2.mp3", // Track 1: Juicy Fruit
  "/assets/audio/track1.mp3", // Track 2: I Don't Care
  "/assets/audio/track3.mp3", // Track 3: Carnival Horns
];

export const TRACK_METADATA = [
  { title: "Juicy Fruit", artist: "Bacao Rhythm & Steel Band" },
  { title: "I Don't Care", artist: "Cimafunk, George Clinton, Nik West, Trombone Shorty" },
  { title: "Carnival Horns", artist: "Mista Savona Session" },
];

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Loads muted by default
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isTransitioningRef = useRef(false);
  const isReelOverrideRef = useRef(false);

  // Initialize audio element on client mount
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.volume = 0.0;
    audioRef.current = audio;

    // Handle track completion (Playlist chaining)
    const handleEnded = () => {
      if (currentTrackIndex === null) return;
      
      if (currentTrackIndex === 0) {
        if (isReelOverrideRef.current) {
          isReelOverrideRef.current = false;
          crossfadeToTrack(2, 0, false); // Post-reel-track: queue Carnival Horns
        } else {
          crossfadeToTrack(1, 0, false); // Sequential track: play I Don't Care
        }
      } else if (currentTrackIndex === 1) {
        crossfadeToTrack(2, 0, false); // Sequential track: play Carnival Horns
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, [currentTrackIndex]);

  // Sync mute state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  // Smooth crossfade function
  const crossfadeToTrack = (trackIndex: number, startTime: number = 0, loop: boolean = false) => {
    if (!audioRef.current || isTransitioningRef.current) return;
    
    isTransitioningRef.current = true;
    const audio = audioRef.current;
    
    const steps = 10;
    const fadeDuration = 400; // ms
    const stepTime = fadeDuration / steps;
    const initialVol = audio.volume;
    const maxVolume = 0.50; // pleasant ambient volume
    
    // 1. Fade out current track
    let step = 0;
    const fadeOutInterval = setInterval(() => {
      step++;
      audio.volume = Math.max(0, initialVol * (1 - step / steps));
      
      if (step >= steps) {
        clearInterval(fadeOutInterval);
        
        // 2. Change track source & parameters
        audio.src = TRACK_LIST[trackIndex];
        audio.currentTime = startTime;
        audio.loop = loop;
        setCurrentTrackIndex(trackIndex);
        
        // 3. Play and Fade in new track (if unmuted)
        if (!isMuted) {
          audio.play()
            .then(() => {
              setIsPlaying(true);
              let fadeInStep = 0;
              const fadeInInterval = setInterval(() => {
                fadeInStep++;
                audio.volume = maxVolume * (fadeInStep / steps);
                if (fadeInStep >= steps) {
                  clearInterval(fadeInInterval);
                  isTransitioningRef.current = false;
                }
              }, stepTime);
            })
            .catch((err) => {
              console.log("Audio play override failed:", err);
              isTransitioningRef.current = false;
            });
        } else {
          audio.volume = maxVolume;
          isTransitioningRef.current = false;
        }
      }
    }, stepTime);
  };

  // Autoplay sequence: plays Track 1 on first interaction
  const unlockAndPlay = () => {
    if (isUnlocked || !audioRef.current) return;
    
    const audio = audioRef.current;
    
    // Only initialize source if not set
    if (!audio.src || audio.src === "") {
      audio.src = TRACK_LIST[0];
      audio.loop = false;
      audio.volume = 0.50;
      audio.currentTime = 0;
      setCurrentTrackIndex(0);
    } else {
      audio.currentTime = 0;
    }
    
    // Temporarily unmute to attempt playback
    setIsMuted(false);
    audio.muted = false;
    
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setIsUnlocked(true); // Lock as successfully unlocked
        console.log("Audio successfully unlocked and playing Track 1 starting at 0:00");
      })
      .catch((err) => {
        // If blocked by browser (e.g. scroll is not considered a gesture),
        // we keep isUnlocked = false so the next click/touch can trigger it.
        console.log("Autoplay blocked, waiting for click/touch gesture:", err);
        setIsMuted(true);
        audio.muted = true;
      });
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
        
        if (!next && audioRef.current.paused) {
          // If we are unmuting and it's paused, try to unlock/play
          if (!isUnlocked) {
            unlockAndPlay();
          } else {
            audioRef.current.play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          }
        }
      }
      return next;
    });
  };

  const playReelOverride = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      setIsMuted(false);
    }
    setIsUnlocked(true);
    isReelOverrideRef.current = true;
    
    crossfadeToTrack(0, 0, false);
  };

  const playRegistrationOverride = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      setIsMuted(false);
    }
    setIsUnlocked(true);
    
    crossfadeToTrack(2, 0, true);
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resume = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio resume failed:", err));
    }
  };

  const playNextTrack = () => {
    if (!audioRef.current) return;
    const nextIndex = currentTrackIndex === null ? 0 : (currentTrackIndex + 1) % TRACK_LIST.length;
    const startTime = nextIndex === 0 ? 54 : 0;
    const loop = nextIndex === 2; // Loop if Carnival Horns
    
    if (isMuted) {
      setIsMuted(false);
    }
    setIsUnlocked(true);
    crossfadeToTrack(nextIndex, startTime, loop);
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        isUnlocked,
        currentTrackIndex,
        toggleMute,
        unlockAndPlay,
        playReelOverride,
        playRegistrationOverride,
        pause,
        resume,
        playNextTrack,
        trackMetadata: TRACK_METADATA,
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
