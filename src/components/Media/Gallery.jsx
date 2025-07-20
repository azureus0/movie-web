const Gallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 pb-12">
      <h2 className="text-2xl font-semibold text-white mb-4">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.slice(0, 8).map((img, i) => (
          <img
            key={i}
            src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
            alt={`Still ${i + 1}`}
            className=" object-cover w-full h-[160px]"
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
