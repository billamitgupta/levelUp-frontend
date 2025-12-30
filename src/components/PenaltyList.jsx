import { Plus, AlertTriangle, Trash2, Clock, Repeat, Calendar } from 'lucide-react';

const PenaltyList = ({ penalties, onTrigger, onDelete, onAdd }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'daily': return <Calendar size={14} />;
      case 'weekly': return <Clock size={14} />;
      case 'repeatable': return <Repeat size={14} />;
      default: return null;
    }
  };

  const groupedPenalties = penalties.reduce((acc, penalty) => {
    const category = penalty.category || 'one-time';
    if (!acc[category]) acc[category] = [];
    acc[category].push(penalty);
    return acc;
  }, {});

  return (
    <div>
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">💀</span>
          <h2>Penalties</h2>
          <span className="quest-count">{penalties.length}</span>
        </div>
        <button className="btn btn-danger" onClick={onAdd}>
          <Plus size={18} />
          Add Penalty
        </button>
      </div>

      {penalties.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">💀</div>
          <div className="empty-state-text">
            <h3>No Penalties Set</h3>
            <p>Add penalties to keep yourself accountable and avoid bad habits!</p>
          </div>
          <button className="btn btn-danger" onClick={onAdd}>
            <Plus size={18} />
            Create Your First Penalty
          </button>
        </div>
      ) : (
        <div className="penalty-categories">
          {Object.entries(groupedPenalties).map(([category, categoryPenalties]) => (
            <div key={category} className="penalty-category">
              <div className="category-header">
                {getCategoryIcon(category)}
                <span className="category-name">{category.replace('-', ' ')}</span>
                <span className="category-count">{categoryPenalties.length}</span>
              </div>
              
              <div className="penalty-grid">
                {categoryPenalties.map(penalty => (
                  <div key={penalty._id} className="penalty-card">
                    <div className="penalty-header">
                      <div className="penalty-icon">{penalty.icon}</div>
                      <div className="penalty-badges">
                        {penalty.triggeredCount > 0 && (
                          <span className="badge badge-red">
                            {penalty.triggeredCount}x triggered
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="penalty-content">
                      <h3 className="penalty-title">{penalty.title}</h3>
                      {penalty.description && (
                        <p className="penalty-description">{penalty.description}</p>
                      )}
                    </div>
                    
                    <div className="penalty-footer">
                      <div className="penalty-cost">
                        <span className="cost-label">Penalty</span>
                        <span className="cost-points">-{penalty.points} XP</span>
                      </div>
                      
                      <div className="penalty-actions">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            if (confirm('Are you sure you want to trigger this penalty?')) {
                              onTrigger(penalty._id);
                            }
                          }}
                          title="Trigger Penalty"
                        >
                          <AlertTriangle size={16} />
                          Trigger
                        </button>
                        <button
                          className="btn btn-ghost btn-icon btn-sm"
                          onClick={() => onDelete(penalty._id)}
                          title="Delete Penalty"
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

export default PenaltyList;
