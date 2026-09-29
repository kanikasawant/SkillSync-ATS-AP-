import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomDropdown({ 
  value, 
  options = [], 
  onChange, 
  disabled = false,
  className = "", 
  buttonClassName = "",
  placeholder = "Select..."
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Normalize options array to [{ value, label }] format
  const normalizedOptions = options.map(opt => {
    if (typeof opt === 'object' && opt !== null) {
      return { value: opt.value, label: opt.label !== undefined ? opt.label : opt.value };
    }
    return { value: opt, label: String(opt) };
  });

  const selectedOption = normalizedOptions.find(o => String(o.value) === String(value)) || normalizedOptions[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => document.removeEventListener('mousedown', handleClickOutside, true);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block w-full select-none ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full bg-[#F0F7FF] border border-blue-100 hover:border-blue-300 focus:bg-white focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 flex items-center justify-between gap-2 shadow-2xs hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed ${buttonClassName}`}
      >
        <span className="truncate">{selectedOption?.label || placeholder}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-blue-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
      </button>

      {/* Popover Dropdown Menu (Image 2 Design) */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 min-w-[160px] bg-white rounded-2xl border border-slate-200/90 shadow-xl py-1 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100/80">
            {normalizedOptions.map((opt) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-xs font-semibold flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-[#F0F7FF] text-[#2563EB] font-bold' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
