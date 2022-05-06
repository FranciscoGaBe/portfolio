import { useRef } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => {
  const taskbarIconsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Desktop taskbarIcons={taskbarIconsRef} />
      <Taskbar ref={taskbarIconsRef} />
      <WelcomeScreen />
    </div>
  );
};

export default App;
