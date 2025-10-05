import React from 'react';
import Lottie from 'lottie-react';
import securityAnimation from '../assets/maintenance cyber security.json';

interface AnimatedSecurityProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

export default function AnimatedSecurity({ className, style, size = 32 }: AnimatedSecurityProps) {
  return (
    <div className={className} style={style}>
      <Lottie
        animationData={securityAnimation}
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