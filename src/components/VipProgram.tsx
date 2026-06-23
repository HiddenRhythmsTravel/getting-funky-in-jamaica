"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Building2, ShieldCheck, ArrowRight, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

export function VipProgram() {
  const [activeTab, setActiveTab] = useState<"itinerary" | "lodging" | "packages">("itinerary");
  const [activeDay, setActiveDay] = useState(0);
  const { forceVIPTrack } = useAudio();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          forceVIPTrack();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [forceVIPTrack]);

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
      desc: "A landmark of Kingston luxury. Nestled amidst lush tropical gardens in the city's financial hub, this hotel offers spacious suites, executive facilities, fine dining, and mountain vistas.",
      features: ["Skyline Views", "Tropical Gardens", "Executive Lounge", "Spacious Suites"],
      image: "/assets/jamaica_pegasus.jpg"
    }
  ];

  const packages = [
    {
      name: "Patron VIP Experience",
      desc: "The ultimate curated access, helping fund our youth initiatives.",
      price: "",
      features: [
        "Ultra-premium suite lodging (Pegasus / Courtyard)",
        "All-access passes to all concerts & rehearsals",
        "Exclusive dinner reception at Bob Marley Museum",
        "Rastafarian Hills private dining event",
        "All group lunches, tours, and choice activities",
        "Dedicated private host and luxury airport transfers",
        "Philanthropic donation receipt for school programs"
      ],
      popular: true
    }
  ];

  return (
    <section ref={sectionRef} id="vip" className="relative py-24 md:py-32 overflow-hidden bg-brand-green border-t border-brand-white/5">
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
          
          {/* Tab Navigation Buttons */}
          <div className="inline-flex p-1.5 rounded-full bg-brand-dark-accent/60 backdrop-blur-md border border-brand-white/10 font-sans text-xs tracking-widest uppercase font-bold text-brand-white/70">
            <button
              onClick={() => setActiveTab("itinerary")}
              className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                activeTab === "itinerary" ? "bg-brand-gold text-brand-green shadow-md" : "hover:text-brand-white"
              }`}
            >
              <Calendar size={14} />
              <span>Itinerary</span>
            </button>
            <button
              onClick={() => setActiveTab("lodging")}
              className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                activeTab === "lodging" ? "bg-brand-gold text-brand-green shadow-md" : "hover:text-brand-white"
              }`}
            >
              <Building2 size={14} />
              <span>Lodging</span>
            </button>
            <button
              onClick={() => setActiveTab("packages")}
              className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                activeTab === "packages" ? "bg-brand-gold text-brand-green shadow-md" : "hover:text-brand-white"
              }`}
            >
              <ShieldCheck size={14} />
              <span>Packages</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="min-h-[500px]">
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
                <div className="glass-card p-6 sm:p-10 rounded-2xl border border-brand-white/5 relative overflow-hidden">
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

            {/* PACKAGES TAB */}
            {activeTab === "packages" && (
              <motion.div
                key="packages"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className={`grid grid-cols-1 ${packages.length > 1 ? "md:grid-cols-2 max-w-4xl" : "max-w-lg"} gap-8 mx-auto items-stretch`}
              >
                {packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`glass-card p-8 rounded-3xl flex flex-col justify-between h-full border ${
                      pkg.popular ? "border-brand-gold shadow-[0_0_30px_rgba(239,156,130,0.15)]" : "border-brand-white/5"
                    }`}
                  >
                    <div>
                      {pkg.popular && (
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-gold text-brand-green text-[9px] font-extrabold tracking-widest uppercase mb-4 shadow">
                          RECOMMENDED
                        </span>
                      )}
                      <h4 className="font-serif text-2xl text-brand-heading font-bold mb-2">
                        {pkg.name}
                      </h4>
                      <p className="font-sans text-brand-white/65 text-xs mb-6">
                        {pkg.desc}
                      </p>
                      
                      {pkg.price && (
                        <div className="font-serif text-xl sm:text-2xl text-brand-gold font-bold mb-6 border-b border-brand-white/10 pb-4">
                          {pkg.price}
                        </div>
                      )}

                      <ul className="space-y-4">
                        {pkg.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-3 text-brand-white/85 text-xs sm:text-sm font-sans leading-snug">
                            <CheckCircle2 size={15} className="text-brand-gold flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10">
                      <a
                        href="#register"
                        className={`w-full py-4 rounded-full font-bold tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 uppercase shadow-md ${
                          pkg.popular
                            ? "bg-accent-gradient text-brand-green hover:shadow-[0_0_20px_rgba(239,156,130,0.4)]"
                            : "border border-brand-white/20 text-brand-white hover:bg-brand-white hover:text-brand-green hover:border-transparent"
                        }`}
                      >
                        <span>Select Tier</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Global CTA button below itinerary options */}
        <div className="mt-16 text-center">
          <a
            href="#register"
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
