import ListItems from './components/ListItems/ListItems';
import { useDailyPlanner } from './context/DailyPlannerContext';

export default function App() {
  const { isDarkMode, handleDarkMode } = useDailyPlanner();

  return (
    <div className={`app ${isDarkMode ? 'fake-dark-mode' : ''}`}>
      <button className="btn-fake-dark-mode" onClick={() => handleDarkMode()}>
        {isDarkMode ? '🌙' : '☀️'}
      </button>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="wrapper">
              <ListItems />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
