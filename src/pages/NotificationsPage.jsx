import { useEffect, useState } from 'react';
import { getAttendanceHistoryForTutor } from '../services/attendanceService';

function formatDate(dateValue) {
  if (!dateValue) return '--';
  return new Date(dateValue).toLocaleDateString('vi-VN');
}

function formatTime(dateValue) {
  if (!dateValue) return '--:--:--';
  return new Date(dateValue).toLocaleTimeString('vi-VN');
}

function formatDuration(totalSeconds) {
  if (!totalSeconds) return '00:00:00';
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      const { data, error } = await getAttendanceHistoryForTutor();
      if (!error) setHistory(data || []);
    }
    loadHistory();
  }, []);

  return (
    <div style={{ paddingBottom: 90 }}>
      <h1 style={{ marginBottom: 20 }}>Lịch sử</h1>

      <div style={{ background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
        <div style={{ fontWeight: 800, marginBottom: 14 }}>THÁNG 09/2026</div>

        {history.length === 0 ? (
          <div style={{ color: '#6b7280' }}>Chưa có dữ liệu lịch sử.</div>
        ) : (
          history.map((item) => (
            <div key={item.id} style={{ borderTop: '1px solid #e5e7eb', paddingTop: 14, marginTop: 14 }}>
              <div style={{ fontWeight: 700 }}>{formatDate(item.check_in_time)}</div>
              <div style={{ color: '#6b7280', marginTop: 6 }}>
                {formatTime(item.check_in_time)} → {formatTime(item.check_out_time)}
              </div>
              <div style={{ fontWeight: 700, marginTop: 6 }}>{formatDuration(item.total_seconds)}</div>
              <div style={{ color: '#16a34a', fontWeight: 700, marginTop: 8 }}>
                {item.status === 'checked_out' ? '✓ Hoàn thành' : '⏳ Đang diễn ra'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
