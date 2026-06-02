import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MdDashboard, MdMovie, MdAddBox, MdLogout, MdMenu,
  MdChevronLeft
} from 'react-icons/md';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const navItems = [
    { to: '/admin/dashboard', icon: <MdDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/movies', icon: <MdMovie size={20} />, label: 'Movies' },
    { to: '/admin/add-movie', icon: <MdAddBox size={20} />, label: 'Add Movie' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? '64px' : '240px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
        position: 'sticky',
        top: 0,
        height: '100vh',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid var(--border)',
          minHeight: '70px',
        }}>
          {!collapsed && (
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: 'var(--accent)',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}>
              HOTSTAR ADMIN
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'none',
              color: 'var(--text-secondary)',
              padding: '4px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            {collapsed ? <MdMenu size={20} /> : <MdChevronLeft size={20} />}
          </button>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 12px',
                borderRadius: 'var(--radius-sm)',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                border: `1px solid ${isActive ? 'var(--border-accent)' : 'transparent'}`,
                marginBottom: '4px',
                transition: 'var(--transition)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                justifyContent: collapsed ? 'center' : 'flex-start',
              })}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && (
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
          {!collapsed && user?.email && (
            <div style={{
              padding: '10px 12px',
              marginBottom: '8px',
              background: 'rgba(28,232,181,0.05)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-accent)',
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Logged in as</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 12px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--danger)',
              background: 'transparent',
              border: '1px solid transparent',
              width: '100%',
              cursor: 'pointer',
              transition: 'var(--transition)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 500,
              justifyContent: collapsed ? 'center' : 'flex-start',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,77,109,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,77,109,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <MdLogout size={20} style={{ flexShrink: 0 }} />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: 'auto', padding: '32px', minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
