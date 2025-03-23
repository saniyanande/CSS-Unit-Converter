
export type UnitType = 
  | 'px' 
  | 'rem' 
  | 'em' 
  | 'vh' 
  | 'vw' 
  | '%' 
  | 'vmin' 
  | 'vmax' 
  | 'cm' 
  | 'mm' 
  | 'in' 
  | 'pt' 
  | 'pc';

export interface UnitInfo {
  name: string;
  description: string;
  bestFor: string[];
  avoid: string[];
  responsiveRating: number; // 1-5, 5 being the most responsive
  browserSupport: number; // 1-5, 5 being the best supported
}

export const UNITS_INFO: Record<UnitType, UnitInfo> = {
  'px': {
    name: 'Pixels',
    description: 'Pixels (px) are a fixed-size unit that corresponds to actual pixels on the screen.',
    bestFor: ['Borders', 'Shadows', 'Small, fixed-size elements', 'Precise positioning'],
    avoid: ['Text sizing', 'Responsive layouts', 'Container widths'],
    responsiveRating: 1,
    browserSupport: 5
  },
  'rem': {
    name: 'Root EM',
    description: 'Relative to the font-size of the root element (html). 1rem equals the font-size of the html element.',
    bestFor: ['Text sizing', 'Responsive layouts', 'Component sizing', 'Margins and padding'],
    avoid: ['When you need pixel-precise measurements'],
    responsiveRating: 5,
    browserSupport: 5
  },
  'em': {
    name: 'EM',
    description: 'Relative to the font-size of the parent element. Creates a compounding effect when nested.',
    bestFor: ['Text sizing', 'Element sizing relative to text', 'Component internal spacing'],
    avoid: ['Deep nested elements', 'When you need predictable sizing'],
    responsiveRating: 4,
    browserSupport: 5
  },
  'vh': {
    name: 'Viewport Height',
    description: '1vh is equal to 1% of the viewport height.',
    bestFor: ['Full-height layouts', 'Vertical spacing relative to screen', 'Hero sections'],
    avoid: ['Mobile layouts (due to address bar issues)', 'When height depends on content'],
    responsiveRating: 4,
    browserSupport: 4
  },
  'vw': {
    name: 'Viewport Width',
    description: '1vw is equal to 1% of the viewport width.',
    bestFor: ['Full-width layouts', 'Responsive typography', 'Horizontal spacing'],
    avoid: ['Text sizing (accessibility issues)', 'When width depends on content'],
    responsiveRating: 4,
    browserSupport: 4
  },
  '%': {
    name: 'Percentage',
    description: 'Relative to the parent element\'s size.',
    bestFor: ['Fluid layouts', 'Responsive columns', 'Padding and margin'],
    avoid: ['When parent size is unknown or variable'],
    responsiveRating: 4,
    browserSupport: 5
  },
  'vmin': {
    name: 'Viewport Minimum',
    description: '1vmin is equal to 1% of the viewport\'s smaller dimension (height or width).',
    bestFor: ['Responsive elements that should scale with the smaller dimension', 'Maintaining aspect ratios'],
    avoid: ['When you need explicit control over horizontal/vertical scaling'],
    responsiveRating: 4,
    browserSupport: 4
  },
  'vmax': {
    name: 'Viewport Maximum',
    description: '1vmax is equal to 1% of the viewport\'s larger dimension (height or width).',
    bestFor: ['Elements that should scale with the larger dimension', 'Full-screen layouts'],
    avoid: ['Mobile interfaces (can cause overflow)', 'When size predictability is important'],
    responsiveRating: 3,
    browserSupport: 4
  },
  'cm': {
    name: 'Centimeters',
    description: 'Physical unit of measurement, primarily for print.',
    bestFor: ['Print layouts', 'Physical dimension references'],
    avoid: ['Screen layouts', 'Responsive designs'],
    responsiveRating: 1,
    browserSupport: 3
  },
  'mm': {
    name: 'Millimeters',
    description: 'Physical unit of measurement, primarily for print.',
    bestFor: ['Print layouts', 'Physical dimension references'],
    avoid: ['Screen layouts', 'Responsive designs'],
    responsiveRating: 1,
    browserSupport: 3
  },
  'in': {
    name: 'Inches',
    description: 'Physical unit of measurement, primarily for print.',
    bestFor: ['Print layouts', 'Physical dimension references'],
    avoid: ['Screen layouts', 'Responsive designs'],
    responsiveRating: 1,
    browserSupport: 3
  },
  'pt': {
    name: 'Points',
    description: '1pt is equal to 1/72 of an inch. Used in print and sometimes for text sizing.',
    bestFor: ['Print layouts', 'Text in emails'],
    avoid: ['Web layouts', 'Responsive designs'],
    responsiveRating: 1,
    browserSupport: 4
  },
  'pc': {
    name: 'Picas',
    description: '1pc is equal to 12 points or 1/6 of an inch. Used in typography and print.',
    bestFor: ['Print layouts', 'Traditional typography'],
    avoid: ['Web layouts', 'Responsive designs'],
    responsiveRating: 1,
    browserSupport: 3
  }
};

