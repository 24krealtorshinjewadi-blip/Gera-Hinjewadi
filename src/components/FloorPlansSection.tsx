'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';

interface FloorPlansSectionProps {
  openUnlockModal: (source: string, title: string, subtitle?: string) => void;
}

export default function FloorPlansSection({ openUnlockModal }: FloorPlansSectionProps) {
  const [activePlanTab, setActivePlanTab] = useState<'2bhk' | '2.5bhk' | '3bhk' | '3bhk-duplex'>('2bhk');

  const planImages: Record<'2bhk' | '2.5bhk' | '3bhk' | '3bhk-duplex', string> = {
    '2bhk': '/images/floor-plan-2bhk.png',
    '2.5bhk': '/images/floor-plan-2.5bhk.png',
    '3bhk': '/images/floor-plan-3bhk.png',
    '3bhk-duplex': '/images/floor-plan-3bhk-duplex.png',
  };

  return (
    <section id="floor-plans" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="luxury-divider w-full" />
      {/* Dynamic Watermark Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <Image
          src="/floor-plan.png"
          alt="Gera Winds of Joy floor plan layout blueprint background"
          fill
          className="object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
            Gera Hinjewadi BHK Floor Plans & Master Layout
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
            Meticulously Planned <span className="gold-gradient-text italic">Layouts</span>
          </h2>
          <div className="luxury-divider max-w-24 mx-auto mt-4" />
          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xl mx-auto">
            Designed with zero space wastage, large private glazing, and premium ventilation. Select configurations to preview your future layout.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* BHK Select Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 bg-slate-900/60 p-1.5 rounded-xl border border-slate-900 max-w-md mx-auto">
            {[
              { key: '2bhk', label: '2 BHK' },
              { key: '2.5bhk', label: '2.5 BHK' },
              { key: '3bhk', label: '3 BHK' },
              { key: '3bhk-duplex', label: '3 BHK Duplex' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActivePlanTab(tab.key as '2bhk' | '2.5bhk' | '3bhk' | '3bhk-duplex')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activePlanTab === tab.key
                    ? 'bg-linear-to-r from-gold-500 to-gold-600 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Open Floor Plan Showcase - No Lock */}
          <div className="relative border border-slate-900 rounded-2xl overflow-hidden max-w-2xl mx-auto aspect-4/3 bg-slate-900/20 group">
            <Image
              src={planImages[activePlanTab]}
              alt={`${activePlanTab.toUpperCase()} Floor Plan Layout`}
              fill
              className="object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-left">
              <span className="text-[10px] text-gold-400 uppercase tracking-[0.15em] font-semibold">
                {activePlanTab.toUpperCase()} Configuration
              </span>
            </div>
          </div>

          {/* Download Full Plan CTA */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => openUnlockModal(
                `floor-${activePlanTab}`, 
                `Download HD Floor Plan - ${activePlanTab.toUpperCase()}`,
                `Register to receive high-resolution 2D and 3D floor plan layouts for this configuration via email.`
              )}
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-800 hover:border-gold-500/40 bg-slate-900/30 text-slate-300 hover:text-white text-[11px] font-bold uppercase tracking-[0.15em] rounded-lg transition-all cursor-pointer"
            >
              <Download className="h-4 w-4 text-gold-500/70" />
              <span>Download HD Floor Plan</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
