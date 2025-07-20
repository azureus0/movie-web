import tmdbApi from "./api";

// search movie & tv series pake keyword
export const searchMulti = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get("/search/multi", {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// detail movie & tv series
export const getMediaDetail = async (mediaType, id) => {
  try {
    const response = await tmdbApi.get(`/${mediaType}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// trending movie & tv series
export const fetchTrendingAll = async (timeWindow = "day") => {
  try {
    const response = await tmdbApi.get(`/trending/all/${timeWindow}`, {
      params: { language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

// video movie & tv series
export const getMediaVideos = async (mediaType, id) => {
  try {
    const response = await tmdbApi.get(`/${mediaType}/${id}/videos`);
    const allVideos = response.data.results;

    const filteredVideos = allVideos.filter(
      (vid) =>
        vid.type === "Trailer" &&
        vid.official === true &&
        vid.size >= 720 &&
        vid.site === "YouTube"
    );

    return filteredVideos;
  } catch (error) {
    throw error;
  }
};

// reviews movie & tv series
export const getMediaReviews = async (mediaType, id, page = 1) => {
  try {
    const response = await tmdbApi.get(`/${mediaType}/${id}/reviews`, {
      params: { page },
    });
    return response.data.results.map((r) => ({
      author: r.author,
      content: r.content,
      rating: r.author_details.rating,
      name: r.author_details.name,
      username: r.author_details.username,
      avatar_path: r.author_details.avatar_path,
      created_at: r.created_at,
    }));
  } catch (error) {
    throw error;
  }
};

export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get("/movie/now_playing", {
      params: {
        language: "en-US",
        page,
      },
    });
    return response.data.results; 
  } catch (error) {
    throw error;
  }
};

export const getAiringTodayTV = async (page = 1) => {
  try {
    const response = await tmdbApi.get("/tv/airing_today", {
      params: {
        language: "en-US",
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get("/movie/upcoming", {
      params: {
        language: "en-US",
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};


export const getPopularMedia = async (mediaType = "movie", page = 1) => {
  try {
    const response = await tmdbApi.get(`/${mediaType}/popular`, {
      params: {
        language: "en-US",
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};


export const getTrendingMedia = async (
  mediaType = "movie",
  timeWindow = "day"
) => {
  try {
    const response = await tmdbApi.get(`/trending/${mediaType}/${timeWindow}`, {
      params: { language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
