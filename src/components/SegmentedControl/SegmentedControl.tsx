import React from 'react';
import './SegmentedControl.scss';

interface SegmentedControlProps {
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

function SegmentedControl({ options, selectedValue, onChange }: SegmentedControlProps) {
  return (
    <div className="segmented-control">
      {options.map((option) => (
        <button
          key={option}
          className={`segmented-control-button ${selectedValue === option ? 'active' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default SegmentedControl;