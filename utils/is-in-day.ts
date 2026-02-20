export function isInOperationalDay(date: Date | string): boolean {
  const selected = new Date(date);
  const now = new Date();

  const start = new Date(selected);
  start.setHours(7, 0, 0, 0);

  const end = new Date(selected);
  end.setDate(end.getDate() + 1);
  end.setHours(6, 59, 59, 999);

  return now >= start && now <= end;
}
