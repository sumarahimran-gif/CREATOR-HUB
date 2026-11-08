import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { PressFeedbackButton } from './PressFeedbackButton';

// =========================================================================
// PRIMARY CTA ("Request Access")
// - Fully rounded pill (rounded-full), height 52px (56px mobile), padding 0 28px
// - Font: Space Grotesk (font-editorial), 14px, weight 600, tracking 0.04em, normal case
// - Fill: blue with white text.
// - 32px circular sand chip with an ink arrow
// - Soft neutral shadow and inner highlight
// - Press grows slightly with a spring return, focus-visible 2px ring with 3px offset
// - The same palette is used on light and dark sections.
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
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-full h-[56px] sm:h-[52px] pl-6 sm:pl-7 pr-2.5 sm:pr-3 inline-flex items-center justify-between sm:justify-center gap-3.5 transition-colors duration-300 cursor-pointer bg-lav-deep text-white shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] ${className}`}
    >
      {/* Label in display font (normal case, 14px, weight 600, tracking 0.04em) */}
      <span className="relative z-10 font-editorial text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap select-none">
        {cleanLabel}
      </span>

      {/* 32px circular chip inside right end with ink arrow icon */}
      <div
        className="relative z-10 w-[32px] h-[32px] rounded-full bg-sand text-ink flex items-center justify-center shrink-0"
      >
        <ArrowUpRight className="w-4 h-4 text-ink" strokeWidth={2.4} />
      </div>
    </PressFeedbackButton>
  );
};

// =========================================================================
// SECONDARY CTA ("Ask a Question" / "Contact Us")
// - Pill, same height (52px / 56px mobile), transparent bg with a sand border
// - Backdrop blur, sand text on dark sections and ink text on sand sections
// - Hover: border and arrow turn blue, arrow fades in on right
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
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-full h-[56px] sm:h-[52px] px-7 sm:px-8 inline-flex items-center justify-center gap-2.5 backdrop-blur-md transition-colors duration-300 ${
        disabled ? 'opacity-70 cursor-default' : 'cursor-pointer'
      } ${
        inverted
          ? 'border border-sand-ink/30 text-sand-ink hover:border-blue-ink'
          : 'border border-line-strong text-sand hover:border-lav'
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
            inverted ? 'text-blue-ink' : 'text-lav'
          } opacity-0 group-hover:opacity-100`}
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.2} />
        </span>
      )}
    </PressFeedbackButton>
  );
};
