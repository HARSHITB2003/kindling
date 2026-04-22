import { motion } from 'framer-motion';
import { formatEntryHeader } from '../utils/dates.js';

export default function NoteEntry({ note, onDelete }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-3 md:gap-x-10 mb-16 group"
    >
      <aside className="hidden md:block pt-10">
        {note.margin_note && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[15px] text-olive italic leading-[1.55] pr-4"
            style={{
              fontFamily: 'var(--font-plex-serif)',
              transform: 'rotate(-0.4deg)',
            }}
          >
            <span aria-hidden className="inline-block mr-1 text-olive/60">✎</span>
            {note.margin_note}
          </motion.p>
        )}
      </aside>

      <div className="relative">
        <header className="flex items-baseline justify-between gap-4 mb-3">
          <div className="flex items-baseline gap-3">
            {/* stamp-like date */}
            <span
              className="text-[11px] uppercase tracking-[0.2em] text-pencil"
              style={{
                fontFamily: 'var(--font-plex-mono)',
                border: '1px solid rgba(111,106,92,0.3)',
                padding: '4px 9px',
                borderRadius: '2px',
                transform: 'rotate(-0.8deg)',
                display: 'inline-block',
              }}
            >
              {formatEntryHeader(note.created_at)}
            </span>
          </div>
          <button
            onClick={() => {
              if (confirm('delete this entry?')) onDelete(note.id);
            }}
            aria-label="delete entry"
            className="opacity-0 group-hover:opacity-60 hover:opacity-100 text-[11px] uppercase tracking-[0.15em] text-pencil hover:text-ember transition-opacity"
            style={{ fontFamily: 'var(--font-plex-mono)' }}
          >
            delete
          </button>
        </header>

        <p
          className="text-indigo-ink whitespace-pre-wrap mt-4"
          style={{
            fontFamily: 'var(--font-literata)',
            fontSize: '18px',
            lineHeight: 1.75,
          }}
        >
          {note.body}
        </p>

        {note.occasion && (
          <p
            className="mt-3 text-[13px] text-pencil italic"
            style={{ fontFamily: 'var(--font-plex-serif)' }}
          >
            (occasion: {note.occasion})
          </p>
        )}

        {note.margin_note && (
          <p
            className="md:hidden mt-5 text-[14px] text-olive italic leading-[1.55] pl-4 border-l border-olive/30"
            style={{ fontFamily: 'var(--font-plex-serif)' }}
          >
            <span aria-hidden className="mr-1">✎</span>
            {note.margin_note}
          </p>
        )}

        {/* decorative fleuron separating entries */}
        <div className="mt-14 flex items-center gap-4 opacity-50">
          <div className="h-[1px] w-6" style={{ background: 'var(--color-linen)' }} />
          <span
            className="text-[11px] text-pencil"
            style={{ fontFamily: 'var(--font-fraunces)' }}
          >
            ·
          </span>
          <div className="h-[1px] flex-1 max-w-[160px]" style={{ background: 'var(--color-linen)' }} />
        </div>
      </div>
    </motion.article>
  );
}
