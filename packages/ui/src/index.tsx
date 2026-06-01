import * as React from 'react';

// --- PREMIUM MODERN BUTTON ---
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  ...props
}) => {
  // Sleek modern HSL Tailwind-friendly colors mapped as inline styles for compatibility
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.4)',
        };
      case 'secondary':
        return {
          background: 'rgba(255, 255, 255, 0.08)',
          color: '#f3f4f6',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
        };
      case 'accent':
        return {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)',
        };
      case 'danger':
        return {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.4)',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '8px 16px', fontSize: '0.875rem' };
      case 'md':
        return { padding: '12px 24px', fontSize: '1rem' };
      case 'lg':
        return { padding: '16px 32px', fontSize: '1.125rem' };
    }
  };

  const baseStyles: React.CSSProperties = {
    fontFamily: "'Outfit', 'Inter', sans-serif",
    fontWeight: 600,
    borderRadius: '12px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    userSelect: 'none',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  return (
    <button className={`tv-btn ${className}`} style={baseStyles} {...props}>
      {children}
    </button>
  );
};

// --- SLEEK GLASSMORPHIC CARD ---
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  className = '',
  style,
  ...props
}) => {
  const cardStyles: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.07)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    color: '#ffffff',
    fontFamily: "'Outfit', 'Inter', sans-serif",
    transition: 'all 0.3s ease',
    ...style,
  };

  return (
    <div
      className={`tv-card ${hoverEffect ? 'hover:scale-[1.02] hover:border-[rgba(255,255,255,0.15)]' : ''} ${className}`}
      style={cardStyles}
      {...props}
    >
      {children}
    </div>
  );
};

// --- INDUSTRIAL PREMIUM INPUT FIELD ---
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  style,
  ...props
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontFamily: "'Outfit', 'Inter', sans-serif",
    width: '100%',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.7)',
  };

  const inputStyles: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.2)',
    border: error ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#ffffff',
    outline: 'none',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
    ...style,
  };

  const errorStyles: React.CSSProperties = {
    fontSize: '0.75rem',
    color: '#ef4444',
    fontWeight: 500,
  };

  return (
    <div style={containerStyles}>
      {label && <span style={labelStyles}>{label}</span>}
      <input className={`tv-input ${className}`} style={inputStyles} {...props} />
      {error && <span style={errorStyles}>{error}</span>}
    </div>
  );
};
