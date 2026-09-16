// Returns the standard pseudoanonymisation window
export function getTimeBounds() {
  // + 8h buffer
  const startDate = Date.now() + 3600 * 8 * 1000;
  // Max 1 week in the future
  const endDate = startDate + 86400 * 1000 * 7;
  return { startDate, endDate };
}
