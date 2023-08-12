import { useState } from 'react';
import { useDailyPlanner } from '../../context/DailyPlannerContext';
import './add-item.css';

export default function AddItem() {
  const { createdItem, notify } = useDailyPlanner();
  const [body, setBody] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!body) {
      notify('error', 'Please enter a valid body.');
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      status: false,
      body,
    };

    createdItem(newItem);
    notify('success', 'Item has been added!');
    setBody('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          className="form-input"
          placeholder="write something"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="btn bg-success text-white" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </form>
  );
}
