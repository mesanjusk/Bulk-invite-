import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider }    from './context/AuthContext';
import { LiveProvider }    from './context/LiveContext';
import ProtectedRoute      from './components/ProtectedRoute';
import AppShell            from './components/AppShell';
import AppUpdatePrompt     from './components/pwa/AppUpdatePrompt';
import theme               from './theme';
import { MODULE_PERMISSIONS } from './utils/accessControl';

import LoginPage              from './pages/LoginPage';
import SignupPage             from './pages/SignupPage';
import ForgotPasswordPage     from './pages/ForgotPasswordPage';
import DashboardPage          from './pages/DashboardPage';
import CategoriesPage         from './pages/CategoriesPage';
import NotificationsPage      from './pages/NotificationsPage';
import AdminPage              from './pages/AdminPage';
import WhatsAppPage           from './pages/WhatsAppPage';
import SuperAdminSettingsPage from './pages/SuperAdminSettingsPage';
import RegistrationClosedPage from './pages/RegistrationClosedPage';
import PublicVolunteerFormPage from './pages/PublicVolunteerFormPage';
import PublicInvitationPage   from './pages/PublicInvitationPage';

function Layout({ children }) {
  return <AppShell>{children}</AppShell>;
}

const protectedPages = [
  ['/',                     <DashboardPage />,         MODULE_PERMISSIONS.dashboard],
  ['/categories',           <CategoriesPage />,         MODULE_PERMISSIONS.categories],
  ['/notifications',        <NotificationsPage />,      MODULE_PERMISSIONS.notifications],
  ['/admin',                <AdminPage />,              MODULE_PERMISSIONS.admin],
  ['/whatsapp',             <WhatsAppPage />,           MODULE_PERMISSIONS.whatsapp],
  ['/super-admin/settings', <SuperAdminSettingsPage />, MODULE_PERMISSIONS.superAdminSettings],
];

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <LiveProvider>
          <BrowserRouter>
            <Routes>
              {/* Public auth */}
              <Route path="/login"           element={<LoginPage />} />
              <Route path="/signup"          element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Public utility */}
              <Route path="/volunteer-register" element={<PublicVolunteerFormPage />} />
              <Route path="/public-invite"      element={<PublicInvitationPage />} />
              <Route path="/registration-closed" element={<RegistrationClosedPage />} />

              {/* Protected */}
              {protectedPages.map(([path, page, permission]) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <ProtectedRoute permission={permission}>
                      <Layout>{page}</Layout>
                    </ProtectedRoute>
                  }
                />
              ))}
            </Routes>
            <AppUpdatePrompt />
          </BrowserRouter>
        </LiveProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
