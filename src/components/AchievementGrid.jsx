import { Plus, Lock, Check, Gift } from 'lucide-react';

const AchievementGrid = ({ achievements, onClaim, onAdd }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-lg">
        <h2>🏆 Rewards Shop</h2>
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={18} />
          Add Reward
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-state-icon">🏆</div>
          <div className="empty-state-text">
            No rewards set. Add rewards to motivate yourself!
          </div>
          <button className="btn btn-outline" onClick={onAdd}>
            <Plus size={18} />
            Add Reward
          </button>
        </div>
      ) : (
        <div className="grid-3">
          {achievements.map(achievement => (
            <div
              key={achievement._id}
              className={`card achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem'
              }}>
                {achievement.claimed ? (
                  <span className="badge badge-green">
                    <Check size={12} /> Claimed
                  </span>
                ) : achievement.unlocked ? (
                  <span className="badge badge-gold animate-pulse">
                    <Gift size={12} /> Unlocked!
                  </span>
                ) : (
                  <span className="badge badge-cyan">
                    <Lock size={12} /> Locked
                  </span>
                )}
              </div>

              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-title">{achievement.title}</div>

              {achievement.description && (
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '1rem'
                }}>
                  {achievement.description}
                </div>
              )}

              <div className="achievement-points">
                {achievement.requiredPoints?.toLocaleString()} points
              </div>

              {/* Progress Bar */}
              <div style={{ marginTop: '1rem' }}>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(100, achievement.progress || 0)}%`,
                      background: achievement.unlocked ? 'var(--neon-green)' : 'var(--gradient-primary)'
                    }}
                  />
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: '0.5rem',
                  textAlign: 'center'
                }}>
                  {achievement.unlocked
                    ? '100% Complete!'
                    : `${achievement.pointsNeeded?.toLocaleString()} points to go`}
                </div>
              </div>

              {/* Claim Button */}
              {achievement.unlocked && !achievement.claimed && (
                <button
                  className="btn btn-success w-full mt-md"
                  onClick={() => onClaim(achievement._id)}
                >
                  <Gift size={16} />
                  Claim Reward
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementGrid;
