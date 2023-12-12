import useBreakPoints from "@/hooks/useBreakPoints";
import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "../atoms/Box";
import SwiperMenu from "../molecules/SwiperMenu";
import PreviewPanel from "./PreviewPanel";

type AppTemplateProps = {
  renderTimerPanel: () => JSX.Element;
  renderResumePanel: () => JSX.Element;
  renderTimesPanel: () => JSX.Element;
  renderPreviewPanel: () => JSX.Element;
  isTimerFocused: boolean;
};

export default function AppTemplate({
  renderTimerPanel,
  renderResumePanel,
  renderTimesPanel,
  renderPreviewPanel,
  isTimerFocused,
}: AppTemplateProps) {
  const { isMediumScreen, isLargeScreen, isXlScreen } = useBreakPoints();
  const [activeSlide, setActiveSlide] = useState<number>(1);

  if (isMediumScreen || isLargeScreen || isXlScreen) {
    return (
      <div className="grid grid-cols-3 grid-rows-3 gap-6 p-8 h-full w-full">
        <div className="row-start-1 row-end-3 col-start-2 col-end-4">
          {renderTimerPanel()}
        </div>
        <div className="row-start-1 row-end-4">{renderTimesPanel()}</div>
        {renderResumePanel()}
        <Box>{renderPreviewPanel()}</Box>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Swiper
        allowTouchMove={false}
        className="w-full h-full"
        initialSlide={1}
        modules={[Pagination, Navigation]}
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        runCallbacksOnInit={false}
      >
        <SwiperSlide>
          <div className="flex flex-col p-8 sm:p-12 gap-8 sm:gap-12 h-[calc(100%-60px)]">
            {renderResumePanel()}
            {renderTimesPanel()}
          </div>
        </SwiperSlide>
        <SwiperSlide>{renderTimerPanel()}</SwiperSlide>
        <SwiperSlide>
          <PreviewPanel>{renderPreviewPanel()}</PreviewPanel>
        </SwiperSlide>
        {!isTimerFocused && <SwiperMenu activeSlide={activeSlide} />}
      </Swiper>
    </div>
  );
}
