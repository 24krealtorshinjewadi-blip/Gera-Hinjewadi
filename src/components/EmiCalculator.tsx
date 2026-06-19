'use client';

import { useState } from 'react';

interface EmiCalculatorProps {
  openUnlockModal: (source: string, title: string, subtitle?: string) => void;
}

export default function EmiCalculator({ openUnlockModal }: EmiCalculatorProps) {
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

  return (
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
                type="button"
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
          type="button"
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
  );
}
