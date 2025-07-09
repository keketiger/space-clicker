import { useEffect, useState } from 'react';
import './App.css';
import useCPS from './hooks/useCPS';
import StarLogo from './components/StarLogo';
import UpgradePanel from './components/UpgradePanel';

interface SaveData {
  stars?: number;
  autoClickLevel?: number;
  clickPowerLevel?: number;
}

function App() {
  const loadSave = (): SaveData => {
    try {
      const saved = localStorage.getItem('savegame');
      if (!saved) return {};
      return JSON.parse(saved);
    } catch {
      return {};
    }
  };

  const [stars, setStars] = useState(() => loadSave().stars || 0);
  const [autoClickLevel, setAutoClickLevel] = useState(() => loadSave().autoClickLevel || 0);
  const [clickPowerLevel, setClickPowerLevel] = useState(() => loadSave().clickPowerLevel || 0);

  const { cps, registerClick } = useCPS();

  const handleStarClick = () => {
    const clickValue = 1 + clickPowerLevel;
    setStars(prev => prev + clickValue);
    registerClick();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStars(prev => prev + autoClickLevel);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoClickLevel]);

  useEffect(() => {
    const save = {
      stars,
      autoClickLevel,
      clickPowerLevel
    };
    localStorage.setItem('savegame', JSON.stringify(save));
  }, [stars, autoClickLevel, clickPowerLevel]);

  return (
    <div className='container'>
      <div className="space-container">
        <div className="space-clicker-render no-select">
          <StarLogo onClick={handleStarClick} />
          <h1>{stars} ✦</h1>
          <h4>{(cps + autoClickLevel).toFixed(2)} clics/sec</h4>
        </div>
      </div>
      <UpgradePanel
        stars={stars}
        setStars={setStars}
        autoClickLevel={autoClickLevel}
        setAutoClickLevel={setAutoClickLevel}
        clickPowerLevel={clickPowerLevel}
        setClickPowerLevel={setClickPowerLevel}
      />
    </div>
  );
}

export default App;