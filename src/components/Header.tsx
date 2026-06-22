'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MessageSquare, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LeadCaptureForm from './LeadCaptureForm';
import ThemeToggle from './ThemeToggle';

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

interface PromoItem {
  type: 'text' | 'link';
  content: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const PROMO_ITEMS: PromoItem[] = [
  {
    type: 'text',
    content: 'Pre-Launch Benefit: Zero Stamp Duty + Spot Booking Offers. Limited Inventory!',
  },
  {
    type: 'link',
    href: 'tel:+919673000053',
    content: 'Call Sales: +91 96730 00053',
    icon: Phone,
  },
  {
    type: 'link',
    href: 'https://wa.me/919673000053?text=Hi%21%20I%20am%20interested%20in%20Gera%20Hinjewadi%20and%20would%20like%20to%20get%20more%20details.',
    content: 'WhatsApp Us for Spot Bookings',
    icon: MessageSquare,
  },
  {
    type: 'text',
    content: 'Complimentary Site Pickup & Drop Service Available',
  },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-slate-950/95 backdrop-blur-lg border-b border-slate-900/50 shadow-lg'
        : 'bg-slate-950/30 backdrop-blur-sm border-b border-slate-900/10'
        }`}
    >
      {/* 1. TOP PROMO ANNOUNCEMENT BANNER */}
      <div className="bg-linear-to-r from-gold-800 via-gold-600 to-gold-800 py-2 text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] relative overflow-hidden w-full flex">
        <div className="flex animate-marquee whitespace-nowrap shrink-0">
          {/* First set of marquee items */}
          {PROMO_ITEMS.map((item, idx) => (
            <span key={`set1-${idx}`} className="mx-8 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0" />
              {item.type === 'link' && item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover:underline flex items-center gap-1.5 text-white hover:text-slate-200 transition-colors"
                >
                  {item.icon && <item.icon className="h-3 w-3 shrink-0" />}
                  <span>{item.content}</span>
                </a>
              ) : (
                <span>{item.content}</span>
              )}
            </span>
          ))}
          {/* Second set of marquee items for seamless loop */}
          {PROMO_ITEMS.map((item, idx) => (
            <span key={`set2-${idx}`} className="mx-8 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0" />
              {item.type === 'link' && item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover:underline flex items-center gap-1.5 text-white hover:text-slate-200 transition-colors"
                >
                  {item.icon && <item.icon className="h-3 w-3 shrink-0" />}
                  <span>{item.content}</span>
                </a>
              ) : (
                <span>{item.content}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col shrink-0">
            <span className="font-extrabold text-lg tracking-wider text-white leading-tight">
              GERA <span className="gold-gradient-text">HINJEWADI</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-gold-400/80 font-semibold leading-none mt-0.5">
              Pune • Premium Living
            </span>
          </Link>

          {/* Desktop Navigation - centered */}
          <nav className="hidden xl:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-gold-400 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs - right aligned, all inline */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Phone — compact pill */}
            <a
              href="tel:+919673000053"
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-800/80 rounded-full bg-slate-900/60 hover:bg-slate-900 hover:border-gold-500/40 text-slate-300 hover:text-white transition-all group shrink-0 whitespace-nowrap"
            >
              <Phone className="h-3.5 w-3.5 text-gold-400 group-hover:animate-pulse" />
              <span className="text-[11px] font-bold tracking-wide whitespace-nowrap">+91&nbsp;96730&nbsp;00053</span>
            </a>

            {/* WhatsApp — compact pill */}
            <a
              href="https://wa.me/919673000053?text=Hi%21%20I%20am%20interested%20in%20Gera%20Hinjewadi%20and%20would%20like%20to%20get%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 border border-emerald-800/30 rounded-full bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-400 transition-all shrink-0 whitespace-nowrap"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="text-[11px] font-bold tracking-wide whitespace-nowrap">WhatsApp</span>
            </a>

            {/* Book Visit — gold CTA */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger
                render={
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-linear-to-r from-gold-500 to-gold-600 hover:opacity-95 text-slate-950 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0 whitespace-nowrap">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Book Visit</span>
                  </button>
                }
              />
              <DialogContent className="glassmorphism sm:max-w-md border-gold-500/30 text-white rounded-xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold uppercase tracking-wider text-center">
                    {(() => {
                      const title = "Book Site Visit";
                      const parts = title.split(' ');
                      const goldCount = parts.length > 3 ? 2 : 1;
                      const base = parts.slice(0, -goldCount).join(' ') + ' ';
                      const gold = parts.slice(-goldCount).join(' ');
                      return <>{base}<span className="gold-gradient-text">{gold}</span></>;
                    })()}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-xs text-slate-400 text-center -mt-2">
                  Experience Gera&apos;s luxury project firsthand. Fill out the details below:
                </p>
                <LeadCaptureForm
                  source="header-modal"
                  project="Gera Winds of Joy"
                  onSuccess={() => setIsModalOpen(false)}
                  ctaText="Confirm Site Visit Book"
                />
              </DialogContent>
            </Dialog>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick Call */}
            <a
              href="tel:+919673000053"
              className="p-2.5 border border-slate-800 rounded-full bg-slate-900/80 text-gold-400 hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919673000053?text=Hi%21%20I%20am%20interested%20in%20Gera%20Hinjewadi%20and%20would%20like%20to%20get%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-emerald-800/30 rounded-full bg-emerald-950/20 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 border border-slate-800 rounded-full bg-slate-900/80 text-slate-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 py-6 px-4 bg-slate-950/98 border-b border-slate-900/90 shadow-2xl backdrop-blur-lg flex flex-col space-y-4 transition-all">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-semibold uppercase tracking-wider text-slate-300 py-1.5 border-b border-slate-900/50 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile CTA buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href="tel:+919673000053"
              className="flex items-center justify-center gap-1.5 py-3 border border-slate-800 bg-slate-900/50 text-slate-200 text-xs font-bold rounded-lg"
            >
              <Phone className="h-4 w-4 text-gold-400" />
              <span>Call Now</span>
            </a>

            <Dialog>
              <DialogTrigger
                render={
                  <button className="flex items-center justify-center gap-1.5 py-3 bg-linear-to-r from-gold-500 to-gold-600 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer">
                    <Calendar className="h-4 w-4" />
                    <span>Book Visit</span>
                  </button>
                }
              />
              <DialogContent className="glassmorphism sm:max-w-sm border-gold-500/30 text-white rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold uppercase tracking-wider text-center">
                    {(() => {
                      const title = "Book Site Visit";
                      const parts = title.split(' ');
                      const goldCount = parts.length > 3 ? 2 : 1;
                      const base = parts.slice(0, -goldCount).join(' ') + ' ';
                      const gold = parts.slice(-goldCount).join(' ');
                      return <>{base}<span className="gold-gradient-text">{gold}</span></>;
                    })()}
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
