import { faChessBoard, faShop } from '@fortawesome/free-solid-svg-icons';
import { IApplication } from '../slices/appsSlice';

const apps: Record<string, IApplication> = [
  {
    name: 'WFG', icon: faChessBoard, url: 'https://franciscogabe.github.io/wfg/', githubUrl: 'https://github.com/FranciscoGaBe/wfg',
  },
  {
    name: 'Shop', icon: faShop, url: 'https://franciscogabe.github.io/shop/', githubUrl: 'https://github.com/FranciscoGaBe/shop',
  },
].reduce(
  (obj, app, index) => ({ ...obj, [index + 1]: { ...app, id: index + 1, open: false } }),
  {},
);

export default apps;
