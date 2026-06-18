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
          className={`w-full bg-slate-900/60 border ${
            errors.name ? 'border-red-500' : 'border-slate-800 focus:border-gold-500'
          } rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none transition-all`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-500 text-sm font-medium">
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
              className={`w-full bg-slate-900/60 border ${
                errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-gold-500'
              } rounded-lg pl-12 pr-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none transition-all`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-1">
            Email Address <span className="text-slate-500">(Optional)</span>
          </label>
          <input
            type="email"
            placeholder="name@email.com"
            {...register('email')}
            className={`w-full bg-slate-900/60 border ${
              errors.email ? 'border-red-500' : 'border-slate-800 focus:border-gold-500'
            } rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none transition-all`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-1">
            Configuration <span className="text-red-500">*</span>
          </label>
          <select
            {...register('configuration')}
            className={`w-full bg-slate-900/60 border ${
              errors.configuration ? 'border-red-500' : 'border-slate-800 focus:border-gold-500'
            } rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none transition-all`}
          >
            <option value="" disabled className="bg-slate-950 text-slate-500">Select BHK</option>
            <option value="2 BHK" className="bg-slate-950 text-white">2 BHK Apartment</option>
            <option value="2.5 BHK" className="bg-slate-950 text-white">2.5 BHK Apartment</option>
            <option value="3 BHK" className="bg-slate-950 text-white">3 BHK Apartment</option>
            <option value="3 BHK Duplex" className="bg-slate-950 text-white">3 BHK Duplex</option>
          </select>
          {errors.configuration && (
            <p className="text-red-500 text-xs mt-1">{errors.configuration.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-1">
            Budget Range <span className="text-red-500">*</span>
          </label>
          <select
            {...register('budget')}
            className={`w-full bg-slate-900/60 border ${
              errors.budget ? 'border-red-500' : 'border-slate-800 focus:border-gold-500'
            } rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none transition-all`}
          >
            <option value="" disabled className="bg-slate-950 text-slate-500">Select Budget</option>
            <option value="₹75 Lakhs - ₹90 Lakhs" className="bg-slate-950 text-white">₹75 L - ₹90 L</option>
            <option value="₹90 Lakhs - ₹1.2 Cr" className="bg-slate-950 text-white">₹90 L - ₹1.2 Cr</option>
            <option value="₹1.2 Cr - ₹1.5 Cr" className="bg-slate-950 text-white">₹1.2 Cr - ₹1.5 Cr</option>
            <option value="Above ₹1.5 Cr" className="bg-slate-950 text-white">Above ₹1.5 Cr</option>
          </select>
          {errors.budget && (
            <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-1">
          Message / Preference <span className="text-slate-500">(Optional)</span>
        </label>
        <textarea
          rows={2}
          placeholder="I am interested in scheduling a site visit / receiving a callback."
          {...register('message')}
          className="w-full bg-slate-900/60 border border-slate-800 focus:border-gold-500 rounded-lg px-4 py-2 text-white placeholder-slate-500 text-sm focus:outline-none transition-all resize-none"
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
