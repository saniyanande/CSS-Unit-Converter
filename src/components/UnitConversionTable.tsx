
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UnitType, UNITS_INFO } from '@/lib/unitConversions';

interface UnitConversionTableProps {
  className?: string;
}

// Create conversion factors matrix
const getConversions = (baseValue: number = 16) => {
  const displayUnits: UnitType[] = ['px', 'rem', 'em', '%', 'vh', 'vw'];
  
  // Define the conversion matrix for displayed units
  const conversions: Record<string, Record<string, string>> = {};
  
  // Initialize with placeholder values for all required units
  const allUnits: UnitType[] = [
    'px', 'rem', 'em', '%', 'vh', 'vw', 'vmin', 'vmax', 'cm', 'mm', 'in', 'pt', 'pc'
  ];
  
  // Initialize the full conversion matrix with placeholder values
  allUnits.forEach(fromUnit => {
    conversions[fromUnit] = {};
    allUnits.forEach(toUnit => {
      conversions[fromUnit][toUnit] = 'N/A';
    });
  });
  
  // Standard conversion values (approximated)
  conversions['px']['px'] = '1';
  conversions['px']['rem'] = `${1/16}`;
  conversions['px']['em'] = `${1/16}`;
  conversions['px']['%'] = 'Depends on parent';
  conversions['px']['vh'] = `${100/window.innerHeight}`;
  conversions['px']['vw'] = `${100/window.innerWidth}`;
  
  conversions['rem']['px'] = '16';
  conversions['rem']['rem'] = '1';
  conversions['rem']['em'] = '1';
  conversions['rem']['%'] = 'Depends on parent';
  conversions['rem']['vh'] = `${1600/window.innerHeight}`;
  conversions['rem']['vw'] = `${1600/window.innerWidth}`;
  
  conversions['em']['px'] = 'Depends on parent';
  conversions['em']['rem'] = 'Depends on parent';
  conversions['em']['em'] = '1';
  conversions['em']['%'] = 'Depends on parent';
  conversions['em']['vh'] = 'Depends on context';
  conversions['em']['vw'] = 'Depends on context';
  
  conversions['%']['px'] = 'Depends on parent';
  conversions['%']['rem'] = 'Depends on parent';
  conversions['%']['em'] = 'Depends on parent';
  conversions['%']['%'] = '1';
  conversions['%']['vh'] = 'Depends on context';
  conversions['%']['vw'] = 'Depends on context';
  
  conversions['vh']['px'] = `${window.innerHeight/100}`;
  conversions['vh']['rem'] = `${(window.innerHeight/100)/16}`;
  conversions['vh']['em'] = `${(window.innerHeight/100)/16}`;
  conversions['vh']['%'] = 'Depends on parent';
  conversions['vh']['vh'] = '1';
  conversions['vh']['vw'] = `${window.innerHeight/window.innerWidth}`;
  
  conversions['vw']['px'] = `${window.innerWidth/100}`;
  conversions['vw']['rem'] = `${(window.innerWidth/100)/16}`;
  conversions['vw']['em'] = `${(window.innerWidth/100)/16}`;
  conversions['vw']['%'] = 'Depends on parent';
  conversions['vw']['vh'] = `${window.innerWidth/window.innerHeight}`;
  conversions['vw']['vw'] = '1';
  
  return { units: displayUnits, conversions };
};

// Reference values for common conversions
const referenceValues = [
  { name: 'Base font size', px: '16px', rem: '1rem', em: '1em' },
  { name: 'Small text', px: '12px', rem: '0.75rem', em: '0.75em' },
  { name: 'Large text', px: '24px', rem: '1.5rem', em: '1.5em' },
  { name: 'Heading', px: '32px', rem: '2rem', em: '2em' },
  { name: 'Border thin', px: '1px', rem: '0.0625rem', em: '0.0625em' },
  { name: 'Border medium', px: '2px', rem: '0.125rem', em: '0.125em' },
  { name: 'Border thick', px: '4px', rem: '0.25rem', em: '0.25em' },
  { name: 'Margin/Padding small', px: '8px', rem: '0.5rem', em: '0.5em' },
  { name: 'Margin/Padding medium', px: '16px', rem: '1rem', em: '1em' },
  { name: 'Margin/Padding large', px: '24px', rem: '1.5rem', em: '1.5em' },
];

