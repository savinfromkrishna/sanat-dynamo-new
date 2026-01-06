import React from 'react';
import Image from 'next/image';
import logoIcon from './logo.png'; // Static import for automatic optimization

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className} select-none`}>
      {/* Next.js Image Component:
          - Automatically prevents layout shift
          - 'h-full w-auto' ensures it respects the parent container height
      */}
      <div className="relative h-full w-auto aspect-square">
        <Image 
          src={logoIcon} 
          alt="SuppleLogic Icon" 
          className="h-full w-auto object-contain"
          priority // Ensures the logo loads immediately as a key brand element
        />
      </div>
      
      {showText && (
        <div className="flex flex-col -ml-4 -mt-1 leading-[1.1] tracking-tight">
          <span className="text-2xl font-light text-slate-800 tracking-tighter">
            Supple<span className="font-semibold text-slate-950">Logic</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;