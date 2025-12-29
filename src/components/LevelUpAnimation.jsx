import { useEffect } from 'react';

const LevelUpAnimation = ({ level, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const titles = {
    1: 'Novice Hunter',
    2: 'Awakened One',
    3: 'E-Rank Hunter',
    4: 'D-Rank Hunter',
    5: 'C-Rank Hunter',
    6: 'B-Rank Hunter',
    7: 'A-Rank Hunter',
    8: 'S-Rank Hunter',
    9: 'National Level Hunter',
    10: 'Shadow Monarch'
  };

  return (
    <div className="level-up-overlay" onClick={onComplete}>
      <div className="level-up-text">LEVEL UP!</div>
      <div className="level-up-level">{level}</div>
      <div style={{
        fontFamily: 'var(--font-main)',
        fontSize: '1.5rem',
        color: 'var(--neon-cyan)',
        marginTop: '1rem',
        animation: 'float 2s ease-in-out infinite'
      }}>
        {titles[level] || 'Hunter'}
      </div>
      <div style={{
        marginTop: '2rem',
        color: 'rgba(255,255,255,0.5)',
        fontSize: '0.9rem'
      }}>
        Click anywhere to continue
      </div>
    </div>
  );
};

export default LevelUpAnimation;
