import React from 'react';

const MeshGradientBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="gradient1" cx="20%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#300050" />
            <stop offset="100%" stopColor="#1E0033" />
          </radialGradient>
          <radialGradient id="gradient2" cx="80%" cy="80%" r="80%">
            <stop offset="0%" stopColor="#3B0062" />
            <stop offset="100%" stopColor="#1E0033" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gradient3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4A007D" />
            <stop offset="100%" stopColor="#300050" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="#1E0033" />
        <rect width="100%" height="100%" fill="url(#gradient1)" />
        <rect width="100%" height="100%" fill="url(#gradient2)" opacity="0.7" />
        <rect width="100%" height="100%" fill="url(#gradient3)" opacity="0.6" />
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feComposite operator="in" in2="SourceGraphic" result="noisy"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03"/>
      </svg>
    </div>
  );
};

export default MeshGradientBackground;