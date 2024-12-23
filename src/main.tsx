import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'uno.css';

// import store from './store'
// import { ThemeProvider } from '@mui/material/styles';  // 导入 ThemeProvider
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
