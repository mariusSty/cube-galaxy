import { Time } from "@/hooks/useTimes";
import formatTimer from "./formatTime";

export type Result = Omit<Time, "value" | "createdAt" | "updatedAt"> & {
  time: string;
  position: number;
  ao5: string;
  ao12: string;
};

export function getResult(times: Time[]): Result[] {
  return [...times]
    .sort((timeA, timeB) => timeA.createdAt - timeB.createdAt)
    .reverse()
    .map((time, index) => {
      const position = times.length - index;
      const ao5 = getAverageOf(times, position);
      const ao12 = getAverageOf(times, position, 12);

      return {
        id: time.id,
        position,
        time: time.isDNF ? "DNF" : formatTimer(time.value),
        scramble: time.scramble,
        ao5: formatTimer(ao5),
        ao12: formatTimer(ao12),
        isDNF: time.isDNF,
        isPlusTwo: time.isPlusTwo,
      };
    });
}

export function getWorst(times: Time[]): number | null {
  if (times.length === 0) return null;
  const timesWithoutDNF = times.filter((time) => time.isDNF === false);

  if (timesWithoutDNF.length === 0) return null;

  return Math.max(...timesWithoutDNF.map((time) => time.value));
}

export function getBest(times: Time[]): number | null {
  if (times.length === 0) return null;
  const timesWithoutDNF = times.filter((time) => time.isDNF === false);

  if (timesWithoutDNF.length === 0) return null;

  return Math.min(...timesWithoutDNF.map((time) => time.value));
}

export function getAverageOf(
  times: Time[],
  index = 0,
  count = 5
): number | null {
  const rangeValues = [...times]
    .sort((timeA, timeB) => timeA.createdAt - timeB.createdAt)
    .slice(index - count < 0 ? 0 : index - count, index);
  if (rangeValues.length < count) return null;
  if (isAverageDNF(rangeValues)) return null;
  const hasDNF = rangeValues.find((time) => time.isDNF);
  const max = hasDNF
    ? hasDNF.value
    : Math.max(...rangeValues.map((range) => range.value));
  const min = Math.min(...rangeValues.map((range) => range.value));
  const sum = rangeValues
    .map((value) => value.value)
    .reduce((acc, time) => acc + ([min, max].includes(time) ? 0 : time), 0);
  return Math.round(sum / (count - 2));
}

export function getAverage(times: Time[]): number | null {
  const timesValuesWithoutDNF = times
    .filter((time) => time.isDNF === false)
    .map((time) => time.value);

  if (timesValuesWithoutDNF.length === 0) return null;
  const sum = timesValuesWithoutDNF.reduce((acc, time) => acc + time, 0);
  return Math.round(sum / times.length);
}

export function isAverageDNF(times: Time[]): boolean {
  return times.filter((time) => time.isDNF === true).length > 1;
}
