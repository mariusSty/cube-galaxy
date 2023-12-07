import { useSwiper } from "swiper/react";
import Icon from "../atoms/Icon";

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
      className={`flex justify-center align-middle gap-2 p-4  ${
        activeSlide === id
          ? `text-[#F6511D] bg-[#030027]`
          : `text-[#FFB400] bg-[#151E3F]`
      }`}
      onClick={() => swiper.slideTo(id)}
    >
      <Icon name={icon} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  ));

  return (
    <div className="grid grid-cols-3 absolute w-full bottom-0 z-10 gap-1">
      {menu}
    </div>
  );
}
