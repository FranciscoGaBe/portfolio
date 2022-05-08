import CSSVariablesWrapper from './components/CSSVariablesWrapper';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => (
  <CSSVariablesWrapper className="h-full">
    <div className="h-full flex flex-col overflow-hidden text-black dark:text-white">
      <Desktop />
      <Taskbar />
      <WelcomeScreen />
    </div>
  </CSSVariablesWrapper>
);

export default App;
