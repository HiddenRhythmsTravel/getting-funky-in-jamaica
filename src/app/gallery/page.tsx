"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Instagram, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useAudio } from "@/contexts/AudioContext";
import fullDatabaseImport from "@/data/gallery-images.json";

interface ImageItem {
  src: string;
  year: string;
  original_name: string;
}

const YEAR_LABELS: Record<string, string> = {
  "2020": "2020",
  "2023": "2023",
  "2024": "2024",
  "2025": "2025",
  "2025-medellin": "2025 Medellín",
  "2026": "2026",
};

const permanentAssets: ImageItem[] = [
  { src: "/assets/gallery/permanent/Brass Band Colombia New Orleans.MOV", year: "2025-medellin", original_name: "Brass Band Colombia New Orleans" },
  { src: "/assets/gallery/permanent/DSC01595.jpeg", year: "2020", original_name: "DSC01595" },
  { src: "/assets/gallery/permanent/EdAranz_DSC4796.jpg", year: "2024", original_name: "EdAranz_DSC4796" },
  { src: "/assets/gallery/permanent/EdAranz_DSC8692.jpg", year: "2023", original_name: "EdAranz_DSC8692" },
  { src: "/assets/gallery/permanent/EdAranz_dsc1831.jpg", year: "2024", original_name: "EdAranz_dsc1831" },
  { src: "/assets/gallery/permanent/IMG_1462.mov", year: "2026", original_name: "IMG_1462" },
  { src: "/assets/gallery/permanent/IMG_4832.jpg", year: "2025", original_name: "IMG_4832" },
  { src: "/assets/gallery/permanent/IMG_9942.mov", year: "2025", original_name: "IMG_9942" },
  { src: "/assets/gallery/permanent/L1009310.jpg", year: "2025", original_name: "L1009310" },
  { src: "/assets/gallery/permanent/L1009570.jpg", year: "2025", original_name: "L1009570" },
  { src: "/assets/gallery/permanent/L1009713.jpg", year: "2025", original_name: "L1009713" },
  { src: "/assets/gallery/permanent/MCW_8329.jpg", year: "2020", original_name: "MCW_8329" },
  { src: "/assets/gallery/permanent/Tropical Crowd.jpg", year: "2020", original_name: "Tropical Crowd" },
  { src: "/assets/gallery/permanent/_DSC8517.jpg", year: "2025", original_name: "_DSC8517" },
  { src: "/assets/gallery/permanent/_DSC8773.jpg", year: "2024", original_name: "_DSC8773" },
  { src: "/assets/gallery/permanent/_DSC9427.webp", year: "2024", original_name: "_DSC9427" },
  { src: "/assets/gallery/permanent/box4_img_0.jpg", year: "2025", original_name: "box4_img_0" },
  { src: "/assets/gallery/permanent/box6_img_15.mp4", year: "2025", original_name: "box6_img_15" },
  { src: "/assets/gallery/permanent/mcw_9379.jpg", year: "2020", original_name: "mcw_9379" },
  { src: "/assets/gallery/permanent/mcw_9611.jpg", year: "2020", original_name: "mcw_9611" },
  { src: "/assets/gallery/permanent/yarini_32A5480.jpg", year: "2026", original_name: "yarini_32A5480" }
];

const isVideo = (src: string) => {
  const ext = src.split(".").pop()?.toLowerCase();
  return ext === "mov" || ext === "mp4";
};

const formatCaption = (filename: string) => {
  if (!filename) return "";
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  return nameWithoutExt.replace(/[_-]/g, " ");
};

