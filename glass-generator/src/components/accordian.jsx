import React from 'react';

// ----------------------------------------------------------------------
// CONSTANTS
// ----------------------------------------------------------------------

const SHAPE_PRESETS = [
  { id: 'none', label: 'None (Rectangle)' },
  { id: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', label: 'Diamond' },
  { id: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', label: 'Skewed' },
  { id: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', label: 'Pentagon' },
];


const ANIMATION_CLASSES = {
  none: '',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  spin: 'animate-spin',
  ping: 'animate-ping',
};

const GOOGLE_FONTS = ['Inter', 'Roboto', 'Fira Code', 'Poppins', 'Playfair Display'];

const EMOJI_OPTIONS = ['✨', '🚀', '💎', '🔥', '💡', '🎨', '⚡', '🌟'];

const MASCOT_CHARACTERS = [
  { id: 'bot', name: 'Aura Bot', avatar: '🤖' },
  { id: 'fox', name: 'Cyber Fox', avatar: '🦊' },
  { id: 'ghost', name: 'Neon Ghost', avatar: '👻' },
  { id: 'owl', name: 'Wise Owl', avatar: '🦉' },
];

// ----------------------------------------------------------------------
// MAIN ACCORDION / SIDEBAR COMPONENT
// ----------------------------------------------------------------------

export default function AccordionSidebar({
  config = {},
  updateConfig,
  openSection,
  toggleSection,
  currentView,
}) {
  const colorStops = config.colorStops || [
    { color: config.tintColor || '#6366f1', pos: 0 },
    { color: config.borderColor || '#ec4899', pos: 50 },
    { color: '#3b82f6', pos: 100 }
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
      <aside className="w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/50 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-none">
        <div className="p-4 flex flex-col gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
              Target Component
            </label>

            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {['card', 'button', 'input'].map((t) => (
                <button
                  key={t}
                  onClick={() => updateConfig('target', t)}
                  className={`py-1 text-xs capitalize font-semibold rounded transition-colors ${
                    config.target === t
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <AccordionSection
            title="🔷 Custom Shape & ClipPath"
            isOpen={openSection === 'shapes'}
            onToggle={() => toggleSection('shapes')}
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-slate-400 font-medium">
                Geometric Polygon Shape
              </label>

              <select
                value={config.shape || 'none'}
                onChange={(e) => updateConfig('shape', e.target.value)}
                className="w-full min-w-0 bg-slate-900 text-xs text-white p-2 rounded-lg border border-slate-800 outline-none cursor-pointer"
              >
                {SHAPE_PRESETS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {config.shape === 'none' && (
              <SliderInput
                label="Border Radius"
                value={config.borderRadius || 0}
                min={0}
                max={60}
                unit="px"
                onChange={(v) => updateConfig('borderRadius', v)}
              />
            )}
          </AccordionSection>

        </div>
      </aside>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

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