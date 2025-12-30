import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import StatsPanel from '../components/StatsPanel';
import QuestList from '../components/QuestList';
import PenaltyList from '../components/PenaltyList';
import AchievementGrid from '../components/AchievementGrid';
import HistoryPanel from '../components/HistoryPanel';
import AddQuestModal from '../components/AddQuestModal';
import AddPenaltyModal from '../components/AddPenaltyModal';
import AddAchievementModal from '../components/AddAchievementModal';
import EditAchievementModal from '../components/EditAchievementModal';
import LevelUpAnimation from '../components/LevelUpAnimation';
import { Swords, Skull, Trophy, Clock } from 'lucide-react';

const Home = () => {
  const { user, refreshStats } = useAuth();
  const [activeTab, setActiveTab] = useState('quests');
  const [stats, setStats] = useState(null);
  const [quests, setQuests] = useState([]);
  const [penalties, setPenalties] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showAddQuest, setShowAddQuest] = useState(false);
  const [showAddPenalty, setShowAddPenalty] = useState(false);
  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [showEditAchievement, setShowEditAchievement] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);

  // Level up animation
  const [levelUp, setLevelUp] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [statsRes, questsRes, penaltiesRes, achievementsRes] = await Promise.all([
        api.get('/auth/stats'),
        api.get('/quests'),
        api.get('/penalties'),
        api.get('/achievements')
      ]);
      setStats(statsRes.data);
      setQuests(questsRes.data);
      setPenalties(penaltiesRes.data);
      setAchievements(achievementsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteQuest = async (questId) => {
    try {
      const { data } = await api.put(`/quests/${questId}/complete`);
      toast.success(`+${data.quest.points} points! Quest completed!`);

      if (data.leveledUp) {
        setLevelUp(data.user.level);
      }

      if (data.unlockedAchievements?.length > 0) {
        data.unlockedAchievements.forEach(a => {
          toast.success(`🏆 Achievement Unlocked: ${a.title}!`);
        });
      }

      await fetchAllData();
      await refreshStats();
    } catch (error) {
      toast.error('Failed to complete quest');
    }
  };

  const handleTriggerPenalty = async (penaltyId) => {
    try {
      const { data } = await api.put(`/penalties/${penaltyId}/trigger`);
      toast.error(`-${data.penalty.points} points! Penalty triggered!`);
      await fetchAllData();
      await refreshStats();
    } catch (error) {
      toast.error('Failed to trigger penalty');
    }
  };

  const handleDeleteQuest = async (questId) => {
    try {
      await api.delete(`/quests/${questId}`);
      toast.success('Quest removed');
      await fetchAllData();
      await refreshStats();
    } catch (error) {
      toast.error('Failed to delete quest');
    }
  };

  const handleDeletePenalty = async (penaltyId) => {
    try {
      await api.delete(`/penalties/${penaltyId}`);
      toast.success('Penalty removed');
      setPenalties(penalties.filter(p => p._id !== penaltyId));
    } catch (error) {
      toast.error('Failed to delete penalty');
    }
  };

  const handleAddQuest = async (questData) => {
    try {
      const { data } = await api.post('/quests', questData);
      setQuests([data, ...quests]);
      setShowAddQuest(false);
      toast.success('Quest added!');
    } catch (error) {
      toast.error('Failed to add quest');
    }
  };

  const handleAddPenalty = async (penaltyData) => {
    try {
      const { data } = await api.post('/penalties', penaltyData);
      setPenalties([data, ...penalties]);
      setShowAddPenalty(false);
      toast.success('Penalty added!');
    } catch (error) {
      toast.error('Failed to add penalty');
    }
  };

  const handleAddAchievement = async (achievementData) => {
    try {
      const { data } = await api.post('/achievements', achievementData);
      setAchievements([...achievements, data].sort((a, b) => a.requiredPoints - b.requiredPoints));
      setShowAddAchievement(false);
      toast.success('Achievement added!');
    } catch (error) {
      toast.error('Failed to add achievement');
    }
  };

  const handleClaimAchievement = async (achievementId) => {
    try {
      await api.put(`/achievements/${achievementId}/claim`);
      toast.success('Achievement claimed! 🎉');
      await fetchAllData();
    } catch (error) {
      toast.error('Failed to claim achievement');
    }
  };

  const handleEditAchievement = (achievement) => {
    setEditingAchievement(achievement);
    setShowEditAchievement(true);
  };

  const handleUpdateAchievement = async (achievementId, achievementData) => {
    try {
      const { data } = await api.put(`/achievements/${achievementId}`, achievementData);
      setAchievements(achievements.map(a => a._id === achievementId ? data : a).sort((a, b) => a.requiredPoints - b.requiredPoints));
      setShowEditAchievement(false);
      setEditingAchievement(null);
      toast.success('Achievement updated!');
    } catch (error) {
      toast.error('Failed to update achievement');
    }
  };

  const handleDeleteAchievement = async (achievementId) => {
    try {
      await api.delete(`/achievements/${achievementId}`);
      setAchievements(achievements.filter(a => a._id !== achievementId));
      toast.success('Achievement deleted!');
    } catch (error) {
      toast.error('Failed to delete achievement');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <div className="level-badge animate-pulse" style={{ margin: '0 auto', marginBottom: '1rem' }}>
            ⚔️
          </div>
          <p style={{ color: 'var(--neon-cyan)' }}>Loading your adventure...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'quests', label: 'Quests', icon: Swords },
    { id: 'penalties', label: 'Penalties', icon: Skull },
    { id: 'achievements', label: 'Rewards', icon: Trophy },
    { id: 'history', label: 'History', icon: Clock }
  ];

  return (
    <div className="app">
      <Header />

      <main className="page">
        <div className="container">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-content">
              <div className="welcome-text">
                <h1>Welcome back, {user?.username}! 🚀</h1>
                <p>Ready to level up? You're currently a <strong>{user?.title}</strong> at Level {user?.level}</p>
              </div>
              <div className="welcome-stats">
                <div className="welcome-stat">
                  <span className="stat-number">{user?.totalPoints?.toLocaleString()}</span>
                  <span className="stat-text">Total XP</span>
                </div>
                <div className="welcome-stat">
                  <span className="stat-number">{user?.dayStreak || 0}</span>
                  <span className="stat-text">Day Streak</span>
                </div>
              </div>
            </div>
          </div>

          <StatsPanel stats={stats} user={user} />

          <div className="nav mt-lg mb-lg">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent size={16} style={{ marginRight: '0.5rem' }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === 'quests' && (
            <QuestList
              quests={quests}
              onComplete={handleCompleteQuest}
              onDelete={handleDeleteQuest}
              onAdd={() => setShowAddQuest(true)}
            />
          )}

          {activeTab === 'penalties' && (
            <PenaltyList
              penalties={penalties}
              onTrigger={handleTriggerPenalty}
              onDelete={handleDeletePenalty}
              onAdd={() => setShowAddPenalty(true)}
            />
          )}

          {activeTab === 'achievements' && (
            <AchievementGrid
              achievements={achievements}
              onClaim={handleClaimAchievement}
              onAdd={() => setShowAddAchievement(true)}
              onEdit={handleEditAchievement}
              onDelete={handleDeleteAchievement}
            />
          )}

          {activeTab === 'history' && (
            <HistoryPanel history={stats?.recentHistory || []} />
          )}
        </div>
      </main>

      {/* Modals */}
      {showAddQuest && (
        <AddQuestModal
          onClose={() => setShowAddQuest(false)}
          onSubmit={handleAddQuest}
        />
      )}

      {showAddPenalty && (
        <AddPenaltyModal
          onClose={() => setShowAddPenalty(false)}
          onSubmit={handleAddPenalty}
        />
      )}

      {showAddAchievement && (
        <AddAchievementModal
          onClose={() => setShowAddAchievement(false)}
          onSubmit={handleAddAchievement}
        />
      )}

      {showEditAchievement && editingAchievement && (
        <EditAchievementModal
          achievement={editingAchievement}
          onClose={() => {
            setShowEditAchievement(false);
            setEditingAchievement(null);
          }}
          onSubmit={handleUpdateAchievement}
        />
      )}

      {/* Level Up Animation */}
      {levelUp && (
        <LevelUpAnimation
          level={levelUp}
          onComplete={() => setLevelUp(null)}
        />
      )}
    </div>
  );
};

export default Home;
