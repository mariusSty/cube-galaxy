export default function calculateAverage(
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
