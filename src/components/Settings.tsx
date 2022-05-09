import {
  faCheck, faCog, faImage, faPalette,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { createElement, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addBackground,
  selectAllBackgrounds,
  selectColorHex, selectDarkMode, setActiveBackground, setColor, setDarkMode,
} from '../slices/settingsSlice';
import colors from '../utils/colors';

const perRow = 8;

const rows = Array(Math.ceil(colors.length / perRow)).fill(0).map((_, index) => ({
  id: index + 1,
  items: colors.slice(index * perRow, (index + 1) * perRow).map((color, indexItem) => ({
    id: indexItem + 1,
    color,
  })),
}));

const ColorsSettings = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectDarkMode) ? 'dark' : 'light';
  const hexColor = useAppSelector(selectColorHex);

  return (
    <div>
      <h3 className="mb-2">Choose your color</h3>
      <select
        className={[
          'bg-transparent border-2 px-2 py-1 text-sm w-72 outline-none',
          'border-neutral-400 hover:border-neutral-500',
          'dark:border-neutral-500 dark:hover:border-neutral-400 ',
        ].join(' ')}
        value={mode}
        onChange={(event) => dispatch(setDarkMode(event.target.value === 'dark'))}
      >
        <option
          className="bg-neutral-200 dark:bg-neutral-500"
          value="light"
        >
          Light
        </option>
        <option
          className="bg-neutral-200 dark:bg-neutral-500"
          value="dark"
        >
          Dark
        </option>
      </select>
      <h3 className="mt-8 mb-4 text-xl">Choose your accent color</h3>
      <div className="flex flex-col gap-0.5">
        {
        rows.map((row) => (
          <div key={row.id} className="flex gap-0.5">
            {
              row.items.map((item) => (
                <div
                  key={item.id}
                  className="h-[calc(2.5rem+1px)] w-10 relative flex items-end group"
                >
                  <motion.button
                    initial={{ scale: 0, opacity: 0, borderRadius: 40 }}
                    animate={{ scale: 1, opacity: 1, borderRadius: 0 }}
                    className="w-full h-10"
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{ backgroundColor: item.color }}
                    type="button"
                    aria-label={`Color: ${item.color}`}
                    onClick={() => dispatch(setColor(item.color))}
                  />
                  <div
                    className={[
                      'absolute inset-0 border-2 pointer-events-none',
                      'group-hover:dark:border-white group-hover:border-black',
                      hexColor === item.color ? 'dark:border-white border-black' : ' border-transparent',
                    ].join(' ')}
                  />
                  { hexColor === item.color && (
                    <div
                      className="absolute top-0 right-0 w-5 h-5 dark:bg-white bg-black flex items-center justify-center"
                    >
                      <FontAwesomeIcon className="dark:text-black text-white text-sm" icon={faCheck} />
                    </div>
                  ) }
                </div>
              ))
            }
          </div>
        ))
      }
      </div>
    </div>
  );
};

const BackgroundSettings = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  const backgrounds = useAppSelector(selectAllBackgrounds);

  const handleClick = () => {
    if (!fileRef.current) return;
    fileRef.current.click();
  };

  const newBackground = (event: React.FormEvent) => {
    const { files } = event.target as HTMLInputElement;
    if (!files) return;
    const file = files[0];
    if (!file) return;
    dispatch(
      addBackground(
        window.URL.createObjectURL(file),
      ),
    );
  };

  return (
    <div>
      <h3 className="mb-2">Choose your picture</h3>
      <div className="flex gap-1 flex-wrap mb-2">
        {
          backgrounds.map((bg) => (
            <motion.div key={bg.id} layout className="w-20 h-20 overflow-hidden">
              <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ backgroundImage: `url(${bg.bg})` }}
                className="h-20 w-20 bg-center bg-cover bg-no-repeat"
                type="button"
                aria-label="background"
                onClick={() => dispatch(setActiveBackground(bg.id))}
              />
            </motion.div>
          ))
        }
      </div>
      <button
        type="button"
        className={[
          'px-5 py-1.5 text-sm border-2 border-transparent font-medium',
          'bg-neutral-300 dark:bg-neutral-800 dark:hover:border-neutral-500',
        ].join(' ')}
        onClick={handleClick}
      >
        Browse
      </button>
      <input ref={fileRef} type="file" className="hidden" onInput={newBackground} />
    </div>
  );
};

const tabs = [
  { title: 'Background', icon: faImage, component: BackgroundSettings },
  { title: 'Colors', icon: faPalette, component: ColorsSettings },
];

const Settings = (): JSX.Element => {
  const [tab, currentTab] = useState(0);

  return (
    <div className="h-full">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
        className="h-full flex flex-col sm:flex-row"
      >
        <div
          className="shrink-0 flex flex-col dark:bg-neutral-800 bg-neutral-200 sm:w-80 sm:max-w-[50%] text-sm"
        >
          <div className="shrink-0 pt-16 px-4 pb-4 font-bold">Personalization</div>
          <div className="grow overflow-auto">
            <div className="flex sm:block justify-evenly">
              {
                tabs.map(({ title, icon }, index) => (
                  <button
                    key={title}
                    className={[
                      'flex items-center relative justify-center sm:justify-start',
                      'px-4 py-3 hover:bg-neutral-300 dark:hover:bg-neutral-700 w-full',
                    ].join(' ')}
                    type="button"
                    onClick={() => currentTab(index)}
                  >
                    <div className={[
                      'left-5 sm:left-0 sm:top-2 right-5 sm:right-0 bottom-0 sm:bottom-2 h-1 sm:h-auto sm:w-1 absolute',
                      index === tab ? 'bg-main' : 'bg-transparent',
                    ].join(' ')}
                    />
                    <FontAwesomeIcon className="mr-4 text-base" icon={icon} />
                    <span>{ title }</span>
                  </button>
                ))
              }
            </div>
          </div>
        </div>
        <div className="grow flex flex-col dark:bg-black bg-white">
          <h2 className="shrink-0 text-3xl pb-4 px-6 pt-14">
            { tabs[tab].title }
          </h2>
          <div className="grow overflow-auto p-6">
            {
              createElement(tabs[tab].component as () => JSX.Element)
            }
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="pointer-events-none absolute inset-0 bg-main flex items-center justify-center"
      >
        <FontAwesomeIcon className="text-white text-9xl" icon={faCog} />
      </motion.div>
    </div>
  );
};

export default Settings;
