import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BREAKPOINT_SETTINGS = {
  breakpoints: {
    1536: { slidesPerView: 6, slidesPerGroup: 6 },
    1280: { slidesPerView: 6, slidesPerGroup: 6 },
    1024: { slidesPerView: 4.5, slidesPerGroup: 4 },
    768: { slidesPerView: 3, slidesPerGroup: 3 },
    640: { slidesPerView: 3, slidesPerGroup: 3 },
    480: { slidesPerView: 2, slidesPerGroup: 2 },
    0: { slidesPerView: 1.4, slidesPerGroup: 1 },
  },
};

const Carousel = ({
  data = [],
  renderItem,
  settings = {},
  itemPadding = "px-2",
}) => {
  const swiperRef = useRef(null);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <div className="relative group w-full">
      <button
        onClick={handlePrev}
        className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition cursor-pointer"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        onClick={handleNext}
        className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition cursor-pointer"
      >
        <ChevronRight size={26} />
      </button>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          speed={500}
          loop={false}
          navigation={false}
          spaceBetween={5}
          {...BREAKPOINT_SETTINGS}
          {...settings}
        >
          {data.map((item, index) => (
            <SwiperSlide key={item.id || index} className={itemPadding}>
              {renderItem(item)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
