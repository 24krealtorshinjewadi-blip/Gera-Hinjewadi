'use client';

import Link from 'next/link';
import { Check, Phone, ArrowLeft, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-gold-500/5 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-gold-500/5 blur-[120px]" />

      <Header />

      <main className="grow flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8 z-10">
        <div className="max-w-md w-full text-center glassmorphism p-8 sm:p-10 rounded-2xl shadow-2xl relative border-gold-500/20">
          
          {/* Animated Gold Checkbox */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-linear-to-r from-gold-500 to-gold-600 shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-pulse mb-8">
            <Check className="h-10 w-10 text-slate-950 stroke-3" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-wider uppercase text-white mb-2">
            Thank <span className="gold-gradient-text">You</span>
          </h1>
          <p className="text-sm font-semibold tracking-widest text-gold-400 uppercase mb-6">
            Enquiry Submitted Successfully
          </p>

          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            We have received your request. A senior relationship executive from <strong className="text-white">Gera Hinjewadi Sales Team</strong> will get in touch with you shortly on your registered number to share pricing details, brochures, and schedule your site visit.
          </p>

          {/* Quick Action Contact Row */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4.5 mb-8 text-left space-y-3">
            <p className="text-xs font-semibold text-gold-300 uppercase tracking-widest">
              For Immediate Assistance
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="tel:+919673000053"
                className="flex items-center gap-2 text-slate-200 hover:text-gold-400 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                <Phone className="h-4 w-4 text-gold-400" />
                <span>Call Sales: +91&nbsp;96730&nbsp;00053</span>
              </a>
              <a
                href="https://wa.me/919673000053?text=Hi%21%20I%20just%20submitted%20my%20lead%20on%20the%20website.%20I%20would%20like%20to%20get%20instant%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp: +91&nbsp;96730&nbsp;00053</span>
              </a>
            </div>
          </div>

          {/* Return Links */}
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3 border border-gold-500/20 rounded-lg text-gold-400 hover:text-white hover:bg-gold-500/10 font-bold uppercase tracking-wider text-xs transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
