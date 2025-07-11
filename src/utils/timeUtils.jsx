export function formatDateTimeLocal(date) {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

export function calculateSoGio(startStr, endStr) {
  const start = new Date(startStr);
  const end = new Date(endStr);
  if (isNaN(start) || isNaN(end) || end <= start) return 0;
  const diffMs = end - start;
  return +(diffMs / (1000 * 60 * 60)).toFixed(2);
}
