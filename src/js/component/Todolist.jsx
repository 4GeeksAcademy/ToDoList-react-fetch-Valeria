import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      createTask()
    }
  };

  const handleClearTodos = () => {
    fetch('https://playground.4geeks.com/todo/user/alesanchezr', {
      method: 'PUT',
      body: JSON.stringify([]),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(() => {
        setTodos([]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const createUser = () => {
    fetch('https://playground.4geeks.com/todo/users/valeriasalcedo', {method: "POST"})
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error));
  }

  const getList = () => {
    fetch('https://playground.4geeks.com/todo/users/valeriasalcedo')
      .then(response => {
        if (response.status == 404){
          createUser()
          return null
        }
        return response.json()
      })
      .then(data => {
        if(data){
          setTodos(data.todos);
        }
      })
      .catch(error => console.log(error));
  }
  const createTask = () => {
    fetch('https://playground.4geeks.com/todo/todos/valeriasalcedo', {
      method: "POST",
      body: JSON.stringify({
        "label": inputValue,
        "is_done": false
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok){
  
          return response.json()
        }
        return null
      })
      .then(data => {
        if(data){
          setTodos(todos.concat(data));
          setInputValue("");
        }
      })
      .catch(error => console.log(error));
  }

  const deleteTask = (id) => {
    fetch('https://playground.4geeks.com/todo/todos/'+id, {method: "DELETE"})
      .then(response => {
        if (response.ok){
          return response
        }
        return null
      })
      .then(data => {
        if(data){
          setTodos(todos.filter(item=> item.id != id ));
        }
      })
      .catch(error => console.log(error));
  }


  useEffect(()=>{
    getList()
  }, [])

  return (
    <div className="todo-list">
      <h1>todo list</h1>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTodo}
      />
      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTask(todo.id)}
            />
          ))
        ) : (
          <li>No hay tareas, añadir tareas</li>
        )}
      </ul>
      <div>
        {todos.length} item{todos.length !== 1 ? 's' : ''} left
      </div>
      <button onClick={handleClearTodos}>Clear All</button>
    </div>
  );
}

export default TodoList;
