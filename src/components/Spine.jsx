import { motion } from 'framer-motion';

// deterministic palette of warm, library-leather hues
const SPINE_COLORS = [
  { bg: '#6F3B33', ink: '#F3E6D4', accent: '#A88553' }, // oxblood
  { bg: '#3E5B4F', ink: '#EDE3CA', accent: '#A88553' }, // forest
  { bg: '#4A4370', ink: '#E8DEC8', accent: '#C4A65E' }, // indigo cloth
  { bg: '#8B6F3A', ink: '#F3EADA', accent: '#5E4A27' }, // mustard
  { bg: '#613D52', ink: '#EFE3D4', accent: '#A88553' }, // plum
  { bg: '#2F4856', ink: '#EFE3D2', accent: '#C4A65E' }, // teal leather
  { bg: '#76543A', ink: '#F3E6D4', accent: '#C4A65E' }, // walnut
  { bg: '#4E3B28', ink: '#EDD9B4', accent: '#A88553' }, // dark tan
];

function hashToIndex(str, mod) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h) % mod;
}

export default function Spine({ person, noteCount, overdue, onClick, index = 0 }) {
  const color = SPINE_COLORS[hashToIndex(person.id, SPINE_COLORS.length)];
  // tiny variance so books don't look identical
  const heightPct = 92 + (hashToIndex(person.id + 'h', 7)); // 92–98%
  const widthPx = 56 + (hashToIndex(person.id + 'w', 3) * 6); // 56/62/68

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -10, transition: { duration: 0.25 } }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: 'easeOut' }}
      className="relative flex-shrink-0 group cursor-pointer"
      style={{ height: `${heightPct}%`, width: `${widthPx}px` }}
      aria-label={`open ${person.name}'s notebook`}
    >
      {/* the book itself */}
      <div
        className="relative h-full w-full shadow-[2px_4px_10px_rgba(42,37,64,0.18)] overflow-hidden"
        style={{
          background: `linear-gradient(90deg, ${color.bg} 0%, ${shade(color.bg, -12)} 12%, ${color.bg} 22%, ${color.bg} 78%, ${shade(color.bg, -8)} 92%, ${shade(color.bg, -18)} 100%)`,
          borderTop: `2px solid ${shade(color.bg, -20)}`,
          borderBottom: `2px solid ${shade(color.bg, -20)}`,
        }}
      >
        {/* two thin ornamental bands near top and bottom */}
        <div
          className="absolute left-0 right-0"
          style={{ top: '14%', height: '1px', background: color.accent, opacity: 0.7 }}
        />
        <div
          className="absolute left-0 right-0"
          style={{ top: '16%', height: '1px', background: color.accent, opacity: 0.4 }}
        />
        <div
          className="absolute left-0 right-0"
          style={{ bottom: '14%', height: '1px', background: color.accent, opacity: 0.7 }}
        />
        <div
          className="absolute left-0 right-0"
          style={{ bottom: '16%', height: '1px', background: color.accent, opacity: 0.4 }}
        />

        {/* vertical title */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          <span
            className="tracking-[0.12em] text-center px-2"
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 500,
              fontSize: '18px',
              color: color.ink,
              maxHeight: '60%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {person.name}
          </span>
        </div>

        {/* note count stamped at the bottom */}
        <div
          className="absolute left-0 right-0 bottom-[3%] text-center"
          style={{
            fontFamily: 'var(--font-plex-mono)',
            fontSize: '9px',
            color: color.accent,
            letterSpacing: '0.15em',
          }}
        >
          {String(noteCount).padStart(2, '0')}
        </div>

        {/* overdue mark — a tiny red ribbon/bookmark */}
        {overdue && (
          <div
            className="absolute top-0 right-[18%] w-[6px] h-[26px]"
            style={{
              background: '#A84444',
              boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
            }}
          />
        )}
      </div>
    </motion.button>
  );
}

// darken a hex color by pct
function shade(hex, pct) {
  const n = hex.replace('#', '');
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + (c * pct) / 100)));
  const hx = (v) => v.toString(16).padStart(2, '0');
  return `#${hx(f(r))}${hx(f(g))}${hx(f(b))}`;
}
