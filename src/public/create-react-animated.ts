declare module 'react-animated-numbers' {
    import { ComponentType } from 'react';
  
    interface Config {
      mass?: number;
      tension?: number;
      friction?: number;
    }
  
    interface AnimatedNumbersProps {
      animateToNumber: number;
      locale?: string;
      configs?: (num: number, index: number) => Config;
      className?: string;
      includeComma?: boolean; // Optional, if relevant to your use case
    }
  
    const AnimatedNumbers: ComponentType<AnimatedNumbersProps>;
    export default AnimatedNumbers;
  }
  