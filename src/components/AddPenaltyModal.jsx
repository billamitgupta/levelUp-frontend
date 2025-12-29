import { useState } from 'react';
import { X } from 'lucide-react';

const ICONS = ['💀', '👎', '🚫', '⚠️', '🍕', '🎮', '📱', '🍺', '💤', '🛒', '💸', '😈'];

const AddPenaltyModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: 50,
    icon: '💀'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">💀 Create New Penalty</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Penalty Title</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g., Skipped workout"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description (Optional)</label>
              <input
                type="text"
                name="description"
                className="form-input"
                placeholder="When this happens..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Points Deducted</label>
              <input
                type="number"
                name="points"
                className="form-input"
                min="1"
                max="10000"
                value={formData.points}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Icon</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {ICONS.map(icon => (
                  <button
                    type="button"
                    key={icon}
                    className={`btn ${formData.icon === icon ? 'btn-danger' : 'btn-ghost'} btn-icon`}
                    onClick={() => setFormData(prev => ({ ...prev, icon }))}
                    style={{ fontSize: '1.2rem' }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-danger">
              Create Penalty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPenaltyModal;
