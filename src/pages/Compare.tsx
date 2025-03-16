
import React from 'react';
import Layout from '@/components/Layout';
import ToolComparison from '@/components/ToolComparison';

const Compare = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                Compare Technologies
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Make informed decisions by comparing technologies across multiple dimensions.
              </p>
            </div>
            
            <ToolComparison />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
