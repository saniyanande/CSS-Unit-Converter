
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type UnitType } from '@/lib/unitConversions';

interface PixelGridProps {
  pixelCount: number;
  highlightCount?: number;
  containerWidth?: number;
  pixelSize?: number;
  highlightColor?: string;
  className?: string;
  unitType?: UnitType;
  comparisonMode?: boolean;
  showBorders?: boolean;
  showSpacing?: boolean;
}

const PixelGrid: React.FC<PixelGridProps> = ({
  pixelCount,
  highlightCount = 0,
  containerWidth = 320,
  pixelSize = 10,
  highlightColor = 'rgba(59, 130, 246, 0.6)',
  className = '',
  unitType = 'px',
  comparisonMode = false,
  showBorders = false,
  showSpacing = false,
}) => {
  const [grid, setGrid] = useState<number[]>([]);
  const [highlightedPixels, setHighlightedPixels] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cols = Math.floor(containerWidth / pixelSize);
  const rows = Math.ceil(pixelCount / cols);
  
  useEffect(() => {
    // Create grid array
    const newGrid = Array.from({ length: pixelCount }, (_, i) => i);
    setGrid(newGrid);
    
    // Animate highlight effect
    const highlight = () => {
      if (comparisonMode) {
        // In comparison mode, always highlight the same pixels
        const highlighted = Array.from({ length: highlightCount }, (_, i) => i);
        setHighlightedPixels(highlighted);
      } else {
        // Random highlights for animation effect
        const startIdx = Math.floor(Math.random() * (pixelCount - highlightCount));
        const highlighted = Array.from({ length: highlightCount }, (_, i) => startIdx + i);
        setHighlightedPixels(highlighted);
      }
    };
    
    // Initial highlight after a delay
    const timeout = setTimeout(highlight, 500);
    
    // Set up interval for changing highlight only if not in comparison mode
    let interval: NodeJS.Timeout | null = null;
    if (!comparisonMode) {
      interval = setInterval(highlight, 3000);
    }
    
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [pixelCount, highlightCount, comparisonMode]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01,
        delayChildren: 0.05,
      }
    }
  };

  const item = {
    hidden: { scale: 0, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Generate unit-specific visualization
  const renderUnitSpecificVisualization = () => {
    if (showBorders) {
      return (
        <motion.div 
          className="border-visualization absolute inset-0"
          initial={{ borderWidth: 0 }}
          animate={{ borderWidth: highlightCount }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            border: `${highlightCount}px solid ${highlightColor}`,
            borderRadius: '4px',
            pointerEvents: 'none'
          }}
        />
      );
    }
    
    if (showSpacing) {
      return (
        <motion.div className="spacing-visualization absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="flex-1 bg-gray-200 dark:bg-gray-700 m-4 h-4 rounded"
            initial={{ margin: 0 }}
            animate={{ margin: highlightCount }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      );
    }
    
    return null;
  };
  
  // Get the appropriate visualization based on unit type
  const getUnitVisualization = () => {
    switch (unitType) {
      case 'rem':
        return (
          <div className="rem-visualization text-center mt-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">1rem = 16px (browser default)</div>
            <div className="flex items-center justify-center space-x-1 mt-2">
              {Array.from({ length: Math.min(5, Math.ceil(highlightCount / 16)) }).map((_, i) => (
                <motion.div 
                  key={i}
                  className="h-8 bg-indigo-500 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: i < Math.floor(highlightCount / 16) ? 16 : (highlightCount % 16) }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {(highlightCount / 16).toFixed(2)}rem
            </div>
          </div>
        );
      case 'em':
        return (
          <div className="em-visualization text-center mt-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">1em = font-size of element</div>
            <motion.div 
              className="relative inline-block mt-2 font-mono"
              initial={{ fontSize: 16 }}
              animate={{ fontSize: 16 + (highlightCount / 4) }}
              transition={{ duration: 0.5 }}
            >
              Text
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>
          </div>
        );
      case '%':
        return (
          <div className="percentage-visualization mt-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">% of parent element</div>
            <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded mt-2">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-indigo-500 rounded"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(100, highlightCount)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        );
      case 'vh':
      case 'vw':
        return (
          <div className="viewport-visualization mt-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {unitType === 'vh' ? 'Viewport Height' : 'Viewport Width'}
            </div>
            <div className="relative mt-2">
              <div className="border border-dashed border-gray-400 p-1 rounded">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-sm h-12 w-full relative overflow-hidden">
                  <motion.div 
                    className="absolute bg-purple-500 rounded-sm"
                    initial={unitType === 'vh' ? { height: '0%', width: '100%' } : { width: '0%', height: '100%' }}
                    animate={unitType === 'vh' ? { height: `${Math.min(100, highlightCount)}%`, width: '100%' } : { width: `${Math.min(100, highlightCount)}%`, height: '100%' }}
                    transition={{ duration: 0.5 }}
                    style={unitType === 'vh' ? { bottom: 0 } : { left: 0 }}
                  />
                </div>
              </div>
              <div className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">
                Viewport
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className={`pixelGridContainer relative ${className}`}
      style={{ 
        width: containerWidth,
        minHeight: rows * pixelSize,
      }}
      variants={container}
      initial="hidden"
      animate="show"
      ref={containerRef}
    >
      <div 
        style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '1px'
        }}
      >
        <AnimatePresence>
          {grid.map((idx) => (
            <motion.div
              key={idx}
              className={`pixel rounded-sm ${
                highlightedPixels.includes(idx) ? 'highlighted' : ''
              }`}
              style={{
                width: pixelSize,
                height: pixelSize,
                backgroundColor: highlightedPixels.includes(idx) 
                  ? highlightColor 
                  : 'rgba(229, 231, 235, 0.5)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
              }}
              variants={item}
              layoutId={`pixel-${idx}`}
              transition={{
                layout: { type: 'spring', damping: 20, stiffness: 300 }
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Unit-specific overlay visualization */}
      {renderUnitSpecificVisualization()}
      
      {/* Additional unit visualization */}
      {getUnitVisualization()}
      
      <motion.div 
        className="pixel-count absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {highlightCount} pixels {comparisonMode ? 'compared' : 'highlighted'}
      </motion.div>
    </motion.div>
  );
};

export default PixelGrid;
