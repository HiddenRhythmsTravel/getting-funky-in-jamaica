"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function StoryImpact() {
  const partners = [
    {
      name: "Trombone Shorty Foundation",
      role: "Youth Music Education",
      desc: "Trombone Shorty Foundation delivers a broad range of programs to New Orleans youth ages 12 – 24. Designed under the guidance of our namesake, Troy “Trombone Shorty” Andrews, and in collaboration with the youth we serve, our programs honor the time-honored tradition of passing on the musical heritage and culture of New Orleans.",
      logo: "/assets/trombone_shorty_logo.jpg"
    },
    {
      name: "Zankel Music Fund",
      role: "Philanthropic Partner",
      desc: "The Zankel Music Fund seeds, grows, supports and sustains 501 (c)(3) orgs employing music as an instrument for change. We are proud to be supporting and adding to the Getting Funky project.",
      logo: "/assets/zankel_logo.jpg"
    },
    {
      name: "Hidden Rhythms",
      role: "Bespoke Travel Curator",
      desc: "CET's sister brand for all trips outside of Havana, Hidden Rhythms is an extension of what we have excelled at for decades – producing highly impactful and unique events, connecting our guests with the unique places we bring them to.",
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
                <strong>Getting Funky in Jamaica</strong> is a powerful cultural immersion experience that harnesses the power of music and community to celebrate the deep historical and cultural connections between Jamaica, New Orleans, and Cuba. Acclaimed artists from these three musical powerhouses come together with Jamaica, New Orleanian and Cuban youth musicians for school visits, workshops, intimate jam sessions, cultural exchanges, and live performances.
              </p>
              <p>
                Building on the success of four historic editions of <strong>Getting Funky in Havana</strong>, this new chapter in Jamaica highlights the shared African roots and profound cultural impact of Jamaica, New Orleans, and Cuba, while creating meaningful opportunities for artistic collaboration, cross-cultural learning, and the next generation of musicians.
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
              {partners.map((partner, idx) => (
                <motion.div
                  key={partner.name}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`glass-card p-6 rounded-2xl flex flex-col justify-between items-center text-center ${
                    idx === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {/* Centered Circular Logo Showcase Header */}
                    <div className="relative w-28 h-28 rounded-full overflow-hidden bg-brand-dark-accent/40 border border-brand-gold/30 hover:border-brand-gold/60 transition-all duration-300 mb-4 flex items-center justify-center p-1 hover:shadow-[0_0_20px_rgba(245,124,0,0.4)]">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} Logo`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <h4 className="font-serif text-base text-brand-heading font-semibold mb-0.5">
                      {partner.name}
                    </h4>
                    <span className="font-sans text-[9px] sm:text-[10px] text-brand-gold font-bold tracking-widest uppercase block mb-3">
                      {partner.role}
                    </span>
                    <p className="font-sans text-brand-white/70 text-xs leading-relaxed max-w-md">
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
