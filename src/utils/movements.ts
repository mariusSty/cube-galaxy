import { Euler, Vector3 } from "three";

export const movements3x3 = new Map([
  [
    "U",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.y) == 2,
      rotation: (rotation: Euler) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "D",
    {
      cubesNeedRotation: (position) => Math.round(position.y) == 0,
      rotation: (rotation: Euler) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "R",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.x) == 2,
      rotation: (rotation: Euler) => ({ x: rotation.x - Math.PI * 0.5 }),
    },
  ],
  [
    "L",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.x) == 0,
      rotation: (rotation: Euler) => ({ x: rotation.x + Math.PI * 0.5 }),
    },
  ],
  [
    "F",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.z) == 2,
      rotation: (rotation: Euler) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "B",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.z) == 0,
      rotation: (rotation: Euler) => ({ z: rotation.z + Math.PI * 0.5 }),
    },
  ],
  [
    "M",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.x) == 1,
      rotation: (rotation: Euler) => ({ x: rotation.x - Math.PI * 0.5 }),
    },
  ],
  [
    "E",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.y) == 1,
      rotation: (rotation: Euler) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "S",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.z) == 1,
      rotation: (rotation: Euler) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "U'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.y) == 2,
      rotation: (rotation: Euler) => ({ y: rotation.y + Math.PI * 0.5 }),
    },
  ],
  [
    "D'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.y) == 0,
      rotation: (rotation: Euler) => ({ y: rotation.y + Math.PI * 0.5 }),
    },
  ],
  [
    "R'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.x) == 2,
      rotation: (rotation: Euler) => ({ x: rotation.x + Math.PI * 0.5 }),
    },
  ],
  [
    "L'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.x) == 0,
      rotation: (rotation: Euler) => ({ x: rotation.x - Math.PI * 0.5 }),
    },
  ],
  [
    "F'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.z) == 2,
      rotation: (rotation: Euler) => ({ z: rotation.z + Math.PI * 0.5 }),
    },
  ],
  [
    "B'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.z) == 0,
      rotation: (rotation: Euler) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "u",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.y) == 1 || Math.round(position.y) == 2,
      rotation: (rotation: Euler) => ({ y: rotation.y - Math.PI * 0.5 }),
    },
  ],
  [
    "d",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.y) == 0 || Math.round(position.y) == 1,
      rotation: (rotation: Euler) => ({ y: rotation.y + Math.PI * 0.5 }),
    },
  ],
  [
    "r",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.x) == 1 || Math.round(position.x) == 2,
      rotation: (rotation: Euler) => ({ x: rotation.x - Math.PI * 0.5 }),
    },
  ],
  [
    "l",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.x) == 1 || Math.round(position.x) == 0,
      rotation: (rotation: Euler) => ({ x: rotation.x + Math.PI * 0.5 }),
    },
  ],
  [
    "f",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.z) == 1 || Math.round(position.z) == 2,
      rotation: (rotation: Euler) => ({ z: rotation.z - Math.PI * 0.5 }),
    },
  ],
  [
    "b",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.z) == 1 || Math.round(position.z) == 0,
      rotation: (rotation: Euler) => ({ z: rotation.z + Math.PI * 0.5 }),
    },
  ],
]);
