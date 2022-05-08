import { faCheck, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectColorHex, selectDarkMode, setColor, setDarkMode,
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

const Settings = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectDarkMode) ? 'dark' : 'light';
  const hexColor = useAppSelector(selectColorHex);

  return (
    <div className="h-full dark:bg-black bg-white">
      <div className="px-4 py-8">
        <h2 className="text-2xl mb-4">Colors</h2>
        <h3 className="mb-2">Choose your color</h3>
        <select
          className={[
            'bg-transparent border-2 px-2 py-1 text-sm w-60 outline-none',
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
                      <button
                        className="w-full h-10"
                        style={{ backgroundColor: item.color }}
                        type="button"
                        aria-label={`Color: ${item.color}`}
                        onClick={() => dispatch(setColor(item.color))}
                      />
                      <div
                        className={[
                          'absolute inset-0 border-2 pointer-events-none',
                          'group-hover:border-white',
                          hexColor === item.color ? 'border-white' : ' border-transparent',
                        ].join(' ')}
                      />
                      { hexColor === item.color && (
                        <div
                          className="absolute top-0 right-0 w-5 h-5 bg-white flex items-center justify-center"
                        >
                          <FontAwesomeIcon className="text-black text-sm" icon={faCheck} />
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
