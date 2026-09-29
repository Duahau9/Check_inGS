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
    const configError = getSupabaseConfigError();
    if (configError) {
      setError(configError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;

      setSession(data.session);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', data.user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '20vh auto 0', padding: 24, borderRadius: 20, background: '#fff', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
      <h2 style={{ marginBottom: 8, textAlign: 'center' }}>Gia Sư Check-in</h2>
      <p style={{ margin: '0 0 22px', color: '#6b7280', textAlign: 'center' }}>Đăng nhập với tài khoản Supabase</p>

      <form onSubmit={handleLogin} style={{ display: 'grid', gap: 16 }}>
        <label>
          <div style={{ marginBottom: 8, color: '#6b7280' }}>Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #e5e7eb' }}
          />
        </label>

        <label>
          <div style={{ marginBottom: 8, color: '#6b7280' }}>Mật khẩu</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #e5e7eb' }}
          />
        </label>

        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 12px', borderRadius: 12 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: '#1d4ed8',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '14px 18px',
            fontWeight: 700
          }}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}
