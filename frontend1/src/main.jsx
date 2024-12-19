import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/UseContext.jsx'
import { SocketProvider } from './context/socket/SocketContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <ErrorBoundary>
    <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
   </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
