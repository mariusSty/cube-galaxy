import { Euler, Vector3 } from "three";

export const movements3x3 = new Map([
  [
    "U",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.y) == 1,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y - Math.PI * 0.5,
        z: rotation.z,
      }),
    },
  ],
  [
    "D",
    {
      cubesNeedRotation: (position) => Math.round(position.y) == -1,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y - Math.PI * 0.5,
        z: rotation.z,
      }),
    },
  ],
  [
    "R",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.x) == 1,
      rotation: (rotation: Euler) => ({
        x: rotation.x - Math.PI * 0.5,
        y: rotation.y,
        z: rotation.z,
      }),
    },
  ],
  [
    "L",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.x) == -1,
      rotation: (rotation: Euler) => ({
        x: rotation.x + Math.PI * 0.5,
        y: rotation.y,
        z: rotation.z,
      }),
    },
  ],
  [
    "F",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.z) == 1,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y,
        z: rotation.z - Math.PI * 0.5,
      }),
    },
  ],
  [
    "B",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.z) == -1,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y,
        z: rotation.z + Math.PI * 0.5,
      }),
    },
  ],
  [
    "M",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.x) == 0,
      rotation: (rotation: Euler) => ({
        x: rotation.x - Math.PI * 0.5,
        y: rotation.y,
        z: rotation.z,
      }),
    },
  ],
  [
    "E",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.y) == 0,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y - Math.PI * 0.5,
        z: rotation.z,
      }),
    },
  ],
  [
    "S",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.z) == 0,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y,
        z: rotation.z - Math.PI * 0.5,
      }),
    },
  ],
  [
    "U'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.y) == 1,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y + Math.PI * 0.5,
        z: rotation.z,
      }),
    },
  ],
  [
    "D'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.y) == -1,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y + Math.PI * 0.5,
        z: rotation.z,
      }),
    },
  ],
  [
    "R'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.x) == 1,
      rotation: (rotation: Euler) => ({
        x: rotation.x + Math.PI * 0.5,
        y: rotation.y,
        z: rotation.z,
      }),
    },
  ],
  [
    "L'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.x) == -1,
      rotation: (rotation: Euler) => ({
        x: rotation.x - Math.PI * 0.5,
        y: rotation.y,
        z: rotation.z,
      }),
    },
  ],
  [
    "F'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.z) == 1,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y,
        z: rotation.z + Math.PI * 0.5,
      }),
    },
  ],
  [
    "B'",
    {
      cubesNeedRotation: (position: Vector3) => Math.round(position.z) == -1,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y,
        z: rotation.z - Math.PI * 0.5,
      }),
    },
  ],
  [
    "u",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.y) == 0 || Math.round(position.y) == 1,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y - Math.PI * 0.5,
        z: rotation.z,
      }),
    },
  ],
  [
    "d",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.y) == -1 || Math.round(position.y) == 0,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y + Math.PI * 0.5,
        z: rotation.z,
      }),
    },
  ],
  [
    "r",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.x) == 0 || Math.round(position.x) == 1,
      rotation: (rotation: Euler) => ({
        x: rotation.x - Math.PI * 0.5,
        y: rotation.y,
        z: rotation.z,
      }),
    },
  ],
  [
    "l",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.x) == 0 || Math.round(position.x) == -1,
      rotation: (rotation: Euler) => ({
        x: rotation.x + Math.PI * 0.5,
        y: rotation.y,
        z: rotation.z,
      }),
    },
  ],
  [
    "f",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.z) == 0 || Math.round(position.z) == 1,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y,
        z: rotation.z - Math.PI * 0.5,
      }),
    },
  ],
  [
    "b",
    {
      cubesNeedRotation: (position: Vector3) =>
        Math.round(position.z) == 0 || Math.round(position.z) == -1,
      rotation: (rotation: Euler) => ({
        x: rotation.x,
        y: rotation.y,
        z: rotation.z + Math.PI * 0.5,
      }),
    },
  ],
]);
