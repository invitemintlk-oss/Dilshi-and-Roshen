import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { WEDDING, getGuestFromUrl } from '../weddingConfig';

const script = { fontFamily: "'Great Vibes', cursive" };

export const HeroContent: React.FC = () => {
  const { displayName } = getGuestFromUrl();

  return (
    <section aria-label="Hero" className="text-halo relative w-full h-[100dvh] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src={WEDDING.background}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,246,240,0.8)_0%,rgba(255,246,240,0.4)_55%,rgba(255,246,240,0.1)_100%)]" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4">
        {displayName && (
          <motion.div
            className="flex flex-col items-center justify-center mb-6 sm:mb-8 bg-[#fff6f0]/85 px-8 py-4 rounded-2xl backdrop-blur-sm border border-[#d99a82]/50 max-w-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-2 font-sans text-[#4a2a20] text-center">
              We cordially invite
            </p>
            <p className="font-serif text-2xl sm:text-3xl text-[#8a4632] text-center">{displayName}</p>
            <p className="text-[10px] sm:text-xs tracking-[0.15em] mt-2 font-sans text-[#4a2a20] text-center">
              to celebrate our special day with us
            </p>
          </motion.div>
        )}

        <motion.div
          className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-[40px] border border-[#c47a62]/40 bg-[#fff6f0]/75 backdrop-blur-sm mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase font-sans text-[#4a2a20] font-medium">
            We're Getting Married!
          </span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-2 sm:gap-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl text-[#8a4632] leading-tight" style={script}>
            {WEDDING.brideName}
          </h1>
          <div className="my-1 sm:my-3 text-[#8a4632] opacity-90">
            <span className="text-4xl sm:text-5xl font-serif italic">&amp;</span>
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl text-[#8a4632] leading-tight" style={script}>
            {WEDDING.groomName}
          </h1>
          <p className="text-sm sm:text-lg md:text-xl font-sans tracking-[0.1em] sm:tracking-[0.15em] text-[#4a2a20] uppercase mt-10 sm:mt-14">
            {WEDDING.dateLong}
          </p>
          <p className="text-xs sm:text-sm font-sans tracking-[0.3em] text-[#5a3528] uppercase">{WEDDING.city}</p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 inset-x-0 z-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center text-center animate-bounce">
          <p className="text-[11px] sm:text-xs font-sans tracking-widest text-[#4a2a20] mb-2 opacity-90">Swipe up for more</p>
          <ChevronDown className="h-6 w-6 text-[#4a2a20] opacity-90" />
        </div>
      </motion.div>
    </section>
  );
};
