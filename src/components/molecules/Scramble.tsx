import Button from "../atoms/Button";
import SimpleText from "../atoms/SimpleText";

type ScrambleProps = {
  handleGenerateScramble: () => void;
  handleCopyToClipBoard: () => void;
  scramble: string[] | null;
};

export default function Scramble({
  handleGenerateScramble,
  handleCopyToClipBoard,
  scramble,
}: ScrambleProps) {
  const moveList =
    scramble && scramble.length > 0 ? (
      <ul className="grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12 w-full">
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
    <div className="absolute left-1/2 -translate-x-1/2 top-5 flex flex-col justify-center items-center w-[80%] gap-2 p-4 pointer-events-none rounded-2xl bg-[#030027] border-[1px] border-[#F6511D]">
      <div className="flex items-center justify-center w-full gap-4">
        <Button handleClick={handleGenerateScramble}>
          <span className="material-symbols-outlined text-[#030027] m-3">
            replay
          </span>
        </Button>
        <Button handleClick={handleCopyToClipBoard}>
          <span className="material-symbols-outlined text-[#030027] m-3">
            content_copy
          </span>
        </Button>
      </div>
      {moveList}
    </div>
  );
}
