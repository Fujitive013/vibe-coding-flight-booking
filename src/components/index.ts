// Reusable UI components inspired by Magic UI
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { ThemeProvider } from './ThemeProvider';
export { ThemeToggle } from './ThemeToggle';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
