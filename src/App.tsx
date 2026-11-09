import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { FloatingButterflies } from './components/FloatingButterflies';

import { Countdown } from './components/Countdown';
import { HappyCouple } from './components/HappyCouple';
import { HomecomingDetails } from './components/HomecomingDetails';
import { NoteFromUs } from './components/NoteFromUs';
import { RSVPForm } from './components/RSVPForm';
import { Footer } from './components/Footer';
import { IntroOverlay } from './components/IntroOverlay';
import { HeroContent } from './components/HeroContent';
import { LoveStory } from './components/LoveStory';
import { WishesForm } from './components/WishesForm';
import { WEDDING, eventsFor, getInviteType } from './weddingConfig';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown targets the first ceremony this guest is invited to.
  const [weddingDate] = useState(() => new Date(eventsFor(getInviteType())[0].startISO));

  const startMusic = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.play().catch((err) => console.log('Audio play blocked: ', err));
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch((err) => console.log('Audio play blocked: ', err));
    else audio.pause();
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      startMusic();
      remove();
    };
    const remove = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    return remove;
  }, []);

  return (
    <div className="relative min-h-screen font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden bg-brand-ivory">
      {/* Site-wide background (fixed div instead of background-attachment so it works on iOS) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('${WEDDING.background}')` }}
      />
      <div aria-hidden="true" className="fixed inset-0 z-0 bg-[#fff6f0]/40 pointer-events-none" />
      <FloatingButterflies />

      {/* Background Music — "I Belong to You" by Jacob Lee */}
      <audio
        ref={audioRef}
        src={WEDDING.song.src}
        loop
        preload="auto"
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
      />

      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50"
          >
            <IntroOverlay
              onStart={startMusic}
              onEnter={() => {
                startMusic();
                setShowIntro(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="relative z-10"
        >
          {/* Music Toggle Button */}
          <button
            onClick={toggleMusic}
            aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
            title={`${WEDDING.song.title} — ${WEDDING.song.artist}`}
            className="fixed bottom-8 right-8 z-[60] w-14 h-14 glass rounded-full flex items-center justify-center text-[#8a4632] hover:bg-[#E8957A] hover:text-white transition-all active:scale-90 shadow-2xl group"
          >
            <div className="absolute inset-0 rounded-full border border-[#E8957A]/40 scale-110 group-hover:scale-125 transition-transform" />
            {isMusicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>

          <HeroContent />
          <Countdown targetDate={weddingDate} />
          <LoveStory />
          <HappyCouple />
          <HomecomingDetails />
          <NoteFromUs />
          <RSVPForm />
          <WishesForm />
          <Footer />
        </motion.main>
      )}
    </div>
  );
}
