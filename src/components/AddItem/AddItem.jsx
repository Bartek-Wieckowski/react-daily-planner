import { useState } from 'react';
import { useDailyPlanner } from '../../context/DailyPlannerContext';
import './add-item.css';

export default function AddItem() {
  const { createdItem } = useDailyPlanner();
  const [body, setBody] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!body) {
      console.log('error- dodac notify popup');
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      status: false,
      body,
    };

    createdItem(newItem);
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
