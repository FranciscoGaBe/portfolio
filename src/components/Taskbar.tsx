import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  AppItem, selectActive, selectOpenApps, showApp,
} from '../slices/appsSlice';
import DayTime from './DayTime';
import StartMenu from './StartMenu';

const Taskbar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const openApps = useAppSelector(selectOpenApps).filter(({ hideTaskbar }) => !hideTaskbar);
  const active = useAppSelector(selectActive);

  const handleClick = (app: AppItem) => {
    const isActive = active === app.id;
    dispatch(showApp(isActive ? -1 : app.id));
  };

  return (
    <div ref={containerRef} className="shrink-0 relative z-40">
      <div className="dark:bg-main bg-neutral-200 relative z-30">
        <div className="h-10 dark:bg-black/40 flex">
          <StartMenu containerRef={containerRef} />
          <div className="grow px-4 flex">
            {
            openApps.map((app) => (
              <button
                key={app.id}
                id={`taskbar-app-${app.id}`}
                className={[
                  'transition-all duration-200 group',
                  'h-10 w-12 text-2xl relative flex justify-center items-center',
                  'dark:hover:bg-white/20 hover:bg-white',
                  active === app.id ? 'dark:bg-white/10 bg-neutral-100' : '',
                ].join(' ')}
                type="button"
                onClick={() => handleClick(app)}
              >
                <FontAwesomeIcon icon={app.icon} />
                <div
                  className={[
                    'transition-all duration-200',
                    'absolute bottom-0 w-10 group-hover:w-12',
                    'border-b-2 dark:border-gray-400 border-main',
                  ].join(' ')}
                />
              </button>
            ))
          }
          </div>
          <DayTime />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
