'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, KeyRound, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Successful login - redirect to dashboard using hard navigation to clear middleware cache
      window.location.href = '/admin';
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Incorrect password or server error';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Watermark Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-slate-950/40 backdrop-blur-md border border-gold-500/20 rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2.5">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-slate-900 border border-gold-500/30 text-gold-400 shadow-md">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-wider text-white">
              Gera CRM <span className="gold-gradient-text">Authentication</span>
            </h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mt-1">
              Restricted Access Portal
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-bold text-gold-300 uppercase tracking-widest">
              Administrator Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-600" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-gold-500 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-600 text-xs focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-linear-to-r from-gold-500 to-gold-600 text-slate-950 text-xs font-extrabold uppercase tracking-widest rounded-lg hover:shadow-lg hover:shadow-gold-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authorizing...</span>
              </>
            ) : (
              <span>Verify Access</span>
            )}
          </button>
        </form>

        <div className="text-center">
          <Link
            href="/"
            className="text-[10px] font-bold text-slate-500 hover:text-gold-400 uppercase tracking-widest transition-colors"
          >
            Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
