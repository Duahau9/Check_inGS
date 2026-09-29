export function NotificationsPage() {
  const items = [
    { title: 'Gia sư đã check-in', time: '19:02', isRead: false },
    { title: 'Gia sư đã check-out', time: '20:58', isRead: false },
    { title: 'Buổi học ngày 28/09 đã hoàn thành', time: '08:30', isRead: true }
  ];

  return (
    <div>
      <h1 className="page-title">Thông báo</h1>

      <div className="card panel" style={{ marginTop: 18 }}>
        {items.map((item) => (
          <div
            key={item.title}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              padding: '12px 0',
              borderBottom: '1px solid #e5e7eb'
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>{item.title}</div>
              <div className="muted">{item.time}</div>
            </div>
            <div style={{ color: item.isRead ? '#6b7280' : '#1d4ed8', fontWeight: 700 }}>
              {item.isRead ? 'Đã đọc' : 'Mới'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
