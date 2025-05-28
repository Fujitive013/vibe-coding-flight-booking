// Magic UI-inspired Signup Page for SkyBooker
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Input, ThemeToggle } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Lock, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || 'Signup failed');
        setLoading(false);
        return;
      }
      // Success: redirect or show message
      navigate('/booking');
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <Plane className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <span className="text-xl font-bold">SkyBooker</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
            <Link to="/booking" className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Flights</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md mx-auto">
          <Card variant="elevated" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-2">
                <h1 className="text-2xl font-bold mb-1">Create your account</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Sign up to start booking flights with SkyBooker.</p>
              </div>
              {error && <div className="p-2 rounded bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-sm text-center">{error}</div>}
              <div className="relative">
                <Input
                  label="Name"
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
                <User className="absolute left-3 top-[2.4rem] h-4 w-4 text-zinc-400" />
              </div>
              <div className="relative">
                <Input
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-[2.4rem] h-4 w-4 text-zinc-400" />
              </div>
              <div className="relative">
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-[2.4rem] h-4 w-4 text-zinc-400" />
              </div>
              <Button type="submit" variant="primary" size="lg" loading={loading} fullWidth>
                Sign Up
              </Button>
              <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline">Sign in</Link>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default SignupPage;
