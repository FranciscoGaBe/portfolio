import {
  faGitAlt, faHtml5, faJs, faLaravel, faNodeJs, faPhp, faReact, faVuejs,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCode,
  faCodeBranch,
  faDatabase,
  faMicroscope,
  faPeopleGroup,
  faPowerOff,
  faPuzzlePiece,
  faUserCheck, faUserGraduate, faUserGroup, IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { closeApp } from '../slices/appsSlice';
import { skillsId } from '../utils/apps';
import RotaryMenu, { IRotaryMenuItem } from './RotaryMenu';

const Skill = ({
  selected,
  item,
}: {
  selected: boolean,
  item: { text: string, icon: IconDefinition, color: string }
}): JSX.Element => (
  <motion.div className="flex moon items-center justify-center w-16 h-16 text-4xl absolute">
    <div style={{ color: item.color }} className="relative z-30">
      { selected && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.35 }}
              className="absolute bottom-2 text-lg font-bold whitespace-nowrap [filter:drop-shadow(2px_2px_black)]"
            >
              { item.text }
            </motion.div>
          </AnimatePresence>
        </div>
      ) }
      <FontAwesomeIcon
        className="[filter:drop-shadow(1px_1px_black)]"
        icon={item.icon}
      />
    </div>
  </motion.div>
);

const Planet = (
  { selected, menu }:
  { selected: boolean, menu: { planet: string, title: string, items: IRotaryMenuItem[] } },
): JSX.Element => {
  const [extraClasses, setExtraClasses] = useState('');

  useEffect(() => {
    if (selected) {
      setExtraClasses('planet-front');
    } else {
      setTimeout(() => setExtraClasses(''), 300);
    }
  }, [selected]);

  return (
    <RotaryMenu
      items={menu.items}
      radius={170}
      offset={90}
      hideItems={!selected}
    >
      <div
        className={`w-44 h-44 flex items-center justify-center text-4xl font-bold planet ${menu.planet} ${extraClasses}`}
      >
        { selected && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.35 }}
              className="absolute bottom-0 text-3xl font-bold text-white [filter:drop-shadow(1px_1px_black)]"
            >
              { menu.title }
            </motion.div>
          </AnimatePresence>
        </div>
        ) }
      </div>
    </RotaryMenu>
  );
};

const CloseItem = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(closeApp(skillsId));
  };

  return (
    <button
      className="w-10 h-10 rounded-full bg-main text-white relative pointer-events-auto"
      type="button"
      onClick={handleClick}
    >
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div
          className="absolute bottom-0 text-lg font-bold whitespace-nowrap [filter:drop-shadow(2px_2px_black)]"
        >
          Close skills
        </div>
      </div>
      <FontAwesomeIcon icon={faPowerOff} />
    </button>
  );
};

const menus = [
  {
    title: 'Front End',
    planet: 'jupiter',
    items: [
      { icon: faReact, text: 'React / Redux', color: '#00D8FF' },
      { icon: faHtml5, text: 'HTML / CSS', color: '#DD4B25' },
      { icon: faJs, text: 'JavaScript', color: '#EFD81D' },
      { icon: faJs, text: 'TypeScript', color: '#2F72BC' },
      { icon: faVuejs, text: 'Vue / Vuex', color: '#3FB27F' },
    ],
  },
  {
    title: 'Soft skills',
    planet: 'saturn',
    items: [
      { icon: faPuzzlePiece, text: 'Problem Solving', color: '#F1911D' },
      { icon: faPeopleGroup, text: 'Collective property', color: '#3F3F41' },
      { icon: faUserGroup, text: 'Empathy', color: '#F76501' },
      { icon: faUserCheck, text: 'Independent', color: '#95001C' },
      { icon: faUserGraduate, text: 'Self motivated', color: '#F3AD22' },
    ],
  },
  {
    title: 'General',
    planet: 'earth',
    items: [
      { icon: faGitAlt, text: 'Git', color: '#D74A34' },
      { icon: faCodeBranch, text: 'CD / CI', color: '#5C8DBC' },
      { icon: faMicroscope, text: 'Jest / Cypress', color: '#BF3B16' },
      { icon: faCode, text: 'TDD / BDD', color: '#67A673' },
    ],
  },
  {
    title: 'Back End',
    planet: 'mars',
    items: [
      { icon: faNodeJs, text: 'Node.js / Express', color: '#539E43' },
      { icon: faDatabase, text: 'SQL / NoSQL', color: '#C07905' },
      { icon: faPhp, text: 'PHP', color: '#4D588E' },
      { icon: faLaravel, text: 'Laravel', color: '#F72C1F' },
    ],
  },
].map((menu) => ({
  ...menu,
  items: menu.items.map((item, index) => ({
    id: index + 1,
    element: ({ selected }: { selected: boolean }) => <Skill selected={selected} item={item} />,
  })),
}));

menus.splice(1, 0, {
  title: 'Misc',
  planet: 'uranus',
  items: [
    {
      id: 1,
      element: () => <CloseItem />,
    },
  ],
});

const items = menus.map((menu, index) => ({
  id: index + 1,
  element: ({ selected }: { selected: boolean }) => <Planet menu={menu} selected={selected} />,
}));

const SkillsOpen = (): JSX.Element => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="h-full flex justify-center items-start pt-52 md:pt-64 stars"
  >
    <RotaryMenu items={items} radius={1000} offset={90}>
      <div className="w-96 h-96 sun" />
    </RotaryMenu>
  </motion.div>
);

export default SkillsOpen;
