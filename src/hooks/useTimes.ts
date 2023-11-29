import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export type Time = {
  id: string;
  value: number;
  scramble: string[];
  isDNF: boolean;
  isPlusTwo: boolean;
  createdAt: number;
  updatedAt: number;
};

type TimeReducerAction = {
  type: string;
  id?: string;
  value?: number;
  scramble?: string[];
};

function timesReducer(times: Time[], action: TimeReducerAction): Time[] {
  switch (action.type) {
    case "added": {
      if (!action.value)
        throw new Error("Can't add new value, time is missing");
      return [
        ...times,
        {
          id: uuidv4(),
          value: action.value,
          scramble: action.scramble ?? [],
          isDNF: false,
          isPlusTwo: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];
    }

    case "deleted": {
      return times.filter((time) => time.id !== action.id);
    }

    case "deletedAll": {
      return [];
    }

    case "markedAsDnf": {
      const time = times.find((time) => time.id === action.id);
      if (!time) throw new Error("Can't mark as DNF, time not found");
      return [
        ...times.filter((time) => time.id !== action.id),
        { ...time, isDNF: !time.isDNF, updatedAt: Date.now() },
      ];
    }

    case "markedAsPlusTwo": {
      const time = times.find((time) => time.id === action.id);
      if (!time) throw new Error("Can't mark as Plus two, time not found");
      return [
        ...times.filter((time) => time.id !== action.id),
        {
          ...time,
          value: time.isPlusTwo ? time.value - 2000 : time.value + 2000,
          isPlusTwo: !time.isPlusTwo,
          updatedAt: Date.now(),
        },
      ];
    }

    default:
      throw new Error(`Unknown action : ${action.type}`);
  }
}

export function useTimes() {
  const [times, dispatch] = useReducer(timesReducer, []);

  return {
    times,
    addTime: (value: number, scramble: string[]) =>
      dispatch({
        type: "added",
        value,
        scramble,
      }),
    removeTime: (id: string) => dispatch({ type: "deleted", id }),
    removeAllTimes: () => dispatch({ type: "deletedAll" }),
    markAsDNF: (id: string) => dispatch({ type: "markedAsDnf", id }),
    markAsPlusTwo: (id: string) => dispatch({ type: "markedAsPlusTwo", id }),
  };
}
