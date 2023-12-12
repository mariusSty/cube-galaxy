import SimpleText from "../atoms/SimpleText";

type CurrentScrambleProps = {
  currentScramble: string[];
};

export default function CurrentScramble({
  currentScramble,
}: CurrentScrambleProps) {
  return (
    <div className="flex flex-wrap gap-2 px-8">
      {currentScramble.map((move, i) => (
        <SimpleText key={i}>{move}</SimpleText>
      ))}
    </div>
  );
}
