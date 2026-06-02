# 🚀 Hotstar Frontend — Deployment Guide

## Fixes Applied

### 1. SPA Routing Fix (404 on refresh)
- **Netlify**: `public/_redirects` created → `/* /index.html 200`
- **Vercel**: `vercel.json` with `rewrites` configured
- **Netlify TOML**: Full `netlify.toml` with redirect rules

### 2. Build Configuration
- `package.json`: Pinned `react-scripts` to `5.0.1` (no `^`)
- `package.json`: Added `engines` field for Node/npm compatibility
- `CI=false` in all env files — prevents warnings from breaking the build
- `GENERATE_SOURCEMAP=false` — speeds up production builds

### 3. Environment Variables
- `.env` — local development (`http://localhost:8080`)
- `.env.production` — production (update with your deployed backend URL)
- `.env.example` — template for developers

### 4. AuthContext Fix
- Replaced dynamic `import()` with static import — dynamic imports can fail during Netlify/Vercel build
- Added `useCallback` for `logout` to fix React Hook exhaustive-deps warning
- Fixed token refresh validation flow

### 5. AxiosInstance Fix
- Added request `timeout: 15000` — prevents hanging on slow networks
- Fixed 401/403 redirect loop — now checks current path before redirecting

### 6. JWT Utils Fix
- Added null/type guards on token
- Fixed token expiry edge case with 10s buffer
- Handles multiple Spring Security role formats

### 7. CSS Fix
- Removed `@import url(...)` from CSS (can fail in build pipelines)
- Moved Google Fonts `<link>` to `public/index.html` instead

### 8. index.html Fix
- Added `%PUBLIC_URL%` prefix on all asset references
- Added `manifest.json` link and `favicon.ico` to avoid 404 warnings
- Added `crossOrigin="anonymous"` on fonts preconnect

### 9. Placeholder Image URLs
- Replaced `via.placeholder.com` → `placehold.co` (more reliable in production)

### 10. ProtectedRoutes Fix
- `AdminRoute` correctly redirects unauthenticated users to `/login`
- `UserRoute` redirects admins to `/admin/dashboard` instead of blocking

---

## Deploy to Netlify

### Option A: Drag & Drop
1. Run `npm run build` locally
2. Drag the `build/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

### Option B: Git-based (Recommended)
1. Push project to GitHub/GitLab
2. Connect repo in Netlify dashboard
3. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
4. Add environment variables in Netlify UI:
   - `REACT_APP_API_BASE_URL` = `https://your-backend-api.com`
   - `CI` = `false`
   - `GENERATE_SOURCEMAP` = `false`

---

## Deploy to Vercel

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
# Follow prompts
```

### Option B: Git-based (Recommended)
1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Framework: **Create React App** (auto-detected)
4. Add environment variables:
   - `REACT_APP_API_BASE_URL` = `https://your-backend-api.com`
   - `CI` = `false`

---

## Setting Up the Backend API URL

### For local development
`.env` already set to `http://localhost:8080` — no changes needed.

### For production
Update `.env.production`:
```
REACT_APP_API_BASE_URL=https://your-spring-boot-backend.onrender.com
```

Or set the environment variable `REACT_APP_API_BASE_URL` directly in Netlify/Vercel UI.

---

## CORS — Required Backend Change

Your Spring Boot backend MUST allow requests from your deployed frontend URL.

Add to `SecurityConfig.java`:
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of(
        "http://localhost:3000",
        "https://your-hotstar-app.netlify.app",
        "https://your-hotstar-app.vercel.app"
    ));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
```

---

## Admin Role Setup

The backend JWT only contains the user's email. To make an account admin:

```sql
UPDATE users SET role = 'ROLE_ADMIN' WHERE email = 'admin@example.com';
```

Then log in again — the frontend will pick up the role from the login response.

Alternatively, add a `/api/auth/profile` endpoint to your Spring Boot app:
```java
@GetMapping("/api/auth/profile")
public ResponseEntity<?> profile(Authentication auth) {
    User user = userRepo.findByEmail(auth.getName()).orElseThrow();
    return ResponseEntity.ok(Map.of("email", user.getEmail(), "role", user.getRole()));
}
```
