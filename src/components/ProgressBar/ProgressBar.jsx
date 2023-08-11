import { useDailyPlanner } from '../../context/DailyPlannerContext';
import './progress-bar.css';

export default function ProgressBar() {
  const { myDailyTodoList, countCompletedTodoItem } = useDailyPlanner();
  return (
    <>
      <progress
        max={myDailyTodoList.length}
        value={countCompletedTodoItem}
      ></progress>
    </>
  );
}
