import { Result, Time } from "@/types/timer";

export function getResult(times: Time[]): Result[] {
  const timesSorted = sortTimesByCreatedDate(times);

  return timesSorted.map((time, index) => {
    const rangeValuesAo5 = getRangeValues(timesSorted, index, 5);
    const rangeValuesAo12 = getRangeValues(timesSorted, index, 12);

    const ao5 = getAverageOf(timesSorted, index, 5);
    const ao12 = getAverageOf(timesSorted, index, 12);

    return {
      id: time.id,
      position: times.length - index,
      time: time.value,
      scramble: time.scramble,
      ao5,
      ao12,
      isDNF: time.isDNF,
      isPlusTwo: time.isPlusTwo,
      isAo5DNF: rangeValuesAo5.length === 5 && isAverageDNF(rangeValuesAo5),
      isAo12DNF: rangeValuesAo12.length === 12 && isAverageDNF(rangeValuesAo12),
    };
  });
}

export function sortTimesByCreatedDate(times: Time[]): Time[] {
  return [...times].sort((timeA, timeB) => timeB.createdAt - timeA.createdAt);
}

export function getTimesWithoutDNF(times: Time[]): Time[] {
  return [...times].filter((time) => time.isDNF === false);
}

export function getWorst(times: Time[]): number | null {
  if (times.length === 0) return null;

  const timesWithoutDNF = getTimesWithoutDNF(times);

  if (timesWithoutDNF.length === 0) return null;

  return Math.max(...timesWithoutDNF.map((time) => time.value));
}

export function getBest(times: Time[]): number | null {
  if (times.length === 0) return null;

  const timesWithoutDNF = getTimesWithoutDNF(times);

  if (timesWithoutDNF.length === 0) return null;

  return Math.min(...timesWithoutDNF.map((time) => time.value));
}

export function getAverage(times: Time[]): number | null {
  if (times.length === 0) return null;

  const timesValuesWithoutDNF = getTimesWithoutDNF(times);

  if (timesValuesWithoutDNF.length === 0) return null;

  const sum = timesValuesWithoutDNF.reduce((acc, time) => acc + time.value, 0);

  return Math.round(sum / timesValuesWithoutDNF.length);
}

export function isAverageDNF(times: Time[]): boolean {
  return times.filter((time) => time.isDNF === true).length > 1;
}

export function getRangeValues(
  times: Time[],
  startIndex = 0,
  count = 5
): Time[] {
  return times.slice(startIndex, count + startIndex);
}

export function getAverageOf(
  times: Time[],
  position = 0,
  count = 5
): number | null {
  const rangeValues = getRangeValues(times, position, count);

  if (rangeValues.length < count || rangeValues.length <= 2) return null;
  if (isAverageDNF(rangeValues)) return null;

  const hasDNF = rangeValues.find((time) => time.isDNF);
  const worst = hasDNF
    ? hasDNF.value
    : getWorst(getTimesWithoutDNF(rangeValues));
  const best = getBest(getTimesWithoutDNF(rangeValues));

  const sum = rangeValues
    .map((value) => value.value)
    .reduce((acc, time) => acc + ([best, worst].includes(time) ? 0 : time), 0);

  return Math.round(sum / (count - 2));
}
