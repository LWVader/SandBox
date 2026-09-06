// =================================================================
// FILE: src/components/gencod.jsx
// =================================================================

import React, { useState } from 'react';
import { hexToRgba, getClipPathValue, ANIMATION_CLASSES } from '../appConfig';

const CODE_EXPORTS = {
  css: { filename: 'glass-component.css' },
  tailwind: { filename: 'GlassComponent.jsx' },
  react: { filename: 'GlassCard.jsx' },
  vue: { filename: 'GlassComponent.vue' },
  svelte: { filename: 'GlassComponent.svelte' },
  flutter: { filename: 'glass_component.dart' },
  swiftui: { filename: 'GlassCard.swift' },
  jetpackcompose: { filename: 'GlassCard.kt' },
};

function getExportFilename(type) {
  return CODE_EXPORTS[type]?.filename || 'glass-component.txt';
}

function getCodeHeader(type) {
  const filename = getExportFilename(type);
  const line = '='.repeat(65);

  if (type === 'css') {
    return `/* ${line}
 * FILE: ${filename}
 * ${line} */

`;
  }

  if (type === 'vue' || type === 'svelte') {
    return `<!-- ${line} -->
<!-- FILE: ${filename} -->
<!-- ${line} -->

`;
  }

  return `// ${line}
// FILE: ${filename}
// ${line}

`;
}

export default function GenCod({ config, isPro, onTriggerPaywall }) {
  const [activeTab, setActiveTab] = useState('css');
  const [copied, setCopied] = useState(false);

  const codeOutput = generateCode(activeTab, config);

  const handleCopy = () => {
    if (
      !isPro &&
      [
        'react',
        'tailwind',
        'swiftui',
        'vue',
        'svelte',
        'flutter',
        'jetpackcompose',
      ].includes(activeTab)
    ) {
      onTriggerPaywall();
      return;
    }

    navigator.clipboard.writeText(codeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-full lg:w-96 border-l border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between shrink-0">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold flex items-center gap-2">
            <span>⚡</span> Multi-Framework Code
          </h2>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-sm flex items-center gap-1"
          >
            {!isPro &&
              [
                'react',
                'tailwind',
                'swiftui',
                'vue',
                'svelte',
                'flutter',
                'jetpackcompose',
              ].includes(activeTab) && <span>🔒</span>}

            {copied ? '✨ Copied!' : '📋 Copy Code'}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1 mb-4 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {[
            'css',
            'tailwind',
            'react',
            'flutter',
            'vue',
            'svelte',
            'swiftui',
            'jetpackcompose',
          ].map((tab) => {
            const isRestricted =
              !isPro &&
              [
                'react',
                'tailwind',
                'swiftui',
                'vue',
                'svelte',
                'flutter',
                'jetpackcompose',
              ].includes(tab);

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-1.5 px-1 rounded text-[10px] uppercase font-bold transition-colors truncate relative ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={tab}
              >
                {isRestricted ? `🔒 ${tab}` : tab}
              </button>
            );
          })}
        </div>

        <div className="relative">
          {!isPro &&
            [
              'tailwind',
              'react',
              'flutter',
              'vue',
              'svelte',
              'swiftui',
              'jetpackcompose',
            ].includes(activeTab) && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-2 rounded-xl border border-indigo-500/30 p-4 text-center">
                <span className="text-xl">💎</span>

                <p className="text-xs font-bold text-white">
                  PRO Framework Export
                </p>

                <p className="text-[11px] text-slate-400">
                  Unlock Mobile & Native code exports with a PRO pass or
                  subscription.
                </p>

                <button
                  onClick={onTriggerPaywall}
                  className="mt-1 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-lg shadow-md"
                >
                  Unlock for $4.99 / $9mo
                </button>
              </div>
            )}

          <pre className="bg-slate-950 p-4 rounded-xl text-xs text-indigo-300 font-mono overflow-x-auto border border-slate-800 h-80 leading-relaxed">
            <code>{codeOutput}</code>
          </pre>
        </div>
      </div>
    </aside>
  );
}

