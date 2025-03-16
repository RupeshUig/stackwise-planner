import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Layers, Users } from 'lucide-react';
import Layout from '@/components/Layout';
import ToolComparison from '@/components/ToolComparison';
import ProjectForm from '@/components/ProjectForm';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background to-accent/20">
        <div className="absolute inset-0 bg-grid z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              Tech Stack Planner
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 animate-fade-in">
              Find the Perfect Tech Stack for Your Project
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl animate-fade-in">
              Compare tools, get personalized recommendations, and make data-driven decisions for your next software project.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
              <Button size="lg" asChild>
                <Link to="/recommend">
                  Get Recommendations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/compare">
                  Compare Technologies
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
            Make Better Technology Decisions
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Our tools help you evaluate, compare, and choose the right technologies for your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 shadow-subtle hover:shadow-card transition-shadow animate-stagger-1">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compare Technologies</h3>
            <p className="text-foreground/70 mb-4">
              Side-by-side comparison of frameworks, libraries, and tools based on community support, performance, and more.
            </p>
            <Link to="/compare" className="text-primary font-medium inline-flex items-center hover:underline">
              Compare Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-subtle hover:shadow-card transition-shadow animate-stagger-2">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
            <p className="text-foreground/70 mb-4">
              Receive tailored tech stack recommendations based on your project requirements, team size, and budget.
            </p>
            <Link to="/recommend" className="text-primary font-medium inline-flex items-center hover:underline">
              Find Your Stack
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-subtle hover:shadow-card transition-shadow animate-stagger-3">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Trends</h3>
            <p className="text-foreground/70 mb-4">
              Stay informed about industry trends, adoption rates, and emerging technologies with interactive data visualizations.
            </p>
            <Link to="/trends" className="text-primary font-medium inline-flex items-center hover:underline">
              View Trends
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Sections */}
      <section className="py-12 md:py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
              Technology Comparison
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Compare frameworks, libraries, databases, and other technologies side by side.
            </p>
          </div>
          
          <ToolComparison />
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
              Get Personalized Recommendations
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Tell us about your project and we'll recommend the optimal technologies for your needs.
            </p>
          </div>

          <ProjectForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-accent/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
              Ready to Find Your Ideal Tech Stack?
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Start exploring technology options, get personalized recommendations, and make data-driven decisions for your projects.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Create Free Account
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/recommend">
                  Try Without Signup
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
