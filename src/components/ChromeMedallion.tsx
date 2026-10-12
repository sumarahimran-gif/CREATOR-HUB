import React, { useState } from 'react';
import logoSrc from '../assets/images/logo-hero-500.webp';

interface ChromeMedallionProps {
  size?: number | string;
  className?: string;
  glow?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export const ChromeMedallion: React.FC<ChromeMedallionProps> = ({
  size = 240,
  className = '',
  interactive = true,
  onClick,
}) => {
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setHoverPos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverPos({ x: 0, y: 0 });
      }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 1. Subtle, disciplined ambient backlight with lavender aura */}
      <div
        className="absolute -inset-6 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.45 : 0.22,
          background: 'radial-gradient(circle, rgba(184, 164, 244, 0.45) 0%, rgba(139, 111, 232, 0.18) 40%, transparent 70%)',
        }}
      />

      {/* 2. Outer Chrome Bevel Border Ring with Controlled 3D Specular Response */}
      <div
        className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-ink-3 via-paper-dim to-ink-2 shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden transition-transform duration-300 ease-out z-10"
        style={{
          transform: interactive && isHovered
            ? `perspective(800px) rotateX(${-hoverPos.y * 10}deg) rotateY(${hoverPos.x * 10}deg) scale3d(1.02, 1.02, 1.02)`
            : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        }}
      >
        {/* Crisp High-Res Logo Imagery */}
        <img
          src={logoSrc}
          alt="Creator Hub Medallion"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full select-none pointer-events-none"
        />

        {/* Quiet Surface Glass Glare tracking cursor without color flood */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.28 : 0.08,
            background: `radial-gradient(circle at ${50 + hoverPos.x * 35}% ${
              50 + hoverPos.y * 35
            }%, rgba(246, 244, 251, 0.8) 0%, rgba(246, 244, 251, 0) 60%)`,
          }}
        />
      </div>
    </div>
  );
};
