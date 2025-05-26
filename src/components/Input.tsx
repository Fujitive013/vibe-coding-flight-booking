import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  hint, 
  id,
  className = '', 
  ...props 
}) => {
  const inputStyles = [
    'w-full bg-white rounded-magic px-3 py-2',
    'text-sm text-secondary-900',
    'border border-secondary-200',
    'placeholder:text-secondary-400',
    'hover:border-secondary-300',
    'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transition duration-250',
    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '',
    className
  ].join(' ');

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-secondary-900"
        >
          {label}
        </label>
      )}
      
      <input
        id={id}
        className={inputStyles}
        aria-describedby={hint ? `${id}-hint` : undefined}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />

      {hint && !error && (
        <p
          id={`${id}-hint`}
          className="text-sm text-secondary-500"
        >
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
