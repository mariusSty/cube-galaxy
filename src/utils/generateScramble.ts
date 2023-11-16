const moves = ["R", "L", "U", "D", "F", "B"];
const amount = [1, -1, 2];
const possibleAdjacentMove = new Map([
  ["R", ["U", "D", "F", "B"]],
  ["L", ["U", "D", "F", "B"]],
  ["U", ["R", "L", "F", "B"]],
  ["D", ["R", "L", "F", "B"]],
  ["F", ["R", "L", "U", "D"]],
  ["B", ["R", "L", "U", "D"]],
]);

export function generateScramble(): string[] {
  const scramble: string[] = [];

  while (scramble.length < 20) {
    const randomMove = moves[Math.round(Math.random() * 5)];
    const previousMove = getPreviousMove(scramble);
    if (!previousMove) {
      scramble.push(addAmount(randomMove));
    } else {
      const validMoves = possibleAdjacentMove.get(previousMove);
      if (validMoves && validMoves.includes(randomMove)) {
        scramble.push(addAmount(randomMove));
      }
    }
  }

  return scramble;
}

function getPreviousMove(scramble: string[]): string | undefined {
  if (scramble.length === 0) return;
  return scramble[scramble.length - 1][0];
}

function addAmount(move: string) {
  const randomAmount = amount[Math.round(Math.random() * 2)];
  if (randomAmount === 1) {
    return move;
  } else if (randomAmount === -1) {
    return `${move}'`;
  } else if (randomAmount === 2) {
    return `${move}2`;
  } else {
    return move;
  }
}
