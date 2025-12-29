import { useState } from 'react';
import { X } from 'lucide-react';

const ICONS = ['⚔️', '🎯', '📚', '💪', '🏃', '🧘', '💻', '✍️', '🎨', '🎵', '🍎', '💧', '😴', '🧹', '📞', '💼'];

const AddQuestModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: 100,
    icon: '⚔️',
    category: 'one-time',
    difficulty: 'medium'
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
          <h3 className="modal-title">⚔️ Create New Quest</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Quest Title</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g., Complete 30 min workout"
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
                placeholder="Additional details..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Points Reward</label>
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
                <label className="form-label">Category</label>
                <select
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="one-time">One-time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="repeatable">Repeatable</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <div className="flex gap-sm">
                {['easy', 'medium', 'hard', 'legendary'].map(diff => (
                  <button
                    type="button"
                    key={diff}
                    className={`btn ${formData.difficulty === diff ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setFormData(prev => ({ ...prev, difficulty: diff }))}
                    style={{ flex: 1, textTransform: 'capitalize' }}
                  >
                    {diff}
                  </button>
                ))}
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
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Quest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestModal;
