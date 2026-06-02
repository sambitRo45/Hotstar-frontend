import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdPlayArrow,
  MdInfo,
  MdStar,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

const FALLBACK_BANNER =
  "https://placehold.co/1400x600/111118/1ce8b5?text=Hotstar+Movie";

const HeroBanner = ({ movies = [] }) => {

  const [current, setCurrent] = useState(0);

  const [fade, setFade] = useState(true);

  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();

  // =========================
  // FEATURED MOVIES
  // =========================

  const featured = movies.slice(0, 5);

  // =========================
  // SLIDER FUNCTION
  // =========================

  const goTo = useCallback((idx) => {

    setFade(false);

    setTimeout(() => {

      setCurrent(idx);

      setFade(true);

      setShowMore(false);

    }, 250);

  }, []);

  // =========================
  // AUTO SLIDE
  // =========================

  useEffect(() => {

    if (featured.length <= 1) return;

    const timer = setInterval(() => {

      goTo((current + 1) % featured.length);

    }, 6000);

    return () => clearInterval(timer);

  }, [current, featured.length, goTo]);

  // =========================
  // EMPTY CHECK
  // =========================

  if (!featured.length) return null;

  const movie = featured[current];

  const banner =
    movie.bannerUrl ||
    movie.posterUrl ||
    FALLBACK_BANNER;

  return (

    <div
      style={{
        position: "relative",
        height: "min(82vh, 700px)",
        overflow: "hidden",
        marginBottom: "48px",
      }}
    >

      {/* =========================
          BANNER IMAGE
      ========================= */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: fade ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >

        <img
          src={banner}
          alt={movie.title}
          onError={(e) => {
            e.target.src = FALLBACK_BANNER;
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />

      </div>

      {/* =========================
          OVERLAYS
      ========================= */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.5) 50%, rgba(10,10,15,0.2) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background:
            "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)",
        }}
      />

      {/* =========================
          CONTENT AREA
      ========================= */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(24px, 6vw, 80px)",
          paddingTop: "64px",
          gap: "40px",
        }}
      >

        {/* =========================
            LEFT CONTENT
        ========================= */}

        <div
          style={{
            flex: 1,
            maxWidth: "600px",
            opacity: fade ? 1 : 0,
            transform: fade
              ? "translateY(0)"
              : "translateY(16px)",
            transition:
              "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}
        >

          {/* Genre */}

          {movie.genre && (

            <span
              className="badge badge-accent"
              style={{
                marginBottom: "16px",
                display: "inline-flex",
              }}
            >
              {movie.genre}
            </span>

          )}

          {/* Title */}

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              letterSpacing: "0.04em",
              lineHeight: 1,
              color: "var(--text-primary)",
              marginBottom: "16px",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {movie.title}
          </h1>

          {/* Meta */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
              flexWrap: "wrap",
            }}
          >

            {movie.rating && (

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "var(--warning)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                <MdStar size={18} />
                {Number(movie.rating).toFixed(1)}
              </span>

            )}

            {movie.releaseDate && (

              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.88rem",
                }}
              >
                {new Date(movie.releaseDate).getFullYear()}
              </span>

            )}

            {movie.duration && (

              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.88rem",
                }}
              >
                {movie.duration} min
              </span>

            )}

            {movie.language && (

              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.88rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {movie.language}
              </span>

            )}

          </div>

          {/* =========================
              DESCRIPTION
          ========================= */}

          {movie.description && (

            <div style={{ marginBottom: "28px" }}>

              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  display: "-webkit-box",
                  WebkitLineClamp: showMore
                    ? "unset"
                    : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                {movie.description}
              </p>

              {movie.description.length > 120 && (

                <button
                  onClick={() =>
                    setShowMore(!showMore)
                  }
                  style={{
                    marginTop: "10px",
                    background: "none",
                    border: "none",
                    color: "var(--accent)",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    padding: 0,
                  }}
                >
                  {showMore
                    ? "Show Less"
                    : "Show More"}
                </button>

              )}

            </div>

          )}

        </div>

        {/* =========================
            RIGHT BUTTONS
        ========================= */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            minWidth: "240px",
            alignItems: "stretch",
          }}
        >

          <button
            className="btn btn-primary btn-lg"
            onClick={() =>
              navigate(`/watch/${movie.id}`)
            }
            style={{
              gap: "8px",
              justifyContent: "center",
              width: "100%",
              padding: "16px 20px",
            }}
          >
            <MdPlayArrow size={24} />
            Watch Now
          </button>

          <button
            className="btn btn-secondary btn-lg"
            onClick={() =>
              navigate(`/movie/${movie.id}`)
            }
            style={{
              gap: "8px",
              justifyContent: "center",
              width: "100%",
              padding: "16px 20px",
            }}
          >
            <MdInfo size={22} />
            Details
          </button>

        </div>

      </div>

      {/* =========================
          LEFT ARROW
      ========================= */}

      {featured.length > 1 && (

        <>
          <button
            onClick={() =>
              goTo(
                (current - 1 + featured.length) %
                  featured.length
              )
            }
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(10,10,15,0.7)",
              border: "1px solid var(--border)",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-primary)",
              cursor: "pointer",
              transition: "var(--transition)",
              backdropFilter: "blur(4px)",
            }}
          >
            <MdChevronLeft size={24} />
          </button>

          {/* RIGHT ARROW */}

          <button
            onClick={() =>
              goTo(
                (current + 1) %
                  featured.length
              )
            }
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(10,10,15,0.7)",
              border: "1px solid var(--border)",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-primary)",
              cursor: "pointer",
              transition: "var(--transition)",
              backdropFilter: "blur(4px)",
            }}
          >
            <MdChevronRight size={24} />
          </button>
        </>

      )}

      {/* =========================
          DOTS
      ========================= */}

      {featured.length > 1 && (

        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
          }}
        >

          {featured.map((_, i) => (

            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width:
                  i === current
                    ? "24px"
                    : "8px",
                height: "8px",
                borderRadius: "4px",
                background:
                  i === current
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                transition:
                  "width 0.3s, background 0.3s",
                padding: 0,
              }}
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default HeroBanner;