import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className = '',
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    icon,
    children,
    disabled,
    ...props
  },
  ref
) => {
    const baseStyles = [
      'inline-flex items-center justify-center font-medium',
      'rounded-magic transition-all duration-250',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ].join(' ');

    const variants = {
      primary: [
        'bg-primary-600 text-white',
        'hover:bg-primary-700 active:bg-primary-800',
        'focus:ring-primary-500/50',
        'shadow-magic hover:shadow-magic-hover',
      ].join(' '),
      secondary: [
        'bg-secondary-100 text-secondary-900',
        'hover:bg-secondary-200 active:bg-secondary-300',
        'focus:ring-secondary-500/50',
        'shadow-magic-sm hover:shadow-magic',
      ].join(' '),
      outline: [
        'border-2 border-primary-600 text-primary-600',
        'hover:bg-primary-50 active:bg-primary-100',
        'focus:ring-primary-500/50',
      ].join(' '),
      ghost: [
        'text-secondary-700 bg-transparent',
        'hover:bg-secondary-100 active:bg-secondary-200',
        'focus:ring-secondary-500/50',
      ].join(' '),
    };

    const sizes = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3',
    };

    return (
      <button
        ref={ref}
        className={[
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          loading ? 'relative !text-transparent hover:!text-transparent' : '',
          className,
        ].join(' ')}
        disabled={disabled || loading}
        {...props}
      >
        <span className={`inline-flex items-center ${loading ? 'invisible' : ''}`}>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </span>
        
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-current">
            <svg 
              className="animate-spin h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
