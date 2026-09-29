:root {
  --bg: #f4f7fb;
  --card: #ffffff;
  --primary: #1d4ed8;
  --primary-soft: #dbeafe;
  --green: #16a34a;
  --green-soft: #dcfce7;
  --blue: #3b82f6;
  --blue-soft: #dbeafe;
  --orange: #f59e0b;
  --orange-soft: #fef3c7;
  --red: #dc2626;
  --red-soft: #fee2e2;
  --gray: #6b7280;
  --gray-soft: #f3f4f6;
  --text: #111827;
  --muted: #6b7280;
  --border: #e5e7eb;
}

* { box-sizing: border-box; }
html, body, #root { margin: 0; min-height: 100vh; font-family: Inter, sans-serif; background: var(--bg); color: var(--text); }
button, input { font: inherit; }
button { cursor: pointer; }

.app-shell { max-width: 1200px; margin: 0 auto; padding: 16px 16px 88px; }
.app-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.brand { display: flex; align-items: center; gap: 12px; font-weight: 800; }
.brand-mark { width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, var(--primary), #60a5fa); display: grid; place-items: center; color: white; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08); }
.muted { color: var(--muted); }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--muted); padding: 8px 4px; font-size: 0.74rem; border-radius: 12px; }
.nav-item.active { color: var(--primary); background: var(--primary-soft); font-weight: 700; }
.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); border-top: 1px solid var(--border); display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; padding: 10px; }
.loading-screen { min-height: 100vh; display: grid; place-items: center; color: var(--muted); font-weight: 700; }
.status-chip { display: inline-flex; align-items: center; justify-content: center; border-radius: 9999px; padding: 6px 12px; font-weight: 700; width: fit-content; }
.status-green { background: var(--green-soft); color: var(--green); }
.status-blue { background: var(--blue-soft); color: var(--blue); }
.status-orange { background: var(--orange-soft); color: var(--orange); }
.status-red { background: var(--red-soft); color: var(--red); }
.status-gray { background: var(--gray-soft); color: var(--gray); }
@media (min-width: 768px) {
  .bottom-nav { max-width: 560px; left: 50%; transform: translateX(-50%); border-radius: 18px 18px 0 0; }
}
