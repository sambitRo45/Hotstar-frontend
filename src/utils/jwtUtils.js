import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    if (!token || typeof token !== 'string') return null;
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const getRoleFromToken = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return null;
  // Spring Security may store roles in different fields
  const authorities = decoded.authorities || decoded.roles || decoded.scope || [];
  if (Array.isArray(authorities)) {
    const hasAdmin = authorities.some(
      (a) => a === 'ROLE_ADMIN' || (typeof a === 'object' && a.authority === 'ROLE_ADMIN')
    );
    return hasAdmin ? 'ROLE_ADMIN' : 'ROLE_USER';
  }
  if (typeof authorities === 'string') {
    return authorities.includes('ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER';
  }
  return 'ROLE_USER';
};

export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    // Add 10s buffer to avoid edge-case expiry
    return decoded.exp * 1000 < Date.now() - 10000;
  } catch {
    return true;
  }
};
