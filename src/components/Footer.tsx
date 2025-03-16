
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
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
            <p className="mt-4 text-sm text-foreground/70 max-w-xs">
              The smart way to plan your project's technology stack. Helping developers make better technology choices.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@techstackplanner.com" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/compare" className="text-foreground/70 hover:text-primary transition-colors">
                  Compare Tools
                </Link>
              </li>
              <li>
                <Link to="/recommend" className="text-foreground/70 hover:text-primary transition-colors">
                  Get Recommendations
                </Link>
              </li>
              <li>
                <Link to="/trends" className="text-foreground/70 hover:text-primary transition-colors">
                  Technology Trends
                </Link>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  API Access
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-foreground/70 hover:text-primary transition-colors">
                  <span>Developer Community</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/70">
            &copy; {new Date().getFullYear()} TechStack Planner. All rights reserved.
          </p>
          <p className="text-sm text-foreground/70 mt-4 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by developers, for developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
