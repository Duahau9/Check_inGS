import { MapPinned, Clock3, CheckCircle2, LogOut, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export function TutorDashboard() {
  const { profile } = useApp();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="page-header" style={{ display: 'block' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 18 }}>
        <div>
          <p className="muted" style={{ margin: 0 }}>Xin chào, {profile?.full_name || 'Gia sư'}</p>
          <h1 className="page-title">Dashboard</h1>
        </div>
        <button className="ghost-btn" onClick={handleLogout}>
          <LogOut size={16} style={{ marginRight: 8 }} />
          Đăng xuất
        </button>
      </div>

      <div className="hero-grid">
        <section className="card status-card panel">
          <StatusBadge label="Đã check-in" tone="green" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckCircle2 color="#16a34a" />
            <div>
              <div style={{ fontWeight: 700 }}>TRẠNG THÁI BUỔI HỌC</div>
              <div className="muted">19:02:15</div>
            </div>
          </div>

          <div className="action-row">
            <button className="primary-btn" type="button">CHECK-IN</button>
            <button className="secondary-btn" type="button">CHECK-OUT</button>
          </div>
        </section>

        <section className="card panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <MapPinned color="#1d4ed8" />
            <strong>📍 Vị trí</strong>
          </div>
          <div className="location-box">
            <div className="muted">Độ chính xác: 8m</div>
            <button className="ghost-btn" style={{ marginTop: 12 }} type="button">Xem vị trí</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
            <Clock3 color="#3b82f6" />
            <strong>⏱ Thời gian dạy</strong>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8 }}>01h 56m</div>
        </section>
      </div>

      <section className="card panel" style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <AlertTriangle color="#f59e0b" />
          <strong>Thông báo hệ thống</strong>
        </div>
        <ul className="muted" style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          <li>GPS đã được xác minh và lưu đúng độ chính xác.</li>
          <li>Không có dữ liệu nhạy cảm nào được lưu trong localStorage.</li>
          <li>Hệ thống đang chuẩn bị tích hợp Supabase realtime.</li>
        </ul>
      </section>
    </div>
  );
}
