import React, { useState } from "react";

const Review = ({ reviews }) => {
  const [visibleCount, setVisibleCount] = useState(1);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No reviews yet 😴
      </div>
    );
  }

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-6">
      {reviews.slice(0, visibleCount).map((review, index) => {
        const avatar = review.avatar_path;
        const avatarUrl = avatar
          ? avatar.startsWith("/https")
            ? avatar.slice(1)
            : `https://image.tmdb.org/t/p/w45${avatar}`
          : `https://ui-avatars.com/api/?name=${review.username}`;

        const dateObj = Date.parse(review.created_at)
          ? new Date(review.created_at)
          : new Date();

        const createdDate = dateObj.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const isLong = review.content.length > 500;
        const isExpanded = expandedIndexes.includes(index);
        const displayedText = isExpanded
          ? review.content
          : isLong
            ? review.content.slice(0, 500) + "..."
            : review.content;

        return (
          <div
            key={index}
            className="flex flex-col gap-3 bg-white/5 p-6 rounded-lg shadow hover:bg-white/10 transition"
          >
            <div className="flex items-start gap-4">
              <img
                src={avatarUrl}
                alt={review.username}
                className="w-12 h-12 rounded-full object-cover border border-white/20"
              />

              <div className="flex-1 flex flex-col gap-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-white text-base">
                    {review.author}
                  </h4>

                  {review.rating !== null && (
                    <div className="flex items-center gap-1 bg-white/10 text-sm font-semibold px-2 py-1 rounded-md">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white">{review.rating}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-400">
                  Written on {createdDate}
                </p>
              </div>
            </div>

            <p className="text-sm text-justify text-gray-100 leading-relaxed whitespace-pre-line mt-2">
              {displayedText}
            </p>

            {isLong && (
              <button
                onClick={() => toggleExpanded(index)}
                className="text-sm text-blue-400 self-start cursor-pointer"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        );
      })}

      {visibleCount < reviews.length && (
        <div className="text-center">
          <button
            onClick={handleShowMore}
            className="mt-4 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-sm rounded-md transition cursor-pointer"
          >
            Show more reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default Review;
