# 🎬 Hotstar Clone — React Frontend

A complete, production-ready OTT platform frontend built with **React.js (JavaScript only)**, connected to the Spring Boot + MySQL backend.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + JSX |
| Routing | React Router DOM v6 |
| HTTP Client | Axios with JWT interceptors |
| Auth State | Context API |
| Notifications | React Hot Toast |
| Icons | React Icons (Material Design) |
| Styling | Pure CSS variables (dark theme) |
| Fonts | Bebas Neue + DM Sans (Google Fonts) |

---

## 📁 Folder Structure

```
src/
├── api/
│   ├── axiosInstance.js     # Axios base config + JWT interceptors
│   ├── authApi.js           # Login / Register calls
│   └── movieApi.js          # Public + Admin movie API calls
├── components/
│   ├── admin/
│   │   └── MovieForm.js     # Reusable add/edit movie form
│   └── common/
│       ├── Navbar.js        # User navbar with search
│       ├── Footer.js
│       ├── HeroBanner.js    # Auto-rotating hero carousel
│       ├── MovieCard.js     # Hover-animated movie card
│       ├── MovieGridSkeleton.js  # Shimmer loading state
│       ├── SearchBar.js
│       └── Loader.js
├── context/
│   └── AuthContext.js       # JWT auth, login, logout, role management
├── layouts/
│   ├── UserLayout.js        # Navbar + Footer wrapper
│   └── AdminLayout.js       # Collapsible sidebar layout
├── pages/
│   ├── auth/
│   │   ├── LoginPage.js
│   │   └── RegisterPage.js
│   ├── public/
│   │   ├── LandingPage.js
│   │   └── UnauthorizedPage.js
│   ├── user/
│   │   ├── HomePage.js      # Hero banner + movie rows by genre
│   │   ├── MoviesPage.js    # Search + genre/language filters
│   │   ├── MovieDetailPage.js
│   │   ├── WatchPage.js     # Embedded video/trailer player
│   │   └── ProfilePage.js
│   └── admin/
│       ├── AdminDashboard.js  # Stats cards + recent movies table
│       ├── AdminMoviesPage.js # Full CRUD table
│       ├── AddMoviePage.js
│       └── EditMoviePage.js
├── routes/
│   └── ProtectedRoutes.js   # ProtectedRoute / AdminRoute / UserRoute
├── styles/
│   └── global.css           # CSS variables, animations, utility classes
└── utils/
    └── jwtUtils.js          # JWT decode, role extraction, expiry check
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites

- Node.js 18+ and npm 9+
- Spring Boot backend running on `http://localhost:8080`
- MySQL running with `hotstar_db` database

### 2. Install dependencies

```bash
cd hotstar-frontend
npm install
```

### 3. Configure environment

Create/edit `.env` in the project root:

```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

### 4. Start the development server

```bash
npm start
```

Opens at **http://localhost:3000**

### 5. Build for production

```bash
npm run build
```

---

## 🔐 Role-Based Authentication Flow

### How roles work

The Spring Boot backend stores roles as `ROLE_ADMIN` or `ROLE_USER` in the database. The JWT token issued on login contains only the user's **email** as the subject.

**Frontend role detection strategy:**

1. On login, the frontend calls `/api/auth/login` and receives a JWT token.
2. It then attempts to call `/api/auth/profile` to retrieve the role.
3. If that endpoint doesn't exist yet (default backend), the role defaults to `ROLE_USER`.

### Making an Admin account

**Option A — Database direct:**
```sql
UPDATE users SET role = 'ROLE_ADMIN' WHERE email = 'admin@example.com';
```
Then log in again and role will be fetched correctly.

**Option B — Add a profile endpoint to Spring Boot:**
```java
@GetMapping("/api/auth/profile")
public ResponseEntity<?> profile(Authentication auth) {
    User user = userRepository.findByEmail(auth.getName()).orElseThrow();
    return ResponseEntity.ok(Map.of("email", user.getEmail(), "role", user.getRole()));
}
```

### Route protection matrix

| Route | Access |
|-------|--------|
| `/` | Public |
| `/login`, `/register` | Public |
| `/home`, `/movies`, `/movie/:id`, `/watch/:id`, `/profile` | ROLE_USER only |
| `/admin/*` | ROLE_ADMIN only |
| Wrong role → `/unauthorized` | Auto-redirect |
| Not logged in → `/login` | Auto-redirect |

---

## 🎯 Backend API Reference

All API calls are made to `REACT_APP_API_BASE_URL`.

### Auth
| Method | Endpoint | Body | Auth |
|--------|----------|------|------|
| POST | `/api/auth/register` | `{name, email, password}` | None |
| POST | `/api/auth/login` | `{email, password}` | None |

### Movies (Public)
| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/api/movies` | All movies |
| GET | `/api/movies/:id` | Single movie |
| GET | `/api/movies/search?keyword=X` | Search by title |
| GET | `/api/movies/filter?genre=X&language=Y` | Filter |

### Admin Movies (ROLE_ADMIN)
| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/admin/movies` | MovieDto |
| PUT | `/api/admin/movies/:id` | MovieDto |
| DELETE | `/api/admin/movies/:id` | — |

### MovieDto fields
```json
{
  "title": "string",
  "description": "string",
  "genre": "string",
  "language": "string",
  "releaseDate": "YYYY-MM-DD",
  "duration": 120,
  "rating": 8.5,
  "posterUrl": "https://...",
  "bannerUrl": "https://...",
  "trailerUrl": "https://youtube.com/..."
}
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| `--bg-primary` | `#0a0a0f` |
| `--bg-secondary` | `#111118` |
| `--bg-card` | `#16161f` |
| `--accent` | `#1ce8b5` (teal glow) |
| `--danger` | `#ff4d6d` |
| `--warning` | `#ffd166` |
| `--font-display` | Bebas Neue |
| `--font-body` | DM Sans |

---

## 🚀 Features Implemented

- ✅ Login & Register with JWT storage
- ✅ Role-based protected routes (AdminRoute / UserRoute / ProtectedRoute)
- ✅ Auto-redirect based on role after login
- ✅ Token expiry detection & auto-logout
- ✅ Axios interceptors (auto-attach token, handle 401/403)
- ✅ Hero banner carousel with auto-rotation
- ✅ Movie cards with hover animations
- ✅ Search movies by keyword
- ✅ Filter by genre & language
- ✅ Movie detail page with full metadata
- ✅ Watch page with YouTube embed support
- ✅ Admin dashboard with stats cards
- ✅ Admin movie CRUD table
- ✅ Add/Edit movie form with validation
- ✅ Collapsible admin sidebar
- ✅ Skeleton loaders
- ✅ Toast notifications
- ✅ Fully responsive (mobile-first)
- ✅ Dark OTT theme (Hotstar/Netflix inspired)

---

## ⚠️ CORS Configuration

Add this to your Spring Boot `SecurityConfig` or a separate CORS config:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("http://localhost:3000"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
```

Then in `SecurityConfig`:
```java
.cors(cors -> cors.configurationSource(corsConfigurationSource()))
```
