declare module './Galaxy' {
  import { FC } from 'react';
  
  interface GalaxyProps {
    focal?: [number, number];
    rotation?: [number, number];
    starSpeed?: number;
    density?: number;
    hueShift?: number;
    disableAnimation?: boolean;
    speed?: number;
    mouseInteraction?: boolean;
    glowIntensity?: number;
    saturation?: number;
    mouseRepulsion?: boolean;
    twinkleIntensity?: number;
    rotationSpeed?: number;
    repulsionStrength?: number;
    autoCenterRepulsion?: number;
    transparent?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }
  
  const Galaxy: FC<GalaxyProps>;
  export default Galaxy;
}

declare module './Lightfall' {
  import { FC } from 'react';
  
  interface LightfallProps {
    colors?: string[];
    backgroundColor?: string;
    speed?: number;
    streakCount?: number;
    streakWidth?: number;
    streakLength?: number;
    glow?: number;
    density?: number;
    twinkle?: number;
    zoom?: number;
    backgroundGlow?: number;
    opacity?: number;
    mouseInteraction?: boolean;
    mouseStrength?: number;
    mouseRadius?: number;
    mouseDampening?: number;
    mixBlendMode?: string;
    paused?: boolean;
    dpr?: number;
    className?: string;
  }
  
  const Lightfall: FC<LightfallProps>;
  export default Lightfall;
}

declare module './RotatingText' {
  import { ForwardRefExoticComponent, RefAttributes } from 'react';
  import { CSSProperties, ReactNode } from 'react';

  interface RotatingTextProps {
    texts: string[];
    rotationInterval?: number;
    initial?: { y?: string | number; opacity?: number };
    animate?: { y?: string | number; opacity?: number };
    exit?: { y?: string | number; opacity?: number };
    animatePresenceMode?: string;
    animatePresenceInitial?: boolean;
    staggerDuration?: number;
    staggerFrom?: string | number;
    transition?: { type?: string; damping?: number; stiffness?: number; [key: string]: any };
    loop?: boolean;
    auto?: boolean;
    splitBy?: string;
    onNext?: (index: number) => void;
    mainClassName?: string;
    splitLevelClassName?: string;
    elementLevelClassName?: string;
  }

  const RotatingText: ForwardRefExoticComponent<RotatingTextProps & RefAttributes<unknown>>;
  export default RotatingText;
}

declare module '../effects/RotatingText' {
  export { default } from './RotatingText';
}

declare module '../components/effects/RotatingText' {
  export { default } from './RotatingText';
}

declare module '@/components/effects/RotatingText' {
  export { default } from './RotatingText';
}
