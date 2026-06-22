'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';

interface LocationSectionProps {
  openUnlockModal: (source: string, title: string, subtitle?: string) => void;
}

export default function LocationSection({ openUnlockModal }: LocationSectionProps) {
  const [activeLocationTab, setActiveLocationTab] = useState<'connectivity' | 'education' | 'healthcare' | 'offices'>('connectivity');
  const [isTrafficPeak, setIsTrafficPeak] = useState<boolean>(false);

  return (
    <section id="location" className="py-32 bg-slate-900/20 relative overflow-hidden">
      <div className="luxury-divider w-full" />
      {/* Dynamic Watermark Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <Image
          src="/images/location_map_bg.png"
          alt="Gera Hinjewadi transit connectivity map background"
          fill
          className="object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
            Hinjewadi Phase 3 Transit Connectivity & Proximity Map
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
            Location <span className="gold-gradient-text italic">Advantages</span>
          </h2>
          <div className="luxury-divider max-w-24 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Proximity Details List */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Location tabs switcher */}
            <div className="flex flex-wrap gap-1 bg-slate-950/80 p-1 border border-slate-900 rounded-lg">
              {[
                { key: 'connectivity', label: 'Transit' },
                { key: 'offices', label: 'IT Parks' },
                { key: 'education', label: 'Schools' },
                { key: 'healthcare', label: 'Health' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveLocationTab(tab.key as 'connectivity' | 'education' | 'healthcare' | 'offices')}
                  className={`flex-1 py-2 px-3 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                    activeLocationTab === tab.key
                      ? 'bg-gold-500 text-slate-950 font-extrabold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab lists */}
            <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl min-h-[260px] flex flex-col justify-between space-y-4">
              {/* Traffic toggle */}
              <div className="flex items-center justify-between bg-slate-900/50 p-2 rounded-lg border border-slate-900 shadow-inner">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold-400" />
                  Commute Speed:
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsTrafficPeak(false)}
                    className={`py-1 px-2 rounded text-[8px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      !isTrafficPeak
                        ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-800/30'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsTrafficPeak(true)}
                    className={`py-1 px-2 rounded text-[8px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isTrafficPeak
                        ? 'bg-red-950/20 text-red-400 border border-red-800/30 animate-pulse'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Traffic Peak
                  </button>
                </div>
              </div>

              <ul className="space-y-3.5">
                {activeLocationTab === 'connectivity' && (
                  <>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Megapolis Circle</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '4 Mins' : '2 Mins'}</span>
                    </li>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Hinjewadi-Shivajinagar Metro</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '9 Mins' : '5 Mins'}</span>
                    </li>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Pune-Bangalore Highway</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '25 Mins' : '15 Mins'}</span>
                    </li>
                  </>
                )}
                {activeLocationTab === 'offices' && (
                  <>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">TCS & Cognizant Hinjewadi</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '8 Mins' : '4 Mins'}</span>
                    </li>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Infosys Phase 3 Campus</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '10 Mins' : '5 Mins'}</span>
                    </li>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Wipro Phase 2 Campus</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '16 Mins' : '8 Mins'}</span>
                    </li>
                  </>
                )}
                {activeLocationTab === 'education' && (
                  <>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Alard Public School</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '6 Mins' : '3 Mins'}</span>
                    </li>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Blue Ridge Public School</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '18 Mins' : '10 Mins'}</span>
                    </li>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Symbiosis International University</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '22 Mins' : '12 Mins'}</span>
                    </li>
                  </>
                )}
                {activeLocationTab === 'healthcare' && (
                  <>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Sanjivani Hospital</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '12 Mins' : '8 Mins'}</span>
                    </li>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Ruby Hall Clinic Hinjewadi</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '18 Mins' : '12 Mins'}</span>
                    </li>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Lifepoint Multispecialty Hospital</span>
                      <span className="text-gold-400 font-bold">{isTrafficPeak ? '25 Mins' : '15 Mins'}</span>
                    </li>
                  </>
                )}
              </ul>

              <button
                type="button"
                onClick={() => openUnlockModal(
                  'location-map', 
                  'Get Detailed Location Map & Directions',
                  'Receive a precise route map and distance calculations to major IT parks and schools.'
                )}
                className="mt-6 w-full py-2.5 bg-slate-900 border border-slate-800 hover:border-gold-500 text-gold-400 hover:text-white font-bold uppercase tracking-wider text-[10px] rounded-lg transition-colors cursor-pointer"
              >
                Download Map PDF
              </button>
            </div>
          </div>

          {/* Visual Map Render Placeholder */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-2xl relative aspect-16/10 overflow-hidden group">
            {/* Premium abstract grid representation of maps */}
            <div className="absolute inset-0 bg-slate-950 p-6 flex flex-col justify-between items-start text-left z-0">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold-500/5 blur-[50px]" />
              <div className="border-l-2 border-slate-800 h-full absolute left-1/3 top-0" />
              <div className="border-t-2 border-slate-800 w-full absolute left-0 top-1/2" />
              
              <div className="flex gap-2.5 items-center p-3 border border-gold-500/20 bg-slate-900/80 rounded-lg absolute left-1/3 top-[42%] z-10 shadow-lg">
                <MapPin className="h-5 w-5 text-gold-400 animate-bounce" />
                <div>
                  <h6 className="text-[11px] font-bold text-white uppercase leading-none">Gera Hinjewadi Site</h6>
                  <span className="text-[9px] text-slate-500 font-semibold tracking-wider">Hinjewadi Phase 3</span>
                </div>
              </div>

              <div className="flex gap-2.5 items-center p-2 border border-slate-800 bg-slate-900/40 rounded-lg absolute left-[5%] top-[15%]">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span className="text-[9px] text-slate-400 uppercase font-semibold">Megapolis Circle</span>
              </div>

              <div className="flex gap-2.5 items-center p-2 border border-slate-800 bg-slate-900/40 rounded-lg absolute left-[65%] top-[70%]">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span className="text-[9px] text-slate-400 uppercase font-semibold">Infosys Campus</span>
              </div>
            </div>

            {/* Unlock Map layer */}
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 border-t border-slate-900">
              <button
                type="button"
                onClick={() => openUnlockModal(
                  'location-map-large', 
                  'Unlock HD Location Layout & Route Map',
                  'Download a high-resolution version of our master location map and connectivity guide.'
                )}
                className="px-6 py-3 bg-linear-to-r from-gold-500 to-gold-600 text-slate-950 text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg cursor-pointer"
              >
                Unlock Live Map Direction
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
