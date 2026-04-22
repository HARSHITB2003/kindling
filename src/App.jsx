// every other social app rewards you for posting.
// kindling rewards you for paying attention to someone else.
import { useState, useEffect } from 'react';
import Shelf from './components/Shelf.jsx';
import PersonPage from './components/PersonPage.jsx';

export default function App() {
  const [view, setView] = useState({ screen: 'shelf', personId: null });
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey((k) => k + 1);

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
