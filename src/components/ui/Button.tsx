import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: ReactNode;
}

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  as?: 'button';
}

interface AnchorProps extends BaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  as: 'a';
}

type Props = ButtonProps | AnchorProps;

export const Button = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}: Props) => {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };

  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  const fullClassName = `btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ('as' in props && props.as === 'a') {
    const { as: _, ...anchorProps } = props as AnchorProps;
    return (
      <a className={fullClassName} {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {Icon && iconPosition === 'left' && <Icon size={18} />}
        {children}
        {Icon && iconPosition === 'right' && <Icon size={18} />}
      </a>
    );
  }

  const { as: _, ...buttonProps } = props as ButtonProps;
  return (
    <button className={fullClassName} {...(buttonProps as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {Icon && iconPosition === 'left' && <Icon size={18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} />}
    </button>
  );
};
