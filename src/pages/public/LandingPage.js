import React from 'react';
import { Link } from 'react-router-dom';
import { MdPlayArrow, MdStar, MdDevices, MdDownload, MdHd } from 'react-icons/md';

const features = [
  { icon: <MdHd size={28} />, title: '4K Ultra HD', desc: 'Crystal clear picture quality on every device.' },
  { icon: <MdDevices size={28} />, title: 'Multi-Device', desc: 'Watch on TV, phone, tablet, or desktop.' },
  { icon: <MdDownload size={28} />, title: 'Offline Mode', desc: 'Download and watch without internet.' },
  { icon: <MdStar size={28} />, title: 'Premium Library', desc: 'Thousands of movies and originals.' },
];

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 clamp(20px, 5vw, 60px)',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>HOTSTAR</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        padding: '80px 24px 60px',
      }}>
        {/* Background radial */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(28,232,181,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <div style={{ textAlign: 'center', maxWidth: '800px', position: 'relative', animation: 'fadeIn 0.8s ease' }}>
          <div className="badge badge-accent" style={{ marginBottom: '24px', display: 'inline-flex', fontSize: '0.8rem' }}>
            🎬 Stream Unlimited Movies
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            lineHeight: 0.95,
            letterSpacing: '0.04em',
            marginBottom: '24px',
          }}>
            MOVIES <span style={{ color: 'var(--accent)' }}>WITHOUT</span><br />LIMITS
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '520px',
            margin: '0 auto 40px',
          }}>
            Discover thousands of movies in stunning quality. Stream blockbusters, originals, and classics — all in one place.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg" style={{ gap: '8px' }}>
              <MdPlayArrow size={22} /> Start Watching Free
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '20px' }}>
            No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '12px' }}>WHY HOTSTAR?</h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '52px' }}>Everything you need in one streaming platform</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{ padding: '32px 24px', textAlign: 'center', animation: `fadeIn 0.5s ease ${i * 0.1}s both` }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: 'var(--accent-dim)', border: '1px solid var(--border-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)', margin: '0 auto 20px',
                }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '10px', letterSpacing: '0.05em' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(28,232,181,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <h2 className="section-title" style={{ marginBottom: '16px', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>READY TO STREAM?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '36px', fontSize: '1.05rem' }}>Join millions watching their favourite movies today.</p>
        <Link to="/register" className="btn btn-primary btn-lg">Create Free Account</Link>
      </section>

      {/* Footer */}
      <footer style={{ padding: '24px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>© {new Date().getFullYear()} Hotstar Clone · React + Spring Boot</p>
      </footer>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default LandingPage;
