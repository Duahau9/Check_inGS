import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { getNotificationsForUser, markNotificationRead } from '../services/notificationService';

export function NotificationsPage() {
  const { profile } = useApp();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      if (!profile?.id) return;
      const { data } = await getNotificationsForUser(profile.id);
      setItems(data || []);
    }
    loadNotifications();
  }, [profile?.id]);

  const handleRead = async (id) => {
    await markNotificationRead(id);
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, is_read: true } : item));
  };

  return (
    <div style={{ paddingBottom: 90 }}>
      <h1 style={{ marginBottom: 20 }}>Thông báo</h1>

      <div style={{ background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
        {items.length === 0 ? (
          <div style={{ color: '#6b7280' }}>Chưa có thông báo nào.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{item.title}</div>
                <div style={{ color: '#6b7280', marginTop: 4 }}>{new Date(item.created_at).toLocaleString('vi-VN')}</div>
              </div>

              <button
                onClick={() => handleRead(item.id)}
                style={{
                  background: item.is_read ? '#f3f4f6' : '#dbeafe',
                  border: 'none',
                  borderRadius: 10,
                  padding: '8px 10px',
                  fontWeight: 700,
                  color: item.is_read ? '#6b7280' : '#1d4ed8'
                }}
              >
                {item.is_read ? 'Đã đọc' : 'Đánh dấu đã đọc'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
