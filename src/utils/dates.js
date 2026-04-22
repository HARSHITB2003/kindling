const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

const MONTHS_SHORT = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
];

export function formatEntryHeader(isoOrDate) {
  const d = new Date(isoOrDate);
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`.toUpperCase();
}

export function formatPageStart(isoOrDate) {
  const d = new Date(isoOrDate);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function formatSunday(isoOrDate) {
  const d = new Date(isoOrDate);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function relativeTime(iso) {
  if (!iso) return 'never';
  const now = new Date();
  const then = new Date(iso);
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (weeks === 1) return '1 week ago';
  if (weeks < 5) return `${weeks} weeks ago`;
  if (months === 1) return '1 month ago';
  if (days < 365) return `${months} months ago`;
  return `${Math.floor(days / 365)} year${days < 730 ? '' : 's'} ago`;
}

export function weeksSince(iso) {
  if (!iso) return Infinity;
  const now = new Date();
  const then = new Date(iso);
  return Math.floor((now - then) / (7 * 86400000));
}

export function isSundayToday(date = new Date()) {
  return date.getDay() === 0;
}

export function daysSince(iso) {
  if (!iso) return Infinity;
  return Math.floor((new Date() - new Date(iso)) / 86400000);
}
