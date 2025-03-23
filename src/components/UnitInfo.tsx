
import React from 'react';
import { motion } from 'framer-motion';
import { UnitType, UnitInfo } from '@/lib/unitConversions';

interface UnitInfoProps {
  unitType: UnitType;
  unitInfo: UnitInfo;
  className?: string;
}

const UnitInfo: React.FC<UnitInfoProps> = ({ unitType, unitInfo, className = '' }) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="text-lg font-medium mb-2">{unitInfo.name} <span className="text-primary text-sm">({unitType})</span></h3>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{unitInfo.description}</p>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">Best For</h4>
          <div className="flex flex-wrap gap-2">
            {unitInfo.bestFor.map((use, index) => (
              <span 
                key={index} 
                className="text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 px-2 py-1 rounded-full"
              >
                {use}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">Avoid For</h4>
          <div className="flex flex-wrap gap-2">
            {unitInfo.avoid.map((use, index) => (
              <span 
                key={index} 
                className="text-xs bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 px-2 py-1 rounded-full"
              >
                {use}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Responsive Rating</h4>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < unitInfo.responsiveRating ? 'text-primary' : 'text-gray-300 dark:text-gray-600'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Browser Support</h4>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < unitInfo.browserSupport ? 'text-primary' : 'text-gray-300 dark:text-gray-600'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UnitInfo;
