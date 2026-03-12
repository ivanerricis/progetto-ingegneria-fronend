import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Account/login/Login';
import { Register } from '@/pages/Account/register/Register';
import { Homepage } from '@/pages/Account/homepage/Homepage';
import { ThemeProvider } from '@/providers/theme-provider';
import LoginAgent from '@/pages/Agent/login-agent/Login';
import CreateAgency from '@/pages/CreateAgency/CreateAgency';
import DashboardLayout from '@/pages/Agent/dashboard/DashboardLayout';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import Advertisement from '@/pages/Agent/dashboard/advertisement/Advertisements';
import Appointments from '@/pages/Agent/dashboard/appointment/Appointments';
import Offers from '@/pages/Agent/dashboard/offer/Offers';
import Advertisements from '@/pages/Agent/dashboard/advertisement/Advertisements';
import DashboardHome from '@/pages/Agent/dashboard/DashboardHome';
import CreateAdvertisement from '@/pages/Agent/dashboard/CreateAdvertisement';
import AgentProfile from '@/pages/Agent/dashboard/profile/Profile';
import AccountProfile from '@/pages/Account/profile/Profile';
import ProtectedRoute from './components/protected-route';
import { AccountProvider } from '@/providers/account-provider';
import { AgentProvider } from '@/providers/agent-provider';

function App() {
  return (
    <>
      <MantineProvider
        theme={{
          fontFamily: 'Nunito Sans, sans-serif',
          headings: { fontFamily: 'Nunito Sans, sans-serif' },
        }}
      >
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <TooltipProvider>

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

                {/* Route di fallback per pagine non esistenti */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </BrowserRouter>
              <Toaster closeButton position='top-center' richColors/>
            </TooltipProvider>
          </ThemeProvider>
      </MantineProvider>
    </>
  )
}

export default App
