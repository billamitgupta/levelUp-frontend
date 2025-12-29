import { Plus, AlertTriangle, Trash2 } from 'lucide-react';

const PenaltyList = ({ penalties, onTrigger, onDelete, onAdd }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-lg">
        <h2>💀 Penalties</h2>
        <button className="btn btn-danger" onClick={onAdd}>
          <Plus size={18} />
          Add Penalty
        </button>
      </div>

      {penalties.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-state-icon">💀</div>
          <div className="empty-state-text">
            No penalties set. Add penalties to keep yourself accountable!
          </div>
          <button className="btn btn-outline" onClick={onAdd}>
            <Plus size={18} />
            Create Penalty
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-md">
          {penalties.map(penalty => (
            <div key={penalty._id} className="penalty-item">
              <div className="penalty-icon">{penalty.icon}</div>

              <div className="penalty-content">
                <div className="penalty-title">{penalty.title}</div>
                {penalty.description && (
                  <div className="penalty-description">{penalty.description}</div>
                )}
                {penalty.triggeredCount > 0 && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--neon-red)', marginTop: '0.25rem' }}>
                    Triggered {penalty.triggeredCount} time{penalty.triggeredCount > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              <div className="penalty-points">-{penalty.points}</div>

              <div className="flex gap-sm">
                <button
                  className="btn btn-danger btn-icon"
                  onClick={() => {
                    if (confirm('Are you sure you want to trigger this penalty?')) {
                      onTrigger(penalty._id);
                    }
                  }}
                  title="Trigger Penalty"
                >
                  <AlertTriangle size={18} />
                </button>
                <button
                  className="btn btn-ghost btn-icon"
                  onClick={() => onDelete(penalty._id)}
                  title="Delete Penalty"
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

export default PenaltyList;
