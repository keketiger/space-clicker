import UpgradeItem from './UpgradeItem';

interface Props {
  stars: number;
  setStars: React.Dispatch<React.SetStateAction<number>>;
  autoClickLevel: number;
  setAutoClickLevel: React.Dispatch<React.SetStateAction<number>>;
  clickPowerLevel: number;
  setClickPowerLevel: React.Dispatch<React.SetStateAction<number>>;
}

const UpgradePanel = ({
  stars,
  setStars,
  autoClickLevel,
  setAutoClickLevel,
  clickPowerLevel,
  setClickPowerLevel
}: Props) => {
  // Auto Clicker
  const maxAutoLevel = 100;
  const baseAutoCost = 100;
  const autoCost = Math.floor(baseAutoCost * Math.pow(1.15, autoClickLevel));
  const canUpgradeAuto = stars >= autoCost && autoClickLevel < maxAutoLevel;

  const handleUpgradeAuto = () => {
    if (canUpgradeAuto) {
      setStars(prev => prev - autoCost);
      setAutoClickLevel(prev => prev + 1);
    }
  };

  // Click Power
  const maxClickPower = 100;
  const baseClickCost = 50;
  const clickPowerCost = Math.floor(baseClickCost * Math.pow(1.25, clickPowerLevel));
  const canUpgradeClickPower = stars >= clickPowerCost && clickPowerLevel < maxClickPower;

  const handleUpgradeClickPower = () => {
    if (canUpgradeClickPower) {
      setStars(prev => prev - clickPowerCost);
      setClickPowerLevel(prev => prev + 1);
    }
  };

  const resetGame = () => {
    localStorage.removeItem('savegame');
    setStars(0);
    setAutoClickLevel(0);
    setClickPowerLevel(0);
  };

  return (
    <div className='upgrade-container no-select'>
      <h1>Améliorations</h1>

      <UpgradeItem
        name='Auto Clicker'
        level={autoClickLevel}
        cost={autoCost}
        max={maxAutoLevel}
        onBuy={handleUpgradeAuto}
        canBuy={canUpgradeAuto}
      />

      <UpgradeItem
        name='Multiplicateur de clic'
        level={clickPowerLevel}
        cost={clickPowerCost}
        max={maxClickPower}
        onBuy={handleUpgradeClickPower}
        canBuy={canUpgradeClickPower}
      />

      <button onClick={resetGame}>Réinitialiser la partie</button>
    </div>
  );
};

export default UpgradePanel;