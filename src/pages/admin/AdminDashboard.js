import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMovies } from '../../api/movieApi';
import { useAuth } from '../../context/AuthContext';
import { MdMovie, MdAddBox, MdStar, MdTrendingUp } from 'react-icons/md';
import Loader from '../../components/common/Loader';

const StatCard = ({ icon, label, value, color, delay = 0 }) => (
  <div className="card" style={{
    padding: '28px', display: 'flex', alignItems: 'flex-start', gap: '16px',
    animation: `fadeIn 0.4s ease ${delay}s both`,
  }}>
    <div style={{
      width: '52px', height: '52px', borderRadius: 'var(--radius-sm)',
      background: `${color}18`, border: `1px solid ${color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color, flexShrink: 0,
    }}>{icon}</div>
    <div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.05em', lineHeight: 1 }}>{value}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMovies()
      .then(res => setMovies(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const avgRating = movies.length
    ? (movies.reduce((s, m) => s + (m.rating || 0), 0) / movies.filter(m => m.rating).length || 0).toFixed(1)
    : '0.0';

  const genres = [...new Set(movies.map(m => m.genre).filter(Boolean))];

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
      <Loader size={40} />
    </div>
  );

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '0.05em', marginBottom: '6px' }}>
          DASHBOARD
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Welcome back, <span style={{ color: 'var(--accent)' }}>{user?.email}</span></p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <StatCard icon={<MdMovie size={24} />} label="Total Movies" value={movies.length} color="var(--accent)" delay={0} />
        <StatCard icon={<MdStar size={24} />} label="Avg Rating" value={avgRating} color="var(--warning)" delay={0.05} />
        <StatCard icon={<MdTrendingUp size={24} />} label="Genres" value={genres.length} color="#a78bfa" delay={0.1} />
        <StatCard icon={<MdAddBox size={24} />} label="Add New" value="+" color="var(--danger)" delay={0.15} />
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => navigate('/admin/add-movie')} style={{ gap: '8px' }}>
          <MdAddBox size={18} /> Add Movie
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/movies')} style={{ gap: '8px' }}>
          <MdMovie size={18} /> Manage Movies
        </button>
      </div>

      {/* Recent movies table */}
      <div className="card" style={{ padding: '28px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.06em', marginBottom: '20px', color: 'var(--text-secondary)' }}>
          RECENT MOVIES
        </h2>
        {movies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <p>No movies yet. <button onClick={() => navigate('/admin/add-movie')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 'inherit', fontWeight: 600 }}>Add your first movie →</button></p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Title', 'Genre', 'Language', 'Rating', 'Duration'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {movies.slice(0, 8).map((m, i) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s', cursor: 'pointer' }}
                    onClick={() => navigate('/admin/movies')}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '12px 16px', fontWeight: 500, fontSize: '0.92rem' }}>{m.title}</td>
                    <td style={{ padding: '12px 16px' }}>{m.genre ? <span className="badge badge-accent">{m.genre}</span> : <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{m.language || '—'}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--warning)', fontWeight: 600, fontSize: '0.88rem' }}>{m.rating ? `★ ${Number(m.rating).toFixed(1)}` : '—'}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{m.duration ? `${m.duration}m` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default AdminDashboard;
