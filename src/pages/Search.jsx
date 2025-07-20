import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMulti } from "../services/mediaService";
import MediaCard from "../components/MediaCard/MediaCard";
import Pagination from "../components/Pagination/Pagination";

const ITEMS_PER_PAGE = 20;

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const pageParam = parseInt(searchParams.get("page") || "1");
  const [query, setQuery] = useState(queryParam);
  const [filteredResults, setFilteredResults] = useState([]);
  const [totalFilteredPages, setTotalFilteredPages] = useState(1);

  useEffect(() => {
    const fetchFilteredData = async () => {
      if (!queryParam) return;

      try {
        let filtered = [];
        let tmdbPage = 1;
        const maxTmdbPage = 10;

        while (
          filtered.length < ITEMS_PER_PAGE * pageParam &&
          tmdbPage <= maxTmdbPage
        ) {
          const data = await searchMulti(queryParam, tmdbPage);
          const currentFiltered = data.results.filter(
            (item) => item.media_type === "movie" || item.media_type === "tv"
          );

          filtered = [...filtered, ...currentFiltered];

          if (tmdbPage >= data.total_pages) break;
          tmdbPage++;
        }

        const startIdx = (pageParam - 1) * ITEMS_PER_PAGE;
        const endIdx = startIdx + ITEMS_PER_PAGE;
        const sliced = filtered.slice(startIdx, endIdx);

        setFilteredResults(sliced);
        setTotalFilteredPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      }
    };

    fetchFilteredData();
  }, [queryParam, pageParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ query: query.trim(), page: "1" });
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ query: queryParam, page: newPage.toString() });
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {filteredResults.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredResults.map((item) => (
                <MediaCard
                  key={`${item.media_type}-${item.id}`}
                  media={item}
                />
              ))}
            </div>

            <div className="mt-10">
              <Pagination
                currentPage={pageParam}
                totalPages={totalFilteredPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-32">
            No results found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;
