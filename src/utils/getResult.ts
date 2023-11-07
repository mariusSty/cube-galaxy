export function getWorst(times: number[]): number | null {
  return times.length > 0 ? Math.max(...times) : null;
}

export function getBest(times: number[]): number | null {
  return times.length > 0 ? Math.min(...times) : null;
}

export function getAverageOf(
  times: number[],
  position = 0,
  count = 5
): number | null {
  const timesAverage = times.slice(undefined, position);
  if (timesAverage.length < count) return null;
  const min = Math.min(...timesAverage);
  const max = Math.max(...timesAverage);
  const sum = timesAverage.reduce(
    (acc, time) => acc + ([min, max].includes(time) ? 0 : time),
    0
  );
  return Math.round(sum / (count - 2));
}

export function getAverage(times: number[]) {
  const sum = times.reduce((acc, time) => acc + time, 0);
  return Math.round(sum / times.length);
}
