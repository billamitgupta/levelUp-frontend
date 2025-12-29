import { Zap, TrendingUp, Trophy, Target, Flame } from 'lucide-react';

const StatsPanel = ({ stats, user }) => {
  if (!stats) return null;

  const levelProgress = getLevelProgress(stats.lifetimePoints);

  return (
    <div className="card card-glow">
      {/* Day Streak Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.75rem',
        marginBottom: '1rem',
        background: stats.dayStreak > 0
          ? 'linear-gradient(135deg, rgba(255,102,0,0.2) 0%, rgba(255,0,64,0.1) 100%)'
          : 'rgba(255,255,255,0.05)',
        borderRadius: '8px',
        border: stats.dayStreak > 0
          ? '1px solid rgba(255,102,0,0.3)'
          : '1px solid rgba(255,255,255,0.1)'
      }}>
        <Flame size={20} style={{ color: 'var(--neon-orange)' }} />
        <span style={{
          fontFamily: 'var(--font-main)',
          fontWeight: 700,
          color: 'var(--neon-orange)',
          fontSize: '1.1rem'
        }}>
          {stats.dayStreak || 0} Day Streak
        </span>
        {stats.longestStreak > stats.dayStreak && (
          <span style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.5)',
            marginLeft: '0.5rem'
          }}>
            (Best: {stats.longestStreak})
          </span>
        )}
      </div>

      <div className="grid-4" style={{ marginBottom: '1rem' }}>
        <div className="stat-card">
          <Zap size={24} style={{ color: 'var(--neon-cyan)', marginBottom: '0.5rem' }} />
          <div className="stat-value">{stats.totalPoints?.toLocaleString()}</div>
          <div className="stat-label">Current XP</div>
        </div>

        <div className="stat-card">
          <TrendingUp size={24} style={{ color: 'var(--neon-green)', marginBottom: '0.5rem' }} />
          <div className="stat-value">{stats.lifetimePoints?.toLocaleString()}</div>
          <div className="stat-label">Lifetime XP</div>
        </div>

        <div className="stat-card">
          <Trophy size={24} style={{ color: 'var(--neon-yellow)', marginBottom: '0.5rem' }} />
          <div className="stat-value">{stats.unlockedAchievements}/{stats.totalAchievements}</div>
          <div className="stat-label">Rewards</div>
        </div>

        <div className="stat-card">
          <Target size={24} style={{ color: 'var(--neon-magenta)', marginBottom: '0.5rem' }} />
          <div className="stat-value">{stats.level}</div>
          <div className="stat-label">{stats.title}</div>
        </div>
      </div>

      {/* Level Progress */}
      <div>
        <div className="flex justify-between mb-sm">
          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
            Level {stats.level} Progress
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--neon-cyan)' }}>
            {levelProgress.current?.toLocaleString()} / {levelProgress.next?.toLocaleString()} XP
          </span>
        </div>
        <div className="progress-bar progress-bar-lg">
          <div
            className="progress-fill"
            style={{ width: `${levelProgress.percentage}%` }}
          />
        </div>
      </div>

      {/* Next Achievement */}
      {stats.nextAchievement && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(0,245,255,0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(0,245,255,0.1)'
        }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>
            Next Reward
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div style={{ fontWeight: 600 }}>{stats.nextAchievement.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--neon-cyan)' }}>
                {stats.nextAchievement.pointsNeeded?.toLocaleString()} points needed
              </div>
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--neon-magenta)',
              fontFamily: 'var(--font-main)'
            }}>
              {stats.nextAchievement.requiredPoints?.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Calculate level progress based on lifetime points
function getLevelProgress(points) {
  const levels = [
    { level: 1, min: 0, max: 500 },
    { level: 2, min: 500, max: 1000 },
    { level: 3, min: 1000, max: 2500 },
    { level: 4, min: 2500, max: 5000 },
    { level: 5, min: 5000, max: 10000 },
    { level: 6, min: 10000, max: 15000 },
    { level: 7, min: 15000, max: 25000 },
    { level: 8, min: 25000, max: 50000 },
    { level: 9, min: 50000, max: 100000 },
    { level: 10, min: 100000, max: 999999 }
  ];

  const currentLevel = levels.find(l => points >= l.min && points < l.max) || levels[levels.length - 1];
  const progress = points - currentLevel.min;
  const total = currentLevel.max - currentLevel.min;
  const percentage = Math.min(100, (progress / total) * 100);

  return {
    current: points,
    next: currentLevel.max,
    percentage
  };
}

export default StatsPanel;
