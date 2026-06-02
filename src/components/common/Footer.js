import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
      padding: '40px 24px 24px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px', marginBottom: '32px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '8px' }}>HOTSTAR</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '280px', lineHeight: 1.6 }}>
              Your premium destination for movies, series, and live entertainment. Stream anytime, anywhere.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Browse</div>
              {[{ to: '/home', label: 'Home' }, { to: '/movies', label: 'Movies' }].map(l => (
                <Link key={l.to} to={l.to} style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '8px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >{l.label}</Link>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Account</div>
              {[{ to: '/login', label: 'Login' }, { to: '/register', label: 'Register' }, { to: '/profile', label: 'Profile' }].map(l => (
                <Link key={l.to} to={l.to} style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '8px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>© {new Date().getFullYear()} Hotstar Clone. All rights reserved.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Built with React + Spring Boot</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
