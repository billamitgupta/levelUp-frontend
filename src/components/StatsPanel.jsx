import { Zap, TrendingUp, Trophy, Target, Flame, Star, Award, Calendar, Clock } from 'lucide-react';

const StatsPanel = ({ stats, user }) => {
  if (!stats) return null;

  const levelProgress = getLevelProgress(stats.lifetimePoints);
  const streakBonus = Math.floor(stats.dayStreak / 7) * 50; // Bonus every 7 days

  return (
    <div className="dashboard-grid">
      {/* Main Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <Zap size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalPoints?.toLocaleString()}</div>
            <div className="stat-label">Current XP</div>
            <div className="stat-change">+{stats.todayPoints || 0} today</div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <TrendingUp size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.lifetimePoints?.toLocaleString()}</div>
            <div className="stat-label">Lifetime XP</div>
            <div className="stat-change">All time total</div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <Trophy size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.unlockedAchievements}/{stats.totalAchievements}</div>
            <div className="stat-label">Rewards</div>
            <div className="stat-change">{((stats.unlockedAchievements/stats.totalAchievements)*100).toFixed(0)}% unlocked</div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <Target size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.level}</div>
            <div className="stat-label">{stats.title}</div>
            <div className="stat-change">Hunter Rank</div>
          </div>
        </div>
      </div>

      {/* Streak & Progress Section */}
      <div className="progress-section">
        {/* Streak Card */}
        <div className="streak-card">
          <div className="streak-header">
            <Flame size={24} />
            <span>Daily Streak</span>
            {streakBonus > 0 && <div className="streak-bonus">+{streakBonus} bonus</div>}
          </div>
          <div className="streak-display">
            <div className="streak-number">{stats.dayStreak || 0}</div>
            <div className="streak-text">days</div>
          </div>
          <div className="streak-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${((stats.dayStreak % 7) / 7) * 100}%` }} />
            </div>
            <div className="streak-info">
              <span>{7 - (stats.dayStreak % 7)} days to next bonus</span>
              <span>Best: {stats.longestStreak}</span>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="level-progress-card">
          <div className="level-header">
            <Star size={20} />
            <span>Level {stats.level} Progress</span>
          </div>
          <div className="level-bar">
            <div className="progress-bar progress-bar-lg">
              <div className="progress-fill" style={{ width: `${levelProgress.percentage}%` }} />
            </div>
            <div className="level-info">
              <span>{levelProgress.current?.toLocaleString()} / {(levelProgress.next - levelProgress.current)?.toLocaleString()} XP</span>
              <span>{(100 - levelProgress.percentage).toFixed(1)}% to next level</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats-grid">
        <div className="quick-stat-card">
          <Calendar size={20} />
          <div className="quick-stat-content">
            <span className="quick-stat-label">Member Since</span>
            <span className="quick-stat-value">{new Date(user?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="quick-stat-card">
          <Clock size={20} />
          <div className="quick-stat-content">
            <span className="quick-stat-label">Last Active</span>
            <span className="quick-stat-value">{new Date(user?.lastLogin).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="quick-stat-card">
          <Award size={20} />
          <div className="quick-stat-content">
            <span className="quick-stat-label">Quests Completed</span>
            <span className="quick-stat-value">{stats.completedQuests || 0}</span>
          </div>
        </div>
      </div>

      {/* Next Achievement Preview */}
      <div className="next-reward-simple">
        <div className="reward-header">
          <Trophy size={20} />
          <span>Next Reward</span>
        </div>
        {stats.nextAchievement ? (
          <div className="reward-body">
            <div className="reward-icon">{stats.nextAchievement.icon}</div>
            <div className="reward-details">
              <h4>{stats.nextAchievement.title}</h4>
              <div className="reward-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${stats.nextAchievement.progress || 0}%` }} />
                </div>
                <div className="progress-info">
                  <span>{stats.lifetimePoints?.toLocaleString()} / {stats.nextAchievement.requiredPoints?.toLocaleString()} XP</span>
                  <span>{stats.nextAchievement.pointsNeeded?.toLocaleString()} needed</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="reward-placeholder">
            <div className="placeholder-icon">🎯</div>
            <div className="placeholder-text">
              <h4>All Rewards Unlocked!</h4>
              <p>You've achieved everything. Create new rewards to continue your journey!</p>
            </div>
          </div>
        )}
      </div>
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
    current: progress,
    next: total,
    total: points,
    percentage
  };
}

export default StatsPanel;
