import { PropsWithChildren } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectColor, selectDarkMode } from '../slices/settingsSlice';

interface Props {
  className: string
}

const CSSVariablesWrapper = ({ className, children }: PropsWithChildren<Props>): JSX.Element => {
  const mode = useAppSelector(selectDarkMode) ? 'dark' : 'light';
  const color = useAppSelector(selectColor);

  const style = {
    '--color-main': color,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className={`${mode} ${className}`}
    >
      { children }
    </div>
  );
};

export default CSSVariablesWrapper;
