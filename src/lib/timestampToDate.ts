export function timestampToDate(timestamp: number) {
  // DD/MM/YYYY
  const date = new Date(timestamp).toLocaleDateString("en-GB");

  return date.toString();
}
