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
    shortDesc: 'Pictionary like online game',
  },
  {
    name: 'WFG',
    icon: faChessBoard,
    url: 'https://franciscogabe.github.io/wfg/',
    githubUrl: 'https://github.com/FranciscoGaBe/wfg',
    shortDesc: 'Wordle like game in spanish',
  },
  {
    name: 'Shop',
    icon: faShop,
    url: 'https://franciscogabe.github.io/shop/',
    githubUrl: 'https://github.com/FranciscoGaBe/shop',
    shortDesc: 'A fake shop using a public API',
  },
  {
    name: 'DMS',
    icon: faFolderTree,
    url: 'https://franciscogabe.github.io/dms-prototype/#/',
    githubUrl: 'https://github.com/FranciscoGaBe/dms-prototype',
    shortDesc: 'DMS prototype with a simulated Backend',
  },
  {
    name: 'JSIT',
    icon: faKeyboard,
    url: 'https://franciscogabe.github.io/shop/',
    githubUrl: 'https://franciscogabe.github.io/JSIT/',
    shortDesc: 'A library to track mouse and keyboard input',
  },
  {
    name: 'Portfolio',
    icon: faPaste,
    url: 'https://franciscogabe.github.io/portfolio/',
    githubUrl: 'https://github.com/FranciscoGaBe/portfolio',
    shortDesc: 'My portfolio, the one you are currently seeing',
  },
  {
    name: 'SC',
    icon: faBook,
    url: 'https://github.com/FranciscoGaBe/Smol-Component',
    githubUrl: 'https://github.com/FranciscoGaBe/Smol-Component',
    shortDesc: 'Component base Front End library',
  },
].reduce(
  (obj, app, index) => ({ ...obj, [index + 1]: { ...app, id: index + 1, open: false } }),
  {},
);

export default apps;
