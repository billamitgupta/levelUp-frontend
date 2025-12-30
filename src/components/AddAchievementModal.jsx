import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const ICONS = ['🏆', '🎁', '🕶️', '🚁', '💻', '🏍️', '🚗', '✈️', '🏠', '⌚', '📱', '🎮', '👟', '👜', '💎', '🎸'];

const AddAchievementModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredPoints: 1000,
    icon: '🏆'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'requiredPoints' ? parseInt(value) || 0 : value
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
          <h3 className="modal-title">🏆 Create New Reward</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Reward Title</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g., New Gaming Console"
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
                placeholder="What you'll reward yourself with..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Points Required</label>
              <input
                type="number"
                name="requiredPoints"
                className="form-input"
                min="100"
                max="1000000"
                step="100"
                value={formData.requiredPoints}
                onChange={handleChange}
                required
              />
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
                Suggested: 5,000 (small) · 25,000 (medium) · 100,000 (big)
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Icon</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {ICONS.map(icon => (
                  <button
                    type="button"
                    key={icon}
                    className={`btn ${formData.icon === icon ? 'btn-primary' : 'btn-ghost'} btn-icon`}
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
              <X size={16} />
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={16} />
              Create Reward
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAchievementModal;
