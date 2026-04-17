// Period helpers used across dashboard/analytics endpoints.

const DAY = 24 * 60 * 60 * 1000;

const PRESETS = {
  '1d':       { days: 1 },
  '7d':       { days: 7 },
  'last7days':{ days: 7 },
  '14d':      { days: 14 },
  '30d':      { days: 30 },
  'last30days': { days: 30 },
  '90d':      { days: 90 },
  'last90days': { days: 90 },
  'thismonth': { days: new Date().getDate() },
  'lastmonth': { days: 30 },
};

// Parse ?period=7d|30d|90d|... OR ?from=ISO&to=ISO.
// Returns { from, to, prevFrom, prevTo, label, days }.
export const parsePeriod = (query = {}) => {
  const now = new Date();
  let from;
  let to = now;
  let label;

  if (query.from && query.to) {
    from = new Date(query.from);
    to = new Date(query.to);
    label = 'custom';
  } else {
    const key = (query.period || '30d').toLowerCase();
    const preset = PRESETS[key] || PRESETS['30d'];
    from = new Date(now.getTime() - preset.days * DAY);
    label = key;
  }

  const durationMs = to.getTime() - from.getTime();
  const days = Math.max(1, Math.round(durationMs / DAY));
  const prevTo = new Date(from.getTime() - 1);
  const prevFrom = new Date(from.getTime() - durationMs);

  return { from, to, prevFrom, prevTo, label, days };
};

export const pctChange = (current, prev) => {
  if (!prev) return current ? 100 : 0;
  return Math.round(((current - prev) / prev) * 1000) / 10;
};

export const DAY_MS = DAY;
