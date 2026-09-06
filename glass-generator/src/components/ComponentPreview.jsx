import React from 'react';
import { ANIMATION_CLASSES } from '../appConfig';

export default function ComponentPreview({ config, styles }) {
  const animationClass = ANIMATION_CLASSES[config.animation] || '';

  // Check if the current animation is glow to inject a custom style rule for better visibility
  const isGlow = config.animation === 'glow';

  const renderContent = () => {
    if (config.target === 'input') {
      return (
        <div className="flex items-center w-full h-full px-4">
          <span className="opacity-60 truncate">{config.titleText || 'Glass Form Input...'}</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-center h-full p-6 text-center overflow-hidden">
        {config.emoji && <div className="text-3xl mb-2">{config.emoji}</div>}
        <h3 className="font-bold tracking-tight truncate">{config.titleText}</h3>
        {config.target === 'card' && config.bodyText && (
          <p className="text-xs opacity-80 mt-1 line-clamp-2">{config.bodyText}</p>
        )}
      </div>
    );
  };

  return (
    <div className="relative flex items-center justify-center p-4">
      <div 
        className={`${animationClass}`}
        style={{
          ...styles,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          // Enhance glow visibility by layering a specialized multi-layer drop shadow if glow is selected
          ...(isGlow ? { boxShadow: `${styles.boxShadow}, 0 0 35px 5px rgba(168, 85, 247, 0.6)` } : {})
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}
