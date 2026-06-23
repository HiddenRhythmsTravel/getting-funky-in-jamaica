"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Volume2, VolumeX, Music, Sparkles, Star } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

interface Artist {
  name: string;
  role: string;
  bioSpacing: string;
  instagram: string;
  loopVideo: string;
}

function ArtistCard({ artist }: { artist: Artist }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLocalMuted, setIsLocalMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { pause: pauseGlobalAudio, resume: resumeGlobalAudio, isMuted: isGlobalMuted } = useAudio();

  // Sync video mute state and ensure explicit play trigger
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isLocalMuted;
      if (!isLocalMuted) {
        videoRef.current.play().catch((err) => {
          console.log("Local video playback failed to start:", err);
        });
      }
    }
  }, [isLocalMuted]);

  // If global audio unmutes, automatically mute local video to avoid double playback
  useEffect(() => {
    if (!isGlobalMuted) {
      setIsLocalMuted(true);
    }
  }, [isGlobalMuted]);

  // IntersectionObserver to auto-play on mobile scroll, and mute when scrolled out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        
        if (entry.isIntersecting) {
          if (isMobile) {
            // On mobile: auto-play when card enters viewport
            pauseGlobalAudio();
            setIsLocalMuted(false);
          }
        } else {
          // Scrolled out of view: mute video, unflip, and resume global audio
          setIsFlipped(false);
          if (!isLocalMuted) {
            setIsLocalMuted(true);
            resumeGlobalAudio();
          }
        }
      },
      { 
        threshold: 0.5, // require at least 50% of card to be visible
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, [isLocalMuted, resumeGlobalAudio, pauseGlobalAudio]);

  const handleMouseEnter = () => {
    pauseGlobalAudio();
    setIsLocalMuted(false);
  };

  const handleMouseLeave = () => {
    setIsLocalMuted(true);
    setIsFlipped(false);
    resumeGlobalAudio();
  };

  const handleClick = () => {
    // Tapping/clicking should make sure audio is playing (especially on mobile)
    if (isLocalMuted) {
      pauseGlobalAudio();
      setIsLocalMuted(false);
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      ref={cardRef}
      className="perspective-1000 w-full h-[400px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div 
        className={`relative w-full h-full preserve-3d transition-transform duration-700 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden glass-card rounded-2xl overflow-hidden flex flex-col border border-brand-white/10 hover:border-brand-gold/40 transition-all duration-300">
          <div className="relative h-64 w-full bg-brand-dark-accent/60 overflow-hidden">
            <video
              ref={videoRef}
              src={artist.loopVideo}
              autoPlay
              loop
              muted={isLocalMuted}
              playsInline
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 to-transparent z-10"></div>
            {/* Visual indicator of playing */}
            <div className="absolute top-3 right-3 bg-brand-green/80 backdrop-blur-sm px-2 py-1 rounded-full text-[8px] font-bold text-brand-gold tracking-widest uppercase z-20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-ping"></span>
              <span>Loop</span>
            </div>
          </div>
          
          <div className="p-5 flex flex-col justify-between flex-grow bg-brand-green/20">
            <div>
              <h4 className="font-serif text-base text-brand-heading font-bold mb-0.5">
                {artist.name}
              </h4>
              <span className="font-sans text-[9px] text-brand-gold font-bold tracking-widest uppercase">
                {artist.role}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-[9px] text-brand-white/40 font-bold uppercase tracking-wider mt-2 border-t border-brand-white/5 pt-2">
              <span className="flex items-center gap-1"><Music size={10} /> Live Media</span>
              <span className="text-brand-gold">Hover to Listen</span>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-card rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl flex flex-col justify-between">
          
          {/* Ambient Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              src={artist.loopVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center blur-[4px] scale-105 opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-accent/95 via-brand-green/90 to-brand-dark-accent/95"></div>
          </div>

          {/* Inner Decorative Box */}
          <div className="relative z-10 m-3 rounded-xl border border-brand-gold/25 p-5 flex flex-col justify-between h-[calc(100%-1.5rem)] bg-brand-green/10">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="w-4"></span> {/* Spacer to balance Instagram icon */}
                <h4 className="font-serif text-sm text-brand-heading font-bold uppercase tracking-wider text-center">
                  {artist.name}
                </h4>
                <a 
                  href={artist.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={(e) => e.stopPropagation()} 
                  className="text-brand-gold/80 hover:text-brand-white transition-colors p-1 rounded-full hover:bg-brand-white/5 flex-shrink-0"
                  aria-label={`${artist.name} Instagram`}
                >
                  <Instagram size={13} />
                </a>
              </div>
              
              <span className="font-sans text-[8px] text-brand-gold font-extrabold tracking-[0.2em] uppercase text-center block mt-1">
                {artist.role}
              </span>

              {/* Elegant Separator */}
              <div className="flex items-center justify-center gap-1.5 my-3">
                <div className="w-8 h-[1px] bg-brand-gold/20"></div>
                <Sparkles size={8} className="text-brand-gold/40 animate-pulse" />
                <div className="w-8 h-[1px] bg-brand-gold/20"></div>
              </div>
            </div>

            {/* Vibe Description (Bio) */}
            <div className="flex-grow flex items-center justify-center py-2">
              <p className="font-serif italic text-brand-white/90 text-xs leading-relaxed text-center max-w-[200px] mx-auto">
                {artist.bioSpacing}
              </p>
            </div>

            {/* Footer Control */}
            <div className="pt-3 border-t border-brand-white/10 flex items-center justify-center">
              <a
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-sans text-[8px] text-brand-white/55 hover:text-brand-gold transition-colors uppercase font-bold tracking-widest flex items-center gap-1"
              >
                <span>Instagram Profile</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export function ArtistLineUp() {
  const currentArtists: Artist[] = [
    {
      name: "Trombone Shorty",
      role: "New Orleans Brass Icon",
      bioSpacing: "Troy Andrews (Trombone Shorty) is a Grammy-winning New Orleans brass icon. Blending funk, hip-hop, and jazz, he leads our brass workshops, instrument clinics, and joint student concerts.",
      instagram: "https://instagram.com/tromboneshorty",
      loopVideo: "/assets/reels/trombone_shorty_loop.mp4"
    },
    {
      name: "Cimafunk",
      role: "Afro-Cuban Funk Pioneer",
      bioSpacing: "Grammy-nominated Cuban artist redefining modern Afro-Cuban grooves by bridging Cuba's rhythms with American funk, soul, and New Orleans second-line beats.",
      instagram: "https://instagram.com/cimafunk",
      loopVideo: "/assets/reels/cimafunk_loop.mp4"
    },
    {
      name: "Primera Linea",
      role: "Havana's Premier All-Stars",
      bioSpacing: "An elite collaborative band uniting Cuba's top session players, horn sections, and master percussionists, providing a high-energy Cuban backup force.",
      instagram: "https://instagram.com/primeralineacuba",
      loopVideo: "/assets/reels/primera_linea_loop.mp4"
    }
  ];

  const travelingArtists = [
    "Angelica \"Jelly\" Joseph",
    "Aurelien Barnes",
    "Big Chief Joseph Bordeaux",
    "Big Chief Juan Pardo",
    "Big Freedia",
    "DJ Leydis",
    "DJ Mannie Fresh",
    "Galactic",
    "George Clinton",
    "Ivan Neville",
    "James Francies",
    "Keyon Harrold",
    "Mabiland",
    "Michael Brun",
    "Nik West",
    "Paul Beaubrun",
    "Pedrito Martinez",
    "PJ Morton",
    "Robe L Ninho",
    "Soul Rebels",
    "Taj Mahal",
    "Tank & The Bangas",
    "Tank Ball",
    "Trombone Shorty"
  ];

  const cubanArtists = [
    "Carlos Varela",
    "Cimafunk",
    "Habana D'Primeara",
    "Interactivo",
    "Los Datway",
    "Los Van Van",
    "Primera Linea",
    "Wampi",
    "Victor Campbell",
    "X Alfonso",
    "Yissy Garcia"
  ];

  return (
    <section id="artists" className="relative py-24 md:py-32 overflow-hidden bg-brand-green border-t border-brand-white/5">
      {/* Background Decorative Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-tropical-burgundy/15 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header with Heritage & Legacy Copy */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <span className="font-sans text-[10px] md:text-xs text-brand-gold font-bold tracking-[0.25em] uppercase mb-3 block">
            The Sound
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-heading font-bold mb-6">
            Artist Line Up
          </h2>
          <p className="font-sans text-brand-white/80 text-sm md:text-base leading-relaxed max-w-3xl mx-auto border-l-2 border-brand-gold/40 pl-4 md:pl-8 py-2 text-left md:text-center">
            Getting Funky in Jamaica is led by Trombone Shorty, Cimafunk, The Trombone Shorty Academy Band, Primera Linea, and Top Brass, who will participate in workshops, jam sessions, and live performances. Additional artists from New Orleans, Cuba and Jamaica will be announced soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Subpage B: Current Artists from 2027 */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div>
              <span className="font-sans text-[10px] md:text-xs text-brand-gold font-bold tracking-[0.2em] uppercase mb-4 block">
                Featured 2027 Artists
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-brand-white font-bold mb-6">
                Headliners & Profiles
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentArtists.map((artist) => (
                <ArtistCard key={artist.name} artist={artist} />
              ))}
            </div>

            {/* Status Alert Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-tropical-burgundy/80 to-brand-dark-accent/90 border border-brand-gold/20 flex items-center gap-4 shadow-lg overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-xl pointer-events-none transition-transform group-hover:scale-150"></div>
              
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <Sparkles size={20} className="animate-pulse" />
              </div>

              <div className="flex-grow">
                <span className="font-sans text-[10px] text-brand-gold font-bold tracking-widest uppercase block mb-0.5">
                  Line Up Update
                </span>
                <span className="font-serif text-sm sm:text-base text-brand-white font-semibold tracking-wide">
                  Additional Artists being announced soon
                </span>
              </div>
            </motion.div>
          </div>

          {/* Subpage A: Past Artists include Archive Layout */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-brand-white/10 lg:pl-10">
            <div>
              <span className="font-sans text-[10px] md:text-xs text-brand-gold font-bold tracking-[0.2em] uppercase mb-4 block">
                Heritage & Legacy
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-brand-white font-bold mb-6">
                Artists Archive
              </h3>
            </div>

            {/* Cuban Artists Subsection */}
            <div className="mb-4">
              <span className="font-sans text-[10px] text-brand-gold font-bold tracking-wider uppercase mb-3 block flex items-center gap-1.5">
                <Star size={11} />
                Cuban Artists
              </span>
              <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-1 no-scrollbar border-b border-brand-white/5 pb-4">
                {cubanArtists.map((artist) => (
                  <div
                    key={artist}
                    className="p-3 rounded-lg bg-brand-dark-accent/30 border border-brand-white/5 flex items-center justify-between"
                  >
                    <span className="font-sans text-xs text-brand-white/80">
                      {artist}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/30"></span>
                  </div>
                ))}
              </div>
            </div>

            {/* International Artists Subsection */}
            <div>
              <span className="font-sans text-[10px] text-brand-gold font-bold tracking-wider uppercase mb-3 block flex items-center gap-1.5">
                <Star size={11} />
                International Artists
              </span>
              <div className="grid grid-cols-1 gap-2 max-h-[260px] overflow-y-auto pr-1 no-scrollbar">
                {travelingArtists.map((artist) => (
                  <div
                    key={artist}
                    className="p-3 rounded-lg bg-brand-dark-accent/30 border border-brand-white/5 flex items-center justify-between"
                  >
                    <span className="font-sans text-xs text-brand-white/80">
                      {artist}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/30"></span>
                  </div>
                ))}
              </div>
            </div>


          </div>

        </div>
      </div>
    </section>
  );
}
