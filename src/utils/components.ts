import Settings from '../components/Settings';
import { settingsId } from './apps';

export default {
  [settingsId]: Settings,
} as Record<string, () => JSX.Element>;
