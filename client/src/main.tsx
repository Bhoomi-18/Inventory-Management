import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/appRoutes';
import { AuthProvider } from './schemas/authContext';
import { ThemeProvider } from './components/theme/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);