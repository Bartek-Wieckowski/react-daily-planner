import { useState } from 'react';
import { useDailyPlanner } from '../../context/DailyPlannerContext';
import './item.css';

export default function Item({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBody, setEditingBody] = useState(todo.body);
  const { changeStatusItem, editedItem, deletedItem, notify } =
    useDailyPlanner();
  const checkedTodo = todo.status === true ? 'checked' : '';

  function handleEditClick() {
    setIsEditing(true);
    notify('warning', 'You try to change the current task');
  }
  function handleSaveClick() {
    editedItem(todo.id, editingBody);
    notify('success', 'You have correctly changed the task');
    setIsEditing(false);
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSaveClick();
    }
  }

  return (
    <li className="item-wrapper">
      <div className="item-status-text">
        {isEditing ? (
          <input
            type="text"
            value={editingBody}
            onChange={(e) => setEditingBody(e.target.value)}
            onKeyDown={handleKeyDown}
            className={isEditing ? 'pulsating-input' : ''}
          />
        ) : (
          <label className="label-input">
            <input
              type="checkbox"
              value={todo.status}
              onChange={(e) => changeStatusItem(todo.id)}
              checked={checkedTodo}
            />
            {!checkedTodo ? <span>{todo.body}</span> : <del>{todo.body}</del>}
            <span className="checkmark"></span>
          </label>
        )}
      </div>
      <div className="item-actions">
        {isEditing ? (
          <button
            className="btn text-white bg-primary"
            onClick={handleSaveClick}
          >
            SAVE
          </button>
        ) : (
          <button className="btn text-white bg-info" onClick={handleEditClick}>
            EDIT
          </button>
        )}

        <button
          className="btn text-white bg-danger"
          onClick={() => deletedItem(todo.id)}
        >
          DELETE
        </button>
      </div>
    </li>
  );
}
