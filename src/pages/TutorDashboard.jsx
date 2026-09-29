import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useApp } from '../context/AppContext';

export function LoginPage() {
  const { setProfile, setSession } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    if (!isSupabaseConfigured) {
      setError('Vui lòng cấu hình VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY trong file .env');
      return;
    }

    try {
      setLoading(true);
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        throw authError;
      }

      setSession(data.session);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', data.user.id)
        .single();

      setProfile(profileData || null);
    } catch (loginError) {
      setError(loginError.message || 'Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="card login-card">
        <div style={{ marginBottom: 24 }}>
          <div className="brand" style={{ justifyContent: 'center' }}>
            <div className="brand-mark">
              <span>✓</span>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Gia Sư Check-in</div>
            </div>
          </div>
        </div>

        <h1 style={{ margin: '0 0 8px', textAlign: 'center' }}>Đăng nhập</h1>
        <p className="muted" style={{ textAlign: 'center', margin: '0 0 22px' }}>
          Quản lý check-in/check-out, GPS, quyền xem và lịch sử.
        </p>

        <form onSubmit={handleLogin} className="form-grid">
          <label>
            <span className="muted" style={{ display: 'block', marginBottom: 8 }}>Email</span>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tutor@example.com"
              required
            />
          </label>

          <label>
            <span className="muted" style={{ display: 'block', marginBottom: 8 }}>Mật khẩu</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {error && (
            <div className="status-chip status-red" style={{ width: '100%' }}>
              {error}
            </div>
          )}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}
