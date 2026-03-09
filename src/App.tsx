import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Account/Login/Login';
import { Register } from '@/pages/Account/Register/Register';
import { Homepage } from '@/pages/Account/Homepage/Homepage';
import { ThemeProvider } from '@/components/theme-provider';
import LoginAgent from '@/pages/Agent/LoginAgent/Login';
import CreateAgency from '@/pages/CreateAgency/CreateAgency';
import Dashboard from '@/pages/Agent/Dashboard/Dashboard';
import { Toaster } from '@/components/ui/sonner';
import Advertisement from './pages/Account/Advertisement/Advertisement';
// import ProtectedRoute from './components/protected-route';

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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/create-agency" element={<CreateAgency />} />

              {/* Account Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/account/advertisement/:id" element={<Advertisement />} />

              {/* Agent Routes */}
              <Route path="/agent/login" element={<LoginAgent />} />
              <Route path="/agent/dashboard" element={<Dashboard />} />

              {/* Route di fallback per pagine non esistenti */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
          <Toaster closeButton position='top-center'/>
        </ThemeProvider>
      </MantineProvider>
    </>
  )
}

export default App
