import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
}

export const Container = ({ children, className = '', size = 'medium' }: ContainerProps) => {
  const sizeClasses = {
    small: 'max-w-3xl',
    medium: 'max-w-6xl',
    large: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`container ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};
