import { useDailyPlanner } from '../../context/DailyPlannerContext';
import './list-items.css';

export default function ListItems() {
  const { myTodos } = useDailyPlanner();
  return <div className="list-items">{myTodos.map((item) => item.id)}</div>;
}
