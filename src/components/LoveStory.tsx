import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircleHeart, Sparkles, Gem } from 'lucide-react';
import { WEDDING } from '../weddingConfig';
import { SectionBackground } from './SectionBackground';

const script = { fontFamily: "'Great Vibes', cursive" };

const ICONS = { met: Sparkles, talk: MessageCircleHeart, forever: Gem };

// Soft, hand-painted looking blob shapes for each frame.
const BLOBS = [
  '58% 42% 55% 45% / 47% 58% 42% 53%',
  '45% 55% 42% 58% / 56% 44% 60% 40%',
  '52% 48% 60% 40% / 42% 55% 45% 58%',
];

const Divider: React.FC = () => (
  <div className="flex items-center justify-center gap-2 text-[#E8957A]">
    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#E8957A]/70" />
    <Heart className="w-3 h-3 fill-current" />
    <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#E8957A]/70" />
  </div>
);

export const LoveStory: React.FC = () => (
  <section aria-label="Our story" className="text-halo relative w-full overflow-hidden py-20 sm:py-28 flex justify-center">
    <SectionBackground src="/y.webp" wash={0.35} />

    <div className="relative z-10 w-full max-w-xl px-4 sm:px-6">
      <motion.div
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <p className="font-serif text-xs sm:text-sm tracking-[0.5em] uppercase text-[#4a2a20]">We Are</p>
        <h2 className="text-6xl sm:text-7xl text-[#8a4632] leading-tight -mt-1" style={script}>
          Getting Married
        </h2>
        <div className="mt-2"><Divider /></div>
      </motion.div>

      <ol className="flex flex-col gap-10 sm:gap-14">
        {WEDDING.story.map((m, i) => {
          const Icon = ICONS[m.icon];
          const flip = i % 2 === 1;
          return (
            <motion.li
              key={m.title}
              className={`flex items-center gap-5 sm:gap-8 ${flip ? 'flex-row-reverse text-right' : ''}`}
              initial={{ opacity: 0, x: flip ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              {/* Painted frame */}
              <div className="relative shrink-0 w-[46%] sm:w-[52%] aspect-[5/4]">
                <div
                  className="absolute -inset-2 bg-gradient-to-br from-[#F6C3AE]/70 via-[#FBD9C9]/50 to-[#E8957A]/40 blur-[6px]"
                  style={{ borderRadius: BLOBS[i % BLOBS.length] }}
                />
                <div
                  className="relative w-full h-full overflow-hidden border-2 border-white/80 shadow-[0_12px_30px_rgba(138,70,50,0.25)] bg-gradient-to-br from-[#fff6f0] via-[#FBD9C9] to-[#F4A98E]"
                  style={{ borderRadius: BLOBS[i % BLOBS.length] }}
                >
                  {m.photo ? (
                    <img src={m.photo} alt={m.title} loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#8a4632]">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-1" strokeWidth={1.3} />
                      <span className="text-4xl sm:text-5xl leading-none" style={script}>{m.year}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Caption */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#8a4632] leading-snug">{m.title}</h3>
                <p className="mt-1 font-sans text-xs sm:text-sm tracking-[0.4em] text-[#E8957A] font-medium">{m.year}</p>
                <div className={`mt-3 flex items-center gap-2 text-[#E8957A] ${flip ? 'justify-end' : ''}`}>
                  {flip && <div className="w-14 h-[1px] bg-[#E8957A]/60" />}
                  <Heart className="w-3 h-3 fill-current" />
                  {!flip && <div className="w-14 h-[1px] bg-[#E8957A]/60" />}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>

      <div className="mt-12 sm:mt-16"><Divider /></div>
    </div>
  </section>
);
