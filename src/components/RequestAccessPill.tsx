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
        className={`group relative overflow-hidden w-full h-[54px] rounded-full pl-6 pr-2 bg-gradient-to-b from-[#F6F4FB] to-[#E9E3FA] text-[#08080C] shadow-[0_10px_40px_-10px_rgba(184,164,244,0.55)] flex items-center justify-between transition-colors duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-lav focus-visible:ring-offset-[3px] focus-visible:ring-offset-ink ${className}`}
      >
        <span className="relative z-10 font-editorial text-[15px] sm:text-[16px] font-semibold tracking-[0.04em] whitespace-nowrap text-[#08080C] select-none">
          Request Access
        </span>
        <div className="relative z-10 w-[36px] h-[36px] rounded-full bg-[#B8A4F4] flex items-center justify-center shrink-0 text-[#08080C]">
          <ArrowUpRight className="w-[18px] h-[18px] text-[#08080C]" strokeWidth={2.4} />
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
        className={`group relative overflow-hidden h-[44px] rounded-full pl-4 sm:pl-5 pr-1.5 bg-gradient-to-b from-[#F6F4FB] to-[#E9E3FA] text-[#08080C] shadow-[0_10px_40px_-10px_rgba(184,164,244,0.55)] inline-flex items-center justify-between gap-3 transition-colors duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-lav focus-visible:ring-offset-[3px] focus-visible:ring-offset-ink ${
          isFullWidth ? 'w-full' : ''
        } ${className}`}
      >
        <span className="relative z-10 font-editorial text-[13px] sm:text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap text-[#08080C] select-none">
          Request Access
        </span>
        <div className="relative z-10 w-[32px] h-[32px] rounded-full bg-[#B8A4F4] flex items-center justify-center shrink-0 text-[#08080C]">
          <ArrowUpRight className="w-4 h-4 text-[#08080C]" strokeWidth={2.4} />
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
      className={`group relative overflow-hidden h-[48px] rounded-full pl-5 pr-1.5 bg-gradient-to-b from-[#F6F4FB] to-[#E9E3FA] text-[#08080C] shadow-[0_10px_40px_-10px_rgba(184,164,244,0.55)] inline-flex items-center justify-between gap-3 transition-colors duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-lav focus-visible:ring-offset-[3px] focus-visible:ring-offset-ink ${
        isFullWidth ? 'w-full' : ''
      } ${className}`}
    >
      <span className="relative z-10 font-editorial text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap text-[#08080C] select-none">
        Request Access
      </span>
      <div className="relative z-10 w-[32px] h-[32px] rounded-full bg-[#B8A4F4] flex items-center justify-center shrink-0 text-[#08080C]">
        <ArrowUpRight className="w-4 h-4 text-[#08080C]" strokeWidth={2.4} />
      </div>
    </PressFeedbackButton>
  );
};
