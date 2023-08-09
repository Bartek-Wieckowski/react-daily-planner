import ListItems from './components/ListItems/ListItems';
import TimeDateModeSwitcher from './components/TimeDateModeSwitcher/TimeDateModeSwitcher';
import { useDailyPlanner } from './context/DailyPlannerContext';

export default function App() {
  const { isDarkMode } = useDailyPlanner();
  return (
    <div className={`app ${isDarkMode ? 'fake-dark-mode' : ''}`}>
      <TimeDateModeSwitcher />

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="wrapper">
              <h1>Daily Plan 📝</h1>
              <ListItems />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
