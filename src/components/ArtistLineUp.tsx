"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Volume2, VolumeX, Music, Sparkles, Star, ArrowRight } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

interface Artist {
  name: string;
  role: string;
  bioSpacing: string;
  instagram: string;
  loopVideo: string;
  videoPosition?: string;
}

function ArtistCard({ 
  artist,
  isFlipped,
  onCardClick
}: { 
  artist: Artist;
  isFlipped: boolean;
  onCardClick: () => void;
}) {
  const [isLocalMuted, setIsLocalMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoVolumeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { isMuted: isGlobalMuted, fadeGlobalOut, fadeGlobalIn, artistAudioOptOut, setArtistAudioOptOut } = useAudio();

  const fadeVideoVolume = (targetVolume: number, duration: number = 300, onComplete?: () => void) => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    
    if (videoVolumeIntervalRef.current) {
      clearInterval(videoVolumeIntervalRef.current);
    }
    
    const initialVol = video.volume;
    const steps = 10;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    videoVolumeIntervalRef.current = setInterval(() => {
      currentStep++;
      const nextVol = initialVol + (targetVolume - initialVol) * (currentStep / steps);
      video.volume = Math.max(0, Math.min(1, nextVol));
      if (currentStep >= steps) {
        if (videoVolumeIntervalRef.current) {
          clearInterval(videoVolumeIntervalRef.current);
          videoVolumeIntervalRef.current = null;
        }
        if (onComplete) onComplete();
      }
    }, stepTime);
  };

  // Sync video mute state and ensure explicit play trigger
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isLocalMuted;
      if (!isLocalMuted) {
        videoRef.current.play().catch((err) => {
          console.log("Local video playback failed to start:", err);
        });
        fadeVideoVolume(0.60, 300);
      }
    }
  }, [isLocalMuted]);

  // Time trimming rule for Trombone Shorty new.mp4 (loop between 4s and 15s)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || artist.name !== "Trombone Shorty") return;

    const handleTimeUpdate = () => {
      if (video.currentTime < 4) {
        video.currentTime = 4;
      }
      if (video.currentTime >= 15) {
        video.currentTime = 4;
      }
    };

    const handlePlay = () => {
      if (video.currentTime < 4) {
        video.currentTime = 4;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);

    if (video.currentTime < 4) {
      video.currentTime = 4;
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
    };
  }, [artist.name]);

  // If global audio unmutes, automatically mute local video to avoid double playback
  useEffect(() => {
    if (!isGlobalMuted) {
      if (videoRef.current && !isLocalMuted) {
        fadeVideoVolume(0.0, 300, () => {
          setIsLocalMuted(true);
        });
      } else {
        setIsLocalMuted(true);
      }
    }
  }, [isGlobalMuted]);

  // Keep refs updated for the observer callback
  const artistAudioOptOutRef = useRef(artistAudioOptOut);
  const isLocalMutedRef = useRef(isLocalMuted);
  
  useEffect(() => {
    artistAudioOptOutRef.current = artistAudioOptOut;
  }, [artistAudioOptOut]);

  useEffect(() => {
    isLocalMutedRef.current = isLocalMuted;
  }, [isLocalMuted]);

  // Sync state with DOM mute state via volumechange listener (handles scroll observer changes)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVolumeChange = () => {
      setIsLocalMuted(video.muted);
    };

    video.addEventListener("volumechange", handleVolumeChange);
    return () => {
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

  const handleMouseEnter = () => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    if (artistAudioOptOut) return;

    fadeGlobalOut(300);
    setIsLocalMuted(false);
  };

  const handleMouseLeave = () => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    if (artistAudioOptOut) return;

    fadeGlobalIn(300);
    if (videoRef.current) {
      fadeVideoVolume(0.0, 300, () => {
        setIsLocalMuted(true);
      });
    } else {
      setIsLocalMuted(true);
    }
  };

  const handleClick = () => {
    onCardClick();
  };

  const handleMuteOverrideClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card flip
    const video = videoRef.current;
    
    if (!isLocalMuted) {
      // Mute (Opt-out)
      setArtistAudioOptOut(true);
      setIsLocalMuted(true);
      if (video) {
        video.muted = true;
      }
      fadeGlobalIn(300);
    } else {
      // Unmute (Opt-back-in)
      setArtistAudioOptOut(false);
      setIsLocalMuted(false);
      if (video) {
        video.muted = false;
        video.play().catch(err => console.log("Direct mobile unmute play failed:", err));
      }
      fadeGlobalOut(300);
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`artist-card perspective-1000 w-full h-[520px] cursor-pointer ${
        isFlipped ? "show-info is-card-flipped" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Background Video Layer (always visible and playing) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          src={artist.loopVideo}
          autoPlay
          loop
          muted={isLocalMuted}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className={`artist-loop-video w-full h-full object-cover ${artist.name === "Trombone Shorty" ? "trombone-shorty-video" : ""}`}
          style={{ objectPosition: artist.videoPosition || "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 via-brand-green/10 to-transparent z-10"></div>
      </div>

      {/* User Mute Override Button */}
      <button
        onClick={handleMuteOverrideClick}
        className="absolute top-3 right-3 z-35 bg-brand-green/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-gold/30 text-[9px] font-bold text-brand-gold uppercase tracking-wider hover:bg-brand-gold hover:text-brand-green hover:border-transparent transition-all duration-300 cursor-pointer flex items-center gap-1 shadow-lg"
      >
        {isLocalMuted ? <VolumeX size={10} /> : <Volume2 size={10} />}
        <span>{isLocalMuted ? "Unmute" : "Mute"}</span>
      </button>

      {/* Interactive Text & Biography Overlay */}
      <div 
        className="bio-overlay absolute bottom-0 inset-x-0 bg-brand-green/85 border-t border-brand-gold/25 z-20 p-5 flex flex-col gap-2 card-info"
      >
        {/* Header */}
        <div className="flex items-center justify-between artist-text">
          <div>
            <h4 className="font-serif text-sm text-brand-heading font-bold uppercase tracking-wider">
              {artist.name}
            </h4>
            <span className="font-sans text-[8px] text-brand-gold font-extrabold tracking-[0.2em] uppercase block mt-0.5">
              {artist.role}
            </span>
          </div>
          <a 
            href={artist.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={(e) => e.stopPropagation()} 
            className="text-brand-gold/80 hover:text-brand-white transition-colors p-1.5 rounded-full hover:bg-brand-white/5 flex-shrink-0"
            aria-label={`${artist.name} Instagram`}
          >
            <Instagram size={14} />
          </a>
        </div>
        
        {/* Elegant Separator */}
        <div className="w-full h-[1px] bg-brand-gold/15 my-1 artist-text"></div>

        {/* Vibe Description (Bio) */}
        <div className="artist-text">
          <p className="font-serif italic text-brand-white/90 text-[11px] leading-relaxed max-w-full">
            {artist.bioSpacing}
          </p>
        </div>

        {/* Footer Link */}
        <div className="pt-2 border-t border-brand-white/10 flex items-center justify-between artist-text">
          <a 
            href={artist.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-sans text-[8px] text-brand-white/55 hover:text-brand-gold transition-colors uppercase font-bold tracking-widest flex items-center gap-1"
          >
            <Instagram size={10} />
            <span>Instagram Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function ArtistLineUp() {
  const [activeCardName, setActiveCardName] = useState<string | null>(null);

  const currentArtists: Artist[] = [
    {
      name: "Trombone Shorty",
      role: "New Orleans Brass Icon",
      bioSpacing: "Troy Andrews (Trombone Shorty) is a Grammy-winning New Orleans brass icon. Blending funk, hip-hop, and jazz, he leads our brass workshops, instrument clinics, and joint student concerts.",
      instagram: "https://instagram.com/tromboneshorty",
      loopVideo: "/assets/reels/trombone_shorty_new.mp4",
      videoPosition: "center 15%"
    },
    {
      name: "Trombone Shorty Academy",
      role: "Empowering Youth Through Music",
      bioSpacing: "The Trombone Shorty Foundation offers both a road map and focus to allow students to pursue their passion. The goal is to nurture their talent in a way that opens up possibilities, and a platform for advancement. Although many kids in New Orleans play an instrument, it’s a select few like Troy “Trombone Shorty” who have the opportunity to pursue music as a career on a national stage.",
      instagram: "https://instagram.com/tromboneshortyfoundation",
      loopVideo: "/assets/reels/ts_foundation_loop.mp4",
      videoPosition: "center 15%"
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
      loopVideo: "/assets/reels/primera_linea_loop.mp4",
      videoPosition: "center 15%"
    }
  ];

  const travelingArtists = [
    "Angelica \"Jelly\" Joseph",
    "Aurelien Barnes",
    "Big Chief Juan Pardo",
    "Big Chief Monk Boudreaux",
    "Big Freedia",
    "DJ Mannie Fresh",
    "Galactic",
    "George Clinton",
    "Ivan Neville",
    "James Francies",
    "Keyon Harrold",
    "Mabiland",
    "Maurice “Mobetta” Brown",
    "Michael Brun",
    "Nik West",
    "Paul Beaubrun",
    "Pedrito Martinez",
    "PJ Morton",
    "Robe L Ninho",
    "Robert Randolph",
    "Taj Mahal",
    "Tank & The Bangas",
    "Tank Ball",
    "The Soul Rebels",
    "Trombone Shorty",
    "Valerie June",
    "Yola"
  ];

  const cubanArtists = [
    "Alain Perez",
    "Alexander Abreu & Havana D’Primera",
    "Carlos Varela",
    "ChikSoul",
    "Cimafunk",
    "DJ Leydis",
    "Ibeyi",
    "Interactivo",
    "La Reyna y Real",
    "Los Datway",
    "Los Van Van",
    "Primera Linea",
    "Victor Campbell",
    "Wampi",
    "X Alfonso",
    "Yissy Garcia"
  ];

  // Mobile IntersectionObserver & Audio Focus Controller
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const mobileVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('video');
        if (!video) return;

        if (entry.isIntersecting) {
          // Force video play state if paused
          if (video.paused) {
            video.play().catch(err => console.log("Autoplay unblock handling:", err));
          }
          // Mute all other artist videos first
          document.querySelectorAll('.artist-loop-video').forEach(v => {
            if (v !== video) {
              (v as HTMLVideoElement).muted = true;
            }
          });
          // Unmute the active video in focus
          video.muted = false;
          video.volume = 0.6;
        } else {
          // Video scrolled out of center focus zone
          video.muted = true;
        }
      });
    }, {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // Triggers only when video is in center 50% of screen
      threshold: 0.5
    });

    const cards = document.querySelectorAll('.artist-card');
    cards.forEach(card => {
      mobileVideoObserver.observe(card);
    });

    return () => {
      cards.forEach(card => {
        mobileVideoObserver.unobserve(card);
      });
    };
  }, []);

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
            Line Up Announcements
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

            {/* Host Artists Section */}
            <div className="mb-8">
              <h4 className="font-serif text-lg text-brand-gold font-bold mb-4 tracking-wider uppercase border-b border-brand-white/10 pb-2">
                Host Artists
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentArtists
                  .filter((a) => a.name === "Cimafunk" || a.name === "Trombone Shorty")
                  .map((artist) => (
                    <ArtistCard 
                      key={artist.name} 
                      artist={artist} 
                      isFlipped={activeCardName === artist.name}
                      onCardClick={() => setActiveCardName(activeCardName === artist.name ? null : artist.name)}
                    />
                  ))}
              </div>
            </div>

            {/* Youth Leaders Section */}
            <div className="mb-8">
              <h4 className="font-serif text-lg text-brand-gold font-bold mb-4 tracking-wider uppercase border-b border-brand-white/10 pb-2">
                Youth Leaders
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentArtists
                  .filter((a) => a.name === "Primera Linea" || a.name === "Trombone Shorty Academy")
                  .map((artist) => (
                    <ArtistCard 
                      key={artist.name} 
                      artist={artist} 
                      isFlipped={activeCardName === artist.name}
                      onCardClick={() => setActiveCardName(activeCardName === artist.name ? null : artist.name)}
                    />
                  ))}
              </div>
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
                  Line Up Announcements
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
