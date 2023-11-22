import { useSwiper } from "swiper/react";

const menuLabel = new Map([
  [0, [undefined, "Timer"]],
  [1, ["Stats", "Scramble"]],
  [2, ["Timer", undefined]],
]);

type SwiperMenuProps = {
  activeSlide: number;
};

export default function SwiperMenu({ activeSlide }: SwiperMenuProps) {
  const swiper = useSwiper();

  const menuLabels = menuLabel.get(activeSlide);
  const prevLabel = menuLabels ? menuLabels[0] : "Précedent";
  const nextLabel = menuLabels ? menuLabels[1] : "Suivant";

  const handlePrevClick = () => {
    swiper.slidePrev();
  };

  const handleNextClick = () => {
    swiper.slideNext();
  };

  return (
    <div className="flex justify-center align-middle absolute w-full bottom-5 z-10">
      <div className="rounded-3xl">
        {prevLabel && (
          <button
            className="bg-green-500 text-white p-4"
            onClick={handlePrevClick}
          >
            {prevLabel}
          </button>
        )}
        {nextLabel && (
          <button
            className="bg-red-500 text-white p-4"
            onClick={handleNextClick}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}
