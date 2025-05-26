import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'flat' | 'elevated';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'flat',
  hover = false,
  padding = 'md',
  ...props
}) => {
  const baseStyles = [
    'bg-white rounded-magic border border-secondary-200',
    'transition-all duration-250',
  ].join(' ');

  const variants = {
    flat: 'shadow-magic-sm',
    elevated: 'shadow-magic',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover ? 'hover:shadow-magic-hover hover:-translate-y-0.5' : '';

  return (
    <div
      className={[
        baseStyles,
        variants[variant],
        paddings[padding],
        hoverStyles,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
