import { useDailyPlanner } from '../../context/DailyPlannerContext';
import Item from '../Item/Item';
import './list-items.css';

export default function ListItems() {
  const { myTodos } = useDailyPlanner();
  return (
    <ul className="list-items">
      {myTodos.map((item) => (
        <Item todo={item} key={item.id} />
      ))}
    </ul>
  );
}
