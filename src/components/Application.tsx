import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { openApp, selectApp, showApp } from '../slices/appsSlice';
import Window from './Window';

interface Props {
  appId: number
}

const Application = ({ appId }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const app = useAppSelector(selectApp(appId));

  const handleClick = () => {
    dispatch(openApp(appId));
    dispatch(showApp(appId));
  };

  return (
    <>
      <button
        type="button"
        className={[
          'default-hover-10 select-none text-white w-20 h-20',
          'border-2 border-transparent hover:border-white/20',
          '[filter:drop-shadow(2px_2px_black)]',
        ].join(' ')}
        title={app.shortDesc}
        onClick={handleClick}
      >
        <FontAwesomeIcon className="text-4xl" icon={app.icon} />
        <p
          className="text-lg font-semibold mt-1"
        >
          { app.name }
        </p>
      </button>
      <Window app={app} />
    </>
  );
};

export default Application;
