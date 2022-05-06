import { useState } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => {
  const [taskbarIconsElement, setTaskbarIconsElement] = useState<HTMLDivElement | null>(null);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      { taskbarIconsElement && <Desktop taskbarIconsElement={taskbarIconsElement} /> }
      <Taskbar ref={setTaskbarIconsElement} />
      <WelcomeScreen />
    </div>
  );
};

export default App;
