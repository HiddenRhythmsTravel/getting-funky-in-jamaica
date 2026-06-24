"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check authorization on client mount
    if (typeof window !== "undefined") {
      const isCookieAuthorized = document.cookie.split("; ").some((row) => row.startsWith("gf_authorized=true"));
      const isLocalStorageAuthorized = localStorage.getItem("gf_authorized") === "true";
      
      if (isCookieAuthorized || isLocalStorageAuthorized) {
        setIsAuthorized(true);
        // Refresh token if needed
        if (isLocalStorageAuthorized && !isCookieAuthorized) {
          const expires = new Date();
          expires.setDate(expires.getDate() + 7);
          document.cookie = `gf_authorized=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
        }
      } else {
        setIsAuthorized(false);
      }
    }
  }, []);

  // Auto-focus input when the lock screen appears
  useEffect(() => {
    if (isAuthorized === false && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAuthorized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Kingston2027") {
      setError(false);
      setIsAuthorized(true);
      
      // Store token for 7 days
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      document.cookie = `gf_authorized=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
      localStorage.setItem("gf_authorized", "true");
    } else {
      setError(true);
      setPassword(""); // Clear field on failure
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleInputTouch = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Prevent flash of page content during hydration/checking state
  if (isAuthorized === null) {
    return <div className="fixed inset-0 bg-brand-green z-[999999]" />;
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="password-gate-container">
      <div className="password-gate-content">
        {/* Styled Logo Container */}
        <div className="password-gate-logo">
          <Image
            src="/assets/getting_funky_logo_yellow_2027.png"
            alt="Getting Funky in Jamaica Brand Logo"
            width={288}
            height={288}
            className="w-[95%] h-[95%] object-contain opacity-95"
            priority
          />
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
          <div className="w-full relative" onClick={handleInputTouch} onTouchStart={handleInputTouch}>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter Access Code..."
              className="w-full px-5 py-4 bg-brand-green/60 border border-brand-gold/30 rounded-full text-brand-white placeholder-brand-white/40 focus:outline-none focus:border-brand-gold text-center text-sm tracking-wide transition-all duration-300 font-sans shadow-lg focus:ring-1 focus:ring-brand-gold/20"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-brand-gold font-sans text-xs tracking-wider font-semibold text-center italic mt-1">
              Invalid code. Please try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 mt-2 bg-accent-gradient text-brand-green font-bold text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(239,156,130,0.4)] cursor-pointer flex items-center justify-center shadow-lg"
          >
            Unlock Preview
          </button>
        </form>
      </div>
    </div>
  );
}
