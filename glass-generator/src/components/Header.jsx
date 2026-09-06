{isPro ? (
  <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs px-3 py-1 rounded-full font-bold">
    PRO UNLOCKED ⭐
  </span>
) : (
  <button
    onClick={() => setIsPro(true)}
    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs px-4 py-2 rounded-lg font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
  >
    Upgrade to PRO
  </button>
)}

{/* WORKSPACE */}
<div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">

  {/* LEFT PANEL */}
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
            value={config.shape}
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
            value={config.borderRadius}
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