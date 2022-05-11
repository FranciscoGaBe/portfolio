import { useRef } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectApps } from '../slices/appsSlice';
import { selectActiveBackground } from '../slices/settingsSlice';
import Application from './Application';

const Desktop = (): JSX.Element => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const background = useAppSelector(selectActiveBackground);
  const apps = useAppSelector(selectApps);
  const firstColumn = apps.filter((app) => !app.column || (app.column === 'first'));
  const lastColumn = apps.filter((app) => (app.column === 'last'));

  return (
    <div
      ref={desktopRef}
      style={{ backgroundImage: `url(${background})` }}
      className="grow w-full bg-cover bg-center relative flex pb-4"
    >
      <div className="p-2 relative flex flex-wrap content-start flex-col gap-2">
        {
        firstColumn.map(
          (app) => (
            <Application
              key={app.id}
              app={app}
              desktopRef={desktopRef}
            />
          ),
        )
        }
      </div>
      <div className="p-2 relative flex flex-wrap content-start flex-col gap-2 ml-auto">
        {
        lastColumn.map(
          (app) => (
            <Application
              key={app.id}
              app={app}
              desktopRef={desktopRef}
            />
          ),
        )
        }
      </div>
    </div>
  );
};

export default Desktop;
