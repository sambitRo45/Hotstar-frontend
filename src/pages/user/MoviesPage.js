import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllMovies, searchMovies, filterMovies } from '../../api/movieApi';
import MovieCard from '../../components/common/MovieCard';
import SearchBar from '../../components/common/SearchBar';
import MovieGridSkeleton from '../../components/common/MovieGridSkeleton';
import { MdFilterList, MdClose } from 'react-icons/md';

const GENRES = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi', 'Animation', 'Documentary'];
const LANGUAGES = ['All', 'English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada'];

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState('All');
  const [language, setLanguage] = useState('All');

  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (query) {
        res = await searchMovies(query);
      } else if (genre !== 'All' || language !== 'All') {
        res = await filterMovies(genre !== 'All' ? genre : null, language !== 'All' ? language : null);
      } else {
        res = await getAllMovies();
      }
      setMovies(res.data);
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [query, genre, language]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleSearch = (q) => {
    setQuery(q);
    setGenre('All');
    setLanguage('All');
    if (q) setSearchParams({ q });
    else setSearchParams({});
  };

  const clearFilters = () => { setGenre('All'); setLanguage('All'); setQuery(''); setSearchParams({}); };
  const hasFilters = genre !== 'All' || language !== 'All' || query;

  const chipStyle = (active) => ({
    padding: '6px 16px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600,
    cursor: 'pointer', border: 'none', transition: 'all 0.2s', fontFamily: 'var(--font-body)',
    background: active ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
    color: active ? '#0a0a0f' : 'var(--text-secondary)',
    boxShadow: active ? 'var(--accent-glow)' : 'none',
  });

  return (
    <div style={{ paddingTop: '88px', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 className="section-title" style={{ marginBottom: '8px' }}>BROWSE MOVIES</h1>
          <p style={{ color: 'var(--text-muted)' }}>{loading ? '...' : `${movies.length} titles`}</p>
        </div>

        {/* Search + Filters */}
        <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <SearchBar onSearch={handleSearch} />
            {hasFilters && (
              <button onClick={clearFilters} className="btn btn-secondary btn-sm" style={{ gap: '6px', whiteSpace: 'nowrap' }}>
                <MdClose size={16} /> Clear Filters
              </button>
            )}
          </div>

          {/* Genre chips */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <MdFilterList size={16} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Genre</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {GENRES.map(g => (
                <button key={g} style={chipStyle(genre === g)} onClick={() => { setGenre(g); setQuery(''); setSearchParams({}); }}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Language chips */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Language</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {LANGUAGES.map(l => (
                <button key={l} style={chipStyle(language === l)} onClick={() => { setLanguage(l); setQuery(''); setSearchParams({}); }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <MovieGridSkeleton count={12} />
        ) : movies.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))',
            gap: '20px',
          }}>
            {movies.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🎬</p>
            <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No movies found</p>
            <p style={{ fontSize: '0.88rem' }}>Try different search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
