import { useRef } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectApps } from '../slices/appsSlice';
import Application from './Application';

const Desktop = (): JSX.Element => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const apps = useAppSelector(selectApps);

  return (
    <div
      ref={desktopRef}
      className="grow w-full bg-[url('./assets/images/wallpaper.jpg')] bg-cover bg-center"
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
