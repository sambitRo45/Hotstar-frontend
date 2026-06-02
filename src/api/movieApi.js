import API from './axiosInstance';

// Public movie APIs
export const getAllMovies = () => API.get('/api/movies');
export const getMovieById = (id) => API.get(`/api/movies/${id}`);
export const searchMovies = (keyword) => API.get(`/api/movies/search?keyword=${keyword}`);
export const filterMovies = (genre, language) => {
  const params = new URLSearchParams();
  if (genre) params.append('genre', genre);
  if (language) params.append('language', language);
  return API.get(`/api/movies/filter?${params.toString()}`);
};

// Admin movie APIs
export const addMovie = (data) => API.post('/api/admin/movies', data);
export const updateMovie = (id, data) => API.put(`/api/admin/movies/${id}`, data);
export const deleteMovie = (id) => API.delete(`/api/admin/movies/${id}`);
