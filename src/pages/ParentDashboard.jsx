import { useEffect, useState } from 'react';
import { Clock3, MapPinned } from 'lucide-react';
import { getAttendanceHistoryForParent } from '../services/attendanceService';

function formatTime(value) {
  if (!value) return '--:--:--';
  return new Date(value).toLocaleTimeString('vi-VN');
}

function formatDuration(totalSeconds) {
  if (!totalSeconds) return '00:00:00';
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function ParentDashboard() {
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await getAttendanceHistoryForParent();
      if (!error) setAttendance(data?.[0] || null);
    }
    loadData();
  }, []);

  return (
    <div style={{ paddingBottom: 90 }}>
      <h1 style={{ marginBottom: 20 }}>Buổi học hiện tại</h1>

      <section style={{ background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
        <div style={{ color: '#6b7280', marginBottom: 10 }}>
          📅 {new Date().toLocaleDateString('vi-VN')}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ display: 'inline-flex', background: '#dcfce7', color: '#16a34a', padding: '6px 10px', borderRadius: 999, fontWeight: 700 }}>
            Check-in
          </span>
        </div>

        <div style={{ fontWeight: 700 }}>{formatTime(attendance?.check_in_time)}</div>

        <div style={{ marginTop: 20 }}>
          <span style={{ display: 'inline-flex', background: '#dbeafe', color: '#1d4ed8', padding: '6px 10px', borderRadius: 999, fontWeight: 700 }}>
            Check-out
          </span>
        </div>
        <div style={{ fontWeight: 700, marginTop: 12 }}>{formatTime(attendance?.check_out_time)}</div>

        <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Clock3 color="#3b82f6" />
          <strong>⏱ Thời gian</strong>
        </div>
        <div style={{ marginTop: 8, fontWeight: 800 }}>{formatDuration(attendance?.total_seconds)}</div>

        <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
          <MapPinned color="#1d4ed8" />
          <strong>📍 Vị trí</strong>
        </div>

        <button style={{ marginTop: 12, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 14px', fontWeight: 700 }}>
          Xem vị trí
        </button>
      </section>
    </div>
  );
}
