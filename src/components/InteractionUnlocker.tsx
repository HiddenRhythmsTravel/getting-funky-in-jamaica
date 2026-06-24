"use client";

import { useEffect } from "react";
import { useAudio } from "@/contexts/AudioContext";

export function InteractionUnlocker() {
  const { unlockAndPlay, isUnlocked } = useAudio();

  useEffect(() => {
    if (isUnlocked) return;

    const handleInteraction = () => {
      unlockAndPlay();
    };

    window.addEventListener("click", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [unlockAndPlay, isUnlocked]);

  return null;
}
