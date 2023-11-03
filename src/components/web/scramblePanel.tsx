type ScramblePanelProps = {
  handleGenerateScramble: () => void;
  scramble: string[] | null;
};

export default function ScramblePanel({
  handleGenerateScramble,
  scramble,
}: ScramblePanelProps) {
  const moveList = scramble ? (
    <ul className="flex gap-2 mt-4">
      {scramble.map((move, index) => (
        <li
          className="h-10 w-10 text-lg border-4 border-blue-600 text-blue-600 rounded-md flex items-center justify-center"
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
    <div className="flex items-center w-full p-4">
      <div className="flex flex-col items-center w-full h-10">
        <button
          className="bg-blue-600 hover:bg-blue-400 focus:outline text-white px-6 py-2 rounded-lg flex items-center justify-center"
          onClick={handleGenerateScramble}
        >
          Generate scramble
        </button>
        {moveList}
      </div>
    </div>
  );
}