import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <h1 className={`text-xl font-bold tracking-wider text-text-primary ${className} font-serif`}>
      Rex<span className="gradient-text">Jagers</span>
    </h1>
  );
};

export const Emblem: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-surface-2 border border-border ${className}`}>
      <span className="font-bold text-xl text-text-primary font-serif">
        R<span className="gradient-text">J</span>
      </span>
    </div>
  );
};