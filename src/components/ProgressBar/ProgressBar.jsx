import { useDailyPlanner } from '../../context/DailyPlannerContext';
import './progress-bar.css';

export default function ProgressBar() {
  const { myDailyTodoList, countCompletedTodoItem } = useDailyPlanner();
  const allTodosLength = myDailyTodoList.length;
  return (
    <>
      <progress max={allTodosLength} value={countCompletedTodoItem} />
      <span>
        {allTodosLength === 0 && 'Create your first task 1️⃣'}
        {allTodosLength > 0 &&
          countCompletedTodoItem === 0 &&
          'Go on! complete the first task 🏃‍♂️'}
        {allTodosLength > 0 &&
          countCompletedTodoItem >= 1 &&
          countCompletedTodoItem < allTodosLength &&
          'Go on! complete the next task 😉'}
        {allTodosLength > 0 &&
          allTodosLength === countCompletedTodoItem &&
          'Yeah! You got all tasks! 🎉'}
      </span>
    </>
  );
}
