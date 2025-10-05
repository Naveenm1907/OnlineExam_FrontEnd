import React from 'react';
import Lottie from 'lottie-react';
import timerAnimation from '../assets/Kick ass timer Vitay.json';

interface AnimatedTimerProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

export default function AnimatedTimer({ className, style, size = 32 }: AnimatedTimerProps) {
  return (
    <div className={className} style={style}>
      <Lottie
        animationData={timerAnimation}
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