'use client';

import React, { useState } from 'react';
import { UserPlus, LogIn, KeyRound } from 'lucide-react';

export const AuthFeature: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitting authentication:\nEmail: ${email}\nMode: ${isRegister ? 'Register' : 'Login'}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F9F7] p-6 font-sans">
      <div className="w-full max-w-md p-8 border border-gray-200 bg-white shadow-sm">
        
        {/* Header brand details */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1 text-[8.5px] font-bold tracking-widest px-3 py-1.5 bg-[#D4C5B9]/15 border border-[#D4C5B9]/30 text-[#1A1A1A] uppercase mb-3">
            {isRegister ? 'New Account Registration' : 'Showroom Access Portal'}
          </span>
          <h2 className="text-2xl font-semibold text-[#1A1A1A] tracking-wide">
            {isRegister ? 'Create Showroom Profile' : 'Sign In To Console'}
          </h2>
          <p className="text-xs text-gray-500 font-light mt-2 leading-relaxed">
            {isRegister 
              ? 'Register to unlock custom 3D canvas saving, checklists summaries, and POS order history logs.' 
              : 'Sign in to access your synchronized designs, check order references status, and manage dashboard details.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F9F9F7] border border-gray-200 px-4 py-3.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
              placeholder="e.g. name@example.com"
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
            className="w-full bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-widest uppercase py-4 transition-all duration-300 mt-2 flex items-center justify-center gap-2.5"
          >
            {isRegister ? (
              <>
                <UserPlus size={15} />
                <span>Register Account</span>
              </>
            ) : (
              <>
                <LogIn size={15} />
                <span>Access Account</span>
              </>
            )}
          </button>
        </form>

        {/* Mode toggle */}
        <div className="mt-6 text-center text-xs border-t border-gray-100 pt-5">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-gray-400 hover:text-[#1A1A1A] transition-colors"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
};
export default AuthFeature;
