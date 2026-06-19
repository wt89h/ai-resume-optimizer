import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div className={`
      bg-slate-800/70 
      backdrop-blur-sm
      rounded-xl 
      border border-slate-700/50 
      ${paddingStyles[padding]} 
      ${hover ? 'transition-colors hover:bg-slate-700/70' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};
