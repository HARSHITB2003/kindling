import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  isSundayToday,
  weeksSince,
  daysSince,
  formatSunday,
} from '../utils/dates.js';
import {
  getNotes,
  getNudgeState,
  setNudgeState,
} from '../storage/storage.js';

export default function SundayNudge({ people, onOpenPerson, refreshKey }) {
  const nudge = useMemo(() => computeNudge(people), [people, refreshKey]);

  if (!nudge) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-12 py-7"
      style={{
        background: 'var(--color-cream)',
        borderTop: '1px solid var(--color-linen)',
        borderBottom: '1px solid var(--color-linen)',
      }}
    >
      <div className="px-6 sm:px-10 max-w-2xl">
        <div className="flex items-baseline justify-between flex-wrap gap-y-2">
          <span
            className="text-[20px] text-indigo-ink"
            style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
          >
            sunday.
          </span>
          <span
            className="text-[11px] uppercase tracking-[0.15em] text-pencil"
            style={{ fontFamily: 'var(--font-plex-mono)' }}
          >
            {formatSunday(new Date())}
          </span>
        </div>
        <p
          className="mt-4 text-[17px] sm:text-[18px] text-indigo-soft leading-[1.6]"
          style={{ fontFamily: 'var(--font-fraunces)' }}
        >
          {nudge.body}
        </p>
        <button
          onClick={() => {
            setNudgeState(nudge.person.id);
            onOpenPerson(nudge.person.id);
          }}
          className="mt-5 handline text-[15px] text-ember hover:opacity-80 transition-opacity"
          style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
        >
          open {nudge.person.name}'s page
        </button>
      </div>
    </motion.aside>
  );
}

function computeNudge(people) {
  if (!people || people.length === 0) return null;

  // only on sundays — but for demo warmth, also show on monday if they missed it
  const today = new Date();
  const day = today.getDay();
  const showWindow = day === 0 || day === 1; // sun + mon grace
  if (!showWindow) return null;

  const state = getNudgeState();
  if (state.last_nudged_at && daysSince(state.last_nudged_at) < 6) {
    // only re-nudge after 6+ days
    return null;
  }

  // find the most overdue person (4+ weeks untouched)
  let mostOverdue = null;
  let maxWeeks = 0;
  for (const p of people) {
    const w = weeksSince(p.updated_at);
    if (w >= 4 && w > maxWeeks) {
      maxWeeks = w;
      mostOverdue = p;
    }
  }
  if (!mostOverdue) return null;

  const notes = getNotes(mostOverdue.id);
  const last = notes[0];
  let body = `you haven't written about ${mostOverdue.name} in ${maxWeeks} weeks.`;
  if (last) {
    const snippet = summariseNote(last.body);
    body += ` when you last did, ${snippet}. might be worth a check-in this week.`;
  } else {
    body += ' might be worth writing the first one this week.';
  }

  return { person: mostOverdue, body };
}

function summariseNote(body) {
  const clean = body.replace(/\s+/g, ' ').trim();
  const first = clean.split(/(?<=\.)\s/)[0] || clean;
  const snippet = first.length > 160 ? first.slice(0, 157) + '...' : first;
  return snippet.charAt(0).toLowerCase() + snippet.slice(1);
}
