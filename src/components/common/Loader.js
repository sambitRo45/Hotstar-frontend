import React from 'react';

const Loader = ({ size = 40, fullPage = false }) => {
  const spinner = (
    <div style={{
      width: size,
      height: size,
      border: `3px solid rgba(28,232,181,0.15)`,
      borderTop: `3px solid var(--accent)`,
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  );

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-primary)', zIndex: 9000,
        flexDirection: 'column', gap: '16px',
      }}>
        {spinner}
        <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', letterSpacing: '0.05em' }}>Loading…</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      {spinner}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export default Loader;
