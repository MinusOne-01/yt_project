export function purgeOldEntries(cache, days) {

  const now = Date.now();
  const DAY_MS = 1000 * 60 * 60 * 24;

  const fresh = {};
  for (const [videoId, entry] of Object.entries(cache)) {
    if (!entry.fetchedAt) continue; 

    const ageDays = (now - new Date(entry.fetchedAt).getTime()) / DAY_MS;
    if (ageDays <= days) {
      fresh[videoId] = entry;
    }
  }

  return fresh;
}
