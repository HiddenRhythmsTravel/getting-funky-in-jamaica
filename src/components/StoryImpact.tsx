"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function StoryImpact() {
  const partners = [
    {
      name: "Cimafunk",
      role: "Afro-Cuban Funk Leader",
      desc: "Grammy-nominated Cuban artist bridging Afro-Cuban rhythms with American funk and soul. Leads the musical exchange and workshops.",
      logo: "/assets/cimafunk_logo.jpg"
    },
    {
      name: "Trombone Shorty Foundation",
      role: "Youth Music Education",
      desc: "Empowering next-gen musicians in New Orleans. Directs instrument donation drives and cross-cultural music school visits.",
      logo: "/assets/trombone_shorty_logo.jpg"
    },
    {
      name: "Gia Maione Foundation",
      role: "Philanthropic Sponsor",
      desc: "Providing dedicated sponsorship and grants to fund local music instruction, school gear, and international concerts.",
      logo: "/assets/gia_maione_logo.png"
    },
    {
      name: "Hidden Rhythms",
      role: "Bespoke Travel Curator",
      desc: "Orchestrating deeply curated cultural expeditions, private logistics, and luxury support for travelers and patrons.",
      logo: "/assets/humingbird-logo.jpg"
    }
  ];

  return (
    <section id="story-impact" className="relative py-24 md:py-32 overflow-hidden bg-brand-green">
      {/* Background Parallax Texture */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Image
          src="/assets/gallery/Tropical Crowd.webp"
          alt="Tropical Crowd Background"
          fill
          className="object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green via-transparent to-brand-green"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Subpage A: Story & Impact */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="font-sans text-[10px] md:text-xs text-brand-gold font-bold tracking-[0.25em] uppercase mb-3 block">
              The Mission
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-heading font-bold mb-6 leading-tight">
              The Getting Funky <br />
              Experience
            </h2>
            <div className="font-sans text-brand-white/80 text-sm sm:text-base leading-relaxed space-y-6">
              <p>
                <strong>Getting Funky</strong> is more than a trip—it's a transformative cultural immersion that will change how you understand music, community, and connection. You'll witness legendary artists in their element, experience vibrant culture firsthand, and forge friendships that transcend borders.
              </p>
              <p>
                This exclusive event connects youth musicians with international mentors, funds schools with instruments, and explores the historic birthplaces of modern reggae. From tours of Trench Town to masterclasses at Tuff Gong Studios, every moment is curated for deep cultural connection.
              </p>
              <p>
                Experience the shared roots of Caribbean rhythms. Witness local jam sessions and celebrate under the stars with our custom promo video loop.
              </p>
              <p className="border-l-2 border-brand-gold/50 pl-4 font-serif italic text-brand-heading/90">
                "This is your access to something special, a celebration of music's power to unite, inspire, and transform."
              </p>
            </div>
          </motion.div>

          {/* Subpage B: Dedicated Partner Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <span className="font-sans text-[10px] md:text-xs text-brand-gold font-bold tracking-[0.25em] uppercase mb-3 block">
              Project Partners
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-white font-bold mb-8 leading-snug">
              Collaborative Impact Leaders
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partners.map((partner) => (
                <motion.div
                  key={partner.name}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="glass-card p-6 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Large Logo Showcase Header */}
                    <div className="relative w-full h-24 rounded-xl overflow-hidden bg-brand-dark-accent/40 border border-brand-white/10 mb-4 flex items-center justify-center p-3">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} Logo`}
                        fill
                        className={`transition-all duration-300 grayscale hover:grayscale-0 ${
                          partner.name === "Cimafunk" ? "object-cover" : "object-contain p-1.5"
                        }`}
                      />
                    </div>

                    <h4 className="font-serif text-base text-brand-heading font-semibold mb-0.5">
                      {partner.name}
                    </h4>
                    <span className="font-sans text-[9px] sm:text-[10px] text-brand-gold font-bold tracking-widest uppercase block mb-3">
                      {partner.role}
                    </span>
                    <p className="font-sans text-brand-white/70 text-xs leading-relaxed">
                      {partner.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
