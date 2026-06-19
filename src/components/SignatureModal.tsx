"use client";

import { useState, useRef, useEffect } from "react";
import { X, ShieldCheck, Mail, User, PenTool, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignatureModal({ isOpen, onClose }: SignatureModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize canvas stroke color and line width
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Handle high-DPI screens
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      ctx.strokeStyle = "#f9eee7"; // brand-white style
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setIsSigned(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !agreed || !isSigned) return;

    setSubmitting(true);

    // Simulate PDF compilation and email transmission
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  const resetModal = () => {
    setName("");
    setEmail("");
    setAgreed(false);
    setIsSigned(false);
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-default"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-lg overflow-hidden border bg-brand-green border-brand-gold/30 rounded-3xl shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-brand-white/10 bg-brand-dark-accent/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-brand-gold w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-brand-white">
                  Sales Agreement Signature
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-brand-white/60 hover:text-brand-gold transition-colors p-1"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto max-h-[75vh]">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-brand-white mb-3">
                    Agreement Executed!
                  </h4>
                  <p className="font-sans text-brand-white/80 text-sm max-w-sm mb-6 leading-relaxed">
                    Thank you, <strong className="text-brand-gold">{name}</strong>. The signed sales agreement has been compiled into a secure PDF.
                  </p>
                  <div className="bg-brand-dark-accent/40 border border-brand-white/10 rounded-xl p-4 w-full text-left font-sans text-xs text-brand-white/70 space-y-2 mb-8">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                      <span>Copy sent to: <strong className="text-brand-white">{email}</strong></span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                      <span>Copy archived to: <strong className="text-brand-white">adam@hiddenrhythmstravel.com</strong></span>
                    </p>
                  </div>
                  <button
                    onClick={resetModal}
                    className="px-8 py-3 rounded-full bg-brand-gold text-brand-green font-bold text-xs tracking-wider uppercase hover:bg-brand-white transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Summary of Terms */}
                  <div className="p-4 bg-brand-dark-accent/40 border border-brand-white/5 rounded-xl font-sans text-[11px] text-brand-white/70 leading-relaxed max-h-32 overflow-y-auto">
                    <p className="font-bold text-brand-white mb-2 uppercase tracking-wider">
                      Summary of Terms & Conditions
                    </p>
                    <p className="mb-2">
                      By executing this document, you confirm your booking for the Getting Funky in Jamaica cultural expedition from January 14-18, 2027.
                    </p>
                    <p className="mb-2">
                      <strong>Payments & Deposits:</strong> Deposit payment is due no later than August 1, 2026. Full payment is due by October 1, 2026.
                    </p>
                    <p>
                      <strong>Liability & Safety:</strong> Hidden Rhythms serves as the organizer. Participants release Hidden Rhythms from all liability, assume activity risks, and are recommended to purchase comprehensive travel insurance.
                    </p>
                  </div>

                  {/* Name and Email Inputs */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="sig-name" className="font-sans text-[10px] text-brand-white/60 tracking-wider uppercase font-bold">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold w-4 h-4" />
                        <input
                          id="sig-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-3 bg-brand-dark-accent/50 border border-brand-white/10 hover:border-brand-gold/40 focus:border-brand-gold rounded-xl font-sans text-sm text-brand-white outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="sig-email" className="font-sans text-[10px] text-brand-white/60 tracking-wider uppercase font-bold">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold w-4 h-4" />
                        <input
                          id="sig-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="johndoe@example.com"
                          className="w-full pl-10 pr-4 py-3 bg-brand-dark-accent/50 border border-brand-white/10 hover:border-brand-gold/40 focus:border-brand-gold rounded-xl font-sans text-sm text-brand-white outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Signature Canvas */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-sans text-[10px] text-brand-white/60 tracking-wider uppercase font-bold flex items-center gap-1.5">
                        <PenTool size={12} className="text-brand-gold" />
                        <span>Draw Signature</span>
                      </label>
                      {isSigned && (
                        <button
                          type="button"
                          onClick={clearSignature}
                          className="font-sans text-[9px] text-brand-gold hover:text-brand-white uppercase font-bold tracking-wider cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="relative border border-brand-white/10 bg-brand-dark-accent/60 rounded-xl overflow-hidden h-36 cursor-crosshair">
                      <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className="absolute inset-0 w-full h-full touch-none"
                      />
                      {!isSigned && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none font-sans text-[10px] text-brand-white/30 tracking-widest uppercase">
                          Sign with Mouse or Touch
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <label className="flex items-start gap-3 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-brand-white/10 text-brand-gold focus:ring-brand-gold bg-brand-dark-accent/60 cursor-pointer"
                    />
                    <span className="font-sans text-[11px] text-brand-white/75 leading-relaxed">
                      I agree to the terms listed in the Sales Agreement and confirm that my digital signature is legally binding.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting || !name || !email || !agreed || !isSigned}
                    className="w-full py-4 rounded-full bg-accent-gradient text-brand-green font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(239,156,130,0.4)] disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none cursor-pointer flex items-center justify-center"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-brand-green" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Compiling & Sending...</span>
                      </span>
                    ) : (
                      <span>Sign & Execute Agreement</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
