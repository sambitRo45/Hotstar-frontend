import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../../api/movieApi';
import { MdArrowBack, MdPlayCircle } from 'react-icons/md';
import Loader from '../../components/common/Loader';

const getEmbedUrl = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      return v ? `https://www.youtube.com/embed/${v}?autoplay=1` : null;
    }
    if (u.hostname.includes('youtu.be')) {
      const v = u.pathname.slice(1);
      return `https://www.youtube.com/embed/${v}?autoplay=1`;
    }
    // If it's a direct video URL or other embeddable, return as-is
    return url;
  } catch {
    return url;
  }
};

const WatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    getMovieById(id)
      .then(res => setMovie(res.data))
      .catch(() => navigate('/movies'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
      <Loader size={48} />
    </div>
  );

  if (!movie) return null;

  const embedUrl = getEmbedUrl(movie.trailerUrl);

  return (
    <div style={{ minHeight: '100vh', background: '#000', paddingTop: '64px' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        padding: '16px 24px',
        background: 'rgba(10,10,15,0.95)',
        borderBottom: '1px solid var(--border)',
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
          color: 'var(--text-primary)', padding: '7px 14px', display: 'flex', alignItems: 'center',
          gap: '6px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.88rem',
          transition: 'var(--transition)',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <MdArrowBack size={16} /> Back
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
          {movie.title}
        </h1>
        {movie.genre && <span className="badge badge-accent">{movie.genre}</span>}
      </div>

      {/* Player */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '24px 24px 0' }}>
        <div style={{
          position: 'relative', width: '100%', paddingBottom: '56.25%', /* 16:9 */
          background: '#111118', borderRadius: 'var(--radius)', overflow: 'hidden',
          border: '1px solid var(--border)',
        }}>
          {playing && embedUrl ? (
            <iframe
              src={embedUrl}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            /* Poster / play overlay */
            <div
              onClick={() => embedUrl && setPlaying(true)}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: embedUrl ? 'pointer' : 'default',
                backgroundImage: movie.bannerUrl || movie.posterUrl ? `url(${movie.bannerUrl || movie.posterUrl})` : 'none',
                backgroundSize: 'cover', backgroundPosition: 'center',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,15,0.65)' }} />
              <div style={{ position: 'relative', textAlign: 'center' }}>
                {embedUrl ? (
                  <>
                    <MdPlayCircle size={80} style={{ color: 'var(--accent)', filter: 'drop-shadow(0 0 20px rgba(28,232,181,0.5))', marginBottom: '16px' }} />
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Click to play</p>
                  </>
                ) : (
                  <>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '8px' }}>🎬 No video source available</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>The trailer URL has not been set for this movie.</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Movie info below player */}
        <div style={{ padding: '28px 0 48px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '0.04em', marginBottom: '12px' }}>
            {movie.title}
          </h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {movie.genre && <span className="badge badge-accent">{movie.genre}</span>}
            {movie.language && <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textTransform: 'uppercase' }}>{movie.language}</span>}
            {movie.duration && <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{movie.duration} min</span>}
            {movie.rating && <span style={{ color: 'var(--warning)', fontWeight: 700, fontSize: '0.88rem' }}>★ {Number(movie.rating).toFixed(1)}</span>}
          </div>
          {movie.description && (
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '800px', fontSize: '0.97rem' }}>
              {movie.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
