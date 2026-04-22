import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Tour({ onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(42, 37, 64, 0.75)' }}
      onClick={onClose}
      role="dialog"
      aria-label="a 20-second tour of kindling"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-5 sm:p-6"
          style={{
            background: 'var(--color-paper)',
            borderRadius: '2px',
            boxShadow:
              '0 2px 6px rgba(0,0,0,0.18), 0 30px 80px -10px rgba(0,0,0,0.55)',
          }}
        >
          <header className="flex items-baseline justify-between gap-4 mb-4">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-pencil"
                style={{ fontFamily: 'var(--font-plex-mono)' }}
              >
                a 20-second tour
              </span>
              <h2
                className="mt-1 text-[24px] sm:text-[28px] text-indigo-ink leading-none"
                style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
              >
                how kindling works.
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="close"
              className="text-[12px] uppercase tracking-[0.15em] text-pencil hover:text-ember transition-colors"
              style={{ fontFamily: 'var(--font-plex-mono)' }}
            >
              close  ×
            </button>
          </header>

          <div
            className="relative"
            style={{
              background: '#000',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <video
              src="/walkthrough.mp4"
              controls
              autoPlay
              playsInline
              muted
              loop
              preload="metadata"
              className="block w-full h-auto"
            />
          </div>

          <p
            className="mt-4 text-[14px] text-indigo-soft italic leading-[1.6]"
            style={{ fontFamily: 'var(--font-plex-serif)' }}
          >
            open a sample volume (maa, riya, james) from the shelf to try the
            full flow yourself — write-a-note, margin annotations, and the
            gift ask are all live.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
