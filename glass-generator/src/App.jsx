import React, { useState, useEffect } from 'react';
import { 
  PRESETS, 
  GOOGLE_FONTS, 
  SHAPE_PRESETS, 
  ANIMATION_CLASSES, 
  MASCOT_CHARACTERS,
  hexToRgba,
  getClipPathValue,
  getCanvasBackground,
  generateCode
} from './appConfig.jsx';

// ======================================================================
// MAIN COMPONENT: ROOT APP
// ======================================================================

export default function RootApp() {
  const [config, setConfig] = useState(PRESETS.frostedCard);
  const [currentView, setCurrentView] = useState('studio');
  const [activeTab, setActiveTab] = useState('css');
  const [isPro, setIsPro] = useState(false);

  const [zoom, setZoom] = useState(100);
  const [bgType, setBgType] = useState('gradient');
  const [bgImage, setBgImage] = useState(null);
  const [openSection, setOpenSection] = useState('shapes');

  // [ANIMATIONS & FONTS INJECTION EFFECT]
  useEffect(() => {
    const link = document.createElement('link');

    link.rel = 'stylesheet';

    link.href =
      `https://fonts.googleapis.com/css2?family=${GOOGLE_FONTS
        .map((font) =>
          encodeURIComponent(font).replace(/%20/g, '+')
        )
        .join('&family=')}&display=swap`;

    document.head.appendChild(link);

    const style = document.createElement('style');

    style.textContent = `
      @keyframes shimmer {
        100% {
          transform: translateX(100%);
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      link.remove();
      style.remove();
    };
  }, []);

  // [EVENT HANDLERS & STATE UPDATERS]
  const updateConfig = (key, value) => {
   setAppConfig((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (uploadEvent) => {
        setBgImage(uploadEvent.target.result);
        setBgType('image');
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRandomize = () => {
    const randomColor =
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');

    const randomShape =
      SHAPE_PRESETS[
        Math.floor(Math.random() * SHAPE_PRESETS.length)
      ].id;

    setAppConfig((prev) => ({
      ...prev,
      blur: Math.floor(Math.random() * 30) + 5,
      opacity: Number((Math.random() * 0.4 + 0.1).toFixed(2)),
      borderRadius:
        randomShape === 'none'
          ? Math.floor(Math.random() * 40)
          : 0,
      tintColor: randomColor,
      shape: randomShape,
      rotateX: Math.floor(Math.random() * 30) - 15,
      rotateY: Math.floor(Math.random() * 30) - 15
    }));
  };

  // [COMPUTED STYLES]
  const computedGlassStyles = {
    width: `min(${config.width}px, 100%)`,
    maxWidth: '100%',
    boxSizing: 'border-box',

    height:
      config.target === 'card'
        ? `${config.height}px`
        : 'auto',

    background: hexToRgba(
      config.tintColor,
      config.opacity
    ),

    backdropFilter:
      `blur(${config.blur}px) ` +
      `saturate(${config.saturation}%) ` +
      `brightness(${config.brightness}%)`,

    WebkitBackdropFilter:
      `blur(${config.blur}px) ` +
      `saturate(${config.saturation}%) ` +
      `brightness(${config.brightness}%)`,

    borderRadius: `${config.borderRadius}px`,

    border:
      `${config.borderWidth}px solid ` +
      hexToRgba(
        config.borderColor,
        config.borderOpacity
      ),

    boxShadow:
      `${config.shadowX}px ` +
      `${config.shadowY}px ` +
      `${config.shadowBlur}px ` +
      `rgba(0, 0, 0, ${config.shadowOpacity})`,

    clipPath: getClipPathValue(config.shape),

    transform:
      `perspective(${config.perspective}px) ` +
      `rotateX(${config.rotateX}deg) ` +
      `rotateY(${config.rotateY}deg) ` +
      `translateZ(${config.translateZ}px)`,

    transformStyle: 'preserve-3d',

    fontFamily:
      `'${config.fontFamily}', sans-serif`,

    fontSize: `${config.fontSize}px`,
    fontWeight: config.fontWeight
  };

  return (
    <div className="flex min-h-screen h-dvh flex-col bg-slate-950 text-slate-100 font-sans overflow-hidden">

      {/* HEADER */}
      <header className="min-h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 z-20">

        <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-6">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              ⚡
            </div>

            <span className="font-bold tracking-tight text-lg bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              GlassForge AI
            </span>
          </div>

          <div className="flex max-w-full gap-1 overflow-x-auto bg-slate-950 p-1 rounded-lg border border-slate-800">

            <button
              onClick={() => setCurrentView('studio')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                currentView === 'studio'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🎨 Studio Workspace
            </button>

            <button
              onClick={() => setCurrentView('customization')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                currentView === 'customization'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚙️ Full Customization
            </button>

          </div>
        </div>

        <div className="flex min-w-0 flex-wrap items-center justify-end gap-2 sm:gap-4">

          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">

            <span className="text-xs text-slate-400 font-medium">
              Preset:
            </span>

            <select
              onChange={(e) =>
                setConfig(PRESETS[e.target.value])
              }
              className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer"
            >
              <option
                value="frostedCard"
                className="bg-slate-900"
              >
                Frosted Glass Card
              </option>

              <option
                value="cyberButton"
                className="bg-slate-900"
              >
                Cyberpunk Gear Button
              </option>

              <option
                value="synthwaveBadge"
                className="bg-slate-900"
              >
                Synthwave Diamond Card
              </option>

              <option
                value="emeraldHUD"
                className="bg-slate-900"
              >
                Matrix HUD Panel
              </option>

              <option
                value="minimalInput"
                className="bg-slate-900"
              >
                Glass Input Field
              </option>
            </select>
          </div>

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
        </div>
      </header>

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
                    onClick={() =>
                      updateConfig('target', t)
                    }
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
              onToggle={() =>
                toggleSection('shapes')
              }
            >
              <div className="flex flex-col gap-1.5">

                <label className="text-[11px] text-slate-400 font-medium">
                  Geometric Polygon Shape
                </label>

                <select
                  value={config.shape}
                  onChange={(e) =>
                    updateConfig(
                      'shape',
                      e.target.value
                    )
                  }
                  className="w-full min-w-0 bg-slate-900 text-xs text-white p-2 rounded-lg border border-slate-800 outline-none cursor-pointer"
                >
                  {SHAPE_PRESETS.map((s) => (
                    <option
                      key={s.id}
                      value={s.id}
                    >
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
                  onChange={(v) =>
                    updateConfig(
                      'borderRadius',
                      v
                    )
                  }
                />
              )}
            </AccordionSection>

            <AccordionSection
              title="🧊 3D Layers & Perspective"
              isOpen={openSection === '3d'}
              onToggle={() =>
                toggleSection('3d')
              }
            >
              <SliderInput
                label="Perspective Distance"
                value={config.perspective}
                min={200}
                max={2000}
                unit="px"
                onChange={(v) =>
                  updateConfig(
                    'perspective',
                    v
                  )
                }
              />

              <SliderInput
                label="3D Rotate X"
                value={config.rotateX}
                min={-45}
                max={45}
                unit="°"
                onChange={(v) =>
                  updateConfig(
                    'rotateX',
                    v
                  )
                }
              />

              <SliderInput
                label="3D Rotate Y"
                value={config.rotateY}
                min={-45}
                max={45}
                unit="°"
                onChange={(v) =>
                  updateConfig(
                    'rotateY',
                    v
                  )
                }
              />

              <SliderInput
                label="Layer Translate Z"
                value={config.translateZ}
                min={0}
                max={100}
                unit="px"
                onChange={(v) =>
                  updateConfig(
                    'translateZ',
                    v
                  )
                }
              />
            </AccordionSection>

            <AccordionSection
              title="🎬 Motion & Animations"
              isOpen={openSection === 'animations'}
              onToggle={() =>
                toggleSection('animations')
              }
            >
              <div className="grid grid-cols-2 gap-1.5">

                {Object.keys(ANIMATION_CLASSES).map(
                  (anim) => (
                    <button
                      key={anim}
                      onClick={() =>
                        updateConfig(
                          'animation',
                          anim
                        )
                      }
                      className={`p-2 text-xs font-semibold rounded-lg border capitalize transition-all ${
                        config.animation === anim
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {anim}
                    </button>
                  )
                )}

              </div>
            </AccordionSection>

            <AccordionSection
              title="📐 Dimensions & Borders"
              isOpen={openSection === 'geometry'}
              onToggle={() =>
                toggleSection('geometry')
              }
            >
              <SliderInput
                label="Width"
                value={config.width}
                min={120}
                max={600}
                unit="px"
                onChange={(v) =>
                  updateConfig(
                    'width',
                    v
                  )
                }
              />

              {config.target === 'card' && (
                <SliderInput
                  label="Height"
                  value={config.height}
                  min={100}
                  max={500}
                  unit="px"
                  onChange={(v) =>
                    updateConfig(
                      'height',
                      v
                    )
                  }
                />
              )}

              <SliderInput
                label="Border Width"
                value={config.borderWidth}
                min={0}
                max={10}
                unit="px"
                onChange={(v) =>
                  updateConfig(
                    'borderWidth',
                    v
                  )
                }
              />
            </AccordionSection>

            <AccordionSection
              title="✨ Visual Effects"
              isOpen={openSection === 'effects'}
              onToggle={() =>
                toggleSection('effects')
              }
            >
              <SliderInput
                label="Backdrop Blur"
                value={config.blur}
                min={0}
                max={40}
                unit="px"
                onChange={(v) =>
                  updateConfig(
                    'blur',
                    v
                  )
                }
              />

              <SliderInput
                label="Glass Opacity"
                value={Math.round(
                  config.opacity * 100
                )}
                min={0}
                max={100}
                unit="%"
                onChange={(v) =>
                  updateConfig(
                    'opacity',
                    v / 100
                  )
                }
              />

              <ColorPickerInput
                label="Tint Color"
                value={config.tintColor}
                onChange={(v) =>
                  updateConfig(
                    'tintColor',
                    v
                  )
                }
              />

              <ColorPickerInput
                label="Border Color"
                value={config.borderColor}
                onChange={(v) =>
                  updateConfig(
                    'borderColor',
                    v
                  )
                }
              />
            </AccordionSection>

            <AccordionSection
              title="🌑 Shadows & Elevation"
              isOpen={openSection === 'shadows'}
              onToggle={() =>
                toggleSection('shadows')
              }
            >
              <SliderInput
                label="Shadow X Offset"
                value={config.shadowX}
                min={-30}
                max={30}
                unit="px"
                onChange={(v) =>
                  updateConfig(
                    'shadowX',
                    v
                  )
                }
              />

              <SliderInput
                label="Shadow Y Offset"
                value={config.shadowY}
                min={-30}
                max={30}
                unit="px"
                onChange={(v) =>
                  updateConfig(
                    'shadowY',
                    v
                  )
                }
              />

              <SliderInput
                label="Shadow Blur Radius"
                value={config.shadowBlur}
                min={0}
                max={60}
                unit="px"
                onChange={(v) =>
                  updateConfig(
                    'shadowBlur',
                    v
                  )
                }
              />

              <SliderInput
                label="Shadow Opacity"
                value={Math.round(
                  config.shadowOpacity * 100
                )}
                min={0}
                max={100}
                unit="%"
                onChange={(v) =>
                  updateConfig(
                    'shadowOpacity',
                    v / 100
                  )
                }
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
                      {EMOJI_OPTIONS.map((e) => (
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

        {/* ---------------------------------------------------------------- */}
        {/* CENTER PANEL: CANVAS AREA & VISUALIZATION                        */}
        {/* ---------------------------------------------------------------- */}
        <main className="flex-1 flex flex-col justify-between relative bg-slate-950 overflow-hidden">
          {/* CANVAS CONTROLS BAR */}
          <div className="p-4 flex justify-between items-center z-10">
            <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setBgType('gradient')}
                className={`px-3 py-1 text-xs rounded font-medium ${bgType === 'gradient' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Gradient
              </button>
              <button
                onClick={() => setBgType('grid')}
                className={`px-3 py-1 text-xs rounded font-medium ${bgType === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Dark Grid
              </button>
              <label className={`px-3 py-1 text-xs rounded font-medium cursor-pointer ${bgType === 'image' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
                Photo Upload 📁
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <button onClick={handleRandomize} className="text-xs text-amber-400 hover:text-amber-300 font-medium mr-2">
                🎲 Shuffle Style
              </button>
              <div className="h-3 w-px bg-slate-800 mr-1" />
              <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="text-slate-400 hover:text-white text-xs font-bold">-</button>
              <span className="text-xs text-slate-300 font-mono">{zoom}%</span>
              <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="text-slate-400 hover:text-white text-xs font-bold">+</button>
            </div>
          </div>

          {/* CANVAS DISPLAY AREA */}
          <div
            className="flex-1 flex items-center justify-center p-8 transition-all duration-200 relative overflow-hidden"
            style={getCanvasBackground(bgType, bgImage)}
          >
            <div style={{ transform: `scale(${zoom / 100})`, perspective: '1200px' }}>
              <ComponentPreview config={config} styles={computedGlassStyles} />
            </div>
          </div>
        </main>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT PANEL: EXPORT CODE & CODE PREVIEW                         */}
        {/* ---------------------------------------------------------------- */}
        <aside className="w-96 border-l border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <span>⚡</span> Multi-Framework Code
            </h2>

            <div className="flex gap-1 mb-4 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {['css', 'tailwind', 'react', 'flutter'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 rounded text-xs uppercase font-bold transition-colors ${
                    activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl text-xs text-indigo-300 font-mono overflow-x-auto border border-slate-800 h-80 leading-relaxed">
              {generateCode(activeTab, config)}
            </pre>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

function AccordionSection({ title, isOpen, onToggle, children }) {
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

function SliderInput({ label, value, min, max, unit, onChange }) {
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

function ColorPickerInput({ label, value, onChange }) {
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

function ComponentPreview({ config, styles }) {
  const animClass = ANIMATION_CLASSES[config.animation] || '';
  const mascot = MASCOT_CHARACTERS.find((m) => m.id === config.character) || MASCOT_CHARACTERS[0];

  const reflectionOverlay = config.showReflection ? (
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-[inherit]" />
  ) : null;

  if (config.target === 'button') {
    return (
      <button
        style={styles}
        className={`relative px-8 py-3 font-semibold text-white cursor-pointer active:scale-95 transition-all ${animClass}`}
      >
        {reflectionOverlay}
        <span className="mr-2">{config.emoji}</span>
        {config.titleText || 'Glass Button'}
      </button>
    );
  }

  if (config.target === 'input') {
    return (
      <div className="relative inline-block" style={{ transformStyle: 'preserve-3d' }}>
        {reflectionOverlay}
        <input
          type="text"
          placeholder={config.titleText || 'Glass Form Input...'}
          style={styles}
          className={`px-4 py-3 text-white placeholder-white/50 outline-none text-sm ${animClass}`}
        />
      </div>
    );
  }

  return (
    <div
      style={styles}
      className={`relative p-6 flex flex-col justify-between text-white transition-all ${animClass}`}
    >
      {reflectionOverlay}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg shadow-inner">
          {mascot.avatar}
        </div>
        <div>
          <h3 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
            {config.titleText || 'Glassmorphic Component'}
            <span>{config.emoji}</span>
          </h3>
          <p className="text-xs text-white/60">{mascot.name}</p>
        </div>
      </div>
      <p className="text-xs text-white/80 leading-relaxed overflow-hidden">
        {config.bodyText || 'Custom card description text goes here.'}
      </p>
    </div>
  );
}