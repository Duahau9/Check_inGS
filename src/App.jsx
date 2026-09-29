import { Route, Routes, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Bell, History, MapPinned, Settings, UserCog } from 'lucide-react';
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
      { to: '/Check_inGS/', label: 'Trang chủ', icon: MapPinned },
      { to: '/Check_inGS/history', label: 'Lịch sử', icon: History },
      { to: '/Check_inGS/notifications', label: 'Thông báo', icon: Bell },
      { to: '/Check_inGS/settings', label: 'Tài khoản', icon: Settings }
    ];

    if (profile?.role === 'tutor') {
      items.splice(2, 0, { to: '/Check_inGS/management', label: 'Quản lý', icon: UserCog });
    }

    return items;
  }, [profile?.role]);

  if (loading) return <div className="loading-screen">Đang tải ứng dụng...</div>;
  if (!session || !profile) return <LoginPage />;

  return (
    <Layout navItems={navItems} profile={profile}>
      <Routes>
        <Route path="/Check_inGS/" element={profile.role === 'tutor' ? <TutorDashboard /> : <ParentDashboard />} />
        <Route path="/Check_inGS/history" element={<HistoryPage />} />
        <Route path="/Check_inGS/notifications" element={<NotificationsPage />} />
        <Route path="/Check_inGS/settings" element={<SettingsPage />} />
        <Route path="/Check_inGS/management" element={profile.role === 'tutor' ? <TutorDashboard /> : <Navigate to="/Check_inGS/" replace />} />
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
