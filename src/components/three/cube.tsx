import { RoundedBox } from "@react-three/drei";

export default function Cube() {
  return (
    <group>
      <RoundedBox position={[0, 0, 0]}>
        <meshStandardMaterial color="black" />
      </RoundedBox>
      <mesh position={[0.501, 0, 0]} rotation-y={Math.PI * 0.5}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[-0.501, 0, 0]} rotation-y={-Math.PI * 0.5}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0, 0.501, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, -0.501, 0]} rotation-x={Math.PI * 0.5}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh position={[0, 0, 0.501]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh position={[0, 0, -0.501]} rotation-y={Math.PI}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}
