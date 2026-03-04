import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Homepage } from '@/pages/Homepage';

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Nunito Sans, sans-serif',
        headings: { fontFamily: 'Nunito Sans, sans-serif' },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
