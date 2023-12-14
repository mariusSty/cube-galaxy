import { Time } from "@/types/timer";
import {
  getAverage,
  getAverageOf,
  getBest,
  getRangeValues,
  getResult,
  getTimesWithoutDNF,
  getWorst,
  isAverageDNF,
} from "@/utils/getResult";
import { faker } from "@faker-js/faker";
import { describe, expect, test } from "@jest/globals";

const mockTime: Time = {
  isDNF: false,
  isPlusTwo: false,
  id: faker.string.uuid(),
  value: faker.number.int({ min: 0, max: 9999 }),
  scramble: faker.helpers.arrayElements(["R", "L", "U", "D"], 15),
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

describe("sortTimesByCreatedDate", () => {
  test("Should return the times sorted by created date", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        createdAt: 1,
      },
      {
        ...mockTime,
        createdAt: 2,
      },
      {
        ...mockTime,
        createdAt: 3,
      },
    ];

    // Act
    const result = times.sort(
      (timeA, timeB) => timeB.createdAt - timeA.createdAt
    );

    // Assert
    expect(result).toEqual([
      {
        ...mockTime,
        createdAt: 3,
      },
      {
        ...mockTime,
        createdAt: 2,
      },
      {
        ...mockTime,
        createdAt: 1,
      },
    ]);
  });
});

describe("getTimesWithoutDNF", () => {
  test("Should return the times without DNF", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        isDNF: true,
      },
      {
        ...mockTime,
        isDNF: false,
      },
      {
        ...mockTime,
        isDNF: true,
      },
    ];

    // Act
    const result = getTimesWithoutDNF(times);

    // Assert
    expect(result).toEqual([
      {
        ...mockTime,
        isDNF: false,
      },
    ]);
  });
});

describe("isAverageDNF", () => {
  test("Should not be DNF if there is not times", () => {
    // Arrange
    const times: Time[] = [];

    // Act
    const result = isAverageDNF(times);

    // Assert
    expect(result).toBe(false);
  });
  test("Should be DNF if there is two DNF times", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        isDNF: true,
      },
      {
        ...mockTime,
        isDNF: true,
      },
    ];

    // Act
    const result = isAverageDNF(times);

    // Assert
    expect(result).toBe(true);
  });
  test("Should not be DNF if there is one DNF time", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        isDNF: true,
      },
      {
        ...mockTime,
        isDNF: false,
      },
    ];

    // Act
    const result = isAverageDNF(times);

    // Assert
    expect(result).toBe(false);
  });
});

describe("getBest", () => {
  test("Should return null if there is not times", () => {
    // Arrange
    const times: Time[] = [];

    // Act
    const result = getBest(times);

    // Assert
    expect(result).toBe(null);
  });
  test("Should return the best time", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        value: 1,
      },
      {
        ...mockTime,
        value: 2,
      },
      {
        ...mockTime,
        value: 3,
      },
    ];

    // Act
    const result = getBest(times);

    // Assert
    expect(result).toBe(1);
  });
});

describe("getWorst", () => {
  test("Should return null if there is not times", () => {
    // Arrange
    const times: Time[] = [];

    // Act
    const result = getWorst(times);

    // Assert
    expect(result).toBe(null);
  });
  test("Should return the worst time", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        value: 1,
      },
      {
        ...mockTime,
        value: 2,
      },
      {
        ...mockTime,
        value: 3,
      },
    ];

    // Act
    const result = getWorst(times);

    // Assert
    expect(result).toBe(3);
  });
});

describe("getAverage", () => {
  test("Should return null if there is not times", () => {
    // Arrange
    const times: Time[] = [];

    // Act
    const result = getAverage(times);

    // Assert
    expect(result).toBe(null);
  });
  test("Should return the average time", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        value: 1,
      },
      {
        ...mockTime,
        value: 2,
      },
      {
        ...mockTime,
        value: 3,
      },
    ];

    // Act
    const result = getAverage(times);

    // Assert
    expect(result).toBe(2);
  });
  test("Should return the average time and exclude DNF times", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        value: 2,
      },
      {
        ...mockTime,
        value: 4,
      },
      {
        ...mockTime,
        value: 6,
        isDNF: true,
      },
    ];

    // Act
    const result = getAverage(times);

    // Assert
    expect(result).toBe(3);
  });
});

describe("getRangeValues", () => {
  test("Should return empty array if there is not times", () => {
    // Arrange
    const times: Time[] = [];

    // Act
    const result = getRangeValues(times);

    // Assert
    expect(result).toEqual([]);
  });
  test("Should return the range values", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        createdAt: 1,
        value: 1,
      },
      {
        ...mockTime,
        createdAt: 2,
        value: 2,
      },
      {
        ...mockTime,
        createdAt: 3,
        value: 3,
      },
      {
        ...mockTime,
        createdAt: 4,
        value: 4,
      },
      {
        ...mockTime,
        createdAt: 5,
        value: 5,
      },
      {
        ...mockTime,
        createdAt: 6,
        value: 6,
      },
    ];

    // Act
    const result = getRangeValues(times, 1, 3);

    // Assert
    expect(result).toEqual([
      {
        ...mockTime,
        createdAt: 2,
        value: 2,
      },
      {
        ...mockTime,
        createdAt: 3,
        value: 3,
      },
      {
        ...mockTime,
        createdAt: 4,
        value: 4,
      },
    ]);
  });
});

