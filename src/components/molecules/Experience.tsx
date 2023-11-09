import { movements3x3 } from "@/utils/movements";
import { getPositions } from "@/utils/positions";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Group } from "three";
import Cube from "../atoms/Cube";

type ExperienceProps = {
  dimension?: number;
  scramble: string[];
};

export default function Experience({
  dimension = 3,
  scramble = [],
}: ExperienceProps) {
  const cubesRef = useRef<Group>(null);
  const positions = useMemo(() => getPositions(dimension), [dimension]);

  useEffect(() => {
    if (!cubesRef.current) return;

    // Re-init cube
    for (let i = 0; i < positions.length; i++) {
      cubesRef.current.children[i].position.set(...positions[i]);
      cubesRef.current.children[i].rotation.set(0, 0, 0);
    }

    scramble.map((move) => {
      if (!cubesRef.current) return;

      // Get movement
      const movement = movements3x3.get(move);
      if (!movement) throw new Error("Invalid movement");

      // Get cubes who need rotation
      const cubesNeedRotation = cubesRef.current.children.filter((cube) =>
        movement.cubesNeedRotation(cube.position)
      );

      // Create a group and do the rotation
      const rotationGroup = new Group();
      cubesNeedRotation.map((cube) => rotationGroup.attach(cube));
      cubesRef.current.attach(rotationGroup);
      const rotation = movement.rotation(rotationGroup.rotation);
      rotationGroup.rotation.set(rotation.x, rotation.y, rotation.z);

      // Destroy group
      cubesNeedRotation.map((cube) => cubesRef.current?.attach(cube));
      cubesRef.current.remove(rotationGroup);
    });
  }, [scramble, positions]);

  const cubes = positions.map((position, index) => (
    <Cube key={index} position={position} />
  ));

  return (
    <>
      <OrbitControls makeDefault enableZoom={false} enablePan={false} />
      <group ref={cubesRef}>{cubes}</group>
      <ContactShadows
        width={10}
        height={10}
        position-y={-3}
        scale={3}
        blur={1}
        opacity={0.3}
      />
    </>
  );
}
