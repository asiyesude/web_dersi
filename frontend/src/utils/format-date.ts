export function formatDate(dateStr: string, timeStr: string) {
  const [yil, , gun] = dateStr.split("-");
  return `${gun} Ekim ${yil}, ${timeStr}`;
}