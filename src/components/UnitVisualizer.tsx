
import React from 'react';
import { motion } from 'framer-motion';
import { Square, Layout, Box, ArrowRight, ArrowLeft } from 'lucide-react';
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
            <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-500">Base Size (16px)</span>
                <span className="text-xs text-gray-500">Your Size ({pixelValue}px)</span>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <motion.p
                    className="font-mono"
                    style={{ fontSize: 16 }}
                  >
                    The quick brown fox.
                  </motion.p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <motion.p
                    initial={{ fontSize: 16 }}
                    animate={{ fontSize: Math.min(pixelValue, 72) }} // Cap at 72px to prevent overflow
                    transition={{ duration: 0.5 }}
                    className="font-mono overflow-hidden text-ellipsis"
                  >
                    The quick brown fox.
                  </motion.p>
                </div>
              </div>
              <div className="mt-6">
                <div className="text-center text-xs text-gray-500 mb-2">
                  {pixelValue > 72 ? 'Showing visualization scaled to fit (actual: ' + pixelValue + 'px)' : ''}
                </div>
                <PixelGrid 
                  pixelCount={Math.min(pixelValue * 2, 200)} 
                  highlightCount={Math.min(pixelValue, 100)} 
                  comparisonMode={true}
                  unitType={unitType}
                  containerWidth={300}
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
                  <div className="relative">
                    <motion.div 
                      className="bg-white dark:bg-gray-800 rounded mb-2 mx-auto"
                      initial={{ border: '0px solid #3B82F6' }}
                      animate={{ border: `${displayBorderSize}px solid #3B82F6` }}
                      transition={{ duration: 0.5 }}
                      style={{ width: 100, height: 100 }}
                    >
                      {pixelValue > 20 && (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                          Scaled for display
                        </div>
                      )}
                    </motion.div>
                    <span className="text-xs text-gray-500">{pixelValue}px border</span>
                  </div>
                  
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
                  <div className="relative h-24 w-full">
                    <PixelGrid 
                      pixelCount={Math.min(100, pixelValue * 3)} 
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
        // Improved spacing visualization
        return (
          <div className="spacing-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Spacing Visualization</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-center">
                  <motion.div 
                    className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 p-6 rounded-lg"
                    animate={{ gap: Math.min(pixelValue, 50) }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center rounded">
                      <Box className="h-6 w-6 text-blue-500" />
                    </div>
                    
                    {/* Spacing indicator */}
                    <motion.div 
                      className="w-6 flex justify-center"
                      animate={{ height: Math.min(pixelValue, 50) }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="h-full border-l-2 border-dashed border-purple-400 relative">
                        <div className="absolute -left-[9px] top-0 w-[20px] h-[1px] bg-purple-400"></div>
                        <div className="absolute -left-[9px] bottom-0 w-[20px] h-[1px] bg-purple-400"></div>
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs whitespace-nowrap text-purple-600">
                          {pixelValue}px gap
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 flex items-center justify-center rounded">
                      <Square className="h-6 w-6 text-purple-500" />
                    </div>
                  </motion.div>
                </div>
                
                <div className="text-center text-xs text-gray-500">
                  {pixelValue > 50 ? 'Visualization scaled to fit (actual: ' + pixelValue + 'px)' : pixelValue + 'px gap'}
                </div>
                
                <div className="relative h-20 w-full mt-2">
                  <PixelGrid 
                    pixelCount={Math.min(100, pixelValue * 2)} 
                    highlightCount={Math.min(pixelValue, 50)} 
                    comparisonMode={true}
                    showSpacing={true}
                    unitType={unitType}
                    containerWidth={300}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'layout':
        // Improved layout visualization with better bounds
        return (
          <div className="layout-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Layout Visualization</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="relative overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 mb-4">
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
                      animate={{ width: Math.min(pixelValue, 300) }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-xs text-gray-600 dark:text-gray-300 px-2 text-center">
                        {pixelValue}px width
                        {pixelValue > 300 && ' (scaled to fit)'}
                      </div>
                    </motion.div>
                    <div className="h-full flex-grow"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative h-24 w-full max-w-sm">
                  <PixelGrid 
                    pixelCount={Math.min(200, pixelValue * 2)} 
                    highlightCount={Math.min(pixelValue, 100)} 
                    comparisonMode={true}
                    unitType={unitType}
                    containerWidth={300}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex justify-center items-center py-8">
            <PixelGrid 
              pixelCount={Math.min(200, pixelValue * 2)} 
              highlightCount={Math.min(pixelValue, 100)} 
              comparisonMode={true}
              unitType={unitType}
              containerWidth={300}
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
