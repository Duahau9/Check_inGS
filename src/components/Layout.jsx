import { NavLink } from 'react-router-dom';

export function Layout({ children, navItems = [], profile }) {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div>
          <h1>Gia Sư Check-in</h1>
          <p>
            {profile?.full_name ||
              profile?.name ||
              profile?.email ||
              'Tài khoản'}
          </p>
        </div>
      </header>

      <main className="app-content">
        {children}
      </main>

      {navItems.length > 0 && (
        <nav className="app-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `app-nav-item ${isActive ? 'active' : ''}`
                }
              >
                {Icon && <Icon size={20} />}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      )}
    </div>
  );
}
