import './item.css';
export default function Item({ todo }) {
  return (
    <li className="item-wrapper">
      <div className="item-status-text">
        <span>{todo.body}</span>
      </div>
      <div className="item-actions">
        <button className="bg-info">EDIT</button>
        <button className="bg-danger">DELETE</button>
      </div>
    </li>
  );
}
