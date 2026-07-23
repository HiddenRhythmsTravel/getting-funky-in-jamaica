"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Building2, ShieldCheck, ArrowRight, Clock, MapPin, CheckCircle2, Plane } from "lucide-react";

type TabType = "itinerary" | "lodging" | "flight-guidance";

interface ProgramContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeDay: number;
  setActiveDay: (day: number) => void;
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export function VipProgramProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>("itinerary");
  const [activeDay, setActiveDay] = useState(0);

  // Auto-activate tab based on URL hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        if (window.location.hash === "#flight-guidance") {
          setActiveTab("flight-guidance");
          setTimeout(() => {
            const el = document.getElementById("flight-guidance");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      };

      handleHashChange();
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  return (
    <ProgramContext.Provider value={{ activeTab, setActiveTab, activeDay, setActiveDay }}>
      {children}
    </ProgramContext.Provider>
  );
}

export function useProgram() {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error("useProgram must be used within a VipProgramProvider");
  }
  return context;
}

export function EarlyBirdBanner({ isClickable = false, isZohoLink = false }: { isClickable?: boolean; isZohoLink?: boolean }) {
  const [isExpired, setIsExpired] = useState(false);
  const zohoPortalUrl = "https://forms.zohopublic.com/caribbeanexecutivetravel1/form/HRTTravelRegistration/formperma/SHoOEyI-cABdddRGuEWJtOC16QHkqKNZAqN8ONrdI6M";

  useEffect(() => {
    // Automated Expiration Flag Check for August 5, 2027
    const currentDate = new Date();
    const expirationDate = new Date('2027-08-05T00:00:00');

    if (currentDate >= expirationDate) {
      console.warn("DEVELOPER ALERT: August 5 reached. Early registration discount notice requires removal/update.");
      // Automatically hide early bird banners if past expiration date
      document.querySelectorAll('.early-bird-banner').forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
      setIsExpired(true);
    }
  }, []);

  if (isExpired) return null;

  if (isZohoLink) {
    return (
      <a 
        href={zohoPortalUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="early-bird-banner block no-underline max-w-4xl mx-auto my-6 hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
      >
        <div className="p-6 rounded-2xl border border-brand-gold/50 bg-brand-gold/15 text-center shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all duration-300 animate-pulse">
          <p className="font-sans text-brand-gold font-bold italic text-sm sm:text-base leading-relaxed">
            Early Registration Special for Returning Guests: $1,000 discount if you register on or before August 5.
          </p>
        </div>
      </a>
    );
  }

  if (isClickable) {
    return (
      <a 
        href="#registration" 
        className="early-bird-banner block no-underline max-w-4xl mx-auto my-6 hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("registration");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div className="p-6 rounded-2xl border border-brand-gold/50 bg-brand-gold/10 text-center shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 animate-pulse">
          <p className="font-sans text-brand-gold font-bold italic text-sm sm:text-base leading-relaxed">
            Early Registration Special for Returning Guests: $1,000 discount if you register on or before August 5.
          </p>
        </div>
      </a>
    );
  }

  return (
    <div className="early-bird-banner max-w-4xl mx-auto my-6" style={{ margin: "1.5rem auto" }}>
      <div className="p-6 rounded-2xl border border-brand-gold bg-brand-gold/5 text-center shadow-lg">
        <p className="font-sans text-brand-gold font-bold italic text-sm sm:text-base leading-relaxed">
          Early Registration Special for Returning Guests: $1,000 discount if you register on or before August 5.
        </p>
      </div>
    </div>
  );
}

export function VipProgramCards() {
  const { activeTab, setActiveTab } = useProgram();

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setTimeout(() => {
      const el = document.getElementById("vip-details");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section id="program" className="relative py-24 md:py-32 overflow-hidden bg-brand-green border-t border-brand-white/5">
      {/* Background Cover Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0b4745_80%)] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-transparent to-brand-green z-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="font-sans text-[10px] md:text-xs text-brand-gold font-bold tracking-[0.25em] uppercase mb-3 block">
            The Program
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-heading font-bold mb-6">
            VIP Program Details
          </h2>
          
          {/* Program Card Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto font-sans">
            {/* Card 1: Itinerary */}
            <button
              onClick={() => handleTabClick("itinerary")}
              className={`p-6 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[140px] group ${
                activeTab === "itinerary"
                  ? "bg-[#0A322C] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] text-brand-white"
                  : "bg-brand-dark-accent/40 border-brand-white/10 hover:border-brand-gold/40 text-brand-white/80"
              }`}
            >
              <Calendar className={activeTab === "itinerary" ? "text-[#D4AF37]" : "text-brand-white/60 group-hover:text-brand-gold transition-colors duration-300"} size={28} />
              <div>
                <h3 className="font-serif text-lg font-bold tracking-wider mb-1">Itinerary</h3>
                <p className="text-[10px] uppercase tracking-wider text-brand-gold">5-Day Cultural Timeline</p>
              </div>
            </button>

            {/* Card 2: Lodging */}
            <button
              onClick={() => handleTabClick("lodging")}
              className={`p-6 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[140px] group ${
                activeTab === "lodging"
                  ? "bg-[#0A322C] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] text-brand-white"
                  : "bg-brand-dark-accent/40 border-brand-white/10 hover:border-brand-gold/40 text-brand-white/80"
              }`}
            >
              <Building2 className={activeTab === "lodging" ? "text-[#D4AF37]" : "text-brand-white/60 group-hover:text-brand-gold transition-colors duration-300"} size={28} />
              <div>
                <h3 className="font-serif text-lg font-bold tracking-wider mb-1">Lodging</h3>
                <p className="text-[10px] uppercase tracking-wider text-brand-gold">Kingston Suites & Hotels</p>
              </div>
            </button>

            {/* Card 3: Flight Guidance */}
            <button
              onClick={() => handleTabClick("flight-guidance")}
              className={`p-6 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[140px] group ${
                activeTab === "flight-guidance"
                  ? "bg-[#0A322C] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] text-brand-white"
                  : "bg-brand-dark-accent/40 border-brand-white/10 hover:border-brand-gold/40 text-brand-white/80"
              }`}
            >
              <Plane className={activeTab === "flight-guidance" ? "text-[#D4AF37]" : "text-brand-white/60 group-hover:text-brand-gold transition-colors duration-300"} size={28} />
              <div>
                <h3 className="font-serif text-lg font-bold tracking-wider mb-1">Flight Guidance</h3>
              </div>
            </button>

            {/* Card 4: Registration */}
            <button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("registration");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="p-6 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[140px] group bg-brand-dark-accent/40 border-brand-white/10 hover:border-[#D4AF37] hover:bg-[#0A322C] text-brand-white/80 hover:text-brand-white"
            >
              <ShieldCheck className="text-brand-white/60 group-hover:text-[#D4AF37] transition-colors duration-300" size={28} />
              <div>
                <h3 className="font-serif text-lg font-bold tracking-wider mb-1">Registration</h3>
                <p className="text-[10px] uppercase tracking-wider text-brand-gold">Secure Your Package</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VipProgramDetails() {
  const { activeTab, activeDay, setActiveDay } = useProgram();

  const itineraryDays = [
    {
      day: "Day 1",
      date: "Thursday",
      events: [
        {
          time: "TBD",
          header: "Arrival in Kingston",
          desc: "Arrive in Kingston and meet your Getting Funky in Jamaica hosts for airport transfers to the hotel. Settle into your accommodations, relax, and take in the vibrant energy of Jamaica’s cultural capital before an unforgettable weekend of music, culture, and connection."
        },
        {
          time: "Evening",
          header: "Dinner Reception with Live Music",
          desc: "Celebrate Jamaica’s musical legacy with local cuisine and live music and dance performances on the grounds of the Ashe Company, where some of Jamaica’s most talented youth study dance, theatre, music and production. Immerse yourself in the sounds and vibes of Jamaica."
        },
        {
          time: "",
          header: "",
          desc: "**Optional: Late Night Live Music**"
        }
      ]
    },
    {
      day: "Day 2",
      date: "Friday",
      events: [
        {
          time: "Morning",
          header: "Visit Historic Trench Town + Jamaican Music Education Discussion",
          desc: "Explore the legendary community widely regarded as the birthplace of modern Jamaican popular music. Visit a music school run by Damian, Stephen and Julian Marley’s Ghetto Youth Foundation, where we’ll interact with local youth. Explore Bob Marley’s childhood home, where he learned to play guitar and wrote many of his legendary songs. Enjoy a panel discussion on Current State of Jamaican Youth Music Education."
        },
        {
          time: "Lunch",
          header: "Food and Music at Haile Selassie High School",
          desc: "Enjoy a catered lunch alongside students, faculty, and community leaders while experiencing live musical performances by Cuban, U.S. and Jamaican Youth. Connect with students and educators while supporting the next generation of Jamaican artists through a meaningful instrument donation program."
        },
        {
          time: "Afternoon",
          header: "R&R",
          desc: "Enjoy free time to relax at the hotel, explore Kingston at your own pace, or simply recharge before the evening’s cultural experiences. Your Getting Funky travel curators can help with excursion ideas and transport."
        },
        {
          time: "Evening",
          header: "Rastafarian Meal in the Hills of Kingston",
          desc: "Gather in the lush hills overlooking Kingston for an authentic Rastafarian dining experience. Savor traditional Ital cuisine while learning about the philosophy, history, and cultural influence of the Rastafarian movement in Jamaica."
        },
        {
          time: "Night",
          header: "New Orleans – Jamaica – Cuba *Super Jam*",
          desc: "Witness an extraordinary musical exchange as artists from New Orleans, Jamaica, and Cuba come together for a one-of-a-kind musical mashup. Rooted in shared rhythms and cultural traditions, this unforgettable jam session celebrates the connections that unite these three musical treasures."
        }
      ]
    },
    {
      day: "Day 3",
      date: "Saturday",
      events: [
        {
          time: "Morning",
          header: "Bob Marley Museum",
          desc: "Visit the historic residence of Bob Marley, one of the most influential musicians of the 20th century. Explore the spaces where he lived and worked and survived an assassination attempt, and gain a deeper appreciation for the music, culture, and enduring legacy that have made Jamaica a global cultural force."
        },
        {
          time: "",
          header: "Light Bites & Music at the Iconic Tuff Gong Studios",
          desc: "Enjoy a behind-the-scenes tour and lunch at Jamaica’s most iconic recording studio. Split into small groups to tour the facilities, observe local bands recording, and learn about the studio’s enduring role in Jamaica’s musical legacy. Tap off the visit with a performance in the rehearsal space."
        },
        {
          time: "Afternoon",
          header: "Music, Food and History at Strawberry Hill",
          desc: "Enjoy lunch, live performances, and a discussion on reggae music at Strawberry Hill. Owned by Island Records founder Chris Blackwell, the historic mountain retreat center is where Bob Marley recuperated following the 1976 assassination attempt. Surrounded by sweeping views of the Blue Mountains, the gathering offers a unique opportunity to connect with Jamaica’s rich musical heritage and important history."
        },
        {
          time: "Evening",
          header: "Getting Funky in Jamaica Concert: Trombone Shorty, Cimafunk ft. Top Brass, Trombone Shorty Academy Band, Primera Linea + More",
          desc: "Cap off the day with a dynamic celebration of Caribbean and New Orleans musical traditions. Featuring performances by Trombone Shorty, Cimafunk, local artists, and special guests, this high-energy concert showcases the vibrant cultural connections that inspire Getting Funky in Jamaica."
        }
      ]
    },
    {
      day: "Day 4",
      date: "Sunday",
      events: [
        {
          time: "Morning",
          header: "Panel Discussion + Acoustic Music and Dance Performance",
          desc: "Panel discussion with artists, cultural leaders, and community voices to explore Jamaica’s musical heritage and creative economy. The talk will be followed by a short acoustic set and a lively performance from a local dance troupe."
        },
        {
          time: "Late Morning",
          header: "Jamaica Deep Dive – Small Group Activities (choose one):",
          desc: "-       Jamaican Drumming & Percussion Workshop – Learn foundational reggae, nyabinghi, and mento rhythms from local musicians.\n-       Vinyl Listening & Sound System Culture Experience – Discover the history of Jamaica's sound system movement through curated listening sessions and demonstrations.\n-       Youth Soccer Match – Join local youth for a friendly football match\n-       Rastafarian Reasoning Circle – Engage in a dialogue with Rastafarian elders about spirituality, history, identity, and social justice.\n-       Coffee Experience – Explore Jamaica's coffee heritage through tastings and conversations with producers and experts.\n-       Kingston Mural & Gallery Art Tour – Meet artists and explore neighborhoods through public art, followed by a visit to local galleries and studios"
        },
        {
          time: "Afternoon/Evening",
          header: "Bob Marley Beach Celebration",
          desc: "Gather along Jamaica’s beautiful coastline for an afternoon and evening of great food, live music, and community. We’ll enjoy live music at sunset and into the evening to close out a special weekend of Getting Funky in Jamaica."
        }
      ]
    },
    {
      day: "Day 5",
      date: "Monday",
      events: [
        {
          time: "TBD",
          header: "Transfer to Government Mule’s Island Exodus",
          desc: "- https://www.islandexodus.com\nOR\nCheck-out, airport transfers"
        }
      ]
    }
  ];

  const lodgingOptions = [
    {
      name: "Courtyard by Marriott Kingston",
      tag: "Modern Comfort Option",
      desc: "A sleek, modern retreat in the city's vibrant business district. Featuring contemporary guest rooms, a refreshing outdoor pool, dynamic workspaces, and exceptional dining at The Bistro, it's the perfect base for your Kingston adventure.",
      features: ["Contemporary Guest Rooms", "Outdoor Pool & Bistro", "Fitness Center", "Heart of Kingston"],
      image: "/assets/courtyard.avif"
    },
    {
      name: "The Jamaica Pegasus",
      tag: "Classic Elegance Option",
      desc: "An landmark hotel of classic prestige in the center of Kingston. Surrounded by lush gardens and boasting views of the city and bay, it has hosted royalty, world leaders, and global superstars with timeless Jamaican hospitality.",
      features: ["Elegant Skyline Guest Rooms", "Olympic-sized Pool & Gardens", "Pegasus Club Lounge", "Timed Hospitality Tradition"],
      image: "/assets/jamaica_pegasus.jpg"
    }
  ];

  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={lineIdx} className="h-2" />;

      const isListItem = trimmed.startsWith("-");
      const cleanLine = isListItem ? trimmed.replace(/^-\s*/, "") : line;

      const parts: React.ReactNode[] = [];
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const regex = /(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g;
      const tokens = cleanLine.split(regex);

      tokens.forEach((token, tokIdx) => {
        if (token.startsWith("**") && token.endsWith("**")) {
          parts.push(
            <strong key={tokIdx} className="text-brand-heading font-bold">
              {token.slice(2, -2)}
            </strong>
          );
        } else if (token.match(urlRegex)) {
          parts.push(
            <a
              key={tokIdx}
              href={token}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline font-semibold"
            >
              {token}
            </a>
          );
        } else {
          parts.push(token);
        }
      });

      if (isListItem) {
        return (
          <div key={lineIdx} className="flex gap-2.5 pl-4 text-brand-white/80 font-sans leading-relaxed my-1.5 items-start">
            <span className="text-brand-gold mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-gold/80" />
            <span className="flex-1">{parts}</span>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="text-brand-white/80 font-sans leading-relaxed mb-2 last:mb-0">
          {parts}
        </p>
      );
    });
  };

  return (
    <section id="vip-details" className="program-section relative pb-24 md:pb-32 overflow-hidden bg-brand-green">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Tab Content Panel */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* ITINERARY TAB */}
            {activeTab === "itinerary" && (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto flex flex-col gap-8"
              >
                {/* Day Sub-tab Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {itineraryDays.map((day, idx) => (
                    <button
                      key={day.day}
                      onClick={() => setActiveDay(idx)}
                      className={`relative px-5 py-2.5 rounded-xl font-sans text-xs tracking-wider uppercase font-bold transition-all duration-300 border ${
                        activeDay === idx
                          ? "text-brand-green border-transparent"
                          : "bg-brand-dark-accent/40 text-brand-white/80 border-brand-white/10 hover:border-brand-gold/40 hover:text-brand-white"
                      }`}
                    >
                      <div className="flex flex-col items-center relative z-10">
                        <span className={`text-[9px] tracking-widest ${activeDay === idx ? "text-brand-green/80" : "text-brand-white/60"}`}>{day.day}</span>
                        <span className="text-xs font-extrabold mt-0.5">{day.date}</span>
                      </div>
                      {activeDay === idx && (
                        <motion.div
                          layoutId="activeDayPill"
                          className="absolute inset-0 rounded-xl bg-brand-gold shadow-md"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Timeline Panel */}
                <div className="itinerary-container glass-card p-6 sm:p-10 rounded-2xl border border-brand-white/5 relative overflow-hidden">
                  <div className="relative pl-8 sm:pl-12 space-y-12 py-2">
                    {/* Gradient Timeline Vertical Line */}
                    <div className="absolute left-[-2px] sm:left-[-2px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-brand-gold/60 via-brand-gold/20 to-transparent pointer-events-none" />

                    {itineraryDays[activeDay].events.map((evt, eIdx) => (
                      <div key={eIdx} className="relative group">
                        
                        {/* Glowing Timeline Node */}
                        <div className="absolute left-[-38px] sm:left-[-54px] top-2.5 w-3 h-3 rounded-full bg-brand-gold border-2 border-brand-green shadow-[0_0_8px_rgba(239,156,130,0.8)] group-hover:scale-125 transition-transform duration-300" />
                        
                        {/* Event Content */}
                        <div className="w-full">
                          
                          {/* Time tag */}
                          {evt.time && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/25 text-[9px] font-bold tracking-widest uppercase mb-3.5">
                              <Clock size={11} className="text-brand-gold" />
                              <span>{evt.time}</span>
                            </div>
                          )}

                          {/* Block header */}
                          {evt.header && (
                            <h4 className="font-serif text-lg sm:text-xl md:text-2xl text-brand-heading font-bold mb-3.5 leading-snug">
                              {evt.header}
                            </h4>
                          )}

                          {/* Narrative Paragraph */}
                          <div className="text-sm md:text-base">
                            {renderFormattedText(evt.desc)}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* LODGING TAB */}
            {activeTab === "lodging" && (
              <motion.div
                key="lodging"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              >
                {lodgingOptions.map((hotel, idx) => (
                  <div key={hotel.name} className="glass-card rounded-2xl overflow-hidden border border-brand-white/5 hover:border-brand-gold/30 transition-all duration-500 flex flex-col group h-full">
                    {/* Hotel Image Card Overlay */}
                    <div className="relative h-64 w-full overflow-hidden bg-brand-dark-accent">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-all duration-700 brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-green/85 to-transparent z-10"></div>
                      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-brand-green/70 border border-brand-gold/20 text-brand-gold text-[9px] font-bold tracking-widest uppercase backdrop-blur-sm">
                        {hotel.tag}
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                      <div>
                        <h4 className="font-serif text-2xl text-brand-heading font-bold mb-3">
                          {hotel.name}
                        </h4>
                        <p className="font-sans text-brand-white/70 text-sm leading-relaxed mb-6">
                          {hotel.desc}
                        </p>
                      </div>

                      <div>
                        <div className="w-full h-[1px] bg-brand-white/10 my-4"></div>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {hotel.features.map((feat) => (
                            <div key={feat} className="flex items-center gap-2 text-brand-white/60 text-xs font-sans">
                              <MapPin size={11} className="text-brand-gold" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* FLIGHT GUIDANCE TAB */}
            {activeTab === "flight-guidance" && (
              <motion.div
                key="flight-guidance"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto glass-card p-8 md:p-12 rounded-3xl border border-brand-white/10 shadow-2xl relative overflow-hidden group"
              >
                {/* Background decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/5 rounded-full blur-xl pointer-events-none transition-transform group-hover:scale-150"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-gold/5 rounded-full blur-xl pointer-events-none transition-transform group-hover:scale-150"></div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 shadow-inner">
                    <Plane size={28} className="animate-pulse" />
                  </div>
                  
                  <h3 id="flight-guidance" className="font-serif text-2xl sm:text-3xl text-brand-heading font-bold mb-6">
                    Flight Guidance
                  </h3>

                  <div className="space-y-6 font-sans text-brand-white/85 text-sm sm:text-base leading-relaxed text-left">
                    <p className="border-l-2 border-brand-gold/50 pl-4 py-1">
                      We recommend flying into Kingston (KIN). Please book your flight to Kingston (KIN) on Jan 14 and returning home on Jan 18. If you are attending Island Exodus after the Getting Funky trip, you should make your return flight home from Montego Bay (MBJ).
                    </p>
                    <p className="bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded-xl p-4 text-xs sm:text-sm font-semibold flex items-center gap-2">
                      <span>Note that flying into Montego Bay (MBJ) is a 2.5 hour drive from Kingston (KIN).</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Global CTA button below itinerary options */}
        <div className="mt-16 text-center">
          <a
            href="#registration"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-accent-gradient text-brand-green font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,156,130,0.6)] hover:scale-105"
          >
            <span>Register Now</span>
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
