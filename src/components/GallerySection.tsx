'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const photos = [
    { label: 'Tower Elevation', path: '/images/gallery-1.jpg', text: 'High-res view of the development', span: 'md:row-span-2 aspect-[3/4] md:aspect-auto' },
    { label: 'Serene Lifestyle', path: '/images/gallery-2.jpg', text: 'Luxurious family living', span: 'aspect-video' },
    { label: 'Smart Investment', path: '/images/gallery-3.jpg', text: 'Premium configurations', span: 'aspect-video' }
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="luxury-divider w-full" />
      {/* Dynamic Watermark Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <Image
          src="/images/gallery-1.jpg"
          alt="Gera Hinjewadi project entrance rendering backdrop"
          fill
          className="object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
            Gera Joy on the Treetops & Winds of Joy Gallery
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
            Project <span className="gold-gradient-text italic">Gallery</span>
          </h2>
          <div className="luxury-divider max-w-24 mx-auto mt-4" />
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photos.map((img, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-xl border border-slate-900/50 group cursor-pointer bg-slate-900 ${img.span}`}
              onClick={() => openLightbox(idx)}
            >
              <Image
                src={img.path}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-left">
                <h6 className="text-xs font-bold uppercase tracking-wider text-white">
                  {img.label}
                </h6>
                <p className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold mt-0.5">
                  {img.text}
                </p>
              </div>
              {/* Hover Eye indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/40 backdrop-blur-[1px] transition-all">
                <span className="p-2.5 bg-slate-900 border border-gold-500/30 rounded-full text-gold-400 shadow-lg">
                  <Eye className="h-4 w-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX OVERLAY */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between items-center p-4">
          {/* Top Actions */}
          <div className="w-full max-w-5xl flex justify-between items-center py-2 border-b border-slate-900/60">
            <div className="text-left">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">
                {photos[lightboxIndex].label}
              </h5>
              <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold mt-0.5 block">
                {photos[lightboxIndex].text}
              </span>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 border border-slate-800 hover:border-gold-500/50 bg-slate-900 text-slate-400 hover:text-white rounded-full transition-all cursor-pointer shadow-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main Image View */}
          <div className="relative w-full max-w-4xl flex-grow flex items-center justify-center min-h-[300px] my-4">
            {/* Left Control */}
            <button
              onClick={() => setLightboxIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1))}
              className="absolute left-2 md:-left-16 p-3.5 border border-slate-800 hover:border-gold-500/50 bg-slate-900/80 text-slate-400 hover:text-white rounded-full transition-all cursor-pointer z-10 shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image Container */}
            <div className="relative w-full h-[65vh] md:h-[75vh] rounded-xl overflow-hidden border border-slate-900/60 bg-slate-950 shadow-inner">
              <Image
                src={photos[lightboxIndex].path}
                alt={photos[lightboxIndex].label}
                fill
                className="object-contain"
              />
            </div>

            {/* Right Control */}
            <button
              onClick={() => setLightboxIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 md:-right-16 p-3.5 border border-slate-800 hover:border-gold-500/50 bg-slate-900/80 text-slate-400 hover:text-white rounded-full transition-all cursor-pointer z-10 shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-2.5 py-2 border-t border-slate-900/60 w-full justify-center">
            {photos.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  lightboxIndex === idx 
                    ? 'border-gold-500 scale-105 shadow-md shadow-gold-500/10' 
                    : 'border-slate-800 hover:border-slate-700 opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.path}
                  alt={img.label}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
