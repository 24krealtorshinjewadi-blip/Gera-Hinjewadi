'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  Heart,
  Volume2,
  Tv,
  HelpCircle
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

  // 3. Calculator state variables
  const [calculatorBhk, setCalculatorBhk] = useState<'2bhk' | '2.5bhk' | '3bhk' | '3bhk-duplex'>('2bhk');
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);

  const getPriceForBhk = (bhk: typeof calculatorBhk) => {
    switch (bhk) {
      case '2bhk': return 7790000;
      case '2.5bhk': return 9850000;
      case '3bhk': return 11500000;
      case '3bhk-duplex': return 13800000;
    }
  };

  const calculateEmi = () => {
    const principal = getPriceForBhk(calculatorBhk) * (1 - downPaymentPct / 100);
    const annualInterestRate = 8.5; // Average Indian Home Loan Interest rate
    const monthlyRate = annualInterestRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return isNaN(emi) ? 0 : Math.round(emi);
  };

  // 4. Gallery Walkthrough Tabs
  const [activeGalleryTab, setActiveGalleryTab] = useState<'photos' | 'videos'>('photos');

  // 5. Travel Time commute traffic toggle
  const [isTrafficPeak, setIsTrafficPeak] = useState<boolean>(false);


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
                <span>RERA: P52100054608 / P52100055000</span>
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
                <div className="flex items-center justify-center gap-2.5 mb-5 bg-slate-950/60 p-2 border border-slate-900 rounded-lg shadow-inner">
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Offer ends in:</span>
                  <span className="text-gold-400 text-xs font-mono font-bold tracking-widest">
                    {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>

                <LeadCaptureForm source="hero-form" project="Gera Winds of Joy" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE GERA */}
      <section id="why-choose-gera" className="py-32 bg-slate-950 relative">
        <div className="luxury-divider w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              Gera Developments
            </span>
            <h3 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              The Pillars of <span className="gold-gradient-text italic">Landmark Living</span>
            </h3>
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
          <div className="mt-24 border-t border-slate-900/60 pt-20">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-[9px] font-bold text-gold-400 uppercase tracking-widest">
                Exclusively at Winds of Joy & Joy on the Treetops
              </span>
              <h4 className="section-heading text-2xl font-bold text-white uppercase tracking-wider">
                Celebrity-Led <span className="gold-gradient-text italic">Academies</span>
              </h4>
              <p className="text-[11px] text-slate-500 font-light">
                Gera's signature concept brings world-class sports, arts, and cognitive academies directly to your doorstep. No travel time, just growth.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Tensegrity Cricket', lead: 'Anil Kumble', icon: '🏏', desc: 'Professional cricket training infrastructure & nets.' },
                { name: 'Bhupathi Tennis', lead: 'Mahesh Bhupathi', icon: '🎾', desc: 'World-standard tennis coaching courts & physical training.' },
                { name: 'Shiamak Dance', lead: 'Shiamak Davar', icon: '💃', desc: 'Celebrity style dance training programs for all ages.' },
                { name: 'Phelps Swimming', lead: 'Michael Phelps', icon: '🏊', desc: 'Structured swimming training syllabus in state-of-art pools.' },
                { name: 'Mahadevan Music', lead: 'Shankar Mahadevan', icon: '🎵', desc: 'Vocal, classical, and instrumental training programs.' },
              ].map((academy, idx) => (
                <div key={idx} className="glassmorphism p-5 rounded-xl border border-slate-900/50 hover:border-gold-500/20 text-center flex flex-col justify-between group transition-all duration-300">
                  <div>
                    <span className="text-3xl mb-3 block filter saturate-100 group-hover:scale-110 transition-transform duration-300">{academy.icon}</span>
                    <h5 className="text-[11px] font-extrabold text-white uppercase tracking-wide leading-snug">{academy.name}</h5>
                    <span className="text-[9px] text-gold-400 font-bold block mt-1 uppercase tracking-widest">{academy.lead}</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-3 font-light leading-relaxed">
                    {academy.desc}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <button
                onClick={() => openUnlockModal(
                  'cc-academies',
                  'Request Academy Schedule & Details',
                  'Get a detailed brochure of all academy programs, class schedules, and trainer profiles.'
                )}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-gold-500/30 text-gold-400 hover:text-white text-[9px] font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                <span>Request Academy Brochure</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRICE LIST */}
      <section id="pricing" className="py-32 bg-slate-900/20 relative">
        <div className="luxury-divider w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              Investment Options
            </span>
            <h3 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              Curated Residences & <span className="gold-gradient-text italic">Exclusive Pricing</span>
            </h3>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                {/* 1. BHK Selection */}
                <div className="space-y-2.5">
                  <span className="block text-[10px] font-bold text-gold-400 uppercase tracking-widest">Select Configuration:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { key: '2bhk', label: '2 BHK' },
                      { key: '2.5bhk', label: '2.5 BHK' },
                      { key: '3bhk', label: '3 BHK' },
                      { key: '3bhk-duplex', label: 'Duplex' },
                    ].map((btn) => (
                      <button
                        key={btn.key}
                        onClick={() => setCalculatorBhk(btn.key as any)}
                        className={`py-2 px-1 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                          calculatorBhk === btn.key
                            ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-extrabold shadow-md'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Down Payment Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                    <span className="text-slate-400">Down Payment ({downPaymentPct}%):</span>
                    <span className="text-gold-400">₹{((getPriceForBhk(calculatorBhk) * downPaymentPct) / 100).toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={80}
                    step={5}
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-gold-500 range-slider-thumb"
                  />
                  <div className="flex justify-between text-[9px] text-slate-600 font-bold uppercase tracking-wider">
                    <span>10% (Min)</span>
                    <span>80% (Max)</span>
                  </div>
                </div>

                {/* 3. Loan Tenure Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                    <span className="text-slate-400">Loan Tenure:</span>
                    <span className="text-gold-400">{tenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-gold-500 range-slider-thumb"
                  />
                  <div className="flex justify-between text-[9px] text-slate-600 font-bold uppercase tracking-wider">
                    <span>5 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>

              {/* EMI Calculation Summary Card */}
              <div className="glassmorphism p-6 rounded-xl border border-gold-500/10 text-center space-y-4 relative overflow-hidden flex flex-col justify-between h-full min-h-[220px]">
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-gold-500/5 blur-[50px] pointer-events-none" />
                
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Estimated Monthly EMI</span>
                  <div className="text-2xl sm:text-4xl font-extrabold text-gold-400 font-mono mt-1 select-all">
                    ₹{calculateEmi().toLocaleString('en-IN')}
                    <span className="text-xs text-slate-400 font-sans font-light">/month*</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-2 font-light">
                    Calculated at base rate of 8.5% interest. Actual rates may vary by bank.
                  </p>
                </div>

                <div className="border-t border-slate-900 pt-4 text-left space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Tentative Property Value:</span>
                    <span className="text-white font-bold">₹{(getPriceForBhk(calculatorBhk) / 100000).toFixed(2)} Lakhs*</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Home Loan Principal:</span>
                    <span className="text-white font-bold">₹{((getPriceForBhk(calculatorBhk) * (1 - downPaymentPct / 100)) / 100000).toFixed(2)} Lakhs*</span>
                  </div>
                </div>

                <button
                  onClick={() => openUnlockModal(
                    'emi-loan-check',
                    'Check Home Loan Eligibility & Offers',
                    `Request customized down payment plan and bank partner deals for ${calculatorBhk.toUpperCase()} configuration.`
                  )}
                  className="w-full py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all hover:scale-[1.01] cursor-pointer"
                >
                  Apply & Pre-Approve Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLOOR PLANS */}
      <section id="floor-plans" className="py-32 bg-slate-950 relative">
        <div className="luxury-divider w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              Spatial Excellence
            </span>
            <h3 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              Meticulously Planned <span className="gold-gradient-text italic">Layouts</span>
            </h3>
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

            {/* Open Floor Plan Showcase - No Lock */}
            <div className="relative border border-slate-900 rounded-2xl overflow-hidden max-w-2xl mx-auto aspect-[4/3] bg-slate-900/20 group">
              <Image
                src="/floor-plan.png"
                alt={`${activePlanTab.toUpperCase()} Floor Plan Layout`}
                fill
                className="object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-left">
                <span className="text-[10px] text-gold-400 uppercase tracking-[0.15em] font-semibold">
                  {activePlanTab.toUpperCase()} Configuration
                </span>
              </div>
            </div>

            {/* Download Full Plan CTA */}
            <div className="mt-6">
              <button
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

      {/* 5. AMENITIES */}
      <section id="amenities" className="py-32 bg-slate-900/20 relative">
        <div className="luxury-divider w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              World-Class Living
            </span>
            <h3 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              A Curated World of <span className="gold-gradient-text italic">Experiences</span>
            </h3>
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
      <section id="gallery" className="py-32 bg-slate-950 relative">
        <div className="luxury-divider w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              Visual Showcase
            </span>
            <h3 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              Project <span className="gold-gradient-text italic">Gallery</span>
            </h3>
            <div className="luxury-divider max-w-24 mx-auto mt-4" />
          </div>

          {/* Gallery Segment Switcher */}
          <div className="flex justify-center gap-2 mb-10 bg-slate-900/40 p-1 rounded-xl border border-slate-900/60 max-w-xs mx-auto">
            <button
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

      {/* 7. LOCATION ADVANTAGES */}
      <section id="location" className="py-32 bg-slate-900/20 relative">
        <div className="luxury-divider w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              Perfect Proximity
            </span>
            <h3 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              Location <span className="gold-gradient-text italic">Advantages</span>
            </h3>
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
              <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl min-h-[260px] flex flex-col justify-between space-y-4">
                {/* Traffic toggle */}
                <div className="flex items-center justify-between bg-slate-900/50 p-2 rounded-lg border border-slate-900 shadow-inner">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    Commute Speed:
                  </span>
                  <div className="flex gap-1.5">
                    <button
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
      <section id="builder" className="py-32 bg-slate-950 relative">
        <div className="luxury-divider w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Image column */}
            <div className="space-y-8 text-left">
              <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
                Developer Profile
              </span>
              <h3 className="section-heading text-4xl sm:text-5xl font-semibold text-white leading-tight">
                The Legacy of Gera: <br/>50 Years of <span className="gold-gradient-text italic">Landmark Creations</span>
              </h3>
              <div className="luxury-divider max-w-24 mt-4" />
              
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Gera Developments is one of the most trusted icons in Indian real estate. For over five decades, Gera has pioneered innovation—introducing India's first ChildCentric® homes and setting industry benchmarks with a structural warranty program. Our commitment is built on transparent construction, timely handovers, and absolute quality control.
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

      {/* 9. FAQ */}
      <section className="py-32 bg-slate-900/20 relative">
        <div className="luxury-divider w-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              Have Questions?
            </span>
            <h3 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              Frequently Asked <span className="gold-gradient-text italic">Questions</span>
            </h3>
            <div className="luxury-divider max-w-24 mx-auto mt-4" />
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
            
            {/* Inline Quick Callback form under FAQs */}
            <div className="mt-12 p-6 glassmorphism rounded-xl border border-gold-500/10 text-center max-w-xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gold-500/3 blur-[30px] pointer-events-none" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center justify-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-gold-400" />
                Still have questions?
              </h4>
              <p className="text-[11px] text-slate-400 mb-4 font-light">
                Enter your mobile number below, and our senior sales manager will call you back within 10 minutes.
              </p>
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const target = e.currentTarget as HTMLFormElement;
                  const phoneInput = target.elements.namedItem('callbackPhone') as HTMLInputElement;
                  const phone = phoneInput.value;
                  if (!/^[6-9]\d{9}$/.test(phone)) {
                    alert('Please enter a valid 10-digit Indian mobile number');
                    return;
                  }
                  
                  try {
                    const response = await fetch('/api/leads', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        name: 'Quick Callback Request',
                        phone: phone,
                        budget: 'Unspecified',
                        configuration: 'Unspecified',
                        message: 'Requested direct callback from FAQ section.',
                        source: 'faq-callback',
                        project: 'Gera Winds of Joy'
                      })
                    });
                    if (response.ok) {
                      phoneInput.value = '';
                      const confetti = (await import('canvas-confetti')).default;
                      confetti({
                        particleCount: 50,
                        spread: 50,
                        colors: ['#d4af37', '#ffffff']
                      });
                      alert('Callback request submitted! We will call you shortly.');
                    } else {
                      alert('Failed to submit callback. Please try again.');
                    }
                  } catch (err) {
                    console.error(err);
                    alert('An error occurred. Please try again.');
                  }
                }}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <div className="relative flex-grow">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-xs font-bold font-mono">+91</span>
                  <input
                    type="tel"
                    name="callbackPhone"
                    maxLength={10}
                    required
                    placeholder="98765 43210"
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
                    }}
                    className="w-full bg-slate-900/50 border border-slate-800 focus:border-gold-500 rounded-lg pl-12 pr-4 py-2.5 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-gold-500/10 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider rounded-lg hover:opacity-95 transition-all whitespace-nowrap cursor-pointer shadow-md"
                >
                  Request Callback
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-32 bg-slate-950 relative">
        <div className="luxury-divider w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
              Verified Resident Stories
            </span>
            <h3 className="section-heading text-4xl sm:text-5xl font-semibold text-white">
              Voices of <span className="gold-gradient-text italic">Satisfaction</span>
            </h3>
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
      <section className="py-32 bg-gradient-to-b from-slate-900/40 to-slate-950 relative overflow-hidden">
        <div className="luxury-divider w-full" />
        <div className="absolute inset-0 bg-gold-500/3 blur-[120px] rounded-full scale-50" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative space-y-8 pt-8">
          <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
            Request Private Exhibition
          </span>
          <h3 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Secure Your Private <br className="sm:hidden" />
            <span className="gold-gradient-text italic">VVIP Site Visit</span>
          </h3>
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
