"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Ticket, ShieldCheck, Copy, Check } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

export function RegistrationPortal() {
  const zohoPortalUrl = "https://forms.zohopublic.com/caribbeanexecutivetravel1/form/HRTTravelRegistration/formperma/SHoOEyI-cABdddRGuEWJtOC16QHkqKNZAqN8ONrdI6M";
  const { playRegistrationOverride } = useAudio();
  
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText("FunkyJ2027");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="register" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-brand-green to-brand-dark-accent">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* Main Card with viewport scroll trigger for audio override */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => {
            playRegistrationOverride();
          }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative glass-card p-8 md:p-16 rounded-3xl border border-brand-gold/30 shadow-2xl overflow-hidden flex flex-col items-center text-center"
        >
          {/* Decorative Corner Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mb-6 px-4 py-1.5 rounded-full bg-brand-gold text-brand-green font-sans text-[10px] font-extrabold tracking-[0.2em] uppercase shadow-lg inline-flex items-center gap-1.5"
          >
            <Ticket size={12} />
            <span>Registration Open</span>
          </motion.div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl text-brand-white font-bold mb-4">
            Register Now
          </h2>
          
          <p className="font-sans text-brand-white/80 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed italic">
            Ground package registration is officially open. Please see below for an overview on the package, and then click through to the registration to sign up and select your package option. Registration is completed on our registration portal, and you will need the Trip ID: <strong className="text-brand-gold font-bold">FunkyJ2027</strong> to see the package offerings.
          </p>

          {/* Inclusions & Exclusions */}
          <div className="w-full max-w-2xl mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left border border-brand-white/10 bg-brand-green/25 rounded-2xl p-6">
            <div>
              <h4 className="font-serif text-xs font-bold text-brand-heading mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                <span>Included</span>
              </h4>
              <ul className="space-y-2 text-xs text-brand-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>4-nights’ accommodations in Kingston, Jamaica</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>All activities, speaker fees, entertainment, meals, and event production as described on the program</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>Dedicated professional guides and Hidden Rhythms concierge team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>Local ground transportation to and from all activities listed on the program</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>Pre-trip departure information</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xs font-bold text-brand-heading mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-white/30"></span>
                <span>Not Included</span>
              </h4>
              <ul className="space-y-2 text-xs text-brand-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-brand-white/40 mt-0.5">•</span>
                  <span>Airfare</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-white/40 mt-0.5">•</span>
                  <span>Personal hotel incidentals, including additional nights’ accommodations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-white/40 mt-0.5">•</span>
                  <span>Meals, drinks, activities, or additional events not listed on the program</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-white/40 mt-0.5">•</span>
                  <span>Tips for hotel staff, guides, and drivers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            {/* Primary Redirect button */}
            <a
              href={zohoPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4.5 rounded-full bg-accent-gradient text-brand-green font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,156,130,0.6)] hover:scale-105"
            >
              <span>Register Now</span>
              <ExternalLink size={14} />
            </a>

            {/* Mobile Trip ID Helper */}
            <button
              onClick={handleCopyId}
              className="inline-flex items-center gap-2 px-6 py-4.5 rounded-full border border-brand-gold/40 hover:border-brand-gold text-brand-gold bg-brand-gold/5 transition-all duration-300 font-sans text-xs tracking-wider uppercase font-semibold cursor-pointer"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? "Copied ID!" : "Copy Trip ID (FunkyJ2027)"}</span>
            </button>
          </div>

          {/* Verification note */}
          <div className="flex items-center gap-1.5 mt-6 text-[9px] text-brand-white/40 tracking-wider uppercase font-semibold">
            <ShieldCheck size={11} className="text-brand-gold/60" />
            <span>Trip ID: FunkyJ2027</span>
          </div>

        </motion.div>

        {/* Footer info branding */}
        <div className="mt-16 text-center text-[10px] text-brand-white/40 font-sans tracking-widest uppercase">
          <p>© 2027 Hidden Rhythms / Getting Funky. All Rights Reserved.</p>
          <p className="mt-2 text-brand-gold/30">Gettingfunkyinjamaica.com Staging Environment</p>
        </div>

      </div>
    </section>
  );
}
