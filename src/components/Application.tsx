import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import Window from './Window';

export interface IApplication {
  name: string,
  icon: IconDefinition,
  url: string,
  githubUrl?: string
}

interface Props {
  app: IApplication,
  desktopElement: HTMLElement,
  taskbarIconsElement: HTMLElement
}

const Application = ({ app, desktopElement, taskbarIconsElement }: Props): JSX.Element => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [taskbarButtonElement, setTaskbarButtonElement] = useState<HTMLElement | null>(null);

  const handleClick = () => {
    setShow(true);
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        className={[
          'transition-colors duration-200',
          'select-none text-white w-20 h-20',
          'hover:bg-white/10 border-2 border-transparent hover:border-white/20',
        ].join(' ')}
        onClick={handleClick}
      >
        <FontAwesomeIcon className="text-4xl" icon={app.icon} />
        <p
          className="text-lg font-semibold [text-shadow:2px_2px_2px_black]"
        >
          { app.name }
        </p>
      </button>
      { ReactDOM.createPortal(
        <Window
          app={app}
          taskbarButtonElement={taskbarButtonElement as HTMLElement}
          open={open}
          show={show}
          setShow={setShow}
          setOpen={setOpen}
        />,
        desktopElement,
      ) }
      { open && ReactDOM.createPortal(
        (
          <button
            ref={setTaskbarButtonElement}
            className={[
              'transition-all duration-200',
              'h-10 w-12 text-white text-2xl relative group',
              'hover:bg-white/20 flex justify-center items-center',
              show ? 'bg-white/10' : '',
            ].join(' ')}
            type="button"
            onClick={() => setShow(!show)}
          >
            <FontAwesomeIcon icon={app.icon} />
            <div
              className={[
                'transition-all duration-200',
                'absolute bottom-0 w-10 group-hover:w-12',
                'border-b-2 border-gray-400',
              ].join(' ')}
            />
          </button>
        ),
        taskbarIconsElement,
      ) }
    </>
  );
};

export default Application;
