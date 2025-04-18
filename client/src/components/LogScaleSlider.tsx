import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

interface LogScaleSliderProps {
  id: string;
  min: number;
  max: number;
  value: number;
  step?: number;
  className?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}

/**
 * A slider component that uses a logarithmic scale internally
 * but presents a linear interface to the user.
 */
const LogScaleSlider = ({ 
  id, 
  min, 
  max, 
  value, 
  step = 0.01, 
  className = "", 
  disabled = false,
  onChange
}: LogScaleSliderProps) => {
  // Convert the linear value to a logarithmic scale for internal representation
  const [internalValue, setInternalValue] = useState(
    Math.log10(Math.max(value, min)) / Math.log10(max) * 100
  );

  // Update internal value when external value changes
  useEffect(() => {
    const logValue = Math.log10(Math.max(value, min)) / Math.log10(max) * 100;
    setInternalValue(logValue);
  }, [value, min, max]);

  // Convert the logarithmic scale back to linear when the slider changes
  const handleValueChange = (newValues: number[]) => {
    const logPosition = newValues[0];
    // Convert from log scale (0-100) back to original scale
    const linearValue = Math.pow(10, logPosition / 100 * Math.log10(max));
    // Round to the precision determined by the step
    const precision = step < 1 ? String(step).split('.')[1].length : 0;
    const roundedValue = Number(linearValue.toFixed(precision));
    
    // Ensure value is within bounds and a multiple of step
    const clampedValue = Math.max(
      min, 
      Math.min(max, Math.round(roundedValue / step) * step)
    );
    
    onChange(clampedValue);
  };

  return (
    <Slider
      id={id}
      min={0}
      max={100}
      step={1}
      value={[internalValue]}
      onValueChange={handleValueChange}
      className={className}
      disabled={disabled}
    />
  );
};

export default LogScaleSlider;