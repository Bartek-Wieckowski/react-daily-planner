import { useDailyPlanner } from './context/DailyPlannerContext';

function App() {
  const { isDarkMode, handleDarkMode } = useDailyPlanner();
  return (
    <div className="App" data-bs-theme={isDarkMode ? 'dark' : 'light'}>
      <button className="bg-danger" onClick={() => handleDarkMode()}>
        test
      </button>
    </div>
  );
}

export default App;
