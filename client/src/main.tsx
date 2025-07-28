import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/appRoutes';
import { AuthProvider } from './schemas/authContext'; 

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);