const physicalUnitsData = [
  { unit: 'in', px: '96px', cm: '2.54cm', mm: '25.4mm', pt: '72pt', pc: '6pc', description: '1 inch' },
  { unit: 'cm', px: '37.8px', in: '0.394in', mm: '10mm', pt: '28.35pt', pc: '2.36pc', description: '1 centimeter' },
  { unit: 'mm', px: '3.78px', in: '0.0394in', cm: '0.1cm', pt: '2.83pt', pc: '0.236pc', description: '1 millimeter' },
  { unit: 'pt', px: '1.33px', in: '0.0139in', cm: '0.035cm', mm: '0.35mm', pc: '0.083pc', description: '1 point (1/72 inch)' },
  { unit: 'pc', px: '16px', in: '0.167in', cm: '0.423cm', mm: '4.23mm', pt: '12pt', description: '1 pica (12 points)' },
];

const viewportUnitsData = [
  { name: '1vh', description: '1% of viewport height', example: '10vh = 10% of viewport height' },
  { name: '1vw', description: '1% of viewport width', example: '50vw = 50% of viewport width' },
  { name: '1vmin', description: '1% of smaller viewport dimension', example: '100vmin = 100% of smaller dimension' },
  { name: '1vmax', description: '1% of larger viewport dimension', example: '50vmax = 50% of larger dimension' },
];

const UnitConversionTable: React.FC<UnitConversionTableProps> = ({ className }) => {
  const { units, conversions } = getConversions();
  
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold mb-4">CSS Unit Conversion Tables</h2>
      
      <Tabs defaultValue="reference">
        <TabsList className="mb-4 w-full flex justify-between">
          <TabsTrigger value="reference">Common References</TabsTrigger>
          <TabsTrigger value="matrix">Conversion Matrix</TabsTrigger>
          <TabsTrigger value="physical">Physical Units</TabsTrigger>
          <TabsTrigger value="viewport">Viewport Units</TabsTrigger>
        </TabsList>
        
        {/* Common Reference Values Tab */}
        <TabsContent value="reference">
          <div className="rounded-md border">
            <Table>
              <TableCaption>Common CSS unit references</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Element</TableHead>
                  <TableHead>Pixels (px)</TableHead>
                  <TableHead>Root EM (rem)</TableHead>
                  <TableHead>EM (em)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referenceValues.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.px}</TableCell>
                    <TableCell>{item.rem}</TableCell>
                    <TableCell>{item.em}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        {/* Conversion Matrix Tab */}
        <TabsContent value="matrix">
          <div className="rounded-md border">
            <Table>
              <TableCaption>Unit conversion matrix (1 unit values)</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">From ↓ To →</TableHead>
                  {units.map(unit => (
                    <TableHead key={unit}>{UNITS_INFO[unit].name} ({unit})</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {units.map(fromUnit => (
                  <TableRow key={fromUnit}>
                    <TableCell className="font-medium">{fromUnit}</TableCell>
                    {units.map(toUnit => (
                      <TableCell key={toUnit}>{conversions[fromUnit][toUnit]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Note: Values are approximate and rounded. Some conversions depend on context or parent element size.
          </div>
        </TabsContent>
        
        {/* Physical Units Tab */}
        <TabsContent value="physical">
          <div className="rounded-md border">
            <Table>
              <TableCaption>Physical unit equivalents (at 96 DPI)</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Unit</TableHead>
                  <TableHead>Pixels</TableHead>
                  <TableHead>Inches</TableHead>
                  <TableHead>Centimeters</TableHead>
                  <TableHead>Millimeters</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Picas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {physicalUnitsData.map((item) => (
                  <TableRow key={item.unit}>
                    <TableCell className="font-medium">{item.description}</TableCell>
                    <TableCell>{item.px}</TableCell>
                    <TableCell>{item.in}</TableCell>
                    <TableCell>{item.cm}</TableCell>
                    <TableCell>{item.mm}</TableCell>
                    <TableCell>{item.pt}</TableCell>
                    <TableCell>{item.pc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        {/* Viewport Units Tab */}
        <TabsContent value="viewport">
          <div className="rounded-md border">
            <Table>
              <TableCaption>Viewport-relative units</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Unit</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Example</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {viewportUnitsData.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.example}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnitConversionTable;
