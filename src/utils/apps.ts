import {
  faBook, faChessBoard, faFolderTree, faKeyboard, faPaste, faPencil, faShop,
} from '@fortawesome/free-solid-svg-icons';
import { IApplication } from '../slices/appsSlice';

const apps: Record<string, IApplication> = [
  {
    name: 'Dibujillo',
    icon: faPencil,
    url: 'https://dibujillo.herokuapp.com/',
    githubUrl: 'https://github.com/FranciscoGaBe/dibujillo',
  },
  {
    name: 'WFG',
    icon: faChessBoard,
    url: 'https://franciscogabe.github.io/wfg/',
    githubUrl: 'https://github.com/FranciscoGaBe/wfg',
  },
  {
    name: 'Shop',
    icon: faShop,
    url: 'https://franciscogabe.github.io/shop/',
    githubUrl: 'https://github.com/FranciscoGaBe/shop',
  },
  {
    name: 'DMS',
    icon: faFolderTree,
    url: 'https://franciscogabe.github.io/dms-prototype/#/',
    githubUrl: 'https://github.com/FranciscoGaBe/dms-prototype',
  },
  {
    name: 'JSIT',
    icon: faKeyboard,
    url: 'https://franciscogabe.github.io/shop/',
    githubUrl: 'https://franciscogabe.github.io/JSIT/',
  },
  {
    name: 'Portfolio',
    icon: faPaste,
    url: 'https://franciscogabe.github.io/portfolio/',
    githubUrl: 'https://github.com/FranciscoGaBe/portfolio',
  },
  {
    name: 'Smol Component',
    icon: faBook,
    url: 'https://github.com/FranciscoGaBe/Smol-Component',
    githubUrl: 'https://github.com/FranciscoGaBe/Smol-Component',
  },
].reduce(
  (obj, app, index) => ({ ...obj, [index + 1]: { ...app, id: index + 1, open: false } }),
  {},
);

export default apps;
