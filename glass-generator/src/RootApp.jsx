import { GOOGLE_FONTS, SHAPE_PRESETS, PRESETS, hexToRgba, getClipPathValue, getCanvasBackground} from './appConfig';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ComponentPreview from './components/ComponentPreview';
import GenCod from './components/gencod'; 
import MonetizationModal from './components/MonetizationModal'; // <-- Added import

export default function RootApp() {
  const [config, setConfig] = useState(PRESETS.frostedCard);
  const [currentView, setCurrentView] = useState('studio');
  const [isPro, setIsPro] = useState(false);
  const [showProModal, setShowProModal] = useState(false); // <-- Added modal state

  const [zoom, setZoom] = useState(100);
  const [bgType, setBgType] = useState('gradient');
  const [bgImage, setBgImage] = useState(null);
  const [openSection, setOpenSection] = useState('shapes');

  const EMOJI_OPTIONS = ['⚡', '💎', '🚀', '🔮', '🔥', '✨', '💻', '🎨'];

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

  const updateConfig = (key, value) => {
    setConfig((prev) => ({
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

  const computedGlassStyles = {
    width: `min(${config.width}px, 100%)`,
    maxWidth: '100%',
    boxSizing: 'border-box',
    height: config.target === 'card' ? `${config.height}px` : 'auto',
    background: hexToRgba(config.tintColor, config.opacity),
    backdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%) brightness(${config.brightness}%)`,
    WebkitBackdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%) brightness(${config.brightness}%)`,
    borderRadius: `${config.borderRadius}px`,
    border: `${config.borderWidth}px solid ${hexToRgba(config.borderColor, config.borderOpacity)}`,
    boxShadow: `${config.shadowX}px ${config.shadowY}px ${config.shadowBlur}px rgba(0, 0, 0, ${config.shadowOpacity})`,
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
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                currentView === 'studio' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎨 Studio Workspace
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
              onClick={() => setShowProModal(true)} // <-- Triggers monetization modal
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs px-4 py-2 rounded-lg font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
            >
              Upgrade to PRO
            </button>
          )}
        </div>
      </header>

      {/* WORKSPACE */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        <Sidebar
          config={config}
          updateConfig={updateConfig}
          currentView={currentView}
          openSection={openSection}
          toggleSection={toggleSection}
          emojiOptions={EMOJI_OPTIONS}
        />

        <main className="flex-1 flex flex-col justify-between relative bg-slate-950 overflow-hidden">
          <div className="p-4 flex justify-between items-center z-10">
            <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                 onClick={() => {
                 setBgType('gradient');
                 if (typeof toggleSection === 'function') toggleSection('gradient');
                }}
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
              <div className="h-3 w-px bg-slate-800 mr-1" />
              <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="text-slate-400 hover:text-white text-xs font-bold">-</button>
              <span className="text-xs text-slate-300 font-mono">{zoom}%</span>
              <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="text-slate-400 hover:text-white text-xs font-bold">+</button>
            </div>
          </div>

          <div
            className="flex-1 flex items-center justify-center p-8 transition-all duration-200 relative overflow-hidden"
            style={getCanvasBackground(bgType, bgImage, config)}
          >
            <div style={{ transform: `scale(${zoom / 100})`, perspective: '1200px' }}>
              <ComponentPreview config={config} styles={computedGlassStyles} />
            </div>
          </div>
        </main>

        <GenCod config={config} />
      </div>

      {/* MONETIZATION MODAL COMPONENT */}
      <MonetizationModal 
        isOpen={showProModal} 
        onClose={() => setShowProModal(false)} 
      />
    </div>
  );
}