import { useEffect, useState } from "react";
import { getTrendingMedia } from "../../services/mediaService";
import MediaCard from "../MediaCard/MediaCard";
import Carousel from "../Carousel/Carousel";
import TabToggle from "../Button/TabToggle";

function TrendingSection() {
  const [mediaType, setMediaType] = useState("movie");
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const results = await getTrendingMedia(mediaType, "day");
        setMedia(results);
      } catch (err) {
        console.error("Error fetching trending:", err);
        setError("Failed to load trending media.");
      }
    };

    fetchData();
  }, [mediaType]);

  const toggleOptions = [
    { value: "movie", label: "Movies" },
    { value: "tv", label: "TV Series" },
  ];

  return (
    <section className="mb-10 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-purple-600 pl-4">
            Trending
          </h2>
          <TabToggle
            options={toggleOptions}
            active={mediaType}
            onChange={(val) => setMediaType(val)}
          />
        </div>

        {error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <Carousel
            data={media}
            renderItem={(item) => (
              <MediaCard key={`${item.id}`} media={item} />
            )}
          />
        )}
      </div>
    </section>
  );
}

export default TrendingSection;
