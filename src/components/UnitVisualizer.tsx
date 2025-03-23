
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
        return (
          <div className="typography-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Typography Visualization</h3>
            <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-500">Base Size (16px)</span>
                <span className="text-xs text-gray-500">Your Size ({pixelValue}px)</span>
              </div>
              <div className="flex flex-col space-y-4">
                {/* Base font size stays constant */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <p className="font-mono text-base truncate">
                    The quick brown fox.
                  </p>
                </div>
                {/* Converted font size changes */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <motion.p
                    initial={{ fontSize: 16 }}
                    animate={{ fontSize: Math.min(pixelValue, 48) }} // Cap at 48px to prevent overflow
                    transition={{ duration: 0.5 }}
                    className="font-mono truncate"
                    style={{ lineHeight: 1.2 }}
                  >
                    The quick brown fox.
                  </motion.p>
                </div>
              </div>
              
              {/* Only show the scaling message if we had to scale */}
              {pixelValue > 48 && (
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
        // Cap border size for visualization, but show accurate numbers
        const displayBorderSize = Math.min(pixelValue, 20);
        
        return (
          <div className="borders-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Border Visualization</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-around">
                <div className="text-center">
                  <div className="relative mb-2 mx-auto">
                    {/* Fixed container for border box */}
                    <div className="w-[100px] h-[100px] flex items-center justify-center overflow-hidden">
                      <motion.div 
                        className="bg-white dark:bg-gray-800 rounded"
                        initial={{ border: '0px solid #3B82F6' }}
                        animate={{ border: `${displayBorderSize}px solid #3B82F6` }}
                        transition={{ duration: 0.5 }}
                        style={{ 
                          width: `${Math.max(20, 100 - displayBorderSize * 2)}px`, 
                          height: `${Math.max(20, 100 - displayBorderSize * 2)}px`
                        }}
                      >
                      </motion.div>
                    </div>
                    <span className="text-xs text-gray-500 block mt-2">{pixelValue}px border</span>
                  </div>
                  
                  {pixelValue > 20 && (
                    <div className="text-xs text-gray-500 mt-1">
                      Scaled for display (actual: {pixelValue}px)
                    </div>
                  )}
                  
                  {/* Show border segments */}
                  <div className="mt-4 flex gap-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-blue-500"
                        initial={{ height: 16, width: 1 }}
                        animate={{ height: 16, width: i < Math.min(pixelValue, 5) ? 4 : 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="relative h-24 w-full max-w-[150px] overflow-hidden">
                    <PixelGrid 
                      pixelCount={Math.min(50, pixelValue * 2)} 
                      highlightCount={Math.min(pixelValue, 50)} 
                      comparisonMode={true}
                      containerWidth={150}
                      showBorders={true}
                      unitType={unitType}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'spacing':
        // Improved spacing visualization with containment
        const safeSpacing = Math.min(pixelValue, 60); // Cap visual spacing
        
        return (
          <div className="spacing-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Spacing Visualization</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-center mb-4">
                {/* Fixed height container to prevent overflow */}
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg w-[200px] h-[180px] flex flex-col items-center justify-between overflow-hidden">
                  {/* Top element */}
                  <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center rounded">
                    <Box className="h-6 w-6 text-blue-500" />
                  </div>
                  
                  {/* Middle spacing section with fixed max height */}
                  <div className="flex flex-col items-center justify-center" style={{ height: Math.min(60, safeSpacing) }}>
                    {/* Spacing indicator */}
                    <div className="h-full w-6 flex justify-center relative">
                      <div className="h-full border-l-2 border-dashed border-purple-400 relative">
                        <div className="absolute -left-[9px] top-0 w-[20px] h-[1px] bg-purple-400"></div>
                        <div className="absolute -left-[9px] bottom-0 w-[20px] h-[1px] bg-purple-400"></div>
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs whitespace-nowrap text-purple-600">
                          {pixelValue}px
                        </div>
                      </div>
                    </div>
                    
                    {/* Scaling indicator */}
                    {pixelValue > 60 && (
                      <div className="text-xs text-gray-500 mt-1">
                        Scaled (actual: {pixelValue}px)
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom element */}
                  <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 flex items-center justify-center rounded">
                    <Square className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </div>
                
              <div className="relative w-full overflow-hidden">
                <PixelGrid 
                  pixelCount={Math.min(80, pixelValue)} 
                  highlightCount={Math.min(pixelValue, 80)} 
                  comparisonMode={true}
                  showSpacing={true}
                  unitType={unitType}
                  containerWidth={280}
                />
              </div>
            </div>
          </div>
        );
        
      case 'layout':
        // Improved layout visualization with containment
        const maxDisplayWidth = 250; // Maximum display width
        const displayWidth = Math.min(pixelValue, maxDisplayWidth);
        
        return (
          <div className="layout-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Layout Visualization</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="relative overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 mb-4 w-full">
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
              
              <div className="flex justify-center overflow-hidden">
                <div className="relative w-full max-w-[280px] overflow-hidden">
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
