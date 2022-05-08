import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../app/hooks';

const Settings = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div className="h-full bg-black">
      <motion.div
        animate={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="pointer-events-none absolute inset-0 bg-rose-800 flex items-center justify-center"
      >
        <FontAwesomeIcon className="text-white text-9xl" icon={faCog} />
      </motion.div>
    </div>
  );
};

export default Settings;
