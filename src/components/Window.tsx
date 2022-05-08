import {
  faChevronDown, faWindowMaximize, faWindowMinimize, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { createElement, PropsWithChildren, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  closeApp, hideApp, selectActive, showApp, ApplicationItem, ComponentItem,
} from '../slices/appsSlice';
import components from '../utils/components';
import WindowApplication from './WindowApplication';

interface Props {
  app: ApplicationItem | ComponentItem
}

const getElementData = (selector: string) => {
  const element = document.querySelector(selector);
  if (!element) return {};
  const {
    left, top, width, height,
  } = element.getBoundingClientRect();
  return {
    left, top, width, height,
  };
};

const variants: Variants = {
  animate: ({ show, selector }: { selector: string, show: boolean }) => (
    show
      ? {
        left: 0,
        top: 0,
        opacity: 1,
        width: '100%',
        height: '100%',
        transitionEnd: { position: 'static' },
      }
      : {
        ...getElementData(selector),
        opacity: 0,
        position: 'fixed',
        pointerEvents: 'none',
      }
  ),
};

const AnimationWrapper = ({ app, children }: PropsWithChildren<Props>): JSX.Element => {
  const active = useAppSelector(selectActive);
  const show = active === app.id;

  return (
    <AnimatePresence>
      { app.open && (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none z-10"
      >
        <motion.div
          variants={variants}
          custom={{ selector: `#taskbar-app-${app.id}`, show }}
          initial={false}
          animate="animate"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="dark:bg-neutral-700 bg-white pointer-events-auto flex flex-col"
        >
          { children }
        </motion.div>
      </motion.div>
      ) }
    </AnimatePresence>
  );
};

const Window = ({ app }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const [showDescription, setShowDescription] = useState(false);
  const isApp = app.type === 'app';
  const close = () => dispatch(closeApp(app.id));

  const appButtons = [
    ...(app.desc
      ? [{ icon: faChevronDown, onClick: () => setShowDescription(!showDescription) }]
      : []
    ),
    { icon: faWindowMinimize, onClick: () => dispatch(hideApp(app.id)) },
    { icon: faWindowMaximize, onClick: () => dispatch(showApp(app.id)) },
    { icon: faXmark, onClick: close },
  ].map((button, index) => ({ ...button, id: index + 1 }));

  return (
    <AnimationWrapper app={app}>
      <div className="shrink-0 flex bg-main h-9 pl-2">
        { isApp && (
          <div className="shrink-0 text-sm flex relative">
            <div className="w-2 top-0 bottom-0 -left-2 dark:bg-neutral-700 bg-white absolute">
              <div className="w-full h-full bg-main rounded-br-2xl" />
            </div>
            <div
              className="h-full w-44 flex items-center rounded-t-xl dark:bg-neutral-700 bg-white pl-4 pr-2"
            >
              <span>{ app.name }</span>
              <button
                type="button"
                className="transition-all duration-200 dark:hover:bg-white/20 hover:bg-black/10 ml-auto w-5 h-5 rounded-full"
                onClick={close}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="w-2 top-0 bottom-0 -right-2 dark:bg-neutral-700 bg-white absolute">
              <div className="w-full h-full bg-main rounded-bl-2xl" />
            </div>
          </div>
        ) }
        { !isApp && (
          <div className="shrink-0 flex items-center px-4 text-white">
            { app.name }
          </div>
        ) }
        <div className="ml-auto shrink-0 h-full relative text-white">
          <div className="absolute bottom-0 left-0">
            <AnimatePresence>
              { showDescription && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                  className="absolute top-0 -right-12 dark:bg-neutral-800 bg-white text-black dark:text-white shadow-[0px_1px_2px_1px_black] p-4 w-56"
                >
                  { app.desc }
                </motion.div>
              ) }
            </AnimatePresence>
          </div>
          <div className="flex h-full">
            {
              appButtons.map((button) => (
                <button
                  key={button.id}
                  className={[
                    'trnasition-all duration-200 hover:bg-white/20',
                    'h-full w-12 first:text-sm last:text-xl',
                    'last:hover:bg-red-600',
                    showDescription ? 'first:bg-white/10' : '',
                  ].join(' ')}
                  type="button"
                  onClick={button.onClick}
                >
                  <FontAwesomeIcon icon={button.icon} />
                </button>
              ))
            }
          </div>
        </div>
      </div>
      { isApp && <WindowApplication app={app as ApplicationItem} />}
      { !isApp && (
        <div className="grow overflow-hidden">
          { createElement(components[app.id]) }
        </div>
      ) }
    </AnimationWrapper>
  );
};

export default Window;
