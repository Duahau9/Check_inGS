import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock3, LogOut, MapPinned } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import { useGeolocation, getGpsStatus } from '../hooks/useGeolocation';
import { checkInAttendance, checkOutAttendance, getTodayAttendanceForTutor } from '../services/attendanceService';

const formatDuration = (totalSeconds) => {
  if (!totalSeconds && totalSeconds !== 0) return '00:00:00';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
};

export function TutorDashboard() {
  const { profile, setSession } = useApp();
  const { getLocation, location, error: gpsError, loading: gpsLoading } = useGeolocation();
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusTone, setStatusTone] = useState('gray');

  const refreshAttendance = async () => {
    const { data } = await getTodayAttendanceForTutor();
    setAttendance(data?.[0] || null);
  };

  useEffect(() => {
    refreshAttendance();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleCheckIn = async () => {
    setLoading(true);
    setStatusMessage('');

    try {
      const coords = await getLocation();
      if (!coords) throw new Error('Không thể xác định vị trí.');

      const gpsState = getGpsStatus(coords.accuracy);
      if (gpsState.level === 'error') {
        throw new Error('Vị trí hiện tại chưa đủ chính xác. Vui lòng bật GPS chính xác và thử lại.');
      }

      const { error } = await checkInAttendance(coords.latitude, coords.longitude, coords.accuracy);
      if (error) throw error;

      setStatusMessage('✓ Check-in thành công');
      setStatusTone('green');
      await refreshAttendance();
    } catch (err) {
      setStatusMessage(err.message || 'Check-in thất bại.');
      setStatusTone('red');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    setStatusMessage('');

    try {
      const coords = await getLocation();
      if (!coords) throw new Error('Không thể xác định vị trí.');

      const gpsState = getGpsStatus(coords.accuracy);
      if (gpsState.level === 'error') {
        throw new Error('Vị trí hiện tại chưa đủ chính xác. Vui lòng bật GPS chính xác và thử lại.');
      }

      const { error } = await checkOutAttendance(coords.latitude, coords.longitude, coords.accuracy);
      if (error) throw error;

      setStatusMessage('✓ Check-out thành công');
      setStatusTone('blue');
      await refreshAttendance();
    } catch (err) {
      setStatusMessage(err.message || 'Check-out thất bại.');
      setStatusTone('red');
    } finally {
      setLoading(false);
    }
  };

  const hasCheckedIn = attendance?.status === 'checked_in';
  const hasCheckedOut = attendance?.status === 'checked_out';
  const accuracyText = location ? `${location.accuracy.toFixed(0)}m` : 'Chưa có dữ liệu';

  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={{ color: '#6b7280' }}>Xin chào, {profile?.full_name || 'Gia sư'}</div>
          <h1 style={{ margin: '4px 0 0', fontSize: '2rem' }}>Dashboard</h1>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '10px 14px',
            fontWeight: 700
          }}
        >
          <LogOut size={16} style={{ marginRight: 8 }} />
          Đăng xuất
        </button>
      </div>

      <div style={{ display: 'grid', gap: 18 }}>
        <section style={{ background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <CheckCircle2 color={hasCheckedIn ? '#16a34a' : '#6b7280'} />
            <strong>TRẠNG THÁI BUỔI HỌC</strong>
          </div>

          <div style={{
            display: 'inline-flex',
            background: hasCheckedIn ? '#dcfce7' : hasCheckedOut ? '#dbeafe' : '#f3f4f6',
            color: hasCheckedIn ? '#16a34a' : hasCheckedOut ? '#1d4ed8' : '#6b7280',
            padding: '6px 12px',
            borderRadius: 999,
            fontWeight: 700
          }}>
            {hasCheckedIn ? 'Đã check-in' : hasCheckedOut ? 'Đã check-out' : 'Chưa check-in'}
          </div>

          <div style={{ marginTop: 16, color: '#6b7280' }}>
            {attendance?.check_in_time ? new Date(attendance.check_in_time).toLocaleTimeString('vi-VN') : 'Chưa có dữ liệu'}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
            <button
              onClick={handleCheckIn}
              disabled={loading || hasCheckedIn}
              style={{
                background: hasCheckedIn ? '#d1d5db' : '#1d4ed8',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '14px 18px',
                fontWeight: 700,
                opacity: loading ? 0.7 : 1
              }}
            >
              CHECK-IN
            </button>

            <button
              onClick={handleCheckOut}
              disabled={loading || !hasCheckedIn || hasCheckedOut}
              style={{
                background: !hasCheckedIn || hasCheckedOut ? '#d1d5db' : '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '14px 18px',
                fontWeight: 700,
                opacity: loading ? 0.7 : 1
              }}
            >
              CHECK-OUT
            </button>
          </div>

          {statusMessage && (
            <div style={{
              marginTop: 16,
              background: statusTone === 'green' ? '#dcfce7' : statusTone === 'blue' ? '#dbeafe' : '#fee2e2',
              color: statusTone === 'green' ? '#166534' : statusTone === 'blue' ? '#1d4ed8' : '#b91c1c',
              padding: '10px 12px',
              borderRadius: 12,
              fontWeight: 700
            }}>
              {statusMessage}
            </div>
          )}
        </section>

        <section style={{ background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <MapPinned color="#1d4ed8" />
            <strong>📍 Vị trí</strong>
          </div>

          <div style={{ background: '#eef4ff', borderRadius: 16, padding: 16 }}>
            <div style={{ color: '#6b7280' }}>Độ chính xác: {accuracyText}</div>
            {gpsError && <div style={{ color: '#dc2626', marginTop: 8 }}>{gpsError}</div>}
            {gpsLoading && <div style={{ color: '#1d4ed8', marginTop: 8 }}>📍 Đang xác định vị trí...</div>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
            <Clock3 color="#3b82f6" />
            <strong>⏱ Thời gian dạy</strong>
          </div>

          <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8 }}>
            {attendance?.total_seconds ? formatDuration(attendance.total_seconds) : '00:00:00'}
          </div>
        </section>
      </div>
    </div>
  );
}
