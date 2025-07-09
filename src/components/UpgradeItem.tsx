interface Props {
  name: string;
  level: number;
  cost: number;
  max: number;
  canBuy: boolean;
  onBuy: () => void;
}

const UpgradeItem = ({ name, level, cost, max, canBuy, onBuy }: Props) => {
  return (
    <div className='upgrade-item'>
      <h3>{name}</h3>
      <p>Niveau : {level}/{max}</p>
      <p>Coût : {cost} ✦</p>
      <button disabled={!canBuy} onClick={onBuy}>
        Acheter
      </button>
    </div>
  );
};

export default UpgradeItem;