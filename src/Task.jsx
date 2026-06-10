import React from 'react';

function Task({ item, onToggle, onDelete }) {
  return (
    <li className="todo-row">
      <label>
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => onToggle(item.id)}
        />
        <span className={item.done ? 'done' : ''}>{item.text}</span>
      </label>
      <button type="button" onClick={() => onDelete(item.id)}>
        x
      </button>
    </li>
  );
}

export default Task;
