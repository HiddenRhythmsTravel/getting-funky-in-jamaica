"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Building2, ShieldCheck, ArrowRight, Clock, MapPin, CheckCircle2 } from "lucide-react";

export function VipProgram() {
  const [activeTab, setActiveTab] = useState<"itinerary" | "lodging" | "packages">("itinerary");

  const itineraryDays = [
    {
      day: "Day 1 – Thursday",
      title: "Arrival & Welcome",
      events: [
        { time: "TBD", desc: "Arrival in Kingston: Arrive in Kingston and meet your Getting Funky in Jamaica hosts for airport transfers to the hotel. Settle into your accommodations, relax, and take in the vibrant energy of Jamaica’s cultural capital before an unforgettable weekend of music, culture, and connection." },
        { time: "Evening", desc: "Dinner Reception with Live Music at the Marley Museum: Celebrate Jamaica’s musical legacy with local cuisine and live performances on the grounds of the Bob Marley Museum, where Marley lived with his family and created some of the most influential music of the last century. Immerse yourself in the stories, sounds, and cultural traditions that continue to shape Jamaica’s global impact." }
      ]
    },
    {
      day: "Day 2 – Friday",
      title: "Exchange & Super Jam",
      events: [
        { time: "Morning", desc: "Morning at Kingston Music School: Spend the morning with Kingston’s youth musicians for a series of performances, workshops and instrument donations. Connect with students and educators while supporting the next generation of Jamaican artists through a meaningful instrument donation program." },
        { time: "Lunch", desc: "Lunch and Music at Local High School: Enjoy a catered lunch alongside students, faculty, and community leaders while experiencing live musical performances by Cuban, U.S. and Jamaican Youth." },
        { time: "Afternoon", desc: "R&R: Enjoy free time to relax at the hotel, explore Kingston at your own pace, or simply recharge before the evening’s cultural experiences. Your Getting Funky travel curators can help with excursion ideas and transport." },
        { time: "Evening", desc: "Rastafarian Meal in the Hills of Kingston: Gather in the lush hills overlooking Kingston for an authentic Rastafarian dining experience. Savor traditional Ital cuisine while learning about the philosophy, history, and cultural influence of the Rastafarian movement in Jamaica." },
        { time: "Night", desc: "New Orleans – Jamaica – Cuba Super Jam: Witness an extraordinary musical exchange as artists from New Orleans, Jamaica, and Cuba come together for a one-of-a-kind musical mashup. Rooted in shared rhythms and cultural traditions, this unforgettable jam session celebrates the connections that unite these three musical treasures." }
      ]
    },
    {
      day: "Day 3 – Saturday",
      title: "Trench Town & Concert",
      events: [
        { time: "Morning", desc: "Visit Historic Trench Town: Explore the legendary community widely regarded as the birthplace of modern Jamaican popular music. Visit a music school run by Damian, Stephen and Julian Marley, where we’ll interact with local youth, and explore Bob Marley’s childhood home, where he learned to play guitar and wrote many of his legendary songs." },
        { time: "Lunch", desc: "Music & Bites at Iconic Tuff Gong Studios: Enjoy a behind-the-scenes tour and lunch at Jamaica’s most iconic recording studio. Split into small groups to tour the facilities, observe local bands recording, and learn about the studio’s enduring role in Jamaica’s musical legacy. Tap off the visit with a performance in the rehearsal space." },
        { time: "Afternoon", desc: "R&R: Enjoy free time to relax at the hotel, explore Kingston at your own pace, or simply recharge before the evening’s cultural experiences. Your Getting Funky travel curators can help with excursion ideas and transport." },
        { time: "Evening", desc: "Getting Funky in Jamaica Concert: Trombone Shorty, Cimafunk ft. Top Brass + More: Cap off the day with a dynamic celebration of Caribbean and New Orleans musical traditions. Featuring performances by Trombone Shorty, Cimafunk, local artists, and special guests, this high-energy concert showcases the vibrant cultural connections that inspire Getting Funky in Jamaica. Enjoy open bar and New Orleans, Cuban and Jamaican cuisine in the VIP sections." }
      ]
    },
    {
      day: "Day 4 – Sunday",
      title: "Deep Dives & Beach Celebration",
      events: [
        { time: "Morning", desc: "Panel Discussion + Acoustic Music and Dance Performance: Panel discussion with artists, cultural leaders, and community voices to explore Jamaica’s musical heritage and creative economy. The talk will be followed by a short acoustic set and a lively performance from a local dance troupe." },
        { time: "Late Morning", desc: "Jamaica Deep Dive – Small Group Activities (choose one):\n\n• Jamaican Drumming & Percussion Workshop – Learn foundational reggae, nyabinghi, and mento rhythms from local musicians.\n\n• Vinyl Listening & Sound System Culture Experience – Discover the history of Jamaica's sound system movement through curated listening sessions and demonstrations.\n\n• Youth Soccer Match – Join local youth for a friendly football match.\n\n• Rastafarian Reasoning Circle – Engage in a dialogue with Rastafarian elders about spirituality, history, identity, and social justice.\n\n• Coffee Experience – Explore Jamaica's coffee heritage through tastings and conversations with producers and experts.\n\n• Kingston Mural & Gallery Art Tour – Meet artists and explore neighborhoods through public art, followed by a visit to local galleries and studios." },
        { time: "Afternoon", desc: "Bob Marley Beach Celebration: Gather along Jamaica’s beautiful coastline for an afternoon and evening of great food, live music, and community. We’ll enjoy live music at sunset and into the evening to close out a special weekend of Getting Funky in Jamaica." }
      ]
    },
    {
      day: "Day 5 – Monday",
      title: "Departure & Transfers",
      events: [
        { time: "TBD", desc: "Transfer to Government Mule’s Island Exodus OR Check-out, airport transfers." }
      ]
    }
  ];

  const lodgingOptions = [
    {
      name: "The Courtleigh Hotel & Suites",
      tag: "Boutique Luxury Option",
      desc: "An elegant boutique hotel in the heart of New Kingston. Offering warm Jamaican hospitality, spacious rooms and suites, award-winning dining, and a serene garden pool oasis.",
      features: ["Award-Winning Dining", "Garden Pool Oasis", "Spacious Suites", "Heart of Kingston"],
      image: "/assets/courtleigh.jpg"
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
      price: "$4,800 / person",
      features: [
        "Ultra-premium suite lodging (Pegasus / Courtleigh)",
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
    <section id="vip" className="relative py-24 md:py-32 overflow-hidden bg-brand-green border-t border-brand-white/5">
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
                className="max-w-4xl mx-auto flex flex-col gap-6"
              >
                {itineraryDays.map((day, idx) => (
                  <div key={day.day} className="glass-card p-6 md:p-8 rounded-2xl border border-brand-white/5 hover:border-brand-gold/20 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
                    <div className="md:w-1/4">
                      <span className="font-sans text-[10px] text-brand-gold font-bold tracking-widest uppercase block mb-1">
                        {day.day}
                      </span>
                      <h4 className="font-serif text-lg text-brand-heading font-bold">
                        {day.title}
                      </h4>
                    </div>

                    <div className="md:w-3/4 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-brand-white/10 pt-4 md:pt-0 md:pl-8">
                      {day.events.map((evt, eIdx) => (
                        <div key={eIdx} className="flex gap-4 items-start text-sm">
                          <div className="flex items-center gap-1.5 text-brand-gold/80 font-bold tracking-wider uppercase text-[10px] mt-0.5 w-24 flex-shrink-0">
                            <Clock size={11} />
                            <span>{evt.time}</span>
                          </div>
                          <p className="text-brand-white/80 font-sans leading-relaxed">
                            {evt.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
                        className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-all duration-700 brightness-90 grayscale hover:grayscale-0"
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
                      
                      <div className="font-serif text-xl sm:text-2xl text-brand-gold font-bold mb-6 border-b border-brand-white/10 pb-4">
                        {pkg.price}
                      </div>

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
