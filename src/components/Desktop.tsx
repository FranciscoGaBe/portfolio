import { useAppSelector } from '../app/hooks';
import { selectAppsIds } from '../slices/appsSlice';
import Application from './Application';

const Desktop = (): JSX.Element => {
  const appIds = useAppSelector(selectAppsIds);

  return (
    <div
      className="grow bg-[url('./assets/images/wallpaper.jpg')] bg-cover bg-center p-2 relative"
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
