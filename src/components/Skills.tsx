import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import SkillsClosed from './SkillsClosed';
import SkillsPDF from './SkillsPDF';

const Skills = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 h-9 bg-white dark:bg-main">
        <div className="h-full dark:bg-black/40" />
      </div>
      <div className="grow overflow-hidden relative bg-gray-200 dark:bg-neutral-700">
        <AnimatePresence>
          { !open && (
            <motion.div
              initial={{ position: 'absolute', inset: 0 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              <SkillsClosed setOpen={setOpen} />
            </motion.div>
          ) }
        </AnimatePresence>
        { open && <SkillsPDF /> }
      </div>
    </div>
  );
};

export default Skills;