// Base font size, typically 16px in browsers
const BASE_FONT_SIZE = 16;

// Device/viewport dimensions - these would be updated on resize in a real implementation
const getViewportWidth = () => window.innerWidth || document.documentElement.clientWidth;
const getViewportHeight = () => window.innerHeight || document.documentElement.clientHeight;

// Compute REM from pixels
export const pxToRem = (px: number): number => px / BASE_FONT_SIZE;

// Compute PX from REM
export const remToPx = (rem: number): number => rem * BASE_FONT_SIZE;

// Convert between units
export const convertUnits = (
  value: number,
  fromUnit: UnitType,
  toUnit: UnitType
): number => {
  // First convert to px as an intermediate step
  let valueInPx: number;

  switch (fromUnit) {
    case 'px':
      valueInPx = value;
      break;
    case 'rem':
      valueInPx = remToPx(value);
      break;
    case 'em':
      // Note: em is context-dependent, but we'll use document base for simplicity
      valueInPx = value * BASE_FONT_SIZE;
      break;
    case 'vh':
      valueInPx = (value / 100) * getViewportHeight();
      break;
    case 'vw':
      valueInPx = (value / 100) * getViewportWidth();
      break;
    case '%':
      // We'll assume percentage of viewport width for simplicity
      valueInPx = (value / 100) * getViewportWidth();
      break;
    case 'vmin':
      valueInPx = (value / 100) * Math.min(getViewportWidth(), getViewportHeight());
      break;
    case 'vmax':
      valueInPx = (value / 100) * Math.max(getViewportWidth(), getViewportHeight());
      break;
    case 'cm':
      // Assuming 96 DPI, 1in = 96px, 1cm = 37.8px
      valueInPx = value * 37.8;
      break;
    case 'mm':
      // 1mm = 3.78px (at 96 DPI)
      valueInPx = value * 3.78;
      break;
    case 'in':
      // 1in = 96px (at 96 DPI)
      valueInPx = value * 96;
      break;
    case 'pt':
      // 1pt = 1.33px (at 96 DPI)
      valueInPx = value * 1.33;
      break;
    case 'pc':
      // 1pc = 16px (at 96 DPI)
      valueInPx = value * 16;
      break;
    default:
      valueInPx = value;
  }

  // Then convert from px to the target unit
  switch (toUnit) {
    case 'px':
      return valueInPx;
    case 'rem':
      return pxToRem(valueInPx);
    case 'em':
      // Using document base for simplicity
      return valueInPx / BASE_FONT_SIZE;
    case 'vh':
      return (valueInPx / getViewportHeight()) * 100;
    case 'vw':
      return (valueInPx / getViewportWidth()) * 100;
    case '%':
      // % of viewport width
      return (valueInPx / getViewportWidth()) * 100;
    case 'vmin':
      return (valueInPx / Math.min(getViewportWidth(), getViewportHeight())) * 100;
    case 'vmax':
      return (valueInPx / Math.max(getViewportWidth(), getViewportHeight())) * 100;
    case 'cm':
      return valueInPx / 37.8;
    case 'mm':
      return valueInPx / 3.78;
    case 'in':
      return valueInPx / 96;
    case 'pt':
      return valueInPx / 1.33;
    case 'pc':
      return valueInPx / 16;
    default:
      return valueInPx;
  }
};

export const suggestBestUnit = (context: string, value: number, fromUnit: UnitType): UnitType => {
  // Simple heuristic-based suggestion
  switch (context) {
    case 'typography':
      return 'rem';
    case 'layout':
      return value < 10 ? 'rem' : (value > 100 ? '%' : 'rem');
    case 'spacing':
      return value < 5 ? 'rem' : 'rem';
    case 'borders':
      return 'px';
    default:
      // Default suggestion based on responsive rating
      const options: UnitType[] = ['rem', 'em', 'vh', 'vw', '%'];
      return options[0]; // Return the first option as default
  }
};

export const formatUnitValue = (value: number, unit: UnitType): string => {
  // Format with proper precision
  let precision = 0;
  
  if (unit === 'rem' || unit === 'em') {
    precision = 3; // More precision for relative units
  } else if (unit === 'vw' || unit === 'vh' || unit === 'vmin' || unit === 'vmax' || unit === '%') {
    precision = 2;
  } else if (unit === 'cm' || unit === 'mm' || unit === 'in') {
    precision = 2;
  }
  
  // Format the number and add the unit
  return `${value.toFixed(precision)}${unit}`;
};
