import { useState } from 'react';
import { X, Save } from 'lucide-react';

const EditAchievementModal = ({ achievement, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: achievement.title,
    description: achievement.description || '',
    requiredPoints: achievement.requiredPoints,
    icon: achievement.icon
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(achievement._id, formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>✏️ Edit Reward</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Icon</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="🏆"
              maxLength={2}
            />
          </div>

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="MacBook Pro"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Reward yourself with a new laptop"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Required Points *</label>
            <input
              type="number"
              value={formData.requiredPoints}
              onChange={(e) => setFormData({ ...formData, requiredPoints: parseInt(e.target.value) })}
              required
              min={1}
              placeholder="25000"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              <X size={16} />
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              Update Reward
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAchievementModal;