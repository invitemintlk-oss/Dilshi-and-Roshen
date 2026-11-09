import React from 'react';
import { motion } from 'motion/react';
import { SectionBackground } from './SectionBackground';
import { MapPin, CalendarHeart } from 'lucide-react';
import { WEDDING, eventsFor, getInviteType, type WeddingEvent } from '../weddingConfig';

const script = { fontFamily: "'Great Vibes', cursive" };

const EventCard: React.FC<{ event: WeddingEvent; delay: number }> = ({ event, delay }) => (
  <motion.div
    className="relative w-full lg:w-1/2 max-w-lg bg-[#fff6f0]/85 backdrop-blur-md rounded-t-[140px] rounded-b-[40px] border border-[#d99a82]/60 shadow-[0_20px_50px_rgba(160,90,60,0.15)] p-8 md:p-14 flex flex-col items-center text-center overflow-hidden"
    initial={{ opacity: 0, scale: 0.95, y: 40 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
  >
    <div className="absolute inset-4 border-[1px] border-[#d99a82]/40 rounded-t-[125px] rounded-b-[25px] pointer-events-none" />

    <h3 className="text-3xl md:text-4xl text-[#8a4632] mb-8" style={script}>{event.title}</h3>

    <CalendarHeart className="w-8 h-8 md:w-10 md:h-10 text-[#8a4632] mb-4 opacity-90" strokeWidth={1} />

    <div className="space-y-2 mb-10">
      <p className="text-[11px] md:text-xs text-[#5a3528] tracking-[0.3em] uppercase">{WEDDING.weekday}</p>
      <p className="text-lg md:text-2xl font-serif text-[#8a4632] tracking-widest uppercase">{WEDDING.dateShort}</p>
    </div>

    <div className="w-full max-w-sm mx-auto space-y-6 mb-12 flex-1">
      <div className="flex items-center justify-between gap-4 text-[#4a2a20] border-b border-[#d99a82]/40 pb-4">
        <span className="font-sans text-sm md:text-base tracking-widest uppercase opacity-90 text-left">{event.activity}</span>
        <span className="font-serif text-[#8a4632] text-lg md:text-xl text-right whitespace-nowrap">{event.time}</span>
      </div>
    </div>

    <div className="flex flex-col items-center space-y-3 mt-auto">
      <MapPin className="w-6 h-6 md:w-8 md:h-8 text-[#8a4632] mb-2 opacity-90" strokeWidth={1} />
      <p className="text-lg md:text-xl font-serif text-[#4a2a20] tracking-wide">{event.venue}</p>
      <p className="text-[11px] md:text-sm text-[#5a3528] tracking-widest uppercase mb-2">{event.address}</p>
      <a
        href={event.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-2 md:px-8 md:py-2.5 mt-2 border border-[#E8957A]/60 hover:bg-[#E8957A] hover:text-white rounded-full text-[#8a4632] transition-all duration-300"
      >
        <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase">Live Location</span>
      </a>
    </div>
  </motion.div>
);

/** Ceremony details — only shows the events this guest's link invites them to. */
export const HomecomingDetails: React.FC = () => {
  const events = eventsFor(getInviteType());

  return (
    <section id="details" className="text-halo w-full py-24 relative overflow-hidden">
      <SectionBackground src={WEDDING.sectionBackgrounds.celebrations} />
      <div className="container px-4 md:px-6 mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          className="flex flex-col items-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-7xl text-[#8a4632]" style={script}>Celebrations</h2>
          <div className="flex items-center space-x-4">
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#E8957A]/70" />
            <p className="text-[10px] md:text-xs text-[#4a2a20] font-sans tracking-[0.4em] uppercase">Join us in celebration</p>
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#E8957A]/70" />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-12 w-full max-w-6xl">
          {events.map((ev, i) => (
            <EventCard key={ev.key} event={ev} delay={0.2 + i * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
};
