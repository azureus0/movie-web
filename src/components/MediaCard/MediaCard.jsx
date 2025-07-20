import { Link } from "react-router-dom";
import RatingScore from "../RatingScore";

function MediaCard({ media, onClick }) {
  const imageUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w300${media.poster_path}`
    : "https://via.placeholder.com/150x225?text=No+Image";

  const title = media.title || media.name;
  const dateStr = media.release_date || media.first_air_date;
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "Unknown Date";

  const voteAverage =
    media.vote_count === 0 || media.vote_average === 0
      ? "NR"
      : media.vote_average;

  const mediaType = media.media_type || "movie";
  const url = `/${mediaType}/${media.id}`;

  return (
    <Link
      to={url}
      onClick={onClick}
      className="cursor-pointer w-[160px] flex-shrink-0 text-white block bg-[#1c1d1c] rounded-lg shadow hover:bg-white/10 transition"
    >
      <div className="rounded-t-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 h-[240px] bg-gray-800">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <h2 className="font-semibold leading-snug line-clamp-2 text-base min-h-[44px]">
          {title}
        </h2>

        <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
          <span>{formattedDate}</span>
          <RatingScore
            value={voteAverage}
            starSize="text-sm"
            textSize="text-sm"
          />
        </div>
      </div>
    </Link>
  );
}

export default MediaCard;
