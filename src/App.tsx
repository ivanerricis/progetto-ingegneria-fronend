import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { lazy, useEffect, useState } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import ProtectedRoute from './components/protected-route';
import { AccountProvider } from '@/providers/account-provider';
import { AgentProvider } from '@/providers/agent-provider';
import { resolveSession } from './lib/api/resolveSession';
import PublicRoute from './components/public-route';
import { useMediaQuery } from './hooks/use-media-query';

const RequestResetPassword = lazy(() => import('@/pages/Account/reset-password/RequestResetPassword'));
const SendResetPassword = lazy(() => import('@/pages/Account/reset-password/SendResetPassword'));

// Lazy loading delle pagine Account
const Login = lazy(() => import('@/pages/Account/login/Login'));
const Register = lazy(() => import('@/pages/Account/register/Register'));
const Homepage = lazy(() => import('@/pages/Account/homepage/Homepage'));
const AccountProfile = lazy(() => import('@/pages/Account/profile/Profile'));
const AccountPassword = lazy(() => import('@/pages/Account/password/Password'));
const Advertisement = lazy(() => import('@/pages/Account/advertisement/Advertisement'));
const AccountAppointments = lazy(() => import('@/pages/Account/appointment/Appointments'));
const AccountOffers = lazy(() => import('@/pages/Account/offers/Offers'));

// Lazy loading delle pagine Agent
const LoginAgent = lazy(() => import('@/pages/Agent/login-agent/Login'));
const CreateAgency = lazy(() => import('@/pages/CreateAgency/CreateAgency'));
const DashboardLayout = lazy(() => import('@/pages/Agent/dashboard/DashboardLayout'));
const Advertisements = lazy(() => import('@/pages/Agent/dashboard/advertisement/Advertisements'));
const AgentAdvertisement = lazy(() => import('@/pages/Agent/dashboard/advertisement/Advertisement'));
const CreateAdvertisement = lazy(() => import('@/pages/Agent/dashboard/createAdvertisement/CreateAdvertisement'));
const Appointments = lazy(() => import('@/pages/Agent/dashboard/appointment/Appointments'));
const Offers = lazy(() => import('@/pages/Agent/dashboard/offer/Offers'));
const Agents = lazy(() => import('@/pages/Agent/dashboard/agents/Agents'));
const CreateAgentPage = lazy(() => import('@/pages/Agent/dashboard/createAgent/CreateAgentPage'));
const AgentProfile = lazy(() => import('@/pages/Agent/dashboard/profile/Profile'));
const AgentPassword = lazy(() => import('@/pages/Agent/dashboard/password/Password'));

const SessionEntryRedirect = () => {
  const [target, setTarget] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    resolveSession().then(result => {
      if (isMounted) setTarget(result ?? "/login")
    })
    return () => { isMounted = false }
  }, [])

  if (!target) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-md text-muted-foreground">
        Verifica sessione in corso...
      </div>
    )
  }

  return <Navigate to={target} replace />
}

function App() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <MantineProvider
      theme={{
        fontFamily: 'Nunito Sans, sans-serif',
        headings: { fontFamily: 'Nunito Sans, sans-serif' },
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          {/* <Suspense fallback={<Loading />}> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SessionEntryRedirect />} />
              <Route path="/create-agency" element={<CreateAgency />} />
              <Route path="/request-reset-password-account" element={<RequestResetPassword />} />
              <Route path="/reset-password-account/:token" element={<SendResetPassword />} />

              {/* Account Routes */}
              <Route element={<AccountProvider><Outlet /></AccountProvider>}>
                <Route path="/login" element={
                  <PublicRoute><Login /></PublicRoute>
                } />
                <Route path="/register" element={
                  <PublicRoute><Register /></PublicRoute>
                } />
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
                <Route path="/appointments" element={
                  <ProtectedRoute authCheckPath="/auth/account" redirectTo="/login">
                    <AccountAppointments />
                  </ProtectedRoute>
                } />
                <Route path="/offers" element={
                  <ProtectedRoute authCheckPath="/auth/account" redirectTo="/login">
                    <AccountOffers />
                  </ProtectedRoute>
                } />
                <Route path="/account/:id/password" element={
                  <ProtectedRoute authCheckPath="/auth/account" redirectTo="/login">
                    <AccountPassword />
                  </ProtectedRoute>
                } />
                <Route path="/account/advertisement/:id" element={
                  <ProtectedRoute authCheckPath="/auth/account" redirectTo="/login">
                    <Advertisement />
                  </ProtectedRoute>
                } />
              </Route>

              {/* Agent Routes */}
              <Route element={<AgentProvider><Outlet /></AgentProvider>}>
                <Route path="/agent/login" element={
                  <PublicRoute><LoginAgent /></PublicRoute>
                } />
                <Route path="/agent/:id/password" element={
                  <Navigate to="/agent/dashboard/password" replace />
                } />
                <Route path="/agent/dashboard" element={
                  <ProtectedRoute authCheckPath="/auth/agent" redirectTo="/agent/login">
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/agent/dashboard/advertisements" replace />} />
                  <Route path="/agent/dashboard/profile" element={<AgentProfile />} />
                  <Route path="/agent/dashboard/advertisements" element={<Advertisements />} />
                  <Route path="/agent/dashboard/appointments" element={<Appointments />} />
                  <Route path="/agent/dashboard/offers" element={<Offers />} />
                  <Route path="/agent/dashboard/agents" element={<Agents />} />
                  <Route path="/agent/dashboard/password" element={<AgentPassword />} />
                  <Route path="/agent/dashboard/create-advertisement" element={<CreateAdvertisement />} />
                  <Route path="/agent/dashboard/advertisement/:id" element={<AgentAdvertisement />} />
                  <Route path="/agent/dashboard/create-agent" element={<CreateAgentPage />} />
                </Route>
              </Route>

              {/* Fallback per pagine non esistenti */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
          {/* </Suspense> */}
          <Toaster
            closeButton={!isMobile}
            position='top-center'
            richColors
            swipeDirections={['left', 'right', 'top']}
            toastOptions={{
              classNames: {
                title: "text-base",
                description: "text-sm",
                closeButton: "[&>svg]:h-4 [&>svg]:w-4 w-6! h-6!",
              }
            }} />
        </TooltipProvider>
      </ThemeProvider>
    </MantineProvider>
  );
}

export default App;