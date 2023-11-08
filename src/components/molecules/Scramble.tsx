import SimpleText from "../atoms/SimpleText";

type ScrambleProps = {
  handleGenerateScramble: () => void;
  scramble: string[] | null;
};

export default function Scramble({
  handleGenerateScramble,
  scramble,
}: ScrambleProps) {
  const moveList = scramble ? (
    <ul className="flex items-center justify-center gap-2 mr-2">
      {scramble.map((move, index) => (
        <li
          className="h-10 w-10 rounded-md flex items-center justify-center"
          key={index}
        >
          <SimpleText size="big">{move}</SimpleText>
        </li>
      ))}
    </ul>
  ) : (
    <></>
  );
  return (
    <div className="flex justify-center items-center w-full p-4 gap-4">
      <div className="flex justify-center items-center gap-2 rounded-lg border-4 border-white hover:border-zinc-200 pointer-events-none">
        <button
          className="flex items-center justify-center p-3 bg-white hover:bg-zinc-200 pointer-events-auto"
          onClick={handleGenerateScramble}
        >
          <span className="material-symbols-outlined text-blue-600">
            replay
          </span>
        </button>
        {moveList}
      </div>
    </div>
  );
}
