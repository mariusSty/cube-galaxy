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
          className="h-10 w-10 text-2xl border-2 border-blue-600 text-blue-600 rounded-md flex items-center justify-center"
          key={index}
        >
          {move}
        </li>
      ))}
    </ul>
  ) : (
    <></>
  );
  return (
    <div className="flex justify-center items-center w-full p-4 gap-4">
      <div className="flex justify-center items-center gap-2 rounded-lg border-4 border-blue-600 hover:border-blue-400 pointer-events-none">
        <button
          className="bg-blue-600 hover:bg-blue-400 pointer-events-auto text-3xl text-white px-6 py-2 flex items-center justify-center"
          onClick={handleGenerateScramble}
        >
          New
        </button>
        {moveList}
      </div>
    </div>
  );
}
