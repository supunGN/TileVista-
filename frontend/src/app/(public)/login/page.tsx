'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../features/auth/AuthContext';
import { LogIn, ShieldAlert, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = await login(email, password);
    if (success) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid administrative credentials. Hint: use admin@tilevista.com / admin123');
    }
  };

  return (
    <div className="py-16 px-6 flex justify-center items-center font-sans bg-white">
      <div className="w-full max-w-md p-8 border border-gray-200 bg-white shadow-sm">
        
        {/* Header brand details */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1 text-[8.5px] font-bold tracking-widest px-3 py-1.5 bg-[#D4C5B9]/15 border border-[#D4C5B9]/30 text-[#1A1A1A] uppercase mb-3">
            STAFF SECURE ACCESS
          </span>
          <h2 className="text-2xl font-semibold text-[#1A1A1A] tracking-wide">Showroom Admin Portal</h2>
          <p className="text-xs text-gray-500 font-light mt-2 leading-relaxed">
            Access inventory listings, review quotation databases, and manage POS transactions.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-6 text-xs flex gap-2.5 items-start font-light">
            <ShieldAlert size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Staff Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F9F9F7] border border-gray-200 px-4 py-3.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
              placeholder="e.g. admin@tilevista.com"
            />
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Security Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F9F9F7] border border-gray-200 px-4 py-3.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-widest uppercase py-4 transition-all duration-300 mt-2 flex items-center justify-center gap-2.5"
          >
            {isLoading ? (
              <span>Authenticating Console...</span>
            ) : (
              <>
                <LogIn size={15} />
                <span>Sign In To Console</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-[10px] text-gray-400 font-light flex items-center justify-center gap-1.5 border-t border-gray-100 pt-5">
          <KeyRound size={12} />
          <span>Console Session Synchronized with POS Center</span>
        </div>

      </div>
    </div>
  );
}
