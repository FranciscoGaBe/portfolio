import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => (
  <div className="h-full flex flex-col overflow-hidden">
    <Desktop />
    <Taskbar />
    <WelcomeScreen />
  </div>
);

export default App;
