import {
  faGithub, faLinkedin, faWindows,
} from '@fortawesome/free-brands-svg-icons';
import { faBars, faCog, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useAppDispatch } from '../app/hooks';
import { LinkItem, openApp, showApp } from '../slices/appsSlice';
import apps, { powerOffId, settingsId } from '../utils/apps';

interface Props {
  containerRef: React.RefObject<HTMLElement>
}

interface CloseMenuProps {
  closeMenu: () => void
}

const itemClassName = 'transition-all duration-200 hover:bg-white/10 h-12 text-xl';

const SideMenu = ({ closeMenu }: CloseMenuProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hovering) {
      setShow(false);
      return () => undefined;
    }
    const timeout = window.setTimeout(() => setShow(true), 500);
    return () => window.clearTimeout(timeout);
  }, [hovering]);

  const launchApp = (app: string) => {
    dispatch(openApp(app));
    dispatch(showApp(app));
    closeMenu();
  };

  const buttons = [
    { icon: faLinkedin, title: 'Linkedin', link: 'https://www.linkedin.com/in/francisco-garrido-679084198/' },
    { icon: faGithub, title: 'Github', link: 'https://github.com/FranciscoGaBe' },
    {
      icon: faCog,
      title: 'Settings',
      onClick: () => launchApp(settingsId),
    },
    {
      icon: faPowerOff,
      title: 'Power Off',
      onClick: () => launchApp(powerOffId),
    },
  ];

  return (
    <div
      className="relative w-12 z-20"
      onMouseMove={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className={[
          'transition-all duration-200 h-full',
          'shrink-0 overflow-hidden',
          show ? 'dark:bg-main bg-neutral-300 w-60 shadow shadow-black' : 'w-12',
        ].join(' ')}
      >
        <div
          className={[
            'transition-all duration-200 h-full pt-1 flex flex-col',
            show ? 'dark:bg-black/40 bg-white/30' : '',
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
    </div>
  );
};

const MainMenu = ({ closeMenu }: CloseMenuProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const menuItems = [
    {
      title: 'Projects',
      elements: Object.values(apps).filter((app) => app.type === 'app' || app.type === 'link').map((app) => ({
        id: app.id,
        name: app.name,
        icon: app.icon,
        shortDesc: app.shortDesc,
        type: app.type,
        url: (app as LinkItem).url,
        onClick: () => {
          dispatch(openApp(app.id));
          dispatch(showApp(app.id));
          closeMenu();
        },
      })),
    },
  ];

  return (
    <motion.div
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, ease: 'easeOut', duration: 0.2 }}
      className="pl-2 py-4 flex flex-col gap-3 mb-20"
    >
      {
        menuItems.map((item) => (
          <div key={item.title} className="px-2">
            <div className="text-sm mb-2">{ item.title }</div>
            <div className="flex gap-1 flex-wrap w-[19rem]">
              {
                item.elements.map((element) => (
                  <div key={element.id} className="dark:bg-main bg-black/10">
                    { element.type !== 'link' && (
                      <button
                        type="button"
                        className={[
                          'transition-all duration-200 w-24 h-24 relative',
                          'hover:bg-white/20',
                        ].join(' ')}
                        title={`${element.name}: ${element.shortDesc}`}
                        onClick={element.onClick}
                      >
                        { element.icon && (
                        <FontAwesomeIcon className="text-3xl" icon={element.icon} />
                        ) }
                        <p
                          className="absolute top-1 left-1 flex items-center justify-center font-bold text-sm"
                        >
                          { element.name }
                        </p>
                        <p
                          className="absolute bottom-1 text-xs right-1 left-1 text-ellipsis whitespace-nowrap overflow-hidden"
                        >
                          { element.shortDesc }
                        </p>
                      </button>
                    ) }
                    { element.type === 'link' && (
                      <a
                        className={[
                          'transition-all duration-200 w-24 h-24 relative',
                          'hover:bg-white/20 flex items-center justify-center',
                        ].join(' ')}
                        title={`${element.name}: ${element.shortDesc}`}
                        href={element.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        { element.icon && (
                        <FontAwesomeIcon className="text-3xl" icon={element.icon} />
                        ) }
                        <p
                          className="absolute top-1 left-1 flex items-center justify-center font-bold text-sm"
                        >
                          { element.name }
                        </p>
                        <p
                          className="absolute bottom-1 text-xs right-1 left-1 text-ellipsis whitespace-nowrap overflow-hidden"
                        >
                          { element.shortDesc }
                        </p>
                      </a>
                    ) }
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </motion.div>
  );
};

const StartMenu = ({ containerRef }: Props): JSX.Element => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const clickOutside = (event: PointerEvent) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(event.target as Node)) return;
      setShow(false);
    };

    window.addEventListener('pointerdown', clickOutside);

    return () => {
      window.removeEventListener('pointerdown', () => clickOutside);
    };
  }, [containerRef]);

  const closeMenu = () => setShow(false);

  return (
    <div className="shrink-0 relative">
      {
        containerRef.current && ReactDOM.createPortal(
          <div className="left-0 top-0 absolute z-20">
            <AnimatePresence>
              { show && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
                className="bottom-0 left-0 absolute dark:bg-main bg-neutral-300 shadow-lg shadow-black"
              >
                <div className="h-full flex dark:bg-black/20">
                  <SideMenu closeMenu={closeMenu} />
                  <MainMenu closeMenu={closeMenu} />
                </div>
              </motion.div>
              ) }
            </AnimatePresence>
          </div>,
          containerRef.current,
        )
      }
      <div className={`h-full ${show ? 'bg-main' : ''}`}>
        <button
          className={[
            'transition-colors duration-200',
            'text-lg h-full w-12 hover:text-main',
            show ? 'dark:bg-black/20 bg-neutral-300' : 'dark:hover:bg-white/10 hover:bg-neutral-100',
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
