import { Canvas } from "@react-three/fiber";
import Experience from "../molecules/Experience";

type PreviewPanelProps = {
  scramble: string[] | null;
};

export default function PreviewPanel({ scramble }: PreviewPanelProps) {
  return (
    <div className="min-h-[250px]">
      <Canvas camera={{ fov: 45, near: 0.1, far: 200, position: [6, 4, 8] }}>
        <Experience scramble={scramble} />
      </Canvas>
    </div>
  );
}
