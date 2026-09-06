import React from 'react';

export function AccordionSection({ title, isOpen, onToggle, children }) {
  return (
    <div className="border border-slate-800 rounded-xl bg-slate-950/40 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-3.5 py-2.5 text-xs font-bold text-slate-300 flex justify-between items-center hover:bg-slate-800/40 transition-colors"
      >
        <span>{title}</span>
        <span className="text-slate-500 text-[10px]">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="p-3.5 pt-1 border-t border-slate-800/60 flex flex-col gap-3">{children}</div>}
    </div>
  );
}

export function SliderInput({ label, value, min, max, unit, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[11px]">
        <span className="text-slate-400 font-medium">{label}</span>
        <span className="text-slate-300 font-mono">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-indigo-500 h-1 bg-slate-800 rounded cursor-pointer"
      />
    </div>
  );
}

export function ColorPickerInput({ label, value, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[11px] text-slate-400 font-medium">{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-6 h-6 bg-transparent rounded cursor-pointer border-0"
      />
    </div>
  );
}