import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  IApplication, selectActive, selectOpenApps, showApp,
} from '../slices/appsSlice';
import DayTime from './DayTime';
import StartMenu from './StartMenu';

const Taskbar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const openApps = useAppSelector(selectOpenApps);
  const active = useAppSelector(selectActive);

  const handleClick = (app: IApplication) => {
    const isActive = active === app.id;
    dispatch(showApp(isActive ? -1 : app.id));
  };

  return (
    <div ref={containerRef} className="shrink-0 relative">
      <div className="bg-rose-900 h-10 flex relative z-10">
        <StartMenu containerRef={containerRef} />
        <div className="grow px-4 flex">
          {
            openApps.map((app) => (
              <button
                key={app.id}
                id={`taskbar-app-${app.id}`}
                className={[
                  'default-hover-20',
                  'h-10 w-12 text-white text-2xl relative group',
                  'flex justify-center items-center',
                  active === app.id ? 'bg-white/10' : '',
                ].join(' ')}
                type="button"
                onClick={() => handleClick(app)}
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
            ))
          }
        </div>
        <DayTime />
      </div>
    </div>
  );
};

export default Taskbar;
