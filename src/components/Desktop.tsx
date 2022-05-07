import { useAppSelector } from '../app/hooks';
import { selectAppsIds } from '../slices/appsSlice';
import Application from './Application';

const Desktop = (): JSX.Element => {
  const appIds = useAppSelector(selectAppsIds);

  return (
    <div
      className={[
        'bg-[url("./assets/images/wallpaper.jpg")] bg-cover bg-center',
        'grow p-2 relative flex flex-wrap items-start justify-start gap-2',
      ].join(' ')}
    >
      {
        appIds.map(
          (id) => (
            <Application
              key={id}
              appId={+id}
            />
          ),
        )
      }
    </div>
  );
};

export default Desktop;
