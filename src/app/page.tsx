'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  Calendar,
  Shield,
  Award,
  Zap,
  Download,
  Building,
  Compass,
  CheckCircle2,
  Star,
  Activity,
  Heart,
  Trophy,
  Target,
  Sparkles,
  Waves,
  Music
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import EmiCalculator from '@/components/EmiCalculator';
import FloorPlansSection from '@/components/FloorPlansSection';
import GallerySection from '@/components/GallerySection';
import LocationSection from '@/components/LocationSection';
import FaqSection from '@/components/FaqSection';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Home() {
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('general');
  const [modalTitle, setModalTitle] = useState('Request Details');
  const [modalSubtitle, setModalSubtitle] = useState('Please register your interest to receive exclusive details.');

  // 1. Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 38, seconds: 15 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Social proof notifications
  const [socialProof, setSocialProof] = useState<string | null>(null);
  const [showSocialProof, setShowSocialProof] = useState(false);
  useEffect(() => {
    const messages = [
      "Amit S. from Baner just booked a site visit.",
      "Sneha M. from Wakad downloaded the Cost Sheet 2 mins ago.",
      "Rahul P. from Hinjewadi requested a VVIP callback.",
      "Karan J. from Pune downloaded the project brochure.",
      "Priya K. from Mumbai enquired about the 3 BHK Duplex."
    ];
    let index = 0;
    const initialDelay = setTimeout(() => {
      setSocialProof(messages[index]);
      setShowSocialProof(true);
      
      let hideTimeout = setTimeout(() => setShowSocialProof(false), 6000);
      
      const interval = setInterval(() => {
        index = (index + 1) % messages.length;
        setSocialProof(messages[index]);
        setShowSocialProof(true);
        hideTimeout = setTimeout(() => setShowSocialProof(false), 6000);
      }, 15000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(hideTimeout);
      };
    }, 5000);
    return () => clearTimeout(initialDelay);
  }, []);

  const openUnlockModal = (source: string, title: string, subtitle?: string) => {
    setModalSource(source);
    setModalTitle(title);
    setModalSubtitle(subtitle || 'Please register your interest to receive exclusive details.');
    setIsUnlockModalOpen(true);
    // Suppress auto-popup if it hasn't triggered yet
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('gera_auto_popup_shown', 'true');
    }
  };

  // 3. Auto popup modal on page load after a 5-second delay
  useEffect(() => {
    const popupShown = sessionStorage.getItem('gera_auto_popup_shown');
    if (!popupShown) {
      const timer = setTimeout(() => {
        openUnlockModal(
          'auto-popup',
          'Unlock Pre-Launch Benefits',
          'Register your profile to access direct builder inventory, unit configurations, and flexible payment plans.'
        );
        sessionStorage.setItem('gera_auto_popup_shown', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Stagger animation container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-gold-500 selection:text-slate-950 pb-20 md:pb-0">
      <Header />

      {/* 1. CINEMATIC HERO SECTION */}
      <section id="overview" className="relative h-screen min-h-[700px] flex items-center pt-20 overflow-hidden">
        {/* Cinematic Background with slow zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/hero-bg.jpg"
            alt="Gera Hinjewadi Luxury Aerial View"
            fill
            priority
            className="object-cover opacity-40 animate-cinematic-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Cinematic Text */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Subtle badge */}
              <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 border border-gold-500/20 rounded-full bg-slate-950/40 backdrop-blur-sm text-gold-400 text-[10px] font-semibold uppercase tracking-[0.2em]">
                <Award className="h-3 w-3" />
                <span>The Pinnacle of ChildCentric® Living</span>
              </div>

              {/* Serif Heading */}
              <div className="space-y-4">
                <h1 className="animate-fade-in-up-delay-1 section-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
                  Gera <span className="gold-gradient-text italic">Winds of Joy</span>
                  <br />
                  <span className="text-3xl sm:text-4xl lg:text-[2.8rem] text-slate-300 font-normal not-italic">
                    & Joy on the Treetops
                  </span>
                </h1>
                
                <p className="animate-fade-in-up-delay-2 text-base sm:text-lg text-slate-400 font-light tracking-wide max-w-lg leading-relaxed">
                  A prestigious sanctuary crafted for the visionary family. Meticulously designed residences nestled at Megapolis Circle, Hinjewadi Phase 3, Pune.
                </p>
              </div>

              {/* Elegant Stats Row */}
              <div className="animate-fade-in-up-delay-2 flex items-center gap-8 border-l-2 border-gold-500/30 pl-6 max-w-lg">
                <div className="space-y-0.5">
                  <span className="text-gold-400 font-bold text-xl">2 & 3 BHK</span>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-[0.15em]">Exclusive Suites</span>
                </div>
                <div className="w-px h-10 bg-slate-800" />
                <div className="space-y-0.5">
                  <span className="text-gold-400 font-bold text-xl">₹77.9L*</span>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-[0.15em]">Inaugural Pricing</span>
                </div>
                <div className="w-px h-10 bg-slate-800" />
                <div className="space-y-0.5">
                  <span className="text-gold-400 font-bold text-xl">5-Year</span>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-[0.15em]">Landmark Warranty</span>
                </div>
              </div>

              {/* RERA */}
              <div className="animate-fade-in-up-delay-3 flex items-center gap-2 text-[10px] text-slate-600 font-medium tracking-wider">
                <Shield className="h-3 w-3 text-gold-500/50" />
                <span>RERA: P52100054608 / P52100077635</span>
              </div>

              {/* CTAs */}
              <div className="animate-fade-in-up-delay-3 flex flex-wrap sm:flex-nowrap gap-3">
                <button
                  onClick={() => openUnlockModal(
                    'hero-visit', 
                    'Book Luxury Site Visit', 
                    'Schedule a personalized walkthrough of our exclusive experience center.'
                  )}
                  className="flex-1 flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-[11px] font-bold uppercase tracking-[0.15em] rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] cursor-pointer whitespace-nowrap"
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
                  className="flex-1 flex items-center justify-center gap-2.5 px-7 py-3.5 border border-slate-800/80 hover:border-gold-500/40 bg-slate-900/30 backdrop-blur-sm text-slate-300 hover:text-white text-[11px] font-bold uppercase tracking-[0.15em] rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <Download className="h-4 w-4 text-gold-500/70 shrink-0" />
                  <span>Download Brochure</span>
                </a>

                <a
                  href="tel:+919673000053"
                  className="flex-1 flex items-center justify-center gap-2.5 px-7 py-3.5 border border-slate-800/50 bg-transparent text-slate-400 hover:text-white text-[11px] font-bold uppercase tracking-[0.15em] rounded-lg transition-all duration-300 whitespace-nowrap"
                >
                  <Phone className="h-4 w-4 text-gold-400/60 shrink-0" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Right Column: Elegant Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="lg:col-span-5"
            >
              <div className="glassmorphism p-7 sm:p-9 rounded-2xl shadow-2xl relative border-gold-500/10 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-[9px] font-bold uppercase tracking-[0.2em] px-5 py-1.5 rounded-full">
                  Reserve Preferred Inventory
                </div>
                
                <h3 className="section-heading text-2xl font-semibold text-white mb-1 mt-2">
                  Preferred <span className="gold-gradient-text italic">Enquiry</span>
                </h3>
                <p className="text-[11px] text-slate-500 mb-6 font-light leading-relaxed">
                  Register your profile to access direct builder inventory, unit configurations, and flexible payment plans.
                </p>

                {/* Countdown Timer */}
                <div className="flex items-center justify-center gap-2.5 mb-6">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider shrink-0">Offer Ends In:</span>
                  <div className="flex gap-1.5 items-center">
                    {[
                      { label: 'd', value: timeLeft.days },
                      { label: 'h', value: timeLeft.hours },
                      { label: 'm', value: timeLeft.minutes },
                      { label: 's', value: timeLeft.seconds }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <div className="bg-slate-950/80 dark:bg-slate-950/60 border border-gold-500/10 dark:border-gold-500/20 rounded px-2 py-1 shadow-inner flex items-center justify-center min-w-[32px]">
                          <span className="text-gold-500 dark:text-gold-400 text-[11px] font-mono font-extrabold tracking-tight">
                            {String(item.value).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase">{item.label}</span>
                        {idx < 3 && <span className="text-slate-600 dark:text-slate-700 text-[10px]">:</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <LeadCaptureForm source="hero-form" project="Gera Winds of Joy" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE GERA */}
      <section id="why-choose-gera" className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="luxury-divider w-full" />
        {/* Dynamic Watermark Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <Image
            src="/gera_assets/FY-2026-27-Geras-Joy-On-The-TreeTops-phase-1-and-2/Elevations/Aerial Cam night copy.jpeg"
            alt="Gera Developments Pune premium night elevation view background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              Gera Hinjewadi ChildCentric® Homes Legacy
            </span>
            <h2 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              Why Choose <span className="gold-gradient-text italic">Gera Developments Pune</span>
            </h2>
            <div className="luxury-divider max-w-24 mx-auto mt-4" />
            <p className="text-sm text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
              Gera Developments sets the gold standard for residential craftsmanship. Our Hinjewadi estates offer a meticulously curated ecosystem where professional productivity meets child development.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Heart className="h-7 w-7 text-gold-500/80" />,
                title: 'Nurturing Future Leaders',
                desc: 'Celebrity-led academies in sports, performing arts, and cognitive skills right within your estate. No commute, just growth.',
              },
              {
                icon: <Shield className="h-7 w-7 text-gold-500/80" />,
                title: 'Uncompromising Assurances',
                desc: "A signature 5-year warranty on construction quality and structural integrity, establishing absolute trust.",
              },
              {
                icon: <Zap className="h-7 w-7 text-gold-500/80" />,
                title: 'Intelligent Residences',
                desc: 'High-speed fiber corridors, integrated automation, and multi-tier security systems to power your modern lifestyle.',
              },
              {
                icon: <Building className="h-7 w-7 text-gold-500/80" />,
                title: 'Lush 10-Acre Haven',
                desc: 'A seamlessly integrated master plan blending soaring tower elevations, a grand clubhouse, and expansive manicured green parks.',
              },
            ].map((usp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group text-center p-8 rounded-2xl border border-transparent hover:border-gold-500/10 transition-all duration-500 hover:bg-slate-900/20"
              >
                <div className="mx-auto mb-5 w-14 h-14 flex items-center justify-center rounded-full border border-slate-800/60 group-hover:border-gold-500/20 transition-colors duration-500">
                  {usp.icon}
                </div>
                <h4 className="section-heading text-lg font-semibold text-white mb-3">
                  {usp.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {usp.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* ChildCentric Academy Spotlight Section */}
          <div className="mt-24 border-t border-slate-900/60 pt-20 relative overflow-hidden rounded-3xl px-4 sm:px-8 py-10 bg-slate-950/10 dark:bg-slate-950/10">
            {/* Section background image watermark */}
            <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80"
                alt="Premium Sports Complex Backdrop"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                <span className="text-[9px] font-bold text-gold-400 uppercase tracking-widest">
                  Exclusively at Winds of Joy & Joy on the Treetops
                </span>
                <h4 className="section-heading text-2xl font-bold text-white uppercase tracking-wider">
                  Celebrity-Led <span className="gold-gradient-text italic">Academies</span>
                </h4>
                <p className="text-[11px] text-slate-500 font-light">
                  Gera&apos;s signature concept brings world-class sports, arts, and cognitive academies directly to your doorstep. No travel time, just growth.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
                {[
                  { name: 'Tensegrity Cricket', lead: 'Anil Kumble', icon: Trophy, bgImage: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=400&q=80', desc: 'Professional cricket training infrastructure & nets.' },
                  { name: 'Bhupathi Tennis', lead: 'Mahesh Bhupathi', icon: Target, bgImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=400&q=80', desc: 'World-standard tennis coaching courts & physical training.' },
                  { name: 'Shiamak Dance', lead: 'Shiamak Davar', icon: Sparkles, bgImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80', desc: 'Celebrity style dance training programs for all ages.' },
                  { name: 'Phelps Swimming', lead: 'Michael Phelps', icon: Waves, bgImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=400&q=80', desc: 'Structured swimming training syllabus in state-of-art pools.' },
                  { name: 'Mahadevan Music', lead: 'Shankar Mahadevan', icon: Music, bgImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80', desc: 'Vocal, classical, and instrumental training programs.' },
                ].map((academy, idx) => (
                  <div key={idx} className="relative overflow-hidden p-6 rounded-2xl border bg-slate-900/40 dark:bg-slate-900/40 bg-white/70 border-slate-200/60 dark:border-slate-900/50 hover:border-gold-500/30 dark:hover:border-gold-500/30 text-center flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gold-500/5">
                    {/* Card background image watermark */}
                    <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                      <Image
                        src={academy.bgImage}
                        alt={`${academy.name} background`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 dark:border-gold-500/20 text-gold-500 dark:text-gold-400 group-hover:from-gold-500 group-hover:to-gold-600 group-hover:text-slate-950 group-hover:border-gold-500 transition-all duration-500 group-hover:scale-110 shadow-inner">
                          <academy.icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-6" />
                        </div>
                        <h5 className="text-[11px] font-extrabold text-slate-900 dark:text-white uppercase tracking-wider leading-snug">{academy.name}</h5>
                        <span className="text-[9px] text-gold-600 dark:text-gold-400 font-extrabold block mt-1.5 uppercase tracking-widest">{academy.lead}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-3.5 font-normal leading-relaxed">
                        {academy.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            
            <div className="text-center mt-12">
              <button
                onClick={() => openUnlockModal(
                  'cc-academies',
                  'Request Academy Schedule & Details',
                  'Get a detailed brochure of all academy programs, class schedules, and trainer profiles.'
                )}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 hover:shadow-lg hover:shadow-gold-500/20 text-[10px] font-extrabold uppercase tracking-widest rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Request Academy Brochure</span>
              </button>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* 3. PRICE LIST */}
      <section id="pricing" className="py-32 bg-slate-900/20 relative overflow-hidden">
        <div className="luxury-divider w-full" />
        {/* Dynamic Watermark Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <Image
            src="/images/pricing_watermark_bg.png"
            alt="Gera Hinjewadi project pricing details chart background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              Gera Winds of Joy Price List & Offers
            </span>
            <h2 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              Curated Residences & <span className="gold-gradient-text italic">Exclusive Pricing</span>
            </h2>
            <div className="luxury-divider max-w-24 mx-auto mt-4" />
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
                    { config: '2 BHK Premier Suite', area: '750 - 810', price: '₹77.90 Lakhs*' },
                    { config: '2.5 BHK Executive Suite', area: '915 - 980', price: '₹98.50 Lakhs*' },
                    { config: '3 BHK Grand Imperial', area: '1050 - 1150', price: '₹1.15 Cr*' },
                    { config: '3 BHK Signature Duplex', area: '1210 - 1280', price: '₹1.38 Cr*' },
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

          {/* Interactive Price & Monthly EMI Estimator Slider */}
          <div className="max-w-4xl mx-auto mt-16 p-8 bg-slate-950 border border-slate-900 rounded-2xl shadow-xl backdrop-blur-sm">
            <div className="text-center mb-8 space-y-2">
              <h4 className="section-heading text-xl font-bold text-white uppercase tracking-wider">
                Interactive <span className="gold-gradient-text italic">EMI & Budget Planner</span>
              </h4>
              <p className="text-[11px] text-slate-500 font-light">
                Configure your home preference, adjust your down payment and loan tenure, and see your tentative monthly EMI.
              </p>
            </div>

            <EmiCalculator openUnlockModal={openUnlockModal} />
          </div>
        </div>
      </section>

      {/* 4. FLOOR PLANS */}
      <FloorPlansSection openUnlockModal={openUnlockModal} />

      {/* 5. AMENITIES */}
      <section id="amenities" className="py-32 bg-slate-900/20 relative overflow-hidden">
        <div className="luxury-divider w-full" />
        {/* Dynamic Watermark Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <Image
            src="/gera_assets/FY-2026-27-Geras-Joy-On-The-TreeTops-phase-1-and-2/Elevations/Go Kart Cam_1.jpeg"
            alt="Gera Winds of Joy active go karting track amenities background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              Luxury Lifestyle Amenities & Celebrity Academies
            </span>
            <h2 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              A Curated World of <span className="gold-gradient-text italic">Experiences</span>
            </h2>
            <div className="luxury-divider max-w-24 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-8">
            {[
              { title: 'Maestro Academies', icon: <Award className="h-5 w-5" />, desc: 'Cricket, tennis, and music academies by legendary maestros.' },
              { title: 'Rooftop Sky Pool', icon: <Activity className="h-5 w-5" />, desc: 'A floating infinity pool above Hinjewadi\'s tech skyline.' },
              { title: 'Signature Clubhouse', icon: <Building className="h-5 w-5" />, desc: 'A grand 20,000+ sq. ft. club offering gourmet social lounges.' },
              { title: 'Smart Gym & Spa', icon: <Zap className="h-5 w-5" />, desc: 'Fully equipped fitness center with premium therapy rooms.' },
              { title: 'Kid\'s Play Zones', icon: <Heart className="h-5 w-5" />, desc: 'Protected play arenas designed to foster motor skills.' },
              { title: 'Jogging Nature Trails', icon: <Compass className="h-5 w-5" />, desc: 'Green nature trails lined with seasonal shade trees.' },
              { title: 'Multi-Tier Security', icon: <Shield className="h-5 w-5" />, desc: 'Multi-tier digital surveillance and biometric checkpoints.' },
              { title: 'Co-working Bays', icon: <CheckCircle2 className="h-5 w-5" />, desc: 'Designed high-speed business desks for seamless WFH.' },
            ].map((amenity, idx) => (
              <div
                key={idx}
                className="text-center group"
              >
                <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full border border-slate-800/50 text-gold-400/70 group-hover:border-gold-500/30 group-hover:text-gold-400 transition-all duration-500">
                  {amenity.icon}
                </div>
                <h5 className="text-xs font-semibold text-white uppercase tracking-[0.1em] mb-1.5">
                  {amenity.title}
                </h5>
                <p className="text-[10px] text-slate-500 font-light">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY */}
      <GallerySection />

      {/* 7. LOCATION ADVANTAGES */}
      <LocationSection openUnlockModal={openUnlockModal} />

      {/* 8. ABOUT BUILDER */}
      <section id="builder" className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="luxury-divider w-full" />
        {/* Dynamic Watermark Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <Image
            src="/images/builder_legacy_bg.png"
            alt="Gera Developments legacy corporate profile background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Image column */}
            <div className="space-y-8 text-left">
              <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
                Gera Developments legacy in Pune Real Estate
              </span>
              <h2 className="section-heading text-4xl sm:text-5xl font-semibold text-white leading-tight">
                The Legacy of Gera Developments: <br/>50 Years of <span className="gold-gradient-text italic">Landmark Creations</span>
              </h2>
              <div className="luxury-divider max-w-24 mt-4" />
              
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Gera Developments is one of the most trusted icons in Indian real estate. For over five decades, Gera has pioneered innovation—introducing India&apos;s first ChildCentric® homes and setting industry benchmarks with a structural warranty program. Our commitment is built on transparent construction, timely handovers, and absolute quality control.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Known for spatial innovation, child development infrastructure, and customer-first services, Gera offers a landmark 5-year warranty on all projects, proving their dedication to durability and quality assurance.
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

            {/* Right: Brochure Download Card */}
            <div className="bg-slate-900/30 border border-slate-900 p-8 rounded-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gold-500/5 blur-[40px]" />
              <h4 className="section-heading text-xl font-semibold text-white mb-1">
                Builder Brochure & <span className="gold-gradient-text italic">Profile</span>
              </h4>
              <p className="text-[11px] text-slate-500 mb-6 font-light">
                Fill in your details below to instantly download the official Gera project brochure.
              </p>
              
              <LeadCaptureForm source="builder-brochure" project="Gera Developer Brochure" ctaText="Download Brochure Now" />

              {/* Direct Brochure Download Link - always visible after form */}
              <div className="mt-4 pt-4 border-t border-slate-900">
                <a
                  href="/images/Gera_Brochure.pdf"
                  download="Gera_Hinjewadi_Official_Brochure.pdf"
                  className="inline-flex items-center gap-2 text-[10px] text-gold-400/80 hover:text-gold-400 uppercase tracking-[0.15em] font-semibold transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Brochure PDF</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <FaqSection />

      {/* 10. TESTIMONIALS */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="luxury-divider w-full" />
        {/* Dynamic Watermark Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <Image
            src="/gera_assets/FY-2026-27-Geras-Joy-On-The-TreeTops-phase-1-and-2/Statics/MAY_CAMPAIGN_DIGITAL_2026_1080x1920 - invest.jpg"
            alt="Gera developments resident review testimonials background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              Gera Developments Resident Reviews
            </span>
            <h2 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              Voices of <span className="gold-gradient-text italic">Satisfaction</span>
            </h2>
            <div className="luxury-divider max-w-24 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Suresh & Divya Kulkarni',
                role: 'Verified Resident · Director of Engineering, Tech Park',
                review: "Gera's ChildCentric® concept has completely streamlined our weekly schedule. Having professional coaches teach cricket and tennis directly within the estate borders saves us hours of Pune commute time every day. The structural build quality is exceptional."
              },
              {
                name: 'Vikram Phadke',
                role: 'Verified Resident · VP of Operations, Hinjewadi Phase 2',
                review: 'The landmark 5-year warranty was the main deciding factor for us. Their digital application portal is transparent, keeping us updated on every micro-stage of structural progress. It offers complete transparency and absolute peace of mind.'
              },
              {
                name: 'Meenakshi Iyer',
                role: 'Verified Resident · Lead Architect, Global Tech Hub',
                review: 'Living adjacent to Megapolis Circle minimizes my daily travel. The rooftop sky pool and business co-working bays inside the clubhouse are spectacularly integrated. It is truly an uncompromising luxury experience.'
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
                    &ldquo;{test.review}&rdquo;
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
      <section className="py-32 bg-gradient-to-b from-slate-900/40 to-slate-950 relative overflow-hidden">
        <div className="luxury-divider w-full" />
        {/* Dynamic Watermark Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <Image
            src="/images/hero-bg.jpg"
            alt="Gera Winds of Joy premium drone view background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gold-500/3 blur-[120px] rounded-full scale-50 z-0" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative space-y-8 pt-8">
          <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
            Gera Hinjewadi Site Visit Booking
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Secure Your Private <br className="sm:hidden" />
            <span className="gold-gradient-text italic">VVIP Site Visit</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-light">
            Our VVIP private site inspections are fully coordinated by our Senior Asset Advisors. Complimentary private chauffeur pickup & drop-off is available upon request.
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
              <span>Request Private Exhibition</span>
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

      {/* SOCIAL PROOF NOTIFICATION TOAST */}
      <AnimatePresence>
        {showSocialProof && socialProof && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-40 bg-slate-950/90 backdrop-blur-md border border-gold-500/20 p-4 rounded-xl shadow-2xl flex items-center gap-3.5 max-w-sm"
          >
            <div className="relative flex shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </div>
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-widest text-gold-400 font-bold block mb-0.5">Live Activity</span>
              <p className="text-[11px] text-slate-200 font-semibold leading-relaxed">
                {socialProof}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE STICKY BOTTOM ACTION DOCK */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-gold-500/20 py-2.5 px-4 flex items-center justify-between gap-2.5 mobile-action-dock">
        <a
          href="tel:+919673000053"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 border border-slate-800 bg-slate-900 text-slate-200 text-[10px] font-bold uppercase tracking-wider rounded-lg"
        >
          <Phone className="h-3.5 w-3.5 text-gold-400" />
          <span>Call Sales</span>
        </a>
        <a
          href="https://wa.me/919673000053?text=Hi%21%20I%20am%20interested%20in%20Gera%20Hinjewadi%20and%20would%20like%20to%20get%20more%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 border border-emerald-800/30 bg-emerald-950/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-lg"
        >
          <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </a>
        <button
          onClick={() => openUnlockModal(
            'sticky-dock-visit',
            'Book Luxury Site Visit',
            'Schedule a complimentary site visit with luxury pick-up and drop service.'
          )}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider rounded-lg cursor-pointer"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Book Visit</span>
        </button>
      </div>
    </div>
  );
}
