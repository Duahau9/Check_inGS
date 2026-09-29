import { NavLink } from 'react-router-dom';
import { House, Clock3, Bell, Settings, UserCircle2 } from 'lucide-react';

export function Layout({ children, navItems = [], profile }) {
  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="brand">
          <div className="brand-mark">
            <House size={20} />
          </div>
          <div>
            <div>Gia Sư Check-in</div>
            <div className="muted" style={{ fontSize: 12, fontWeight: 600 }}>
              {profile?.full_name || 'User'}
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <nav className="bottom-nav" aria-label="Bottom navigation">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            end={to === '/'}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
