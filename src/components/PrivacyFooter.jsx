import { wipeEverything } from '../storage/storage.js';

export default function PrivacyFooter() {
  const onReset = () => {
    if (
      confirm(
        'wipe every volume and start fresh? the three samples will be re-seeded the next time you load the site. this cannot be undone.'
      )
    ) {
      wipeEverything();
      window.location.hash = '';
      window.location.reload();
    }
  };

  return (
    <footer className="mt-32 mb-12 px-6 max-w-xl mx-auto">
      <p
        className="text-[11px] text-pencil leading-relaxed"
        style={{ fontFamily: 'var(--font-plex-mono)' }}
      >
        kindling lives in this browser only. notes stay local. nothing is
        synced, uploaded, or analysed by anyone but you. clear your browser
        data and the notebook is gone. this is intentional.
      </p>
      <p
        className="mt-3 text-[11px] text-pencil"
        style={{ fontFamily: 'var(--font-plex-mono)' }}
      >
        <button
          type="button"
          onClick={onReset}
          className="underline decoration-dotted underline-offset-[3px] hover:text-ember transition-colors"
          style={{ fontFamily: 'var(--font-plex-mono)' }}
        >
          reset demo
        </button>
        <span className="mx-2">·</span>
        <a
          href="https://github.com/HARSHITB2003/kindling"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-dotted underline-offset-[3px] hover:text-ember transition-colors"
        >
          source on github
        </a>
      </p>
    </footer>
  );
}
