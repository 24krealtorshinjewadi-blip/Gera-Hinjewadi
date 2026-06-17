'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Key, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }

      // Force refresh of the router so that the middleware picks up the new cookie session
      router.refresh();
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-gold-500/5 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-gold-500/5 blur-[120px]" />

      {/* Floating Link to Home */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Website</span>
      </Link>

      <div className="max-w-md w-full glassmorphism p-8 sm:p-10 rounded-2xl shadow-2xl relative border-gold-500/20 text-center">
        
        {/* Shield Icon */}
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-slate-900 border border-gold-500/20 text-gold-400 mb-6">
          <Shield className="h-6 w-6" />
        </div>

        <h1 className="text-xl font-extrabold tracking-wider uppercase text-white mb-1">
          Agent <span className="gold-gradient-text">Portal</span>
        </h1>
        <p className="text-xs text-slate-400 mb-8 uppercase tracking-widest font-semibold">
          Gera Hinjewadi CRM Secure Login
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-left">
            <label className="block text-xs font-bold text-gold-300 uppercase tracking-wider mb-2">
              Enter Administrator Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-slate-500">
                <Key className="h-4 w-4 text-gold-500/80" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 focus:border-gold-500 rounded-lg pl-10 pr-4 py-3.5 text-white placeholder-slate-600 text-sm focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg text-left">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden group gold-gradient-bg text-slate-950 font-bold uppercase tracking-widest text-xs py-3.5 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Validating Entry...
              </>
            ) : (
              <span>Access CRM Dashboard</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-[10px] text-slate-600 border-t border-slate-900 pt-6">
          Authorized agent access only. All security keys, login times, and IP addresses are registered on the database server.
        </div>
      </div>
    </div>
  );
}
