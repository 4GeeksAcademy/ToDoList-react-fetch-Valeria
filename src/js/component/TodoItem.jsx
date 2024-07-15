import React from 'react';

function TodoItem({ todo, onDelete }) {
  return (
    <li>
      {todo}
      <button onClick={onDelete} style={{ marginLeft: '10px' }}>
        Eliminar
      </button>
    </li>
  );
}

export default TodoItem;
