
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PixelGridProps {
  pixelCount: number;
  highlightCount?: number;
  containerWidth?: number;
  pixelSize?: number;
  highlightColor?: string;
  className?: string;
}

const PixelGrid: React.FC<PixelGridProps> = ({
  pixelCount,
  highlightCount = 0,
  containerWidth = 320,
  pixelSize = 10,
  highlightColor = 'rgba(59, 130, 246, 0.6)',
  className = '',
}) => {
  const [grid, setGrid] = useState<number[]>([]);
  const [highlightedPixels, setHighlightedPixels] = useState<number[]>([]);
  const cols = Math.floor(containerWidth / pixelSize);
  
  useEffect(() => {
    // Create grid array
    const newGrid = Array.from({ length: pixelCount }, (_, i) => i);
    setGrid(newGrid);
    
    // Animate highlight effect
    const highlight = () => {
      const startIdx = Math.floor(Math.random() * (pixelCount - highlightCount));
      const highlighted = Array.from({ length: highlightCount }, (_, i) => startIdx + i);
      setHighlightedPixels(highlighted);
    };
    
    // Initial highlight after a delay
    const timeout = setTimeout(highlight, 500);
    
    // Set up interval for changing highlight
    const interval = setInterval(highlight, 3000);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [pixelCount, highlightCount]);

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

  return (
    <motion.div 
      className={`pixelGridContainer ${className}`}
      style={{ 
        width: containerWidth,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '1px'
      }}
      variants={container}
      initial="hidden"
      animate="show"
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
    </motion.div>
  );
};

export default PixelGrid;
