import { useDailyPlanner } from '../../context/DailyPlannerContext';
import './item.css';
export default function Item({ todo }) {
  const { changeStatusItem } = useDailyPlanner();
  const checkedTodo = todo.status === true ? 'checked' : '';
  return (
    <li className="item-wrapper">
      <div className="item-status-text">
        <label class="label-input">
          <input
            type="checkbox"
            value={todo.status}
            onChange={(e) => changeStatusItem(todo.id)}
            checked={checkedTodo}
          />
          {!checkedTodo ? <span>{todo.body}</span> : <del>{todo.body}</del>}
          <span class="checkmark"></span>
        </label>
      </div>
      <div className="item-actions">
        <button className="btn text-white bg-info">EDIT</button>
        <button className="btn text-white bg-danger">DELETE</button>
      </div>
    </li>
  );
}
