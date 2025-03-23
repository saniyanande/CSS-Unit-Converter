
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
              unitInfo.browserSupport === 'Excellent' ? 'bg-green-500' :
              unitInfo.browserSupport === 'Good' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-gray-600 dark:text-gray-400">{unitInfo.browserSupport}</span>
          </div>
        </div>
        
        {unitInfo.moreInfoUrl && (
          <a
            href={unitInfo.moreInfoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
          >
            Learn more about {unitInfo.name}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default UnitInfo;
