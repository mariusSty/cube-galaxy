import SimpleText from "../atoms/SimpleText";

type ScrambleProps = {
  handleGenerateScramble: () => void;
  scramble: string[] | null;
};

export default function Scramble({
  handleGenerateScramble,
  scramble,
}: ScrambleProps) {
  const moveList =
    scramble && scramble.length > 0 ? (
      <ul className="grid grid-cols-7 py-4 md:grid-cols-10 lg:grid-cols-12 w-full bg-[#030027] border-y-[1px] border-[#F6511D]">
        {scramble.map((move, index) => (
          <li className="flex items-center justify-center h-8" key={index}>
            <SimpleText size="big">{move}</SimpleText>
          </li>
        ))}
      </ul>
    ) : (
      <></>
    );
  return (
    <div className="absolute top-10 flex flex-col justify-center items-center w-full gap-4 pointer-events-none">
      <button
        className="flex items-center justify-center h-full p-3 rounded-2xl bg-[#FFB400] pointer-events-auto"
        onClick={(e) => {
          e.preventDefault();
          handleGenerateScramble();
        }}
      >
        <span className="material-symbols-outlined text-[#030027]">replay</span>
      </button>
      {moveList}
    </div>
  );
}
