import { RoundedBox } from "@react-three/drei";

type CubeProps = {
  position: [number, number, number];
};

export default function Cube({ position }: CubeProps) {
  return (
    <group position={position}>
      <RoundedBox position={[0, 0, 0]}>
        <meshBasicMaterial color="black" />
      </RoundedBox>
      <mesh position={[0.501, 0, 0]} rotation-y={Math.PI * 0.5}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={[-0.501, 0, 0]} rotation-y={-Math.PI * 0.5}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial color="#F6511D" />
      </mesh>
      <mesh position={[0, 0.501, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh position={[0, -0.501, 0]} rotation-x={Math.PI * 0.5}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial color="#FFB400" />
      </mesh>
      <mesh position={[0, 0, 0.501]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial color="#06A77D" />
      </mesh>
      <mesh position={[0, 0, -0.501]} rotation-y={Math.PI}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </group>
  );
}
