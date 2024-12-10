import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'uno.css';
// import { ThemeProvider } from '@mui/material/styles';  // 导入 ThemeProvider
createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <App />
  </StrictMode>
)
