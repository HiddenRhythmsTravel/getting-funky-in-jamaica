import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { SEOHead, buildSEOMetadata } from "@/components/SEOHead";
import { DESTINATIONS_DATA } from "@/data/destinations";
import { MapPin, Music, Sparkles, Calendar, ChevronRight, CheckCircle2 } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"] });

export async function generateStaticParams() {
  return Object.keys(DESTINATIONS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = DESTINATIONS_DATA[slug];

  if (!destination) {
    return {
      title: "Destination Not Found | Hidden Rhythms",
    };
  }

  return buildSEOMetadata({
    title: destination.title,
    description: destination.description,
    slug: destination.slug,
    keywords: destination.keywords,
  });
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = DESTINATIONS_DATA[slug];

  if (!destination) {
    notFound();
  }

  const otherDestinations = Object.values(DESTINATIONS_DATA).filter(
    (d) => d.slug !== destination.slug
  );

  return (
    <>
      {/* Structured Data & Head elements */}
      <SEOHead
        title={destination.title}
        description={destination.description}
        slug={destination.slug}
        keywords={destination.keywords}
        schemaType={destination.schemaType}
      />

      <main className="min-h-screen bg-brand-green text-brand-white font-sans selection:bg-brand-gold selection:text-brand-green">
        {/* HERO SECTION */}
        <section className="relative min-h-[75vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden border-b border-brand-gold/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-green/80 via-black/90 to-black/95 z-0" />
          
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 blur-[140px] rounded-full pointer-events-none z-0" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* Location Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>{destination.locationName}</span>
            </div>

            {/* Main Header */}
            <h1 className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl font-medium text-brand-white mb-6 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]`}>
              {destination.heroHeader}
            </h1>

            {/* Subheader */}
            <p className="text-lg md:text-xl text-brand-white/80 max-w-3xl mx-auto font-light leading-relaxed mb-10">
              {destination.subHeader}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-gold text-brand-green font-semibold text-sm tracking-widest uppercase hover:bg-brand-white transition-all shadow-[0_8px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)]"
              >
                Inquire About {destination.locationName.split(",")[0]}
              </Link>
              <a
                href="#overview"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-brand-white/20 text-brand-white font-semibold text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-all"
              >
                Explore Experience
              </a>
            </div>

            {/* Curated Soundscape Badge */}
            <div className="mt-12 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/40 border border-brand-white/10 backdrop-blur-md">
              <Music className="w-4 h-4 text-brand-gold animate-pulse" />
              <span className="text-xs text-brand-white/70">
                Native Soundtrack: <strong className="text-brand-gold font-medium">{destination.soundtrackTitle}</strong> ({destination.soundtrackArtist})
              </span>
            </div>
          </div>
        </section>

        {/* OVERVIEW SECTION */}
        <section id="overview" className="py-20 px-6 max-w-5xl mx-auto border-b border-brand-gold/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-4">
              <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.3em] block mb-3">
                The Experience
              </span>
              <h2 className={`${playfair.className} text-3xl md:text-4xl font-medium text-brand-white`}>
                Authentic Cultural Immersion
              </h2>
            </div>
            <div className="md:col-span-8 text-brand-white/80 font-light leading-relaxed text-base md:text-lg">
              <p>{destination.overview}</p>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS SECTION */}
        <section className="py-24 px-6 max-w-6xl mx-auto border-b border-brand-gold/10">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.3em] block mb-3">
              Curated Access
            </span>
            <h2 className={`${playfair.className} text-3xl md:text-5xl font-medium text-brand-white mb-4`}>
              Key Experience Highlights
            </h2>
            <p className="text-brand-white/70 max-w-2xl mx-auto font-light text-sm md:text-base">
              Every detail is designed for unmatched privacy, cultural authenticity, and VIP access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destination.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-black/30 border border-brand-gold/20 hover:border-brand-gold/50 backdrop-blur-sm transition-all duration-300 shadow-xl group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-brand-green transition-all">
                  <Sparkles className="w-5 h-5 text-brand-gold group-hover:text-brand-green" />
                </div>
                <h3 className={`${playfair.className} text-xl font-medium text-brand-white mb-3`}>
                  {highlight.title}
                </h3>
                <p className="text-sm text-brand-white/70 font-light leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SAMPLE ITINERARY FLOW */}
        <section className="py-24 px-6 max-w-5xl mx-auto border-b border-brand-gold/10">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.3em] block mb-3">
              Journey Arc
            </span>
            <h2 className={`${playfair.className} text-3xl md:text-5xl font-medium text-brand-white mb-4`}>
              Sample Curated Itinerary
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-brand-gold/20">
            {destination.itinerary.map((item, idx) => (
              <div key={idx} className="relative flex flex-col md:flex-row items-start group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-gold text-brand-green font-bold text-xs z-10 self-start mb-4 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2 shadow-lg">
                  {idx + 1}
                </div>
                <div className={`w-full md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-black/40 border border-brand-white/10 ${idx % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                  <span className="text-xs font-semibold text-brand-gold tracking-widest uppercase block mb-1">
                    {item.day}
                  </span>
                  <h3 className={`${playfair.className} text-xl font-medium text-brand-white mb-2`}>
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-white/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIAL QUOTE */}
        <section className="py-20 px-6 max-w-4xl mx-auto text-center border-b border-brand-gold/10">
          <div className="p-10 rounded-2xl bg-gradient-to-b from-black/50 to-brand-green/40 border border-brand-gold/30 shadow-2xl">
            <p className={`${playfair.className} text-2xl md:text-3xl font-normal italic text-brand-gold mb-6`}>
              &ldquo;{destination.quote.text}&rdquo;
            </p>
            <span className="text-xs text-brand-white/60 uppercase tracking-[0.25em] font-semibold">
              — {destination.quote.author}
            </span>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="py-24 px-6 max-w-4xl mx-auto border-b border-brand-gold/10">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.3em] block mb-3">
              Frequently Asked Questions
            </span>
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-medium text-brand-white`}>
              Planning Your {destination.locationName.split(",")[0]} Journey
            </h2>
          </div>

          <div className="space-y-6">
            {destination.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-black/30 border border-brand-white/10">
                <h3 className="text-base md:text-lg font-semibold text-brand-gold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-brand-white/80 font-light leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CROSS-DESTINATION SILOS NAVIGATION */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.3em] block mb-2">
              Explore More Silos
            </span>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-medium text-brand-white`}>
              Other Hidden Rhythms Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {otherDestinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="p-4 rounded-lg bg-black/40 border border-brand-white/10 hover:border-brand-gold transition-all text-left group"
              >
                <span className="text-[10px] text-brand-gold font-semibold uppercase tracking-widest block mb-1">
                  {dest.locationName.split(",")[0]}
                </span>
                <h4 className={`${playfair.className} text-sm font-medium text-brand-white group-hover:text-brand-gold transition-colors flex items-center justify-between`}>
                  <span>{dest.title.split("|")[0].trim()}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
              </Link>
            ))}
          </div>
        </section>

        {/* INQUIRY FOOTER CTA */}
        <section className="py-16 px-6 bg-black/80 text-center border-t border-brand-gold/20">
          <div className="max-w-3xl mx-auto">
            <h3 className={`${playfair.className} text-3xl font-medium text-brand-white mb-4`}>
              Ready to Experience {destination.locationName.split(",")[0]}?
            </h3>
            <p className="text-brand-white/70 mb-8 font-light text-sm">
              Contact our trip architects to curate your private journey or executive forum retreat.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-8 py-4 rounded-full bg-brand-gold text-brand-green font-semibold text-sm tracking-widest uppercase hover:bg-brand-white transition-all shadow-lg"
            >
              Start Planning Now
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
