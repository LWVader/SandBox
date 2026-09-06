import React from 'react';
import { SHAPE_PRESETS, ANIMATION_CLASSES, GOOGLE_FONTS, MASCOT_CHARACTERS } from '../appConfig.jsx';
import { AccordionSection, SliderInput, ColorPickerInput } from './UIControls.jsx';
import { GRADIENT_TYPES, GRADIENT_POSITIONS, DEFAULT_GRADIENT_COLORS } from '../appConfig';


export default function Sidebar({
  config,
  updateConfig,
  currentView,
  openSection,
  toggleSection,
  emojiOptions
}) {
  return (
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
                  config.target === t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
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
            <label className="text-[11px] text-slate-400 font-medium">Geometric Polygon Shape</label>
            <select
              value={config.shape}
              onChange={(e) => updateConfig('shape', e.target.value)}
              className="w-full min-w-0 bg-slate-900 text-xs text-white p-2 rounded-lg border border-slate-800 outline-none cursor-pointer"
            >
              {SHAPE_PRESETS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          {config.shape === 'none' && (
            <SliderInput
              label="Border Radius"
              value={config.borderRadius}
              min={0}
              max={60}
              unit="px"
              onChange={(v) => updateConfig('borderRadius', v)}
            />
          )}
        </AccordionSection>
{/* GRADIENT BACKGROUND CONTROLS ACCORDION */}
<AccordionSection
  title="🌈 Gradient Background Controls"
  isOpen={openSection === 'gradient'}
  onToggle={() => toggleSection('gradient')}
>
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] text-slate-400 font-medium">Gradient Type</label>
    <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
      {GRADIENT_TYPES.map((g) => (
        <button
          key={g.id}
          onClick={() => updateConfig('gradientType', g.id)}
          className={`py-1 text-xs capitalize font-semibold rounded transition-colors ${
            (config.gradientType || 'linear') === g.id
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {g.label}
        </button>
      ))}
    </div>
  </div>

  {(config.gradientType === 'linear' || config.gradientType === 'conic') && (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] text-slate-400 font-medium">Gradient Angle</label>
      <input
        type="range"
        min={0}
        max={360}
        value={config.gradientAngle ?? 90}
        onChange={(e) => updateConfig('gradientAngle', Number(e.target.value))}
        className="accent-indigo-500 h-1 bg-slate-800 rounded cursor-pointer"
      />
      <span className="text-[10px] text-slate-400 text-right">{config.gradientAngle ?? 90}°</span>
    </div>
  )}

  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] text-slate-400 font-medium">Gradient Position / Origin</label>
    <select
      value={config.gradientPosition || 'center'}
      onChange={(e) => updateConfig('gradientPosition', e.target.value)}
      className="w-full min-w-0 bg-slate-900 text-xs text-white p-2 rounded-lg border border-slate-800 outline-none cursor-pointer capitalize"
    >
      {GRADIENT_POSITIONS.map((pos) => (
        <option key={pos} value={pos} className="capitalize">
          {pos}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/60">
    <div className="flex justify-between items-center">
      <span className="text-[11px] text-slate-400 font-medium">Color Stops</span>
      <button
        onClick={() => {
          const currentStops = config.colorStops || DEFAULT_GRADIENT_COLORS;
          if (currentStops.length < 5) {
            updateConfig('colorStops', [...currentStops, { color: '#ffffff', pos: 100 }]);
          }
        }}
        className="text-[10px] bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 px-2 py-0.5 rounded hover:bg-indigo-600/50 transition-colors"
      >
        + Add Stop
      </button>
    </div>

    {(config.colorStops || DEFAULT_GRADIENT_COLORS).map((stop, index) => (
      <div key={index} className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
        <input
          type="color"
          value={stop.color}
          onChange={(e) => {
            const currentStops = [...(config.colorStops || DEFAULT_GRADIENT_COLORS)];
            currentStops[index] = { ...currentStops[index], color: e.target.value };
            updateConfig('colorStops', currentStops);
          }}
          className="w-6 h-6 bg-transparent rounded cursor-pointer border-0 shrink-0"
        />
        <div className="flex-1 flex flex-col gap-0.5">
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Color {index + 1}</span>
            <span>{stop.pos ?? 0}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={stop.pos ?? 0}
            onChange={(e) => {
              const currentStops = [...(config.colorStops || DEFAULT_GRADIENT_COLORS)];
              currentStops[index] = { ...currentStops[index], pos: Number(e.target.value) };
              updateConfig('colorStops', currentStops);
            }}
            className="accent-indigo-500 h-1 bg-slate-800 rounded cursor-pointer"
          />
        </div>
        {(config.colorStops || DEFAULT_GRADIENT_COLORS).length > 2 && (
          <button
            onClick={() => {
              const currentStops = config.colorStops || DEFAULT_GRADIENT_COLORS;
              const updatedStops = currentStops.filter((_, i) => i !== index);
              updateConfig('colorStops', updatedStops);
            }}
            className="text-slate-500 hover:text-red-400 text-xs px-1"
          >
            ✕
          </button>
        )}
      </div>
    ))}
  </div>
</AccordionSection>

        <AccordionSection
          title="🧊 3D Layers & Perspective"
          isOpen={openSection === '3d'}
          onToggle={() => toggleSection('3d')}
        >
          <SliderInput
            label="Perspective Distance"
            value={config.perspective}
            min={200}
            max={2000}
            unit="px"
            onChange={(v) => updateConfig('perspective', v)}
          />
          <SliderInput
            label="3D Rotate X"
            value={config.rotateX}
            min={-45}
            max={45}
            unit="°"
            onChange={(v) => updateConfig('rotateX', v)}
          />
          <SliderInput
            label="3D Rotate Y"
            value={config.rotateY}
            min={-45}
            max={45}
            unit="°"
            onChange={(v) => updateConfig('rotateY', v)}
          />
          <SliderInput
            label="Layer Translate Z"
            value={config.translateZ}
            min={0}
            max={100}
            unit="px"
            onChange={(v) => updateConfig('translateZ', v)}
          />
        </AccordionSection>

        <AccordionSection
          title="🎬 Motion & Animations"
          isOpen={openSection === 'animations'}
          onToggle={() => toggleSection('animations')}
        >
          <div className="grid grid-cols-2 gap-1.5">
            {Object.keys(ANIMATION_CLASSES).map((anim) => (
              <button
                key={anim}
                onClick={() => updateConfig('animation', anim)}
                className={`p-2 text-xs font-semibold rounded-lg border capitalize transition-all ${
                  config.animation === anim
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {anim}
              </button>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection
          title="📐 Dimensions & Borders"
          isOpen={openSection === 'geometry'}
          onToggle={() => toggleSection('geometry')}
        >
          <SliderInput
            label="Width"
            value={config.width}
            min={120}
            max={600}
            unit="px"
            onChange={(v) => updateConfig('width', v)}
          />
          {config.target === 'card' && (
            <SliderInput
              label="Height"
              value={config.height}
              min={100}
              max={500}
              unit="px"
              onChange={(v) => updateConfig('height', v)}
            />
          )}
          <SliderInput
            label="Border Width"
            value={config.borderWidth}
            min={0}
            max={10}
            unit="px"
            onChange={(v) => updateConfig('borderWidth', v)}
          />
        </AccordionSection>

        <AccordionSection
          title="✨ Visual Effects"
          isOpen={openSection === 'effects'}
          onToggle={() => toggleSection('effects')}
        >
          <SliderInput
            label="Backdrop Blur"
            value={config.blur}
            min={0}
            max={40}
            unit="px"
            onChange={(v) => updateConfig('blur', v)}
          />
          <SliderInput
            label="Glass Opacity"
            value={Math.round(config.opacity * 100)}
            min={0}
            max={100}
            unit="%"
            onChange={(v) => updateConfig('opacity', v / 100)}
          />
          <ColorPickerInput
            label="Tint Color"
            value={config.tintColor}
            onChange={(v) => updateConfig('tintColor', v)}
          />
          <ColorPickerInput
            label="Border Color"
            value={config.borderColor}
            onChange={(v) => updateConfig('borderColor', v)}
          />
        </AccordionSection>

        <AccordionSection
          title="🌑 Shadows & Elevation"
          isOpen={openSection === 'shadows'}
          onToggle={() => toggleSection('shadows')}
        >
          <SliderInput
            label="Shadow X Offset"
            value={config.shadowX}
            min={-30}
            max={30}
            unit="px"
            onChange={(v) => updateConfig('shadowX', v)}
          />
          <SliderInput
            label="Shadow Y Offset"
            value={config.shadowY}
            min={-30}
            max={30}
            unit="px"
            onChange={(v) => updateConfig('shadowY', v)}
          />
          <SliderInput
            label="Shadow Blur Radius"
            value={config.shadowBlur}
            min={0}
            max={60}
            unit="px"
            onChange={(v) => updateConfig('shadowBlur', v)}
          />
          <SliderInput
            label="Shadow Opacity"
            value={Math.round(config.shadowOpacity * 100)}
            min={0}
            max={100}
            unit="%"
            onChange={(v) => updateConfig('shadowOpacity', v / 100)}
          />
        </AccordionSection>

        {currentView === 'customization' && (
          <>
            <AccordionSection
              title="🔤 Typography & Content"
              isOpen={openSection === 'typography'}
              onToggle={() => toggleSection('typography')}
            >
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-slate-400 font-medium">Font Family</label>
                <select
                  value={config.fontFamily}
                  onChange={(e) => updateConfig('fontFamily', e.target.value)}
                  className="bg-slate-900 text-xs text-white p-2 rounded-lg border border-slate-800 outline-none"
                >
                  {GOOGLE_FONTS.map((font) => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>
              <SliderInput
                label="Font Size"
                value={config.fontSize}
                min={10}
                max={28}
                unit="px"
                onChange={(v) => updateConfig('fontSize', v)}
              />
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-slate-400 font-medium">Title Text</label>
                <input
                  type="text"
                  value={config.titleText}
                  onChange={(e) => updateConfig('titleText', e.target.value)}
                  className="bg-slate-900 text-xs text-white p-2 rounded-lg border border-slate-800 outline-none"
                />
              </div>
              {config.target === 'card' && (
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-slate-400 font-medium">Body Text</label>
                  <textarea
                    rows={2}
                    value={config.bodyText}
                    onChange={(e) => updateConfig('bodyText', e.target.value)}
                    className="bg-slate-900 text-xs text-white p-2 rounded-lg border border-slate-800 outline-none resize-none"
                  />
                </div>
              )}
            </AccordionSection>

            <AccordionSection
              title="🎭 Avatar & Mascot"
              isOpen={openSection === 'mascot'}
              onToggle={() => toggleSection('mascot')}
            >
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-slate-400 font-medium">Select Emoji Icon</label>
                <div className="flex gap-1.5 flex-wrap">
                  {emojiOptions.map((e) => (
                    <button
                      key={e}
                      onClick={() => updateConfig('emoji', e)}
                      className={`w-7 h-7 text-xs rounded-lg border ${
                        config.emoji === e ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-[11px] text-slate-400 font-medium">Mascot Character</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {MASCOT_CHARACTERS.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => updateConfig('character', char.id)}
                      className={`p-1.5 text-xs rounded-lg border flex items-center gap-1.5 ${
                        config.character === char.id ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span>{char.avatar}</span>
                      <span className="truncate">{char.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </AccordionSection>
          </>
        )}
      </div>
    </aside>
  );
}