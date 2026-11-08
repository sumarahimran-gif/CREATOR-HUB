import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { PressFeedbackButton } from './PressFeedbackButton';

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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundFx.playAction();
    onClick();
  };

  if (size === 'drawer') {
    return (
      <PressFeedbackButton
        size="lg"
        type="button"
        onClick={handleClick}
        className={`group relative overflow-hidden w-full h-[54px] rounded-full pl-6 pr-2 bg-lav-deep text-white shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] flex items-center justify-between transition-colors duration-300 cursor-pointer outline-none ${className}`}
      >
        <span className="relative z-10 font-editorial text-[15px] sm:text-[16px] font-semibold tracking-[0.04em] whitespace-nowrap text-white select-none">
          Request Access
        </span>
        <div className="relative z-10 w-[36px] h-[36px] rounded-full bg-sand flex items-center justify-center shrink-0 text-ink">
          <ArrowUpRight className="w-[18px] h-[18px] text-ink" strokeWidth={2.4} />
        </div>
      </PressFeedbackButton>
    );
  }

  if (size === 'mobile') {
    return (
      <PressFeedbackButton
        size="lg"
        type="button"
        onClick={handleClick}
        className={`group relative overflow-hidden h-[44px] rounded-full pl-4 sm:pl-5 pr-1.5 bg-lav-deep text-white shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] inline-flex items-center justify-between gap-3 transition-colors duration-300 cursor-pointer outline-none ${
          isFullWidth ? 'w-full' : ''
        } ${className}`}
      >
        <span className="relative z-10 font-editorial text-[13px] sm:text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap text-white select-none">
          Request Access
        </span>
        <div className="relative z-10 w-[32px] h-[32px] rounded-full bg-sand flex items-center justify-center shrink-0 text-ink">
          <ArrowUpRight className="w-4 h-4 text-ink" strokeWidth={2.4} />
        </div>
      </PressFeedbackButton>
    );
  }

  // Desktop (48px height, 20px left pad, 6px right pad, 32px chip)
  return (
    <PressFeedbackButton
      size="lg"
      type="button"
      onClick={handleClick}
      className={`group relative overflow-hidden h-[48px] rounded-full pl-5 pr-1.5 bg-lav-deep text-white shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] inline-flex items-center justify-between gap-3 transition-colors duration-300 cursor-pointer outline-none ${
        isFullWidth ? 'w-full' : ''
      } ${className}`}
    >
      <span className="relative z-10 font-editorial text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap text-white select-none">
        Request Access
      </span>
      <div className="relative z-10 w-[32px] h-[32px] rounded-full bg-sand flex items-center justify-center shrink-0 text-ink">
        <ArrowUpRight className="w-4 h-4 text-ink" strokeWidth={2.4} />
      </div>
    </PressFeedbackButton>
  );
};
