import { useEffect, useRef, useState } from "react";

const useCPS = () => {
  const [cps, setCps] = useState(0);
  const clickCountRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  const registerClick = () => {
    clickCountRef.current += 1;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - lastTimeRef.current) / 1000;

      if (elapsed > 0) {
        setCps(clickCountRef.current / elapsed);
      }

      clickCountRef.current = 0;
      lastTimeRef.current = now;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { cps, registerClick };
};

export default useCPS;