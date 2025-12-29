import { useAuth } from '../context/AuthContext';
import { Sword, LogOut, Flame } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

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

          <button className="btn btn-ghost btn-icon" onClick={logout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
