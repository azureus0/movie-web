const Poster = ({ posterPath, title }) => {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w400${posterPath}`
    : "https://via.placeholder.com/250x375?text=No+Image";

  return (
    <div>
      <img
        src={imageUrl}
        alt={title}
        className="rounded-xl shadow-2xl w-[250px] md:w-[300px]"
      />
    </div>
  );
};

export default Poster;
