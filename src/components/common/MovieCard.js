import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdStar, MdPlayArrow, MdAccessTime } from 'react-icons/md';

const FALLBACK_POSTER = 'https://placehold.co/300x450/16161f/1ce8b5?text=No+Poster';

const MovieCard = ({ movie, onEdit, onDelete, isAdmin = false }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const poster = (!imgError && movie.posterUrl) ? movie.posterUrl : FALLBACK_POSTER;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-accent)' : 'var(--border)'}`,
        transform: hovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(28,232,181,0.15)' : 'none',
        aspectRatio: '2/3',
      }}
      onClick={() => !isAdmin && navigate(`/movie/${movie.id}`)}
    >
      {/* Poster image */}
      <img
        src={poster}
        alt={movie.title}
        onError={() => setImgError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Gradient overlay always visible at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(10,10,15,0.98) 0%, rgba(10,10,15,0.6) 50%, transparent 100%)',
        padding: '48px 14px 14px',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          letterSpacing: '0.04em',
          color: 'var(--text-primary)',
          marginBottom: '6px',
          lineHeight: 1.2,
        }}>{movie.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {movie.rating && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--warning)', fontSize: '0.78rem', fontWeight: 600 }}>
              <MdStar size={14} />{Number(movie.rating).toFixed(1)}
            </span>
          )}
          {movie.genre && (
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '20px' }}>
              {movie.genre}
            </span>
          )}
          {movie.duration && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
              <MdAccessTime size={12} />{movie.duration}m
            </span>
          )}
        </div>
      </div>

      {/* Hover overlay with play button */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(10,10,15,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        gap: '12px',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s',
      }}>
        {!isAdmin && (
          <div style={{
            width: 54, height: 54,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--accent-glow)',
            transform: hovered ? 'scale(1)' : 'scale(0.8)',
            transition: 'transform 0.3s',
          }}>
            <MdPlayArrow size={28} color="#0a0a0f" />
          </div>
        )}

        {isAdmin && (
          <div style={{ display: 'flex', gap: '8px' }} onClick={e => e.stopPropagation()}>
            <button className="btn btn-secondary btn-sm" onClick={() => onEdit(movie)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(movie.id)}>Delete</button>
          </div>
        )}
      </div>

      {/* Language badge top-right */}
      {movie.language && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(10,10,15,0.8)',
          backdropFilter: 'blur(4px)',
          border: '1px solid var(--border)',
          padding: '3px 8px',
          borderRadius: '4px',
          fontSize: '0.68rem',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          {movie.language}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
