import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface BackLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const BackLink = ({ to, children, className = '' }: BackLinkProps) => {
  return (
    <Link to={to} className={`back-link ${className}`}>
      <ChevronLeft size={20} />
      <span>{children}</span>
    </Link>
  );
};