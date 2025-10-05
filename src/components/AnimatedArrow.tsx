import React from 'react';
import Lottie from 'lottie-react';
import arrowAnimation from '../assets/Arrow.json';

interface AnimatedArrowProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export default function AnimatedArrow({ 
  className, 
  style, 
  size = 24, 
  direction = 'right' 
}: AnimatedArrowProps) {
  const getRotation = () => {
    switch (direction) {
      case 'left': return 'rotate-180';
      case 'up': return '-rotate-90';
      case 'down': return 'rotate-90';
      default: return '';
    }
  };

  return (
    <div className={`${className} ${getRotation()}`} style={style}>
      <Lottie
        animationData={arrowAnimation}
        loop={true}
        autoplay={true}
        style={{
          width: size,
          height: size,
        }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />
    </div>
  );
}