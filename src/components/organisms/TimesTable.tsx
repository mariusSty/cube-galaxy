import { Result } from "@/utils/getResult";
import { useSwiper } from "swiper/react";
import Button from "../atoms/Button";
import SimpleText from "../atoms/SimpleText";
import Td from "../atoms/Td";
import Tr from "../atoms/Tr";

type TimesTableProps = {
  results: Result[];
  markAsDNF: (id: string) => void;
  markAsPlusTwo: (id: string) => void;
  removeTime: (id: string) => void;
  removeAllTimes: () => void;
  setTimeFocused: (id: string) => void;
};

export default function TimesTable({
  results,
  removeTime,
  removeAllTimes,
  markAsDNF,
  markAsPlusTwo,
  setTimeFocused,
}: TimesTableProps) {
  const swiper = useSwiper();

  function handleDetails(id: string) {
    setTimeFocused(id);
    swiper.slideNext();
  }

  return (
    <>
      <Tr isThead>
        <Td>
          <SimpleText>N°</SimpleText>
        </Td>
        <Td>
          <SimpleText>Time</SimpleText>
        </Td>
        <Td>
          <SimpleText>ao5</SimpleText>
        </Td>
        <Td>
          <SimpleText>ao12</SimpleText>
        </Td>
        <div className="hidden sm:block">
          <Td>
            <></>
          </Td>
        </div>
        <div className="hidden sm:block">
          <Td>
            <></>
          </Td>
        </div>
        <Td>
          <Button handleClick={removeAllTimes} color="orange">
            <span className="material-symbols-outlined text-white m-1">
              delete_history
            </span>
          </Button>
        </Td>
      </Tr>
      {results.map(({ id, position, time, ao5, ao12, isDNF, isPlusTwo }) => (
        <Tr key={id}>
          <Td>
            <SimpleText>{`${position}`}</SimpleText>
          </Td>
          <Td>
            {isPlusTwo || isDNF ? (
              <SimpleText color="orange">{time}</SimpleText>
            ) : (
              <SimpleText color="green">{time}</SimpleText>
            )}
          </Td>
          <Td>
            <SimpleText>{ao5}</SimpleText>
          </Td>
          <Td>
            <SimpleText>{ao12}</SimpleText>
          </Td>
          <div className="hidden sm:block">
            <Td>
              <Button
                handleClick={() => markAsPlusTwo(id)}
                color={isPlusTwo ? "orange" : "green"}
              >
                <span className="my-1 mx-2">
                  <SimpleText color="blue">+2</SimpleText>
                </span>
              </Button>
            </Td>
          </div>
          <div className="hidden sm:block">
            <Td>
              <Button
                handleClick={() => markAsDNF(id)}
                color={isDNF ? "orange" : "green"}
              >
                <span className="my-1 mx-2">
                  <SimpleText color="blue">DNF</SimpleText>
                </span>
              </Button>
            </Td>
          </div>
          <Td>
            <div className="hidden sm:block">
              <Button handleClick={() => removeTime(id)} color="orange">
                <span className="material-symbols-outlined text-[#151E3F] m-1">
                  close
                </span>
              </Button>
            </div>
            <div className="block sm:hidden">
              <Button handleClick={() => handleDetails(id)} color="blue">
                <span className="material-symbols-outlined text-white m-1">
                  navigate_next
                </span>
              </Button>
            </div>
          </Td>
        </Tr>
      ))}
    </>
  );
}
