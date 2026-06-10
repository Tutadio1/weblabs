import React from 'react';

function AddTask({ value, onChange, onSubmit }) {
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Новая задача"
      />
      <button type="submit">Записать</button>
    </form>
  );
}

export default AddTask;
