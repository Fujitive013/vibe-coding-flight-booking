// Magic UI-inspired landing page for SkyBook (React + Vite)
import { motion } from 'framer-motion';
import { Plane, Calendar, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ThemeToggle } from '../components';
import { cn } from '@/lib/utils';

// Logo Component
const Logo = ({ className }: { className?: string }) => (
  <Link to="/" className={cn('flex items-center gap-2 cursor-pointer', className)}>
    <Plane className="h-6 w-6 text-primary-600 dark:text-primary-400" />
    <span className="font-bold text-xl">SkyBooker</span>
  </Link>
);

// Menu items for the header
const menuItems = [
  { label: 'Home', to: '/', icon: <Plane className="h-4 w-4 mr-2" /> },
  { label: 'Book a Flight', to: '/booking', icon: <Calendar className="h-4 w-4 mr-2" /> },
  { label: 'Destinations', to: '/destinations', icon: <MapPin className="h-4 w-4 mr-2" /> },
];

// Header Component
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center text-zinc-700 dark:text-zinc-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="font-medium text-primary-600 dark:text-primary-400 hover:underline transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="ml-2 font-medium text-primary-600 dark:text-primary-400 hover:underline transition-colors"
          >
            Sign Up
          </Link>
          <ThemeToggle />
        </nav>
        <div className="hidden md:inline-flex gap-2">
          <Button 
            variant="primary"
            onClick={() => navigate('/booking')}
          >
            Book a Flight
          </Button>
          <Button 
            variant="secondary"
            onClick={() => navigate('/login')}
            className="ml-2"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

// Features data
const features = [
  {
    title: 'Fast & Easy Booking',
    description: 'Book your flights in just a few clicks with our user-friendly interface.',
    icon: <Calendar className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
  },
  {
    title: 'Best Price Guarantee',
    description: 'We offer the best prices, guaranteed. Find a lower price? We\'ll match it.',
    icon: <Plane className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
  },
  {
    title: '24/7 Customer Support',
    description: 'Our support team is available 24/7 to assist you with any inquiries.',
    icon: <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
  },
];

// Hero section component
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90 dark:from-primary-900/90 dark:to-primary-950/90" />
      <div className="relative z-10 text-center p-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-white"
        >
          Welcome to SkyBooker
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg md:text-xl mb-6 text-white/90"
        >
          Your journey begins here. Explore the world with us.
        </motion.p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => navigate('/booking')}
            className="bg-white text-primary-600 hover:bg-white/90"
          >
            Book a Flight
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-primary-600 text-white hover:bg-primary-700"
          >
            Login
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/signup')}
            className="border-primary-600 text-primary-600 hover:bg-primary-50"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

// Feature card component
const FeatureCard = ({ title, description, icon }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center text-center p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
  </motion.div>
);

// Feature section component
const FeatureSection = () => (
  <section className="py-16 bg-zinc-50 dark:bg-zinc-950">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-extrabold text-center mb-12"
      >
        Why Choose SkyBooker?
      </motion.h2>      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  </section>
);

// Call to action component
const CallToAction = () => (
  <div className="py-16 bg-primary-600 dark:bg-primary-900 text-white">
    <div className="container mx-auto px-4 text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-extrabold mb-4"
      >
        Ready to Explore the World?
      </motion.h2>
      <Button 
        variant="secondary"
        size="lg"
        onClick={() => window.location.href = '/booking'}
        className="bg-white text-primary-600 hover:bg-white/90"
      >
        Book Your Adventure Now
      </Button>
    </div>
  </div>
);

const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <CallToAction />
      </main>
    </div>
  );
};

export default LandingPage;
