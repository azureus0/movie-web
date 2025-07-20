import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMediaDetail,
  getMediaVideos,
  getMediaReviews,
} from "../services/mediaService";
import RatingScore from "../components/RatingScore";
import Poster from "../components/Media/Poster";
import TrailerModal from "../components/TrailerModal";
import TrailerButton from "../components/Button/TrailerButton";
import Review from "../components/Section/Review";

const MediaDetail = () => {
  const { mediaType, id } = useParams();
  const realId = id.split("-")[0];
  const [data, setData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const [detail, videoData, reviewData] = await Promise.all([
          getMediaDetail(mediaType, realId),
          getMediaVideos(mediaType, realId),
          getMediaReviews(mediaType, realId),
        ]);
        setData(detail);
        setVideos(videoData.filter((v) => v.site === "YouTube"));
        setReviews(reviewData);
      } catch (err) {
        console.error("Failed to load media detail", err);
      }
    };

    fetchDetail();
  }, [mediaType, realId]);

  if (!data) return null;

  const bgImage = data.backdrop_path || data.poster_path;
  const finalBgUrl = bgImage
    ? `https://image.tmdb.org/t/p/original${bgImage}`
    : "https://via.placeholder.com/1280x720?text=No+Background";

  const title = data.title || data.name;
  const genres = data.genres?.map((g) => g.name) || [];
  const hours = Math.floor((data.runtime || 0) / 60);
  const minutes = (data.runtime || 0) % 60;
  const runtime =
    data.runtime > 0 ? `${hours > 0 ? `${hours}h ` : ""}${minutes}m` : "N/A";
  const overview = data.overview;
  const formattedReleaseDate = (data.release_date || data.first_air_date)
    ? new Date(data.release_date || data.first_air_date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    : "Unknown Date";


  return (
    <div className="text-white bg-[#111] min-h-screen">
      {/* BACKDROP IMAGE */}
      <section className="relative h-[350px]">
        <div className="relative w-full max-w-[1500px] mx-auto h-full">
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${finalBgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center 25%",
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute -left-1 top-0 h-full w-40 bg-gradient-to-r from-[#111] to-transparent" />
          <div className="absolute -right-1 top-0 h-full w-40 bg-gradient-to-l from-[#111] to-transparent" />
          <div className="absolute -bottom-1 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#111]" />
        </div>
      </section>

      {/* OVERLAPPING CARD SECTION */}
      <section className="relative max-w-6xl mx-auto px-6 -mt-40 z-20">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Poster */}
          <div className="w-[250px] shrink-0">
            <Poster posterPath={data.poster_path} title={title} />
          </div>

          {/* Info Content */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="p-6">
              <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
              <p className="text-gray-300 text-sm mt-1 mb-4">
                {formattedReleaseDate}
                {data.runtime > 0 && ` • ${hours > 0 ? `${hours}h ` : ""}${minutes}m`}
              </p>



              <div className="flex items-center gap-5 flex-wrap">
                <div className="flex items-center gap-1">
                  <RatingScore value={data.vote_average || 0} />
                  <span className="text-md font-semibold text-gray-500">/ 10</span>
                </div>

                <TrailerButton
                  videoKey={videos[0]?.key}
                  onClick={(key) => setTrailerKey(key)}
                />
              </div>
            </div>

            <div className="px-6">
              <p className="text-gray-300 text-base leading-relaxed text-justify">
                {overview || "No overview available."}
              </p>
            </div>

            {/* Genre */}
            <div className="px-6">
              <div className="flex flex-wrap gap-3 py-2">
                {genres.map((genre, idx) => (
                  <span
                    key={idx}
                    className="border border-white/30 px-4 py-1 rounded-full text-sm bg-white/5 hover:bg-white/10 transition"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAILER POP UP */}
      <TrailerModal videoKey={trailerKey} onClose={() => setTrailerKey(null)} />

      {/* REVIEW SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-purple-500 pl-4">
          Reviews ({reviews.length})
        </h2>
        <Review reviews={reviews} />
      </section>
    </div>
  );
};

export default MediaDetail;
