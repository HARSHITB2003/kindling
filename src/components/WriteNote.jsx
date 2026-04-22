import { useState, useRef, useEffect } from 'react';

export default function WriteNote({ personName, onSave }) {
  const [body, setBody] = useState('');
  const [occasion, setOccasion] = useState('');
  const [justSaved, setJustSaved] = useState(false);
  const textareaRef = useRef(null);

  const autosize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.max(el.scrollHeight, 90) + 'px';
  };

  useEffect(autosize, [body]);

  const handleSave = () => {
    if (!body.trim()) return;
    onSave({ body, occasion });
    setBody('');
    setOccasion('');
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  };

  return (
    <section className="mb-16">
      <label
        className="block text-[11px] uppercase tracking-[0.15em] text-pencil mb-3"
        style={{ fontFamily: 'var(--font-plex-mono)' }}
      >
        write a note
      </label>

      <textarea
        ref={textareaRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={`what did ${personName} mention today?`}
        rows={3}
        className="w-full bg-transparent text-indigo-ink placeholder:text-faded leading-[1.7] pb-4 border-0 border-b border-dashed border-linen focus:border-indigo-soft transition-colors"
        style={{
          fontFamily: 'var(--font-literata)',
          fontSize: '18px',
          minHeight: '90px',
        }}
      />

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-5">
        <button
          onClick={handleSave}
          disabled={!body.trim()}
          className="handline text-[16px] text-indigo-ink disabled:opacity-40 disabled:cursor-not-allowed self-start"
          style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
        >
          save note
        </button>

        <div className="flex-1 flex items-baseline gap-3">
          <span
            className="text-[11px] uppercase tracking-[0.15em] text-pencil whitespace-nowrap"
            style={{ fontFamily: 'var(--font-plex-mono)' }}
          >
            occasion?
          </span>
          <input
            type="text"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            placeholder="optional — phone call, visit, memory."
            className="flex-1 bg-transparent border-0 border-b border-dashed border-linen pb-1 text-[15px] text-indigo-soft placeholder:text-faded focus:border-indigo-soft transition-colors"
            style={{ fontFamily: 'var(--font-literata)' }}
          />
        </div>
      </div>

      {justSaved && (
        <p
          className="mt-3 text-[13px] text-olive italic"
          style={{ fontFamily: 'var(--font-plex-serif)' }}
        >
          saved. a small thing remembered.
        </p>
      )}
    </section>
  );
}
