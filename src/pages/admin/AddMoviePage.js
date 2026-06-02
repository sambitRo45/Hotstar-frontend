import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMovie } from '../../api/movieApi';
import MovieForm from '../../components/admin/MovieForm';
import { MdArrowBack } from 'react-icons/md';
import toast from 'react-hot-toast';

const AddMoviePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await addMovie(data);
      toast.success('Movie added successfully!');
      navigate('/admin/movies');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to add movie';
      toast.error(typeof msg === 'string' ? msg : 'Failed to add movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <button onClick={() => navigate('/admin/movies')} style={{
          background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)',
          fontSize: '0.88rem', marginBottom: '12px', transition: 'color 0.2s', padding: 0,
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <MdArrowBack size={16} /> Back to Movies
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '0.05em', marginBottom: '4px' }}>ADD MOVIE</h1>
        <p style={{ color: 'var(--text-muted)' }}>Fill in the details to add a new movie to the platform.</p>
      </div>
      <div className="card" style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
        <MovieForm onSubmit={handleSubmit} loading={loading} submitLabel="Add Movie" />
      </div>
    </div>
  );
};

export default AddMoviePage;
