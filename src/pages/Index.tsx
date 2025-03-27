
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import UnitConverter from '@/components/UnitConverter';
import { Linkedin, Twitter, Github, FileText } from 'lucide-react';

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
        <header className="pt-16 pb-12 text-center relative">
          {/* Add Peerlist Launchpad badge */}
          <a 
            href="https://www.peerlist.io/launchpad" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="absolute top-4 left-4 z-10"
          >
            <img 
              src="/lovable-uploads/f8a22d95-bc84-419e-a8da-18f8062e2bf9.png" 
              alt="Live on Peerlist Launchpad" 
              className="h-16 hover:scale-110 transition-transform"
            />
          </a>
          
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
        
        <footer className="py-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-gray-500 dark:text-gray-400 text-sm mb-4"
          >
            Designed with precision and elegance.
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-6 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <a 
              href="https://linkedin.com/in/saniyanande" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a 
              href="https://twitter.com/saniyanande" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors duration-200"
            >
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a 
              href="https://github.com/saniyanande" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://medium.com/@saniyanande" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-green-600 transition-colors duration-200"
            >
              <FileText size={20} />
              <span className="sr-only">Medium</span>
            </a>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-4 text-xs text-gray-400 dark:text-gray-500"
          >
            © {new Date().getFullYear()} Saniya Nande. All rights reserved.
          </motion.p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
