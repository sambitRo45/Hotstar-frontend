import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLock, MdArrowBack } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

const UnauthorizedPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    if (isAdmin) navigate('/admin/dashboard');
    else if (isAuthenticated) navigate('/home');
    else navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', animation: 'scaleIn 0.4s ease' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'rgba(255,77,109,0.1)', border: '1px solid rgba(255,77,109,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px', color: 'var(--danger)',
        }}>
          <MdLock size={36} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--danger)', letterSpacing: '0.05em', marginBottom: '8px' }}>403</h1>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '16px', letterSpacing: '0.05em' }}>ACCESS DENIED</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '36px' }}>
          You don't have permission to access this page. This area is restricted to authorized users only.
        </p>
        <button onClick={handleBack} className="btn btn-primary" style={{ gap: '8px' }}>
          <MdArrowBack size={18} /> Go Back Home
        </button>
      </div>
      <style>{`@keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
};

export default UnauthorizedPage;
