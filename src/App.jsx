import { Route, Routes, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Lock, UserCog, History, Bell, Settings, LogIn, ShieldCheck, MapPinned } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { TutorDashboard } from './pages/TutorDashboard';
import { ParentDashboard } from './pages/ParentDashboard';
import { HistoryPage } from './pages/HistoryPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppRoutes() {
  const { session, profile, loading } = useApp();

  const navItems = useMemo(() => {
    const items = [
      { to: '/', label: 'Trang chủ', icon: MapPinned },
      { to: '/history', label: 'Lịch sử', icon: History },
      { to: '/notifications', label: 'Thông báo', icon: Bell },
      { to: '/settings', label: 'Tài khoản', icon: Settings }
    ];

    if (profile?.role === 'tutor') {
      items.splice(2, 0, { to: '/management', label: 'Quản lý', icon: UserCog });
    }

    return items;
  }, [profile?.role]);

  if (loading) {
    return <div className="loading-screen">Đang tải ứng dụng...</div>;
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <Layout navItems={navItems} profile={profile}>
      <Routes>
        <Route path="/" element={profile?.role === 'tutor' ? <TutorDashboard /> : <ParentDashboard />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/management" element={profile?.role === 'tutor' ? <TutorDashboard /> : <Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
