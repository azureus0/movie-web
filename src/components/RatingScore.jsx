import { FaStar } from "react-icons/fa";

const RatingScore = ({ value, starSize = "text-xl", textSize = "text-lg" }) => {
  const isNotRated = value === "NR";

  return (
    <div className="flex items-center gap-2">
      <FaStar className={`text-yellow-400 ${starSize}`} />
      <div className={`${textSize} font-semibold text-gray-300`}>
        {isNotRated ? "NR" : value.toFixed(1)}
      </div>
    </div>
  );
};

export default RatingScore;
