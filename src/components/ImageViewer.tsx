import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowLeft, X } from 'lucide-react';

interface ImageViewerImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImageViewerContextValue {
  openImage: (image: ImageViewerImage) => void;
}

const ImageViewerContext = createContext<ImageViewerContextValue | null>(null);

export const useImageViewer = () => {
  const context = useContext(ImageViewerContext);
  if (!context) {
    throw new Error('useImageViewer must be used within an ImageViewerProvider');
  }
  return context;
};

export const ImageViewerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [image, setImage] = useState<ImageViewerImage | null>(null);
  const imageRef = useRef<ImageViewerImage | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const scrollPositionRef = useRef(0);
  const historyEntryRef = useRef(false);

  const openImage = useCallback((nextImage: ImageViewerImage) => {
    if (imageRef.current) return;

    const currentState =
      window.history.state && typeof window.history.state === 'object'
        ? window.history.state
        : {};
    window.history.pushState(
      { ...currentState, creatorHubImageViewer: true },
      '',
    );

    scrollPositionRef.current = window.scrollY;
    triggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    historyEntryRef.current = true;
    imageRef.current = nextImage;
    setImage(nextImage);
  }, []);

  const closeImage = useCallback(() => {
    if (imageRef.current && historyEntryRef.current) {
      window.history.back();
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (!imageRef.current) return;
      historyEntryRef.current = false;
      imageRef.current = null;
      setImage(null);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && imageRef.current) {
        event.preventDefault();
        closeImage();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeImage]);

  useEffect(() => {
    if (!image) return;

    const body = document.body;
    const root = document.documentElement;
    const originalBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    const originalRootStyles = {
      overflow: root.style.overflow,
      scrollBehavior: root.style.scrollBehavior,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollPositionRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    root.style.overflow = 'hidden';
    root.style.scrollBehavior = 'auto';
    viewerRef.current?.focus();

    return () => {
      body.style.position = originalBodyStyles.position;
      body.style.top = originalBodyStyles.top;
      body.style.left = originalBodyStyles.left;
      body.style.right = originalBodyStyles.right;
      body.style.width = originalBodyStyles.width;
      body.style.overflow = originalBodyStyles.overflow;
      root.style.overflow = originalRootStyles.overflow;
      root.style.scrollBehavior = originalRootStyles.scrollBehavior;
      window.scrollTo(0, scrollPositionRef.current);
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
      triggerRef.current = null;
    };
  }, [image]);

  return (
    <ImageViewerContext.Provider value={{ openImage }}>
      {children}
      {image && (
        <div
          ref={viewerRef}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          tabIndex={-1}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeImage();
          }}
          className="fixed inset-0 z-[110] grid place-items-center overflow-hidden bg-ink outline-none"
        >
          <button
            type="button"
            onClick={closeImage}
            aria-label="Back to website"
            className="fixed z-[111] flex h-11 items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.12] px-[14px] text-[13px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{
              top: 'calc(16px + env(safe-area-inset-top))',
              left: 'calc(16px + env(safe-area-inset-left))',
            }}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back</span>
          </button>
          <button
            type="button"
            onClick={closeImage}
            aria-label="Close image viewer"
            className="fixed z-[111] flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.15] bg-white/[0.12] text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{
              top: 'calc(16px + env(safe-area-inset-top))',
              right: 'calc(16px + env(safe-area-inset-right))',
            }}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="max-h-[100svh] max-w-[100vw] object-contain"
          />
        </div>
      )}
    </ImageViewerContext.Provider>
  );
};
