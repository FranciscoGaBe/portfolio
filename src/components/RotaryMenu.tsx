import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createElement, PropsWithChildren, useState } from 'react';
import RotaryMenuItem from './RotaryMenuItem';

export interface IRotaryMenuItem {
  id: string | number,
  element: (props: { selected: boolean }) => JSX.Element
}

interface Props {
  items: IRotaryMenuItem[],
  radius: number,
  offset: number,
  hideItems?: boolean
}

const RotaryMenu = ({
  items, radius, offset,
  hideItems = false,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  const [current, setCurrent] = useState(0);
  const [rotation, setRotation] = useState(offset);
  const deltaRotate = 360 / items.length;

  const changeCurrent = (change: number) => {
    setRotation(rotation - change * deltaRotate);
    setCurrent((items.length + change + current) % items.length);
  };

  return (
    <div
      style={{ transformStyle: 'preserve-3d' }}
      className="flex items-center justify-center"
    >
      <div className="absolute pointer-events-none">
        { children }
        { !hideItems && (items.length > 1) && (
          <div className="absolute inset-0 flex items-center">
            <button
              className="text-white text-3xl absolute left-1 bg-black/60 rounded-full px-2 py-3 pointer-events-auto [transform:rotateY(40deg)]"
              type="button"
              onClick={() => changeCurrent(1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="text-white text-3xl absolute right-1 bg-black/60 rounded-full px-2 py-3 pointer-events-auto [transform:rotateY(-40deg)]"
              type="button"
              onClick={() => changeCurrent(-1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        ) }
      </div>
      {
        !hideItems && items.map((item, index) => (
          <RotaryMenuItem
            key={item.id}
            radius={radius}
            rotation={(index * deltaRotate + rotation)}
          >
            { createElement(item.element, { selected: index === current }) }
          </RotaryMenuItem>
        ))
      }
    </div>
  );
};
RotaryMenu.defaultProps = {
  hideItems: false,
};

export default RotaryMenu;
