import { useEffect, useState } from 'react';
import { Clock3, MapPinned, CalendarDays } from 'lucide-react';
import { getAttendanceHistoryForParent } from '../services/attendanceService';

function formatDate(value) {
  if (!value) return '--/--/----';

  return new Date(value).toLocaleDateString('vi-VN');
}

function formatTime(value) {
  if (!value) return '--:--:--';

  return new Date(value).toLocaleTimeString('vi-VN');
}

function formatDuration(totalSeconds) {
  if (!totalSeconds) return '00:00:00';

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');
}

export function HistoryPage() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      setLoading(true);

      const { data, error } = await getAttendanceHistoryForParent();

      if (!error) {
        setAttendance(data || []);
      }

      setLoading(false);
    }

    loadHistory();
  }, []);

  return (
    <div style={{ display: 'grid', gap: 16, paddingBottom: 90 }}>
      <div>
        <h1 style={{ margin: 0 }}>Lịch sử học</h1>
        <p style={{ color: '#6b7280', marginTop: 8 }}>
          Theo dõi các buổi học đã check-in và check-out.
        </p>
      </div>

      {loading ? (
        <div
          style={{
            background: '#fff',
            borderRadius: 18,
            padding: 20
          }}
        >
          Đang tải lịch sử...
        </div>
      ) : attendance.length === 0 ? (
        <div
          style={{
            background: '#fff',
            borderRadius: 18,
            padding: 24,
            color: '#6b7280'
          }}
        >
          Chưa có lịch sử buổi học.
        </div>
      ) : (
        attendance.map((item) => (
          <section
            key={item.id}
            style={{
              background: '#fff',
              borderRadius: 18,
              padding: 20,
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 16
              }}
            >
              <CalendarDays color="#1d4ed8" size={22} />

              <strong>
                {formatDate(item.check_in_time)}
              </strong>
            </div>

            <div
              style={{
                display: 'grid',
                gap: 12
              }}
            >
              <div>
                <div style={{ color: '#6b7280', fontSize: 14 }}>
                  Check-in
                </div>

                <strong>
                  {formatTime(item.check_in_time)}
                </strong>
              </div>

              <div>
                <div style={{ color: '#6b7280', fontSize: 14 }}>
                  Check-out
                </div>

                <strong>
                  {formatTime(item.check_out_time)}
                </strong>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <Clock3 color="#3b82f6" size={20} />

                <div>
                  <div style={{ color: '#6b7280', fontSize: 14 }}>
                    Thời gian học
                  </div>

                  <strong>
                    {formatDuration(item.total_seconds)}
                  </strong>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <MapPinned color="#1d4ed8" size={20} />

                <span style={{ color: '#6b7280' }}>
                  Có dữ liệu vị trí
                </span>
              </div>
            </div>
          </section>
        ))
      )}
    </div>
  );
}
