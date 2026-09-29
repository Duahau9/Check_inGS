export function HistoryPage() {
  return (
    <div>
      <h1 className="page-title">Lịch sử</h1>

      <div className="card panel" style={{ marginTop: 18 }}>
        <div style={{ fontWeight: 800, marginBottom: 14 }}>THÁNG 09/2026</div>

        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 14 }}>
          <div style={{ fontWeight: 700 }}>29/09</div>
          <div className="muted">19:02 → 20:58</div>
          <div style={{ fontWeight: 700, marginTop: 4 }}>01h56m</div>
          <div style={{ color: '#16a34a', fontWeight: 700, marginTop: 8 }}>✓ Hoàn thành</div>
        </div>

        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 14, marginTop: 14 }}>
          <div style={{ fontWeight: 700 }}>28/09</div>
          <div className="muted">19:00 → 20:55</div>
          <div style={{ fontWeight: 700, marginTop: 4 }}>01h55m</div>
          <div style={{ color: '#16a34a', fontWeight: 700, marginTop: 8 }}>✓ Hoàn thành</div>
        </div>
      </div>
    </div>
  );
}
