
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Search, 
  BarChart2, 
  Layers, 
  Zap,
  Github, 
  Moon, 
  Sun, 
  ChevronDown
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check system preference for dark mode on load
  useEffect(() => {
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(darkModePreference);
    
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { title: 'Compare', path: '/compare', icon: <Layers className="h-4 w-4 mr-2" /> },
    { title: 'Recommend', path: '/recommend', icon: <Zap className="h-4 w-4 mr-2" /> },
    { title: 'Trends', path: '/trends', icon: <BarChart2 className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg shadow-subtle' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary/70">
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
              TS
            </div>
          </div>
          <span className="font-display font-semibold text-xl tracking-tight">
            TechStack<span className="text-primary">Planner</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-primary bg-accent'
                  : 'text-foreground/80 hover:text-primary hover:bg-accent/50'
              }`}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-1">
          {/* Search button */}
          <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Dark mode toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode} 
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="hidden sm:flex"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
            ) : (
              <Moon className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
            )}
          </Button>
          
          {/* Auth buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <Link to="/auth">
              <Button variant="outline" size="sm" className="h-9">
                Sign In
              </Button>
            </Link>
            <Link to="/auth?signup=true">
              <Button size="sm" className="h-9">
                Sign Up
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pb-3 pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                  location.pathname === link.path
                    ? 'text-primary bg-accent'
                    : 'text-foreground/80 hover:text-primary hover:bg-accent/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.title}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-border">
              <div className="flex items-center justify-between px-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleDarkMode} 
                  className="flex items-center text-sm font-medium"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center text-sm font-medium">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link 
                  to="/auth" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/auth?signup=true" 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-primary-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
