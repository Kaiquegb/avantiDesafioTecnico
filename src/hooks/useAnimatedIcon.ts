import { useState, useEffect } from 'react';

export function useAnimatedIcon(interval = 8000, duration = 2000) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), duration);
    }, interval);
    
    return () => clearInterval(animationInterval);
  }, [interval, duration]);

  return animate;
}