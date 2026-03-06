import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login/Login';
import { Register } from '@/pages/Register/Register';
import { Homepage } from '@/pages/Homepage/Homepage';
import { ThemeProvider } from './components/theme-provider';
// import ProtectedRoute from './components/protected-route';

function App() {
  return (
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<Homepage />} />

            {/* Route di fallback per pagine non esistenti */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </MantineProvider>
  )
}

export default App
