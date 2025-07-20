import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselHero = ({
  data = [],
  renderItem,
  itemPadding = "px-2",
  onSlideChange,
}) => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (!swiperRef.current) return;
    swiperRef.current.slidePrev();
    swiperRef.current.autoplay?.start();
  };

  const handleNext = () => {
    if (!swiperRef.current) return;
    swiperRef.current.slideNext();
    swiperRef.current.autoplay?.start();
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="flex justify-end mb-4 pr-4 space-x-2">
        <button
          onClick={handlePrev}
          className="bg-black/50 text-white p-2 rounded-full cursor-pointer hover:bg-black/70 transition"
        >
          <ChevronLeft size={26} />
        </button>
        <button
          onClick={handleNext}
          className="bg-black/50 text-white p-2 rounded-full cursor-pointer hover:bg-black/70 transition"
        >
          <ChevronRight size={26} />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          onSlideChange?.(swiper.realIndex);
        }}
        spaceBetween={8}
        slidesPerView={1}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {data.map((item) => (
          <SwiperSlide
            key={item.id}
            className={`shrink-0 ${itemPadding}`}
          >
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselHero;
