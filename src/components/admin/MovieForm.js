import React, { useState } from 'react';
import { MdMovie } from 'react-icons/md';
import Loader from '../common/Loader';

const GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Romance',
  'Thriller',
  'Sci-Fi',
  'Animation',
  'Documentary',
  'Fantasy',
];

const LANGUAGES = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Malayalam',
  'Kannada',
  'Bengali',
  'Punjabi',
];

const emptyForm = {
  title: '',
  description: '',
  genre: '',
  language: '',
  releaseDate: '',
  duration: '',
  rating: '',
  posterUrl: '',
  bannerUrl: '',
  trailerUrl: '',
};

/* =========================================
   FIELD COMPONENT
========================================= */

const Field = ({
  label,
  field,
  type = 'text',
  placeholder,
  as,
  children,
  form,
  set,
  errors,
  inputStyle,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
      }}
    >
      {/* LABEL */}

      <label
        style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          paddingLeft: '2px',
        }}
      >
        {label}
      </label>

      {/* TEXTAREA */}

      {as === 'textarea' ? (
        <textarea
          value={form[field]}
          onChange={set(field)}
          placeholder={placeholder}
          rows={5}
          style={{
            ...inputStyle(field),

            resize: 'vertical',

            minHeight: '130px',

            background: 'rgba(255,255,255,0.05)',

            backdropFilter: 'blur(8px)',

            borderRadius: '14px',

            padding: '16px',

            fontSize: '0.95rem',

            lineHeight: 1.7,

            transition: 'all 0.25s ease',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent)';

            e.target.style.background =
              'rgba(28,232,181,0.07)';

            e.target.style.boxShadow =
              '0 0 0 3px rgba(28,232,181,0.12)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors[field]
              ? 'var(--danger)'
              : 'var(--border)';

            e.target.style.background =
              'rgba(255,255,255,0.05)';

            e.target.style.boxShadow = 'none';
          }}
        />
      ) : as === 'select' ? (
        /* SELECT */

        <select
          value={form[field]}
          onChange={set(field)}
          style={{
            ...inputStyle(field),

            cursor: 'pointer',

            background: '#111118',

            color: '#ffffff',

            borderRadius: '14px',

            padding: '14px 16px',

            fontSize: '0.95rem',

            appearance: 'none',

            WebkitAppearance: 'none',

            MozAppearance: 'none',

            transition: 'all 0.25s ease',

            backgroundImage:
              'linear-gradient(45deg, transparent 50%, var(--accent) 50%), linear-gradient(135deg, var(--accent) 50%, transparent 50%)',

            backgroundPosition:
              'calc(100% - 20px) calc(50% - 3px), calc(100% - 14px) calc(50% - 3px)',

            backgroundSize: '6px 6px',

            backgroundRepeat: 'no-repeat',
          }}
          onFocus={(e) => {
            e.target.style.borderColor =
              'var(--accent)';

            e.target.style.boxShadow =
              '0 0 0 3px rgba(28,232,181,0.12)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors[field]
              ? 'var(--danger)'
              : 'var(--border)';

            e.target.style.boxShadow = 'none';
          }}
        >
          <option
            value=""
            style={{
              background: '#111118',
              color: '#ffffff',
            }}
          >
            Select {label}
          </option>

          {children}
        </select>
      ) : (
        /* INPUT */

        <input
          type={type}
          value={form[field]}
          onChange={set(field)}
          placeholder={placeholder}
          style={{
            ...inputStyle(field),

            background:
              'rgba(255,255,255,0.05)',

            backdropFilter: 'blur(8px)',

            borderRadius: '14px',

            padding: '14px 16px',

            fontSize: '0.95rem',

            transition: 'all 0.25s ease',
          }}
          onFocus={(e) => {
            e.target.style.borderColor =
              'var(--accent)';

            e.target.style.background =
              'rgba(28,232,181,0.07)';

            e.target.style.boxShadow =
              '0 0 0 3px rgba(28,232,181,0.12)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors[field]
              ? 'var(--danger)'
              : 'var(--border)';

            e.target.style.background =
              'rgba(255,255,255,0.05)';

            e.target.style.boxShadow = 'none';
          }}
        />
      )}

      {/* ERROR */}

      {errors[field] && (
        <span
          style={{
            fontSize: '0.78rem',
            color: 'var(--danger)',
            paddingLeft: '4px',
            fontWeight: 500,
          }}
        >
          {errors[field]}
        </span>
      )}
    </div>
  );
};

/* =========================================
   MAIN COMPONENT
========================================= */

