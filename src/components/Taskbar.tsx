import { forwardRef, useRef } from 'react';
import DayTime from './DayTime';
import StartMenu from './StartMenu';

const Taskbar = forwardRef<HTMLDivElement>((_, taskbarIconsRef) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="shrink-0 relative">
      <div className="bg-rose-900 h-10 flex relative z-10">
        <StartMenu containerRef={containerRef} />
        <div ref={taskbarIconsRef} className="grow px-4 flex" />
        <DayTime />
      </div>
    </div>
  );
});

export default Taskbar;
