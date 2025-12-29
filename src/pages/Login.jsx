import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Sword, Mail, Lock, Zap } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(formData.email, formData.password);
      if (data.loginBonus > 0) {
        toast.success(`🔥 Login Streak Day ${data.loginStreak}! +${data.loginBonus} points!`);
      } else {
        toast.success('Welcome back, Hunter!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <div className="auth-title">
          <div className="auth-logo">
            <Sword size={48} className="text-gradient" />
          </div>
          <h1>Level Up</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
            Continue Your Hunt
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--neon-cyan)',
                  opacity: 0.7
                }}
              />
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                style={{ paddingLeft: '40px' }}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--neon-cyan)',
                  opacity: 0.7
                }}
              />
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                style={{ paddingLeft: '40px' }}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <>
                <Zap size={18} className="animate-pulse" />
                Connecting...
              </>
            ) : (
              'Enter the Gate'
            )}
          </button>
        </form>

        <div className="auth-footer">
          New hunter? <Link to="/register">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
