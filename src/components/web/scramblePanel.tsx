type ScramblePanelProps = {
  handleGenerateScramble: () => void;
  scramble: string[] | null;
};

export default function ScramblePanel({
  handleGenerateScramble,
  scramble,
}: ScramblePanelProps) {
  const moveList = scramble ? (
    <ul className="flex items-center justify-center gap-2">
      {scramble.map((move, index) => (
        <li
          className="h-10 w-10 text-2xl border-4 border-blue-600 text-blue-600 rounded-md flex items-center justify-center"
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
      {moveList}
      <button
        className="bg-blue-600 hover:bg-blue-400 focus:outline text-3xl text-white px-6 py-2 rounded-lg flex items-center justify-center"
        onClick={handleGenerateScramble}
      >
        New scramble
      </button>
    </div>
  );
}
