import { useEffect, useRef, useState } from 'react';
import starImage from '../assets/star-shine.svg';
import '../App.css';
import FallingStar from './FallingStar';

interface Props {
  onClick: () => void;
}

interface Star {
  id: string;
  x: number;
  y: number;
}

const StarLogo = ({ onClick }: Props) => {
  const [isShrinking, setIsShrinking] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [stars, setStars] = useState<Star[]>([]);
  const requestRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      setRotation((prev) => (prev + (delta * 360) / 20000) % 360);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    onClick();
    setIsShrinking(true);
    setTimeout(() => setIsShrinking(false), 150);

    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const clickX = e.clientX - bounds.left;
    const clickY = e.clientY - bounds.top;

    const id = Math.random().toString(36).slice(2, 11);
    setStars((prev) => [...prev, { id, x: clickX, y: clickY }]);
  };

  const removeStar = (id: string) => {
    setStars((prev) => prev.filter((s) => s.id !== id));
  };

  const transform = `rotate(${rotation}deg) ${isShrinking ? 'scale(0.9)' : 'scale(1)'}`;

  return (
    <div ref={containerRef} className='star-wrapper'>
      <img
        src={starImage}
        className='logo'
        alt='Star logo'
        draggable={false}
        onMouseDown={handleClick}
        style={{
          transform,
          transition: 'transform 150ms ease',
        }}
      />
      {stars.map((s) => (
        <FallingStar key={s.id} id={s.id} x={s.x} y={s.y} onRemove={removeStar} />
      ))}
    </div>
  );
};

export default StarLogo;