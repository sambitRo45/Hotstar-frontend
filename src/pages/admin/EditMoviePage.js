import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById, updateMovie } from '../../api/movieApi';
import MovieForm from '../../components/admin/MovieForm';
import { MdArrowBack } from 'react-icons/md';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const EditMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovieById(id)
      .then(res => setMovie(res.data))
      .catch(() => { toast.error('Movie not found'); navigate('/admin/movies'); })
      .finally(() => setFetching(false));
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await updateMovie(id, data);
      toast.success('Movie updated!');
      navigate('/admin/movies');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Update failed';
      toast.error(typeof msg === 'string' ? msg : 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
      <Loader size={40} />
    </div>
  );

  const initialData = movie ? {
    title: movie.title || '',
    description: movie.description || '',
    genre: movie.genre || '',
    language: movie.language || '',
    releaseDate: movie.releaseDate || '',
    duration: movie.duration || '',
    rating: movie.rating || '',
    posterUrl: movie.posterUrl || '',
    bannerUrl: movie.bannerUrl || '',
    trailerUrl: movie.trailerUrl || '',
  } : {};

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <button onClick={() => navigate('/admin/movies')} style={{
          background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)',
          fontSize: '0.88rem', marginBottom: '12px', transition: 'color 0.2s', padding: 0,
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <MdArrowBack size={16} /> Back to Movies
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '0.05em', marginBottom: '4px' }}>EDIT MOVIE</h1>
        <p style={{ color: 'var(--text-muted)' }}>Update details for: <span style={{ color: 'var(--accent)' }}>{movie?.title}</span></p>
      </div>
      <div className="card" style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
        <MovieForm initialData={initialData} onSubmit={handleSubmit} loading={loading} submitLabel="Update Movie" />
      </div>
    </div>
  );
};

export default EditMoviePage;
