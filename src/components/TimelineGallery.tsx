"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import reelsMetadataImport from "@/data/reels-metadata.json";

interface ReelSegment {
  start: number;
  end: number;
}

interface TimelineSlide {
  year: string;
  label: string;
  title: string;
  desc: string;
  reelFile: string;
}

const reelsMetadata = reelsMetadataImport as Record<string, ReelSegment[]>;

export function TimelineGallery() {
  const slides: TimelineSlide[] = [
    {
      year: "2020",
      label: "2020",
      title: "Getting Funky in Havana",
      desc: "In January 2020, our inaugural trip proved to be far more than a travel experience, it was a life-changing expedition. Taking place during a pivotal moment for US-Cuba relations and just before the world paused for COVID-19, the journey was anchored by the first historic exchange between the Trombone Shorty Foundation students and their Cuban counterparts. From powerful instrument giveaways at local schools to intimate concerts uniting our musicians, the trip culminated in an iconic street second-line that infused the city of Havana with pure, electric energy.",
      reelFile: "2020.mp4"
    },
    {
      year: "2023",
      label: "2023",
      title: "Havana Funk Expedition",
      desc: "For our second installment, the Getting Funky family expanded significantly. Emerging from the pandemic, the timing of this trip was exactly what both our travelers and the Cuban community needed most. Trombone Shorty co-headlined a massive public concert at the famous Fábrica de Arte Cubano (FAC), drawing thousands of fans for a historic superjam that became an absolute highlight of the trip. True to our mission, the heart of the journey remained our high-impact visits to local music schools, where our delegation doubled its donations, continuing our fierce belief that a single musical instrument has the power to change a life.",
      reelFile: "2023.mp4"
    },
    {
      year: "2024",
      label: "2024",
      title: "Getting Funky in Havana, part 3",
      desc: "In 2024, our community grew even larger, welcoming a massive group of travelers from the US and a stellar roster of world-class artists. With more students from the Trombone Shorty Foundation making the journey down, we built immense momentum from our previous years. Trombone Shorty headlined a legendary free concert at an old baseball field, drawing tens of thousands of local Cubans. The trip also introduced audiences to powerhouse acts like Primera Linea, Wampi, and Los Van Van, while drawing legendary names like Carlos Varela, Big Freedia, Ivan Neville, and DJ Mannie Fresh to join the groove throughout the weekend.",
      reelFile: "2024.mp4"
    },
    {
      year: "2025",
      label: "2025",
      title: "Getting Funky in Havana, part 4 – The Sunset Sessions",
      desc: "2025 continued the tradition of pure magic that Getting Funky in Havana is known for. Icons like George Clinton and Taj Mahal joined forces with Cimafunk, Maurice Brown, PJ Morton, and more for an experience that everyone described as one of the greatest musical journeys of their lives. Hordes of instruments were donated, and lifelong bonds were fortified between the Trombone Shorty Foundation students and the music school in Guanabacoa. Each night culminated in an epic medley of New Orleans jazz, Havana funk, and Afro-Colombian rhythms at an iconic amphitheater in Old Havana, leaving everyone with memories that will be cherished forever.",
      reelFile: "2025.mp4"
    },
    {
      year: "2025-medellin",
      label: "2025 Medellín",
      title: "Getting Funky in Medellín",
      desc: "September 2025 marked our first exploratory mission to Medellín, a city with an incredible musical story of its own. The Trombone Shorty Foundation brought a select contingent of youth musicians who embedded themselves into local performances, beautifully capturing the spirit of Afro-Colombian music. We were joined by key members of Colombian music legend Juanes’ team from his Mi Sangre Foundation, while our small group of VIPs spent four unforgettable days in the City of Eternal Spring. Mind-blowing jam sessions united Victor Campbell, Cimafunk, Primera Linea, and Wampi with brilliant Colombian counterparts like ChocQuibTown, El Niko Arias, Robe L Ninho, La Bamperya, and Juancho Valencia. Medellín proved its groove is undeniable, setting the stage for a major event on the horizon.",
      reelFile: "2025-medellin.mp4"
    },
    {
      year: "2026",
      label: "2026",
      title: "Music Donation and High Impact Work",
      desc: "Although our main 2026 Getting Funky festival in Havana couldn’t take place, our deep commitment to the community never wavered. Our beloved family of funkers has continued to lend incredible support, and January 2026 kicked off the first of ongoing, bi-monthly mini-trips where our leadership team hand-delivers instruments and humanitarian goods at a time when local people need it most. Closer to home, the Funky family reunited in April 2026 during the New Orleans Jazz & Heritage Festival to celebrate our community. A massive thank you to everyone for showing up, and most importantly, to the Foundation and its board for their unwavering, continued support.",
      reelFile: "2026.mp4"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [localPlaying, setLocalPlaying] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { isPlaying, isMuted, playReelOverride, toggleMute } = useAudio();
  const currentSlide = slides[currentIndex];

  // 1. Viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // 2. Play/Pause controller
  useEffect(() => {
    const shouldPlay = sectionInView || localPlaying;
    setLocalPlaying(shouldPlay);

    if (videoRef.current) {
      if (shouldPlay) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [sectionInView, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleJump = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const toggleVideoPlayback = () => {
    setLocalPlaying((prev) => {
      const next = !prev;
      if (videoRef.current) {
        if (next) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
      }
      return next;
    });
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0
    })
  };

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-brand-green border-t border-brand-white/5"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="font-sans text-[10px] md:text-xs text-brand-gold font-bold tracking-[0.25em] uppercase mb-3 block">
            Our Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-heading font-bold mb-4 leading-tight">
            Timeline and Moments from Different Years
          </h2>
        </div>

        {/* Timeline Navigation bar */}
        <div className="relative max-w-4xl mx-auto mb-12 md:mb-20">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-brand-white/10 -translate-y-1/2 z-0"></div>
          
          <div className="relative z-10 flex justify-between items-center px-2 sm:px-6">
            {slides.map((slide, idx) => (
              <button
                key={slide.year}
                onClick={() => handleJump(idx)}
                className="flex flex-col items-center group focus:outline-none"
              >
                <motion.div
                  animate={{
                    scale: idx === currentIndex ? 1.25 : 1,
                    backgroundColor: idx === currentIndex ? "var(--color-brand-gold)" : "var(--color-brand-green)",
                    borderColor: idx === currentIndex ? "var(--color-brand-gold)" : "rgba(249, 238, 231, 0.3)"
                  }}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 bg-brand-green flex items-center justify-center transition-all duration-300 group-hover:border-brand-gold cursor-pointer"
                >
                  {idx === currentIndex && (
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                  )}
                </motion.div>
                <span
                  className={`mt-3 font-sans text-[10px] sm:text-xs tracking-wider font-bold transition-colors duration-300 whitespace-nowrap ${
                    idx === currentIndex ? "text-brand-gold" : "text-brand-white/40 group-hover:text-brand-white/80"
                  }`}
                >
                  {slide.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Player Container */}
        <div className="relative bg-brand-dark-accent/30 border border-brand-white/5 rounded-3xl p-6 md:p-12 overflow-hidden shadow-xl min-h-[520px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Description & Metadata */}
            <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col"
                >
                  <span className="font-sans text-[10px] text-brand-gold font-bold tracking-[0.25em] uppercase mb-2 block">
                    Expedition Milestone
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-brand-heading font-bold mb-4 leading-tight">
                    {currentSlide.title}
                  </h3>
                  <p className="font-sans text-brand-white/80 text-sm md:text-base leading-relaxed mb-8">
                    {currentSlide.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Status & Control Panel */}
              <div className="flex flex-col gap-4 border-t border-brand-white/10 pt-6">
                
                {/* Mute/Unmute Toggle Button */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="flex items-center gap-3 px-6 py-3 rounded-full border border-brand-gold/40 hover:border-brand-gold text-brand-gold bg-brand-gold/5 transition-all duration-300 font-sans text-xs tracking-wider uppercase font-semibold cursor-pointer"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX size={16} />
                        <span>Unmute Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={16} />
                        <span>Mute Audio</span>
                      </>
                    )}
                  </button>
                  <span className="font-sans text-[10px] text-brand-white/40 uppercase tracking-widest">
                    Toggle Background Music
                  </span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={toggleVideoPlayback}
                    className="p-3 rounded-full bg-brand-white/10 hover:bg-brand-gold hover:text-brand-green text-brand-white transition-all duration-300"
                    title={localPlaying ? "Pause Video" : "Play Video"}
                  >
                    {localPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: 9:16 Instagram Reel Player */}
            <div className="w-full lg:col-span-6 relative order-1 lg:order-2 flex flex-col items-center justify-center mx-auto">
              
              {/* Outer phone frame mockup */}
              <div 
                className="relative w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[320px] lg:max-w-[350px] xl:max-w-[380px] aspect-[9/16] rounded-[28px] sm:rounded-[36px] border-[8px] sm:border-[10px] border-brand-dark-accent bg-black shadow-2xl overflow-hidden group/reel mx-auto"
              >
                {/* Looping video player (always muted to play global track) */}
                <video
                  ref={videoRef}
                  src={`/assets/reels/${currentSlide.reelFile}`}
                  loop
                  playsInline
                  muted={true}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none z-10"></div>
                
                {/* Year Badge */}
                <div className="absolute top-4 left-4 bg-brand-green/80 backdrop-blur-md border border-brand-white/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-brand-gold uppercase z-20">
                  {currentSlide.label}
                </div>

                {/* Floating Override Button on Hover */}
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/reel:opacity-100 transition-opacity duration-300 z-20 cursor-pointer"
                  onClick={playReelOverride}
                >
                  <div className="p-4 rounded-full bg-brand-green/90 border border-brand-white/20 text-brand-gold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                    <Play size={20} fill="currentColor" />
                    <span className="font-sans text-[10px] font-bold tracking-widest uppercase pr-1">Play Reel Sound</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Timeline Navigation Arrows */}
          <div className="absolute bottom-6 right-6 z-30 flex gap-3">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full border border-brand-white/20 text-brand-white bg-brand-green/60 hover:bg-brand-gold hover:text-brand-green hover:border-transparent transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label="Previous slide"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full border border-brand-white/20 text-brand-white bg-brand-green/60 hover:bg-brand-gold hover:text-brand-green hover:border-transparent transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label="Next slide"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
