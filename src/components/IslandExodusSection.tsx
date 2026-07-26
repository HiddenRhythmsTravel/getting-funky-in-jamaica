"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, MapPin, Music, Waves, Utensils } from "lucide-react";
import { useEffect, useRef } from "react";
import Player from "@vimeo/player";
import { useAudio } from "@/contexts/AudioContext";

export function IslandExodusSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const { fadeGlobalOut, fadeGlobalIn, isMuted } = useAudio();

  useEffect(() => {
    if (!iframeRef.current) return;

    // Initialize Vimeo Player
    playerRef.current = new Player(iframeRef.current);

    const onPlay = () => {
      if (!isMuted) {
        fadeGlobalOut(500);
      }
    };

    const onPause = () => {
      if (!isMuted) {
        fadeGlobalIn(500);
      }
    };

    playerRef.current.on("play", onPlay);
    playerRef.current.on("pause", onPause);
    playerRef.current.on("ended", onPause);

    return () => {
      if (playerRef.current) {
        playerRef.current.off("play");
        playerRef.current.off("pause");
        playerRef.current.off("ended");
      }
    };
  }, [fadeGlobalOut, fadeGlobalIn, isMuted]);

  return (
    <section id="island-exodus" className="relative py-24 md:py-32 overflow-hidden bg-[#0A322C] text-[#FFFDF9]">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-brand-heading mb-4">
              Island Exodus 16
            </h2>
            <h3 className="font-sans text-lg md:text-2xl text-[#FFFDF9]/60 font-medium tracking-[0.2em] uppercase">
              January 17-21, 2027
            </h3>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-16 md:mb-24"
        >
          <div className="vimeo-wrapper" style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%" }}>
            <iframe 
              ref={iframeRef}
              src="https://player.vimeo.com/video/1170444881?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} 
              title="Gov't Mule's Island Exodus 2027 Promo"
            ></iframe>
          </div>
        </motion.div>

        {/* Content & CTA Grid */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-brand-heading">
              Island Exodus 16
            </h4>
            <p className="font-sans text-sm md:text-base text-[#FFFDF9]/80 leading-relaxed mb-4">
              Continue the rhythm in Trelawny, Jamaica. Come join us and experience more world-class music in a stunning beachfront resort setting for 4 nights, January 17 - 21, 2027. Note that Getting Funky has its finale night on Jan 17th.
            </p>
            <p className="font-sans text-sm md:text-base text-[#FFFDF9]/80 leading-relaxed mb-8">
              Performances by Gov't Mule with special guest John Scofield. Warren Haynes, Moe, and Daniel Donato's Cosmic Country are all on the ticket as well. The Hideaway at Royalton Bluewaters is located on the North side of Jamaica, 35 minutes from Montego Bay airport.
            </p>
            
            <ul className="space-y-4 mb-10 text-sm md:text-base text-[#FFFDF9]/85 list-none pl-0">
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1 text-lg font-bold">•</span>
                <span>A Beautiful Expansive Soft Sandy, Swimmable Beach and Beach Stage.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1 text-lg font-bold">•</span>
                <span>A Variety of Well-Appointed Modern Rooms and Suites, Including Many with Swim-Out Pools and Ocean Views</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1 text-lg font-bold">•</span>
                <span>2 Centrally Located Pools Overlooking the Beach</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1 text-lg font-bold">•</span>
                <span>Enhanced Food and Beverage included- 12 Restaurants and 11 Bars</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1 text-lg font-bold">•</span>
                <span>24/7 Room Service</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1 text-lg font-bold">•</span>
                <span>Fitness Center and Spa</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1 text-lg font-bold">•</span>
                <span>Transportation from your Kingston hotel to the Royalton Resort on January 18th and to the Montego Bay airport on January 21st, included.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <a
              href="https://www.islandexodus.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-5 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A322C] shadow-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                PRICING AND ISLAND EXODUS DETAILS <ExternalLink size={14} />
              </span>
            </a>

            <a
              href="https://islandgigs.rezmagic.com/Booking/Reservation/Start?tripID=7367"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-5 rounded-full border border-[#FFFDF9]/30 text-[#FFFDF9] font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#FFFDF9]/10"
            >
              REGISTER NOW
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
