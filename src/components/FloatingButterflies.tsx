import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Butterfly {
  id: number;
  size: number;
  duration: number;
  delay: number;
  wing: string;
  wingInner: string;
  flap: number;
  toRight: boolean;
  ys: number[];
}

const PAIRS: [string, string][] = [
  ['#E8957A', '#FBD9C9'],
  ['#F4A98E', '#FFF1E8'],
  ['#d9a441', '#F7E7CE'],
  ['#c47a62', '#F6C3AE'],
  ['#F2B5A0', '#FFFFFF'],
];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

/** Butterflies that drift across the screen on wavy paths, flapping their wings. */
export const FloatingButterflies: React.FC = () => {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    setButterflies(
      Array.from({ length: 7 }).map((_, i) => {
        const [wing, wingInner] = PAIRS[i % PAIRS.length];
        const base = rand(10, 85);
        return {
          id: i,
          size: rand(22, 38),
          duration: rand(16, 26),
          delay: i * 2.8 + rand(0, 2),
          wing,
          wingInner,
          flap: rand(0.22, 0.34),
          toRight: i % 2 === 0,
          ys: [base, base + rand(-14, 14), base + rand(-14, 14), base + rand(-14, 14), base + rand(-10, 10)],
        };
      }),
    );
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {butterflies.map((b) => {
        const xs = b.toRight ? ['-10vw', '20vw', '50vw', '80vw', '110vw'] : ['110vw', '80vw', '50vw', '20vw', '-10vw'];
        const tilt = b.toRight ? 70 : -70;
        return (
          <motion.div
            key={b.id}
            className="absolute top-0 left-0"
            initial={{ x: xs[0], y: `${b.ys[0]}vh`, opacity: 0 }}
            animate={{
              x: xs,
              y: b.ys.map((y) => `${y}vh`),
              rotate: [tilt, tilt - 18, tilt + 15, tilt - 12, tilt],
              opacity: [0, 0.95, 0.95, 0.95, 0],
            }}
            transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, repeatDelay: rand(2, 6), ease: 'easeInOut' }}
          >
            <svg
              width={b.size}
              height={b.size}
              viewBox="0 0 40 40"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(138,70,50,0.3))', ['--flap' as string]: `${b.flap}s` }}
            >
              <g className="butterfly-wing-l">
                <path d="M19 19 C12 4 2 4 3 13 C4 19 11 21 19 20 Z" fill={b.wing} />
                <path d="M19 21 C11 22 5 28 8 33 C11 37 17 30 19 22 Z" fill={b.wing} />
                <path d="M17 18 C12 9 6 9 7 14 C8 18 12 19 17 19 Z" fill={b.wingInner} opacity="0.7" />
              </g>
              <g className="butterfly-wing-r">
                <path d="M21 19 C28 4 38 4 37 13 C36 19 29 21 21 20 Z" fill={b.wing} />
                <path d="M21 21 C29 22 35 28 32 33 C29 37 23 30 21 22 Z" fill={b.wing} />
                <path d="M23 18 C28 9 34 9 33 14 C32 18 28 19 23 19 Z" fill={b.wingInner} opacity="0.7" />
              </g>
              <ellipse cx="20" cy="21" rx="1.3" ry="8" fill="#5a3528" />
              <path d="M20 13 C18 9 16 7 15 6 M20 13 C22 9 24 7 25 6" stroke="#5a3528" strokeWidth="0.7" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};
