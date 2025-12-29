import { Swords, Skull, Trophy, Flame } from 'lucide-react';

const HistoryPanel = ({ history }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'quest_complete':
        return <Swords size={14} />;
      case 'penalty':
        return <Skull size={14} />;
      case 'achievement_unlock':
        return <Trophy size={14} />;
      case 'login_bonus':
        return <Flame size={14} />;
      default:
        return <Swords size={14} />;
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

  return (
    <div>
      <h2 className="mb-lg">📜 Activity History</h2>

      {history.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-state-icon">📜</div>
          <div className="empty-state-text">
            No activity yet. Complete quests to see your history!
          </div>
        </div>
      ) : (
        <div className="card">
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <div className={`history-icon ${item.points >= 0 ? 'positive' : 'negative'}`}>
                {getIcon(item.type)}
              </div>

              <div className="history-content">
                <div className="history-title">{item.title}</div>
                <div className="history-time">{formatTime(item.timestamp)}</div>
              </div>

              <div className={`history-points ${item.points >= 0 ? 'positive' : 'negative'}`}>
                {item.points >= 0 ? '+' : ''}{item.points}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;
