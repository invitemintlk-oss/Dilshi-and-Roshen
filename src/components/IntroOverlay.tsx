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
            className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 py-8 text-center"
          >
            {/* Couple illustration in an arched, gold-trimmed frame */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="relative mb-6"
            >
              <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(255,246,240,0.95)_0%,rgba(246,195,174,0.45)_55%,transparent_75%)] blur-xl" />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative p-[6px] rounded-t-full rounded-b-[28px] bg-gradient-to-b from-[#f3d9a4] via-[#d9a441] to-[#b9822f] shadow-[0_20px_45px_rgba(138,70,50,0.45)]"
              >
                <div className="p-[3px] rounded-t-full rounded-b-[23px] bg-[#fff6f0]">
                  <img
                    src={WEDDING.introImage}
                    alt={`${WEDDING.brideName} & ${WEDDING.groomName}`}
                    className="block h-[min(50dvh,480px)] aspect-[3/4] object-cover rounded-t-full rounded-b-[20px]"
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mb-5 text-5xl sm:text-6xl text-[#8a4632] [text-shadow:0_0_6px_rgba(255,246,240,0.95),0_0_18px_rgba(255,246,240,0.9),0_0_30px_rgba(255,246,240,0.7)]"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              You Are Welcome
            </motion.h2>
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
