import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { WEDDING } from '../weddingConfig';
import { SectionBackground } from './SectionBackground';

const Person: React.FC<{ name: string; role: string; parents: React.ReactNode; delay: number }> = ({ name, role, parents, delay }) => (
  <motion.div
    className="flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
  >
    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#8a4632] tracking-[0.15em] uppercase">{name}</h3>
    <div className="flex items-center gap-4 my-4">
      <div className="w-10 sm:w-16 h-[1px] bg-[#E8957A]/70" />
      <span className="text-xs sm:text-sm text-[#4a2a20] tracking-[0.35em] uppercase font-sans">{role}</span>
      <div className="w-10 sm:w-16 h-[1px] bg-[#E8957A]/70" />
    </div>
    <p className="text-sm sm:text-base md:text-lg font-serif text-[#4a2a20] leading-relaxed max-w-md">{parents}</p>
  </motion.div>
);

export const HappyCouple: React.FC = () => {
  const { brideParents: b, groomParents: g } = WEDDING;

  return (
    <section aria-label="The happy couple" className="text-halo w-full py-24 relative overflow-hidden flex items-center justify-center min-h-[100dvh]">
      <SectionBackground src={WEDDING.sectionBackgrounds.happyCouple} wash={0} />

      {/* Image 8 is dark green, so the text sits on a soft cream card */}
      <div className="w-[calc(100%-2rem)] mx-auto relative z-10 flex flex-col items-center max-w-2xl bg-[#fff6f0]/85 backdrop-blur-sm rounded-t-[120px] rounded-b-[40px] border border-[#d99a82]/60 shadow-[0_20px_50px_rgba(0,0,0,0.25)] px-6 sm:px-12 py-14 sm:py-16">
        <motion.div
          className="relative w-full max-w-[260px] sm:max-w-[300px] mb-10"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="relative p-[5px] rounded-t-full rounded-b-[28px] bg-gradient-to-b from-[#f3d9a4] via-[#d9a441] to-[#b9822f] shadow-[0_18px_40px_rgba(90,26,36,0.3)]">
            <div className="p-[3px] rounded-t-full rounded-b-[23px] bg-[#fff6f0]">
              <img
                src={WEDDING.happyCoupleImage}
                alt={`${WEDDING.brideName} & ${WEDDING.groomName}`}
                loading="lazy"
                decoding="async"
                className="block w-full aspect-[3/4] object-cover rounded-t-full rounded-b-[20px]"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-7xl text-[#8a4632] leading-tight" style={{ fontFamily: "'Great Vibes', cursive" }}>
            The Happy Couple
          </h2>
          <p className="text-[#4a2a20] font-serif text-lg md:text-xl mt-4 leading-relaxed">
            What began as a moment<br />became our forever
          </p>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#E8957A]/70" />
            <Heart className="w-4 h-4 text-[#8a4632]" strokeWidth={1.5} />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#E8957A]/70" />
          </div>
        </motion.div>

        <Person
          name={WEDDING.brideName}
          role="The Bride"
          parents={<>Daughter of Mr. {b.father}<br />&amp; Mrs. {b.mother}</>}
          delay={0.2}
        />

        <motion.div
          className="my-12 text-[#8a4632] text-5xl font-serif italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          &amp;
        </motion.div>

        <Person
          name={WEDDING.groomName}
          role="The Groom"
          parents={<>Son of Mr. {g.father}<br />&amp; Mrs. {g.mother}</>}
          delay={0.6}
        />
      </div>
    </section>
  );
};
