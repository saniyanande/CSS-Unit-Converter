
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import UnitConverter from '@/components/UnitConverter';

const Index = () => {
  useEffect(() => {
    // Add animation to page load
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
    
    return () => {
      document.body.style.opacity = '';
      document.body.style.transition = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <header className="pt-16 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-4"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-2">
              Dynamic Visualization
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              CSS Unit Converter
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Convert between CSS units with interactive visualizations. See exactly how units relate to each other and learn when to use each one.
            </p>
          </motion.div>
        </header>
        
        <main>
          <UnitConverter />
        </main>
        
        <footer className="py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Designed with precision and elegance.
          </motion.p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
