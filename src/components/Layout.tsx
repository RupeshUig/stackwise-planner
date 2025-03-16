
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { BarChart3, GitCompare, Layers, User, ChevronDown, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  // This is a placeholder - in a real app, you would check if user is authenticated
  const isAuthenticated = false;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Layers className="h-6 w-6 text-primary" />
                <span className="font-display text-xl font-bold">Tech Stack Planner</span>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="ml-10 hidden md:flex items-center space-x-6">
                <Link 
                  to="/compare" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/compare') ? 'text-primary' : 'text-foreground/70'}`}
                >
                  Compare
                </Link>
                <Link 
                  to="/recommend" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/recommend') ? 'text-primary' : 'text-foreground/70'}`}
                >
                  Recommendations
                </Link>
                <Link 
                  to="/trends" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/trends') ? 'text-primary' : 'text-foreground/70'}`}
                >
                  Trends
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-sm font-medium text-foreground/70 transition-colors hover:text-primary">
                    Resources
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link to="/blog" className="w-full">Blog</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/docs" className="w-full">Documentation</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/community" className="w-full">Community</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <ModeToggle />
              
              {isAuthenticated ? (
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/account">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
              
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="container mx-auto px-4 py-3 space-y-1">
              <Link 
                to="/compare" 
                className={`block py-2 px-3 rounded-md text-base font-medium ${isActive('/compare') ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-accent'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Compare
              </Link>
              <Link 
                to="/recommend" 
                className={`block py-2 px-3 rounded-md text-base font-medium ${isActive('/recommend') ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-accent'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Recommendations
              </Link>
              <Link 
                to="/trends" 
                className={`block py-2 px-3 rounded-md text-base font-medium ${isActive('/trends') ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-accent'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Trends
              </Link>
              <div className="py-2">
                <div className="border-t border-border my-2"></div>
              </div>
              <Link 
                to="/login" 
                className="block py-2 px-3 rounded-md text-base font-medium text-foreground/70 hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="block py-2 px-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <Layers className="h-6 w-6 text-primary" />
                <span className="font-display text-xl font-bold">Tech Stack Planner</span>
              </Link>
              <p className="text-sm text-foreground/70 mb-4">
                The ultimate platform for developers to find and compare the best technology stack for their projects.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-foreground/60 hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/compare" className="text-foreground/70 hover:text-primary">Technology Comparison</Link>
                </li>
                <li>
                  <Link to="/recommend" className="text-foreground/70 hover:text-primary">Stack Recommendations</Link>
                </li>
                <li>
                  <Link to="/trends" className="text-foreground/70 hover:text-primary">Trend Analysis</Link>
                </li>
                <li>
                  <Link to="/collaborate" className="text-foreground/70 hover:text-primary">Team Collaboration</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/blog" className="text-foreground/70 hover:text-primary">Blog</Link>
                </li>
                <li>
                  <Link to="/docs" className="text-foreground/70 hover:text-primary">Documentation</Link>
                </li>
                <li>
                  <Link to="/community" className="text-foreground/70 hover:text-primary">Community</Link>
                </li>
                <li>
                  <Link to="/api" className="text-foreground/70 hover:text-primary">API</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="text-foreground/70 hover:text-primary">About Us</Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-foreground/70 hover:text-primary">Pricing</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-foreground/70 hover:text-primary">Contact</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-foreground/70 hover:text-primary">Privacy</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/60">
              &copy; {new Date().getFullYear()} Tech Stack Planner. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-sm text-foreground/60 hover:text-primary">Terms of Service</Link>
              <Link to="/privacy" className="text-sm text-foreground/60 hover:text-primary">Privacy Policy</Link>
              <Link to="/cookies" className="text-sm text-foreground/60 hover:text-primary">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
