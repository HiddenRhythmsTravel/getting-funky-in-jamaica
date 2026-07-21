"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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

export const TRACK_METADATA: { title: string; artist: string }[] = [];

export function AudioProvider({ children }: { children: React.ReactNode }) {
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

  const dummyFunc = () => {};

  return (
    <AudioContext.Provider
      value={{
        isPlaying: false,
        isMuted: true,
        isUnlocked: true,
        currentTrackIndex: null,
        isPlayerMinimized: true,
        setIsPlayerMinimized: dummyFunc,
        toggleMute: dummyFunc,
        unlockAndPlay: dummyFunc,
        replayActiveTrack: dummyFunc,
        pause: dummyFunc,
        resume: dummyFunc,
        playNextTrack: dummyFunc,
        fadeGlobalOut: dummyFunc,
        fadeGlobalIn: dummyFunc,
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
