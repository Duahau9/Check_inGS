import { CalendarDays, Clock3, MapPinned, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export function ParentDashboard() {
  return (
    <div>
      <h1 className="page-title">Buổi học hiện tại</h1>

      <section className="card panel" style={{ marginTop: 20 }}>
        <div className="muted" style={{ marginBottom: 12 }}>📅 29/09/2026</div>
        <StatusBadge label="Check-in" tone="green" />
        <div style={{ marginTop: 12, fontWeight: 700 }}>19:02:15</div>

        <div style={{ marginTop: 18 }}>
          <StatusBadge label="Check-out" tone="blue" />
          <div style={{ marginTop: 12, fontWeight: 700 }}>20:58:32</div>
        </div>

        <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Clock3 color="#3b82f6" />
          <strong>⏱ Thời gian</strong>
        </div>
        <div style={{ marginTop: 8, fontWeight: 800 }}>01h56m</div>

        <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
          <MapPinned color="#1d4ed8" />
          <strong>📍 Vị trí</strong>
        </div>
        <button className="ghost-btn" type="button" style={{ marginTop: 12 }}>
          Xem vị trí
        </button>
      </section>
    </div>
  );
}
