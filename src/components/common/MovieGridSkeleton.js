import React from 'react';

const MovieGridSkeleton = ({ count = 8 }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px',
  }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{
        aspectRatio: '2/3',
        borderRadius: 'var(--radius)',
        background: 'linear-gradient(90deg, var(--bg-card) 25%, rgba(255,255,255,0.04) 50%, var(--bg-card) 75%)',
        backgroundSize: '200% 100%',
        animation: `shimmer 1.5s infinite ${i * 0.1}s`,
      }} />
    ))}
    <style>{`
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
  </div>
);

export default MovieGridSkeleton;
