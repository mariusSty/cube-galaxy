export function getPositions(dimension = 3): [number, number, number][] {
  if (dimension === 2) {
    // TODO
    return [];
  } else if (dimension === 3) {
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
  } else if (dimension === 4) {
    //TODO
    return [];
  } else {
    throw new Error("Invalid dimension. Can't build the cube");
  }
}
