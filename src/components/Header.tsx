'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MessageSquare, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LeadCaptureForm from './LeadCaptureForm';

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Why Gera', href: '#why-choose-gera' },
  { label: 'Price List', href: '#pricing' },
  { label: 'Floor Plans', href: '#floor-plans' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Builder', href: '#builder' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/50 shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white">
              GERA <span className="gold-gradient-text">HINJWADI</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-gold-400 font-semibold leading-none mt-0.5">
              Pune • Premium Living
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Phone Button */}
            <a
              href="tel:+919673000053"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-800 rounded-full bg-slate-900/50 hover:bg-slate-900 hover:border-gold-500/50 text-slate-300 hover:text-white text-xs font-bold transition-all"
            >
              <Phone className="h-3.5 w-3.5 text-gold-400" />
              <span>+91 96730 00053</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919673000053?text=Hi%21%20I%20am%20interested%20in%20Gera%20Hinjewadi%20and%20would%20like%20to%20get%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-emerald-900/20 rounded-full bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-400 text-xs font-bold transition-all"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Book Site Visit Modal Trigger */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger
                render={
                  <button className="flex items-center gap-1.5 px-4.5 py-1.8 bg-gradient-to-r from-gold-500 to-gold-600 hover:opacity-95 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Book Visit</span>
                  </button>
                }
              />
              <DialogContent className="glassmorphism max-w-md border-gold-500/30 text-white rounded-xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold uppercase tracking-wider text-center">
                    Book <span className="gold-gradient-text">Site Visit</span>
                  </DialogTitle>
                </DialogHeader>
                <p className="text-xs text-slate-400 text-center -mt-2">
                  Experience Gera's luxury project firsthand. Fill out the details below:
                </p>
                <LeadCaptureForm
                  source="header-modal"
                  project="Gera Winds of Joy"
                  onSuccess={() => setIsModalOpen(false)}
                  ctaText="Confirm Site Visit Book"
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Quick Call */}
            <a
              href="tel:+919673000053"
              className="p-2 border border-slate-800 rounded-full bg-slate-900/80 text-gold-400 hover:text-white"
            >
              <Phone className="h-4 w-4" />
            </a>

            {/* Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-slate-800 rounded-full bg-slate-900/80 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 py-6 px-4 bg-slate-950 border-b border-slate-900/90 shadow-2xl flex flex-col space-y-4 transition-all">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-semibold uppercase tracking-wider text-slate-300 py-1.5 border-b border-slate-900/50 hover:text-gold-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href="https://wa.me/919673000053?text=Hi%21%20I%20am%20interested%20in%20Gera%20Hinjewadi%20and%20would%20like%20to%20get%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 border border-emerald-900/20 bg-emerald-950/20 text-emerald-400 text-xs font-bold rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>

            <Dialog>
              <DialogTrigger
                render={
                  <button className="flex items-center justify-center gap-1.5 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg">
                    <Calendar className="h-4 w-4" />
                    <span>Book Visit</span>
                  </button>
                }
              />
              <DialogContent className="glassmorphism max-w-sm border-gold-500/30 text-white rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold uppercase tracking-wider text-center">
                    Book <span className="gold-gradient-text">Site Visit</span>
                  </DialogTitle>
                </DialogHeader>
                <LeadCaptureForm
                  source="mobile-menu-modal"
                  project="Gera Winds of Joy"
                  ctaText="Schedule Site Visit"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </header>
  );
}
