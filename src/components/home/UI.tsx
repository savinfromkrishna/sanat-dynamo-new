
import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'default' | 'secondary'; className?: string }> = ({ 
  children, 
  variant = 'default', 
  className = '' 
}) => {
  const variants = {
    default: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    secondary: 'bg-white/5 text-zinc-300 border-white/10'
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Button: React.FC<{ 
  children: React.ReactNode; 
  size?: 'md' | 'lg'; 
  variant?: 'primary' | 'outline'; 
  className?: string;
  onClick?: () => void;
}> = ({ 
  children, 
  size = 'md', 
  variant = 'primary', 
  className = '',
  onClick
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 active:scale-95";
  const sizes = {
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-4 text-base"
  };
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    outline: "bg-transparent border border-white/10 hover:bg-white/5 text-white"
  };
  
  return (
    <button onClick={onClick} className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};
