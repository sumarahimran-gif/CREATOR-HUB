import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { PressFeedbackButton } from './PressFeedbackButton';

// =========================================================================
// PRIMARY CTA ("Request Access")
// - Fully rounded pill (rounded-full), height 52px (56px mobile), padding 0 28px
// - Font: Syne (font-editorial), 14px, weight 600, tracking 0.04em, normal case
// - Fill: paper #F6F4FB with soft tint to #E9E3FA. Text: ink #08080C.
// - 32px circular chip in lavender #B8A4F4 with ink arrow
// - Diffuse lavender glow shadow on hover
// - Press scale 0.94 with spring return, focus-visible 2px ring with 3px offset
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
  // Clean label without old "→" character
  const cleanLabel = label.replace(/[→\->]/g, '').trim();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    soundFx.playAction();
    onClick?.();
  };

  return (
    <PressFeedbackButton
      size="lg"
      tone={inverted ? 'dark' : 'light'}
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-full h-[56px] sm:h-[52px] pl-6 sm:pl-7 pr-2.5 sm:pr-3 inline-flex items-center justify-between sm:justify-center gap-3.5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-lav focus-visible:ring-offset-[3px] cursor-pointer ${
        inverted
          ? 'bg-ink text-paper shadow-[0_10px_35px_-10px_rgba(8,8,12,0.45)] focus-visible:ring-offset-paper'
          : 'bg-gradient-to-b from-[#F6F4FB] to-[#E9E3FA] text-[#08080C] shadow-[0_10px_40px_-10px_rgba(184,164,244,0.55)] focus-visible:ring-offset-ink'
      } ${className}`}
    >
      {/* Label in display font (normal case, 14px, weight 600, tracking 0.04em) */}
      <span className="relative z-10 font-editorial text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap select-none">
        {cleanLabel}
      </span>

      {/* 32px circular chip inside right end with ink arrow icon */}
      <div
        className="relative z-10 w-[32px] h-[32px] rounded-full bg-[#B8A4F4] text-[#08080C] flex items-center justify-center shrink-0"
      >
        <ArrowUpRight className="w-4 h-4 text-[#08080C]" strokeWidth={2.4} />
      </div>
    </PressFeedbackButton>
  );
};

// =========================================================================
// SECONDARY CTA ("Ask a Question" / "Contact Us")
// - Pill, same height (52px / 56px mobile), transparent bg with 1px border at 18% white
// - Backdrop blur, text in paper at 90% (contrast > 4.5:1)
// - Hover: border turns lavender with a subtle glow, arrow fades in on right
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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    soundFx.playTick();
    onClick?.();
  };

  // Clean label without old "→" character
  const cleanLabel = label.replace(/[→\->]/g, '').trim();

  return (
    <PressFeedbackButton
      size="lg"
      tone={inverted ? 'light' : 'dark'}
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-full h-[56px] sm:h-[52px] px-7 sm:px-8 inline-flex items-center justify-center gap-2.5 backdrop-blur-md transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-lav focus-visible:ring-offset-[3px] ${
        disabled ? 'opacity-70 cursor-default' : 'cursor-pointer'
      } ${
        inverted
          ? 'border border-ink/[0.18] text-ink/90 hover:border-[#8B6FE8] focus-visible:ring-offset-paper'
          : 'border border-white/[0.18] text-paper/90 hover:border-lav focus-visible:ring-offset-ink'
      } ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}

      <span className="font-editorial text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap select-none">
        {cleanLabel}
      </span>

      {/* Small arrow fades in on the right on hover */}
      {!disabled && (
        <span
          className={`absolute right-7 sm:right-8 shrink-0 transition-opacity duration-300 ${
            inverted ? 'text-[#8B6FE8]' : 'text-lav'
          } opacity-0 group-hover:opacity-100`}
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.2} />
        </span>
      )}
    </PressFeedbackButton>
  );
};
