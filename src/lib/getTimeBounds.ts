// Returns the standard pseudoanonymisation window
export function getTimeBounds() {
  // + 8h buffer: guarantees a minimum lifetime so tokens are neither
  // deleted suspiciously soon after rating nor expire before they can
  // plausibly be used

  const startDate = Date.now() + 3600 * 8 * 1000;
  // Max 1 week in the future
  const endDate = startDate + 86400 * 1000 * 7;
  return { startDate, endDate };
}
