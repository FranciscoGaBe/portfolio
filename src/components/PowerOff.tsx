import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const PowerOff = (): JSX.Element => {
  useEffect(() => {
    const timeout = window.setTimeout(() => window.close(), 5000);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-main select-none"
    >
      <div className="bg-black/30 w-full h-full flex items-center justify-center flex-col">
        <div className="text-white text-9xl animate-spin mb-4">
          <FontAwesomeIcon icon={faSpinner} />
        </div>
        <p className="text-white text-4xl md:text-6xl font-bold p-2">
          Powering Off
        </p>
      </div>
    </motion.div>
  );
};
export default PowerOff;
