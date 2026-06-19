'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  Shield,
  Award,
  Zap,
  Download,
  Maximize2,
  Building,
  Clock,
  Compass,
  CheckCircle2,
  Star,
  Lock,
  ChevronRight,
  ChevronDown,
  Eye,
  Activity,
  Heart
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureForm from '@/components/LeadCaptureForm';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Home() {
  const [activePlanTab, setActivePlanTab] = useState<'2bhk' | '2.5bhk' | '3bhk' | '3bhk-duplex'>('2bhk');
  const [activeLocationTab, setActiveLocationTab] = useState<'connectivity' | 'education' | 'healthcare' | 'offices'>('connectivity');
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('general');
  const [modalTitle, setModalTitle] = useState('Request Details');
  const [modalSubtitle, setModalSubtitle] = useState('Please register your interest to receive exclusive details.');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const openUnlockModal = (source: string, title: string, subtitle?: string) => {
    setModalSource(source);
    setModalTitle(title);
    setModalSubtitle(subtitle || 'Please register your interest to receive exclusive details.');
    setIsUnlockModalOpen(true);
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  } as any;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-gold-500 selection:text-slate-950">
      <Header />

      {/* 1. PREMIUM HERO SECTION */}
      <section id="overview" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        {/* Luxury Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Gera Hinjewadi Luxury Exterior"
            fill
            priority
            className="object-cover opacity-35 filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Premium Text Pitch */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Gold Label Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 border border-gold-500/30 rounded-full bg-gold-950/20 text-gold-400 text-xs font-semibold uppercase tracking-widest"
              >
                <Award className="h-3.5 w-3.5" />
                <span>Award-Winning ChildCentric® Homes</span>
              </motion.div>

              {/* Title & Core Meta */}
              <div className="space-y-3">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-tight"
                >
                  Gera <span className="gold-gradient-text">Winds of Joy</span>
                  <br />
                  <span className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold">
                    & Joy on the Treetops
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-300 font-medium max-w-xl"
                >
                  Hinjewadi Phase 3, Megapolis Circle, Pune
                </motion.p>
              </div>

              {/* USP Highlights Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-3 gap-4 border-y border-slate-900 py-4 max-w-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300"
              >
                <div className="flex flex-col gap-1 border-r border-slate-900">
                  <span className="text-gold-400 font-extrabold text-base sm:text-lg">2 & 3 BHK</span>
                  <span>Premium Suites</span>
                </div>
                <div className="flex flex-col gap-1 border-r border-slate-900 pl-2">
                  <span className="text-gold-400 font-extrabold text-base sm:text-lg">₹77.9 Lakhs*</span>
                  <span>Starting Price</span>
                </div>
                <div className="flex flex-col gap-1 pl-2">
                  <span className="text-gold-400 font-extrabold text-base sm:text-lg">5-Year</span>
                  <span>Brand Warranty</span>
                </div>
              </motion.div>

              {/* MahaRERA Reg details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold tracking-wider bg-slate-950/60 w-fit px-3 py-1 border border-slate-900 rounded-md"
              >
                <Shield className="h-3.5 w-3.5 text-gold-500" />
                <span>RERA ID: P52100054608 / P52100055000</span>
              </motion.div>

              {/* 3 Call-To-Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap sm:flex-nowrap gap-3"
              >
                <button
                  onClick={() => openUnlockModal(
                    'hero-visit', 
                    'Book Luxury Site Visit', 
                    'Schedule a personalized walkthrough of our exclusive experience center.'
                  )}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:opacity-95 text-slate-950 text-xs font-bold uppercase tracking-widest rounded-lg transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Book Site Visit</span>
                </button>

                <a
                  href="/images/Gera_Brochure.pdf"
                  download="Gera_Hinjewadi_Brochure.pdf"
                  onClick={(e) => {
                    e.preventDefault();
                    openUnlockModal(
                      'hero-brochure', 
                      'Download Project Brochure', 
                      'Enter your details to instantly unlock the high-resolution project brochure and layouts.'
                    );
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-slate-800 hover:border-gold-500/50 bg-slate-900/50 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="h-4 w-4 text-gold-500 shrink-0" />
                  <span>Download Brochure</span>
                </a>

                <a
                  href="tel:+919673000053"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-slate-800 bg-slate-900/10 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all whitespace-nowrap shrink-0"
                >
                  <Phone className="h-4 w-4 text-gold-400 animate-bounce shrink-0" />
                  <span>Call Now</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Hero Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="glassmorphism p-6 sm:p-8 rounded-2xl shadow-2xl relative border-gold-500/20 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  Exclusive Launch Pricing
                </div>
                
                <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-1">
                  Request <span className="gold-gradient-text">Enquiry</span>
                </h3>
                <p className="text-xs text-slate-400 mb-5">
                  Register today to get guaranteed best inventory & booking offers.
                </p>

                <LeadCaptureForm source="hero-form" project="Gera Winds of Joy" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE GERA */}
      <section id="why-choose-gera" className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Gera Developments
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Why Choose <span className="gold-gradient-text">Gera Hinjewadi</span>
            </h3>
            <div className="h-1 w-20 gold-gradient-bg mx-auto rounded-full mt-2" />
            <p className="text-sm text-slate-400">
              Gera is known for creating modern, durable homes that redefine family living. Our Hinjewadi developments feature an ecosystem optimized for modern professionals and their kids.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <Heart className="h-8 w-8 text-gold-500" />,
                title: 'ChildCentric® Homes',
                desc: 'Celebrity-led academies for cricket, tennis, music, gymnastics, and arts, ensuring development directly at your doorstep.',
              },
              {
                icon: <Shield className="h-8 w-8 text-gold-500" />,
                title: '5-Year Warranty',
                desc: "Gera's unique 5-year brand assurance on quality construction and materials for complete peace of mind.",
              },
              {
                icon: <Zap className="h-8 w-8 text-gold-500" />,
                title: 'Smart Home tech',
                desc: 'Fully integrated automated lighting, high-speed fiber connectivity, smart security access, and video door phones.',
              },
              {
                icon: <Building className="h-8 w-8 text-gold-500" />,
                title: '10+ Acre Eco-system',
                desc: 'Massive landscape design, multiple towers, signature clubhouse, and premium amenities nestled in nature.',
              },
            ].map((usp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-slate-900/40 border border-slate-900 hover:border-gold-500/30 p-6 rounded-xl transition-all duration-300 group hover:bg-slate-900/70"
              >
                <div className="mb-4 bg-slate-950 w-fit p-3 rounded-lg border border-slate-800 transition-colors group-hover:border-gold-500/20">
                  {usp.icon}
                </div>
                <h4 className="text-base font-bold text-white uppercase tracking-wider mb-2">
                  {usp.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {usp.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. PRICE LIST */}
      <section id="pricing" className="py-24 bg-slate-900/40 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Investment Options
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Configurations & <span className="gold-gradient-text">Pricing</span>
            </h3>
            <div className="h-1 w-20 gold-gradient-bg mx-auto rounded-full mt-2" />
          </div>

          <div className="max-w-4xl mx-auto bg-slate-950/60 border border-slate-900 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 bg-slate-950">
                    <th className="px-6 py-4.5 text-xs font-extrabold uppercase tracking-wider text-gold-400">
                      Configuration
                    </th>
                    <th className="px-6 py-4.5 text-xs font-extrabold uppercase tracking-wider text-gold-400">
                      Carpet Area (sq. ft)
                    </th>
                    <th className="px-6 py-4.5 text-xs font-extrabold uppercase tracking-wider text-gold-400">
                      Starting Price
                    </th>
                    <th className="px-6 py-4.5 text-right text-xs font-extrabold uppercase tracking-wider text-gold-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60">
                  {[
                    { config: '2 BHK Premium', area: '750 - 810', price: '₹77.90 Lakhs*' },
                    { config: '2.5 BHK Luxury', area: '915 - 980', price: '₹98.50 Lakhs*' },
                    { config: '3 BHK Grande', area: '1050 - 1150', price: '₹1.15 Cr*' },
                    { config: '3 BHK Duplex', area: '1210 - 1280', price: '₹1.38 Cr*' },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-slate-900/35 transition-colors">
                      <td className="px-6 py-4.5 text-sm font-bold text-white uppercase tracking-wide">
                        {row.config}
                      </td>
                      <td className="px-6 py-4.5 text-sm text-slate-300 font-semibold">
                        {row.area} Sq. Ft.
                      </td>
                      <td className="px-6 py-4.5 text-sm text-gold-400 font-extrabold">
                        {row.price}
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <button
                          onClick={() => openUnlockModal(
                            `price-${row.config}`, 
                            `Get Pricing Details for ${row.config}`,
                            `Request exclusive launch pricing and availability for ${row.config} configurations.`
                          )}
                          className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-gold-500 text-gold-400 hover:text-white text-[10px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
                        >
                          Request Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="relative w-full aspect-[4/3] sm:aspect-video border-t border-slate-900">
              <Image 
                src="/images/pricing-chart.jpg" 
                alt="Gera Hinjewadi Official Pricing Chart" 
                fill 
                className="object-contain bg-slate-900/50 p-2"
              />
            </div>

            <div className="p-6 bg-slate-950 border-t border-slate-900 text-center">
              <button
                onClick={() => openUnlockModal(
                  'price-cost-sheet', 
                  'Download Complete Cost Sheet & Payment Plan',
                  'Unlock a detailed cost breakdown and flexible payment schedules instantly.'
                )}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-xs font-extrabold uppercase tracking-widest rounded-lg hover:opacity-95 shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Get Detailed Cost Sheet</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLOOR PLANS */}
      <section id="floor-plans" className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Smart Spaces
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Interactive <span className="gold-gradient-text">Floor Plans</span>
            </h3>
            <div className="h-1 w-20 gold-gradient-bg mx-auto rounded-full mt-2" />
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
                  onClick={() => setActivePlanTab(tab.key as any)}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activePlanTab === tab.key
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 shadow-md font-extrabold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Locked Floor Plan Showcase */}
            <div className="relative border border-slate-900 rounded-2xl overflow-hidden max-w-2xl mx-auto aspect-[4/3] bg-slate-900/20 group">
              <Image
                src="/floor-plan.png"
                alt={`${activePlanTab.toUpperCase()} Floor Plan Layout`}
                fill
                className="object-cover blur-[8px] opacity-25 filter brightness-50 transition-all duration-500 group-hover:scale-[1.01]"
              />

              {/* Centered Glass Lock Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/60 backdrop-blur-[3px] border border-gold-500/10">
                <div className="bg-slate-900 border border-gold-500/30 p-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.15)] mb-4">
                  <Lock className="h-8 w-8 text-gold-400" />
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
                  Unlock Layout Details
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  Verify your details to unlock high-resolution floor layouts, dimensions, and layout configurations.
                </p>
                <button
                  onClick={() => openUnlockModal(
                    `floor-${activePlanTab}`, 
                    `Unlock Floor Plan - ${activePlanTab.toUpperCase()}`,
                    `Register to view high-resolution 2D and 3D floor plan layouts for this configuration.`
                  )}
                  className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:opacity-95 text-slate-950 text-xs font-bold uppercase tracking-widest rounded-lg shadow-md active:scale-[0.98] transition-all cursor-pointer"
                >
                  Unlock High-Res Layout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AMENITIES */}
      <section id="amenities" className="py-24 bg-slate-900/40 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              World-Class Living
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Signature <span className="gold-gradient-text">Amenities</span>
            </h3>
            <div className="h-1 w-20 gold-gradient-bg mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { title: 'Celebrity Academies', icon: <Award className="h-6 w-6" />, desc: 'Cricket & Music coaching' },
              { title: 'Rooftop Swimming Pool', icon: <Activity className="h-6 w-6" />, desc: 'Infinity pool overlooking tech parks' },
              { title: 'Signature Clubhouse', icon: <Building className="h-6 w-6" />, desc: '20,000+ sq. ft. recreational hall' },
              { title: 'Smart Gym & Spa', icon: <Zap className="h-6 w-6" />, desc: 'Fully loaded fitness studio' },
              { title: 'Kid\'s Play Zones', icon: <Heart className="h-6 w-6" />, desc: 'Soft-play areas & playgrounds' },
              { title: 'Jogging Track', icon: <Compass className="h-6 w-6" />, desc: 'Lined with seasonal trees' },
              { title: '24/7 Security & CCTV', icon: <Shield className="h-6 w-6" />, desc: 'Triple layer surveillance' },
              { title: 'Bespoke Co-working Spaces', icon: <CheckCircle2 className="h-6 w-6" />, desc: 'Lounge desks & meeting bays' },
            ].map((amenity, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-900 hover:border-gold-500/20 p-5 rounded-xl transition-all duration-300 text-left hover:scale-[1.02] shadow-sm hover:shadow-lg hover:bg-slate-950/80 group"
              >
                <div className="text-gold-400 mb-3 bg-slate-900 w-fit p-2.5 rounded-lg border border-slate-800 group-hover:border-gold-500/10 group-hover:text-gold-300 transition-colors">
                  {amenity.icon}
                </div>
                <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                  {amenity.title}
                </h5>
                <p className="text-[11px] text-slate-500 font-medium">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY */}
      <section id="gallery" className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Visual Showcase
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Project <span className="gold-gradient-text">Gallery</span>
            </h3>
            <div className="h-1 w-20 gold-gradient-bg mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Tower Elevation', path: '/images/gallery-1.jpg', text: 'High-res view of the development' },
              { label: 'Serene Lifestyle', path: '/images/gallery-2.jpg', text: 'Luxurious family living' },
              { label: 'Smart Investment', path: '/images/gallery-3.jpg', text: 'Premium configurations' }
            ].map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl border border-slate-900 aspect-video group cursor-pointer bg-slate-900"
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
        </div>
      </section>

      {/* 7. LOCATION ADVANTAGES */}
      <section id="location" className="py-24 bg-slate-900/40 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Perfect Proximity
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Location <span className="gold-gradient-text">Advantages</span>
            </h3>
            <div className="h-1 w-20 gold-gradient-bg mx-auto rounded-full mt-2" />
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
                    onClick={() => setActiveLocationTab(tab.key as any)}
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
              <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl min-h-[200px] flex flex-col justify-between">
                <ul className="space-y-4">
                  {activeLocationTab === 'connectivity' && (
                    <>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Megapolis Circle</span>
                        <span className="text-gold-400 font-bold">2 Mins</span>
                      </li>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Hinjewadi-Shivajinagar Metro</span>
                        <span className="text-gold-400 font-bold">5 Mins</span>
                      </li>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Pune-Bangalore Highway</span>
                        <span className="text-gold-400 font-bold">15 Mins</span>
                      </li>
                    </>
                  )}
                  {activeLocationTab === 'offices' && (
                    <>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">TCS & Cognizant Hinjewadi</span>
                        <span className="text-gold-400 font-bold">4 Mins</span>
                      </li>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Infosys Phase 3 Campus</span>
                        <span className="text-gold-400 font-bold">5 Mins</span>
                      </li>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Wipro Phase 2 Campus</span>
                        <span className="text-gold-400 font-bold">8 Mins</span>
                      </li>
                    </>
                  )}
                  {activeLocationTab === 'education' && (
                    <>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Alard Public School</span>
                        <span className="text-gold-400 font-bold">3 Mins</span>
                      </li>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Blue Ridge Public School</span>
                        <span className="text-gold-400 font-bold">10 Mins</span>
                      </li>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Symbiosis International University</span>
                        <span className="text-gold-400 font-bold">12 Mins</span>
                      </li>
                    </>
                  )}
                  {activeLocationTab === 'healthcare' && (
                    <>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Sanjivani Hospital</span>
                        <span className="text-gold-400 font-bold">8 Mins</span>
                      </li>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Ruby Hall Clinic Hinjewadi</span>
                        <span className="text-gold-400 font-bold">12 Mins</span>
                      </li>
                      <li className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Lifepoint Multispecialty Hospital</span>
                        <span className="text-gold-400 font-bold">15 Mins</span>
                      </li>
                    </>
                  )}
                </ul>

                <button
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
            <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-2xl relative aspect-[16/10] overflow-hidden group">
              {/* Premium abstract grid representation of maps */}
              <div className="absolute inset-0 bg-slate-950 p-6 flex flex-col justify-between items-start text-left relative z-0">
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
                  onClick={() => openUnlockModal(
                    'location-map-large', 
                    'Unlock HD Location Layout & Route Map',
                    'Download a high-resolution version of our master location map and connectivity guide.'
                  )}
                  className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg cursor-pointer"
                >
                  Unlock Live Map Direction
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. ABOUT BUILDER */}
      <section id="builder" className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Image column (Stylized Logo panel) */}
            <div className="space-y-6 text-left">
              <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
                Developer Profile
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                About <span className="gold-gradient-text">Gera Developments</span>
              </h3>
              <div className="h-1 w-20 gold-gradient-bg rounded-full mt-2" />
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Gera Developments is one of the most trusted and legendary real estate developers in India, with over 50 years of creating premium residential spaces. Pioneering the revolutionary **ChildCentric® Homes** concept, Gera creates living environments that support childrens growth through celebrity-led training academies right within the society.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Known for innovation, customer-first service, and transparent construction standards, Gera offers a landmark 5-year warranty on all residential projects, proving their dedication to durability and quality control.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-900">
                <div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white">50+ Years</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Legacy</p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white">60+</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Projects</p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white">10M+ Sq.Ft</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Constructed</p>
                </div>
              </div>
            </div>

            {/* Right Form Card Panel */}
            <div className="bg-slate-900/30 border border-slate-900 p-8 rounded-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gold-500/5 blur-[40px]" />
              <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-1">
                Builder Brochure & <span className="gold-gradient-text">Profile</span>
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                Request a comprehensive builder profile dossier and complete developer project history portfolio.
              </p>
              
              <LeadCaptureForm source="builder-form" project="Gera Developer Profile" ctaText="Request Profile Details" />
            </div>

          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 bg-slate-900/40 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Have Questions?
            </h2>
            <h3 className="text-3xl font-extrabold uppercase tracking-tight text-white">
              Frequently Asked <span className="gold-gradient-text">Questions</span>
            </h3>
            <div className="h-1 w-20 gold-gradient-bg mx-auto rounded-full mt-2" />
          </div>

          <div className="w-full text-left space-y-4">
            {[
              {
                id: 'faq-1',
                question: 'What are ChildCentric® Homes?',
                answer: 'ChildCentric Homes are a signature concept by Gera Developments that helps kids explore and grow. They include academy coaching for sports (cricket, tennis), music, dance, gymnastics, and arts, led by celebrities, directly inside the community so kids do not have to travel for coaching.'
              },
              {
                id: 'faq-2',
                question: 'What is the construction status & possession date?',
                answer: 'Gera Winds of Joy is currently under active construction. Possession is scheduled starting October 2028 onwards. The detailed phase-wise possession timelines are registered under MahaRERA IDs P52100054608 and P52100055000.'
              },
              {
                id: 'faq-3',
                question: 'What are the starting prices for 2 & 3 BHK apartments?',
                answer: 'Pricing for 2 BHK starts at ₹77.9 Lakhs* (agreement value), while 3 BHK units start at ₹1.15 Cr*. These prices exclude government taxes, stamp duties, and registration charges. Detailed all-inclusive cost sheets are available on request.'
              },
              {
                id: 'faq-4',
                question: 'Are bank loans approved for this project?',
                answer: 'Yes, this project is approved by major financial institutions including SBI, HDFC Bank, ICICI Bank, and LIC Housing Finance. We offer end-to-end home loan assistance to buyers.'
              }
            ].map((faq) => (
              <div key={faq.id} className="border border-slate-900 bg-slate-950 px-6 rounded-xl">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wider text-slate-200 hover:text-gold-400 py-4.5 cursor-pointer text-left focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 text-gold-500 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === faq.id && (
                  <div className="text-xs text-slate-400 leading-relaxed pt-2 pb-4 border-t border-slate-900">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Happy Families
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Customer <span className="gold-gradient-text">Testimonials</span>
            </h3>
            <div className="h-1 w-20 gold-gradient-bg mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Suresh & Divya Kulkarni',
                role: 'Verified Buyer, 2.5 BHK Owner',
                review: 'Gera\'s ChildCentric concept has changed how we manage our days. Our kids learn cricket and music within the society boundaries, which saves us hours of travel and traffic in Hinjewadi. The construction quality is exceptionally high.'
              },
              {
                name: 'Vikram Phadke',
                role: 'Verified Buyer, 3 BHK Owner',
                review: 'The 5-year warranty was the main reason we chose Gera over other developers in Hinjewadi. Their client portal App is easy to use, updates on construction are regular, and the billing is completely transparent. Highly recommended!'
              },
              {
                name: 'Meenakshi Iyer',
                role: 'Verified Buyer, 3 BHK Duplex Owner',
                review: 'Living close to Megapolis Circle has saved me a lot of commute time to my office. The rooftop infinity pool and co-working spaces inside the clubhouse are spectacular. Truly a premium experience.'
              }
            ].map((test, index) => (
              <div
                key={index}
                className="bg-slate-900/40 border border-slate-900 p-6 rounded-xl text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{test.review}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-900">
                  <h6 className="text-xs font-bold text-white uppercase tracking-wider">{test.name}</h6>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-0.5 block">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA SECTION */}
      <section className="py-24 bg-gradient-to-b from-slate-900/60 to-slate-950 border-t border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gold-500/5 blur-[100px] rounded-full scale-50" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative space-y-6">
          <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
            Reserve Your Home Today
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Schedule a Private <br className="sm:hidden" />
            <span className="gold-gradient-text">VVIP Site Visit</span>
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Get private details, high-res floor plans, payment schedules, and exclusive home booking deals. Schedule a walkthrough of our luxury experience center.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => openUnlockModal(
                'final-cta-visit', 
                'Book VVIP Site Visit',
                'Schedule a private walkthrough of our luxury experience center with a senior executive.'
              )}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:opacity-95 text-slate-950 text-xs font-extrabold uppercase tracking-widest rounded-lg shadow-xl active:scale-[0.98] transition-all cursor-pointer"
            >
              <Calendar className="h-4.5 w-4.5" />
              <span>Schedule Site Visit</span>
            </button>

            <a
              href="https://wa.me/919673000053?text=Hi%21%20I%20want%20to%20book%20a%20site%20visit%20for%20Gera%20Hinjewadi."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 border border-slate-800 bg-slate-900 hover:bg-slate-900/80 text-emerald-400 hover:text-white text-xs font-extrabold uppercase tracking-widest rounded-lg transition-all whitespace-nowrap"
            >
              <MessageSquare className="h-4.5 w-4.5 text-emerald-400" />
              <span>WhatsApp Sales</span>
            </a>

            <a
              href="tel:+919673000053"
              className="flex items-center gap-2 px-8 py-4 border border-slate-800 bg-slate-900/10 text-slate-200 hover:text-white text-xs font-extrabold uppercase tracking-widest rounded-lg transition-all whitespace-nowrap"
            >
              <Phone className="h-4.5 w-4.5 text-gold-400" />
              <span>Call Us: +91&nbsp;96730&nbsp;00053</span>
            </a>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <Footer />

      {/* DYNAMIC UNLOCK/CTA MODAL DIALOG */}
      <Dialog open={isUnlockModalOpen} onOpenChange={setIsUnlockModalOpen}>
        <DialogContent className="glassmorphism max-w-md border-gold-500/30 text-white rounded-xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold uppercase tracking-wider text-center">
              {(() => {
                if (modalTitle.includes(' - ')) {
                  const [base, gold] = modalTitle.split(' - ');
                  return <>{base} - <span className="gold-gradient-text">{gold}</span></>;
                }
                const parts = modalTitle.split(' ');
                if (parts.length <= 1) return modalTitle;
                const goldCount = parts.length > 3 ? 2 : 1;
                const base = parts.slice(0, -goldCount).join(' ') + ' ';
                const gold = parts.slice(-goldCount).join(' ');
                return <>{base}<span className="gold-gradient-text">{gold}</span></>;
              })()}
            </DialogTitle>
          </DialogHeader>
          <p className="text-xs text-slate-400 text-center -mt-2">
            {modalSubtitle}
          </p>
          <LeadCaptureForm
            source={modalSource}
            project="Gera Winds of Joy"
            onSuccess={() => setIsUnlockModalOpen(false)}
            ctaText="Request Details Instantly"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
