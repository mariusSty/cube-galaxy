import { movements3x3 } from "@/utils/movements";
import { Center, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Group } from "three";
import Cube from "../three/cube";

type ExperienceProps = {
  dimension: number;
  scramble: string[] | null;
};

export default function Experience({ dimension, scramble }: ExperienceProps) {
  const cubesRef = useRef<Group>(null);
  const animatingCubesRef = useRef<Group>(null);

  const positions = [];
  for (let i = 0; i < Math.pow(dimension, 3); i++) {
    positions.push(Array.from((i >>> 0).toString(dimension).padStart(3, "0")));
  }

  useEffect(() => {
    if (scramble) {
      if (cubesRef.current?.children) {
        for (let i = 0; i < positions.length; i++) {
          cubesRef.current?.children[i].position.set(...positions[i]);
          cubesRef.current?.children[i].rotation.set(0, 0, 0);
        }
      }
      animateScramble([...scramble]);
    }
  }, [scramble, positions]);

  const cubes = positions.map((position, index) => (
    <Cube key={index} position={position} />
  ));

  const animateScramble = (scramble: string[]) => {
    doMove(scramble[0]);

    function doMove(move: string) {
      const movement = movements3x3.get(move);
      if (!movement || !animatingCubesRef.current) return;

      const group = new Group();
      cubesRef.current?.children
        .filter((child) => movement?.cubesNeedRotation(child.position))
        .map((cube) => group?.attach(cube));
      animatingCubesRef.current.attach(group);

      gsap.to(group.rotation, {
        duration: 0.3,
        ...movement.rotation(group.rotation),
        onComplete: () => {
          while (group.children.length > 0) {
            cubesRef.current?.attach(group.children[0]);
          }
          if (!animatingCubesRef.current) return;
          animatingCubesRef.current.remove(group);
          scramble.shift();
          if (scramble.length > 0) doMove(scramble[0]);
        },
      });
    }
  };

  return (
    <>
      <OrbitControls makeDefault enableZoom={false} enablePan={false} />
      <Center ref={animatingCubesRef}>
        <group ref={cubesRef}>{cubes}</group>
      </Center>
    </>
  );
}
