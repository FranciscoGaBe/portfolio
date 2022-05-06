import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const messageTime = 3000;
const messages = [
  'Welcome',
  'We are making sure everything is ready',
  'It may take a few seconds...',
];

const WelcomeScreen: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  const skipScreen = () => {
    setShow(false);
  };

  useEffect(() => {
    if (!show) return () => undefined;
    if (index >= messages.length) {
      skipScreen();
      return () => undefined;
    }
    const timeout = window.setTimeout(() => setIndex(index + 1), messageTime);
    return () => { window.clearTimeout(timeout); };
  }, [index, show]);

  return (
    <AnimatePresence>
      { show && (
      <motion.div
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-rose-800 flex items-center justify-center"
      >
        <AnimatePresence exitBeforeEnter>
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="text-white text-4xl md:text-6xl font-bold p-2"
          >
            { messages[index] }
          </motion.p>
        </AnimatePresence>
        <div className="absolute top-0 right-0">
          <button
            className="px-4 py-2 text-white font-semibold text-xl"
            type="button"
            onClick={skipScreen}
          >
            Skip
          </button>
        </div>
      </motion.div>
      ) }
    </AnimatePresence>
  );
};

export default WelcomeScreen;