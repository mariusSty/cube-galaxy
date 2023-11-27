import { useSwiper } from "swiper/react";

type SwiperMenuProps = {
  activeSlide: number;
};

const menuLabel = [
  { id: 0, label: "Stats", icon: "monitoring" },
  { id: 1, label: "Timer", icon: "timer" },
  { id: 2, label: "Scramble", icon: "deployed_code" },
];

export default function SwiperMenu({ activeSlide }: SwiperMenuProps) {
  const swiper = useSwiper();

  const menu = menuLabel.map(({ id, label, icon }) => (
    <button
      key={id}
      className={`flex justify-center align-middle gap-2 bg-[#030027] ${
        activeSlide === id
          ? `border-4 text-[#F6511D] border-[#F6511D]`
          : `border-2 text-[#FFB400] border-[#FFB400]`
      } p-4 w-24 sm:w-36 rounded-2xl`}
      onClick={() => swiper.slideTo(id)}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  ));

  return (
    <div className="flex justify-evenly align-middle absolute w-full bottom-10 z-10">
      {menu}
    </div>
  );
}
