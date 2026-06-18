"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Instagram } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import activeTilesImport from "@/data/gallery-active.json";

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

export default function GalleryPage() {
  const activeTiles = activeTilesImport as ImageItem[];

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
                Staged Photo Grid
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-heading leading-[1.1] mb-4">
              Insta Gallery
            </h1>
            <p className="font-sans text-brand-white/70 text-sm md:text-base tracking-wide max-w-2xl">
              A curated selection of exactly 21 moments from our Jamaica & Havana expeditions. The image pool automatically flushes and updates every 5 days from our historical files.
            </p>
          </div>
        </div>

        {/* 21-Tile Uniform Instagram Grid (3 Cols Mobile / 7 Cols Desktop) */}
        <div className="grid grid-cols-3 md:grid-cols-7 gap-3 sm:gap-4">
          {activeTiles.map((tile, index) => (
            <motion.div
              key={tile.src}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="aspect-square relative group rounded-xl overflow-hidden border border-brand-white/10 bg-brand-dark-accent/40 shadow-lg hover:border-brand-gold/40 hover:shadow-brand-gold/5 cursor-pointer"
            >
              {/* Active Image */}
              <Image
                src={tile.src}
                alt={tile.original_name}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 15vw, 12vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority={index < 7}
              />

              {/* Hover Metadata Overlay */}
              <div className="absolute inset-0 bg-brand-green/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 z-20">
                <div className="flex items-center gap-1.5 text-brand-gold text-[9px] uppercase font-bold tracking-widest">
                  <Calendar size={10} />
                  <span>{YEAR_LABELS[tile.year] || tile.year}</span>
                </div>
                <p className="text-[8px] text-brand-white/60 mt-1 truncate" title={tile.original_name}>
                  {tile.original_name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Server status alert */}
        <div className="mt-16 text-center max-w-md mx-auto bg-brand-dark-accent/20 border border-brand-white/5 rounded-2xl p-6 backdrop-blur-md">
          <p className="font-sans text-[10px] text-brand-white/45 leading-relaxed">
            Automatic update status: Active. Every 5 days, a background daemon refreshes this grid, selecting 21 random images from the historical folders.
          </p>
        </div>

      </div>
    </main>
  );
}
