import { Time } from "@/hooks/useTimes";
import formatTimer from "./formatTime";

export function getWorst(times: Time[]): string {
  if (times.length === 0) return "-";
  const timesWithoutDNF = times.filter((time) => time.isDNF === false);

  if (timesWithoutDNF.length === 0) return "DNF";

  return formatTimer(Math.max(...timesWithoutDNF.map((time) => time.value)));
}

export function getBest(times: Time[]): string {
  if (times.length === 0) return "-";
  const timesWithoutDNF = times.filter((time) => time.isDNF === false);

  if (timesWithoutDNF.length === 0) return "DNF";

  return formatTimer(Math.min(...timesWithoutDNF.map((time) => time.value)));
}

export function getAverageOf(times: Time[], index = 0, count = 5): string {
  const rangeValues = [...times]
    .sort((timeA, timeB) => timeA.createdAt - timeB.createdAt)
    .slice(index - count < 0 ? 0 : index - count, index);
  if (rangeValues.length < count) return "-";
  if (isAverageDNF(rangeValues)) return "DNF";
  const hasDNF = rangeValues.find((time) => time.isDNF);
  const max = hasDNF
    ? hasDNF.value
    : Math.max(...rangeValues.map((range) => range.value));
  const min = Math.min(...rangeValues.map((range) => range.value));
  const sum = rangeValues
    .map((value) => value.value)
    .reduce((acc, time) => acc + ([min, max].includes(time) ? 0 : time), 0);
  return formatTimer(Math.round(sum / (count - 2)));
}

export function getAverage(times: Time[]): string {
  const timesValuesWithoutDNF = times
    .filter((time) => time.isDNF === false)
    .map((time) => time.value);

  if (timesValuesWithoutDNF.length === 0) return "-";
  const sum = timesValuesWithoutDNF.reduce((acc, time) => acc + time, 0);
  return formatTimer(Math.round(sum / times.length));
}

export function isAverageDNF(times: Time[]) {
  return times.filter((time) => time.isDNF === true).length > 1;
}
