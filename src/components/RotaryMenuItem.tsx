import { motion, useMotionValue, useTransform } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface Props {
  radius: number,
  rotation: number
}

const RotaryMenuItem = ({
  radius, rotation, children,
}: PropsWithChildren<Props>): JSX.Element => {
  const rotate = useMotionValue(0);
  const negativeRotate = useTransform(rotate, (val) => -val);
  const delta = useTransform(rotate, (val) => {
    const rot360 = (val < 0 ? (360 + val) : val) % 360;
    return ((90 - Math.abs(90 - (rot360 % 180))) / 90) * (rot360 < 180 ? 1 : -1);
  });
  const scale = useTransform(delta, (d) => (0.7 * (radius / 600)) * d + 1);
  const y = useTransform(delta, (d) => 15 * (radius / 100) * d);

  return (
    (
      <motion.div
        style={{
          rotateY: rotate,
          left: -radius,
          y,
          transformOrigin: `${radius}px 50%`,
          transformStyle: 'preserve-3d',
          scale,
        }}
        animate={{ rotateY: rotation }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
        className="absolute pointer-events-none"
      >
        <motion.div
          className="flex items-center justify-start"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            style={{ rotateY: negativeRotate }}
            animate={{
              originX: '50%',
              originY: '50%',
            }}
            className="flex items-center justify-center absolute"
          >
            { children }
          </motion.div>
        </motion.div>
      </motion.div>
    )
  );
};

export default RotaryMenuItem;
