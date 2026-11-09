// Single source of truth for the couple's details used across the site and admin page.

export const WEDDING = {
  brideName: 'Dilshi',
  brideFullName: 'Dilshi Perera',
  brideParents: { father: 'Nishantha Perera', mother: 'Chandani Dasanayake' },

  groomName: 'Roshen',
  groomFullName: 'Roshen Samarathunga',
  groomParents: { father: 'Ananda Samarathunga', mother: 'Renuka Gamage' },

  dateISO: '2027-08-21',
  dateLong: 'Saturday, August 21, 2027',
  dateShort: '21st August 2027',
  weekday: 'Saturday',
  city: 'Negombo',
  hashtag: '#DilshiAndRoshen2027',

  song: { src: '/Song.mp3', title: 'I Belong to You', artist: 'Jacob Lee' },
  background: '/l.webp',
  introVideo: '/gemini_generated_video_1c2126fd.mp4',

  // Per-section background images (public folder)
  sectionBackgrounds: {
    countdown: '/9.jpg',
    happyCouple: '/8.webp', // optimized copy of 8.png
    celebrations: '/7.jpg',
    rsvp: '/0.jpg',
    wishes: '/6.jpg',
  },
};

/** Ceremonies a guest can be invited to. */
export type EventKey = 'church' | 'party';

export interface WeddingEvent {
  key: EventKey;
  title: string;
  label: string; // short label for admin / sheet
  activity: string;
  time: string;
  startISO: string; // local start time (+05:30)
  endISO: string;
  venue: string;
  address: string;
  mapUrl: string;
}

export const EVENTS: Record<EventKey, WeddingEvent> = {
  church: {
    key: 'church',
    title: 'Church Ceremony',
    label: 'Church Mass',
    activity: 'Holy Mass',
    time: '8:00 AM',
    startISO: '2027-08-21T08:00:00+05:30',
    endISO: '2027-08-21T09:30:00+05:30',
    venue: 'St. Joseph Church',
    address: "St Joseph's St, Negombo",
    mapUrl: 'https://maps.app.goo.gl/xLCXfqv1HPKvGYuh6',
  },
  party: {
    key: 'party',
    title: 'Poruwa Ceremony & Party',
    label: 'Poruwa & Party',
    activity: 'Poruwa & Celebration',
    time: '10:00 AM',
    startISO: '2027-08-21T10:00:00+05:30',
    endISO: '2027-08-21T16:00:00+05:30',
    venue: 'Ranowell Hotel',
    address: '162/4 Chilaw Road, Kochchikade, Negombo',
    mapUrl: 'https://maps.app.goo.gl/Q1E1j5nK4S1TrZxr9',
  },
};

/**
 * Invite types used in the `?invite=` URL param.
 * "both" is the default and is omitted from links. "reception" is accepted as a
 * legacy alias for "party".
 */
export type InviteType = 'both' | EventKey;

export const INVITE_OPTIONS: { value: InviteType; label: string; description: string }[] = [
  { value: 'both', label: 'Church & Party', description: 'Holy Mass + Poruwa ceremony & party' },
  { value: 'church', label: 'Church Only', description: `${EVENTS.church.venue} · ${EVENTS.church.time}` },
  { value: 'party', label: 'Poruwa & Party Only', description: `${EVENTS.party.venue} · ${EVENTS.party.time}` },
];

export function parseInviteType(raw: string | null): InviteType {
  const v = (raw || '').toLowerCase();
  if (v === 'church') return 'church';
  if (v === 'party' || v === 'reception' || v === 'poruwa') return 'party';
  return 'both';
}

export function getInviteType(): InviteType {
  return parseInviteType(new URLSearchParams(window.location.search).get('invite'));
}

export function eventsFor(invite: InviteType): WeddingEvent[] {
  return invite === 'both' ? [EVENTS.church, EVENTS.party] : [EVENTS[invite]];
}

export function inviteLabel(invite: InviteType): string {
  return eventsFor(invite).map((e) => e.label).join(' + ');
}

export type Prefix = 'Mr.' | 'Mrs.' | 'Miss' | 'Mr. & Mrs.' | 'Family' | 'Dear';

export const PREFIXES: Prefix[] = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'];

/** Combines prefix + name for display. "Dear" adds nothing — it's handled by the greeting. */
export function getDisplayName(prefix: string, name: string): string {
  const n = name.trim();
  if (!n) return '';
  switch (prefix) {
    case 'Mr.': return `Mr. ${n}`;
    case 'Mrs.': return `Mrs. ${n}`;
    case 'Miss': return `Miss ${n}`;
    case 'Mr. & Mrs.': return `Mr. & Mrs. ${n}`;
    case 'Family': return `${n} and Family`;
    case 'Dear': return n;
    default: return n;
  }
}

/** Reads the personalized guest name from the URL: /{name}?prefix=Mr. */
export function getGuestFromUrl(): { name: string; displayName: string } {
  const params = new URLSearchParams(window.location.search);
  const prefix = params.get('prefix') || '';
  let name = '';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (path && path !== 'admin') {
    try { name = decodeURIComponent(path); } catch { name = path; }
  } else {
    name = params.get('name') || '';
  }
  name = name.replace(/\s+/g, ' ').trim();
  return { name, displayName: getDisplayName(prefix, name) };
}

/** Peach palette used across the invitation. */
export const PALETTE = {
  deep: '#8a4632',    // headings (cinnamon)
  text: '#4a2a20',    // body text
  muted: '#6e4436',
  peach: '#E8957A',   // accent
  peachSoft: '#F6C3AE',
  border: '#d99a82',
  cream: '#fff6f0',
};
