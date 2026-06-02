import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../../api/movieApi';
import HeroBanner from '../../components/common/HeroBanner';
import MovieCard from '../../components/common/MovieCard';
import MovieGridSkeleton from '../../components/common/MovieGridSkeleton';

const SectionRow = ({ title, movies }) => (
  <section style={{ marginBottom: '48px' }}>
    <h2 style={{
      fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
      letterSpacing: '0.05em', marginBottom: '20px', paddingLeft: '24px',
      borderLeft: '3px solid var(--accent)',
    }}>{title}</h2>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '16px',
    }}>
      {movies.map(m => <MovieCard key={m.id} movie={m} />)}
    </div>
  </section>
);

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMovies()
      .then(res => setMovies(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const byGenre = (genre) => movies.filter(m => m.genre === genre);
  const genres = [...new Set(movies.map(m => m.genre).filter(Boolean))];

  return (
    <div style={{ paddingTop: '64px' }}>
      {loading ? (
        <div style={{ padding: '120px 24px 48px' }}>
          <div style={{ height: '60px', background: 'var(--bg-card)', borderRadius: 'var(--radius)', marginBottom: '32px' }} className="skeleton" />
          <MovieGridSkeleton count={10} />
        </div>
      ) : (
        <>
          <HeroBanner movies={movies} />
          <div className="container">
            {/* All movies row */}
            {movies.length > 0 && (
              <SectionRow title="ALL MOVIES" movies={movies} />
            )}
            {/* Genre rows */}
            {genres.slice(0, 3).map(genre => (
              byGenre(genre).length > 0 && (
                <SectionRow key={genre} title={genre.toUpperCase()} movies={byGenre(genre)} />
              )
            ))}
            {movies.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1.1rem' }}>No movies available yet.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
