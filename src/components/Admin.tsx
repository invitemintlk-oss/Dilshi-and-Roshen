import React, { useEffect, useState } from 'react';
import { Check, Link as LinkIcon, FileText, Sparkles, Church, PartyPopper, Heart } from 'lucide-react';
import {
  WEDDING,
  PREFIXES,
  INVITE_OPTIONS,
  getDisplayName,
  eventsFor,
  type InviteType,
} from '../weddingConfig';

type Generated = { link: string; displayName: string; message: string; invite: InviteType };

const buildMessage = (displayName: string, link: string) =>
  `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${WEDDING.groomName} & ${WEDDING.brideName}`;

const inviteIcon = (v: InviteType) =>
  v === 'church' ? <Church className="w-5 h-5" /> : v === 'party' ? <PartyPopper className="w-5 h-5" /> : <Heart className="w-5 h-5" />;

export const Admin: React.FC = () => {
  const [prefix, setPrefix] = useState<string>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [invite, setInvite] = useState<InviteType>('both');
  const [generated, setGenerated] = useState<Generated | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Any edit after generating invalidates the old link, so stale links can't be copied.
  useEffect(() => setGenerated(null), [prefix, guestName, invite]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = guestName.trim().replace(/\s+/g, ' ');
    if (!name) return;

    const params = new URLSearchParams({ prefix });
    if (invite !== 'both') params.set('invite', invite);

    const link = `${window.location.origin}/${encodeURIComponent(name)}?${params.toString()}`;
    const displayName = getDisplayName(prefix, name);
    setGenerated({ link, displayName, message: buildMessage(displayName, link), invite });
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers / non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setToast(label);
  };

  const field =
    'w-full h-12 px-4 rounded-xl border border-[#f0d3c6] bg-[#fffaf7] focus:border-[#E8957A] focus:ring-1 focus:ring-[#E8957A] outline-none transition-all';
  const label = 'text-xs font-medium text-[#6e4436] uppercase tracking-widest';

  return (
    <div className="min-h-screen bg-[#fdf1ea] text-[#4a2a20] p-4 sm:p-6 md:p-12 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-[#E8957A]/30">
        <h1 className="text-2xl sm:text-3xl font-serif text-center text-[#8a4632]">Invitation Link Generator</h1>
        <p className="text-center text-sm text-[#6e4436] mt-2 mb-8">
          {WEDDING.brideName} &amp; {WEDDING.groomName} · {WEDDING.dateShort}
        </p>

        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className={label} htmlFor="prefix">Select Prefix</label>
              <select id="prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)} className={field}>
                {PREFIXES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className={label} htmlFor="guest">Guest Name</label>
              <input
                id="guest"
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className={field}
              />
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className={`${label} mb-2`}>Invite To</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {INVITE_OPTIONS.map((opt) => {
                const active = invite === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`cursor-pointer rounded-xl border p-3 transition-all flex flex-col gap-1 ${
                      active
                        ? 'border-[#E8957A] bg-[#fdeae1] ring-1 ring-[#E8957A]'
                        : 'border-[#f0d3c6] bg-[#fffaf7] hover:border-[#E8957A]/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="invite"
                      value={opt.value}
                      checked={active}
                      onChange={() => setInvite(opt.value)}
                      className="sr-only"
                    />
                    <span className="flex items-center gap-2 font-medium text-sm text-[#8a4632]">
                      {inviteIcon(opt.value)} {opt.label}
                    </span>
                    <span className="text-xs text-[#6e4436]">{opt.description}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={!guestName.trim()}
            className="w-full h-12 flex items-center justify-center gap-2 bg-[#8a4632] hover:bg-[#6e3526] text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-medium transition-all"
          >
            <Sparkles className="w-4 h-4" /> Generate Link
          </button>
        </form>

        <div className="pt-6 mt-6 border-t border-[#f0d3c6] space-y-5">
          {generated && (
            <div className="rounded-xl bg-[#fdeae1] border border-[#E8957A]/40 text-center px-4 py-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#6e4436]">Preview on invitation</p>
              <p className="mt-2 text-sm text-[#4a2a20]">
                We cordially invite <span className="text-[#8a4632] font-serif text-lg">{generated.displayName}</span> to
                celebrate our special day with us.
              </p>
              <p className="mt-3 text-xs text-[#6e4436]">Greeting: Dear {generated.displayName} ❤️</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {eventsFor(generated.invite).map((ev) => (
                  <span key={ev.key} className="text-xs bg-white border border-[#E8957A]/40 text-[#8a4632] rounded-full px-3 py-1">
                    {ev.title} · {ev.time}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className={label}>Generated Link</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                readOnly
                value={generated?.link ?? ''}
                placeholder="Click Generate Link"
                onFocus={(e) => e.target.select()}
                className="w-full h-12 px-4 rounded-xl border border-[#f0d3c6] bg-[#fffaf7] text-[#4a2a20] text-sm outline-none"
              />
              <button
                onClick={() => generated && copy(generated.link, 'Link copied!')}
                disabled={!generated}
                className="h-12 px-5 flex items-center justify-center gap-2 border border-[#8a4632] text-[#8a4632] hover:bg-[#8a4632] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-medium transition-all sm:min-w-[160px]"
              >
                <LinkIcon className="w-4 h-4" /> Copy Link Only
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className={label}>Full Message</label>
            <textarea
              readOnly
              value={generated?.message ?? ''}
              placeholder="The personalized WhatsApp message will appear here."
              rows={13}
              className="w-full p-4 rounded-xl border border-[#f0d3c6] bg-[#fffaf7] text-[#4a2a20] text-sm outline-none resize-none"
            />
            <button
              onClick={() => generated && copy(generated.message, 'Message copied!')}
              disabled={!generated}
              className="w-full h-12 flex items-center justify-center gap-2 bg-[#E8957A] hover:bg-[#d9805f] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-medium shadow-lg transition-all"
            >
              <FileText className="w-5 h-5" /> Copy Full Message
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#4a2a20] text-white text-sm px-5 py-3 rounded-full shadow-xl">
          <Check className="w-4 h-4 text-[#F6C3AE]" /> {toast}
        </div>
      )}
    </div>
  );
};
