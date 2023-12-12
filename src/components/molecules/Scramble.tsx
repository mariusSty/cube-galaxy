import SimpleText from "../atoms/SimpleText";

type ScrambleProps = {
  scramble: string[];
};

export default function Scramble({ scramble }: ScrambleProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {scramble.map((move, index) => (
        <SimpleText key={index} size="small">
          {move}
        </SimpleText>
      ))}
    </div>
  );
}
