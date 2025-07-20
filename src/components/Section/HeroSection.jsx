import { useEffect, useState } from "react";
import MediaCardHero from "../MediaCard/MediaCardHero";
import CarouselHero from "../Carousel/CarouselHero";
import { getUpcomingMovies } from "../../services/mediaService";
import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [media, setMedia] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const navigate = useNavigate();

  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date)
      ? "Unknown Date"
      : date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
  };

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getUpcomingMovies();
        setUpcoming(data);
        setMedia(data[0]);
      } catch (error) {
        console.error("Gagal memuat upcoming movie:", error);
        setError("Gagal memuat carousel.");
      }
    };

    fetchHero();
  }, []);

  useEffect(() => {
    if (upcoming.length > 0) {
      setIsFading(true);
      setTimeout(() => {
        setMedia(upcoming[activeIndex]);
        setIsFading(false);
      }, 300);
    }
  }, [activeIndex, upcoming]);

  if (!media) return null;

  const handleTitleClick = () => {
    const type = media.media_type || "movie";
    navigate(`/${type}/${media.id}`);
  };

  return (
    <section className="relative min-h-[600px] w-full overflow-visible bg-black max-w-7xl mx-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1500px] h-full overflow-hidden z-0">
        <img
          key={media.id}
          src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
          alt={media.title}
          className={`absolute inset-0 w-full h-full object-cover object-[center_10%] transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"
            }`}
        />
      </div>

      <div className="absolute inset-0 bg-black/10 z-10" />
      <div className="absolute -left-1 top-0 h-full w-40 bg-gradient-to-r from-[#111] to-transparent z-10" />
      <div className="absolute -right-1 top-0 h-full w-40 bg-gradient-to-l from-[#111] to-transparent z-10" />
      <div className="absolute -bottom-1 left-0 right-0 h-80 bg-gradient-to-b from-transparent to-[#111] z-10" />

      <div className="relative z-20 flex flex-col justify-center h-full pt-40 sm:pt-24 pb-10 px-4 sm:px-6 md:pl-0 md:pr-6">
        <div className="max-w-xl text-white mb-6 mr-auto">
          <span className="inline-block bg-purple-700 text-sm sm:text-base md:text-lg font-semibold px-3 py-1 rounded mb-3 text-gray-100">
            Upcoming
          </span>

          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight cursor-pointer line-clamp-2 min-h-[60px] text-left"
            style={{ textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)" }}
            onClick={handleTitleClick}
          >
            {media.title || media.name}
          </h1>

          <div
            className="flex items-center text-sm sm:text-base text-white font-medium mb-4 gap-2"
            style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.75)" }}
          >
            <FiCalendar className="text-purple-400" />
            <span>{formatFullDate(media.release_date || media.first_air_date)}</span>
          </div>

          <p
            className="text-base text-white/90 mb-5 line-clamp-4 min-h-[96px] text-justify"
            style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.7)" }}
          >
            {media.overview}
          </p>
        </div>

        {error ? (
          <p className="text-red-400 mt-2 text-sm block sm:hidden">{error}</p>
        ) : (
          <div className="sm:hidden pt-1">
            <CarouselHero
              data={upcoming}
              itemPadding="px-1"
              onSlideChange={(idx) => setActiveIndex(idx)}
              renderItem={(item) => (
                <MediaCardHero
                  key={item.id}
                  media={item}
                  onClick={() => setMedia(item)}
                />
              )}
            />
          </div>
        )}
      </div>

      {!error && (
        <div className="hidden sm:block absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 w-[75vw] max-w-[440px]">
          <CarouselHero
            data={upcoming}
            itemPadding="px-1"
            onSlideChange={(idx) => setActiveIndex(idx)}
            renderItem={(item) => (
              <MediaCardHero
                key={item.id}
                media={item}
                onClick={() => setMedia(item)}
              />
            )}
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
