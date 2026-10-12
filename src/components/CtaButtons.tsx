import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { soundFx } from '../utils/audio';

// =========================================================================
// PRIMARY CTA ("Request Access")
// - Fully rounded pill (rounded-full), height 52px (56px mobile), padding 0 28px
// - Font: Syne (font-editorial), 14px, weight 600, tracking 0.04em, normal case
// - Fill: paper #F6F4FB with soft tint to #E9E3FA. Text: ink #08080C.
// - 32px circular chip in lavender #B8A4F4 with ink arrow, rotates 45° on hover
// - Diffuse lavender glow shadow underneath, 2px lift on hover
// - 20% white light sweep passes across on hover over 0.7s
// - Active scale 0.98, focus-visible 2px ring with 3px offset
// - Inverted on light "paper" sections: ink pill with paper text & lavender chip
// =========================================================================
export interface PrimaryCtaProps {
  onClick?: () => void;
  label?: string;
  inverted?: boolean;
  className?: string;
  disabled?: boolean;
}

export const PrimaryCta: React.FC<PrimaryCtaProps> = ({
  onClick,
  label = 'Request Access',
  inverted = false,
  className = '',
  disabled = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    soundFx.playAction();
    onClick?.();
  };

  // Clean label without old "→" character
  const cleanLabel = label.replace(/[→\->]/g, '').trim();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-full h-[56px] sm:h-[52px] pl-6 sm:pl-7 pr-2.5 sm:pr-3 inline-flex items-center justify-between sm:justify-center gap-3.5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-lav focus-visible:ring-offset-[3px] active:scale-[0.98] cursor-pointer ${
        inverted
          ? 'bg-ink text-paper shadow-[0_10px_35px_-10px_rgba(8,8,12,0.45)] hover:shadow-[0_14px_40px_-8px_rgba(8,8,12,0.6)] focus-visible:ring-offset-paper'
          : 'bg-gradient-to-b from-[#F6F4FB] to-[#E9E3FA] text-[#08080C] shadow-[0_10px_40px_-10px_rgba(184,164,244,0.55)] hover:shadow-[0_14px_45px_-8px_rgba(184,164,244,0.7)] focus-visible:ring-offset-ink'
      } ${!shouldReduceMotion ? 'hover:-translate-y-0.5' : ''} ${className}`}
    >
      {/* 20% white gradient sweep across once on hover */}
      {!shouldReduceMotion && (
        <span className="absolute inset-0 pointer-events-none -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 skew-x-[-20deg]" />
      )}

      {/* Label in display font (normal case, 14px, weight 600, tracking 0.04em) */}
      <span className="font-editorial text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap select-none">
        {cleanLabel}
      </span>

      {/* 32px circular chip inside right end with ink arrow icon */}
      <div
        className={`w-[32px] h-[32px] rounded-full bg-[#B8A4F4] text-[#08080C] flex items-center justify-center shrink-0 transition-transform duration-300 ${
          !shouldReduceMotion ? 'group-hover:rotate-45' : ''
        }`}
      >
        <ArrowUpRight className="w-4 h-4 text-[#08080C]" strokeWidth={2.4} />
      </div>
    </button>
  );
};

// =========================================================================
// SECONDARY CTA ("Ask a Question" / "Contact Us")
// - Pill, same height (52px / 56px mobile), transparent bg with 1px border at 18% white
// - Backdrop blur, text in paper at 90% (contrast > 4.5:1)
// - Hover: border turns lavender, 6% lavender bg tint, small arrow fades in on right
// - Inverted on light "paper" sections: 18% ink border, ink at 90%, #8B6FE8 hover
// =========================================================================
export interface SecondaryCtaProps {
  onClick?: () => void;
  label?: string;
  inverted?: boolean;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const SecondaryCta: React.FC<SecondaryCtaProps> = ({
  onClick,
  label = 'Contact Us',
  inverted = false,
  className = '',
  disabled = false,
  icon,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    soundFx.playTick();
    onClick?.();
  };

  // Clean label without old "→" character
  const cleanLabel = label.replace(/[→\->]/g, '').trim();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-full h-[56px] sm:h-[52px] px-7 sm:px-8 inline-flex items-center justify-center gap-2.5 backdrop-blur-md transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-lav focus-visible:ring-offset-[3px] active:scale-[0.98] ${
        disabled ? 'opacity-70 cursor-default' : 'cursor-pointer'
      } ${
        inverted
          ? 'border border-ink/[0.18] text-ink/90 hover:border-[#8B6FE8] hover:bg-[#8B6FE8]/[0.06] focus-visible:ring-offset-paper'
          : 'border border-white/[0.18] text-paper/90 hover:border-lav hover:bg-lav/[0.06] focus-visible:ring-offset-ink'
      } ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}

      <span className="font-editorial text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap select-none">
        {cleanLabel}
      </span>

      {/* Small arrow fades in on the right on hover */}
      {!disabled && (
        <span
          className={`shrink-0 transition-all duration-300 ${
            inverted ? 'text-[#8B6FE8]' : 'text-lav'
          } ${
            shouldReduceMotion
              ? 'opacity-0 group-hover:opacity-100'
              : 'opacity-0 w-0 -translate-x-1 group-hover:opacity-100 group-hover:w-4 group-hover:translate-x-0'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.2} />
        </span>
      )}
    </button>
  );
};
