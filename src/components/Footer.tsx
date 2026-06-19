import { MapPin, Phone, Mail, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-slate-400 text-xs tracking-wide relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand/RERA column */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-white tracking-wider">
              GERA <span className="gold-gradient-text">HINJWADI</span>
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Experience the pinnacle of premium living at Pune's premier IT hub. ChildCentric® smart homes designed for growth, security, and world-class luxury.
            </p>
            <div className="space-y-1 pt-2">
              <p className="font-semibold text-gold-400 uppercase tracking-widest text-[10px]">
                MahaRERA Registration Numbers:
              </p>
              <p className="text-slate-300 font-medium">
                Gera Winds of Joy: P52100054608
              </p>
              <p className="text-slate-300 font-medium">
                Joy on the Treetops: P52100077635
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-white tracking-wider">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#overview" className="hover:text-gold-400 transition-colors">Project Overview</a>
              </li>
              <li>
                <a href="#why-choose-gera" className="hover:text-gold-400 transition-colors">Why Choose Gera</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-gold-400 transition-colors">Pricing Options</a>
              </li>
              <li>
                <a href="#floor-plans" className="hover:text-gold-400 transition-colors">Floor Plan Layouts</a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-gold-400 transition-colors">Luxury Amenities</a>
              </li>
              <li>
                <a href="#location" className="hover:text-gold-400 transition-colors">Location Details</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-white tracking-wider">
              SALES ENQUIRIES
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Gera Joy on the Treetops / Winds of Joy Site Office,<br />
                  Near Megapolis Circle, Hinjewadi Phase 3, Pune, MH - 411057
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold-400 shrink-0" />
                <a href="tel:+919673000053" className="text-slate-300 hover:text-gold-400 font-bold transition-colors">
                  +91&nbsp;96730&nbsp;00053
                </a>
              </li>

            </ul>
          </div>

          {/* Call-to-action Column */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-white tracking-wider">
              BOOK SITE VISIT
            </h4>
            <p className="text-slate-400">
              Schedule a private site inspection and experience our experience center first-hand with complimentary pickup & drop-off.
            </p>
            <a
              href="#overview"
              className="inline-block px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-gold-500 text-gold-400 hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-lg transition-all"
            >
              Request Free Consultation
            </a>
          </div>
        </div>

        {/* MahaRERA Compliance Trust Badge */}
        <div className="border-t border-slate-900 pt-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 bg-slate-900 border border-gold-500/20 rounded-lg flex items-center justify-center shrink-0 shadow-inner">
              <div className="text-[9px] font-bold text-gold-400 text-center leading-tight">
                MahaRERA<br />
                <span className="text-[6px] text-slate-500 font-extrabold tracking-widest block mt-0.5">VERIFIED</span>
              </div>
            </div>
            <div>
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wider">
                MahaRERA Registered Project
              </h5>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
                This project is registered under MahaRERA registration number <strong>P52100054608</strong> (Gera Winds of Joy) and <strong>P52100077635</strong> (Gera Joy on the Treetops). Details are available on the website <a href="https://maharera.maharashtra.gov.in" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline">maharera.maharashtra.gov.in</a> under registered projects.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="px-3 py-1.5 border border-slate-800 rounded bg-slate-900/40 text-gold-400 text-[9px] font-bold tracking-widest uppercase">
              RERA APPROVED
            </span>
            <span className="px-3 py-1.5 border border-emerald-950/20 rounded bg-emerald-950/10 text-emerald-400 text-[9px] font-bold tracking-widest uppercase">
              ESCROW PROTECTED
            </span>
          </div>
        </div>

        {/* Legal Disclaimer block */}
        <div className="border-t border-slate-900 pt-8 pb-4 space-y-4">
          <div className="flex items-start gap-2 text-slate-500 leading-relaxed text-[11px]">
            <ShieldAlert className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
            <p>
              <strong>Disclaimer:</strong> This is a marketing and informational landing page representing Gera Developments projects in Hinjewadi, Pune. The content on this website is for informational purposes only and does not constitute an offer, commitment, or warranty of service. We are authorized marketing agents (channel partners) for MahaRERA registered projects. The developer reserves the right to make changes to layouts, designs, plans, prices, and specifications without prior notice. All images and renders are architectural impressions. For the most accurate and official details, please cross-reference with MahaRERA official website.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-600 pt-2 border-t border-slate-900/40">
            <p>© {new Date().getFullYear()} Gera Hinjewadi Sales Partner. All rights reserved.</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="#disclaimer" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#disclaimer" className="hover:text-slate-400 transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
