import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import ProtectedRoute from './components/protected-route';
import { AccountProvider } from '@/providers/account-provider';
import { AgentProvider } from '@/providers/agent-provider';

// Lazy loading delle pagine Account
const Login = lazy(() => import('@/pages/Account/login/Login'));
const Register = lazy(() => import('@/pages/Account/register/Register'));
const Homepage = lazy(() => import('@/pages/Account/homepage/Homepage'));
const AccountProfile = lazy(() => import('@/pages/Account/profile/Profile'));
const Advertisement = lazy(() => import('@/pages/Agent/dashboard/advertisement/Advertisements'));

// Lazy loading delle pagine Agent
const LoginAgent = lazy(() => import('@/pages/Agent/login-agent/Login'));
const CreateAgency = lazy(() => import('@/pages/CreateAgency/CreateAgency'));
const DashboardLayout = lazy(() => import('@/pages/Agent/dashboard/DashboardLayout'));
const DashboardHome = lazy(() => import('@/pages/Agent/dashboard/DashboardHome'));
const Advertisements = lazy(() => import('@/pages/Agent/dashboard/advertisement/Advertisements'));
const Appointments = lazy(() => import('@/pages/Agent/dashboard/appointment/Appointments'));
const Offers = lazy(() => import('@/pages/Agent/dashboard/offer/Offers'));
const CreateAdvertisement = lazy(() => import('@/pages/Agent/dashboard/CreateAdvertisement'));
const AgentProfile = lazy(() => import('@/pages/Agent/dashboard/profile/Profile'));

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Nunito Sans, sans-serif',
        headings: { fontFamily: 'Nunito Sans, sans-serif' },
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/create-agency" element={<CreateAgency />} />

                {/* Account Routes */}
                <Route element={<AccountProvider><Outlet /></AccountProvider>}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/homepage" element={
                    <ProtectedRoute authCheckPath="/auth/account" redirectTo="/login">
                      <Homepage />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute authCheckPath="/auth/account" redirectTo="/login">
                      <AccountProfile />
                    </ProtectedRoute>
                  } />
                  <Route path="/account/advertisement/:id" element={<Advertisement />} />
                </Route>

                {/* Agent Routes */}
                <Route element={<AgentProvider><Outlet /></AgentProvider>}>
                  <Route path="/agent/login" element={<LoginAgent />} />
                  <Route path="/agent/dashboard" element={
                    <ProtectedRoute authCheckPath="/auth/agent" redirectTo="/agent/login">
                      <DashboardLayout />
                    </ProtectedRoute>
                  }>
                    <Route index element={<DashboardHome />} />
                    <Route path="/agent/dashboard/advertisements" element={<Advertisements />} />
                    <Route path="/agent/dashboard/appointments" element={<Appointments />} />
                    <Route path="/agent/dashboard/offers" element={<Offers />} />
                    <Route path="/agent/dashboard/profile" element={<AgentProfile />} />
                    <Route path="/agent/dashboard/create-advertisement" element={<CreateAdvertisement />} />
                  </Route>
                </Route>

                {/* Fallback per pagine non esistenti */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
          <Toaster closeButton position='top-center' richColors />
        </TooltipProvider>
      </ThemeProvider>
    </MantineProvider>
  );
}

export default App;