import React, { useState } from 'react';
import { MdSearch, MdClose } from 'react-icons/md';

const SearchBar = ({ onSearch, placeholder = 'Search movies, genres...' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const clear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', maxWidth: '480px', width: '100%' }}>
      <MdSearch size={20} style={{
        position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
        color: 'var(--text-muted)', pointerEvents: 'none',
      }} />
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          color: 'var(--text-primary)',
          padding: '12px 44px 12px 44px',
          fontSize: '0.95rem',
          fontFamily: 'var(--font-body)',
          outline: 'none',
          transition: 'var(--transition)',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'var(--accent-dim)'; }}
        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
      />
      {query && (
        <button type="button" onClick={clear} style={{
          position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', display: 'flex', alignItems: 'center',
        }}>
          <MdClose size={18} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
