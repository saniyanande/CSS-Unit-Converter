
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedValueProps {
  value: number;
  unit: string;
  className?: string;
}

const AnimatedValue: React.FC<AnimatedValueProps> = ({ value, unit, className = '' }) => {
  const prevValueRef = useRef<number>(value);
  const valueRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (valueRef.current) {
      const animation = valueRef.current.animate(
        [
          { opacity: 0.5, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        {
          duration: 300,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        }
      );
      
      return () => {
        animation.cancel();
      };
    }
  }, [value]);

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  // Format the value with precision
  const formattedValue = React.useMemo(() => {
    let precision = 0;
    if (['rem', 'em'].includes(unit)) {
      precision = 3;
    } else if (['vw', 'vh', 'vmin', 'vmax', '%'].includes(unit)) {
      precision = 2;
    } else if (['cm', 'mm', 'in', 'pt', 'pc'].includes(unit)) {
      precision = 2;
    }
    return value.toFixed(precision);
  }, [value, unit]);

  return (
    <AnimatePresence>
      <motion.span
        key={`${value}-${unit}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`transition-value inline-flex ${className}`}
      >
        <span ref={valueRef}>{formattedValue}</span>
        <span className="text-primary ml-0.5">{unit}</span>
      </motion.span>
    </AnimatePresence>
  );
};

export default AnimatedValue;
