import React from 'react';
import Lottie from 'lottie-react';
import growthAnimation from '../assets/Growth Chart.json';

interface AnimatedGrowthProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

export default function AnimatedGrowth({ className, style, size = 32 }: AnimatedGrowthProps) {
  return (
    <div className={className} style={style}>
      <Lottie
        animationData={growthAnimation}
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