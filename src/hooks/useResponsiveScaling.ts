import { useState, useEffect, useMemo } from 'react';

export interface ResponsiveScaleInfo {
  /** Normalized scale factor relative to a standard desktop viewport (1280px - 1440px) */
  scaleFactor: number;
  /** Specialized scale factor for 3D logo and medallion elements */
  logoScale: number;
  /** Specialized scale factor for display and editorial typography */
  typographyScale: number;
  /** Current window width in pixels */
  width: number;
  /** Current window height in pixels */
  height: number;
  /** Boolean flags for viewport breakpoints */
  isMobile: boolean;
  isSmallMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  /** Helper function to scale any arbitrary base dimension */
  scale: (baseValue: number, min?: number, max?: number) => number;
  /** Helper CSS transform style with transform-origin center */
  transformStyle: React.CSSProperties;
}

/**
 * Calculates a continuous, mathematically proportioned scaleFactor based on window.innerWidth and innerHeight.
 * Ensures 3D elements, typography, and layout bounds remain perfectly proportioned across all screen sizes.
 */
export function useResponsiveScaling(baseWidth: number = 1280): ResponsiveScaleInfo {
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return { width: 1280, height: 800 };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    // Also listen to orientationchange on mobile devices
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const info = useMemo<ResponsiveScaleInfo>(() => {
    const { width, height } = dimensions;

    const isSmallMobile = width < 380;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1536;
    const isWide = width >= 1536;

    // Mathematical curve calculation for continuous scaleFactor:
    // For small mobile (< 380px): scales between 0.65 and 0.78
    // For standard mobile (380px - 768px): scales smoothly between 0.78 and 0.92
    // For tablet (768px - 1024px): scales between 0.92 and 0.98
    // For standard desktop (1024px - 1440px): 1.0
    // For wide displays (> 1440px): gently scales up to 1.12 without inflating UI
    let rawScale: number;
    if (width < 380) {
      rawScale = 0.65 + (width / 380) * 0.13;
    } else if (width < 768) {
      rawScale = 0.78 + ((width - 380) / (768 - 380)) * 0.14;
    } else if (width < 1024) {
      rawScale = 0.92 + ((width - 768) / (1024 - 768)) * 0.08;
    } else if (width < 1440) {
      rawScale = 1.0;
    } else {
      rawScale = Math.min(1.12, 1.0 + ((width - 1440) / 1000) * 0.12);
    }

    // Height constraint check: on short screens or landscape mobile, gently scale down
    // so vertical content doesn't get clipped
    if (height < 700) {
      const heightFactor = Math.max(0.72, height / 750);
      rawScale = Math.min(rawScale, rawScale * heightFactor);
    }

    const scaleFactor = Math.round(rawScale * 1000) / 1000;

    // Logo scale: 3D logo needs to be slightly more compact on mobile to allow typography breathing room
    const logoScale = isSmallMobile
      ? scaleFactor * 0.88
      : isMobile
      ? scaleFactor * 0.92
      : scaleFactor;

    // Typography scale: clamp-friendly multiplier
    const typographyScale = isSmallMobile
      ? scaleFactor * 0.9
      : isMobile
      ? scaleFactor * 0.95
      : scaleFactor;

    const scale = (baseValue: number, min?: number, max?: number) => {
      const val = baseValue * scaleFactor;
      if (min !== undefined && val < min) return min;
      if (max !== undefined && val > max) return max;
      return Math.round(val * 10) / 10;
    };

    const transformStyle: React.CSSProperties = {
      transform: `scale(${scaleFactor})`,
      transformOrigin: 'center center',
      transition: 'transform 0.15s ease-out',
    };

    return {
      scaleFactor,
      logoScale,
      typographyScale,
      width,
      height,
      isMobile,
      isSmallMobile,
      isTablet,
      isDesktop,
      isWide,
      scale,
      transformStyle,
    };
  }, [dimensions, baseWidth]);

  return info;
}
