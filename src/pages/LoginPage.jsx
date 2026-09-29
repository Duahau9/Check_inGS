import { useState } from 'react';
import { supabase, getSupabaseConfigError } from '../lib/supabase';
import { useApp } from '../context/AppContext';

export function LoginPage() {
  const { setSession, setProfile } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    const configError = getSupabaseConfigError();
    if (configError) {
      setError(configError);
      return;
    }

    setLoading(true);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', data.user.id)
        .single();

      if (profileError) throw profileError;

      setSession(data.session);
      setProfile(profileData);
    } catch (loginError) {
      setError(loginError.message || 'Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="card login-card">
        <div className="brand" style={{ justifyContent: 'center', marginBottom: 24 }}>
          <div className="brand-mark" aria-hidden="true">✓</div>
          <strong>Gia Sư Check-in</strong>
        </div>

        <h1 style={{ margin: '0 0 8px', textAlign: 'center' }}>Đăng nhập</h1>
        <p className="muted" style={{ textAlign: 'center', margin: '0 0 22px' }}>
          Quản lý check-in/check-out, GPS và lịch sử.
        </p>

        <form onSubmit={handleLogin} className="form-grid">
          <label>
            <span className="muted" style={{ display: 'block', marginBottom: 8 }}>Email</span>
            <input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
          </label>

          <label>
            <span className="muted" style={{ display: 'block', marginBottom: 8 }}>Mật khẩu</span>
            <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" />
          </label>

          {error && <div className="status-chip status-red" role="alert" style={{ width: '100%' }}>{error}</div>}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}
