import { useAuth } from '../context/AuthContext';
import { Sword, LogOut, Flame, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="header">
      <div className="container header-content">
        <div className="flex items-center gap-md">
          <Sword size={28} style={{ color: 'var(--neon-cyan)' }} />
          <span className="logo">Level Up</span>
        </div>

        <div className="user-info">
          <div className="flex items-center gap-sm">
            <Flame size={18} style={{ color: 'var(--neon-orange)' }} />
            <span style={{ color: 'var(--neon-orange)', fontWeight: 600 }}>
              🔥 {user?.dayStreak || 0} day streak
            </span>
          </div>

          <div className="level-display">
            <div className="level-badge">{user?.level || 1}</div>
            <div>
              <div style={{ fontWeight: 600 }}>{user?.username}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)' }}>
                {user?.title || 'Novice Hunter'}
              </div>
            </div>
          </div>

          <div className="user-points">
            ⚡ {user?.totalPoints?.toLocaleString() || 0}
          </div>

          <button 
            className="btn btn-ghost btn-icon" 
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="btn btn-ghost btn-icon" onClick={logout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
