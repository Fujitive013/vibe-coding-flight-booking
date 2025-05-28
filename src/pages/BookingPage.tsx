import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, ArrowRight, Menu, X, Calendar, MapPin, Users } from 'lucide-react';
import { Button, Card, Input, ThemeToggle } from '../components';
import { cn } from '@/lib/utils';

const BookingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1',
  });

  const validateForm = () => {
    if (!formData.from) return 'Please enter departure city';
    if (!formData.to) return 'Please enter destination city';
    if (!formData.date) return 'Please select a date';
    if (!formData.passengers || parseInt(formData.passengers) < 1) {
      return 'Please enter a valid number of passengers';
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error when user makes changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success - in real app, this would be an API call
      console.log('Booking submitted:', formData);
      alert('Booking successful! Check your email for confirmation.');
      
      // Reset form
      setFormData({
        from: '',
        to: '',
        date: '',
        passengers: '1',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing your booking');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-sm bg-white/80 dark:bg-zinc-950/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="flex items-center gap-2 cursor-pointer">
              <Plane className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <span className="text-xl font-bold">SkyBooker</span>
            </a>
          </motion.div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="/" 
              className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.a>
            <motion.a 
              href="/booking" 
              className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Flights
            </motion.a>
            <motion.a
              href="/login"
              className="font-medium text-primary-600 dark:text-primary-400 hover:underline transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.a>
            <motion.a
              href="/signup"
              className="font-medium text-primary-600 dark:text-primary-400 hover:underline transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.a>
            <ThemeToggle />
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle className="mr-4" />
            <motion.button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 border-t border-zinc-200 dark:border-zinc-800">
                <a href="/" className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Home
                </a>
                <a href="/booking" className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Flights
                </a>
                <a href="/login" className="font-medium text-primary-600 dark:text-primary-400 hover:underline transition-colors">
                  Login
                </a>
                <a href="/signup" className="font-medium text-primary-600 dark:text-primary-400 hover:underline transition-colors">
                  Sign Up
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            className="text-center mb-10"
            variants={formAnimation}
            initial="hidden"
            animate="show"
          >
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={itemAnimation}
            >
              Find Your Perfect Flight
            </motion.h1>
            <motion.p 
              className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
              variants={itemAnimation}
            >
              Search for the best deals on flights to destinations worldwide. Book with confidence and take off to your dream destination.
            </motion.p>
          </motion.div>

          <Card
            variant="elevated"
            className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
          >
            <motion.form 
              onSubmit={handleSubmit} 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={formAnimation}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence>
                {error && (
                  <motion.div 
                    className="md:col-span-2 p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div 
                className="space-y-2"
                variants={itemAnimation}
              >
                <div className="relative">
                  <Input
                    label="From"
                    id="from"
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    placeholder="City or airport"
                    required
                    disabled={isLoading}
                    className="pl-10"
                  />
                  <MapPin className="absolute left-3 top-[2.4rem] h-4 w-4 text-zinc-400" />
                </div>
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={itemAnimation}
              >
                <div className="relative">
                  <Input
                    label="To"
                    id="to"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    placeholder="City or airport"
                    required
                    disabled={isLoading}
                    className="pl-10"
                  />
                  <MapPin className="absolute left-3 top-[2.4rem] h-4 w-4 text-zinc-400" />
                </div>
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={itemAnimation}
              >
                <div className="relative">
                  <Input
                    label="Departure Date"
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-[2.4rem] h-4 w-4 text-zinc-400" />
                </div>
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={itemAnimation}
              >
                <div className="relative">
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Passengers
                  </label>
                  <select
                    id="passengers"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={cn(
                      "w-full rounded-magic pl-10 pr-3 py-2 mt-1",
                      "text-sm text-zinc-900 dark:text-zinc-100",
                      "border border-zinc-300 dark:border-zinc-700",
                      "bg-white dark:bg-zinc-800",
                      "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "transition duration-200"
                    )}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                  <Users className="absolute left-3 top-[2.3rem] h-4 w-4 text-zinc-400" />
                </div>
              </motion.div>

              <motion.div 
                className="md:col-span-2"
                variants={itemAnimation}
              >
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className={cn(
                    "w-full",
                    isLoading && "opacity-70 cursor-not-allowed"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.span 
                      className="flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching for Flights...
                    </motion.span>
                  ) : (
                    <motion.span 
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Search Flights
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Plane className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <span className="text-lg font-bold">SkyBooker</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Book your flights with confidence. We offer the best deals and excellent customer service.
              </p>
            </div>
          </div>
          
          <div className="border-t border-zinc-200 dark:border-zinc-800 mt-8 pt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>&copy; {new Date().getFullYear()} SkyBooker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookingPage;
