import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './index.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <div className="level-badge animate-pulse" style={{ margin: '0 auto', marginBottom: '1rem' }}>
            ⚔️
          </div>
          <p style={{ color: 'var(--neon-cyan)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#12121a',
              color: '#fff',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              borderRadius: '8px',
              fontFamily: 'Rajdhani, sans-serif'
            },
            success: {
              iconTheme: {
                primary: '#39ff14',
                secondary: '#12121a'
              }
            },
            error: {
              iconTheme: {
                primary: '#ff0040',
                secondary: '#12121a'
              }
            }
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
