import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { getNotificationsForUser, markNotificationRead } from '../services/notificationService';

export function NotificationsPage() {
  const { profile } = useApp();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profile?.id) return;

    const load = async () => {
      setLoading(true);
      const { data } = await getNotificationsForUser(profile.id);
      setItems(data || []);
      setLoading(false);
    };

    load();
  }, [profile?.id]);

  const handleRead = async (notificationId) => {
    await markNotificationRead(notificationId);
    setItems((current) => current.map((item) => item.id === notificationId ? { ...item, read_at: new Date().toISOString() } : item));
  };

  return (
    <div style={{ display: 'grid', gap: 16, paddingBottom: 90 }}>
      <h1 style={{ margin: 0 }}>Thông báo</h1>
      {loading ? <div>Đang tải...</div> : items.length === 0 ? <div>Chưa có thông báo nào.</div> : items.map((item) => (
        <div key={item.id} style={{ background: '#fff', borderRadius: 18, padding: 16, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>{item.title || 'Thông báo'}</strong>
            {!item.read_at && <button onClick={() => handleRead(item.id)} style={{ background: '#dbeafe', color: '#1d4ed8', border: 'none', borderRadius: 10, padding: '6px 10px', fontWeight: 700 }}>Đánh dấu đã đọc</button>}
          </div>
          <div style={{ color: '#6b7280', marginTop: 8 }}>{item.message}</div>
        </div>
      ))}
    </div>
  );
}
