import { Time } from "@/app/page";
import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

type TimeReducerAction = {
  type: string;
  id?: string;
  value?: number;
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
          isDNF: false,
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

    default:
      throw new Error(`Unknown action : ${action.type}`);
  }
}

export function useTimer() {
  const [times, dispatch] = useReducer(timesReducer, []);

  return {
    times,
    addTime: (value: number) =>
      dispatch({
        type: "added",
        value,
      }),
    removeTime: (id: string) => dispatch({ type: "deleted", id }),
    removeAllTimes: () => dispatch({ type: "deletedAll" }),
    markAsDNF: (id: string) => dispatch({ type: "markedAsDnf", id }),
  };
}
