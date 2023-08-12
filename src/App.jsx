import AddItem from './components/AddItem/AddItem';
import ListItems from './components/ListItems/ListItems';
import ProgressBar from './components/ProgressBar/ProgressBar';
import TimeDateModeSwitcher from './components/TimeDateModeSwitcher/TimeDateModeSwitcher';
import { useDailyPlanner } from './context/DailyPlannerContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { isDarkMode, deletedAllItems } = useDailyPlanner();
  return (
    <div className={`app ${isDarkMode ? 'fake-dark-mode' : ''}`}>
      <TimeDateModeSwitcher />

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="wrapper">
              <ToastContainer />
              <h1>Daily Plan 📝</h1>
              <AddItem />
              <ListItems />
              <ProgressBar />
              <hr />
              <button
                className="btn btn-del-all bg-danger text-white"
                onClick={deletedAllItems}
              >
                DELETE ALL ITEMS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
