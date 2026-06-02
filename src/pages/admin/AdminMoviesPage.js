import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMovies, deleteMovie } from '../../api/movieApi';
import { MdAddBox, MdEdit, MdDelete, MdSearch, MdStar, MdMovie } from 'react-icons/md';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const AdminMoviesPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true);
    getAllMovies()
      .then(res => setMovies(res.data))
      .catch(() => toast.error('Failed to load movies'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this movie? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await deleteMovie(id);
      setMovies(ms => ms.filter(m => m.id !== id));
      toast.success('Movie deleted');
    } catch {
      toast.error('Failed to delete movie');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = movies.filter(m =>
    m.title?.toLowerCase().includes(search.toLowerCase()) ||
    m.genre?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '0.05em', marginBottom: '4px' }}>MOVIES</h1>
          <p style={{ color: 'var(--text-muted)' }}>{movies.length} total movies</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/admin/add-movie')} style={{ gap: '8px' }}>
          <MdAddBox size={18} /> Add Movie
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: '380px', marginBottom: '24px' }}>
        <MdSearch size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search movies..."
          style={{
            width: '100%', background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)', padding: '10px 16px 10px 42px',
            fontSize: '0.92rem', fontFamily: 'var(--font-body)', outline: 'none',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'var(--accent-dim)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
        />
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
          <Loader size={40} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <MdMovie size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
          <p style={{ fontSize: '1rem' }}>
            {search ? `No movies match "${search}"` : 'No movies yet.'}
          </p>
          {!search && (
            <button className="btn btn-primary" onClick={() => navigate('/admin/add-movie')} style={{ marginTop: '20px', gap: '8px' }}>
              <MdAddBox size={18} /> Add First Movie
            </button>
          )}
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  {['Poster', 'Title', 'Genre', 'Language', 'Rating', 'Duration', 'Actions'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '10px 16px' }}>
                      {m.posterUrl ? (
                        <img src={m.posterUrl} alt={m.title} onError={e => e.target.style.display = 'none'}
                          style={{ width: '36px', height: '52px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border)' }} />
                      ) : (
                        <div style={{ width: '36px', height: '52px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <MdMovie size={16} style={{ color: 'var(--text-muted)' }} />
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '10px 16px', fontWeight: 600, fontSize: '0.92rem', maxWidth: '200px' }}>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</div>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      {m.genre ? <span className="badge badge-accent">{m.genre}</span> : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-secondary)', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>{m.language || '—'}</td>
                    <td style={{ padding: '10px 16px', color: 'var(--warning)', fontWeight: 600, fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
                      {m.rating ? <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MdStar size={14} />{Number(m.rating).toFixed(1)}</span> : '—'}
                    </td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-secondary)', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>{m.duration ? `${m.duration}m` : '—'}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => navigate(`/admin/edit-movie/${m.id}`)}
                          style={{ gap: '4px', padding: '6px 12px' }}
                        >
                          <MdEdit size={15} /> Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(m.id)}
                          disabled={deleting === m.id}
                          style={{ gap: '4px', padding: '6px 12px' }}
                        >
                          {deleting === m.id ? <Loader size={14} /> : <><MdDelete size={15} /> Delete</>}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMoviesPage;
