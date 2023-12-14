export function getPositions(dimension = 3): [number, number, number][] {
  if (dimension === 3) {
    return [
      [-1, -1, -1],
      [-1, -1, 0],
      [-1, -1, 1],
      [-1, 0, -1],
      [-1, 0, 0],
      [-1, 0, 1],
      [-1, 1, -1],
      [-1, 1, 0],
      [-1, 1, 1],
      [0, -1, -1],
      [0, -1, 0],
      [0, -1, 1],
      [0, 0, -1],
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, -1],
      [0, 1, 0],
      [0, 1, 1],
      [1, -1, -1],
      [1, -1, 0],
      [1, -1, 1],
      [1, 0, -1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, -1],
      [1, 1, 0],
      [1, 1, 1],
    ];
  } else {
    throw new Error("Invalid dimension. Can't build the cube");
  }
}
