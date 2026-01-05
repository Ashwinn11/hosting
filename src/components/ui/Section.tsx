import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  containerSize?: 'small' | 'medium' | 'large' | 'full';
}

export const Section = ({
  children,
  title,
  subtitle,
  className = '',
  containerSize = 'medium',
}: SectionProps) => {
  return (
    <section className={`section ${className}`}>
      <div className={`container container-${containerSize}`}>
        {(title || subtitle) && (
          <div className="section-header">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
