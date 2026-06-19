"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Info, Ticket, FileText, ShieldCheck, Copy, Check } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { SignatureModal } from "./SignatureModal";

export function RegistrationPortal() {
  const zohoPortalUrl = "https://forms.zohopublic.com/caribbeanexecutivetravel1/form/HRTTravelRegistration/formperma/SHoOEyI-cABdddRGuEWJtOC16QHkqKNZAqN8ONrdI6M";
  const { playRegistrationOverride } = useAudio();
  
  const [copied, setCopied] = useState(false);
  const [sigModalOpen, setSigModalOpen] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText("FunkyJ2027");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const packages = [
    {
      name: "Standard Package (Double Occupancy)",
      price: "$4,790",
      per: "per person",
      details: "Standard luxury double occupancy room accommodations. Includes all program activities, masterclasses, group dining, and dedicated Hidden Rhythms concierge services."
    },
    {
      name: "Standard Package (Single Occupancy)",
      price: "$5,290",
      per: "per person",
      details: "Standard luxury single occupancy room accommodations. Includes all program activities, masterclasses, group dining, and dedicated Hidden Rhythms concierge services."
    },
    {
      name: "Upgraded Package (Double Occupancy)",
      price: "$4,990",
      per: "per person",
      details: "Upgraded premium double occupancy room/suite accommodations. Includes all program activities, masterclasses, group dining, and dedicated Hidden Rhythms concierge services."
    },
    {
      name: "Upgraded Package (Single Occupancy)",
      price: "$5,690",
      per: "per person",
      details: "Upgraded premium single occupancy room/suite accommodations. Includes all program activities, masterclasses, group dining, and dedicated Hidden Rhythms concierge services."
    }
  ];

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
          
          <p className="font-sans text-brand-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Ground package registration is officially open. Please review the pricing options and the terms below. Registration is completed via the portal using Trip ID: <span className="text-brand-gold font-bold">FunkyJ2027</span>.
          </p>

          {/* Pricing Tiers */}
          <div className="relative w-full max-w-2xl mb-8 rounded-2xl overflow-hidden border border-brand-white/5 bg-brand-green/20 p-6 text-left">
            <div className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-wider text-[10px] mb-4">
              <Info size={14} />
              <span>Ground Package Pricing Tiers</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <div key={pkg.name} className="p-5 rounded-xl border border-brand-white/10 bg-brand-dark-accent/40 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-xs font-bold text-brand-heading mb-1">{pkg.name}</h4>
                    <p className="font-sans text-[10px] text-brand-white/50 leading-relaxed mb-4">{pkg.details}</p>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-sans text-xl font-bold text-brand-gold">{pkg.price}</span>
                    <span className="font-sans text-[9px] text-brand-white/40">{pkg.per}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-brand-white/40 mt-3 italic">*Ground packages only. International airfare is not included.</p>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="w-full max-w-2xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left border border-brand-white/10 bg-brand-green/25 rounded-2xl p-6">
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

          {/* Scrollable Memo of Understanding / Sales Agreement Box */}
          <div className="w-full max-w-2xl mb-10 border border-brand-gold/30 rounded-2xl bg-brand-dark-accent/40 p-6 text-left shadow-inner flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-brand-white/10">
              <FileText className="text-brand-gold w-5 h-5 flex-shrink-0" />
              <div>
                <h4 className="font-serif text-sm font-bold text-brand-white">MEMO OF UNDERSTANDING & SALES AGREEMENT</h4>
                <p className="font-sans text-[9px] text-brand-white/50 uppercase tracking-widest">Getting Funky in Jamaica | January 14-18, 2027</p>
              </div>
            </div>

            <div className="h-64 overflow-y-auto pr-3 font-sans text-xs text-brand-white/80 space-y-4 scrollbar-thin scrollbar-thumb-brand-gold/20 scrollbar-track-transparent">
              <p className="italic text-brand-white/70">
                Please read carefully our company policies listed below. It is your responsibility to inquire about and fully understand change and cancellation policies regarding your travel arrangements.
              </p>

              <div>
                <h5 className="font-serif text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Ground Package Pricing</h5>
                <div className="overflow-x-auto rounded-lg border border-brand-white/10 bg-brand-green/20">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-brand-white/10 bg-brand-dark-accent/30 text-[10px] text-brand-gold uppercase font-semibold">
                        <th className="p-2.5">Package Type</th>
                        <th className="p-2.5">Standard</th>
                        <th className="p-2.5">Upgraded</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-white/5">
                      <tr>
                        <td className="p-2.5 font-semibold text-brand-white">Single Occupancy</td>
                        <td className="p-2.5">$5,290</td>
                        <td className="p-2.5">$5,690</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-brand-white">Double Occupancy</td>
                        <td className="p-2.5">$4,790</td>
                        <td className="p-2.5">$4,990</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-brand-white/50 mt-1">*Ground package pricing only. Airfare not included.</p>
              </div>

              <div>
                <h5 className="font-serif text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Terms and Conditions</h5>
                
                <div className="space-y-3 pl-2 border-l border-brand-gold/20">
                  <div>
                    <h6 className="font-semibold text-brand-white mb-1 uppercase text-[10px] tracking-wider">Payment Schedule</h6>
                    <ul className="list-disc list-inside space-y-1 text-brand-white/70">
                      <li>Deposit payment and a completed traveler registration form is due no later than August 1, 2026.</li>
                      <li>Traveler Registrations can be made via our online portal using the Trip ID: <strong className="text-brand-gold font-bold">FunkyJ2027</strong>.</li>
                      <li>Full payment will be due no later than October 1, 2026.</li>
                      <li>Please inquire if you are interested in purchasing trip insurance from a certified third party.</li>
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-semibold text-brand-white mb-1 uppercase text-[10px] tracking-wider">Accepted Payment Methods</h6>
                    <p className="mb-2 text-brand-white/70">
                      Payment can be made with a check, cashier’s check, or money order. We can also accept digital payments in the form of ACH or wire. Credit cards are not accepted.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-brand-green/20 border border-brand-white/5 rounded-xl text-[11px] leading-relaxed">
                      <div>
                        <strong className="text-brand-gold block mb-1">ACH / Wire Details:</strong>
                        <p>Bank of America</p>
                        <p>Account #: 483111406893</p>
                        <p>Routing #: 021000322 (for ACH)</p>
                        <p>Wires: 026009593</p>
                        <p>Zelle Tag: hiddenrhythmstravel-llc</p>
                      </div>
                      <div>
                        <strong className="text-brand-gold block mb-1">Checks (Pay to Hidden Rhythms Travel):</strong>
                        <p>Hidden Rhythms</p>
                        <p>Attn: Getting Funky 2027</p>
                        <p>136 Sequams Lane W.</p>
                        <p>West Islip, NY 11795</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 className="font-semibold text-brand-white mb-1 uppercase text-[10px] tracking-wider">Cancellation & Replacement Policies</h6>
                    <ul className="list-disc list-inside space-y-1 text-brand-white/70">
                      <li>The sale is considered final.</li>
                      <li>Cancellations prior to August 1, 2026 are eligible for a full refund.</li>
                      <li>Cancellations made between August 2, 2026 and September 30, 2026 are eligible for a 50% refund.</li>
                      <li>Cancellations made on or after October 1, 2026 are nonrefundable.</li>
                      <li>In some instances, a different traveler can take the place of a scheduled participant for a processing fee of $350.</li>
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-semibold text-brand-white mb-1 uppercase text-[10px] tracking-wider">Trip Cancellation Insurance</h6>
                    <p className="text-brand-white/70">
                      We recommend Allianz Global Travel Insurance - specifically their Classic with RTW (Requirement to Work - allows you to cancel for work related reasons), Premier Plan or Classic with Cancel Anytime. The plans are based on individuals - so each member will need to purchase their own plan to cover their own per person trip cost.
                    </p>
                  </div>

                  <div>
                    <h6 className="font-semibold text-brand-white mb-1 uppercase text-[10px] tracking-wider">Unused Services & Refunds</h6>
                    <p className="text-brand-white/70">
                      All travelers are required to carry a valid passport. No refund or adjustment can be made for any portion of the services not used such as voluntary non-usage of hotel accommodations, scheduled meals or any planned activity described in your itinerary.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-serif text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Responsibility Statement</h5>
                <div className="space-y-3 pl-2 border-l border-brand-gold/20 text-brand-white/70 leading-relaxed">
                  <p>
                    Hidden Rhythms serves only to assist in making necessary travel arrangements for its participating members, and in no way represents, or acts as agent for, transportation carriers, hotels, and other suppliers of services connected with this tour. Therefore, is not liable for any injury, damage, loss, accident, delay or other irregularity which may be caused by the defect of any vehicle or the negligence or default of any company or person engaged in performing any of the services involved. Additionally, responsibility is not accepted for losses or expenses due to sickness, weather, strike, hostilities, wars, natural disasters or other such causes. All services and accommodations are subject to the laws of the country in which they are provided. Hidden Rhythms does not accept liability for any airline cancellation or delay incurred by the purchase of an airline ticket. Baggage and personal effects are always the sole responsibility of the owners. Hidden Rhythms reserves the right to make changes in the published itineraries whenever, in its sole judgment, conditions so warrant, or if they deem it necessary for the comfort, convenience or safety of the tour participants.
                  </p>
                  <p>
                    Hidden Rhythms also reserves the right to decline to accept any person as a participant in the tours, or to require any participant to withdraw from the tour at any time, when such an action is determined by the appropriate Hidden Rhythms staff representative to be in the best interests of the health, safety, and general welfare of the tour group, or of the individual participant.
                  </p>
                  <p>
                    The undersigned has read carefully the schedule of activities for this tour. The undersigned recognizes that there is a moderate level of physical activity involved in the tour and the tour may require participants to walk long distances and climb stairs. The undersigned accepts any risks thereof and the conditions set forth therein. The undersigned agrees to release and hold harmless Hidden Rhythms any of their officers or representatives from any and all liability for delays, injuries or death, or for the loss of or damage to, his/her property however occurring during any portion of the program. The undersigned agrees to release and hold harmless Hidden Rhythms any of their officers or representatives from any and all liability for delays, injuries or death, or for the loss of or damage to, his/her property however occurring during any portion of the program. The undersigned accepts any risks associated with additional excursions such as helicopter tours, and holds harmless Hidden Rhythms or any officers or representatives.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-brand-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <span className="font-sans text-[9px] text-brand-gold font-semibold uppercase tracking-wider">
                Digital Agreement Box
              </span>
              <span className="font-sans text-[9px] text-brand-white/50">
                Read carefully. Click "Sign Sales Agreement" below to execute.
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
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

            {/* Sales Agreement Digital Signature Button */}
            <button
              onClick={() => setSigModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-4.5 rounded-full border border-brand-white/10 hover:border-brand-gold text-brand-white hover:text-brand-gold bg-brand-white/5 transition-all duration-300 font-sans text-xs tracking-wider uppercase font-semibold cursor-pointer"
            >
              <span>Sign Sales Agreement</span>
              <FileText size={14} />
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

      {/* Signature Modal Overlay */}
      <SignatureModal isOpen={sigModalOpen} onClose={() => setSigModalOpen(false)} />
    </section>
  );
}
