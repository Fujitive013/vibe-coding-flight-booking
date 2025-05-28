// Magic UI-inspired Login Page for SkyBooker
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Input, ThemeToggle } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Lock, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
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
      const res = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      let data = null;
      try {
        data = await res.json();
      } catch (jsonErr) {
        // If CORS or network error, res.json() may fail
      }
      let errorMsg = 'Login failed';
      if (!res.ok) {
        if (res.status === 0) {
          setError('Network or CORS error. Please check backend CORS settings.');
        } else if (res.status === 422 && Array.isArray(data?.detail)) {
          // FastAPI validation error: array of error objects
          setError(data.detail.map((d: any) => d.msg).join(' '));
        } else {
          setError((data && data.detail) || errorMsg);
        }
        setLoading(false);
        return;
      }
      // Success: redirect or show message
      navigate('/booking');
    } catch (err) {
      setError('Network or CORS error. Please check backend CORS settings.');
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
                <h1 className="text-2xl font-bold mb-1">Sign in to SkyBooker</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Welcome back! Please enter your details.</p>
              </div>
              {error && (
                Array.isArray(error) ? (
                  <div className="p-2 rounded bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-sm text-center">
                    {error.map((msg, i) => <div key={i}>{msg}</div>)}
                  </div>
                ) : (
                  <div className="p-2 rounded bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-sm text-center">{error}</div>
                )
              )}
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
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-[2.4rem] h-4 w-4 text-zinc-400" />
              </div>
              <Button type="submit" variant="primary" size="lg" loading={loading} fullWidth>
                Sign In
              </Button>
              <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-primary-600 dark:text-primary-400 hover:underline">Sign up</Link>
              </div>
              {/* OAuth options at the bottom */}
              <div className="flex items-center my-2">
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
                <span className="mx-3 text-xs text-zinc-400">or</span>
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <button type="button" className="flex items-center justify-center gap-2 w-full rounded-magic border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-2 text-sm font-medium shadow-magic-sm hover:shadow-magic transition-all">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                  Sign in with Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 w-full rounded-magic border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-2 text-sm font-medium shadow-magic-sm hover:shadow-magic transition-all">
                  <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="h-5 w-5" />
                  Sign in with Facebook
                </button>
                <button type="button" className="flex items-center justify-center gap-2 w-full rounded-magic border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-2 text-sm font-medium shadow-magic-sm hover:shadow-magic transition-all">
                  <img src="https://www.svgrepo.com/show/448255/apple.svg" alt="Apple" className="h-5 w-5" />
                  Sign in with Apple
                </button>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginPage;
