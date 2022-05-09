import {
  faBook, faChessBoard, faCog, faFolderTree, faKeyboard, faPaste, faPencil, faShop,
} from '@fortawesome/free-solid-svg-icons';
import { AppItem, ApplicationItem, ComponentItem } from '../slices/appsSlice';

export const settingsId = 'settings';

const applications: ApplicationItem[] = [
  {
    id: 'dibujillo',
    type: 'app',
    name: 'Dibujillo',
    icon: faPencil,
    url: 'https://dibujillo.herokuapp.com/',
    githubUrl: 'https://github.com/FranciscoGaBe/dibujillo',
    shortDesc: 'Pictionary like online game',
    desc: 'A Pictionary like online game, you can join or host a room. Built using Vue2 and Express.js. Made years ago to practice with WebSockets, rescued recently with some fixes to make it run again',
  },
  {
    id: 'wfg',
    type: 'app',
    name: 'WFG',
    icon: faChessBoard,
    url: 'https://franciscogabe.github.io/wfg/',
    githubUrl: 'https://github.com/FranciscoGaBe/wfg',
    shortDesc: 'Wordle like game in spanish',
    desc: 'A game inspired by Wordle, it\'s in spanish and has a button to play again or change words. Built using Vue3.',
  },
  {
    id: 'shop',
    type: 'app',
    name: 'Shop',
    icon: faShop,
    url: 'https://franciscogabe.github.io/shop/',
    githubUrl: 'https://github.com/FranciscoGaBe/shop',
    shortDesc: 'A fake shop using a public API',
    desc: 'A fake shop using a public API and local storage to save new data. Built using React, Redux and React router',
  },
  {
    id: 'dms',
    type: 'app',
    name: 'DMS',
    icon: faFolderTree,
    url: 'https://franciscogabe.github.io/dms-prototype/#/',
    githubUrl: 'https://github.com/FranciscoGaBe/dms-prototype',
    shortDesc: 'DMS prototype with a simulated Backend',
    desc: 'A prototype of a Document Managements System, it has no Backend, so instead it simulates calls while storing data in memory. Built using Vue2',
  },
  {
    id: 'jsit',
    type: 'app',
    name: 'JSIT',
    icon: faKeyboard,
    url: 'https://franciscogabe.github.io/JSIT/',
    githubUrl: 'https://github.com/FranciscoGaBe/JSIT',
    shortDesc: 'A library to track mouse and keyboard input',
    desc: 'A library to keep track of mouse, pointer and keyboard input. It also simulates a joystick. Made for videogames where the input needs to be checked in a set interval. Built using vanilla JS',
  },
  {
    id: 'portfolio',
    type: 'app',
    name: 'Portfolio',
    icon: faPaste,
    url: 'https://franciscogabe.github.io/portfolio/',
    githubUrl: 'https://github.com/FranciscoGaBe/portfolio',
    shortDesc: 'My portfolio, the one you are currently seeing',
    desc: 'My personal portfolio, the one you are currently using. Inspired by Windos 10 interface. Built using React with Redux',
  },
  {
    id: 'sc',
    type: 'app',
    name: 'SC',
    icon: faBook,
    url: 'https://github.com/FranciscoGaBe/Smol-Component',
    githubUrl: 'https://github.com/FranciscoGaBe/Smol-Component',
    shortDesc: 'Component base Front End library',
    desc: 'A small component based Front End library, made out of curiosity to have fun figuring out how to make a Front End framework. Built in vanilla JS',
  },
];

const components: ComponentItem[] = [
  {
    id: settingsId,
    type: 'component',
    icon: faCog,
    name: 'Settings',
    open: false,
    component: settingsId,
    hideIcon: true,
  },
];

export default [
  ...applications,
  ...components,
].reduce((obj, item) => ({ ...obj, [item.id]: item }), {}) as Record<string, AppItem>;