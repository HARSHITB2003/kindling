import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSampleSuggestion, isSamplePersonId } from '../data/samples.js';
import { saveSuggestion } from '../storage/storage.js';

const OCCASIONS = [
  { key: 'birthday', label: 'birthday' },
  { key: 'anniversary', label: 'anniversary' },
  { key: 'just_because', label: 'just because' },
  { key: 'mothers_day', label: "mother's day" },
  { key: 'when_i_visit', label: 'when i visit' },
  { key: 'other', label: 'other...' },
];

export default function AskPanel({ person, onClose }) {
  const [occasion, setOccasion] = useState('just_because');
  const [constraints, setConstraints] = useState('');
  const [phase, setPhase] = useState('input'); // input | loading | result
  const [result, setResult] = useState(null);
  const [savedFlag, setSavedFlag] = useState(false);

  const isSample = isSamplePersonId(person.id);

  const runAsk = () => {
    setPhase('loading');
    // 2.8s pencil animation, then reveal
    setTimeout(() => {
      if (isSample) {
        const r = getSampleSuggestion(person.id, occasion) ||
          getSampleSuggestion(person.id, 'default');
        setResult(r);
      } else {
        setResult(null); // placeholder: no local ai
      }
      setPhase('result');
    }, 2800);
  };

  const resetToInput = () => {
    setPhase('input');
    setResult(null);
    setSavedFlag(false);
  };

  const handleSave = () => {
    if (!result) return;
    saveSuggestion(person.id, {
      occasion,
      constraints: constraints.trim() || null,
      result,
    });
    setSavedFlag(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-6 mb-14 py-10 px-6 sm:px-10"
      style={{
        background: 'var(--color-cream)',
        borderTop: '1px solid var(--color-linen)',
        borderBottom: '1px solid var(--color-linen)',
      }}
    >
      <AnimatePresence mode="wait">
        {phase === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3
              className="text-[22px] text-indigo-ink"
              style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
            >
              what's the occasion?
            </h3>

            <div className="mt-5 flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <button
                  key={o.key}
                  onClick={() => setOccasion(o.key)}
                  className="occ-pill px-4 py-2 text-[15px] rounded-[2px]"
                  style={{
                    fontFamily: 'var(--font-fraunces)',
                    background:
                      occasion === o.key
                        ? 'var(--color-ember)'
                        : 'var(--color-linen)',
                    color:
                      occasion === o.key
                        ? 'var(--color-paper)'
                        : 'var(--color-indigo-ink)',
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <label
                className="block text-[11px] uppercase tracking-[0.15em] text-pencil mb-3"
                style={{ fontFamily: 'var(--font-plex-mono)' }}
              >
                any constraints? <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="budget, timing, must be posted, must be something i can make."
                rows={2}
                className="w-full bg-transparent text-[17px] text-indigo-ink placeholder:text-faded leading-[1.6] pb-3 border-0 border-b border-dashed border-linen focus:border-indigo-soft transition-colors"
                style={{ fontFamily: 'var(--font-literata)' }}
              />
            </div>

            <div className="mt-8 flex items-center gap-6">
              <button
                onClick={runAsk}
                className="handline text-[18px] text-indigo-ink hover:opacity-80 transition-opacity"
                style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
              >
                ask kindling
              </button>
              <button
                onClick={onClose}
                className="text-[14px] text-pencil hover:text-indigo-ink transition-colors"
                style={{ fontFamily: 'var(--font-fraunces)' }}
              >
                cancel
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-6"
          >
            <p
              className="text-[16px] text-indigo-soft italic"
              style={{ fontFamily: 'var(--font-plex-serif)' }}
            >
              kindling is reading {person.name}'s notebook...
            </p>
            <svg
              viewBox="0 0 600 10"
              className="mt-6 w-full h-3 pencil-draw"
              preserveAspectRatio="none"
            >
              <path
                d="M 2 5 C 60 2 120 8 180 4 C 240 1 300 8 360 4 C 420 1 480 8 540 4 C 570 3 598 6 598 6"
                stroke="var(--color-olive)"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {result ? (
              <Result
                result={result}
                savedFlag={savedFlag}
                onSave={handleSave}
                onAskAgain={resetToInput}
                onClose={onClose}
              />
            ) : (
              <NoAIForCustom onClose={onClose} onBack={resetToInput} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function Result({ result, savedFlag, onSave, onAskAgain, onClose }) {
  return (
    <div>
      <h3
        className="text-[24px] text-indigo-ink"
        style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
      >
        {result.three_ideas.length === 3
          ? 'three ideas. in order of strength.'
          : `${numberWord(result.three_ideas.length)} ideas. the notebook is still thin — take these lightly.`}
      </h3>

      <hr className="rule-thin my-6" style={{ width: '60px' }} />

      <ol className="space-y-10">
        {result.three_ideas.map((idea, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.4, duration: 0.4 }}
            className="grid grid-cols-[40px_1fr] gap-x-5"
          >
            <span
              className="text-[14px] text-pencil pt-1"
              style={{ fontFamily: 'var(--font-plex-mono)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h4
                className="text-[21px] text-indigo-ink leading-[1.3]"
                style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
              >
                {idea.title}
              </h4>
              <p
                className="mt-3 text-indigo-soft"
                style={{
                  fontFamily: 'var(--font-literata)',
                  fontSize: '17px',
                  lineHeight: 1.7,
                }}
              >
                {idea.reasoning}
              </p>
              {idea.cost && (
                <p
                  className="mt-2 text-[12px] uppercase tracking-[0.15em] text-pencil"
                  style={{ fontFamily: 'var(--font-plex-mono)' }}
                >
                  {idea.cost}
                </p>
              )}
            </div>
          </motion.li>
        ))}
      </ol>

      {result.do_not_get_them && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 + result.three_ideas.length * 0.4, duration: 0.4 }}
          className="mt-12"
        >
          <hr className="rule-thin mb-6" style={{ width: '60px' }} />
          <p
            className="text-[16px] italic text-ember leading-[1.6]"
            style={{ fontFamily: 'var(--font-fraunces)' }}
          >
            {result.do_not_get_them}
          </p>
        </motion.div>
      )}

      {result.one_sentence_verdict && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + result.three_ideas.length * 0.4, duration: 0.5 }}
          className="mt-8 text-[15px] text-pencil italic"
          style={{ fontFamily: 'var(--font-plex-serif)' }}
        >
          ↳ {result.one_sentence_verdict}
        </motion.p>
      )}

      <hr className="rule-thin my-10" />

      <div className="flex flex-wrap gap-6 items-center">
        <button
          onClick={onSave}
          disabled={savedFlag}
          className="text-[15px] text-indigo-ink hover:text-ember transition-colors disabled:text-pencil disabled:cursor-default"
          style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
        >
          {savedFlag ? 'saved to notebook.' : 'save these ideas'}
        </button>
        <button
          onClick={onAskAgain}
          className="text-[15px] text-indigo-soft hover:text-indigo-ink transition-colors"
          style={{ fontFamily: 'var(--font-fraunces)' }}
        >
          ask again
        </button>
        <button
          onClick={onClose}
          className="text-[15px] text-pencil hover:text-indigo-ink transition-colors ml-auto"
          style={{ fontFamily: 'var(--font-fraunces)' }}
        >
          close
        </button>
      </div>
    </div>
  );
}

function NoAIForCustom({ onClose, onBack }) {
  return (
    <div>
      <h3
        className="text-[22px] text-indigo-ink"
        style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
      >
        this notebook is yours alone.
      </h3>
      <p
        className="mt-4 text-[17px] text-indigo-soft leading-[1.7] max-w-md"
        style={{ fontFamily: 'var(--font-literata)' }}
      >
        kindling doesn't send your personal notes to any server. in this build,
        gift suggestions are only pre-computed for the sample notebooks — so the
        demo works without an api key, and your real notebook stays private.
      </p>
      <p
        className="mt-4 text-[15px] text-pencil italic leading-[1.6] max-w-md"
        style={{ fontFamily: 'var(--font-plex-serif)' }}
      >
        open a sample notebook (maa, riya, james) on the shelf to see the full
        ask flow end-to-end.
      </p>
      <div className="mt-8 flex items-center gap-6">
        <button
          onClick={onBack}
          className="text-[15px] text-indigo-soft hover:text-indigo-ink transition-colors"
          style={{ fontFamily: 'var(--font-fraunces)' }}
        >
          back
        </button>
        <button
          onClick={onClose}
          className="text-[15px] text-pencil hover:text-indigo-ink transition-colors"
          style={{ fontFamily: 'var(--font-fraunces)' }}
        >
          close
        </button>
      </div>
    </div>
  );
}

function numberWord(n) {
  return ['zero', 'one', 'two', 'three', 'four', 'five'][n] || String(n);
}
