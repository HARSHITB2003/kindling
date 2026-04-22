import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPeople, addPerson, getNotes, loadSample } from '../storage/storage.js';
import { relativeTime, weeksSince } from '../utils/dates.js';
import { samples, isSamplePersonId } from '../data/samples.js';
import SundayNudge from './SundayNudge.jsx';
import PrivacyFooter from './PrivacyFooter.jsx';
import Spine from './Spine.jsx';

export default function Shelf({ onOpenPerson, refreshKey, onRefresh }) {
  const [addingPerson, setAddingPerson] = useState(false);
  const [newName, setNewName] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  const people = getPeople();

  const handleAdd = (e) => {
    e?.preventDefault();
    if (!newName.trim()) return;
    const p = addPerson(newName);
    setNewName('');
    setAddingPerson(false);
    onRefresh();
    if (p) onOpenPerson(p.id);
  };

  const handleLoadSample = (sampleId) => {
    const s = samples.find((x) => x.person.id === sampleId);
    if (!s) return;
    loadSample(s.person, s.notes);
    onRefresh();
    onOpenPerson(s.person.id);
  };

  const hovered = people.find((p) => p.id === hoveredId);

  if (people.length === 0) {
    return (
      <div className="min-h-screen px-6 pt-16 sm:pt-24 pb-24 paper-grain">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-[48px] sm:text-[64px] leading-[1.05] text-indigo-ink"
            style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 400 }}
          >
            kindling.
          </h1>

          <div className="mt-8 max-w-md">
            <p
              className="text-[18px] sm:text-[20px] text-indigo-soft leading-[1.55]"
              style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 400 }}
            >
              a quiet notebook for the people you love. write small notes
              when they come up. when it's time to give them a gift, kindling
              remembers what you noticed.
            </p>
          </div>

          <div className="mt-10">
            {addingPerson ? (
              <AddPersonForm
                name={newName}
                setName={setNewName}
                onSubmit={handleAdd}
                onCancel={() => {
                  setAddingPerson(false);
                  setNewName('');
                }}
              />
            ) : (
              <button
                onClick={() => setAddingPerson(true)}
                className="handline text-[20px] text-indigo-ink hover:opacity-80 transition-opacity"
                style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
              >
                add your first person
              </button>
            )}
          </div>

          <div className="mt-24">
            <p
              className="text-[12px] uppercase tracking-[0.15em] text-pencil mb-2"
              style={{ fontFamily: 'var(--font-plex-mono)' }}
            >
              or open a sample volume
            </p>
            <p
              className="text-[13px] text-pencil italic mb-8"
              style={{ fontFamily: 'var(--font-plex-serif)' }}
            >
              (pre-filled notebooks so you can see the whole flow in under a minute.)
            </p>

            <Bookshelf>
              {samples.map((s, i) => (
                <Spine
                  key={s.person.id}
                  person={s.person}
                  noteCount={s.notes.length}
                  overdue={false}
                  index={i}
                  onClick={() => handleLoadSample(s.person.id)}
                />
              ))}
            </Bookshelf>

            <ul className="mt-8 space-y-3 max-w-md">
              {samples.map((s) => (
                <li
                  key={s.person.id}
                  className="flex items-baseline gap-3"
                >
                  <span
                    className="text-[18px] text-indigo-ink"
                    style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
                  >
                    {s.person.name}
                  </span>
                  <span
                    className="text-[13px] text-pencil italic"
                    style={{ fontFamily: 'var(--font-plex-serif)' }}
                  >
                    — {s.person.sample_blurb}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <PrivacyFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-8 pt-12 sm:pt-16 pb-16 paper-grain">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-end justify-between flex-wrap gap-y-4 px-2 sm:px-4">
          <h1
            className="text-[40px] sm:text-[48px] leading-none text-indigo-ink"
            style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 400 }}
          >
            kindling.
          </h1>
          {!addingPerson && (
            <button
              onClick={() => setAddingPerson(true)}
              className="text-[15px] text-indigo-soft hover:text-indigo-ink transition-colors"
              style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
            >
              + add a volume
            </button>
          )}
        </header>

        <p
          className="mt-3 text-[13px] uppercase tracking-[0.15em] text-pencil px-2 sm:px-4"
          style={{ fontFamily: 'var(--font-plex-mono)' }}
        >
          your shelf · {people.length} {people.length === 1 ? 'volume' : 'volumes'}
        </p>

        <div className="mt-6 px-2 sm:px-4">
          <SundayNudge people={people} onOpenPerson={onOpenPerson} refreshKey={refreshKey} />
        </div>

        <AnimatePresence>
          {addingPerson && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-8 px-2 sm:px-4"
            >
              <AddPersonForm
                name={newName}
                setName={setNewName}
                onSubmit={handleAdd}
                onCancel={() => {
                  setAddingPerson(false);
                  setNewName('');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* the bookshelf */}
        <div className="mt-8">
          <Bookshelf>
            {people.map((p, i) => {
              const notes = getNotes(p.id);
              const overdue = weeksSince(p.updated_at) >= 6;
              return (
                <div
                  key={p.id}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="h-full"
                >
                  <Spine
                    person={p}
                    noteCount={notes.length}
                    overdue={overdue}
                    index={i}
                    onClick={() => onOpenPerson(p.id)}
                  />
                </div>
              );
            })}
          </Bookshelf>
        </div>

        {/* hovered-book caption — like the placard under a library book */}
        <div className="mt-10 px-2 sm:px-4 min-h-[60px]">
          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span
                    className="text-[22px] sm:text-[26px] text-indigo-ink"
                    style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
                  >
                    {hovered.name}
                  </span>
                  {isSamplePersonId(hovered.id) && (
                    <span
                      className="text-[11px] uppercase tracking-[0.15em] text-pencil"
                      style={{ fontFamily: 'var(--font-plex-mono)' }}
                    >
                      sample
                    </span>
                  )}
                  <span
                    className="text-[13px] text-pencil"
                    style={{ fontFamily: 'var(--font-plex-mono)' }}
                  >
                    {getNotes(hovered.id).length} notes · last: {relativeTime(hovered.updated_at)}
                  </span>
                  {weeksSince(hovered.updated_at) >= 6 && (
                    <span
                      className="text-[12px] text-ember italic"
                      style={{ fontFamily: 'var(--font-plex-serif)' }}
                    >
                      the thread is going cold.
                    </span>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="caption"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="text-[13px] text-pencil italic"
                style={{ fontFamily: 'var(--font-plex-serif)' }}
              >
                hover a spine to read its title. click to open.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <PrivacyFooter />
    </div>
  );
}

function Bookshelf({ children }) {
  return (
    <div className="relative">
      {/* the books */}
      <div
        className="relative flex items-end gap-[6px] overflow-x-auto subtle-scroll pb-2"
        style={{ height: 'min(360px, 48vh)', minHeight: '300px' }}
      >
        {/* subtle paper-back behind the books */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 bottom-[22px] pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(228,220,201,0.18) 0%, rgba(228,220,201,0.45) 100%)',
          }}
        />
        <div className="relative flex items-end gap-[6px] px-2 sm:px-4 h-full">
          {children}
        </div>
      </div>

      {/* the wooden shelf line */}
      <div className="relative">
        <div
          className="h-[10px] w-full"
          style={{
            background:
              'linear-gradient(180deg, #8B6F47 0%, #6B5432 48%, #4E3B22 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 10px -4px rgba(42,37,64,0.3)',
          }}
        />
        <div
          className="h-[4px] w-full"
          style={{ background: 'linear-gradient(180deg, #3A2B18 0%, transparent 100%)' }}
        />
      </div>
    </div>
  );
}

function AddPersonForm({ name, setName, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="max-w-md">
      <label
        className="block text-[12px] uppercase tracking-[0.15em] text-pencil mb-3"
        style={{ fontFamily: 'var(--font-plex-mono)' }}
      >
        who is this volume for?
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        placeholder="a name."
        className="w-full bg-transparent border-0 border-b border-linen pb-2 text-[28px] text-indigo-ink placeholder:text-faded focus:border-indigo-soft transition-colors"
        style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
      />
      <div className="mt-6 flex items-center gap-6">
        <button
          type="submit"
          disabled={!name.trim()}
          className="handline text-[16px] text-indigo-ink disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
        >
          start the notebook
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-[14px] text-pencil hover:text-indigo-ink transition-colors"
          style={{ fontFamily: 'var(--font-fraunces)' }}
        >
          cancel
        </button>
      </div>
    </form>
  );
}
