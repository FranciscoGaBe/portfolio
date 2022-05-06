import { faChessBoard } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import Application, { IApplication } from './Application';

interface Props {
  taskbarIcons: React.RefObject<HTMLElement>
}

const apps: IApplication[] = [
  { name: 'WFG', icon: faChessBoard },
];

const Desktop = ({ taskbarIcons }: Props): JSX.Element => {
  const desktopRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={desktopRef}
      className="grow bg-[url('./assets/images/wallpaper.jpg')] bg-cover bg-center p-2 relative"
    >
      {
        apps.map(
          (app) => (
            <Application
              key={app.name}
              app={app}
              desktopRef={desktopRef}
              taskbarIconsRef={taskbarIcons}
            />
          ),
        )
      }
    </div>
  );
};

export default Desktop;
