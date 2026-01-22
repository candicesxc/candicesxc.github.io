import { useEffect, useState } from 'react';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);

      if (Math.random() < 0.1) { // Create sparkles occasionally
         const newSparkle = {
           id: Date.now() + Math.random(),
           x: e.clientX + (Math.random() - 0.5) * 20,
           y: e.clientY + (Math.random() - 0.5) * 20,
           scale: 0.5 + Math.random() * 0.5,
           color: Math.random() > 0.5 ? '#003049' : '#c1121f'
         };
         setSparkles(prev => [...prev.slice(-20), newSparkle]); // Keep last 20
      }
    };

    const onMouseLeave = () => setVisible(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Clean up old sparkles
    const interval = setInterval(() => {
        setSparkles(prev => prev.filter(s => Date.now() - s.id < 1000));
    }, 100);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div 
        className="fixed pointer-events-none z-[9999] text-3xl text-primary transition-opacity duration-150 ease-out transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: position.x, 
          top: position.y,
          opacity: visible ? 1 : 0
        }}
      >
        ✿
      </div>
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-[9998] rounded-full animate-ping-slow"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: '8px',
            height: '8px',
            backgroundColor: sparkle.color,
            transform: `scale(${sparkle.scale})`,
            opacity: 0.6
          }}
        />
      ))}
    </>
  );
}
