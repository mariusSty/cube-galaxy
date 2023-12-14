import { useTimes } from "@/hooks/useTimes";
import { describe, expect, test } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

describe("useTimes", () => {
  test("Should add a time when method addTimes is called", () => {
    const { result } = renderHook(() => useTimes());
    expect(result.current).toHaveProperty("times", []);

    act(() => {
      result.current.addTime(1234, []);
    });

    expect(result.current.times).toEqual([
      {
        id: expect.any(String),
        value: 1234,
        scramble: [],
        isDNF: false,
        isPlusTwo: false,
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
      },
    ]);
  });

  test("Should delete a time when method deleteTime is called", () => {
    const { result } = renderHook(() => useTimes());
    expect(result.current).toHaveProperty("times", []);

    act(() => {
      result.current.addTime(1234, []);
    });

    expect(result.current.times).toEqual([
      {
        id: expect.any(String),
        value: 1234,
        scramble: [],
        isDNF: false,
        isPlusTwo: false,
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
      },
    ]);

    act(() => {
      result.current.removeTime(result.current.times[0].id);
    });

    expect(result.current.times).toEqual([]);
  });

  test("Should delete all times when method removeAllTimes is called", () => {
    const { result } = renderHook(() => useTimes());
    expect(result.current).toHaveProperty("times", []);

    act(() => {
      result.current.addTime(1234, []);
      result.current.addTime(4567, []);
    });

    expect(result.current.times).toEqual([
      {
        id: expect.any(String),
        value: 1234,
        scramble: [],
        isDNF: false,
        isPlusTwo: false,
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
      },
      {
        id: expect.any(String),
        value: 4567,
        scramble: [],
        isDNF: false,
        isPlusTwo: false,
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
      },
    ]);

    act(() => {
      result.current.removeAllTimes();
    });

    expect(result.current.times).toEqual([]);
  });

  test("Should mark a time as DNF when method markAsDNF is called", () => {
    const { result } = renderHook(() => useTimes());
    expect(result.current).toHaveProperty("times", []);

    act(() => {
      result.current.addTime(1234, []);
    });

    expect(result.current.times).toHaveProperty("0.isDNF", false);

    act(() => {
      result.current.markAsDNF(result.current.times[0].id);
    });

    expect(result.current.times).toHaveProperty("0.isDNF", true);
  });

  test("Should mark a time as Plus two when method markAsPlusTwo is called", () => {
    const { result } = renderHook(() => useTimes());
    expect(result.current).toHaveProperty("times", []);

    act(() => {
      result.current.addTime(1234, []);
    });

    expect(result.current.times).toHaveProperty("0.isPlusTwo", false);

    act(() => {
      result.current.markAsPlusTwo(result.current.times[0].id);
    });

    expect(result.current.times).toHaveProperty("0.isPlusTwo", true);
  });

  test("Should add 2 seconds to a time when method markAsPlusTwo is called", () => {
    const { result } = renderHook(() => useTimes());
    expect(result.current).toHaveProperty("times", []);

    act(() => {
      result.current.addTime(1234, []);
    });

    expect(result.current.times).toHaveProperty("0.value", 1234);

    act(() => {
      result.current.markAsPlusTwo(result.current.times[0].id);
    });

    expect(result.current.times).toHaveProperty("0.value", 3234);
  });
});
