
import React from 'react';
import Layout from '@/components/Layout';
import ProjectForm from '@/components/ProjectForm';

const Recommend = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                AI-Powered Stack Recommendations
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Our AI analyzes your project requirements and recommends the optimal technologies for your specific needs.
              </p>
            </div>
            
            <ProjectForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recommend;
