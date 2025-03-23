
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedValue from './AnimatedValue';
import PixelGrid from './PixelGrid';
import UnitInfo from './UnitInfo';
import CopyButton from './CopyButton';
import {
  UnitType,
  UNITS_INFO,
  convertUnits,
  formatUnitValue,
  suggestBestUnit
} from '@/lib/unitConversions';

const UnitConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(16);
  const [inputUnit, setInputUnit] = useState<UnitType>('px');
  const [outputUnit, setOutputUnit] = useState<UnitType>('rem');
  const [outputValue, setOutputValue] = useState<number>(1);
  const [showUnitInfo, setShowUnitInfo] = useState<UnitType | null>(null);
  const [context, setContext] = useState<string>('typography');
  const [suggestedUnit, setSuggestedUnit] = useState<UnitType | null>(null);
  
  // All available units
  const availableUnits: UnitType[] = [
    'px', 'rem', 'em', 'vh', 'vw', '%', 'vmin', 'vmax', 
    'cm', 'mm', 'in', 'pt', 'pc'
  ];

  // Context options
  const contexts = [
    { value: 'typography', label: 'Typography' },
    { value: 'layout', label: 'Layout' },
    { value: 'spacing', label: 'Spacing' },
    { value: 'borders', label: 'Borders' }
  ];

  // Update the conversion when inputs change
  useEffect(() => {
    const newOutputValue = convertUnits(inputValue, inputUnit, outputUnit);
    setOutputValue(newOutputValue);
    
    // Get unit suggestion
    const suggested = suggestBestUnit(context, inputValue, inputUnit);
    setSuggestedUnit(suggested);
  }, [inputValue, inputUnit, outputUnit, context]);

  // Format the full CSS value for copying
  const fullCssValue = `${formatUnitValue(outputValue, outputUnit)}`;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <h1 className="text-2xl font-semibold mb-2">CSS Unit Converter</h1>
          <p className="text-blue-100">Convert between CSS units with real-time visualization</p>
        </div>
        
        {/* Context Selection */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">What are you styling?</h2>
          <div className="flex flex-wrap gap-2">
            {contexts.map((ctx) => (
              <button
                key={ctx.value}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm transition-all",
                  context === ctx.value
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                )}
                onClick={() => setContext(ctx.value)}
              >
                {ctx.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Converter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Input Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter Value
            </label>
            
            <div className="relative">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter value"
              />
              
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <select
                  value={inputUnit}
                  onChange={(e) => setInputUnit(e.target.value as UnitType)}
                  className="block w-20 pl-3 pr-8 py-1.5 text-base border-0 focus:outline-none focus:ring-0 bg-transparent"
                >
                  {availableUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Pixel Grid Visualization */}
            <AnimatePresence mode="wait">
              {inputUnit === 'px' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Pixel Visualization</h3>
                  <div className="flex justify-center">
                    <PixelGrid pixelCount={Math.min(inputValue * 2, 200)} highlightCount={inputValue} />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                    {inputValue} pixels highlighted
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Unit Info Button */}
            <button
              onClick={() => setShowUnitInfo(inputUnit)}
              className="inline-flex items-center text-sm text-primary hover:text-primary-dark"
            >
              <Info className="h-4 w-4 mr-1" />
              <span>About {UNITS_INFO[inputUnit].name}</span>
            </button>
          </div>
          
          {/* Output Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Converted Value
            </label>
            
            <div className="relative">
              <div className="flex items-center">
                <div className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <AnimatedValue
                    value={outputValue}
                    unit={outputUnit}
                    className="text-lg font-medium"
                  />
                </div>
                
                <div className="ml-2">
                  <CopyButton value={fullCssValue} />
                </div>
              </div>
              
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                <select
                  value={outputUnit}
                  onChange={(e) => setOutputUnit(e.target.value as UnitType)}
                  className="block w-20 pl-3 pr-8 py-1.5 text-base border-0 focus:outline-none focus:ring-0 bg-transparent"
                >
                  {availableUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Conversion Formula */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Conversion</h3>
              <div className="flex items-center justify-center space-x-3 text-sm">
                <span className="font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                  {formatUnitValue(inputValue, inputUnit)}
                </span>
                <ArrowRight className="h-4 w-4 text-blue-500" />
                <span className="font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                  {formatUnitValue(outputValue, outputUnit)}
                </span>
              </div>
            </div>
            
            {/* Suggested Best Unit */}
            {suggestedUnit && suggestedUnit !== outputUnit && (
              <motion.div
                className="unit-suggestion bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Suggested Unit</h3>
                <p className="text-sm text-green-700 dark:text-green-400">
                  For {context}, consider using <strong>{UNITS_INFO[suggestedUnit].name}</strong> ({suggestedUnit}).
                </p>
                <button
                  onClick={() => setOutputUnit(suggestedUnit)}
                  className="mt-2 text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full transition-colors"
                >
                  Convert to {suggestedUnit}
                </button>
              </motion.div>
            )}
            
            {/* Unit Info Button */}
            <button
              onClick={() => setShowUnitInfo(outputUnit)}
              className="inline-flex items-center text-sm text-primary hover:text-primary-dark"
            >
              <Info className="h-4 w-4 mr-1" />
              <span>About {UNITS_INFO[outputUnit].name}</span>
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Unit Information Dialog */}
      <AnimatePresence>
        {showUnitInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUnitInfo(null)}
          >
            <motion.div
              className="max-w-md w-full"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <UnitInfo unitType={showUnitInfo} unitInfo={UNITS_INFO[showUnitInfo]} />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => setShowUnitInfo(null)}
                  className="text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnitConverter;
