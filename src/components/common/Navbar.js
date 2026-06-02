import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MdSearch, MdClose, MdPerson, MdLogout, MdMenu } from 'react-icons/md';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/movies', label: 'Movies' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
      background: scrolled ? 'rgba(10,10,15,0.95)' : 'linear-gradient(to bottom, rgba(10,10,15,0.9) 0%, transparent 100%)',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
      }}>
        {/* Logo */}
        <Link to={isAuthenticated ? '/home' : '/'} style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          color: 'var(--accent)',
          letterSpacing: '0.1em',
          flexShrink: 0,
        }}>
          HOTSTAR
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '4px', alignItems: 'center', flex: 1 }} className="desktop-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                transition: 'var(--transition)',
                textDecoration: 'none',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-accent)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  padding: '7px 14px',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  width: '220px',
                  outline: 'none',
                }}
              />
              <button type="button" onClick={() => setSearchOpen(false)} style={{ background: 'none', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <MdClose size={20} />
              </button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} style={{ background: 'none', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: 'var(--radius-sm)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <MdSearch size={22} />
            </button>
          )}

          {isAuthenticated ? (
            <>
              <Link to="/profile" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                fontWeight: 500,
                transition: 'var(--transition)',
                border: '1px solid var(--border)',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--border-accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <MdPerson size={18} />
                <span className="hide-mobile">{user?.email?.split('@')[0]}</span>
              </Link>
              <button onClick={handleLogout} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--danger)',
                fontSize: '0.88rem',
                fontWeight: 500,
                background: 'transparent',
                border: '1px solid rgba(255,77,109,0.3)',
                cursor: 'pointer',
                transition: 'var(--transition)',
                fontFamily: 'var(--font-body)',
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,77,109,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <MdLogout size={18} />
                <span className="hide-mobile">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Join Free</Link>
            </>
          )}

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn" style={{ background: 'none', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', padding: '8px', display: 'none' }}>
            {mobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                padding: '10px 16px',
                borderRadius: 'var(--radius-sm)',
                color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                fontWeight: 500,
                textDecoration: 'none',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
