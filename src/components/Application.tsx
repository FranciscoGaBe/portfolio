import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { useAppDispatch } from '../app/hooks';
import {
  AppItem,
  ApplicationItem, ComponentItem, openApp, showApp,
} from '../slices/appsSlice';
import Window from './Window';

interface Props {
  app: AppItem,
  desktopRef: React.RefObject<HTMLElement>
}

const Application = ({ app, desktopRef }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openApp(app.id));
    dispatch(showApp(app.id));
  };

  return (
    <>
      { !app.hideIcon && (
        <>
          { app.type !== 'link' && (
            <button
              type="button"
              className={[
                'select-none text-white w-20 h-20',
                'border-2 border-transparent hover:border-white/20 hover:bg-white/10',
                '[filter:drop-shadow(2px_2px_black)]',
              ].join(' ')}
              title={app?.shortDesc}
              onClick={handleClick}
            >
              <FontAwesomeIcon className="text-4xl" icon={app.icon} />
              <p
                className="text-lg font-semibold mt-1"
              >
                { app.name }
              </p>
            </button>
          ) }
          { app.type === 'link' && (
            <a
              className={[
                'select-none text-white w-20 h-20 flex items-center justify-center flex-col',
                'border-2 border-transparent hover:border-white/20 hover:bg-white/10',
                '[filter:drop-shadow(2px_2px_black)]',
              ].join(' ')}
              title={app?.shortDesc}
              href={app.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="relative">
                <FontAwesomeIcon className="text-4xl" icon={app.icon} />
                <div
                  className={[
                    'absolute -bottom-1 -right-1 text-black bg-white w-5 h-5',
                    'flex items-center justify-center rounded',
                  ].join(' ')}
                >
                  <FontAwesomeIcon icon={faExternalLink} />
                </div>
              </span>
              <p
                className="text-lg font-semibold mt-1"
              >
                { app.name }
              </p>
            </a>
          ) }
        </>
      ) }
      {
        (app.type === 'app' || app.type === 'component')
        && desktopRef.current
        && ReactDOM.createPortal(
          <Window app={app as (ApplicationItem | ComponentItem)} />,
          desktopRef.current,
        )
      }
    </>
  );
};

export default Application;
