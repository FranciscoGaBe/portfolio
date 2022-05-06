import { faChessBoard, faShop } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Application, { IApplication } from './Application';

interface Props {
  taskbarIconsElement: HTMLElement
}

const apps: IApplication[] = [
  {
    name: 'WFG', icon: faChessBoard, url: 'https://franciscogabe.github.io/wfg/', githubUrl: 'https://github.com/FranciscoGaBe/wfg',
  },
  {
    name: 'Shop', icon: faShop, url: 'https://franciscogabe.github.io/shop/', githubUrl: 'https://github.com/FranciscoGaBe/shop',
  },
];

const Desktop = ({ taskbarIconsElement }: Props): JSX.Element => {
  const [desktopElement, setDesktopElement] = useState<HTMLElement | null>(null);

  return (
    <div
      ref={setDesktopElement}
      className="grow bg-[url('./assets/images/wallpaper.jpg')] bg-cover bg-center p-2 relative"
    >
      {
        desktopElement && apps.map(
          (app) => (
            <Application
              key={app.name}
              app={app}
              desktopElement={desktopElement}
              taskbarIconsElement={taskbarIconsElement}
            />
          ),
        )
      }
    </div>
  );
};

export default Desktop;
