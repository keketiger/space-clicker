import { useEffect, useRef } from 'react';
import starImg from '../assets/star-fall.svg';

interface Props {
  id: string;
  x: number;
  y: number;
  onRemove: (id: string) => void;
}

const FallingStar = ({ id, x, y, onRemove }: Props) => {
  const starRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onRemove(id);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [id, onRemove]);
  

  return (
    <img
      ref={starRef}
      src={starImg}
      alt='falling star'
      className='falling-star'
      style={{
        left: x,
        top: y
      }}
    />
  );
};

export default FallingStar;