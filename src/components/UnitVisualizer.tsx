
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
                <motion.p
                  className="font-mono"
                  style={{ fontSize: 16 }}
                >
                  The quick brown fox.
                </motion.p>
                <motion.p
                  initial={{ fontSize: 16 }}
                  animate={{ fontSize: pixelValue }}
                  transition={{ duration: 0.5 }}
                  className="font-mono"
                >
                  The quick brown fox.
                </motion.p>
              </div>
              <div className="mt-6">
                <PixelGrid 
                  pixelCount={pixelValue * 2} 
                  highlightCount={pixelValue} 
                  comparisonMode={true}
                  unitType={unitType}
                />
              </div>
            </div>
          </div>
        );
        
      case 'borders':
        return (
          <div className="borders-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Border Visualization</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4 justify-around">
                <div className="text-center">
                  <motion.div 
                    className="bg-white dark:bg-gray-800 rounded mb-2"
                    initial={{ border: '0px solid #3B82F6' }}
                    animate={{ border: `${pixelValue}px solid #3B82F6` }}
                    transition={{ duration: 0.5 }}
                    style={{ width: 100, height: 100 }}
                  >
                  </motion.div>
                  <span className="text-xs text-gray-500">{pixelValue}px border</span>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="relative h-24 w-full">
                    <PixelGrid 
                      pixelCount={Math.min(100, pixelValue * 3)} 
                      highlightCount={pixelValue} 
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
        return (
          <div className="spacing-demo">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Spacing Visualization</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-around">
                  <motion.div 
                    className="flex items-center justify-center"
                    initial={{ gap: 0 }}
                    animate={{ gap: pixelValue }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center rounded">
                      <Box className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 flex items-center justify-center rounded">
                      <Square className="h-6 w-6 text-purple-500" />
                    </div>
                  </motion.div>
                </div>
                <div className="text-center text-xs text-gray-500">{pixelValue}px gap</div>
                <div className="relative h-20 w-full mt-2">
                  <PixelGrid 
                    pixelCount={Math.min(100, pixelValue * 3)} 
                    highlightCount={pixelValue} 
                    comparisonMode={true}
                    showSpacing={true}
                    unitType={unitType}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'layout':
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
                  <motion.div
                    className="bg-blue-100 dark:bg-blue-900 rounded"
                    initial={{ width: 20 }}
                    animate={{ width: pixelValue }}
                    transition={{ duration: 0.5 }}
                    style={{ height: '100%' }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                      {pixelValue}px width
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative h-24 w-full">
                  <PixelGrid 
                    pixelCount={Math.min(200, pixelValue * 2)} 
                    highlightCount={pixelValue} 
                    comparisonMode={true}
                    unitType={unitType}
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
              highlightCount={pixelValue} 
              comparisonMode={true}
              unitType={unitType}
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
