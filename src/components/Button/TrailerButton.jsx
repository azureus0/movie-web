import { FaPlay } from "react-icons/fa";

const TrailerButton = ({ videoKey, onClick }) => {
  if (!videoKey) return null;

  return (
    <button
      onClick={() => onClick(videoKey)}
      className="relative w-44 h-10 inline-flex items-center justify-center gap-2 text-white font-semibold text-sm rounded-full overflow-hidden shadow-md group bg-purple-700 hover:bg-purple-800 transition duration-300 cursor-pointer"
    >
      <FaPlay className="w-3.5 h-3.5" />
      <span className="relative z-10">Watch Trailer</span>
    </button>
  );
};

export default TrailerButton;
