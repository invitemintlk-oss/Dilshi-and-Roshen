import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { WEDDING } from '../weddingConfig';

const script = { fontFamily: "'Great Vibes', cursive" };

const SWATCHES = [
  { name: 'Burgundy', color: '#5a1a24' },
  { name: 'Wine', color: '#7b2a35' },
  { name: 'Black', color: '#141010' },
];

/** Dress code section featuring the burgundy & black couple look. */
export const DressCodeStyle: React.FC = () => (
  <section aria-label="Dress code" className="text-halo relative w-full py-20 sm:py-28 overflow-hidden flex justify-center">
    <div className="relative z-10 w-full max-w-md px-4 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <p className="font-serif text-xs sm:text-sm tracking-[0.5em] uppercase text-[#4a2a20]">Our Theme</p>
        <h2 className="text-6xl sm:text-7xl text-[#8a4632] leading-tight -mt-1" style={script}>
          Dress Code
        </h2>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#E8957A]/70" />
          <Sparkles className="w-4 h-4 text-[#8a4632]" strokeWidth={1.3} />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#E8957A]/70" />
        </div>
      </motion.div>

      <motion.div
        className="relative mt-10 w-full max-w-[340px]"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.15 }}
      >
        <div className="absolute -inset-5 rounded-t-full rounded-b-[40px] bg-[radial-gradient(circle,rgba(246,195,174,0.6)_0%,transparent_70%)] blur-xl" />
        <div className="relative p-[6px] rounded-t-full rounded-b-[32px] bg-gradient-to-b from-[#f3d9a4] via-[#d9a441] to-[#b9822f] shadow-[0_22px_50px_rgba(90,26,36,0.4)]">
          <div className="p-[3px] rounded-t-full rounded-b-[27px] bg-[#fff6f0]">
            <img
              src={WEDDING.dressCodeImage}
              alt="Couple dressed in burgundy and black formal wear"
              loading="lazy"
              className="block w-full aspect-[2/3] object-cover rounded-t-full rounded-b-[24px]"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <p className="font-serif text-xl sm:text-2xl text-[#8a4632]">Burgundy &amp; Black</p>
        <p className="mt-2 font-sans text-xs sm:text-sm tracking-[0.25em] uppercase text-[#4a2a20]">Elegant Formal Attire</p>
        <div className="mt-6 flex items-center justify-center gap-6">
          {SWATCHES.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <span
                className="w-11 h-11 rounded-full border-[3px] border-[#fff6f0] shadow-[0_6px_16px_rgba(90,26,36,0.35)] ring-1 ring-[#d9a441]/70"
                style={{ backgroundColor: s.color }}
              />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#4a2a20]">{s.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
