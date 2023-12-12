export type Time = {
  id: string;
  value: number;
  scramble: string[];
  isDNF: boolean;
  isPlusTwo: boolean;
  createdAt: number;
  updatedAt: number;
};

export type Result = Omit<Time, "value" | "createdAt" | "updatedAt"> & {
  time: number;
  position: number;
  ao5: number | null;
  ao12: number | null;
  isAo5DNF: boolean;
  isAo12DNF: boolean;
};

export enum TimerState {
  Ready = "READY",
  Start = "START",
  Stopping = "STOPPING",
  Stop = "STOP",
}
