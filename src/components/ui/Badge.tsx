import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  icon?: LucideIcon;
  className?: string;
}

export const Badge = ({ children, variant = 'primary', size = 'md', icon: Icon, className = '' }: BadgeProps) => {
  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    outline: 'badge-outline',
  };

  const sizeClasses = {
    sm: 'badge-sm',
    md: 'badge-md',
  };

  return (
    <span className={`badge ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {Icon && <Icon size={size === 'sm' ? 12 : 14} />}
      {children}
    </span>
  );
};
