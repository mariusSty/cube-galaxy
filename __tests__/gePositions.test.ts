import { getPositions } from "@/utils/getPositions";
import { describe, expect, test } from "@jest/globals";

describe("getPositions", () => {
  test("Should throw an error if the dimension params is not correct", () => {
    expect(() => getPositions(123)).toThrow(
      new Error("Invalid dimension. Can't build the cube")
    );
  });

  test("Should return an array of length to power 2 relative to the dimension", () => {
    // Arrange
    const dimension = 3;

    // Act
    const positions = getPositions(dimension);

    // Assert
    expect(positions).toHaveLength(dimension ** dimension);
  });
});
