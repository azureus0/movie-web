import { Link } from "react-router-dom";

function MediaCardHero({ media }) {
  const imageUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w300${media.poster_path}`
    : "https://via.placeholder.com/150x225?text=No+Image";
  const title = media.title || media.name;
  const url = `/${media.media_type || "movie"}/${media.id}`;

  return (
    <Link
      to={url}
      className="cursor-pointer w-[140px] flex-shrink-0 text-gray-100 block bg-black/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:bg-black/20 transition"
    >
      <div className="h-[200px] bg-gray-800">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover drop-shadow-lg"
        />
      </div>

      <div className="p-2 text-sm">
        <h2 className="font-semibold leading-snug line-clamp-2 text-sm min-h-[40px]">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default MediaCardHero;