describe("getAverageOf", () => {
  test("Should return null if there is not times", () => {
    // Arrange
    const times: Time[] = [];

    // Act
    const result = getAverageOf(times);

    // Assert
    expect(result).toBe(null);
  });
  test("Should return null if there is not enough times", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        value: 1,
      },
    ];

    // Act
    const result = getAverageOf(times, 0, 2);

    // Assert
    expect(result).toBe(null);
  });
  test("Should return the average of the range values", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        value: 1,
      },
      {
        ...mockTime,
        value: 2,
      },
      {
        ...mockTime,
        value: 3,
      },
      {
        ...mockTime,
        value: 4,
      },
      {
        ...mockTime,
        value: 5,
      },
      {
        ...mockTime,
        value: 6,
      },
      {
        ...mockTime,
        value: 7,
      },
      {
        ...mockTime,
        value: 8,
      },
      {
        ...mockTime,
        value: 9,
      },
    ];

    // Act
    const result = getAverageOf(times, 3, 5);

    // Assert
    expect(result).toBe(6);
  });
  test("Should return the correct averageOf with a DNF time", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        value: 2,
      },
      {
        ...mockTime,
        value: 4,
      },
      {
        ...mockTime,
        value: 8,
      },
      {
        ...mockTime,
        value: 6,
        isDNF: true,
      },
    ];

    // Act
    const result = getAverageOf(times, 0, 4);

    // Assert
    expect(result).toBe(6);
  });
});

describe("getResult", () => {
  test("Should return the correct results", () => {
    // Arrange
    const times: Time[] = [
      {
        ...mockTime,
        value: 1,
        createdAt: 1,
      },
      {
        ...mockTime,
        value: 2,
        createdAt: 2,
      },
      {
        ...mockTime,
        value: 3,
        createdAt: 3,
      },
      {
        ...mockTime,
        value: 4,
        createdAt: 4,
      },
      {
        ...mockTime,
        value: 5,
        createdAt: 5,
      },
      {
        ...mockTime,
        value: 6,
        createdAt: 6,
      },
      {
        ...mockTime,
        value: 7,
        createdAt: 7,
      },
      {
        ...mockTime,
        value: 8,
        createdAt: 8,
      },
      {
        ...mockTime,
        value: 9,
        createdAt: 9,
      },
    ];

    // Act
    const result = getResult(times);

    // Assert
    expect(result).toEqual([
      {
        ao12: null,
        ao5: 7,
        id: expect.any(String),
        isAo12DNF: false,
        isAo5DNF: false,
        isDNF: false,
        isPlusTwo: false,
        position: 9,
        scramble: expect.any(Array<string>),
        time: 9,
      },
      {
        ao12: null,
        ao5: 6,
        id: expect.any(String),
        isAo12DNF: false,
        isAo5DNF: false,
        isDNF: false,
        isPlusTwo: false,
        position: 8,
        scramble: expect.any(Array<string>),
        time: 8,
      },
      {
        ao12: null,
        ao5: 5,
        id: expect.any(String),
        isAo12DNF: false,
        isAo5DNF: false,
        isDNF: false,
        isPlusTwo: false,
        position: 7,
        scramble: expect.any(Array<string>),
        time: 7,
      },
      {
        ao12: null,
        ao5: 4,
        id: expect.any(String),
        isAo12DNF: false,
        isAo5DNF: false,
        isDNF: false,
        isPlusTwo: false,
        position: 6,
        scramble: expect.any(Array<string>),
        time: 6,
      },
      {
        ao12: null,
        ao5: 3,
        id: expect.any(String),
        isAo12DNF: false,
        isAo5DNF: false,
        isDNF: false,
        isPlusTwo: false,
        position: 5,
        scramble: expect.any(Array<string>),
        time: 5,
      },
      {
        ao12: null,
        ao5: null,
        id: expect.any(String),
        isAo12DNF: false,
        isAo5DNF: false,
        isDNF: false,
        isPlusTwo: false,
        position: 4,
        scramble: expect.any(Array<string>),
        time: 4,
      },
      {
        ao12: null,
        ao5: null,
        id: expect.any(String),
        isAo12DNF: false,
        isAo5DNF: false,
        isDNF: false,
        isPlusTwo: false,
        position: 3,
        scramble: expect.any(Array<string>),
        time: 3,
      },
      {
        ao12: null,
        ao5: null,
        id: expect.any(String),
        isAo12DNF: false,
        isAo5DNF: false,
        isDNF: false,
        isPlusTwo: false,
        position: 2,
        scramble: expect.any(Array<string>),
        time: 2,
      },
      {
        ao12: null,
        ao5: null,
        id: expect.any(String),
        isAo12DNF: false,
        isAo5DNF: false,
        isDNF: false,
        isPlusTwo: false,
        position: 1,
        scramble: expect.any(Array<string>),
        time: 1,
      },
    ]);
  });
});
