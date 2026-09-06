import React, { useState } from 'react';
import { PRESETS } from './appConfig'; // Make sure paths match your project structure

export default function RootApp() {
  const [config, setConfig] = useState(PRESETS.frostedCard);
  const [currentView, setCurrentView] = useState('studio');
  const [activeTab, setActiveTab] = useState('css');
  const [isPro, setIsPro] = useState(false);

  const [zoom, setZoom] = useState(100);
  const [bgType, setBgType] = useState('gradient');
  const [bgImage, setBgImage] = useState(null);
  const [openSection, setOpenSection] = useState('shapes');

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

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Your UI controls, buttons, and canvas go here */}
      <button 
        onClick={() => setBgType('gradient')}
        className={`px-4 py-2 rounded ${bgType === 'gradient' ? 'bg-indigo-600' : 'bg-slate-800'}`}
      >
        Gradient Background
      </button>
    </div>
  );
}