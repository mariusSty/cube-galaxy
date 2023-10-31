import { movements3x3 } from "@/utils/movements";
import { Center, OrbitControls, Stage } from "@react-three/drei";
import gsap from "gsap";
import { button, useControls } from "leva";
import { useRef } from "react";
import { Group } from "three";
import Cube from "../three/cube";

type ExperienceProps = {
  dimension: number;
};

export default function Experience({ dimension }: ExperienceProps) {
  const cubesRef = useRef<Group>(null);
  const animatingCubesRef = useRef<Group>(null);

  const positions = [];
  for (let i = 0; i < Math.pow(dimension, 3); i++) {
    positions.push(Array.from((i >>> 0).toString(dimension).padStart(3, "0")));
  }

  const cubes = positions.map((position, index) => (
    <Cube key={index} position={position} />
  ));

  useControls("Scramble", {
    clickMe: button(() => {
      const scramble = ["F", "U", "R", "U'", "R"];
      doMove(scramble[0]);

      function doMove(move: string) {
        const movement = movements3x3.get(move);
        if (!movement || !animatingCubesRef.current) return;

        const group = new Group();
        cubesRef.current?.children
          .filter((child) => movement?.cubesNeedRotation(child.position))
          .map((cube) => group?.attach(cube));
        animatingCubesRef.current.attach(group);
        console.log("to animate", group?.children);

        gsap.to(group.rotation, {
          duration: 1,
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
    }),
  });

  return (
    <>
      <color args={["ivory"]} attach="background" />
      <OrbitControls makeDefault />
      <Stage>
        <Center ref={animatingCubesRef}>
          <group ref={cubesRef}>{cubes}</group>
        </Center>
      </Stage>
    </>
  );
}