export function generateCode(type, config) {
  const bg = hexToRgba(config.tintColor, config.opacity);
  const border = hexToRgba(config.borderColor, config.borderOpacity);
  const clip = getClipPathValue(config.shape);

  const transform =
    `perspective(${config.perspective}px) ` +
    `rotateX(${config.rotateX}deg) ` +
    `rotateY(${config.rotateY}deg) ` +
    `translateZ(${config.translateZ}px)`;

  switch (type) {
    case 'css':
      return getCodeHeader(type) + `.glass-component {
  width: min(${config.width}px, 100%);
  max-width: 100%;
  box-sizing: border-box;
  background: ${bg};
  backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%);
  -webkit-backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%);
  border-radius: ${config.borderRadius}px;
  border: ${config.borderWidth}px solid ${border};
  box-shadow: ${config.shadowX}px ${config.shadowY}px ${config.shadowBlur}px rgba(0, 0, 0, ${config.shadowOpacity});
  clip-path: ${clip};
  transform: ${transform};
}`;

    case 'tailwind':
      return getCodeHeader(type) + `<div className="w-[min(${config.width}px,100%)] max-w-full box-border bg-[${bg}] backdrop-blur-[${config.blur}px] rounded-[${config.borderRadius}px] border border-[${border}] shadow-[${config.shadowX}px_${config.shadowY}px_${config.shadowBlur}px_rgba(0,0,0,${config.shadowOpacity})] ${ANIMATION_CLASSES[config.animation]}" style={{ clipPath: '${clip}', transform: '${transform}' }}>
  <!-- Content -->
</div>`;

    case 'react':
      return getCodeHeader(type) + `export function GlassCard() {
  return (
    <div style={{
      width: 'min(${config.width}px, 100%)',
      maxWidth: '100%',
      boxSizing: 'border-box',
      background: '${bg}',
      backdropFilter: 'blur(${config.blur}px)',
      borderRadius: '${config.borderRadius}px',
      border: '${config.borderWidth}px solid ${border}',
      boxShadow: '${config.shadowX}px ${config.shadowY}px ${config.shadowBlur}px rgba(0, 0, 0, ${config.shadowOpacity})',
      clipPath: '${clip}',
      transform: '${transform}'
    }} className="${ANIMATION_CLASSES[config.animation]}">
      <h3>${config.titleText}</h3>
    </div>
  );
}`;

    case 'flutter': {
      const alpha = Math.round(config.opacity * 255)
        .toString(16)
        .padStart(2, '0');

      return getCodeHeader(type) + `Transform(
  transform: Matrix4.identity()
    ..setEntry(3, 2, 0.001)
    ..rotateX(${config.rotateX} * 0.0174533)
    ..rotateY(${config.rotateY} * 0.0174533),
  child: ClipPath(
    clipper: CustomGlassClipper('${config.shape}'),
    child: BackdropFilter(
      filter: ImageFilter.blur(
        sigmaX: ${config.blur},
        sigmaY: ${config.blur},
      ),
      child: Container(
        constraints: const BoxConstraints(maxWidth: double.infinity),
        width: double.infinity,
        color: Color(0x${alpha}${config.tintColor.replace('#', '')}),
      ),
    ),
  ),
);`;
    }

    case 'vue':
      return getCodeHeader(type) + `<template>
  <div class="glass-component">
    <h3>${config.titleText}</h3>
  </div>
</template>

<style scoped>
.glass-component {
  width: min(${config.width}px, 100%);
  max-width: 100%;
  box-sizing: border-box;
  background: ${bg};
  backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%);
  -webkit-backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%);
  border-radius: ${config.borderRadius}px;
  border: ${config.borderWidth}px solid ${border};
  box-shadow: ${config.shadowX}px ${config.shadowY}px ${config.shadowBlur}px rgba(0, 0, 0, ${config.shadowOpacity});
  clip-path: ${clip};
  transform: ${transform};
}
</style>`;

    case 'svelte':
      return getCodeHeader(type) + `<div
  class="glass-component"
  style="
    width: min(${config.width}px, 100%);
    background: ${bg};
    backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%);
    border-radius: ${config.borderRadius}px;
    border: ${config.borderWidth}px solid ${border};
    box-shadow: ${config.shadowX}px ${config.shadowY}px ${config.shadowBlur}px rgba(0, 0, 0, ${config.shadowOpacity});
    clip-path: ${clip};
    transform: ${transform};
  "
>
  <h3>${config.titleText}</h3>
</div>

<style>
  .glass-component {
    max-width: 100%;
    box-sizing: border-box;
  }
</style>`;

    case 'swiftui':
      return getCodeHeader(type) + `ZStack {
  RoundedRectangle(cornerRadius: ${config.borderRadius})
    .fill(Color(${config.tintColor}).opacity(${config.opacity}))
    .background(.ultraThinMaterial)
    .overlay(
      RoundedRectangle(cornerRadius: ${config.borderRadius})
        .stroke(
          Color(${config.borderColor}).opacity(${config.borderOpacity}),
          lineWidth: ${config.borderWidth}
        )
    )
    .shadow(
      color: Color.black.opacity(${config.shadowOpacity}),
      radius: ${config.shadowBlur},
      x: ${config.shadowX},
      y: ${config.shadowY}
    )
    .frame(
      width: ${config.width},
      height: ${config.height}
    )
    .rotation3DEffect(
      .degrees(${config.rotateX}),
      axis: (x: 1, y: 0, z: 0)
    )
    .rotation3DEffect(
      .degrees(${config.rotateY}),
      axis: (x: 0, y: 1, z: 0)
    )
}`;

    case 'jetpackcompose': {
      const alphaHex = Math.round(config.opacity * 255)
        .toString(16)
        .padStart(2, '0')
        .toUpperCase();

      const cleanColor = config.tintColor.replace('#', '');

      return getCodeHeader(type) + `Box(
  modifier = Modifier
    .width(${config.width}.dp)
    .height(${config.height}.dp)
    .graphicsLayer(
      rotationX = ${config.rotateX}f,
      rotationY = ${config.rotateY}f,
      cameraDistance = ${config.perspective}f * density
    )
    .shadow(
      elevation = ${config.shadowBlur}.dp,
      shape = RoundedCornerShape(${config.borderRadius}.dp),
      clip = false
    )
    .background(
      color = Color(0x${alphaHex}${cleanColor}),
      shape = RoundedCornerShape(${config.borderRadius}.dp)
    )
    .border(
      width = ${config.borderWidth}.dp,
      color = Color(${config.borderColor}),
      shape = RoundedCornerShape(${config.borderRadius}.dp)
    )
) {
  Text(text = "${config.titleText}")
}`;
    }

    default:
      return '';
  }
}