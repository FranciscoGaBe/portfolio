import { useRef } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectApps } from '../slices/appsSlice';
import { selectActiveBackground } from '../slices/settingsSlice';
import Application from './Application';

const Desktop = (): JSX.Element => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const apps = useAppSelector(selectApps);
  const background = useAppSelector(selectActiveBackground);

  return (
    <div
      ref={desktopRef}
      style={{ backgroundImage: `url(${background})` }}
      className="grow w-full bg-cover bg-center relative"
    >
      <div className="h-full p-2 relative inline-flex flex-wrap items-start flex-col justify-start gap-2">
        {
        apps.map(
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
