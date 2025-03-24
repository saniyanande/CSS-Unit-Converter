import React from 'react';
import { motion } from 'framer-motion';
import { Square, Layout, Box } from 'lucide-react';
import PixelGrid from './PixelGrid';
import { UnitType } from '@/lib/unitConversions';

interface UnitVisualizerProps {
  unitType: UnitType;
  pixelValue: number;
  context: string;
}

const UnitVisualizer: React.FC<UnitVisualizerProps> = ({
  unitType,
  pixelValue,
  context
}) => {
  // Ensure pixel value is reasonable for visualization
  const safePixelValue = Math.min(pixelValue, 200); // Cap at 200px for visualization
  
  // Render different visualizations based on context
  const renderContextVisualization = () => {
    switch (context) {
      case 'typography':
        // Keep typography section exactly as is - don't modify
        return (
          <div className="typography-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Typography Visualization</h3>
            <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-500">Base Size (16px)</span>
                <span className="text-xs text-gray-500">Your Size ({pixelValue}px)</span>
              </div>
              <div className="flex flex-col space-y-4">
                {/* Base font size - THIS STAYS CONSTANT at 16px */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <p className="font-mono text-base truncate">
                    The quick brown fox.
                  </p>
                </div>
                {/* Converted font size changes based on the converted value */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ fontSize: 16 }}
                      animate={{ fontSize: Math.min(pixelValue, 36) }}
                      transition={{ duration: 0.5 }}
                      className="font-mono"
                      style={{ lineHeight: 1.2 }}
                    >
                      {pixelValue > 30 ? "Text" : "The quick brown fox."}
                    </motion.p>
                  </div>
                </div>
              </div>
              
              {/* Only show the scaling message if we had to scale */}
              {pixelValue > 36 && (
                <div className="mt-3 text-center text-xs text-gray-500">
                  Showing visualization scaled to fit (actual: {pixelValue}px)
                </div>
              )}
              
              <div className="mt-4 overflow-hidden">
                <PixelGrid 
                  pixelCount={Math.min(100, pixelValue)} 
                  highlightCount={Math.min(pixelValue, 100)} 
                  comparisonMode={true}
                  unitType={unitType}
                  containerWidth={280}
                />
              </div>
            </div>
          </div>
        );
        
      case 'borders':
        // Improved border visualization - focus on border box, remove pixel grid
        const displayBorderSize = Math.min(pixelValue, 20);
        
        return (
          <div className="borders-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Border Visualization</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center justify-center">
                <div className="relative mb-4 mx-auto">
                  {/* Fixed size container */}
                  <div className="w-[180px] h-[180px] flex items-center justify-center">
                    <motion.div 
                      className="bg-white dark:bg-gray-800 rounded"
                      initial={{ border: '0px solid #3B82F6' }}
                      animate={{ border: `${displayBorderSize}px solid #3B82F6` }}
                      transition={{ duration: 0.5 }}
                      style={{ 
                        width: `${Math.max(20, 160 - displayBorderSize * 2)}px`, 
                        height: `${Math.max(20, 160 - displayBorderSize * 2)}px`
                      }}
                    >
                    </motion.div>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {pixelValue}px border
                    </span>
                    
                    {pixelValue > 20 && (
                      <div className="text-xs text-gray-500 mt-1">
                        Scaled for display (actual: {pixelValue}px)
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Border thickness indicator */}
                <div className="w-full max-w-[200px] h-8 bg-gray-100 dark:bg-gray-700 rounded-md relative overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (displayBorderSize / 20) * 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium z-10 text-white drop-shadow-md">
                      {pixelValue}px
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'spacing':
        // Improved spacing visualization with fixed container
        const maxVisualSpacing = 60; // Maximum visual spacing to display
        const safeSpacing = Math.min(pixelValue, maxVisualSpacing);
        const spacingPercentage = (safeSpacing / maxVisualSpacing) * 100;
        
        return (
          <div className="spacing-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Spacing Visualization</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              {/* Fixed height container to ensure consistent visualization */}
              <div className="w-full max-w-[280px] h-[200px] mx-auto relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                {/* Top box */}
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded flex items-center justify-center absolute top-4 left-1/2 transform -translate-x-1/2">
                  <Box className="h-6 w-6 text-blue-500" />
                </div>
                
                {/* Bottom box, positioned relatively to top box */}
                <div 
                  className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded flex items-center justify-center absolute left-1/2 transform -translate-x-1/2"
                  style={{ 
                    top: `calc(4rem + ${safeSpacing}px)`
                  }}
                >
                  <Square className="h-6 w-6 text-purple-500" />
                </div>
                
                {/* Spacing indicator line */}
                <div 
                  className="absolute left-1/2 w-px bg-dashed bg-purple-400"
                  style={{ 
                    top: '4rem', 
                    height: `${safeSpacing}px`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="absolute -left-[4px] top-0 w-[9px] h-[1px] bg-purple-400"></div>
                  <div className="absolute -left-[4px] bottom-0 w-[9px] h-[1px] bg-purple-400"></div>
                  <div className="absolute left-2 top-[50%] transform -translate-y-1/2 text-xs whitespace-nowrap text-purple-600 bg-white/70 dark:bg-gray-800/70 px-1 rounded">
                    {pixelValue}px
                  </div>
                </div>
              </div>
              
              {/* Scaling indicator */}
              {pixelValue > maxVisualSpacing && (
                <div className="text-xs text-gray-500 mt-3 text-center">
                  Visualization scaled to fit (actual: {pixelValue}px)
                </div>
              )}
              
              {/* Progress bar to show relative spacing */}
              <div className="mt-4 w-full max-w-[280px] mx-auto">
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-purple-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${spacingPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>0px</span>
                  <span>{maxVisualSpacing}px</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'layout':
        // Improved layout visualization with containment
        const maxDisplayWidth = 250; // Maximum display width
        const displayWidth = Math.min(pixelValue, maxDisplayWidth);
        const widthPercentage = (displayWidth / maxDisplayWidth) * 100;
        
        return (
          <div className="layout-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Layout Visualization</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="relative overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 mb-4 w-full max-w-[280px] mx-auto">
                <div className="bg-gray-100 dark:bg-gray-700 h-6 flex items-center px-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 h-32 overflow-hidden relative">
                  <div className="absolute top-0 right-0 bottom-0 left-0 flex">
                    <motion.div
                      className="h-full bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center"
                      initial={{ width: 20 }}
                      animate={{ width: displayWidth }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-xs text-gray-600 dark:text-gray-300 px-2 text-center truncate">
                        {pixelValue}px width
                        {pixelValue > maxDisplayWidth ? ' (scaled)' : ''}
                      </div>
                    </motion.div>
                    <div className="h-full flex-grow"></div>
                  </div>
                </div>
              </div>
              
              {pixelValue > maxDisplayWidth && (
                <div className="text-xs text-gray-500 mb-3 text-center">
                  Visualization scaled to fit (actual: {pixelValue}px)
                </div>
              )}
              
              {/* Progress bar to show relative width */}
              <div className="w-full max-w-[280px] mx-auto">
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${widthPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>0px</span>
                  <span>{maxDisplayWidth}px</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex justify-center items-center py-8 overflow-hidden">
            <PixelGrid 
              pixelCount={Math.min(100, pixelValue)} 
              highlightCount={Math.min(pixelValue, 100)} 
              comparisonMode={true}
              unitType={unitType}
              containerWidth={280}
            />
          </div>
        );
    }
  };

  return (
    <div className="unit-visualizer">
      {renderContextVisualization()}
    </div>
  );
};

export default UnitVisualizer;
