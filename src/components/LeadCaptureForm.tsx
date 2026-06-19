'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Loader2, Send } from 'lucide-react';

// Indian Mobile Validation regex (10 digits starting with 6-9)
const phoneRegex = /^[6-9]\d{9}$/;

const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  budget: z.string().min(1, 'Please select your budget'),
  configuration: z.string().min(1, 'Please select a configuration'),
  visitDate: z.string().optional(),
  visitTimeSlot: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

interface LeadCaptureFormProps {
  source?: string;
  project?: string;
  onSuccess?: () => void;
  ctaText?: string;
}

export default function LeadCaptureForm({
  source = 'website',
  project = 'Gera Winds of Joy',
  onSuccess,
  ctaText = 'Submit Enquiry',
}: LeadCaptureFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isVisitSource = source.toLowerCase().includes('visit') || source.toLowerCase().includes('modal');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      budget: '',
      configuration: '',
      visitDate: '',
      visitTimeSlot: '',
      message: '',
    },
  });

  const onSubmit = async (values: LeadFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          project,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      // Success effects
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#c5a880', '#080b11', '#ffffff'],
      });

      reset();
      
      if (onSuccess) {
        onSuccess();
      }

      // Short delay for confetti animation
      setTimeout(() => {
        router.push('/thank-you');
      }, 1000);

    } catch (error: any) {
      console.error('Lead submit error:', error);
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-left p-2"
    >
      <div>
        <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          {...register('name')}
          className={`w-full bg-slate-900/40 backdrop-blur-sm border ${
            errors.name ? 'border-red-500/50 focus:ring-red-500/20' : 'border-slate-800/80 hover:border-gold-500/30 focus:border-gold-500 focus:ring-gold-500/20'
          } rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-4 transition-all duration-300 shadow-inner`}
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-red-400" />
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="group">
          <label className="block text-[10px] font-bold text-gold-400/90 uppercase tracking-[0.15em] mb-1.5 group-hover:text-gold-300 transition-colors">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 text-slate-300 text-sm font-bold">
              +91
            </span>
            <input
              type="tel"
              maxLength={10}
              placeholder="98765 43210"
              {...register('phone')}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
              }}
              className={`w-full bg-slate-900/40 backdrop-blur-sm border ${
                errors.phone ? 'border-red-500/50 focus:ring-red-500/20' : 'border-slate-800/80 hover:border-gold-500/30 focus:border-gold-500 focus:ring-gold-500/20'
              } rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-4 transition-all duration-300 shadow-inner`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-red-400" />
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="group">
          <label className="block text-[10px] font-bold text-gold-400/90 uppercase tracking-[0.15em] mb-1.5 group-hover:text-gold-300 transition-colors">
            Email Address <span className="text-slate-500/70 lowercase tracking-normal font-medium">(Optional)</span>
          </label>
          <input
            type="email"
            placeholder="name@email.com"
            {...register('email')}
            className={`w-full bg-slate-900/40 backdrop-blur-sm border ${
              errors.email ? 'border-red-500/50 focus:ring-red-500/20' : 'border-slate-800/80 hover:border-gold-500/30 focus:border-gold-500 focus:ring-gold-500/20'
            } rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-4 transition-all duration-300 shadow-inner`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-red-400" />
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="group">
          <label className="block text-[10px] font-bold text-gold-400/90 uppercase tracking-[0.15em] mb-1.5 group-hover:text-gold-300 transition-colors">
            Configuration <span className="text-red-500">*</span>
          </label>
          <select
            {...register('configuration')}
            className={`w-full bg-slate-900/40 backdrop-blur-sm border ${
              errors.configuration ? 'border-red-500/50 focus:ring-red-500/20' : 'border-slate-800/80 hover:border-gold-500/30 focus:border-gold-500 focus:ring-gold-500/20'
            } rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-4 transition-all duration-300 shadow-inner appearance-none cursor-pointer`}
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%2394a3b8\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="" disabled className="bg-slate-950 text-slate-500">Select BHK</option>
            <option value="2 BHK" className="bg-slate-950 text-white">2 BHK Premium</option>
            <option value="2.5 BHK" className="bg-slate-950 text-white">2.5 BHK Premium</option>
            <option value="3 BHK" className="bg-slate-950 text-white">3 BHK Luxury</option>
            <option value="3 BHK Duplex" className="bg-slate-950 text-white">3 BHK Duplex Grand</option>
          </select>
          {errors.configuration && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-red-400" />
              {errors.configuration.message}
            </p>
          )}
        </div>

        <div className="group">
          <label className="block text-[10px] font-bold text-gold-400/90 uppercase tracking-[0.15em] mb-1.5 group-hover:text-gold-300 transition-colors">
            Budget Range <span className="text-red-500">*</span>
          </label>
          <select
            {...register('budget')}
            className={`w-full bg-slate-900/40 backdrop-blur-sm border ${
              errors.budget ? 'border-red-500/50 focus:ring-red-500/20' : 'border-slate-800/80 hover:border-gold-500/30 focus:border-gold-500 focus:ring-gold-500/20'
            } rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-4 transition-all duration-300 shadow-inner appearance-none cursor-pointer`}
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%2394a3b8\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="" disabled className="bg-slate-950 text-slate-500">Select Range</option>
            <option value="₹75 Lakhs - ₹90 Lakhs" className="bg-slate-950 text-white">₹75 L - ₹90 L</option>
            <option value="₹90 Lakhs - ₹1.2 Cr" className="bg-slate-950 text-white">₹90 L - ₹1.2 Cr</option>
            <option value="₹1.2 Cr - ₹1.5 Cr" className="bg-slate-950 text-white">₹1.2 Cr - ₹1.5 Cr</option>
            <option value="Above ₹1.5 Cr" className="bg-slate-950 text-white">Above ₹1.5 Cr</option>
          </select>
          {errors.budget && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-red-400" />
              {errors.budget.message}
            </p>
          )}
        </div>
      </div>

      {isVisitSource && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
          <div className="group">
            <label className="block text-[10px] font-bold text-gold-400/90 uppercase tracking-[0.15em] mb-1.5 group-hover:text-gold-300 transition-colors">
              Preferred Date
            </label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('visitDate')}
              className="w-full bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 hover:border-gold-500/30 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all duration-300 shadow-inner"
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-bold text-gold-400/90 uppercase tracking-[0.15em] mb-1.5 group-hover:text-gold-300 transition-colors">
              Preferred Time Slot
            </label>
            <select
              {...register('visitTimeSlot')}
              className="w-full bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 hover:border-gold-500/30 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all duration-300 shadow-inner appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%2394a3b8\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="">Any Time</option>
              <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
              <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
              <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
            </select>
          </div>
        </div>
      )}

      <div className="group">
        <label className="block text-[10px] font-bold text-gold-400/90 uppercase tracking-[0.15em] mb-1.5 group-hover:text-gold-300 transition-colors">
          Message / Preference <span className="text-slate-500/70 lowercase tracking-normal font-medium">(Optional)</span>
        </label>
        <textarea
          rows={2}
          placeholder="I am interested in scheduling a site visit or receiving a callback."
          {...register('message')}
          className="w-full bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 hover:border-gold-500/30 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none transition-all duration-300 shadow-inner resize-none"
        />
      </div>

      {submitError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full relative overflow-hidden group gold-gradient-bg hover:opacity-90 active:scale-[0.98] text-slate-950 font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            {ctaText}
          </>
        )}
      </button>

      <p className="text-[10px] text-slate-500 text-center mt-2">
        * By submitting this form, you authorize Gera Developments & sales partners to contact you. We respect your privacy.
      </p>
    </form>
  );
}
