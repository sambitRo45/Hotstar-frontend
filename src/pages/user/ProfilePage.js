import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdPerson, MdEmail, MdShield, MdLogout, MdMovie } from 'react-icons/md';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={{ paddingTop: '88px', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <h1 className="section-title" style={{ marginBottom: '32px' }}>MY PROFILE</h1>

        {/* Avatar card */}
        <div className="card" style={{ padding: '36px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'var(--accent-dim)', border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)', flexShrink: 0,
          }}>
            <MdPerson size={40} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '4px' }}>
              {user?.email?.split('@')[0]?.toUpperCase() || 'USER'}
            </h2>
            <span className="badge badge-accent">{user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'Member'}</span>
          </div>
        </div>

        {/* Info */}
        <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '20px' }}>ACCOUNT INFO</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: <MdEmail size={18} />, label: 'Email', value: user?.email },
              { icon: <MdShield size={18} />, label: 'Role', value: user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'Regular User' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '14px 16px', background: 'rgba(255,255,255,0.02)',
                borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
              }}>
                <span style={{ color: 'var(--accent)' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.value || '—'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '20px' }}>QUICK ACTIONS</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={() => navigate('/movies')} style={{ gap: '8px' }}>
              <MdMovie size={18} /> Browse Movies
            </button>
            <button className="btn btn-danger" onClick={handleLogout} style={{ gap: '8px' }}>
              <MdLogout size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
