import { useDailyPlanner } from '../../context/DailyPlannerContext';
import Item from '../Item/Item';
import './list-items.css';

export default function ListItems() {
  const { myDailyTodoList, sortingOptions, sortedItems } = useDailyPlanner();

  let sortedList = [...myDailyTodoList];

  function handleSortChange(e) {
    sortedItems(e.target.value);
  }

  if (sortingOptions === 'order') {
    sortedList = myDailyTodoList;
  }
  if (sortingOptions === 'status') {
    sortedList.sort((a, b) => Number(b.status) - Number(a.status));
  }
  if (sortingOptions === 'alphabetically') {
    sortedList.sort((a, b) => a.body.localeCompare(b.body));
  }

  return (
    <>
      <div className="filtered-actions">
        <select value={sortingOptions} onChange={handleSortChange}>
          <option value="order">Sort by order</option>
          <option value="status">Sort by status</option>
          <option value="alphabetically">Sort alphabetically</option>
        </select>
      </div>
      <ul className="list-items">
        {sortedList.map((item) => (
          <Item todo={item} key={item.id} />
        ))}
      </ul>
    </>
  );
}
