import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faExternalLink,
  faRotateRight,
  faWindowMaximize, faWindowMinimize, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
  MouseEventHandler,
  PropsWithChildren, useEffect, useState,
} from 'react';
import { IApplication } from './Application';

interface Props {
  app: IApplication,
  taskbarButtonElement: HTMLElement,
  show: boolean,
  open: boolean,
  setShow: (show: boolean) => void,
  setOpen: (open: boolean) => void
}

type AnimationWrapperProps = PropsWithChildren<Pick<Props, 'taskbarButtonElement' | 'show' | 'open'>>

const getElementData = (button: HTMLElement) => {
  const {
    left, top, width, height,
  } = button.getBoundingClientRect();
  return {
    left, top, width, height,
  };
};

const variants: Variants = {
  initial: ({ el }: { el: HTMLElement }) => ({
    ...getElementData(el),
    opacity: 0,
    position: 'fixed',
  }),
  animate: ({ show, el }: { el: HTMLElement, show: boolean }) => (
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
        ...getElementData(el),
        opacity: 0,
        position: 'fixed',
      }
  ),
};

const AnimationWrapper = ({
  open, show, taskbarButtonElement, children,
}: PropsWithChildren<AnimationWrapperProps>): JSX.Element => (
  <AnimatePresence>
    { open && (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="absolute inset-0 pointer-events-none"
    >
      { taskbarButtonElement && (
        <motion.div
          variants={variants}
          custom={{ el: taskbarButtonElement, show }}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="bg-neutral-700 pointer-events-auto flex flex-col"
        >
          { children }
        </motion.div>
      ) }
    </motion.div>
    ) }
  </AnimatePresence>
);

const Window = ({
  app, taskbarButtonElement, show, open, setShow, setOpen,
}: Props): JSX.Element => {
  const [reload, setReload] = useState(false);

  const appButtons = [
    { icon: faWindowMinimize, onClick: () => setShow(false) },
    { icon: faWindowMaximize, onClick: () => setShow(true) },
    { icon: faXmark, onClick: () => setOpen(false) },
  ].map((button, index) => ({ ...button, id: index + 1 }));

  const url = new URL(app.url);

  const selectText: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.currentTarget as HTMLInputElement;
    const range = document.createRange();
    const sel = window.getSelection();
    target.focus();
    range.selectNodeContents(target);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  useEffect(() => {
    setReload(false);
  }, [reload]);

  return (
    <AnimationWrapper open={open} show={show} taskbarButtonElement={taskbarButtonElement}>
      <div className="shrink-0 text-white flex bg-rose-800 h-9 pl-2">
        <div className="shrink-0 text-sm flex relative">
          <div className="w-2 top-0 bottom-0 -left-2 bg-neutral-700 absolute">
            <div className="w-full h-full bg-rose-800 rounded-br-2xl" />
          </div>
          <div
            className="h-full w-44 flex items-center justify-center rounded-t-xl bg-neutral-700"
          >
            { app.name }
          </div>
          <div className="w-2 top-0 bottom-0 -right-2 bg-neutral-700 absolute">
            <div className="w-full h-full bg-rose-800 rounded-bl-2xl" />
          </div>
        </div>
        <div className="ml-auto shrink-0">
          {
            appButtons.map((button) => (
              <button
                key={button.id}
                className={[
                  'default-hover-10',
                  'h-full text-lg w-10 last:text-xl',
                  'last:hover:bg-red-600',
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
      <div
        className={[
          'shrink-0 h-9 bg-neutral-700 text-white px-2 py-1',
          'border-b border-white/20 flex items-center',
        ].join(' ')}
      >
        <div className="shrink-0">
          <button
            type="button"
            className="default-hover-10 w-7 h-7 rounded-full"
            onClick={() => setReload(true)}
          >
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
        <div className="grow px-2 text-sm h-full">
          <div
            className="rounded-full h-full bg-neutral-800"
          >
            <div
              role="textbox"
              tabIndex={0}
              className={[
                'default-hover-5 w-full h-full rounded-full px-4',
                'cursor-text flex items-center',
                'border-2 border-transparent focus:border-blue-400',
              ].join(' ')}
              onClick={selectText}
              onKeyDown={() => undefined}
            >
              <div>
                <span>{ url.hostname }</span>
                <span className="text-neutral-400">
                  { url.port && (
                  <>
                    <span>:</span>
                    <span>{ url.port }</span>
                  </>
                  )}
                  { url.pathname && <span>{ url.pathname }</span>}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-1">
          <a
            href={app.url}
            target="_blank"
            className="default-hover-10 w-7 h-7 rounded-full flex items-center justify-center"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faExternalLink} />
          </a>
          { app.githubUrl && (
            <a
              href={app.githubUrl}
              target="_blank"
              className="default-hover-10 w-7 h-7 rounded-full flex items-center justify-center"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          ) }
        </div>
      </div>
      { !reload && (
        <div className="grow overflow-hidden">
          <iframe
            className="h-[calc(100vh-7rem)] w-screen"
            title={app.name}
            src={app.url}
          />
        </div>
      ) }
    </AnimationWrapper>
  );
};

export default Window;
