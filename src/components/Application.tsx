import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from '../app/hooks';
import {
  AppItem,
  ApplicationItem, ComponentItem, openApp, showApp,
} from '../slices/appsSlice';
import Window from './Window';

interface Props {
  app: AppItem
}

const Application = ({ app }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openApp(app.id));
    dispatch(showApp(app.id));
  };

  return (
    <>
      { !app.hideIcon && (
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
      {
        (app.type === 'app' || app.type === 'component') && (
          <Window app={app as (ApplicationItem | ComponentItem)} />
        )
      }
    </>
  );
};

export default Application;
