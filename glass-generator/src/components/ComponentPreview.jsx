import React from 'react';
import { ANIMATION_CLASSES, MASCOT_CHARACTERS } from '../appConfig';
 

export default function ComponentPreview({ config, styles }) {
  const animationClass = ANIMATION_CLASSES[config.animation] || '';

  // Check if the current animation is glow to inject a custom style rule for better visibility
  const isGlow = config.animation === 'glow';

  // Resolve mascot avatar from character ID, or fall back to emoji
  const selectedMascot = MASCOT_CHARACTERS.find((m) => m.id === config.character);
  const displayIcon = selectedMascot ? selectedMascot.avatar : config.emoji;

 const renderContent = () => {
    // Determine dynamic padding safe-zones based on shape constraints
    let shapePaddingClass = "p-6";
    if (config.shape === 'triangle') {
      shapePaddingClass = "pt-20 px-8 pb-6"; // Pushes content below the narrow top vertex of a triangle
    } else if (config.shape === 'diamond' || config.shape === 'chevron') {
      shapePaddingClass = "py-12 px-10"; // Keeps content away from sharp side/top points
    }

    if (config.target === 'input') {
      return (
        <div className="flex items-center w-full h-full px-4">
          <span className="opacity-60 truncate">{config.titleText || 'Glass Form Input...'}</span>
        </div>
      );
    }

    return (
      <div className={`flex flex-col justify-center h-full ${shapePaddingClass} text-center overflow-hidden`}>
        {displayIcon && <div className="text-3xl mb-2">{displayIcon}</div>}
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

