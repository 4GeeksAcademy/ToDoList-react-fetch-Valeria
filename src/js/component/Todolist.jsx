import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-list">
      <h1>TODOS</h1>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTodo}
      />
      <ul>
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              onDelete={() => handleDeleteTodo(index)}
            />
          ))
        ) : (
          <li>No hay tareas, añadir tareas</li>
        )}
      </ul>
      <div>{todos.length} item{todos.length !== 1 ? 's' : ''} left</div>
    </div>
  );
}

export default TodoList;
