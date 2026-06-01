import React, { useState } from 'react';
import { Card, Button, Input } from '@tilevista/ui';
import { Lock, Mail, UserPlus, LogIn } from 'lucide-react';

export const AuthFeature: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitting auth: ${email} (Mode: ${isRegister ? 'Register' : 'Login'})`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-darkBg p-6">
      <Card className="w-full max-w-md p-8 border border-glassBorder shadow-premium-glow">
        <div className="text-center mb-8">
          <h1 className="font-outfit text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            TileVista
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            {isRegister ? 'Create your new showroom account' : 'Access your design dashboards'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" variant="primary">
            {isRegister ? (
              <>
                <UserPlus size={18} /> Register Account
              </>
            ) : (
              <>
                <LogIn size={18} /> Access Account
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </Card>
    </div>
  );
};
export default AuthFeature;