const MovieForm = ({
  initialData = {},
  onSubmit,
  loading,
  submitLabel = 'Save Movie',
}) => {
  const [form, setForm] = useState({
    ...emptyForm,
    ...initialData,
  });

  const [errors, setErrors] = useState({});

  /* =========================================
     INPUT HANDLER
  ========================================= */

  const set = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

  /* =========================================
     VALIDATION
  ========================================= */

  const validate = () => {
    const errs = {};

    if (!form.title.trim())
      errs.title = 'Title is required';

    if (!form.genre)
      errs.genre = 'Genre is required';

    if (!form.language)
      errs.language = 'Language is required';

    if (
      form.rating &&
      (isNaN(form.rating) ||
        form.rating < 0 ||
        form.rating > 10)
    ) {
      errs.rating = 'Rating must be 0–10';
    }

    if (
      form.duration &&
      (isNaN(form.duration) ||
        form.duration < 1)
    ) {
      errs.duration =
        'Duration must be positive';
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...form,
      duration: form.duration
        ? parseInt(form.duration)
        : null,
      rating: form.rating
        ? parseFloat(form.rating)
        : null,
    });
  };

  /* =========================================
     INPUT STYLE
  ========================================= */

  const inputStyle = (field) => ({
    width: '100%',

    border: errors[field]
      ? '1px solid var(--danger)'
      : '1px solid var(--border)',

    color: 'var(--text-primary)',

    outline: 'none',

    fontFamily: 'var(--font-body)',
  });

  /* =========================================
     RENDER
  ========================================= */

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
        }}
      >
        {/* TITLE */}

        <div style={{ gridColumn: '1 / -1' }}>
          <Field
            label="Movie Title *"
            field="title"
            placeholder="Enter movie title"
            form={form}
            set={set}
            errors={errors}
            inputStyle={inputStyle}
          />
        </div>

        {/* GENRE */}

        <Field
          label="Genre *"
          field="genre"
          as="select"
          form={form}
          set={set}
          errors={errors}
          inputStyle={inputStyle}
        >
          {GENRES.map((g) => (
            <option
              key={g}
              value={g}
              style={{
                background: '#111118',
                color: '#ffffff',
              }}
            >
              {g}
            </option>
          ))}
        </Field>

        {/* LANGUAGE */}

        <Field
          label="Language *"
          field="language"
          as="select"
          form={form}
          set={set}
          errors={errors}
          inputStyle={inputStyle}
        >
          {LANGUAGES.map((l) => (
            <option
              key={l}
              value={l}
              style={{
                background: '#111118',
                color: '#ffffff',
              }}
            >
              {l}
            </option>
          ))}
        </Field>

        {/* RELEASE DATE */}

        <Field
          label="Release Date"
          field="releaseDate"
          type="date"
          form={form}
          set={set}
          errors={errors}
          inputStyle={inputStyle}
        />

        {/* DURATION + RATING */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          <Field
            label="Duration (min)"
            field="duration"
            type="number"
            placeholder="120"
            form={form}
            set={set}
            errors={errors}
            inputStyle={inputStyle}
          />

          <Field
            label="Rating (0–10)"
            field="rating"
            type="number"
            placeholder="8.5"
            form={form}
            set={set}
            errors={errors}
            inputStyle={inputStyle}
          />
        </div>

        {/* DESCRIPTION */}

        <div style={{ gridColumn: '1 / -1' }}>
          <Field
            label="Description"
            field="description"
            as="textarea"
            placeholder="Write a brief synopsis..."
            form={form}
            set={set}
            errors={errors}
            inputStyle={inputStyle}
          />
        </div>

        {/* POSTER URL */}

        <div style={{ gridColumn: '1 / -1' }}>
          <Field
            label="Poster URL"
            field="posterUrl"
            placeholder="https://..."
            form={form}
            set={set}
            errors={errors}
            inputStyle={inputStyle}
          />
        </div>

        {/* BANNER URL */}

        <div style={{ gridColumn: '1 / -1' }}>
          <Field
            label="Banner URL"
            field="bannerUrl"
            placeholder="https://..."
            form={form}
            set={set}
            errors={errors}
            inputStyle={inputStyle}
          />
        </div>

        {/* TRAILER URL */}

        <div style={{ gridColumn: '1 / -1' }}>
          <Field
            label="Trailer / Video URL"
            field="trailerUrl"
            placeholder="https://youtube.com/..."
            form={form}
            set={set}
            errors={errors}
            inputStyle={inputStyle}
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{
          alignSelf: 'flex-start',
          minWidth: '180px',
          justifyContent: 'center',
          gap: '8px',
          padding: '14px 20px',
        }}
      >
        {loading ? (
          <Loader size={18} />
        ) : (
          <>
            <MdMovie size={18} />
            {submitLabel}
          </>
        )}
      </button>
    </form>
  );
};

export default MovieForm;