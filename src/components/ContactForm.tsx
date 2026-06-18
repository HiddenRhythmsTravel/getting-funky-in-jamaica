"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User, Globe, MessageSquare } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  destination: z.string().min(1, "Please select a destination"),
  message: z.string().min(10, "Please tell us a bit more about your trip"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "getting-funky",
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Send data to Web3Forms for live email & CRM delivery (Zoho CRM integration)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8cfbcfb9-46c1-4c6c-bed4-f75535dc3981", // Hardcoded Web3Forms Public Key for guaranteed delivery
          from_name: "Getting Funky in Jamaica Website",
          subject: "New Journey Inquiry: " + (data.destination.charAt(0).toUpperCase() + data.destination.slice(1)),
          source: "Getting Funky in Jamaica Contact Form",
          ...data,
        }),
      });

      const result = await response.json();
      if (result.success) {
        reset();
      } else {
        console.error("Submission failed:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section id="contact-form" className="relative py-24 md:py-32 overflow-hidden bg-brand-green border-t border-brand-white/5">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="font-sans text-[10px] md:text-xs text-brand-gold font-bold tracking-[0.25em] uppercase mb-3 block">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-heading font-bold mb-4 leading-tight">
            Find Your Rhythm
          </h2>
          <p className="font-sans text-brand-white/75 text-sm md:text-base tracking-wide max-w-lg mx-auto">
            Connect with our curation team to begin designing your bespoke cultural immersion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="glass-card p-8 md:p-14 rounded-3xl border border-brand-gold/30 shadow-2xl"
        >
          {isSubmitSuccessful ? (
            <div className="text-center py-16">
              <h3 className="font-serif text-2xl text-brand-heading font-bold mb-4">Request Received</h3>
              <p className="font-sans text-brand-white/80 text-sm leading-relaxed">
                Our team will be in touch shortly to orchestrate your journey.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="font-sans text-[10px] text-brand-white/60 tracking-wider uppercase font-bold">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold w-4 h-4" />
                    <input
                      {...register("name")}
                      id="form-name"
                      className="w-full pl-10 pr-4 py-3 bg-brand-dark-accent/50 border border-brand-white/10 hover:border-brand-gold/40 focus:border-brand-gold rounded-xl font-sans text-sm text-brand-white outline-none transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-email" className="font-sans text-[10px] text-brand-white/60 tracking-wider uppercase font-bold">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold w-4 h-4" />
                    <input
                      {...register("email")}
                      id="form-email"
                      type="email"
                      className="w-full pl-10 pr-4 py-3 bg-brand-dark-accent/50 border border-brand-white/10 hover:border-brand-gold/40 focus:border-brand-gold rounded-xl font-sans text-sm text-brand-white outline-none transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="form-website" className="font-sans text-[10px] text-brand-white/60 tracking-wider uppercase font-bold">
                    Website (Optional)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold w-4 h-4" />
                    <input
                      {...register("website")}
                      id="form-website"
                      type="url"
                      className="w-full pl-10 pr-4 py-3 bg-brand-dark-accent/50 border border-brand-white/10 hover:border-brand-gold/40 focus:border-brand-gold rounded-xl font-sans text-sm text-brand-white outline-none transition-colors"
                      placeholder="https://your-company.com"
                    />
                  </div>
                  {errors.website && <p className="text-red-400 text-xs mt-1">{errors.website.message}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-destination" className="font-sans text-[10px] text-brand-white/60 tracking-wider uppercase font-bold">
                  Destination of Interest
                </label>
                <div className="relative">
                  <select
                    {...register("destination")}
                    id="form-destination"
                    className="w-full pl-4 pr-10 py-3 bg-brand-dark-accent/50 border border-brand-white/10 hover:border-brand-gold/40 focus:border-brand-gold rounded-xl font-sans text-sm text-brand-white outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="getting-funky">Getting Funky</option>
                    <option value="colombia">Colombia</option>
                    <option value="nola">New Orleans</option>
                    <option value="cdmx">Mexico City</option>
                    <option value="bespoke">Bespoke Experience</option>
                    <option value="undecided">Undecided</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
                {errors.destination && <p className="text-red-400 text-xs mt-1">{errors.destination.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-message" className="font-sans text-[10px] text-brand-white/60 tracking-wider uppercase font-bold">
                  Tell us about your vision
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-4 text-brand-gold w-4 h-4" />
                  <textarea
                    {...register("message")}
                    id="form-message"
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 bg-brand-dark-accent/50 border border-brand-white/10 hover:border-brand-gold/40 focus:border-brand-gold rounded-xl font-sans text-sm text-brand-white outline-none transition-colors resize-none"
                    placeholder="Estimated dates, group size, required experiences..."
                  />
                </div>
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <div className="pt-2 text-center md:text-left">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-4 bg-accent-gradient text-brand-green font-bold text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(239,156,130,0.4)] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none cursor-pointer flex items-center justify-center min-h-[52px]"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
