// every other social app rewards you for posting.
// kindling rewards you for paying attention to someone else.
import { useState, useEffect } from 'react';
import Shelf from './components/Shelf.jsx';
import PersonPage from './components/PersonPage.jsx';
import {
  haveSamplesLoaded,
  markSamplesLoaded,
  loadSample,
  getPeople,
} from './storage/storage.js';
import { samples } from './data/samples.js';

export default function App() {
  const [view, setView] = useState({ screen: 'shelf', personId: null });
  const [refreshKey, setRefreshKey] = useState(0);
  const [bootReady, setBootReady] = useState(false);
  const refresh = () => setRefreshKey((k) => k + 1);

  // first-visit seed: pre-load the three sample volumes so reviewers land
  // on a populated shelf. only runs once — tracked by haveSamplesLoaded().
  useEffect(() => {
    if (!haveSamplesLoaded() && getPeople().length === 0) {
      samples.forEach((s) => loadSample(s.person, s.notes));
      markSamplesLoaded();
    }
    setBootReady(true);
  }, []);

  // read hash on load for deep-links (optional, light)
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('person/')) {
        const id = hash.slice('person/'.length);
        if (id) setView({ screen: 'person', personId: id });
      } else {
        setView({ screen: 'shelf', personId: null });
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  if (!bootReady) return null;

  const goPerson = (id) => {
    window.location.hash = `#/person/${id}`;
    setView({ screen: 'person', personId: id });
    window.scrollTo({ top: 0 });
  };

  const goShelf = () => {
    window.location.hash = '';
    setView({ screen: 'shelf', personId: null });
    window.scrollTo({ top: 0 });
  };

  if (view.screen === 'person' && view.personId) {
    return (
      <PersonPage
        personId={view.personId}
        onBack={goShelf}
        onRefresh={refresh}
        refreshKey={refreshKey}
      />
    );
  }

  return (
    <Shelf
      onOpenPerson={goPerson}
      onRefresh={refresh}
      refreshKey={refreshKey}
    />
  );
}
