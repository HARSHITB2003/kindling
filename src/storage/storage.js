// every other social app rewards you for posting.
// kindling rewards you for paying attention to someone else.
// — this file: everything local, nothing uploaded.

const KEY_PEOPLE = 'kindling:people';
const KEY_NOTES = (personId) => `kindling:notes:${personId}`;
const KEY_NUDGE = 'kindling:nudge_state';
const KEY_SAVED = (personId) => `kindling:saved_suggestions:${personId}`;
const KEY_SAMPLES_LOADED = 'kindling:samples_loaded';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or private mode — silent by design
  }
}

function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

function id(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

export function getPeople() {
  return read(KEY_PEOPLE, []);
}

export function getPerson(personId) {
  return getPeople().find((p) => p.id === personId) || null;
}

export function addPerson(name) {
  const clean = name.trim();
  if (!clean) return null;
  const people = getPeople();
  const now = new Date().toISOString();
  const person = {
    id: id('person'),
    name: clean,
    created_at: now,
    updated_at: now,
    is_sample: false,
  };
  people.push(person);
  write(KEY_PEOPLE, people);
  return person;
}

export function deletePerson(personId) {
  const people = getPeople().filter((p) => p.id !== personId);
  write(KEY_PEOPLE, people);
  remove(KEY_NOTES(personId));
  remove(KEY_SAVED(personId));
}

export function touchPerson(personId) {
  const people = getPeople();
  const idx = people.findIndex((p) => p.id === personId);
  if (idx === -1) return;
  people[idx].updated_at = new Date().toISOString();
  write(KEY_PEOPLE, people);
}

export function getNotes(personId) {
  return read(KEY_NOTES(personId), []);
}

export function addNote(personId, { body, occasion }) {
  const clean = (body || '').trim();
  if (!clean) return null;
  const notes = getNotes(personId);
  const note = {
    id: id('note'),
    created_at: new Date().toISOString(),
    body: clean,
    occasion: (occasion || '').trim() || null,
    margin_note: null,
  };
  notes.unshift(note);
  write(KEY_NOTES(personId), notes);
  touchPerson(personId);
  return note;
}

export function updateNote(personId, noteId, patch) {
  const notes = getNotes(personId);
  const idx = notes.findIndex((n) => n.id === noteId);
  if (idx === -1) return;
  notes[idx] = { ...notes[idx], ...patch };
  write(KEY_NOTES(personId), notes);
}

export function deleteNote(personId, noteId) {
  const notes = getNotes(personId).filter((n) => n.id !== noteId);
  write(KEY_NOTES(personId), notes);
}

export function getNudgeState() {
  return read(KEY_NUDGE, { last_nudged_person: null, last_nudged_at: null });
}

export function setNudgeState(personId) {
  write(KEY_NUDGE, {
    last_nudged_person: personId,
    last_nudged_at: new Date().toISOString(),
  });
}

export function getSavedSuggestions(personId) {
  return read(KEY_SAVED(personId), []);
}

export function saveSuggestion(personId, suggestion) {
  const saved = getSavedSuggestions(personId);
  saved.unshift({
    id: id('sugg'),
    created_at: new Date().toISOString(),
    ...suggestion,
  });
  write(KEY_SAVED(personId), saved);
}

export function haveSamplesLoaded() {
  return read(KEY_SAMPLES_LOADED, false);
}

export function markSamplesLoaded() {
  write(KEY_SAMPLES_LOADED, true);
}

export function loadSample(samplePerson, sampleNotes) {
  const people = getPeople();
  if (people.some((p) => p.id === samplePerson.id)) return;
  people.push(samplePerson);
  write(KEY_PEOPLE, people);
  write(KEY_NOTES(samplePerson.id), sampleNotes);
}

export function wipeEverything() {
  const people = getPeople();
  people.forEach((p) => {
    remove(KEY_NOTES(p.id));
    remove(KEY_SAVED(p.id));
  });
  remove(KEY_PEOPLE);
  remove(KEY_NUDGE);
  remove(KEY_SAMPLES_LOADED);
}
