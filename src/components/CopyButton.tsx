
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CopyButtonProps {
  value: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, className }) => {
  const [copied, setCopied] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Copy to clipboard
    navigator.clipboard.writeText(value);
    
    // Show success state
    setCopied(true);
    toast.success('Copied to clipboard!');
    
    // Reset after animation
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const id = Date.now();
    setRipples((prevRipples) => [...prevRipples, { id, x, y }]);
    
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== id));
    }, 600);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'copy-button relative overflow-hidden p-2 rounded-full bg-primary/10 text-primary transition-all hover:bg-primary/20 active:bg-primary/30',
        copied ? 'bg-green-500/20 text-green-500' : '',
        className
      )}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple absolute"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '50px',
            height: '50px',
          }}
        />
      ))}
    </button>
  );
};

export default CopyButton;
