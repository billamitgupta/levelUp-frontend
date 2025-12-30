import { Plus, Lock, Check, Gift, Edit, Trash2, Star, Target } from 'lucide-react';

const AchievementGrid = ({ achievements, onClaim, onAdd, onEdit, onDelete }) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const claimedCount = achievements.filter(a => a.claimed).length;
  
  return (
    <div>
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">🏆</span>
          <h2>Rewards Shop</h2>
          <div className="achievement-stats">
            <span className="achievement-stat unlocked">
              <Star size={14} />
              {unlockedCount} unlocked
            </span>
            <span className="achievement-stat claimed">
              <Gift size={14} />
              {claimedCount} claimed
            </span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={18} />
          Add Reward
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">🏆</div>
          <div className="empty-state-text">
            <h3>No Rewards Set</h3>
            <p>Create rewards to motivate yourself and celebrate your achievements!</p>
          </div>
          <button className="btn btn-primary" onClick={onAdd}>
            <Plus size={18} />
            Create Your First Reward
          </button>
        </div>
      ) : (
        <div className="achievements-container">
          <div className="achievements-grid">
            {achievements.map(achievement => (
              <div
                key={achievement._id}
                className={`achievement-card-enhanced ${
                  achievement.claimed ? 'claimed' : 
                  achievement.unlocked ? 'unlocked' : 'locked'
                }`}
              >
                {/* Status Indicator */}
                <div className="achievement-status">
                  {achievement.claimed ? (
                    <div className="status-badge claimed">
                      <Check size={12} />
                      Claimed
                    </div>
                  ) : achievement.unlocked ? (
                    <div className="status-badge unlocked animate-pulse">
                      <Gift size={12} />
                      Ready!
                    </div>
                  ) : (
                    <div className="status-badge locked">
                      <Lock size={12} />
                      Locked
                    </div>
                  )}
                </div>

                {/* Achievement Content */}
                <div className="achievement-main">
                  <div className="achievement-icon-large">{achievement.icon}</div>
                  <h3 className="achievement-title-enhanced">{achievement.title}</h3>
                  
                  {achievement.description && (
                    <p className="achievement-description-enhanced">
                      {achievement.description}
                    </p>
                  )}

                  <div className="achievement-points-display">
                    <Target size={16} />
                    <span>{achievement.requiredPoints?.toLocaleString()} points</span>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="achievement-progress-section">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(100, achievement.progress || 0)}%`,
                        background: achievement.unlocked ? 'var(--neon-green)' : 'var(--gradient-primary)'
                      }}
                    />
                  </div>
                  <div className="progress-text">
                    {achievement.unlocked
                      ? '🎉 Achievement Unlocked!'
                      : `${achievement.pointsNeeded?.toLocaleString()} points to go`}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="achievement-actions">
                  {achievement.unlocked && !achievement.claimed && (
                    <button
                      className="btn btn-success btn-claim"
                      onClick={() => onClaim(achievement._id)}
                    >
                      <Gift size={16} />
                      Claim Reward
                    </button>
                  )}
                  
                  <div className="achievement-controls">
                    <button
                      className="btn btn-ghost btn-icon btn-sm"
                      onClick={() => onEdit(achievement)}
                      title="Edit Reward"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="btn btn-ghost btn-icon btn-sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this reward?')) {
                          onDelete(achievement._id);
                        }
                      }}
                      title="Delete Reward"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementGrid;
