import { useState, useEffect } from 'react';
import skeletonGif from '../assets/skeleton.gif';

const FloatingSkeleton = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const size = 64;

  const moveImage = () => {
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    const newRotation = Math.random() * 360;

    setPosition({ x: newX, y: newY });
    setRotation(newRotation);
    
    const delay = 8000 + Math.random() * 4000;
    return setTimeout(moveImage, delay); // Return timeout ID for cleanup
  };

  useEffect(() => {
    const timeoutId = moveImage();
    return () => clearTimeout(timeoutId);
  }, [size]);

  const handleHover = () => {
    setIsHovered(true);
    moveImage(); // Scramble immediately on hover
    
    // Flash red for 300ms then return to normal
    const timer = setTimeout(() => setIsHovered(false), 300);
    return () => clearTimeout(timer);
  };

  return (
    <img 
      src={skeletonGif}
      alt="Floating Skeleton"
      className="fixed z-10 transition-all duration-1000 ease-in-out cursor-pointer"
      style={{
        width: size,
        height: size,
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        filter: isHovered ? 'brightness(1.5) sepia(1) saturate(5) hue-rotate(-50deg)' : 'none',
        transition: `
          transform 1000ms ease-in-out, 
          filter 150ms cubic-bezier(0.4, 0, 0.2, 1)
        `,
        pointerEvents: 'auto'
      }}
      onMouseEnter={handleHover}
    />
  );
};

export default FloatingSkeleton;