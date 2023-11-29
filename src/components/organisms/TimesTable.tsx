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
          <Button handleClick={removeAllTimes}>
            <span className="material-symbols-outlined text-white">delete</span>
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
              <Button handleClick={() => markAsPlusTwo(id)}>
                {isPlusTwo ? (
                  <SimpleText color="orange">+2</SimpleText>
                ) : (
                  <SimpleText color="green">+2</SimpleText>
                )}
              </Button>
            </Td>
          </div>
          <div className="hidden sm:block">
            <Td>
              <Button handleClick={() => markAsDNF(id)}>
                {isDNF ? (
                  <SimpleText color="orange">DNF</SimpleText>
                ) : (
                  <SimpleText color="green">DNF</SimpleText>
                )}
              </Button>
            </Td>
          </div>
          <Td>
            <div className="hidden sm:block">
              <Button handleClick={() => removeTime(id)}>
                <span className="material-symbols-outlined text-white">
                  close
                </span>
              </Button>
            </div>
            <div className="block sm:hidden">
              <Button handleClick={() => handleDetails(id)}>
                <span className="material-symbols-outlined text-white">
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
