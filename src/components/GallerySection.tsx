'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, Tv } from 'lucide-react';

interface GallerySectionProps {
  openUnlockModal: (source: string, title: string, subtitle?: string) => void;
}

export default function GallerySection({ openUnlockModal }: GallerySectionProps) {
  const [activeGalleryTab, setActiveGalleryTab] = useState<'photos' | 'videos'>('photos');

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
          <h3 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
            Project <span className="gold-gradient-text italic">Gallery</span>
          </h3>
          <div className="luxury-divider max-w-24 mx-auto mt-4" />
        </div>

        {/* Gallery Segment Switcher */}
        <div className="flex justify-center gap-2 mb-10 bg-slate-900/40 p-1 rounded-xl border border-slate-900/60 max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => setActiveGalleryTab('photos')}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeGalleryTab === 'photos'
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-extrabold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Renders & Photos
          </button>
          <button
            type="button"
            onClick={() => setActiveGalleryTab('videos')}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeGalleryTab === 'videos'
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-extrabold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Video Walkthroughs
          </button>
        </div>

        {activeGalleryTab === 'photos' ? (
          /* Asymmetric Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Tower Elevation', path: '/images/gallery-1.jpg', text: 'High-res view of the development', span: 'md:row-span-2 aspect-[3/4] md:aspect-auto' },
              { label: 'Serene Lifestyle', path: '/images/gallery-2.jpg', text: 'Luxurious family living', span: 'aspect-video' },
              { label: 'Smart Investment', path: '/images/gallery-3.jpg', text: 'Premium configurations', span: 'aspect-video' }
            ].map((img, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-xl border border-slate-900/50 group cursor-pointer bg-slate-900 ${img.span}`}
                onClick={() => openUnlockModal(
                  'gallery', 
                  'View Premium HD Gallery',
                  'Access our exclusive collection of high-definition project renders and walkthroughs.'
                )}
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
        ) : (
          /* Video Walkthrough Player Showcase */
          <div className="max-w-3xl mx-auto bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-2xl relative aspect-video group">
            <div className="absolute inset-0 z-0 bg-slate-900 flex items-center justify-center">
              <Image
                src="/images/hero-bg.jpg"
                alt="Gera Walkthrough Preview"
                fill
                className="object-cover opacity-50 filter brightness-75 transition-all group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 space-y-4">
              <button
                type="button"
                onClick={() => openUnlockModal(
                  'gallery-walkthrough',
                  'Unlock Virtual Show Flat Walkthrough',
                  'Register below to receive instant access link to our virtual show apartment walkthrough video & high-resolution brand movies.'
                )}
                className="w-16 h-16 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-115 active:scale-95 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 ml-1 text-slate-950">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="text-center">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">Gera Winds of Joy Walkthrough</h4>
                <span className="text-[10px] text-gold-400 font-bold tracking-widest block mt-1 uppercase">Sample Flat 3D Tour</span>
              </div>
            </div>

            {/* RERA and disclaimer small print */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-slate-950/80 border border-slate-900/60 px-3 py-1 rounded text-[8px] text-slate-500 font-bold uppercase tracking-wider z-10">
              <Tv className="w-3 h-3 text-gold-400" />
              <span>Virtual Tour 4K</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
