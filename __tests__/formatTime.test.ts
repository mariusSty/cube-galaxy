import formatTimer from "@/utils/formatTime";
import { expect, test } from "@jest/globals";
import { describe } from "node:test";

describe("formatTimer", () => {
  test.each([
    [1000, false, undefined, undefined, "1:000"],
    [123456, false, undefined, undefined, "2:03:456"],
    [null, false, undefined, undefined, "-"],
    [null, false, undefined, "not a number", "not a number"],
    [123, true, undefined, undefined, "DNF"],
    [456, true, "it's DNF", undefined, "it's DNF"],
  ])(`Format time : `, (time, isDNF, textIfDNF, textIfNull, expected) => {
    expect(formatTimer(time, isDNF, textIfDNF, textIfNull)).toBe(expected);
  });
});
