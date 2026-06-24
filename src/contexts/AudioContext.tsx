"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  isUnlocked: boolean;
  currentTrackIndex: number | null;
  isPlayerMinimized: boolean;
  setIsPlayerMinimized: (minimized: boolean) => void;
  toggleMute: () => void;
  unlockAndPlay: () => void;
  replayActiveTrack: () => void;
  pause: () => void;
  resume: () => void;
  playNextTrack: () => void;
  fadeGlobalOut: (duration?: number) => void;
  fadeGlobalIn: (duration?: number) => void;
  artistAudioOptOut: boolean;
  setArtistAudioOptOut: (optOut: boolean) => void;
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
  { title: "I Don't Care", artist: "Cimafunk ft. Nik West" },
  { title: "Carnival Horns", artist: "Mista Nova Session" },
];

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Loads muted by default
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(0); // Initialize as 0 to show first track info
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(true);
  const [artistAudioOptOut, setArtistAudioOptOut] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("artist_audio_opt_out") === "true";
      if (saved) {
        setArtistAudioOptOut(true);
      }
    }
  }, []);

  const updateArtistAudioOptOut = (optOut: boolean) => {
    setArtistAudioOptOut(optOut);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("artist_audio_opt_out", optOut ? "true" : "false");
    }
  };
  
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isTransitioningRef = useRef(false);
  const cachedTimeRef = useRef<number>(0);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitiatedUnlockRef = useRef(false);

  // Initialize audio element on client mount
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.volume = 0.0;
    audioRef.current = audio;

    // Handle track completion (stop playback and expand player widget)
    const handleEnded = () => {
      setIsPlaying(false);
      setIsPlayerMinimized(false);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Sync mute state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  // Synchronize audio track and player widget state with page navigation paths
  useEffect(() => {
    if (!audioRef.current) return;

    if (pathname === "/gallery") {
      setIsPlayerMinimized(false);
      if (currentTrackIndex !== 2) {
        if (isUnlocked) {
          crossfadeToTrack(2, 0, false, !isMuted);
        } else {
          audioRef.current.src = TRACK_LIST[2];
          audioRef.current.currentTime = 0;
          setCurrentTrackIndex(2);
        }
      } else {
        audioRef.current.currentTime = 0;
      }
    } else if (pathname === "/") {
      if (currentTrackIndex !== 0) {
        if (isUnlocked) {
          crossfadeToTrack(0, 0, false, !isMuted);
        } else {
          audioRef.current.src = TRACK_LIST[0];
          audioRef.current.currentTime = 0;
          setCurrentTrackIndex(0);
        }
      }
    }
  }, [pathname, isUnlocked]);

  // Smooth crossfade function
  const crossfadeToTrack = (trackIndex: number, startTime: number = 0, loop: boolean = false, forcePlay: boolean = false) => {
    if (!audioRef.current || isTransitioningRef.current) return;
    
    // Clear initial fade interval if active to avoid volume conflicts
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    
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
        
        // 3. Play and Fade in new track
        const shouldPlay = forcePlay || !isMuted;
        if (shouldPlay) {
          if (forcePlay) {
            audio.muted = false;
          }
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
    if (isUnlocked || hasInitiatedUnlockRef.current || !audioRef.current) return;
    
    hasInitiatedUnlockRef.current = true;
    const audio = audioRef.current;
    const targetIndex = currentTrackIndex !== null ? currentTrackIndex : 0;
    
    audio.src = TRACK_LIST[targetIndex];
    audio.loop = false;
    audio.volume = 0.0; // Start at 0 volume
    audio.currentTime = 0;
    setCurrentTrackIndex(targetIndex);
    
    setIsMuted(false);
    audio.muted = false;
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setIsUnlocked(true);
        setIsPlayerMinimized(false); // Maximize the player widget on play
        
        // 3.5s linear fade-in script
        const duration = 3500; // ms
        const intervalTime = 50; // ms
        const steps = duration / intervalTime; // 70 steps
        const targetVolume = 0.45; // max ambient threshold
        const volumeStep = targetVolume / steps;
        
        let currentStep = 0;
        fadeIntervalRef.current = setInterval(() => {
          currentStep++;
          if (audioRef.current) {
            audioRef.current.volume = Math.min(targetVolume, currentStep * volumeStep);
          }
          if (currentStep >= steps) {
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
              fadeIntervalRef.current = null;
            }
          }
        }, intervalTime);
        
        console.log(`Audio successfully unlocked and playing Track ${targetIndex + 1} starting at 0:00 with 3.5s fade-in`);
      })
      .catch((err) => {
        console.log("Autoplay blocked, waiting for gesture:", err);
        setIsMuted(true);
        audio.muted = true;
        hasInitiatedUnlockRef.current = false; // Reset so that next user click can try again
      });
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
        
        // If muting, clear any active fade-in interval to prevent volume from rising
        if (next && fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        
        if (!next && audioRef.current.paused) {
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

  const replayActiveTrack = () => {
    if (!audioRef.current || currentTrackIndex === null) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const audio = audioRef.current;
    audio.currentTime = 0;
    setIsMuted(false);
    audio.muted = false;
    audio.volume = 0.45;

    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.log("Replay failed:", err);
      });
  };

  const pause = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    if (audioRef.current) {
      cachedTimeRef.current = audioRef.current.currentTime;
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resume = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current.currentTime = cachedTimeRef.current;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio resume failed:", err));
    }
  };

  const playNextTrack = () => {
    if (!audioRef.current) return;
    const nextIndex = currentTrackIndex === null ? 0 : (currentTrackIndex + 1) % TRACK_LIST.length;
    setIsMuted(false);
    setIsUnlocked(true);
    crossfadeToTrack(nextIndex, 0, false, true);
  };

  const fadeGlobalOut = (duration: number = 300) => {
    if (!audioRef.current || isMuted) return;
    const audio = audioRef.current;
    cachedTimeRef.current = audio.currentTime;
    
    const initialVol = audio.volume;
    const steps = 10;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    
    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      audio.volume = Math.max(0, initialVol * (1 - currentStep / steps));
      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        audio.pause();
        setIsPlaying(false);
      }
    }, stepTime);
  };

  const fadeGlobalIn = (duration: number = 300) => {
    if (!audioRef.current || isMuted) return;
    const audio = audioRef.current;
    audio.currentTime = cachedTimeRef.current;
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    
    audio.volume = 0;
    audio.play()
      .then(() => {
        setIsPlaying(true);
        const targetVolume = 0.45;
        const steps = 10;
        const stepTime = duration / steps;
        let currentStep = 0;
        
        fadeIntervalRef.current = setInterval(() => {
          currentStep++;
          audio.volume = Math.min(targetVolume, targetVolume * (currentStep / steps));
          if (currentStep >= steps) {
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
              fadeIntervalRef.current = null;
            }
          }
        }, stepTime);
      })
      .catch((err) => {
        console.log("Fade in resume failed:", err);
      });
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        isUnlocked,
        currentTrackIndex,
        isPlayerMinimized,
        setIsPlayerMinimized,
        toggleMute,
        unlockAndPlay,
        replayActiveTrack,
        pause,
        resume,
        playNextTrack,
        fadeGlobalOut,
        fadeGlobalIn,
        artistAudioOptOut,
        setArtistAudioOptOut: updateArtistAudioOptOut,
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