export default function GalleryPage() {
  const [shuffledTiles, setShuffledTiles] = useState<ImageItem[]>([]);
  const [slideshowItems, setSlideshowItems] = useState<ImageItem[]>(fullDatabaseImport as ImageItem[]);
  const { forceGalleryTrack, pause, resume, isUnlocked } = useAudio();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          forceGalleryTrack();
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, [forceGalleryTrack]);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const activeItem = slideshowItems[currentLightboxIndex];
  const activeIsVideo = activeItem ? isVideo(activeItem.src) : false;

  const prevActiveIsVideoRef = useRef<boolean | null>(null);
  const prevLightboxOpenRef = useRef<boolean>(false);

  useEffect(() => {
    // 1. If lightbox was closed and is now opened:
    if (lightboxOpen && !prevLightboxOpenRef.current) {
      if (activeIsVideo) {
        pause();
      }
    }
    // 2. If lightbox is open and slide index transitioned:
    else if (lightboxOpen && prevLightboxOpenRef.current) {
      const prevActiveIsVideo = prevActiveIsVideoRef.current;
      
      // Image -> Video transition
      if (!prevActiveIsVideo && activeIsVideo) {
        pause();
      }
      // Video -> Image transition
      else if (prevActiveIsVideo && !activeIsVideo) {
        if (isUnlocked) {
          resume();
        }
      }
    }
    // 3. If lightbox was open and is now closed:
    else if (!lightboxOpen && prevLightboxOpenRef.current) {
      const videoEl = document.querySelector(".lightbox-video") as HTMLVideoElement;
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
      if (isUnlocked) {
        resume();
      }
    }

    // 4. Handle video HTML5 elements play/pause state updates:
    const videoEl = document.querySelector(".lightbox-video") as HTMLVideoElement;
    if (lightboxOpen && activeIsVideo) {
      if (videoEl) {
        videoEl.muted = false;
        videoEl.play().catch(() => {});
      }
    } else {
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    }

    // Update refs for next run
    prevActiveIsVideoRef.current = activeIsVideo;
    prevLightboxOpenRef.current = lightboxOpen;
  }, [lightboxOpen, activeIsVideo, currentLightboxIndex, isUnlocked, pause, resume]);

  // Touch state for swipe navigation
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Shuffle permanent assets on mount to prevent hydration mismatch
  useEffect(() => {
    const shuffled = [...permanentAssets].sort(() => Math.random() - 0.5);
    setShuffledTiles(shuffled);
  }, []);


  const handleNextSlide = () => {
    setCurrentLightboxIndex((prev) => (prev + 1) % slideshowItems.length);
  };

  const handlePrevSlide = () => {
    setCurrentLightboxIndex((prev) => (prev - 1 + slideshowItems.length) % slideshowItems.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNextSlide();
      else if (e.key === "ArrowLeft") handlePrevSlide();
      else if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, slideshowItems, currentLightboxIndex]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNextSlide();
    } else if (isRightSwipe) {
      handlePrevSlide();
    }
  };

  const openLightbox = (clickedTile: ImageItem) => {
    const clickedBase = clickedTile.src.split("/").pop()?.toLowerCase();
    
    // Find index of matching filename in full database
    const dbIndex = (fullDatabaseImport as ImageItem[]).findIndex(item => {
      const itemBase = item.src.split("/").pop()?.toLowerCase();
      return itemBase === clickedBase;
    });

    if (dbIndex !== -1) {
      setSlideshowItems(fullDatabaseImport as ImageItem[]);
      setCurrentLightboxIndex(dbIndex);
    } else {
      // If not in database, prepend it
      const updatedList = [clickedTile, ...(fullDatabaseImport as ImageItem[])];
      setSlideshowItems(updatedList);
      setCurrentLightboxIndex(0);
    }
    setLightboxOpen(true);
  };

  return (
    <main className="min-h-screen bg-brand-green selection:bg-brand-gold selection:text-brand-green text-brand-white pb-24 relative overflow-hidden">
      <Navbar />

      {/* Decorative Glow Elements */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-tropical-burgundy/10 blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 md:pt-40">
        
        {/* Breadcrumb Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-bold text-brand-gold hover:text-brand-white transition-colors duration-300 mb-8 md:mb-12 group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Back to Home Page
        </Link>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-brand-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Instagram size={16} className="text-brand-gold" />
              <span className="font-sans text-[10px] md:text-xs text-brand-gold font-bold tracking-[0.25em] uppercase">
                Moment Archive
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-heading leading-[1.1]">
              Gallery
            </h1>
          </div>
        </div>

        {/* 21-Tile Uniform Instagram Grid (3 Cols Mobile / 7 Cols Desktop) */}
        <div ref={gridRef} className="grid grid-cols-3 md:grid-cols-7 gap-3 sm:gap-4">
          {shuffledTiles.map((tile, index) => (
            <motion.div
              key={tile.src}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => openLightbox(tile)}
              className="aspect-square relative group rounded-xl overflow-hidden border border-brand-white/10 bg-brand-dark-accent/40 shadow-lg hover:border-brand-gold/40 hover:shadow-brand-gold/5 cursor-pointer"
            >
              {/* Active Asset: Video or Image */}
              {isVideo(tile.src) ? (
                <video
                  src={tile.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <Image
                  src={tile.src}
                  alt={formatCaption(tile.original_name)}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 15vw, 12vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index < 7}
                />
              )}

              {/* Hover Metadata Overlay */}
              <div className="absolute inset-0 bg-brand-green/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 z-20">
                <div className="flex items-center gap-1.5 text-brand-gold text-[9px] uppercase font-bold tracking-widest">
                  <Calendar size={10} />
                  <span>{YEAR_LABELS[tile.year] || tile.year}</span>
                </div>
                <p className="text-[8px] text-brand-white/60 mt-1 truncate" title={formatCaption(tile.original_name)}>
                  {formatCaption(tile.original_name)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glassmorphic Swipable Lightbox Slideshow */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-brand-green/90 backdrop-blur-2xl flex flex-col justify-between items-center py-6 select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-7xl px-6 flex justify-between items-center text-sm font-sans font-bold tracking-widest text-brand-white/70">
              <span className="text-brand-gold font-sans text-xs uppercase">
                {YEAR_LABELS[slideshowItems[currentLightboxIndex].year] || slideshowItems[currentLightboxIndex].year}
              </span>
              <span>
                {currentLightboxIndex + 1} / {slideshowItems.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="text-brand-white hover:text-brand-gold p-2 transition-colors cursor-pointer bg-brand-white/5 hover:bg-brand-white/10 rounded-full"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Stage (Swipable Area) */}
            <div className="relative flex-grow w-full flex items-center justify-center px-4">
              
              {/* Previous Button (Desktop) */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-6 z-30 p-3 rounded-full border border-brand-white/10 text-brand-white bg-brand-green/60 hover:bg-brand-gold hover:text-brand-green hover:border-transparent transition-all duration-300 hidden md:block cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Active Slide Display */}
              <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slideshowItems[currentLightboxIndex].src}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-h-full max-w-full flex items-center justify-center"
                  >
                    {isVideo(slideshowItems[currentLightboxIndex].src) ? (
                      <video
                        src={slideshowItems[currentLightboxIndex].src}
                        autoPlay
                        controls
                        loop
                        playsInline
                        className="lightbox-video max-h-[70vh] max-w-[85vw] object-contain rounded-2xl shadow-2xl border border-brand-white/10 bg-black/40"
                      />
                    ) : (
                      <img
                        src={slideshowItems[currentLightboxIndex].src}
                        alt={formatCaption(slideshowItems[currentLightboxIndex].original_name)}
                        className="max-h-[70vh] max-w-[85vw] object-contain rounded-2xl shadow-2xl border border-brand-white/10"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button (Desktop) */}
              <button
                onClick={handleNextSlide}
                className="absolute right-6 z-30 p-3 rounded-full border border-brand-white/10 text-brand-white bg-brand-green/60 hover:bg-brand-gold hover:text-brand-green hover:border-transparent transition-all duration-300 hidden md:block cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center px-6 max-w-xl font-sans text-xs text-brand-white/60 truncate">
              {formatCaption(slideshowItems[currentLightboxIndex].original_name)}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
