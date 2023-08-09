import ListItems from './components/ListItems/ListItems';
import { useDailyPlanner } from './context/DailyPlannerContext';

export default function App() {
  const { isDarkMode, handleDarkMode } = useDailyPlanner();

  return (
    <div className={`app ${isDarkMode ? 'fake-dark-mode' : ''}`}>
      <button
        className="danger-bg-subtle-dark"
        onClick={() => handleDarkMode()}
      >
        test
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
