import { Swords, Skull, Trophy, Flame, Calendar, TrendingUp } from 'lucide-react';

const HistoryPanel = ({ history }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'quest_complete':
        return <Swords size={16} />;
      case 'penalty':
        return <Skull size={16} />;
      case 'achievement_unlock':
        return <Trophy size={16} />;
      case 'login_bonus':
        return <Flame size={16} />;
      default:
        return <Swords size={16} />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'quest_complete': return 'Quest Completed';
      case 'penalty': return 'Penalty Triggered';
      case 'achievement_unlock': return 'Achievement Unlocked';
      case 'login_bonus': return 'Login Bonus';
      default: return 'Activity';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const groupedHistory = history.reduce((acc, item) => {
    const date = new Date(item.timestamp).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">📜</span>
          <h2>Activity History</h2>
          <span className="quest-count">{history.length}</span>
        </div>
        <div className="history-stats">
          <TrendingUp size={16} />
          <span>Recent Activity</span>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">📜</div>
          <div className="empty-state-text">
            <h3>No Activity Yet</h3>
            <p>Complete quests and unlock achievements to see your progress history!</p>
          </div>
        </div>
      ) : (
        <div className="history-container">
          {Object.entries(groupedHistory).map(([date, items]) => (
            <div key={date} className="history-day">
              <div className="history-date">
                <Calendar size={16} />
                <span>{new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="history-items">
                {items.map((item, index) => (
                  <div key={index} className={`history-card ${item.points >= 0 ? 'positive' : 'negative'}`}>
                    <div className="history-icon-wrapper">
                      <div className={`history-icon ${item.points >= 0 ? 'positive' : 'negative'}`}>
                        {getIcon(item.type)}
                      </div>
                    </div>

                    <div className="history-content">
                      <div className="history-header">
                        <h4 className="history-title">{item.title}</h4>
                        <span className="history-type">{getTypeLabel(item.type)}</span>
                      </div>
                      <div className="history-time">{formatTime(item.timestamp)}</div>
                    </div>

                    <div className={`history-points ${item.points >= 0 ? 'positive' : 'negative'}`}>
                      {item.points >= 0 ? '+' : ''}{item.points} XP
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;
