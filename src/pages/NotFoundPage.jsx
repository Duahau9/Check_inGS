import { supabase } from '../lib/supabase';
import { useApp } from '../context/AppContext';

export function SettingsPage() {
  const { profile } = useApp();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <h1 className="page-title">Tài khoản</h1>

      <div className="card panel" style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 800 }}>{profile?.full_name || 'User'}</div>
            <div className="muted">{profile?.role === 'tutor' ? 'Tutor' : 'Parent'}</div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <button className="ghost-btn" type="button" style={{ width: '100%', marginBottom: 12 }}>
            Đổi mật khẩu
          </button>
          <button className="ghost-btn" type="button" style={{ width: '100%' }} onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
