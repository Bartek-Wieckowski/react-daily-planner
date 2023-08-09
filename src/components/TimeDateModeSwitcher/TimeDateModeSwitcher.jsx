import { useEffect, useState } from 'react';
import { useDailyPlanner } from '../../context/DailyPlannerContext';
import { formatDate, formatTime } from '../../utils/helpers';
import './time-date-mode-switcher.css';

export default function TimeDateModeSwitcher() {
  const { isDarkMode, handleDarkMode } = useDailyPlanner();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-date-mode-switcher-wrapper">
      <span>{formatDate(currentDate)}</span>
      <span>{formatTime(currentDate)}</span>
      <button className="btn-fake-dark-mode" onClick={() => handleDarkMode()}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
