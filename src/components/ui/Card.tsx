import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  style?: CSSProperties;
}

export const Card = ({ children, className = '', hover = true, glass = false, style }: CardProps) => {
  return (
    <div 
      className={`card ${hover ? 'card-hover' : ''} ${glass ? 'glass' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
