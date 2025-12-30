import { Plus, Check, Trash2, Clock, Repeat, Calendar } from 'lucide-react';

const QuestList = ({ quests, onComplete, onDelete, onAdd }) => {
  const getDifficultyClass = (difficulty) => {
    return `difficulty-${difficulty}`;
  };

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      easy: 'badge-green',
      medium: 'badge-cyan',
      hard: 'badge-gold',
      legendary: 'badge-magenta'
    };
    return badges[difficulty] || 'badge-cyan';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'daily': return <Calendar size={14} />;
      case 'weekly': return <Clock size={14} />;
      case 'repeatable': return <Repeat size={14} />;
      default: return null;
    }
  };

  const groupedQuests = quests.reduce((acc, quest) => {
    const category = quest.category || 'one-time';
    if (!acc[category]) acc[category] = [];
    acc[category].push(quest);
    return acc;
  }, {});

  return (
    <div>
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">⚔️</span>
          <h2>Active Quests</h2>
          <span className="quest-count">{quests.length}</span>
        </div>
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={18} />
          Add Quest
        </button>
      </div>

      {quests.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">⚔️</div>
          <div className="empty-state-text">
            <h3>No Active Quests</h3>
            <p>Create your first quest to start earning points and level up!</p>
          </div>
          <button className="btn btn-primary" onClick={onAdd}>
            <Plus size={18} />
            Create Your First Quest
          </button>
        </div>
      ) : (
        <div className="quest-categories">
          {Object.entries(groupedQuests).map(([category, categoryQuests]) => (
            <div key={category} className="quest-category">
              <div className="category-header">
                {getCategoryIcon(category)}
                <span className="category-name">{category.replace('-', ' ')}</span>
                <span className="category-count">{categoryQuests.length}</span>
              </div>
              
              <div className="quest-grid">
                {categoryQuests.map(quest => (
                  <div
                    key={quest._id}
                    className={`quest-card ${getDifficultyClass(quest.difficulty)}`}
                  >
                    <div className="quest-header">
                      <div className="quest-icon">{quest.icon}</div>
                      <div className="quest-badges">
                        <span className={`badge ${getDifficultyBadge(quest.difficulty)}`}>
                          {quest.difficulty}
                        </span>
                        {quest.category !== 'one-time' && (
                          <span className="badge badge-outline">
                            {getCategoryIcon(quest.category)}
                            {quest.category}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="quest-content">
                      <h3 className="quest-title">{quest.title}</h3>
                      {quest.description && (
                        <p className="quest-description">{quest.description}</p>
                      )}
                    </div>
                    
                    <div className="quest-footer">
                      <div className="quest-reward">
                        <span className="reward-label">Reward</span>
                        <span className="reward-points">+{quest.points} XP</span>
                      </div>
                      
                      <div className="quest-actions">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => onComplete(quest._id)}
                          title="Complete Quest"
                        >
                          <Check size={16} />
                          Complete
                        </button>
                        <button
                          className="btn btn-ghost btn-icon btn-sm"
                          onClick={() => onDelete(quest._id)}
                          title="Delete Quest"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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

export default QuestList;
