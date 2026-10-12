import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { soundFx } from '../utils/audio';

interface RequestAccessPillProps {
  onClick: () => void;
  size?: 'desktop' | 'mobile' | 'drawer';
  className?: string;
  isFullWidth?: boolean;
}

export const RequestAccessPill: React.FC<RequestAccessPillProps> = ({
  onClick,
  size = 'desktop',
  className = '',
  isFullWidth = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundFx.playAction();
    onClick();
  };

  if (size === 'drawer') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group relative overflow-hidden w-full h-[54px] rounded-full pl-6 pr-2 bg-gradient-to-b from-[#F6F4FB] to-[#E9E3FA] text-[#08080C] shadow-[0_10px_40px_-10px_rgba(184,164,244,0.55)] hover:shadow-[0_14px_45px_-8px_rgba(184,164,244,0.7)] flex items-center justify-between transition-all duration-300 active:scale-[0.98] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-lav focus-visible:ring-offset-[3px] focus-visible:ring-offset-ink ${
          !shouldReduceMotion ? 'hover:-translate-y-0.5' : ''
        } ${className}`}
      >
        {!shouldReduceMotion && (
          <span className="absolute inset-0 pointer-events-none -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 skew-x-[-20deg]" />
        )}
        <span className="font-editorial text-[15px] sm:text-[16px] font-semibold tracking-[0.04em] whitespace-nowrap text-[#08080C] select-none">
          Request Access
        </span>
        <div className="w-[36px] h-[36px] rounded-full bg-[#B8A4F4] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45 text-[#08080C]">
          <ArrowUpRight className="w-[18px] h-[18px] text-[#08080C]" strokeWidth={2.4} />
        </div>
      </button>
    );
  }

  if (size === 'mobile') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group relative overflow-hidden h-[44px] rounded-full pl-4 sm:pl-5 pr-1.5 bg-gradient-to-b from-[#F6F4FB] to-[#E9E3FA] text-[#08080C] shadow-[0_10px_40px_-10px_rgba(184,164,244,0.55)] hover:shadow-[0_14px_45px_-8px_rgba(184,164,244,0.7)] inline-flex items-center justify-between gap-3 transition-all duration-300 active:scale-[0.98] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-lav focus-visible:ring-offset-[3px] focus-visible:ring-offset-ink ${
          !shouldReduceMotion ? 'hover:-translate-y-0.5' : ''
        } ${isFullWidth ? 'w-full' : ''} ${className}`}
      >
        {!shouldReduceMotion && (
          <span className="absolute inset-0 pointer-events-none -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 skew-x-[-20deg]" />
        )}
        <span className="font-editorial text-[13px] sm:text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap text-[#08080C] select-none">
          Request Access
        </span>
        <div className="w-[32px] h-[32px] rounded-full bg-[#B8A4F4] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45 text-[#08080C]">
          <ArrowUpRight className="w-4 h-4 text-[#08080C]" strokeWidth={2.4} />
        </div>
      </button>
    );
  }

  // Desktop (48px height, 20px left pad, 6px right pad, 32px chip, 20% white sweep)
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group relative overflow-hidden h-[48px] rounded-full pl-5 pr-1.5 bg-gradient-to-b from-[#F6F4FB] to-[#E9E3FA] text-[#08080C] shadow-[0_10px_40px_-10px_rgba(184,164,244,0.55)] hover:shadow-[0_14px_45px_-8px_rgba(184,164,244,0.7)] inline-flex items-center justify-between gap-3 transition-all duration-300 active:scale-[0.98] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-lav focus-visible:ring-offset-[3px] focus-visible:ring-offset-ink ${
        !shouldReduceMotion ? 'hover:-translate-y-0.5' : ''
      } ${isFullWidth ? 'w-full' : ''} ${className}`}
    >
      {!shouldReduceMotion && (
        <span className="absolute inset-0 pointer-events-none -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 skew-x-[-20deg]" />
      )}
      <span className="font-editorial text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap text-[#08080C] select-none">
        Request Access
      </span>
      <div className="w-[32px] h-[32px] rounded-full bg-[#B8A4F4] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45 text-[#08080C]">
        <ArrowUpRight className="w-4 h-4 text-[#08080C]" strokeWidth={2.4} />
      </div>
    </button>
  );
};
