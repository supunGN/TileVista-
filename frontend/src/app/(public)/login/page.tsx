'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../features/auth/AuthContext';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { LogIn, ShieldAlert } from 'lucide-react';

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
    <div className="py-16 px-6 flex justify-center items-center font-outfit">
      <Card className="w-full max-w-md p-8 border border-glassBorder shadow-premium bg-slate-900/40">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 mb-2">
            Staff Access
          </span>
          <h2 className="text-3xl font-extrabold text-white">Admin Authentication</h2>
          <p className="text-xs text-slate-400 mt-2">
            Access store inventories, quotations database, and sales velocity logs.
          </p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-xs flex gap-2 items-start mb-6">
            <ShieldAlert size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Staff Email Address"
            type="email"
            placeholder="admin@tilevista.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Security Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" variant="primary" disabled={isLoading}>
            <LogIn size={18} /> {isLoading ? 'Authenticating...' : 'Sign In To Console'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
