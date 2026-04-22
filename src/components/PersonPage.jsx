import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getPerson,
  getNotes,
  addNote,
  deleteNote,
  deletePerson,
} from '../storage/storage.js';
import { formatPageStart } from '../utils/dates.js';
import { isSamplePersonId } from '../data/samples.js';
import WriteNote from './WriteNote.jsx';
import NoteEntry from './NoteEntry.jsx';
import AskPanel from './AskPanel.jsx';
import PrivacyFooter from './PrivacyFooter.jsx';

export default function PersonPage({ personId, onBack, onRefresh, refreshKey }) {
  const [asking, setAsking] = useState(false);
  const [localTick, setLocalTick] = useState(0);
  const bump = () => setLocalTick((t) => t + 1);

  const person = useMemo(() => getPerson(personId), [personId, refreshKey, localTick]);
  const notes = useMemo(() => getNotes(personId), [personId, refreshKey, localTick]);

  if (!person) {
    return (
      <div className="min-h-screen px-6 pt-24 pb-24">
        <div className="max-w-xl mx-auto">
          <button
            onClick={onBack}
            className="text-[13px] text-pencil hover:text-indigo-ink transition-colors"
            style={{ fontFamily: 'var(--font-plex-mono)' }}
          >
            ← back to shelf
          </button>
          <p className="mt-10 text-indigo-soft" style={{ fontFamily: 'var(--font-fraunces)' }}>
            that volume isn't on the shelf anymore.
          </p>
        </div>
      </div>
    );
  }

  const handleSave = ({ body, occasion }) => {
    addNote(personId, { body, occasion });
    bump();
    onRefresh();
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(personId, noteId);
    bump();
    onRefresh();
  };

  const handleDeletePerson = () => {
    if (
      confirm(
        `remove ${person.name} from the shelf? notes will be deleted. this cannot be undone.`
      )
    ) {
      deletePerson(personId);
      onRefresh();
      onBack();
    }
  };

  const initial = person.name.trim().charAt(0).toUpperCase();
  const isSample = isSamplePersonId(person.id);

  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          'radial-gradient(ellipse at top, #EBE0C9 0%, #DFD2B6 45%, #C9B893 100%)',
      }}
    >
      {/* subtle wood texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(88,60,30,0.08) 0px, rgba(88,60,30,0.08) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(0deg, rgba(88,60,30,0.06) 0px, rgba(88,60,30,0.06) 1px, transparent 1px, transparent 11px)",
        }}
      />

      <div className="relative px-3 sm:px-6 pt-6 sm:pt-10 pb-24 max-w-5xl mx-auto">
        <nav className="flex items-center justify-between px-2 mb-4">
          <button
            onClick={onBack}
            className="text-[13px] text-indigo-ink hover:text-ember transition-colors"
            style={{ fontFamily: 'var(--font-plex-mono)' }}
          >
            ← back to shelf
          </button>
          {!isSample && (
            <button
              onClick={handleDeletePerson}
              className="text-[12px] uppercase tracking-[0.15em] text-pencil hover:text-ember transition-colors"
              style={{ fontFamily: 'var(--font-plex-mono)' }}
            >
              remove
            </button>
          )}
        </nav>

        {/* the open book */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative mx-auto"
          style={{
            background: 'var(--color-paper)',
            boxShadow:
              '0 2px 4px rgba(42,37,64,0.08), 0 18px 50px -12px rgba(42,37,64,0.35), 0 40px 80px -30px rgba(42,37,64,0.25)',
            borderRadius: '2px',
          }}
        >
          {/* paper-grain */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none paper-grain"
          />

          {/* page-edge inner border (like the deckle of a book) */}
          <div
            aria-hidden
            className="absolute inset-[6px] pointer-events-none"
            style={{ border: '1px solid rgba(111,106,92,0.15)' }}
          />

          {/* center binding crease — desktop only, full height of book */}
          <div
            aria-hidden
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '40px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(111,106,92,0.0) 30%, rgba(111,106,92,0.18) 50%, rgba(111,106,92,0.0) 70%, transparent 100%)',
            }}
          />
          <div
            aria-hidden
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '1px',
              background:
                'linear-gradient(180deg, transparent 0%, rgba(111,106,92,0.35) 10%, rgba(111,106,92,0.35) 90%, transparent 100%)',
            }}
          />

          {/* ribbon bookmark */}
          <div
            aria-hidden
            className="absolute top-0 right-[14%] pointer-events-none"
            style={{
              width: '10px',
              height: '140px',
              background: 'linear-gradient(180deg, #A84444 0%, #7a2f2f 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%)',
            }}
          />

          {/* content area */}
          <div className="relative px-6 sm:px-12 md:px-16 py-14 sm:py-20">
            <header className="relative mb-12">
              {/* faded monogram */}
              <span
                aria-hidden
                className="absolute pointer-events-none select-none leading-none"
                style={{
                  top: '-40px',
                  right: '-8px',
                  fontFamily: 'var(--font-fraunces)',
                  fontWeight: 500,
                  fontSize: 'clamp(120px, 24vw, 220px)',
                  color: 'rgba(255,255,255,0.5)',
                  textShadow: '0 0 1px rgba(111,106,92,0.08)',
                }}
              >
                {initial}
              </span>

              <p
                className="text-[11px] uppercase tracking-[0.2em] text-pencil mb-3 relative"
                style={{ fontFamily: 'var(--font-plex-mono)' }}
              >
                volume · commonplace book
              </p>
              <h1
                className="text-[44px] sm:text-[56px] text-indigo-ink leading-none relative"
                style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
              >
                {person.name}
              </h1>
              <p
                className="mt-4 text-[12px] uppercase tracking-[0.15em] text-pencil relative"
                style={{ fontFamily: 'var(--font-plex-mono)' }}
              >
                {notes.length} {notes.length === 1 ? 'entry' : 'entries'} · opened{' '}
                {formatPageStart(person.created_at)}
                {isSample && <span className="ml-3 text-ember">sample</span>}
              </p>

              {/* decorative rule — flourish */}
              <div className="mt-7 flex items-center gap-3 relative">
                <div className="h-[1px] w-[30px]" style={{ background: 'var(--color-linen)' }} />
                <span
                  className="text-[12px] text-pencil"
                  style={{ fontFamily: 'var(--font-fraunces)' }}
                >
                  ✦
                </span>
                <div className="h-[1px] flex-1 max-w-[200px]" style={{ background: 'var(--color-linen)' }} />
              </div>
            </header>

            {!asking && (
              <div className="mb-12">
                <button
                  onClick={() => setAsking(true)}
                  className="handline text-[18px] text-indigo-ink hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
                >
                  ask kindling for a gift idea
                </button>
              </div>
            )}

            <AnimatePresence>
              {asking && (
                <AskPanel
                  person={person}
                  onClose={() => {
                    setAsking(false);
                    bump();
                  }}
                />
              )}
            </AnimatePresence>

            <motion.div
              animate={{ opacity: asking ? 0.3 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: asking ? 'none' : 'auto' }}
            >
              {!isSample && <WriteNote personName={person.name} onSave={handleSave} />}

              {notes.length === 0 ? (
                <EmptyPersonState personName={person.name} />
              ) : (
                <>
                  <p
                    className="mb-10 text-[11px] uppercase tracking-[0.2em] text-pencil"
                    style={{ fontFamily: 'var(--font-plex-mono)' }}
                  >
                    entries · most recent first
                  </p>
                  <div>
                    {notes.map((n) => (
                      <NoteEntry key={n.id} note={n} onDelete={handleDeleteNote} />
                    ))}
                  </div>
                  <div className="mt-20 flex items-center justify-center">
                    <span
                      className="text-[12px] text-pencil italic"
                      style={{ fontFamily: 'var(--font-plex-serif)' }}
                    >
                      — end of current entries —
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>

        <PrivacyFooter />
      </div>
    </div>
  );
}

function EmptyPersonState({ personName }) {
  return (
    <div className="py-8">
      <p
        className="text-[17px] text-indigo-soft leading-[1.7] max-w-lg italic"
        style={{ fontFamily: 'var(--font-plex-serif)' }}
      >
        this volume is empty. write the first small thing you notice about{' '}
        {personName}. a phone call. something she said. what she's worried
        about. what she's excited about. small things add up.
      </p>
    </div>
  );
}
