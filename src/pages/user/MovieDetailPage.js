import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../../api/movieApi';
import { MdStar, MdPlayArrow, MdArrowBack, MdAccessTime, MdCalendarToday, MdLanguage } from 'react-icons/md';
import Loader from '../../components/common/Loader';

const Detail = ({ icon, label, value }) => value ? (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '100px' }}>
    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>{icon}{label}</span>
    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{value}</span>
  </div>
) : null;

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieById(id)
      .then(res => setMovie(res.data))
      .catch(() => navigate('/movies'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '64px' }}>
      <Loader size={48} />
    </div>
  );

  if (!movie) return null;

  const banner = movie.bannerUrl || movie.posterUrl || 'https://placehold.co/1400x500/111118/1ce8b5?text=No+Banner';

  return (
    <div style={{ minHeight: '100vh', paddingTop: '64px' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 'min(70vh, 560px)', overflow: 'hidden' }}>
        <img src={banner} alt={movie.title} onError={e => e.target.src = 'https://placehold.co/1400x500/111118/1ce8b5?text=No+Banner'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.5) 60%, rgba(10,10,15,0.2) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />

        {/* Back button */}
        <button onClick={() => navigate(-1)} style={{
          position: 'absolute', top: '24px', left: '24px',
          background: 'rgba(10,10,15,0.7)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
          padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px',
          cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.88rem',
          backdropFilter: 'blur(4px)', transition: 'var(--transition)',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <MdArrowBack size={18} /> Back
        </button>

        {/* Content overlay */}
        <div style={{
          position: 'absolute', bottom: '40px', left: 'clamp(24px, 5vw, 64px)',
          maxWidth: '600px', animation: 'fadeIn 0.5s ease',
        }}>
          {movie.genre && <span className="badge badge-accent" style={{ marginBottom: '12px', display: 'inline-flex' }}>{movie.genre}</span>}
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '0.04em', marginBottom: '16px', lineHeight: 1,
          }}>{movie.title}</h1>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {movie.rating && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warning)', fontWeight: 700 }}>
                <MdStar size={20} />{Number(movie.rating).toFixed(1)} / 10
              </span>
            )}
            {movie.duration && <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><MdAccessTime size={16} />{movie.duration} min</span>}
            {movie.language && <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', fontSize: '0.88rem' }}><MdLanguage size={16} />{movie.language}</span>}
          </div>
        </div>
      </div>

      {/* Details section */}
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'start' }}>
          <div>
            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '36px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => navigate(`/watch/${movie.id}`)} style={{ gap: '8px' }}>
                <MdPlayArrow size={22} /> Watch Now
              </button>
              {movie.trailerUrl && (
                <a href={movie.trailerUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-lg">
                  Watch Trailer
                </a>
              )}
            </div>

            {/* Description */}
            {movie.description && (
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>SYNOPSIS</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.97rem', maxWidth: '680px' }}>{movie.description}</p>
              </div>
            )}

            {/* Details grid */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
              <Detail icon={<MdCalendarToday size={12} />} label="Release" value={movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null} />
              <Detail icon={<MdAccessTime size={12} />} label="Duration" value={movie.duration ? `${movie.duration} min` : null} />
              <Detail icon={<MdLanguage size={12} />} label="Language" value={movie.language} />
              <Detail label="Genre" value={movie.genre} />
              <Detail label="Rating" value={movie.rating ? `${Number(movie.rating).toFixed(1)} / 10` : null} />
            </div>
          </div>

          {/* Poster */}
          {movie.posterUrl && (
            <div style={{ width: 'clamp(150px, 20vw, 220px)', flexShrink: 0 }}>
              <img src={movie.posterUrl} alt={movie.title} onError={e => e.target.style.display = 'none'}
                style={{ width: '100%', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-elevated)' }} />
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default MovieDetailPage;
