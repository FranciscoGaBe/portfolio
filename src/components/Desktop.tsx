import { useAppSelector } from '../app/hooks';
import { selectApps } from '../slices/appsSlice';
import Application from './Application';

const Desktop = (): JSX.Element => {
  const apps = useAppSelector(selectApps);

  return (
    <div
      className={[
        'bg-[url("./assets/images/wallpaper.jpg")] bg-cover bg-center',
        'grow p-2 relative flex flex-wrap items-start justify-start gap-2',
      ].join(' ')}
    >
      {
        apps.map(
          (app) => (
            <Application
              key={app.id}
              app={app}
            />
          ),
        )
      }
    </div>
  );
};

export default Desktop;
