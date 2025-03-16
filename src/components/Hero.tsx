
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Server, Database, Code, Layout, Settings, Cpu } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-16 pb-24 md:pt-20 md:pb-32">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Floating shapes */}
      <div className="absolute -left-10 md:left-10 top-20 md:top-40 w-24 h-24 rounded-3xl bg-primary/5 border border-primary/10 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute right-10 top-40 w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute left-1/4 bottom-20 w-20 h-20 rounded-full bg-primary/5 border border-primary/10 animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute right-1/4 bottom-40 w-12 h-12 rounded-lg bg-primary/5 border border-primary/10 animate-float" style={{ animationDelay: '0.5s' }} />
      
      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12 max-w-4xl mx-auto">
          <div className="space-y-4 animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              The Ultimate Developer Tool
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-balance">
              Build Better Projects with the <span className="text-gradient">Perfect Tech Stack</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 text-balance">
              TechStack Planner helps developers, startups, and enterprises choose the optimal technologies for their projects with AI-powered recommendations.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-stagger-1">
            <Link to="/recommend">
              <Button size="lg" className="group h-12 px-6 font-medium text-base">
                Get Recommendations
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/compare">
              <Button size="lg" variant="outline" className="h-12 px-6 font-medium text-base">
                Compare Technologies
              </Button>
            </Link>
          </div>
          
          {/* Tech icons */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 w-full max-w-3xl mx-auto animate-stagger-2">
            {[
              { icon: <Code className="h-6 w-6" />, label: "Frameworks" },
              { icon: <Server className="h-6 w-6" />, label: "Backends" },
              { icon: <Database className="h-6 w-6" />, label: "Databases" },
              { icon: <Layout className="h-6 w-6" />, label: "UI Libraries" },
              { icon: <Cpu className="h-6 w-6" />, label: "Cloud Services" },
              { icon: <Settings className="h-6 w-6" />, label: "DevOps Tools" }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-4 rounded-xl bg-card border border-border text-card-foreground hover:shadow-subtle transition-shadow"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary mb-2">
                  {item.icon}
                </div>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="w-full max-w-4xl mx-auto pt-8 border-t border-border animate-stagger-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "1,000+", label: "Tools & Frameworks" },
                { value: "50,000+", label: "Recommended Stacks" },
                { value: "10,000+", label: "Active Users" },
                { value: "4.9/5", label: "User Rating" }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-gradient">
                    {stat.value}
                  </div>
                  <p className="text-sm text-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
