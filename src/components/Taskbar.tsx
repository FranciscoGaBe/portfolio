import { useRef } from 'react';
import DayTime from './DayTime';
import StartMenu from './StartMenu';

const Taskbar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="shrink-0 relative">
      <div className="bg-rose-900 h-10 flex relative z-10">
        <StartMenu containerRef={containerRef} />
        <DayTime />
      </div>
    </div>
  );
};

export default Taskbar;
