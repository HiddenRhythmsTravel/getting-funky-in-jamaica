"use client";

import { motion } from "framer-motion";
import { Plane, MapPin, Compass } from "lucide-react";

export function FlightGuidance() {
  const directHubs = [
    {
      city: "Miami, FL (MIA)",
      airline: "American Airlines",
      duration: "1h 50m",
      highlights: "Multiple daily non-stops; ideal for West Coast/Texas connections."
    },
    {
      city: "New York, NY (JFK)",
      airline: "JetBlue Airways, Caribbean Airlines",
      duration: "3h 50m",
      highlights: "4–6 daily flights; primary hub for Tri-State & Northeast guests."
    },
    {
      city: "Fort Lauderdale, FL (FLL)",
      airline: "JetBlue Airways, Spirit Airlines",
      duration: "1h 45m",
      highlights: "Frequent daily flights; convenient for South Florida locals."
    },
    {
      city: "Atlanta, GA (ATL)",
      airline: "Delta Air Lines",
      duration: "2h 45m",
      highlights: "Daily direct flights; best for Delta loyalists & Southeast connections."
    },
    {
      city: "Orlando, FL (MCO)",
      airline: "JetBlue Airways",
      duration: "2h 10m",
      highlights: "Regular direct flights; quick Central Florida link."
    }
  ];

  const connections = [
    {
      region: "Northeast",
      cities: "EWR, LGA, BOS, PHL, BWI",
      hubs: "JFK, MIA, or ATL",
      airlines: "JetBlue, American, Delta"
    },
    {
      region: "Midwest",
      cities: "ORD, MDW, DTW, MSP, CLE",
      hubs: "MIA or ATL",
      airlines: "American, Delta"
    },
    {
      region: "South / Central",
      cities: "DFW, IAH, CLT, DCA, BNA",
      hubs: "MIA or ATL",
      airlines: "American, Delta"
    },
    {
      region: "West Coast",
      cities: "LAX, SFO, SEA, DEN, PHX",
      hubs: "MIA, ATL, or JFK",
      airlines: "American, Delta, JetBlue"
    }
  ];

  return (
    <section id="flight-guidance" className="relative py-24 md:py-32 overflow-hidden bg-brand-green border-t border-brand-white/5">
      {/* Background Decorative Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-tropical-burgundy/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="font-sans text-[10px] md:text-xs text-brand-gold font-bold tracking-[0.25em] uppercase mb-3 block">
            Travel Planning
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-heading font-bold mb-6">
            Flight Guidance
          </h2>
          <p className="font-sans text-brand-white/80 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Kingston (KIN) is highly accessible from the US with direct flights and convenient 1-stop connections. Review the curated gateways below to map out your journey.
          </p>
        </div>

        {/* Section A: Direct Hubs */}
        <div className="mb-20 md:mb-28">
          <div className="text-center md:text-left mb-10">
            <h3 className="font-serif text-xl sm:text-2xl text-brand-heading font-bold mb-2">
              Non-Stop Direct Hubs to Kingston, Jamaica (KIN)
            </h3>
            <p className="font-sans text-xs md:text-sm text-brand-gold tracking-wider uppercase font-semibold">
              Fastest direct options for January 14–18, 2027
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directHubs.map((hub, idx) => (
              <motion.div
                key={hub.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 md:p-8 rounded-2xl border border-brand-white/10 hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-full bg-brand-gold/10 text-brand-gold">
                        <MapPin size={18} />
                      </div>
                      <h4 className="font-serif text-lg md:text-xl text-brand-heading font-bold">
                        {hub.city}
                      </h4>
                    </div>
                    <Plane className="text-brand-white/30 group-hover:text-brand-gold transition-colors duration-300" size={18} />
                  </div>

                  <div className="space-y-3 mt-4 text-xs sm:text-sm font-sans">
                    <div className="flex justify-between border-b border-brand-white/5 pb-2">
                      <span className="text-brand-white/40">Airlines</span>
                      <span className="text-brand-white/90 font-medium text-right">{hub.airline}</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-white/5 pb-2">
                      <span className="text-brand-white/40">Duration</span>
                      <span className="text-brand-gold font-bold">{hub.duration}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-brand-white/60 mt-6 leading-relaxed border-l border-brand-gold/30 pl-3">
                  {hub.highlights}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section B: Connecting Gateways */}
        <div>
          <div className="text-center md:text-left mb-10">
            <h3 className="font-serif text-xl sm:text-2xl text-brand-heading font-bold mb-2">
              Popular 1-Stop Connecting Gateways
            </h3>
            <p className="font-sans text-xs md:text-sm text-brand-gold tracking-wider uppercase font-semibold">
              For cities without direct service to Kingston
            </p>
          </div>

          <div className="glass-card rounded-2xl border border-brand-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-brand-white/10 bg-brand-dark-accent/40 font-sans font-bold text-brand-gold uppercase tracking-wider">
                    <th className="p-4 sm:p-6">US Departure Region</th>
                    <th className="p-4 sm:p-6">Sample Cities</th>
                    <th className="p-4 sm:p-6">Connecting Hubs</th>
                    <th className="p-4 sm:p-6">Primary Airlines</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-white/5 text-brand-white/80 font-sans">
                  {connections.map((conn) => (
                    <tr key={conn.region} className="hover:bg-brand-white/5 transition-colors">
                      <td className="p-4 sm:p-6 font-bold text-brand-white">{conn.region}</td>
                      <td className="p-4 sm:p-6 text-brand-white/60">{conn.cities}</td>
                      <td className="p-4 sm:p-6">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/35 text-brand-gold font-semibold text-[11px]">
                          {conn.hubs}
                        </span>
                      </td>
                      <td className="p-4 sm:p-6 font-medium">{conn.airlines}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
