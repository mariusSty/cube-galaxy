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
    <ul className="flex flex-wrap items-center justify-start">
      {scramble.map((move, index) => (
        <li
          className="flex items-center justify-center h-10 w-10 m-1"
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
    <div className="absolute bottom-20 flex justify-center items-center w-full p-4 gap-4">
      <div className="flex justify-center items-center rounded-lg h-full border-4 border-white hover:border-zinc-200 pointer-events-none">
        <button
          id="scrambleButton"
          className="flex items-center justify-center h-full p-3 bg-white hover:bg-zinc-200 pointer-events-auto"
          onClick={(e) => {
            e.preventDefault();
            handleGenerateScramble();
          }}
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
