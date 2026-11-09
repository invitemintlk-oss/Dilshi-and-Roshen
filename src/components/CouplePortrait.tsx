import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { WEDDING } from '../weddingConfig';

const script = { fontFamily: "'Great Vibes', cursive" };

/** Full portrait of the couple in an arched gold frame, shown after "The Happy Couple". */
export const CouplePortrait: React.FC = () => (
  <section aria-label="Couple portrait" className="text-halo relative w-full py-20 sm:py-28 overflow-hidden flex justify-center">
    <div className="relative z-10 w-full max-w-md px-4 flex flex-col items-center text-center">
      <motion.div
        className="relative w-full max-w-[340px]"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
      >
        <div className="absolute -inset-5 rounded-t-full rounded-b-[40px] bg-[radial-gradient(circle,rgba(246,195,174,0.6)_0%,transparent_70%)] blur-xl" />
        <div className="relative p-[6px] rounded-t-full rounded-b-[32px] bg-gradient-to-b from-[#f3d9a4] via-[#d9a441] to-[#b9822f] shadow-[0_22px_50px_rgba(90,26,36,0.4)]">
          <div className="p-[3px] rounded-t-full rounded-b-[27px] bg-[#fff6f0]">
            <img
              src={WEDDING.portraitImage}
              alt={`${WEDDING.brideName} & ${WEDDING.groomName}`}
              loading="lazy"
              className="block w-full aspect-[2/3] object-cover rounded-t-full rounded-b-[24px]"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <p className="text-5xl sm:text-6xl text-[#8a4632] leading-tight" style={script}>
          Two Hearts, One Love
        </p>
        <div className="flex items-center justify-center gap-3 mt-3 text-[#E8957A]">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#E8957A]/70" />
          <Heart className="w-3 h-3 fill-current" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#E8957A]/70" />
        </div>
      </motion.div>
    </div>
  </section>
);
