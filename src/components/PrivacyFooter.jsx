export default function PrivacyFooter() {
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
    </footer>
  );
}
