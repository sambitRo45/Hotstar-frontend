import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Loader from '../../components/common/Loader';

const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await login(form.email, form.password);
    if (result.success) {
      console.log("Logged In Role:", result.role);
      if (from) { navigate(from, { replace: true }); return; }
      if (result.role === 'ROLE_ADMIN') navigate('/admin/dashboard', { replace: true });
      else navigate('/home', { replace: true });
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${errors[field] ? 'var(--danger)' : 'var(--border)'}`,
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    padding: '12px 16px 12px 44px',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  });

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(28,232,181,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: '440px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(28px, 5vw, 48px)',
        animation: 'fadeIn 0.5s ease',
        position: 'relative',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'block', fontFamily: 'var(--font-display)',
          fontSize: '1.8rem', color: 'var(--accent)', letterSpacing: '0.1em',
          textAlign: 'center', marginBottom: '32px',
        }}>HOTSTAR</Link>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.6rem',
          letterSpacing: '0.05em', marginBottom: '6px', textAlign: 'center',
        }}>WELCOME BACK</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textAlign: 'center', marginBottom: '32px' }}>
          Sign in to continue streaming
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <MdEmail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <input
                type="email" value={form.email} onChange={set('email')}
                placeholder="you@email.com" style={inputStyle('email')}
                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'var(--accent-dim)'; }}
                onBlur={e => { e.target.style.borderColor = errors.email ? 'var(--danger)' : 'var(--border)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
              />
            </div>
            {errors.email && <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{errors.email}</span>}
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <MdLock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <input
                type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')}
                placeholder="••••••••"
                style={{ ...inputStyle('password'), paddingRight: '44px' }}
                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'var(--accent-dim)'; }}
                onBlur={e => { e.target.style.borderColor = errors.password ? 'var(--danger)' : 'var(--border)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
              />
              <button type="button" onClick={() => setShowPass(s => !s)} style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                display: 'flex', alignItems: 'center',
              }}>
                {showPass ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
              </button>
            </div>
            {errors.password && <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{errors.password}</span>}
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: 'center', marginTop: '8px', padding: '13px' }}>
            {loading ? <Loader size={20} /> : 'Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: '24px', paddingTop: '24px',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 600 }}>Create one free</Link>
          </p>
        </div>

        {/* Demo hint */}
        <div style={{
          marginTop: '16px', padding: '12px 16px',
          background: 'rgba(28,232,181,0.05)', border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--text-muted)',
          textAlign: 'center',
        }}>
          <strong style={{ color: 'var(--accent)' }}>Admin?</strong> Register with any email, then update role in DB to ROLE_ADMIN
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default LoginPage;
