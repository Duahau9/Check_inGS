import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export function SettingsPage() {
  const { profile, setSession, setProfile } = useApp();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setSession(null);
    setProfile(null);
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        paddingBottom: 90
      }}
    >
      <div>
        <h1 style={{ margin: 0 }}>Tài khoản</h1>

        <p
          style={{
            color: '#6b7280',
            marginTop: 8
          }}
        >
          Thông tin tài khoản của bạn.
        </p>
      </div>

      <section
        style={{
          background: '#fff',
          borderRadius: 18,
          padding: 20,
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 18
          }}
        >
          <div>
            <div style={{ color: '#6b7280', fontSize: 14 }}>
              Họ và tên
            </div>

            <strong>
              {profile?.full_name || 'Chưa cập nhật'}
            </strong>
          </div>

          <div>
            <div style={{ color: '#6b7280', fontSize: 14 }}>
              Email
            </div>

            <strong>
              {profile?.email || 'Chưa cập nhật'}
            </strong>
          </div>

          <div>
            <div style={{ color: '#6b7280', fontSize: 14 }}>
              Vai trò
            </div>

            <strong>
              {profile?.role === 'tutor'
                ? 'Gia sư'
                : 'Phụ huynh'}
            </strong>
          </div>
        </div>
      </section>

      <button
        onClick={handleLogout}
        style={{
          background: '#fee2e2',
          color: '#b91c1c',
          border: 'none',
          borderRadius: 12,
          padding: '14px 18px',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
}
