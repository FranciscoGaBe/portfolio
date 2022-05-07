import {
  faGithub, faLinkedin, faWindows,
} from '@fortawesome/free-brands-svg-icons';
import { faBars, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PowerOff from './PowerOff';

interface Props {
  containerRef: React.RefObject<HTMLElement>
}

const itemClassName = 'default-hover-10 h-12 text-xl';

const SideMenu: React.FC = () => {
  const [show, setShow] = useState(false);
  const [powerOff, setPowerOff] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hovering) {
      setShow(false);
      return () => undefined;
    }
    const timeout = window.setTimeout(() => setShow(true), 500);
    return () => window.clearTimeout(timeout);
  }, [hovering]);

  const buttons = [
    { icon: faLinkedin, title: 'Linkedin', link: 'https://www.linkedin.com/in/francisco-garrido-679084198/' },
    { icon: faGithub, title: 'Github', link: 'https://github.com/FranciscoGaBe' },
    { icon: faPowerOff, title: 'Power Off', onClick: () => setPowerOff(true) },
  ];

  return (
    <>
      <div
        className="w-12 relative"
        onPointerMove={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <div
          className={[
            'transition-all duration-200 h-full',
            'shrink-0 w-12 flex flex-col pt-1 overflow-hidden',
            show ? 'bg-rose-900 w-60 shadow shadow-black' : 'bg-rose-800 w-12',
          ].join(' ')}
        >
          <div className={`${itemClassName} mb-auto`}>
            <button
              className="flex items-center"
              type="button"
              onClick={() => setShow(!show)}
            >
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faBars} />
              </div>
              <p className="text-base px-2 font-bold whitespace-nowrap">START</p>
            </button>
          </div>
          {
        buttons.map((button) => (
          <div key={button.title} className={itemClassName}>
            { button.link && (
            <a
              className="flex items-center"
              href={button.link}
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={button.icon} />
              </div>
              <p className="text-base px-2 whitespace-nowrap">{ button.title }</p>
            </a>
            ) }
            { button.onClick && (
            <button
              className="flex items-center"
              type="button"
              onClick={button.onClick}
            >
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={button.icon} />
              </div>
              <p className="text-base px-2 whitespace-nowrap">{ button.title }</p>
            </button>
            ) }
          </div>
        ))
      }
        </div>
      </div>
      { powerOff && ReactDOM.createPortal(<PowerOff />, document.querySelector('#root') as Element) }
    </>
  );
};

const menuItems = [
  {
    title: 'Productivity',
    elements: [
      { icon: '', onClick: () => undefined },
      { icon: '', onClick: () => undefined },
      { icon: '', onClick: () => undefined },
      { icon: '', onClick: () => undefined },
      { icon: '', onClick: () => undefined },
      { icon: '', onClick: () => undefined },
    ],
  },
  {
    title: 'Explore',
    elements: [
      { icon: '', onClick: () => undefined },
      { icon: '', onClick: () => undefined },
      { icon: '', onClick: () => undefined },
      { icon: '', onClick: () => undefined },
      { icon: '', onClick: () => undefined },
      { icon: '', onClick: () => undefined },
    ],
  },
].map(
  (item) => ({
    ...item,
    elements: item.elements.map(
      (element, index) => ({ ...element, id: index + 1 }),
    ),
  }),
);

const MainMenu: React.FC = () => (
  <motion.div
    initial={{ y: 10 }}
    animate={{ y: 0 }}
    transition={{ delay: 0.2, ease: 'easeOut', duration: 0.2 }}
    className="bg-rose-800 pl-2 py-4 flex flex-col gap-3 mb-20"
  >
    {
      menuItems.map((item) => (
        <div key={item.title} className="px-2">
          <div className="text-sm mb-2">{ item.title }</div>
          <div className="flex gap-1 flex-wrap w-[19rem]">
            {
              item.elements.map((element) => (
                <button
                  key={element.id}
                  type="button"
                  className="w-24 h-24 bg-white/10"
                >
                  &nbsp;
                </button>
              ))
            }
          </div>
        </div>
      ))
    }
  </motion.div>
);

const StartMenu = ({ containerRef }: Props): JSX.Element => {
  const [show, setShow] = useState(false);

  return (
    <div className="shrink-0 relative text-white">
      {
        containerRef.current && ReactDOM.createPortal(
          <div className="left-0 top-0 absolute text-white">
            <AnimatePresence>
              { show && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
                className="bottom-0 left-0 absolute bg-rose-800 shadow-lg shadow-black"
              >
                <div className="h-full flex">
                  <SideMenu />
                  <MainMenu />
                </div>
              </motion.div>
              ) }
            </AnimatePresence>
          </div>,
          containerRef.current,
        )
      }
      <div className="bg-rose-900 h-full">
        <button
          className={[
            'transition-colors duration-200',
            'text-lg h-full w-12',
            show ? 'bg-rose-800' : 'bg-rose-900 hover:bg-white/10 hover:text-rose-700',
          ].join(' ')}
          type="button"
          onClick={() => setShow(!show)}
        >
          <FontAwesomeIcon icon={faWindows} />
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
