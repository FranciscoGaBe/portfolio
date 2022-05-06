import Desktop from './components/Desktop';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => (
  <div className="h-full flex flex-col">
    <Desktop />
    <WelcomeScreen />
  </div>
);

export default App;
