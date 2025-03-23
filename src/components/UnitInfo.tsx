
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { UnitType, UnitInfo as UnitInfoType } from '@/lib/unitConversions';

interface UnitInfoProps {
  unitType: UnitType;
  unitInfo: UnitInfoType;
}

const UnitInfo: React.FC<UnitInfoProps> = ({ unitType, unitInfo }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
      layout
    >
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
        <h2 className="text-xl font-semibold">{unitInfo.name}</h2>
        <p className="text-blue-100 text-sm">{unitType}</p>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h3>
          <p className="text-gray-600 dark:text-gray-400">{unitInfo.description}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Best Used For</h3>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
            {unitInfo.bestFor.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Browser Support</h3>
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              unitInfo.browserSupport === 5 ? 'bg-green-500' :
              unitInfo.browserSupport >= 3 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-gray-600 dark:text-gray-400">
              {unitInfo.browserSupport === 5 ? 'Excellent' : 
               unitInfo.browserSupport >= 3 ? 'Good' : 'Limited'}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Responsive Rating</h3>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <div 
                key={star}
                className={`w-4 h-4 mr-1 rounded-full ${
                  star <= unitInfo.responsiveRating ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Avoid Using For</h3>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
            {unitInfo.avoid.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default UnitInfo;
