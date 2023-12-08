export default function formatTimer(
  timer: number | null,
  isDNF = false,
  textIfDNF = "DNF",
  textIfNull = "-"
): string {
  if (isDNF) return textIfDNF;
  if (timer === null) return textIfNull;
  const toDisplay = [];
  const minutes = Math.floor(timer / 60000);
  const seconds = Math.floor(timer / 1000 - minutes * 60);
  const milliseconds = timer - seconds * 1000 - minutes * 60000;

  if (minutes) {
    toDisplay.push(minutes.toString());
    toDisplay.push(seconds.toString().padStart(2, "0"));
  } else {
    toDisplay.push(seconds.toString().padStart(1, "0"));
  }
  toDisplay.push(milliseconds.toString().padStart(3, "0"));

  return toDisplay.join(":");
}
