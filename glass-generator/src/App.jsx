import { useState, useEffect } from 'react';
import { 
  PRESETS, 
  GOOGLE_FONTS, 
  ANIMATION_CLASSES, 
  MASCOT_CHARACTERS,
  hexToRgba,
  getClipPathValue,
  getCanvasBackground,
} from './appConfig.jsx';

// ======================================================================
// MAIN COMPONENT: ROOT APP
// ======================================================================

export default function RootApp() {
  const [config, setConfig] = useState(PRESETS.frostedCard);
  const [currentView, setCurrentView] = useState('studio');
  const [isPro, setIsPro] = useState(false);

  const [zoom, setZoom] = useState(100);
  const [bgType, setBgType] = useState('gradient');
  const [bgImage, setBgImage] = useState(null);
  const [openSection, setOpenSection] = useState('gradient');

  // Gradient background configuration
  const [gradientConfig, setGradientConfig] = useState({
    type: 'linear',
    angle: 90,
    position: 'center',
    colors: [
      { color: '#4f46e5', stop: 0 },
      { color: '#7c3aed', stop: 50 },
      { color: '#ec4899', stop: 100 }
    ]
  });

  // [ANIMATIONS & FONTS INJECTION EFFECT]
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${GOOGLE_FONTS
      .map((font) => encodeURIComponent(font).replace(/%20/g, '+'))
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
    setConfig((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // ---------------------------------------------------------------
  // GRADIENT CONTROLS
  // ---------------------------------------------------------------
  const updateGradient = (key, value) => {
    setGradientConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateGradientStop = (index, key, value) => {
    setGradientConfig(prev => ({
      ...prev,
      colors: prev.colors.map((stop, stopIndex) =>
        stopIndex === index
          ? {
              ...stop,
              [key]: key === 'stop' ? Math.min(100, Math.max(0, Number(value))) : value
            }
          : stop
      )
    }));
  };

  const addGradientStop = () => {
    setGradientConfig(prev => {
      const colors = prev.colors;
      if (colors.length >= 12) return prev;
      const lastStop = colors[colors.length - 1];
      const newStop = {
        color: '#ffffff',
        stop: Math.min(100, Number(lastStop?.stop ?? 100))
      };
      return {
        ...prev,
        colors: [...colors, newStop]
      };
    });
  };

  const removeGradientStop = index => {
    setGradientConfig(prev => {
      if (prev.colors.length <= 2) return prev;
      return {
        ...prev,
        colors: prev.colors.filter((_, stopIndex) => stopIndex !== index)
      };
    });
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

  // [COMPUTED STYLES]
  const computedGlassStyles = {
    width: `min(${config.width}px, 100%)`,
    maxWidth: '100%',
    boxSizing: 'border-box',
    height: config.target === 'card' ? `${config.height}px` : 'auto',
    background: hexToRgba(config.tintColor, config.opacity),
    backdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%) brightness(${config.brightness}%)`,
    WebkitBackdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%) brightness(${config.brightness}%)`,
    borderRadius: `${config.borderRadius}px`,
    border: `${config.borderWidth}px solid ` + hexToRgba(config.borderColor, config.borderOpacity),
    boxShadow: `${config.shadowX}px ${config.shadowY}px ${config.shadowBlur}px rgba(0, 0, 0, ${config.shadowOpacity})` +
      (config.animation === 'glow' ? `, 0 0 35px 5px rgba(168, 85, 247, 0.6)` : ''),
    clipPath: getClipPathValue(config.shape),
    transform: `perspective(${config.perspective}px) rotateX(${config.rotateX}deg) rotateY(${config.rotateY}deg) translateZ(${config.translateZ}px)`,
    transformStyle: 'preserve-3d',
    fontFamily: `'${config.fontFamily}', sans-serif`,
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
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                currentView === 'studio' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎨 Studio Workspace
            </button>
            <button
              onClick={() => setCurrentView('customization')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                currentView === 'customization' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚙️ Full Customization
            </button>
          </div>
        </div>

        <div className="flex min-w-0 flex-wrap items-center justify-end gap-2 sm:gap-4">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <span className="text-xs text-slate-400 font-medium">Preset:</span>
            <select
              onChange={(e) => setConfig(PRESETS[e.target.value])}
              className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer"
            >
              <option value="frostedCard" className="bg-slate-900">Frosted Glass Card</option>
              <option value="cyberButton" className="bg-slate-900">Cyberpunk Gear Button</option>
              <option value="synthwaveBadge" className="bg-slate-900">Synthwave Diamond Card</option>
              <option value="emeraldHUD" className="bg-slate-900">Matrix HUD Panel</option>
              <option value="minimalInput" className="bg-slate-900">Glass Input Field</option>
            </select>
          </div>

          {isPro ? (
            <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs px-3 py-1 rounded-full font-bold">
              PRO UNLOCKED ⭐
            </span>
          ) : (
            <button
              onClick={() => setIsPro(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs px-4 py-2 rounded-lg font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer"
            >
              Upgrade to PRO
            </button>
          )}
        </div>
      </header>

      {/* WORKSPACE BODY (SIDEBAR + CANVAS) */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
        
        {/* SIDEBAR PANEL WITH GRADIENT CONTROLS */}
        <aside className="w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/50 flex flex-col justify-between overflow-y-auto p-4 gap-4">
          <div className="border border-slate-800 rounded-xl bg-slate-950/40 overflow-hidden">
            <button
              onClick={() => toggleSection('gradient')}
              className="w-full px-3.5 py-2.5 text-xs font-bold text-slate-300 flex justify-between items-center hover:bg-slate-800/40 transition-colors cursor-pointer"
            >
              <span>🌈 Canvas Gradient Controls</span>
              <span className="text-slate-500 text-[10px]">{openSection === 'gradient' ? '▲' : '▼'}</span>
            </button>

            {openSection === 'gradient' && (
              <div className="p-3.5 pt-1 border-t border-slate-800/60 flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-slate-400 font-medium">Type</label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    {['linear', 'radial', 'conic'].map((type) => (
                      <button
                        key={type}
                        onClick={() => updateGradient('type', type)}
                        className={`py-1 text-xs capitalize font-semibold rounded cursor-pointer transition-colors ${
                          gradientConfig.type === type ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {gradientConfig.type === 'linear' && (
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">Angle</span>
                      <span className="text-slate-300 font-mono">{gradientConfig.angle}°</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={gradientConfig.angle}
                      onChange={(e) => updateGradient('angle', Number(e.target.value))}
                      className="accent-indigo-500 h-1 bg-slate-800 rounded cursor-pointer"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/60">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-400 font-medium">Color Stops</span>
                    <button
                      onClick={addGradientStop}
                      className="text-[10px] bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 px-2 py-0.5 rounded hover:bg-indigo-600/50 transition-colors cursor-pointer"
                    >
                      + Add Stop
                    </button>
                  </div>

                  {gradientConfig.colors.map((stop, index) => (
                    <div key={index} className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <input
                        type="color"
                        value={stop.color}
                        onChange={(e) => updateGradientStop(index, 'color', e.target.value)}
                        className="w-6 h-6 bg-transparent rounded cursor-pointer border-0 shrink-0"
                      />
                      <div className="flex-1 flex flex-col gap-0.5">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Stop {index + 1}</span>
                          <span>{stop.stop}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={stop.stop}
                          onChange={(e) => updateGradientStop(index, 'stop', e.target.value)}
                          className="accent-indigo-500 h-1 bg-slate-800 rounded cursor-pointer"
                        />
                      </div>
                      {gradientConfig.colors.length > 2 && (
                        <button
                          onClick={() => removeGradientStop(index)}
                          className="text-slate-500 hover:text-red-400 text-xs px-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* CENTER PANEL: CANVAS AREA & VISUALIZATION */}
        <main className="flex-1 flex flex-col justify-between relative bg-slate-950 overflow-hidden">
          {/* CANVAS CONTROLS BAR */}
          <div className="p-4 flex justify-between items-center z-10">
            <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setBgType('gradient')}
                className={`px-3 py-1 text-xs rounded font-medium cursor-pointer ${bgType === 'gradient' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Gradient
              </button>
              <button
                onClick={() => setBgType('grid')}
                className={`px-3 py-1 text-xs rounded font-medium cursor-pointer ${bgType === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Dark Grid
              </button>
              <label className={`px-3 py-1 text-xs rounded font-medium cursor-pointer ${bgType === 'image' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
                Photo Upload 📁
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              <div className="h-3 w-px bg-slate-800 mr-1" />
              <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer">-</button>
              <span className="text-xs text-slate-300 font-mono">{zoom}%</span>
              <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer">+</button>
            </div>
          </div>

          {/* CANVAS DISPLAY AREA */}
          <div
            className="flex-1 flex items-center justify-center p-8 transition-all duration-200 relative overflow-hidden"
            style={getCanvasBackground(bgType, bgImage, gradientConfig)}
          >
            <div style={{ transform: `scale(${zoom / 100})`, perspective: '1200px' }}>
              <ComponentPreview config={config} styles={computedGlassStyles} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

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