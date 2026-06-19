'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <section className="py-32 bg-slate-900/20 relative overflow-hidden">
      <div className="luxury-divider w-full" />
      {/* Dynamic Watermark Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <Image
          src="/gera_assets/FY-2026-27 Gera's Joy On The TreeTops phase 1 & 2/Statics/MAY_CAMPAIGN_DIGITAL_2026_1080x1920 - serenity.jpg"
          alt="Gera Hinjewadi serenity garden landscaping background"
          fill
          className="object-cover"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <span className="text-[10px] font-semibold text-gold-400/80 uppercase tracking-[0.25em]">
            Gera Hinjewadi Frequently Asked Questions (FAQ)
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
              answer: 'Gera Winds of Joy is currently under active construction. Possession is scheduled starting October 2028 onwards. The detailed phase-wise possession timelines are registered under MahaRERA IDs P52100054608 and P52100077635.'
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
                
                // Check for fake Indian mobile number patterns
                const isAllSame = /^(\d)\1{9}$/.test(phone);
                const isSequential = phone === '9876543210' || phone === '1234567890' || phone === '6789012345';
                const uniqueDigits = new Set(phone.split(''));
                if (isAllSame || isSequential || uniqueDigits.size <= 2) {
                  alert('Please enter a genuine mobile number');
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
  );
}
