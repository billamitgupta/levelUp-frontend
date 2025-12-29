import { Plus, Check, Trash2 } from 'lucide-react';

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

  return (
    <div>
      <div className="flex justify-between items-center mb-lg">
        <h2>⚔️ Active Quests</h2>
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={18} />
          Add Quest
        </button>
      </div>

      {quests.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-state-icon">⚔️</div>
          <div className="empty-state-text">
            No active quests. Create your first quest to start earning points!
          </div>
          <button className="btn btn-outline" onClick={onAdd}>
            <Plus size={18} />
            Create Quest
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-md">
          {quests.map(quest => (
            <div
              key={quest._id}
              className={`quest-item ${getDifficultyClass(quest.difficulty)}`}
            >
              <div className="quest-icon">{quest.icon}</div>

              <div className="quest-content">
                <div className="flex items-center gap-sm">
                  <span className="quest-title">{quest.title}</span>
                  <span className={`badge ${getDifficultyBadge(quest.difficulty)}`}>
                    {quest.difficulty}
                  </span>
                  {quest.category !== 'one-time' && (
                    <span className="badge badge-cyan">{quest.category}</span>
                  )}
                </div>
                {quest.description && (
                  <div className="quest-description">{quest.description}</div>
                )}
              </div>

              <div className="quest-points">+{quest.points}</div>

              <div className="flex gap-sm">
                <button
                  className="btn btn-success btn-icon"
                  onClick={() => onComplete(quest._id)}
                  title="Complete Quest"
                >
                  <Check size={18} />
                </button>
                <button
                  className="btn btn-ghost btn-icon"
                  onClick={() => onDelete(quest._id)}
                  title="Delete Quest"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestList;
