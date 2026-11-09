import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WEDDING, getGuestFromUrl } from '../weddingConfig';

interface IntroOverlayProps {
  /** Called on the "Open Invitation" tap (a user gesture, so music is allowed to start). */
  onStart?: () => void;
  /** Called when the intro video finishes (or is skipped). */
  onEnter: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onStart, onEnter }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { displayName } = getGuestFromUrl();

  const handlePlay = () => {
    setIsPlaying(true);
    onStart?.();
    const video = videoRef.current;
    if (!video) return onEnter();
    // If the video can't play (e.g. low-power mode), go straight to the invitation.
    video.play().catch(() => onEnter());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-[#fff6f0]">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster={WEDDING.background}
        onEnded={onEnter}
        onError={() => isPlaying && onEnter()}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={WEDDING.introVideo} type="video/mp4" />
      </video>

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full h-full flex flex-col justify-end items-center pb-24 px-6 text-center"
          >
            {displayName && (
              <p className="mb-6 px-6 py-2 rounded-full bg-[#fff6f0]/85 backdrop-blur-sm font-serif text-sm sm:text-base text-[#4a2a20] border border-[#d99a82]/50">
                Dear <span className="text-[#8a4632] font-semibold">{displayName}</span>
              </p>
            )}
            <button
              onClick={handlePlay}
              className="font-sans px-10 py-4 bg-[#E8957A]/90 backdrop-blur-md text-white border border-white/60 rounded-full shadow-[0_10px_30px_rgba(160,90,60,0.4)] hover:bg-[#8a4632] hover:scale-105 transition-all duration-300 uppercase tracking-[0.3em] text-xs sm:text-sm"
            >
              Open Invitation
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {isPlaying && (
        <button
          onClick={onEnter}
          className="absolute bottom-6 right-6 z-10 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-[#8a4632] text-[10px] uppercase tracking-[0.25em] hover:bg-white/90 transition"
        >
          Skip
        </button>
      )}
    </div>
  );
};
